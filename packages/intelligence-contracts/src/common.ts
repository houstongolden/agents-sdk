import { z } from "zod";

export const ADIL_SCHEMA_VERSION = "houston.dev/intelligence/v0.1" as const;
export const ADIL_MANIFEST_SCHEMA_VERSION = "houston.dev/intelligence-manifest/v0.1" as const;

export const NonEmptyStringSchema = z.string().trim().min(1);
export const IdentifierSchema = z
  .string()
  .regex(/^[a-z][a-z0-9._-]{1,127}$/, "Use a lowercase namespaced identifier");
export const OpaqueIdSchema = z
  .string()
  .regex(/^[A-Za-z0-9][A-Za-z0-9._~-]{0,127}$/, "Use an opaque identifier without secrets");
export const UrnSegmentSchema = z.string().regex(/^[a-z][a-z0-9-]{0,62}$/);
export const ADIL_URN_PATTERN =
  /^urn:houston:([a-z][a-z0-9-]{0,62}):([a-z][a-z0-9-]{0,62}):([a-z][a-z0-9-]{0,62}):([a-z][a-z0-9._-]{1,127}):([A-Za-z0-9][A-Za-z0-9._~-]{0,127})$/;
export const AdilUrnSchema = z.string().regex(ADIL_URN_PATTERN, "Use a canonical ADIL URN");
export const ContentHashSchema = z
  .string()
  .regex(/^(?:sha256:)?[a-f0-9]{64}$/, "Use a SHA-256 content hash");
export const SemverSchema = z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
export const JsonPointerSchema = z
  .string()
  .regex(/^(?:\/(?:[^~/]|~[01])*)*$/, "Use RFC 6901 JSON Pointer syntax");
export const SensitivitySchema = z.enum([
  "public",
  "workspace_private",
  "client_confidential",
  "restricted",
  "prohibited_from_ai",
]);
export const ModelPolicySchema = z.enum(["local_only", "redacted_cloud", "allowed_cloud", "no_ai"]);
export const ModalitySchema = z.enum([
  "text",
  "image",
  "document",
  "audio",
  "video",
  "structured_data",
  "mixed",
]);
export const ResourceStateSchema = z.enum([
  "active",
  "superseded",
  "tombstoned",
  "purged",
  "error",
]);
export const ConfidenceSchema = z.number().min(0).max(1);
export const JsonValueSchema = z.json();

export const TargetReferenceSchema = z
  .object({
    resourceUrn: AdilUrnSchema,
    fragmentId: OpaqueIdSchema.optional(),
    enrichmentId: OpaqueIdSchema.optional(),
    fieldPath: JsonPointerSchema.optional(),
  })
  .strict();

export type Sensitivity = z.infer<typeof SensitivitySchema>;
export type AdilUrn = z.infer<typeof AdilUrnSchema>;
export type ModelPolicy = z.infer<typeof ModelPolicySchema>;
export type Modality = z.infer<typeof ModalitySchema>;
export type TargetReference = z.infer<typeof TargetReferenceSchema>;
