import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { runManifestAcceptance } from "../src/index.js";

describe("manifest acceptance", () => {
  it("passes the agent app template", async () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const fixture = path.resolve(here, "../../../templates/agent-app/agenty.json");
    const report = await runManifestAcceptance(fixture);
    expect(report.ok, JSON.stringify(report.checks)).toBe(true);
    expect(report.checks.every((check) => check.ok)).toBe(true);
  });
});
