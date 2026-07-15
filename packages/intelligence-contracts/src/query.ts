import { z } from "zod";
import {
  AdilUrnSchema,
  IdentifierSchema,
  JsonPointerSchema,
  JsonValueSchema,
  ModalitySchema,
  NonEmptyStringSchema,
  OpaqueIdSchema,
  SensitivitySchema,
} from "./common.js";

export const ActorContextSchema = z
  .object({
    actorId: OpaqueIdSchema,
    app: IdentifierSchema,
    audience: IdentifierSchema,
    tenantId: OpaqueIdSchema,
    workspaceId: OpaqueIdSchema.optional(),
    clientId: OpaqueIdSchema.optional(),
    scopes: z.array(NonEmptyStringSchema),
  })
  .strict();

export const CursorPaginationSchema = z
  .object({
    cursor: z.string().min(1).optional(),
    limit: z.number().int().min(1).max(100).default(20),
  })
  .strict();
export const CursorPageSchema = z
  .object({ nextCursor: z.string().min(1).optional(), hasMore: z.boolean() })
  .strict();

const ValueQueryFilterSchema = z
  .object({
    fieldPath: JsonPointerSchema,
    operator: z.enum(["eq", "neq", "in", "contains", "gte", "lte"]),
    value: JsonValueSchema,
  })
  .strict();
const ExistsQueryFilterSchema = z
  .object({
    fieldPath: JsonPointerSchema,
    operator: z.literal("exists"),
  })
  .strict();
export const QueryFilterSchema = z.union([ValueQueryFilterSchema, ExistsQueryFilterSchema]);

export const IntelligenceQuerySchema = z
  .object({
    query: NonEmptyStringSchema.max(4000),
    actor: ActorContextSchema,
    resourceTypes: z.array(IdentifierSchema),
    modalities: z.array(ModalitySchema),
    exactFilters: z.array(QueryFilterSchema),
    dateRange: z
      .object({ from: z.string().datetime().optional(), to: z.string().datetime().optional() })
      .strict()
      .optional(),
    relationships: z.array(
      z
        .object({
          type: IdentifierSchema,
          targetUrn: AdilUrnSchema.optional(),
          maxHops: z.number().int().min(1).max(3).default(1),
        })
        .strict(),
    ),
    sensitivityCeiling: SensitivitySchema,
    purpose: IdentifierSchema,
    topK: z.number().int().min(1).max(100).default(20),
    evidence: z
      .object({
        required: z.boolean(),
        minimumCitations: z.number().int().min(0).max(20),
        includeScoreBreakdown: z.boolean(),
      })
      .strict(),
  })
  .strict();

export type ActorContext = z.infer<typeof ActorContextSchema>;
export type CursorPagination = z.infer<typeof CursorPaginationSchema>;
export type IntelligenceQuery = z.infer<typeof IntelligenceQuerySchema>;
