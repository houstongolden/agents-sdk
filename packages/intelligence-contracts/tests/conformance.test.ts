import { describe, expect, it } from "vitest";
import type {
  IntelligenceAdapter,
  IntelligenceToolInput,
  IntelligenceToolName,
  IntelligenceToolOutput,
} from "../src/index.js";
import { runIntelligenceAdapterConformance } from "../src/index.js";

const actor = {
  actorId: "actor-01",
  app: "test-app",
  audience: "test-audience",
  tenantId: "tenant-01",
  scopes: ["intelligence:search"],
};

const passingReadProbes = {
  negative_isolation: async () => ({ ok: true, message: "Cross-tenant result was withheld" }),
  policy_version_recheck: async () => ({ ok: true, message: "Stale policy version was withheld" }),
};

class FakeAdapter implements IntelligenceAdapter {
  readonly id = "fake-adapter";
  readonly version = "0.1.0";
  readonly capabilities = ["intelligence.search"] as const;

  async execute<N extends IntelligenceToolName>(
    name: N,
    _input: IntelligenceToolInput<N>,
  ): Promise<IntelligenceToolOutput<N>> {
    if (name !== "intelligence.search") throw new Error(`Unsupported: ${name}`);
    return {
      requestId: "request-01",
      data: { queryId: "query-01", evidencePacks: [] },
      page: { hasMore: false },
    } as IntelligenceToolOutput<N>;
  }
}

class FakeMutationAdapter implements IntelligenceAdapter {
  readonly id = "fake-mutation-adapter";
  readonly version = "0.1.0";
  readonly capabilities = ["intelligence.request_refresh"] as const;

  async execute<N extends IntelligenceToolName>(
    name: N,
    input: IntelligenceToolInput<N>,
  ): Promise<IntelligenceToolOutput<N>> {
    if (name !== "intelligence.request_refresh") throw new Error(`Unsupported: ${name}`);
    const idempotencyKey = (input as { idempotencyKey: string }).idempotencyKey;
    return {
      requestId: "request-02",
      data: {
        receiptId: "receipt-01",
        state: "queued",
        auditId: "audit-01",
        idempotencyKey,
      },
    } as IntelligenceToolOutput<N>;
  }
}

describe("adapter conformance", () => {
  it("validates adapter outputs against the canonical contract", async () => {
    const report = await runIntelligenceAdapterConformance(new FakeAdapter(), {
      cases: [
        {
          name: "intelligence.search",
          input: {
            query: "conference photo",
            actor,
            resourceTypes: [],
            modalities: ["image"],
            exactFilters: [],
            relationships: [],
            sensitivityCeiling: "workspace_private",
            purpose: "user-search",
            topK: 10,
            evidence: { required: true, minimumCitations: 0, includeScoreBreakdown: true },
          },
        },
      ],
      probes: passingReadProbes,
    });
    expect(report.ok, JSON.stringify(report.checks)).toBe(true);
  });

  it("reports undeclared capabilities without executing them", async () => {
    const report = await runIntelligenceAdapterConformance(new FakeAdapter(), {
      cases: [{ name: "intelligence.get_processing_status", input: { actor, jobId: "job-01" } }],
      probes: passingReadProbes,
    });
    expect(report.ok).toBe(false);
    expect(report.checks.some(({ message }) => message.includes("does not declare"))).toBe(true);
  });

  it("fails closed when app-owned policy probes are missing", async () => {
    const report = await runIntelligenceAdapterConformance(new FakeAdapter(), {
      cases: [
        {
          name: "intelligence.search",
          input: {
            query: "conference photo",
            actor,
            resourceTypes: [],
            modalities: [],
            exactFilters: [],
            relationships: [],
            sensitivityCeiling: "workspace_private",
            purpose: "user-search",
            topK: 10,
            evidence: { required: true, minimumCitations: 0, includeScoreBreakdown: false },
          },
        },
      ],
      probes: {},
    });
    expect(report.ok).toBe(false);
    expect(report.checks.map(({ name }) => name)).toEqual(
      expect.arrayContaining(["negative_isolation", "policy_version_recheck"]),
    );
  });

  it("requires approval and replay probes for mutation capabilities", async () => {
    const report = await runIntelligenceAdapterConformance(new FakeMutationAdapter(), {
      cases: [
        {
          name: "intelligence.request_refresh",
          input: {
            actor,
            idempotencyKey: "refresh-01",
            reason: "Refresh stale enrichment",
            urn: "urn:agents-sdk:hg:test:bamfai:media.asset:01JTEST",
            pipelines: ["image-v1"],
          },
        },
      ],
      probes: passingReadProbes,
    });
    expect(report.ok).toBe(false);
    expect(report.checks.map(({ name }) => name)).toEqual(
      expect.arrayContaining(["approval_enforcement", "idempotency_replay"]),
    );
  });
});
