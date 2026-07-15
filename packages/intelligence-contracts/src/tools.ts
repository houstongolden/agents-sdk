import { z, type ZodType } from "zod";
import {
  ADIL_SCHEMA_VERSION,
  AdilUrnSchema,
  IdentifierSchema,
  JsonPointerSchema,
  JsonValueSchema,
  NonEmptyStringSchema,
  OpaqueIdSchema,
  TargetReferenceSchema,
} from "./common.js";
import { ActorVisibleIntelligenceManifestSchema } from "./contracts.js";
import { EvidencePackSchema, LineageGraphSchema } from "./evidence.js";
import {
  ActorContextSchema,
  CursorPageSchema,
  CursorPaginationSchema,
  IntelligenceQuerySchema,
} from "./query.js";

export const IntelligenceErrorSchema = z
  .object({
    code: IdentifierSchema,
    message: NonEmptyStringSchema,
    retryable: z.boolean(),
    field: JsonPointerSchema.optional(),
    details: z.record(z.string(), JsonValueSchema).optional(),
  })
  .strict();
export const IntelligenceErrorEnvelopeSchema = z
  .object({ requestId: OpaqueIdSchema, error: IntelligenceErrorSchema })
  .strict();
export const MutationReceiptSchema = z
  .object({
    receiptId: OpaqueIdSchema,
    state: z.enum(["accepted", "pending_approval", "queued", "completed", "rejected"]),
    approvalId: OpaqueIdSchema.optional(),
    auditId: NonEmptyStringSchema,
    idempotencyKey: NonEmptyStringSchema,
  })
  .strict();
const AckSchema = z.object({ ok: z.boolean() }).strict();
const ContextInputSchema = z.object({ actor: ActorContextSchema, urn: AdilUrnSchema }).strict();
const PaginatedContextInputSchema = ContextInputSchema.extend({
  page: CursorPaginationSchema,
}).strict();
const MutationBaseSchema = z
  .object({
    actor: ActorContextSchema,
    idempotencyKey: NonEmptyStringSchema,
    reason: NonEmptyStringSchema,
  })
  .strict();

export const INTELLIGENCE_TOOL_NAMES = [
  "intelligence.describe_schema",
  "intelligence.search",
  "intelligence.get_resource_context",
  "intelligence.get_related",
  "intelligence.explain_lineage",
  "intelligence.get_processing_status",
  "intelligence.request_refresh",
  "intelligence.submit_feedback",
  "intelligence.propose_schema_term",
  "intelligence.approve_schema_term",
  "intelligence.request_export",
  "intelligence.request_delete",
] as const;
export type IntelligenceToolName = (typeof INTELLIGENCE_TOOL_NAMES)[number];

export interface IntelligenceToolContract {
  name: IntelligenceToolName;
  description: string;
  scope: string;
  risk: "read" | "write" | "irreversible";
  approval: "none" | "policy" | "owner_admin";
  idempotencyRequired: boolean;
  limits: { ratePolicy: string; costPolicy: string };
  audit: { required: true; eventType: string; includePolicyDecision: true };
  inputSchema: ZodType;
  successSchema: ZodType;
  errorSchema: typeof IntelligenceErrorEnvelopeSchema;
  outputSchema: ZodType;
}

type ContractDefinition<IS extends ZodType, DS extends ZodType> = Omit<
  IntelligenceToolContract,
  "limits" | "audit" | "inputSchema" | "successSchema" | "errorSchema" | "outputSchema"
> & {
  inputSchema: IS;
  dataSchema: DS;
  paginated?: boolean;
};

function contract<IS extends ZodType, DS extends ZodType>(value: ContractDefinition<IS, DS>) {
  const { dataSchema, paginated = false, ...metadata } = value;
  const successShape = {
    requestId: OpaqueIdSchema,
    data: dataSchema,
    warnings: z.array(NonEmptyStringSchema).optional(),
  };
  const successSchema = paginated
    ? z.object({ ...successShape, page: CursorPageSchema }).strict()
    : z.object(successShape).strict();
  const tier = value.risk === "read" ? "read" : value.risk === "write" ? "write" : "irreversible";
  return {
    ...metadata,
    limits: {
      ratePolicy: `intelligence.${tier}.standard`,
      costPolicy: `intelligence.${tier}.standard`,
    },
    audit: {
      required: true as const,
      eventType: "intelligence.tool.executed",
      includePolicyDecision: true as const,
    },
    successSchema,
    errorSchema: IntelligenceErrorEnvelopeSchema,
    outputSchema: z.union([successSchema, IntelligenceErrorEnvelopeSchema]),
  };
}

export const intelligenceToolContracts = {
  "intelligence.describe_schema": contract({
    name: "intelligence.describe_schema",
    description: "Describe the actor-visible intelligence registry.",
    scope: "intelligence:schema:read",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: z
      .object({
        actor: ActorContextSchema,
        resourceTypes: z.array(IdentifierSchema),
        page: CursorPaginationSchema,
      })
      .strict(),
    dataSchema: z.object({ manifests: z.array(ActorVisibleIntelligenceManifestSchema) }).strict(),
    paginated: true,
  }),
  "intelligence.search": contract({
    name: "intelligence.search",
    description: "Search authorized intelligence and return evidence packs.",
    scope: "intelligence:search",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: IntelligenceQuerySchema,
    dataSchema: z
      .object({
        queryId: OpaqueIdSchema,
        evidencePacks: z.array(EvidencePackSchema),
      })
      .strict(),
    paginated: true,
  }),
  "intelligence.get_resource_context": contract({
    name: "intelligence.get_resource_context",
    description: "Get bounded, policy-filtered context for a resource.",
    scope: "intelligence:read",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: ContextInputSchema.extend({
      fieldPaths: z.array(JsonPointerSchema),
      maxFragments: z.number().int().min(1).max(100),
    }).strict(),
    dataSchema: z
      .object({
        resourceUrn: AdilUrnSchema,
        fields: z.record(z.string(), JsonValueSchema),
        evidence: EvidencePackSchema.optional(),
      })
      .strict(),
  }),
  "intelligence.get_related": contract({
    name: "intelligence.get_related",
    description: "Traverse authorized typed relationships.",
    scope: "intelligence:read",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: PaginatedContextInputSchema.extend({
      relationTypes: z.array(IdentifierSchema),
      maxHops: z.number().int().min(1).max(3),
    }).strict(),
    dataSchema: z
      .object({
        urns: z.array(AdilUrnSchema),
        evidence: z.array(EvidencePackSchema),
      })
      .strict(),
    paginated: true,
  }),
  "intelligence.explain_lineage": contract({
    name: "intelligence.explain_lineage",
    description: "Explain source and derived-data lineage.",
    scope: "intelligence:lineage:read",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: ContextInputSchema,
    dataSchema: LineageGraphSchema,
  }),
  "intelligence.get_processing_status": contract({
    name: "intelligence.get_processing_status",
    description: "Get processing, retry, dead-letter, and cost status.",
    scope: "intelligence:jobs:read",
    risk: "read",
    approval: "none",
    idempotencyRequired: false,
    inputSchema: z.object({ actor: ActorContextSchema, jobId: OpaqueIdSchema }).strict(),
    dataSchema: z
      .object({
        jobId: OpaqueIdSchema,
        state: NonEmptyStringSchema,
        attempt: z.number().int().nonnegative(),
        errorCode: IdentifierSchema.optional(),
        costUsd: z.number().nonnegative().optional(),
      })
      .strict(),
  }),
  "intelligence.request_refresh": contract({
    name: "intelligence.request_refresh",
    description: "Request source-version-safe derived intelligence refresh.",
    scope: "intelligence:refresh",
    risk: "write",
    approval: "policy",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      urn: AdilUrnSchema,
      pipelines: z.array(IdentifierSchema),
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
  "intelligence.submit_feedback": contract({
    name: "intelligence.submit_feedback",
    description: "Submit a correction or retrieval signal.",
    scope: "intelligence:feedback:write",
    risk: "write",
    approval: "policy",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      target: TargetReferenceSchema,
      action: z.enum(["relevant", "irrelevant", "incorrect", "corrected", "hidden", "restored"]),
      correction: JsonValueSchema.optional(),
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
  "intelligence.propose_schema_term": contract({
    name: "intelligence.propose_schema_term",
    description: "Quarantine a candidate registry term for review.",
    scope: "intelligence:schema:propose",
    risk: "write",
    approval: "policy",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      resourceType: IdentifierSchema,
      fieldPath: JsonPointerSchema,
      semanticType: IdentifierSchema,
      evidenceRefs: z.array(TargetReferenceSchema).min(1),
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
  "intelligence.approve_schema_term": contract({
    name: "intelligence.approve_schema_term",
    description: "Approve a reviewed non-sensitive schema proposal.",
    scope: "intelligence:schema:approve",
    risk: "write",
    approval: "owner_admin",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      proposalId: OpaqueIdSchema,
      expectedVersion: NonEmptyStringSchema,
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
  "intelligence.request_export": contract({
    name: "intelligence.request_export",
    description: "Request an actor-scoped asynchronous export.",
    scope: "intelligence:export",
    risk: "write",
    approval: "policy",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      resourceUrns: z.array(AdilUrnSchema),
      format: z.enum(["json", "jsonl", "zip"]),
      includeDerived: z.boolean(),
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
  "intelligence.request_delete": contract({
    name: "intelligence.request_delete",
    description: "Request tombstone and verified derived-data purge.",
    scope: "intelligence:delete",
    risk: "irreversible",
    approval: "owner_admin",
    idempotencyRequired: true,
    inputSchema: MutationBaseSchema.extend({
      resourceUrns: z.array(AdilUrnSchema).min(1),
      deletionMode: z.enum(["derived_only", "source_and_derived"]),
      confirmation: z.literal("DELETE"),
    }).strict(),
    dataSchema: MutationReceiptSchema,
  }),
} as const;

export type IntelligenceToolInput<N extends IntelligenceToolName> = z.input<
  (typeof intelligenceToolContracts)[N]["inputSchema"]
>;
export type IntelligenceToolOutput<N extends IntelligenceToolName> = z.output<
  (typeof intelligenceToolContracts)[N]["outputSchema"]
>;
export const IntelligenceToolNameSchema = z.enum(INTELLIGENCE_TOOL_NAMES);
export const IntelligenceToolCatalogSchema = z
  .object({
    schemaVersion: z.literal(ADIL_SCHEMA_VERSION),
    tools: z.array(
      z
        .object({
          name: IntelligenceToolNameSchema,
          scope: NonEmptyStringSchema,
          risk: z.enum(["read", "write", "irreversible"]),
          approval: z.enum(["none", "policy", "owner_admin"]),
          idempotencyRequired: z.boolean(),
          limits: z.object({ ratePolicy: IdentifierSchema, costPolicy: IdentifierSchema }).strict(),
          audit: z
            .object({
              required: z.literal(true),
              eventType: IdentifierSchema,
              includePolicyDecision: z.literal(true),
            })
            .strict(),
        })
        .strict(),
    ),
  })
  .strict();
export const EmptySuccessSchema = AckSchema;
