import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  AgentsSdkConfigSchema,
  RegistryIndexSchema,
  RegistryItemSchema,
  createAgentsSdkConfig,
} from "../src/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("Agents SDK registry contracts", () => {
  it("validates every checked-in registry item", async () => {
    const index = RegistryIndexSchema.parse(
      JSON.parse(await readFile(path.join(root, "registry/index.json"), "utf8")),
    );
    expect(index.items.length).toBeGreaterThanOrEqual(7);
    const knownItems = new Set(index.items.map((entry) => entry.name));
    for (const entry of index.items) {
      const item = RegistryItemSchema.parse(
        JSON.parse(await readFile(path.join(root, "registry", entry.path), "utf8")),
      );
      expect(item.name).toBe(entry.name);
      expect(item.provenance.license).toBe("MIT");
      expect(item.security.notes.length).toBeGreaterThan(0);
      expect(item.accessibility.notes.length).toBeGreaterThan(0);
      for (const example of item.examples) expect(knownItems.has(example)).toBe(true);
      for (const dependency of item.registryDependencies)
        expect(knownItems.has(dependency)).toBe(true);
      for (const file of item.files) {
        const registrySource = path.join(root, "registry", file.source);
        const repositorySource = path.join(root, file.source);
        await expect(
          readFile(registrySource, "utf8").catch(() => readFile(repositorySource, "utf8")),
        ).resolves.not.toHaveLength(0);
      }
      const installedTargets = new Set(item.files.map((file) => file.target));
      expect(installedTargets.has(item.documentation.path)).toBe(true);
      for (const testPath of item.test.paths) expect(installedTargets.has(testPath)).toBe(true);
      if (item.test.command.startsWith("vitest run "))
        for (const testPath of item.test.paths) expect(item.test.command).toContain(testPath);
    }
  });

  it("rejects traversal in sources, targets, and configured paths", () => {
    const config = createAgentsSdkConfig();
    expect(
      AgentsSdkConfigSchema.safeParse({
        ...config,
        paths: { ...config.paths, components: "../outside" },
      }).success,
    ).toBe(false);
    const validItem = {
      schemaVersion: "agents-sdk.com/registry-item/v1",
      name: "path-fixture",
      type: "component",
      title: "Path fixture",
      description: "Otherwise-valid fixture for isolated path validation",
      version: "0.1.0",
      maturity: "experimental",
      provenance: {
        source: "test fixture",
        license: "MIT",
        reviewedAt: "2026-07-15",
      },
      examples: [],
      compatibility: { node: ">=20", packages: {} },
      security: { notes: ["Test fixture only."] },
      accessibility: { notes: ["Test fixture only."] },
      registryDependencies: [],
      dependencies: {},
      devDependencies: {},
      files: [
        { source: "sources/path-fixture.ts", target: "components/path-fixture.ts", role: "source" },
        {
          source: "sources/path-fixture.md",
          target: "components/path-fixture.md",
          role: "docs",
        },
        {
          source: "sources/path-fixture.test.ts",
          target: "components/path-fixture.test.ts",
          role: "test",
        },
      ],
      documentation: {
        path: "components/path-fixture.md",
        whenToUse: "Use only to test registry paths.",
        whenNotToUse: "Do not publish this fixture.",
        tradeoffs: ["It is intentionally synthetic."],
      },
      test: {
        command: "vitest run components/path-fixture.test.ts",
        paths: ["components/path-fixture.test.ts"],
      },
    };
    expect(RegistryItemSchema.safeParse(validItem).success).toBe(true);

    const expectTraversalFailure = (candidate: unknown, issuePath: (string | number)[]) => {
      const result = RegistryItemSchema.safeParse(candidate);
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: issuePath,
              message: "Use a safe project-relative path without parent traversal",
            }),
          ]),
        );
    };

    expectTraversalFailure(
      {
        ...validItem,
        files: [{ ...validItem.files[0], source: "../secret" }, ...validItem.files.slice(1)],
      },
      ["files", 0, "source"],
    );
    expectTraversalFailure(
      {
        ...validItem,
        files: [{ ...validItem.files[0], target: "../outside.ts" }, ...validItem.files.slice(1)],
      },
      ["files", 0, "target"],
    );
    expectTraversalFailure(
      {
        ...validItem,
        documentation: { ...validItem.documentation, path: "../outside.md" },
      },
      ["documentation", "path"],
    );
    expectTraversalFailure(
      { ...validItem, test: { ...validItem.test, paths: ["../outside.test.ts"] } },
      ["test", "paths", 0],
    );
  });
});
