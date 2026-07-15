import { z } from "zod";

export const AGENTS_SDK_CONFIG_VERSION = "agents-sdk.com/config/v1" as const;
export const REGISTRY_INDEX_VERSION = "agents-sdk.com/registry-index/v1" as const;
export const REGISTRY_ITEM_VERSION = "agents-sdk.com/registry-item/v1" as const;

export const RegistryIdSchema = z
  .string()
  .regex(/^[a-z][a-z0-9-]{1,62}$/, "Use a lowercase kebab-case name");

export const SafeRelativePathSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value !== "." &&
      !value.startsWith("/") &&
      !value.startsWith("\\") &&
      !/^[A-Za-z]:[\\/]/.test(value) &&
      !value.includes("\0") &&
      !/(^|[\\/])\.\.([\\/]|$)/.test(value),
    "Use a safe project-relative path without parent traversal",
  );

const PackageMapSchema = z.record(z.string().min(1), z.string().min(1));

export const RegistryFileSchema = z
  .object({
    source: SafeRelativePathSchema,
    target: SafeRelativePathSchema,
    role: z.enum(["source", "test", "docs", "config", "example"]),
  })
  .strict();

export const RegistryItemSchema = z
  .object({
    $schema: z.string().optional(),
    schemaVersion: z.literal(REGISTRY_ITEM_VERSION),
    name: RegistryIdSchema,
    type: z.enum(["component", "pattern", "template", "example"]),
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(500),
    version: z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/),
    maturity: z.enum(["experimental", "preview", "stable"]),
    provenance: z
      .object({
        source: z.string().min(1),
        license: z.string().min(1),
        reviewedAt: z.string().date(),
      })
      .strict(),
    examples: z.array(RegistryIdSchema),
    compatibility: z
      .object({
        node: z.string().regex(/^>=\d+$/, "Use a minimum Node major such as >=20"),
        react: z
          .string()
          .regex(/^>=\d+$/, "Use a minimum React major such as >=18")
          .optional(),
        packages: PackageMapSchema,
      })
      .strict(),
    security: z.object({ notes: z.array(z.string().min(1)).min(1) }).strict(),
    accessibility: z.object({ notes: z.array(z.string().min(1)).min(1) }).strict(),
    registryDependencies: z.array(RegistryIdSchema).default([]),
    dependencies: PackageMapSchema.default({}),
    devDependencies: PackageMapSchema.default({}),
    files: z.array(RegistryFileSchema).min(1),
    documentation: z
      .object({
        path: SafeRelativePathSchema,
        whenToUse: z.string().min(1),
        whenNotToUse: z.string().min(1),
        tradeoffs: z.array(z.string().min(1)).min(1),
      })
      .strict(),
    test: z
      .object({
        command: z.string().min(1),
        paths: z.array(SafeRelativePathSchema).min(1),
      })
      .strict(),
  })
  .strict()
  .superRefine((item, context) => {
    const targets = new Set<string>();
    const documentationTargets = new Set(
      item.files.filter((file) => file.role === "docs").map((file) => file.target),
    );
    const testTargets = new Set(
      item.files.filter((file) => file.role === "test").map((file) => file.target),
    );
    item.files.forEach((file, index) => {
      if (targets.has(file.target))
        context.addIssue({
          code: "custom",
          path: ["files", index, "target"],
          message: `Duplicate target: ${file.target}`,
        });
      targets.add(file.target);
    });
    if (!documentationTargets.has(item.documentation.path))
      context.addIssue({
        code: "custom",
        path: ["documentation", "path"],
        message: "Documentation path must reference an installed docs target",
      });
    item.test.paths.forEach((testPath, index) => {
      if (!testTargets.has(testPath))
        context.addIssue({
          code: "custom",
          path: ["test", "paths", index],
          message: "Test path must reference an installed test target",
        });
    });
  });

export const RegistryIndexSchema = z
  .object({
    $schema: z.string().optional(),
    schemaVersion: z.literal(REGISTRY_INDEX_VERSION),
    items: z
      .array(
        z
          .object({
            name: RegistryIdSchema,
            type: z.enum(["component", "pattern", "template", "example"]),
            path: SafeRelativePathSchema,
          })
          .strict(),
      )
      .superRefine((items, context) => {
        const seen = new Set<string>();
        items.forEach((item, index) => {
          if (seen.has(item.name))
            context.addIssue({
              code: "custom",
              path: [index, "name"],
              message: `Duplicate registry item: ${item.name}`,
            });
          seen.add(item.name);
        });
      }),
  })
  .strict();

const InstalledFileSchema = z
  .object({ path: SafeRelativePathSchema, sha256: z.string().regex(/^[a-f0-9]{64}$/) })
  .strict();

export const AgentsSdkConfigSchema = z
  .object({
    $schema: z.string().optional(),
    schemaVersion: z.literal(AGENTS_SDK_CONFIG_VERSION),
    registry: z.string().min(1),
    paths: z
      .object({
        components: SafeRelativePathSchema,
        patterns: SafeRelativePathSchema,
        examples: SafeRelativePathSchema,
      })
      .strict(),
    installed: z.array(
      z
        .object({
          name: RegistryIdSchema,
          version: z.string().min(1),
          dependencies: PackageMapSchema,
          devDependencies: PackageMapSchema,
          files: z.array(InstalledFileSchema),
        })
        .strict(),
    ),
  })
  .strict();

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
export type AgentsSdkConfig = z.infer<typeof AgentsSdkConfigSchema>;

export function createAgentsSdkConfig(registry = "https://agents-sdk.com/registry") {
  return AgentsSdkConfigSchema.parse({
    $schema: "https://agents-sdk.com/schemas/config/v1.json",
    schemaVersion: AGENTS_SDK_CONFIG_VERSION,
    registry,
    paths: {
      components: "components",
      patterns: "patterns",
      examples: "examples",
    },
    installed: [],
  });
}
