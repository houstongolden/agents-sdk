import { z } from "zod";
import {
  AdilUrnSchema,
  ConfidenceSchema,
  JsonPointerSchema,
  NonEmptyStringSchema,
  OpaqueIdSchema,
} from "./common.js";
import { FragmentLocatorSchema } from "./identifiers.js";

export const ScoreBreakdownSchema = z
  .object({
    exact: z.number().nonnegative().optional(),
    lexical: z.number().nonnegative().optional(),
    semantic: z.number().nonnegative().optional(),
    relationship: z.number().nonnegative().optional(),
    recency: z.number().nonnegative().optional(),
    feedback: z.number().nonnegative().optional(),
    fused: z.number().nonnegative(),
  })
  .strict();

export const CitationSchema = z
  .object({
    id: OpaqueIdSchema,
    resourceUrn: AdilUrnSchema,
    fragmentId: OpaqueIdSchema.optional(),
    fieldPath: JsonPointerSchema,
    locator: FragmentLocatorSchema.optional(),
    snippet: z.string().max(4000).optional(),
    previewUri: z.string().url().optional(),
    score: ScoreBreakdownSchema,
    sourceVersion: NonEmptyStringSchema,
    enrichmentVersion: NonEmptyStringSchema.optional(),
    confidence: ConfidenceSchema,
    policyDecisionId: NonEmptyStringSchema,
    retrievedAt: z.string().datetime(),
  })
  .strict();

export const EvidencePackSchema = z
  .object({
    id: OpaqueIdSchema,
    queryId: OpaqueIdSchema,
    citations: z.array(CitationSchema).min(1),
    conflicts: z.array(
      z
        .object({ citationIds: z.array(OpaqueIdSchema).min(2), reason: NonEmptyStringSchema })
        .strict(),
    ),
    warnings: z.array(NonEmptyStringSchema),
  })
  .strict();

export const LineageNodeSchema = z
  .object({
    id: NonEmptyStringSchema,
    kind: z.enum(["source", "fragment", "enrichment", "embedding", "fact", "edge", "job"]),
    version: NonEmptyStringSchema,
    state: NonEmptyStringSchema,
  })
  .strict();
export const LineageEdgeSchema = z
  .object({ from: NonEmptyStringSchema, to: NonEmptyStringSchema, relation: NonEmptyStringSchema })
  .strict();
export const LineageGraphSchema = z
  .object({ nodes: z.array(LineageNodeSchema), edges: z.array(LineageEdgeSchema) })
  .strict();

export type Citation = z.infer<typeof CitationSchema>;
export type EvidencePack = z.infer<typeof EvidencePackSchema>;
export type LineageGraph = z.infer<typeof LineageGraphSchema>;
