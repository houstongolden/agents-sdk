import { readFile } from "node:fs/promises";
import path from "node:path";
import { validateAgentProject } from "@agenty/core";

export interface AcceptanceCheck {
  id: string;
  ok: boolean;
  message: string;
}
export interface AcceptanceReport {
  ok: boolean;
  fixture: string;
  checks: AcceptanceCheck[];
}

export async function runManifestAcceptance(fixturePath: string): Promise<AcceptanceReport> {
  const resolved = path.resolve(fixturePath);
  let input: unknown;
  try {
    input = JSON.parse(await readFile(resolved, "utf8"));
  } catch (error) {
    return {
      ok: false,
      fixture: resolved,
      checks: [
        {
          id: "read-json",
          ok: false,
          message: error instanceof Error ? error.message : String(error),
        },
      ],
    };
  }
  const validation = validateAgentProject(input);
  if (!validation.ok)
    return {
      ok: false,
      fixture: resolved,
      checks: validation.issues.map((issue) => ({
        id: `schema:${issue.path}`,
        ok: false,
        message: issue.message,
      })),
    };
  const manifest = validation.manifest;
  const checks: AcceptanceCheck[] = [
    {
      id: "manifest-v1",
      ok: manifest.schemaVersion === "agenty.dev/agent-project/v1",
      message: "Uses the supported manifest contract",
    },
    {
      id: "runtime-present",
      ok: manifest.runtimes.length > 0,
      message: "Declares at least one runtime adapter",
    },
    {
      id: "mutations-approved",
      ok: manifest.tools
        .filter((tool) => tool.risk !== "read")
        .every((tool) => tool.approval.required),
      message: "All mutating tools require approval",
    },
    {
      id: "provenance-present",
      ok: Boolean(manifest.provenance.generator && manifest.provenance.source.type),
      message: "Carries provenance",
    },
    {
      id: "composer-owned-once",
      ok: manifest.ui.shell === "headless" || manifest.ui.composer?.owner === "parent-shell",
      message: "Interactive shells declare one parent-owned composer",
    },
  ];
  return { ok: checks.every((check) => check.ok), fixture: resolved, checks };
}
