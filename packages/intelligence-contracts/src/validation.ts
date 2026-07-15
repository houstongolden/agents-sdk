import type { IntelligenceManifest, Resource } from "./contracts.js";
import { IntelligenceManifestSchema, ResourceSchema } from "./contracts.js";
import { parseAdilUrn } from "./identifiers.js";

export interface SemanticValidationIssue {
  code: string;
  path: string;
  message: string;
}
export type ManifestValidationResult =
  | { ok: true; manifest: IntelligenceManifest; issues: [] }
  | { ok: false; issues: SemanticValidationIssue[] };

function duplicateIssues(values: string[], path: string, code: string): SemanticValidationIssue[] {
  const seen = new Set<string>();
  const issues: SemanticValidationIssue[] = [];
  values.forEach((value, index) => {
    if (seen.has(value))
      issues.push({ code, path: `${path}.${index}`, message: `Duplicate value: ${value}` });
    seen.add(value);
  });
  return issues;
}

export function validateIntelligenceManifest(input: unknown): ManifestValidationResult {
  const parsed = IntelligenceManifestSchema.safeParse(input);
  if (!parsed.success)
    return {
      ok: false,
      issues: parsed.error.issues.map((issue) => ({
        code: "structural_validation",
        path: issue.path.join("."),
        message: issue.message,
      })),
    };

  const manifest = parsed.data;
  const issues: SemanticValidationIssue[] = [];
  issues.push(
    ...duplicateIssues(
      manifest.resourceTypes.map(({ key }) => key),
      "resourceTypes",
      "duplicate_resource_type",
    ),
  );
  issues.push(
    ...duplicateIssues(
      manifest.policies.map(({ id }) => id),
      "policies",
      "duplicate_policy",
    ),
  );

  const resourceTypes = new Set(manifest.resourceTypes.map(({ key }) => key));
  const policyIds = new Set(manifest.policies.map(({ id }) => id));
  manifest.resourceTypes.forEach((resourceType, index) => {
    if (resourceType.app !== manifest.metadata.app)
      issues.push({
        code: "cross_app_resource_type",
        path: `resourceTypes.${index}.app`,
        message: `Resource type app ${resourceType.app} does not match manifest app ${manifest.metadata.app}`,
      });
    if (!policyIds.has(resourceType.defaultPolicyRef))
      issues.push({
        code: "unknown_policy",
        path: `resourceTypes.${index}.defaultPolicyRef`,
        message: `Unknown policy: ${resourceType.defaultPolicyRef}`,
      });
    issues.push(
      ...duplicateIssues(
        resourceType.relations,
        `resourceTypes.${index}.relations`,
        "duplicate_relation",
      ),
    );
  });

  const fieldKeys = manifest.fieldDefinitions.map(
    ({ resourceType, fieldPath }) => `${resourceType}:${fieldPath}`,
  );
  issues.push(...duplicateIssues(fieldKeys, "fieldDefinitions", "duplicate_field"));
  manifest.fieldDefinitions.forEach((field, index) => {
    if (!resourceTypes.has(field.resourceType))
      issues.push({
        code: "unknown_resource_type",
        path: `fieldDefinitions.${index}.resourceType`,
        message: `Unknown resource type: ${field.resourceType}`,
      });
    const prohibited = field.sensitivity === "prohibited_from_ai" || field.modelPolicy === "no_ai";
    if (prohibited && (field.index.length > 0 || field.pipeline !== undefined))
      issues.push({
        code: "prohibited_ai_processing",
        path: `fieldDefinitions.${index}`,
        message: "Prohibited/no-AI fields cannot declare indexing or an enrichment pipeline",
      });
    if (field.excluded && (field.index.length > 0 || field.pipeline !== undefined))
      issues.push({
        code: "excluded_field_processing",
        path: `fieldDefinitions.${index}`,
        message: "Excluded fields cannot declare indexing or an enrichment pipeline",
      });
    if (
      /(?:secret|password|credential|token|private[_-]?key)/i.test(field.fieldPath) &&
      !field.excluded
    )
      issues.push({
        code: "secret_path_not_excluded",
        path: `fieldDefinitions.${index}.excluded`,
        message: "Secret-like paths must be explicitly excluded",
      });
    issues.push(
      ...duplicateIssues(field.aliases, `fieldDefinitions.${index}.aliases`, "duplicate_alias"),
    );
  });

  return issues.length === 0 ? { ok: true, manifest, issues: [] } : { ok: false, issues };
}

export type ResourceManifestValidationResult =
  | { ok: true; resource: Resource; manifest: IntelligenceManifest; issues: [] }
  | { ok: false; issues: SemanticValidationIssue[] };

export function validateResourceAgainstManifest(
  resourceInput: unknown,
  manifestInput: unknown,
): ResourceManifestValidationResult {
  const manifestResult = validateIntelligenceManifest(manifestInput);
  if (!manifestResult.ok) return manifestResult;
  const parsed = ResourceSchema.safeParse(resourceInput);
  if (!parsed.success)
    return {
      ok: false,
      issues: parsed.error.issues.map((issue) => ({
        code: "structural_validation",
        path: issue.path.join("."),
        message: issue.message,
      })),
    };

  const resource = parsed.data;
  const manifest = manifestResult.manifest;
  const resourceType = manifest.resourceTypes.find(({ key }) => key === resource.resourceType);
  const issues: SemanticValidationIssue[] = [];
  if (!resourceType)
    issues.push({
      code: "unknown_resource_type",
      path: "resourceType",
      message: `Unknown resource type: ${resource.resourceType}`,
    });

  const urn = parseAdilUrn(resource.urn);
  if (urn.issuerId !== manifest.metadata.issuerId)
    issues.push({
      code: "urn_issuer_mismatch",
      path: "urn",
      message: `URN issuer ${urn.issuerId} does not match manifest issuer ${manifest.metadata.issuerId}`,
    });
  if (urn.app !== manifest.metadata.app)
    issues.push({
      code: "urn_app_mismatch",
      path: "urn",
      message: `URN app ${urn.app} does not match manifest app ${manifest.metadata.app}`,
    });
  if (urn.environment !== manifest.metadata.environment)
    issues.push({
      code: "urn_environment_mismatch",
      path: "urn",
      message: `URN environment ${urn.environment} does not match manifest environment ${manifest.metadata.environment}`,
    });
  if (resourceType && urn.resourceType !== resourceType.urnResourceType)
    issues.push({
      code: "urn_resource_type_mismatch",
      path: "urn",
      message: `URN resource type ${urn.resourceType} does not match ${resourceType.urnResourceType}`,
    });
  if (resourceType && resource.source.adapter !== resourceType.source.adapter)
    issues.push({
      code: "source_adapter_mismatch",
      path: "source.adapter",
      message: `Source adapter ${resource.source.adapter} does not match ${resourceType.source.adapter}`,
    });
  if (!manifest.policies.some(({ id }) => id === resource.policyRef))
    issues.push({
      code: "unknown_policy",
      path: "policyRef",
      message: `Unknown policy: ${resource.policyRef}`,
    });

  return issues.length === 0 ? { ok: true, resource, manifest, issues: [] } : { ok: false, issues };
}
