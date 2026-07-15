import { z } from "zod";
import type {
  IntelligenceToolInput,
  IntelligenceToolName,
  IntelligenceToolOutput,
} from "./tools.js";
import { intelligenceToolContracts } from "./tools.js";

export interface IntelligenceAdapterContext {
  requestId: string;
  abortSignal?: AbortSignal;
  now?: Date;
}

export type IntelligenceAdapter = {
  readonly id: string;
  readonly version: string;
  readonly capabilities: readonly IntelligenceToolName[];
  execute<N extends IntelligenceToolName>(
    name: N,
    input: IntelligenceToolInput<N>,
    context: IntelligenceAdapterContext,
  ): Promise<IntelligenceToolOutput<N>>;
};

export interface AdapterConformanceCase<N extends IntelligenceToolName = IntelligenceToolName> {
  name: N;
  input: IntelligenceToolInput<N>;
}
export interface AdapterConformanceCheck {
  name: IntelligenceToolName | AdapterConformanceProbeName | "capability_coverage";
  category: "contract" | "coverage" | "product_policy";
  ok: boolean;
  message: string;
}
export interface AdapterConformanceReport {
  ok: boolean;
  adapterId: string;
  checks: AdapterConformanceCheck[];
}

export const ADAPTER_CONFORMANCE_PROBE_NAMES = [
  "negative_isolation",
  "policy_version_recheck",
  "approval_enforcement",
  "idempotency_replay",
] as const;
export type AdapterConformanceProbeName = (typeof ADAPTER_CONFORMANCE_PROBE_NAMES)[number];
export interface AdapterConformanceProbeResult {
  ok: boolean;
  message: string;
}
export type AdapterConformanceProbe = (context: {
  adapter: IntelligenceAdapter;
  cases: readonly AdapterConformanceCase[];
}) => Promise<AdapterConformanceProbeResult>;
export interface AdapterConformanceOptions {
  cases: readonly AdapterConformanceCase[];
  probes: Partial<Record<AdapterConformanceProbeName, AdapterConformanceProbe>>;
}

export async function runIntelligenceAdapterConformance(
  adapter: IntelligenceAdapter,
  options: AdapterConformanceOptions,
): Promise<AdapterConformanceReport> {
  const checks: AdapterConformanceCheck[] = [];
  const covered = new Set(options.cases.map(({ name }) => name));
  for (const capability of adapter.capabilities) {
    checks.push({
      name: "capability_coverage",
      category: "coverage",
      ok: covered.has(capability),
      message: covered.has(capability)
        ? `Capability covered: ${capability}`
        : `No contract case supplied for declared capability: ${capability}`,
    });
  }

  for (const testCase of options.cases) {
    const contract = intelligenceToolContracts[testCase.name];
    const input = contract.inputSchema.safeParse(testCase.input);
    if (!input.success) {
      checks.push({
        name: testCase.name,
        category: "contract",
        ok: false,
        message: `Invalid conformance input: ${z.prettifyError(input.error)}`,
      });
      continue;
    }
    if (!adapter.capabilities.includes(testCase.name)) {
      checks.push({
        name: testCase.name,
        category: "contract",
        ok: false,
        message: "Adapter does not declare this capability",
      });
      continue;
    }
    try {
      const output: unknown = await adapter.execute(testCase.name, input.data as never, {
        requestId: `conformance:${testCase.name}`,
      });
      const validated = contract.outputSchema.safeParse(output);
      checks.push({
        name: testCase.name,
        category: "contract",
        ok: validated.success,
        message: validated.success ? "Output conforms" : z.prettifyError(validated.error),
      });
    } catch (error) {
      checks.push({
        name: testCase.name,
        category: "contract",
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const requiredProbes = new Set<AdapterConformanceProbeName>([
    "negative_isolation",
    "policy_version_recheck",
  ]);
  if (adapter.capabilities.some((name) => intelligenceToolContracts[name].risk !== "read")) {
    requiredProbes.add("approval_enforcement");
    requiredProbes.add("idempotency_replay");
  }
  for (const name of requiredProbes) {
    const probe = options.probes[name];
    if (!probe) {
      checks.push({
        name,
        category: "product_policy",
        ok: false,
        message: `Missing required app-owned conformance probe: ${name}`,
      });
      continue;
    }
    try {
      const result = await probe({ adapter, cases: options.cases });
      checks.push({ name, category: "product_policy", ...result });
    } catch (error) {
      checks.push({
        name,
        category: "product_policy",
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return { ok: checks.length > 0 && checks.every(({ ok }) => ok), adapterId: adapter.id, checks };
}
