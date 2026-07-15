import { z } from "zod";
import {
  ADIL_MANIFEST_SCHEMA_VERSION,
  ADIL_SCHEMA_VERSION,
  AdilUrnSchema,
  ConfidenceSchema,
  ContentHashSchema,
  IdentifierSchema,
  JsonPointerSchema,
  JsonValueSchema,
  ModalitySchema,
  ModelPolicySchema,
  NonEmptyStringSchema,
  OpaqueIdSchema,
  ResourceStateSchema,
  SemverSchema,
  SensitivitySchema,
  TargetReferenceSchema,
  UrnSegmentSchema,
} from "./common.js";
import { FragmentLocatorSchema } from "./identifiers.js";

export const SourceAdapterSchema = z.enum([
  "postgres",
  "convex",
  "filesystem",
  "object_storage",
  "external_api",
]);
export const ChangeModeSchema = z.enum(["transactional", "webhook", "reconciliation", "manual"]);

export const ResourceTypeSchema = z
  .object({
    key: IdentifierSchema,
    urnResourceType: IdentifierSchema,
    app: UrnSegmentSchema,
    source: z
      .object({
        adapter: SourceAdapterSchema,
        schema: IdentifierSchema.optional(),
        table: IdentifierSchema.optional(),
        collection: IdentifierSchema.optional(),
        bucket: IdentifierSchema.optional(),
        primaryKey: NonEmptyStringSchema,
        changeMode: ChangeModeSchema,
      })
      .strict(),
    tenant: z.object({ resolver: IdentifierSchema, field: JsonPointerSchema.optional() }).strict(),
    defaultPolicyRef: IdentifierSchema,
    lifecycle: z.enum(["experimental", "active", "deprecated"]),
    relations: z.array(IdentifierSchema),
    deletion: z.enum(["cascade_derived", "retain_tombstone", "app_managed"]),
    manifestVersion: NonEmptyStringSchema,
    owner: NonEmptyStringSchema,
  })
  .strict();

export const FieldDefinitionSchema = z
  .object({
    resourceType: IdentifierSchema,
    fieldPath: JsonPointerSchema,
    semanticType: IdentifierSchema,
    aliases: z.array(NonEmptyStringSchema),
    sensitivity: SensitivitySchema,
    index: z.array(z.enum(["exact", "lexical", "semantic", "faceted", "relationship"])),
    pipeline: IdentifierSchema.optional(),
    retentionDays: z.number().int().positive().optional(),
    modelPolicy: ModelPolicySchema,
    excluded: z.boolean().default(false),
  })
  .strict();

export const PolicySchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: IdentifierSchema,
    version: NonEmptyStringSchema,
    sensitivity: SensitivitySchema,
    accessResolver: IdentifierSchema,
    modelPolicy: ModelPolicySchema,
    allowedPurposes: z.array(IdentifierSchema).min(1),
    consent: z.enum(["not_required", "required", "verified"]),
    retention: z
      .object({ days: z.number().int().positive().optional(), legalHoldAware: z.boolean() })
      .strict(),
    deletionBehavior: z.enum(["cascade", "cryptographic_erasure", "tombstone_then_purge"]),
  })
  .strict();

export const IntelligenceManifestSchema = z
  .object({
    $schema: z.string().url().optional(),
    schemaVersion: z.literal(ADIL_MANIFEST_SCHEMA_VERSION),
    kind: z.literal("IntelligenceManifest"),
    metadata: z
      .object({
        id: IdentifierSchema,
        issuerId: UrnSegmentSchema,
        app: UrnSegmentSchema,
        environment: UrnSegmentSchema,
        version: SemverSchema,
        owner: NonEmptyStringSchema,
        generatedAt: z.string().datetime(),
      })
      .strict(),
    resourceTypes: z.array(ResourceTypeSchema).min(1),
    fieldDefinitions: z.array(FieldDefinitionSchema).min(1),
    policies: z.array(PolicySchema).min(1),
  })
  .strict();

export const ActorVisibleResourceTypeSchema = ResourceTypeSchema.omit({
  source: true,
  tenant: true,
  defaultPolicyRef: true,
  owner: true,
}).strict();
export const ActorVisiblePolicySchema = PolicySchema.omit({ accessResolver: true }).strict();
export const ActorVisibleIntelligenceManifestSchema = z
  .object({
    schemaVersion: z.literal(ADIL_MANIFEST_SCHEMA_VERSION),
    kind: z.literal("IntelligenceManifest"),
    metadata: IntelligenceManifestSchema.shape.metadata.omit({ owner: true }).strict(),
    resourceTypes: z.array(ActorVisibleResourceTypeSchema),
    fieldDefinitions: z.array(FieldDefinitionSchema),
    policies: z.array(ActorVisiblePolicySchema),
  })
  .strict();

export function toActorVisibleIntelligenceManifest(input: IntelligenceManifest) {
  return ActorVisibleIntelligenceManifestSchema.parse({
    schemaVersion: input.schemaVersion,
    kind: input.kind,
    metadata: {
      id: input.metadata.id,
      issuerId: input.metadata.issuerId,
      app: input.metadata.app,
      environment: input.metadata.environment,
      version: input.metadata.version,
      generatedAt: input.metadata.generatedAt,
    },
    resourceTypes: input.resourceTypes.map(
      ({ key, urnResourceType, app, lifecycle, relations, deletion, manifestVersion }) => ({
        key,
        urnResourceType,
        app,
        lifecycle,
        relations,
        deletion,
        manifestVersion,
      }),
    ),
    fieldDefinitions: input.fieldDefinitions.filter(
      ({ excluded, sensitivity, modelPolicy }) =>
        !excluded && sensitivity !== "prohibited_from_ai" && modelPolicy !== "no_ai",
    ),
    policies: input.policies.map(
      ({
        schemaVersion,
        id,
        version,
        sensitivity,
        modelPolicy,
        allowedPurposes,
        consent,
        retention,
        deletionBehavior,
      }) => ({
        schemaVersion,
        id,
        version,
        sensitivity,
        modelPolicy,
        allowedPurposes,
        consent,
        retention,
        deletionBehavior,
      }),
    ),
  });
}

export const ResourceSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    urn: AdilUrnSchema,
    resourceType: IdentifierSchema,
    source: z
      .object({
        adapter: SourceAdapterSchema,
        nativeId: NonEmptyStringSchema,
        uri: z.string().url().optional(),
      })
      .strict(),
    tenantId: OpaqueIdSchema,
    ownerId: OpaqueIdSchema.optional(),
    sourceVersion: NonEmptyStringSchema,
    sourceHash: ContentHashSchema,
    policyRef: IdentifierSchema,
    policyVersion: NonEmptyStringSchema,
    state: ResourceStateSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().optional(),
  })
  .strict();

export const FragmentSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    resourceUrn: AdilUrnSchema,
    fieldPath: JsonPointerSchema,
    locator: FragmentLocatorSchema.optional(),
    modality: ModalitySchema,
    contentHash: ContentHashSchema,
    ordinal: z.number().int().nonnegative(),
    sourceVersion: NonEmptyStringSchema,
    state: ResourceStateSchema,
  })
  .strict();

const ProvenanceSchema = z
  .object({
    sourceVersion: NonEmptyStringSchema,
    sourceHash: ContentHashSchema,
    pipeline: IdentifierSchema,
    pipelineVersion: NonEmptyStringSchema,
    producedAt: z.string().datetime(),
    evidenceRefs: z.array(TargetReferenceSchema),
  })
  .strict();

export const EnrichmentSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    target: TargetReferenceSchema,
    kind: IdentifierSchema,
    value: JsonValueSchema,
    confidence: ConfidenceSchema,
    model: NonEmptyStringSchema,
    modelVersion: NonEmptyStringSchema,
    promptVersion: NonEmptyStringSchema,
    outputSchemaVersion: NonEmptyStringSchema,
    provenance: ProvenanceSchema,
    state: z.enum(["draft", "validated", "published", "superseded", "quarantined", "failed"]),
  })
  .strict();

const EmbeddingBaseSchema = z.object({
  schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
  id: OpaqueIdSchema,
  target: TargetReferenceSchema,
  model: NonEmptyStringSchema,
  modelVersion: NonEmptyStringSchema,
  contentHash: ContentHashSchema,
  policyVersion: NonEmptyStringSchema,
  state: ResourceStateSchema,
});
export const SUPPORTED_EMBEDDING_DIMENSIONS = [384, 512, 768, 1024, 1536, 3072, 4096] as const;
function embeddingVariant<const D extends (typeof SUPPORTED_EMBEDDING_DIMENSIONS)[number]>(
  dimensions: D,
) {
  return EmbeddingBaseSchema.extend({
    dimensions: z.literal(dimensions),
    vector: z.array(z.number()).length(dimensions),
  }).strict();
}
export const EmbeddingSchema = z.union([
  embeddingVariant(384),
  embeddingVariant(512),
  embeddingVariant(768),
  embeddingVariant(1024),
  embeddingVariant(1536),
  embeddingVariant(3072),
  embeddingVariant(4096),
]);

export const SearchDocumentSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    resourceUrn: AdilUrnSchema,
    fragmentId: OpaqueIdSchema.optional(),
    enrichmentIds: z.array(OpaqueIdSchema),
    lexicalText: z.string(),
    facets: z.record(z.string(), JsonValueSchema),
    embeddingId: OpaqueIdSchema.optional(),
    sourceVersion: NonEmptyStringSchema,
    policyVersion: NonEmptyStringSchema,
    publishedAt: z.string().datetime(),
    state: ResourceStateSchema,
  })
  .strict();

const ClaimBaseSchema = z.object({
  schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
  id: OpaqueIdSchema,
  subject: TargetReferenceSchema,
  predicate: IdentifierSchema,
  value: JsonValueSchema.optional(),
  objectUrn: AdilUrnSchema.optional(),
  evidenceRefs: z.array(TargetReferenceSchema).min(1),
  confidence: ConfidenceSchema,
  validFrom: z.string().datetime().optional(),
  validTo: z.string().datetime().optional(),
  supersedesId: OpaqueIdSchema.optional(),
});

export const FactSchema = ClaimBaseSchema.extend({
  kind: z.literal("fact"),
  verification: z.enum(["unverified", "supported", "verified", "disputed", "rejected"]),
})
  .strict()
  .refine(
    ({ value, objectUrn }) => (value === undefined) !== (objectUrn === undefined),
    "provide value or objectUrn",
  );

export const ObservationSchema = ClaimBaseSchema.extend({
  kind: z.literal("observation"),
  observedAt: z.string().datetime(),
  observer: IdentifierSchema,
})
  .strict()
  .refine(
    ({ value, objectUrn }) => (value === undefined) !== (objectUrn === undefined),
    "provide value or objectUrn",
  );

export const EdgeSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    from: TargetReferenceSchema,
    to: TargetReferenceSchema,
    type: IdentifierSchema,
    direction: z.enum(["directed", "bidirectional"]),
    evidenceRefs: z.array(TargetReferenceSchema).min(1),
    confidence: ConfidenceSchema,
    validFrom: z.string().datetime().optional(),
    validTo: z.string().datetime().optional(),
    state: z.enum(["candidate", "active", "superseded", "rejected"]),
  })
  .strict();

export const EventSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    type: z.enum([
      "source_created",
      "source_updated",
      "source_deleted",
      "policy_changed",
      "reconcile",
    ]),
    resourceUrn: AdilUrnSchema,
    sourceVersion: NonEmptyStringSchema,
    sourceHash: ContentHashSchema.optional(),
    changedFieldPaths: z.array(JsonPointerSchema),
    policyVersion: NonEmptyStringSchema,
    idempotencyKey: NonEmptyStringSchema,
    producer: IdentifierSchema,
    occurredAt: z.string().datetime(),
    receivedAt: z.string().datetime(),
  })
  .strict();

export const JobSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    eventId: OpaqueIdSchema,
    pipeline: IdentifierSchema,
    pipelineVersion: NonEmptyStringSchema,
    idempotencyKey: NonEmptyStringSchema,
    attempt: z.number().int().nonnegative(),
    remainingAttempts: z.number().int().nonnegative(),
    state: z.enum(["queued", "running", "succeeded", "retryable", "dead_letter", "cancelled"]),
    error: z
      .object({ code: IdentifierSchema, message: NonEmptyStringSchema, retryable: z.boolean() })
      .strict()
      .optional(),
    cost: z
      .object({
        inputTokens: z.number().int().nonnegative(),
        outputTokens: z.number().int().nonnegative(),
        usd: z.number().nonnegative(),
      })
      .strict()
      .optional(),
    queuedAt: z.string().datetime(),
    startedAt: z.string().datetime().optional(),
    finishedAt: z.string().datetime().optional(),
  })
  .strict();

export const FeedbackSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    id: OpaqueIdSchema,
    target: TargetReferenceSchema,
    actorId: OpaqueIdSchema,
    action: z.enum(["relevant", "irrelevant", "incorrect", "corrected", "hidden", "restored"]),
    correction: JsonValueSchema.optional(),
    reason: z.string().max(2000).optional(),
    visibility: z.enum(["private", "workspace", "app"]),
    createdAt: z.string().datetime(),
  })
  .strict();

export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export type FieldDefinition = z.infer<typeof FieldDefinitionSchema>;
export type IntelligenceManifest = z.infer<typeof IntelligenceManifestSchema>;
export type ActorVisibleIntelligenceManifest = z.infer<
  typeof ActorVisibleIntelligenceManifestSchema
>;
export type Resource = z.infer<typeof ResourceSchema>;
export type Fragment = z.infer<typeof FragmentSchema>;
export type Enrichment = z.infer<typeof EnrichmentSchema>;
export type Embedding = z.infer<typeof EmbeddingSchema>;
export type SearchDocument = z.infer<typeof SearchDocumentSchema>;
export type Fact = z.infer<typeof FactSchema>;
export type Observation = z.infer<typeof ObservationSchema>;
export type Edge = z.infer<typeof EdgeSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Job = z.infer<typeof JobSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;
