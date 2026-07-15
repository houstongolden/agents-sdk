import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import {
  ActorVisibleIntelligenceManifestSchema,
  EmbeddingSchema,
  EvidencePackSchema,
  FactSchema,
  FragmentLocatorSchema,
  IntelligenceQuerySchema,
  IntelligenceManifestSchema,
  JobSchema,
  ResourceSchema,
  formatAdilUrn,
  formatFragmentLocator,
  generateCanonicalJsonSchemas,
  intelligenceToolContracts,
  parseAdilUrn,
  parseFragmentLocator,
  validateIntelligenceManifest,
  validateResourceAgainstManifest,
  toActorVisibleIntelligenceManifest,
} from "../src/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string) =>
  JSON.parse(readFileSync(path.resolve(here, "../fixtures", name), "utf8")) as unknown;

describe("ADIL identifiers and locators", () => {
  it("round trips a canonical opaque URN", () => {
    const urn = formatAdilUrn({
      issuerId: "hg",
      environment: "prod",
      app: "bamfai",
      resourceType: "media.asset",
      opaqueId: "01JABC",
    });
    expect(parseAdilUrn(urn)).toEqual({
      issuerId: "hg",
      environment: "prod",
      app: "bamfai",
      resourceType: "media.asset",
      opaqueId: "01JABC",
    });
  });
  it.each([
    "urn:agents-sdk:hg:prod:bamfai:media.asset",
    "urn:agents-sdk:HG:prod:bamfai:media.asset:1",
    "urn:agents-sdk:hg:prod:bamfai:media.asset:secret:value",
  ])("rejects malformed URN %s", (urn) => expect(() => parseAdilUrn(urn)).toThrow());
  it("round trips a bounded image region deterministically", () => {
    const locator = {
      kind: "image_region",
      x: 0.1,
      y: 0.2,
      widthWithinRemainder: 0.3,
      heightWithinRemainder: 0.4,
    } as const;
    expect(parseFragmentLocator(formatFragmentLocator(locator))).toEqual(locator);
    expect(FragmentLocatorSchema.safeParse({ ...locator, widthWithinRemainder: 1.1 }).success).toBe(
      false,
    );
  });
});

describe("ADIL contracts", () => {
  it("validates a manifest and evidence pack", () => {
    expect(validateIntelligenceManifest(fixture("valid/manifest.json")).ok).toBe(true);
    expect(EvidencePackSchema.safeParse(fixture("valid/evidence-pack.json")).success).toBe(true);
  });
  it("rejects prohibited AI processing semantically", () => {
    const result = validateIntelligenceManifest(fixture("invalid/prohibited-field-indexed.json"));
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.issues.map(({ code }) => code)).toContain("prohibited_ai_processing");
  });
  it("rejects malformed resources structurally", () =>
    expect(ResourceSchema.safeParse(fixture("invalid/malformed-resource.json")).success).toBe(
      false,
    ));
  it("exposes exactly twelve typed tools with safe mutation metadata", () => {
    expect(Object.keys(intelligenceToolContracts)).toHaveLength(12);
    for (const contract of Object.values(intelligenceToolContracts)) {
      if (contract.risk !== "read") {
        expect(contract.idempotencyRequired).toBe(true);
        expect(contract.approval).not.toBe("none");
      }
      expect(contract.limits.ratePolicy).toMatch(/^intelligence\./);
      expect(contract.limits.costPolicy).toMatch(/^intelligence\./);
      expect(contract.audit).toMatchObject({ required: true, includePolicyDecision: true });
      expect(
        contract.errorSchema.safeParse({
          requestId: "request-01",
          error: { code: "not-authorized", message: "Not authorized", retryable: false },
        }).success,
      ).toBe(true);
    }
  });
  it("generates JSON Schema from the canonical Zod contracts", () => {
    expect(Object.keys(generateCanonicalJsonSchemas())).toHaveLength(47);
    expect(IntelligenceManifestSchema.safeParse(fixture("valid/manifest.json")).success).toBe(true);
  });

  it("exposes only a sanitized actor-visible registry", () => {
    const manifest = IntelligenceManifestSchema.parse(fixture("valid/manifest.json"));
    const visible = toActorVisibleIntelligenceManifest(manifest);
    expect(ActorVisibleIntelligenceManifestSchema.safeParse(visible).success).toBe(true);
    const serialized = JSON.stringify(visible);
    expect(serialized).not.toContain("media_assets");
    expect(serialized).not.toContain("user_owner");
    expect(serialized).not.toContain("app-rls");
    expect(serialized).not.toContain("access_token");
    expect(
      intelligenceToolContracts["intelligence.describe_schema"].successSchema.safeParse({
        requestId: "request-01",
        data: { manifests: [visible] },
        page: { hasMore: false },
      }).success,
    ).toBe(true);
  });

  it("keeps generated JSON Schema parity for refined claims and embeddings", () => {
    const generated = generateCanonicalJsonSchemas();
    const ajv = new Ajv2020({ strict: false });
    addFormats(ajv);
    const embeddingJson = ajv.compile(generated["embedding.schema.json"]!);
    const factJson = ajv.compile(generated["fact.schema.json"]!);
    const embedding = {
      schemaVersion: "houston.dev/intelligence/v0.1",
      id: "embedding-01",
      target: { resourceUrn: "urn:agents-sdk:hg:test:bamfai:media.asset:01JTEST" },
      model: "test-model",
      modelVersion: "1",
      dimensions: 384,
      vector: Array.from({ length: 384 }, () => 0),
      contentHash: "a".repeat(64),
      policyVersion: "1",
      state: "active",
    };
    expect(EmbeddingSchema.safeParse(embedding).success).toBe(true);
    expect(embeddingJson(embedding)).toBe(true);
    const mismatched = { ...embedding, vector: embedding.vector.slice(1) };
    expect(EmbeddingSchema.safeParse(mismatched).success).toBe(false);
    expect(embeddingJson(mismatched)).toBe(false);

    const fact = {
      schemaVersion: "houston.dev/intelligence/v0.1",
      id: "fact-01",
      subject: { resourceUrn: "urn:agents-sdk:hg:test:bamfai:media.asset:01JTEST" },
      predicate: "media.subject",
      value: "conference",
      evidenceRefs: [{ resourceUrn: "urn:agents-sdk:hg:test:bamfai:media.asset:01JTEST" }],
      confidence: 0.9,
      kind: "fact",
      verification: "supported",
    };
    expect(FactSchema.safeParse(fact).success).toBe(true);
    expect(factJson(fact)).toBe(true);
    const ambiguous = { ...fact, objectUrn: fact.subject.resourceUrn };
    expect(FactSchema.safeParse(ambiguous).success).toBe(false);
    expect(factJson(ambiguous)).toBe(false);
  });

  it("keeps JSON Schema parity for query filter value requirements", () => {
    const generated = generateCanonicalJsonSchemas();
    const ajv = new Ajv2020({ strict: false });
    addFormats(ajv);
    const queryJson = ajv.compile(generated["intelligence-query.schema.json"]!);
    const query = {
      query: "conference photo",
      actor: {
        actorId: "actor-01",
        app: "bamfai",
        audience: "bamfai-user",
        tenantId: "tenant-01",
        scopes: ["intelligence:search"],
      },
      resourceTypes: [],
      modalities: ["image"],
      exactFilters: [{ fieldPath: "/title", operator: "eq" }],
      relationships: [],
      sensitivityCeiling: "workspace_private",
      purpose: "user-search",
      topK: 10,
      evidence: { required: true, minimumCitations: 0, includeScoreBreakdown: true },
    };
    expect(IntelligenceQuerySchema.safeParse(query).success).toBe(false);
    expect(queryJson(query)).toBe(false);
    const existsQuery = {
      ...query,
      exactFilters: [{ fieldPath: "/title", operator: "exists" }],
    };
    expect(IntelligenceQuerySchema.safeParse(existsQuery).success).toBe(true);
    expect(queryJson(existsQuery)).toBe(true);
  });

  it("uses parity-safe job retry budgets and bounded image-region extents", () => {
    const generated = generateCanonicalJsonSchemas();
    const ajv = new Ajv2020({ strict: false });
    addFormats(ajv);
    const jobJson = ajv.compile(generated["job.schema.json"]!);
    const locatorJson = ajv.compile(generated["fragment-locator.schema.json"]!);
    const job = {
      schemaVersion: "houston.dev/intelligence/v0.1",
      id: "job-01",
      eventId: "event-01",
      pipeline: "image-v1",
      pipelineVersion: "1",
      idempotencyKey: "image-01-v1",
      attempt: 3,
      remainingAttempts: 0,
      state: "dead_letter",
      queuedAt: "2026-07-15T00:00:00.000Z",
    };
    expect(JobSchema.safeParse(job).success).toBe(true);
    expect(jobJson(job)).toBe(true);
    const invalidJob = { ...job, remainingAttempts: -1 };
    expect(JobSchema.safeParse(invalidJob).success).toBe(false);
    expect(jobJson(invalidJob)).toBe(false);

    const region = {
      kind: "image_region",
      x: 0.8,
      y: 0.7,
      widthWithinRemainder: 1,
      heightWithinRemainder: 1,
    };
    expect(FragmentLocatorSchema.safeParse(region).success).toBe(true);
    expect(locatorJson(region)).toBe(true);
    const invalidRegion = { ...region, widthWithinRemainder: 1.01 };
    expect(FragmentLocatorSchema.safeParse(invalidRegion).success).toBe(false);
    expect(locatorJson(invalidRegion)).toBe(false);
  });

  it("binds resource URNs to the manifest app, environment, and resource type", () => {
    const resource = {
      schemaVersion: "houston.dev/intelligence/v0.1",
      urn: "urn:agents-sdk:hg:test:bamfai:media.asset:01JTEST",
      resourceType: "bamfai.media_asset",
      source: { adapter: "postgres", nativeId: "native-01" },
      tenantId: "tenant-01",
      sourceVersion: "1",
      sourceHash: "b".repeat(64),
      policyRef: "workspace-private",
      policyVersion: "1",
      state: "active",
      createdAt: "2026-07-15T00:00:00.000Z",
      updatedAt: "2026-07-15T00:00:00.000Z",
    };
    expect(validateResourceAgainstManifest(resource, fixture("valid/manifest.json")).ok).toBe(true);
    const mismatched = { ...resource, urn: resource.urn.replace(":bamfai:", ":bamfos:") };
    const result = validateResourceAgainstManifest(mismatched, fixture("valid/manifest.json"));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues.map(({ code }) => code)).toContain("urn_app_mismatch");

    const wrongIssuer = { ...resource, urn: resource.urn.replace(":hg:", ":vendor:") };
    const issuerResult = validateResourceAgainstManifest(
      wrongIssuer,
      fixture("valid/manifest.json"),
    );
    expect(issuerResult.ok).toBe(false);
    if (!issuerResult.ok)
      expect(issuerResult.issues.map(({ code }) => code)).toContain("urn_issuer_mismatch");
  });
});
