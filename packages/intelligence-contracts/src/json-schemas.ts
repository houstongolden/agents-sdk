import { z, type ZodType } from "zod";
import {
  IntelligenceManifestSchema,
  ActorVisibleIntelligenceManifestSchema,
  ResourceTypeSchema,
  FieldDefinitionSchema,
  ResourceSchema,
  FragmentSchema,
  EnrichmentSchema,
  EmbeddingSchema,
  SearchDocumentSchema,
  FactSchema,
  ObservationSchema,
  EdgeSchema,
  EventSchema,
  JobSchema,
  PolicySchema,
  FeedbackSchema,
} from "./contracts.js";
import { EvidencePackSchema, CitationSchema } from "./evidence.js";
import { FragmentLocatorSchema } from "./identifiers.js";
import { IntelligenceQuerySchema } from "./query.js";
import {
  INTELLIGENCE_TOOL_NAMES,
  IntelligenceErrorEnvelopeSchema,
  IntelligenceToolCatalogSchema,
  MutationReceiptSchema,
  intelligenceToolContracts,
} from "./tools.js";

const toolSchemas = Object.fromEntries(
  INTELLIGENCE_TOOL_NAMES.flatMap((name) => {
    const fileStem = name.replace("intelligence.", "intelligence-").replaceAll("_", "-");
    const tool = intelligenceToolContracts[name];
    return [
      [`${fileStem}.input.schema.json`, tool.inputSchema],
      [`${fileStem}.response.schema.json`, tool.outputSchema],
    ];
  }),
) as Record<string, ZodType>;

export const canonicalIntelligenceSchemas = {
  "manifest.schema.json": IntelligenceManifestSchema,
  "actor-visible-manifest.schema.json": ActorVisibleIntelligenceManifestSchema,
  "resource-type.schema.json": ResourceTypeSchema,
  "field-definition.schema.json": FieldDefinitionSchema,
  "resource.schema.json": ResourceSchema,
  "fragment.schema.json": FragmentSchema,
  "fragment-locator.schema.json": FragmentLocatorSchema,
  "enrichment.schema.json": EnrichmentSchema,
  "embedding.schema.json": EmbeddingSchema,
  "search-document.schema.json": SearchDocumentSchema,
  "fact.schema.json": FactSchema,
  "observation.schema.json": ObservationSchema,
  "edge.schema.json": EdgeSchema,
  "event.schema.json": EventSchema,
  "job.schema.json": JobSchema,
  "policy.schema.json": PolicySchema,
  "feedback.schema.json": FeedbackSchema,
  "intelligence-query.schema.json": IntelligenceQuerySchema,
  "citation.schema.json": CitationSchema,
  "evidence-pack.schema.json": EvidencePackSchema,
  "intelligence-error-envelope.schema.json": IntelligenceErrorEnvelopeSchema,
  "intelligence-tool-catalog.schema.json": IntelligenceToolCatalogSchema,
  "mutation-receipt.schema.json": MutationReceiptSchema,
  ...toolSchemas,
} satisfies Record<string, ZodType>;

function preserveClaimXor(schema: object): object {
  return {
    ...schema,
    oneOf: [
      { required: ["value"], not: { required: ["objectUrn"] } },
      { required: ["objectUrn"], not: { required: ["value"] } },
    ],
  };
}

export function generateCanonicalJsonSchemas(): Record<string, object> {
  return Object.fromEntries(
    Object.entries(canonicalIntelligenceSchemas).map(([name, schema]) => {
      const generated = z.toJSONSchema(schema, {
        target: "draft-2020-12",
        unrepresentable: "any",
      });
      return [
        name,
        name === "fact.schema.json" || name === "observation.schema.json"
          ? preserveClaimXor(generated)
          : generated,
      ];
    }),
  );
}
