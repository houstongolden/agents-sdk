import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";
import {
  AgentProjectManifestSchema,
  catalogAgentProject,
  validateAgentProject,
} from "../src/index.js";

const valid = {
  schemaVersion: "agents-sdk.com/agent-project/v1",
  kind: "AgentProject",
  metadata: { id: "test-agent", name: "Test Agent", version: "0.1.0", tags: [] },
  runtimes: [
    { id: "default-runtime", adapter: "custom", entrypoint: "src/agent.ts", capabilities: [] },
  ],
  skills: [],
  tools: [
    {
      id: "read-status",
      description: "Read status",
      inputSchema: {},
      risk: "read",
      approval: { required: false },
      runtimeIds: ["default-runtime"],
    },
  ],
  connectors: [],
  policies: { defaultToolMode: "allow-read", approvals: [] },
  evals: [],
  ui: { shell: "headless", surfaces: [] },
  provenance: {
    createdAt: "2026-07-15T00:00:00.000Z",
    updatedAt: "2026-07-15T00:00:00.000Z",
    generator: "test",
    source: { type: "template" },
  },
};

const here = path.dirname(fileURLToPath(import.meta.url));
const structuralSchema = JSON.parse(
  readFileSync(path.resolve(here, "../../../schemas/agent-project.schema.json"), "utf8"),
) as object;
const ajv = new Ajv2020({ strict: true });
addFormats(ajv);
const validateStructure = ajv.compile(structuralSchema);

describe("AgentProjectManifestSchema", () => {
  it("accepts a runtime-neutral manifest", () => {
    expect(AgentProjectManifestSchema.parse(valid).metadata.id).toBe("test-agent");
  });

  it("rejects unapproved mutating tools and unknown runtimes", () => {
    const input = structuredClone(valid);
    input.tools[0] = { ...input.tools[0], risk: "write", runtimeIds: ["missing-runtime"] };
    const result = validateAgentProject(input);
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.issues.map((issue) => issue.message)).toEqual(
        expect.arrayContaining([
          expect.stringContaining("explicit approval"),
          expect.stringContaining("Unknown runtime"),
        ]),
      );
  });

  it("builds a deterministic catalog", () => {
    const manifest = AgentProjectManifestSchema.parse(valid);
    expect(catalogAgentProject(manifest).tools).toEqual([
      { id: "read-status", risk: "read", approvalRequired: false },
    ]);
  });

  it("aligns required fields between Zod and JSON Schema", () => {
    const input = structuredClone(valid) as Record<string, unknown>;
    delete input.skills;
    expect(validateStructure(input)).toBe(false);
    expect(validateAgentProject(input).ok).toBe(false);
  });

  it.each(["/tmp/private/SKILL.md", "../private/SKILL.md", "C:\\private\\SKILL.md"])(
    "rejects an unsafe local skill path: %s",
    (value) => {
      const input = structuredClone(valid) as Record<string, unknown>;
      input.skills = [
        {
          id: "unsafe-skill",
          source: { type: "local", value },
          enabled: true,
          runtimeIds: ["default-runtime"],
        },
      ];
      expect(validateStructure(input)).toBe(false);
      expect(validateAgentProject(input).ok).toBe(false);
    },
  );

  it("keeps structural and semantic validation boundaries explicit", () => {
    const input = structuredClone(valid);
    input.tools[0] = { ...input.tools[0], risk: "write", approval: { required: false } };
    expect(validateStructure(input)).toBe(true);
    const semantic = validateAgentProject(input);
    expect(semantic.ok).toBe(false);
    if (!semantic.ok) expect(semantic.issues[0]?.message).toContain("explicit approval");
  });
});
