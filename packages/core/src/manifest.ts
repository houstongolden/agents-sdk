import { z } from "zod";

export const AGENT_PROJECT_SCHEMA_VERSION = "agenty.dev/agent-project/v1" as const;

const IdSchema = z.string().regex(/^[a-z][a-z0-9-]{1,62}$/, "Use a lowercase kebab-case id");
const SemverSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, "Use semantic versioning");
const RelativePathSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !value.startsWith("/") &&
      !value.startsWith("\\") &&
      !/^[A-Za-z]:[\\/]/.test(value) &&
      !value.includes("\0") &&
      !/(^|[\\/])\.\.([\\/]|$)/.test(value),
    "Use a project-relative path without parent traversal",
  );
const JsonSchemaSchema = z.record(z.string(), z.unknown());

export const RuntimeAdapterSchema = z
  .object({
    id: IdSchema,
    adapter: z.enum(["ai-sdk", "openai-agents", "claude", "codex", "eve", "mcp", "custom"]),
    entrypoint: RelativePathSchema,
    capabilities: z.array(z.string().min(1)),
    config: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const SkillReferenceSchema = z
  .object({
    id: IdSchema,
    source: z.discriminatedUnion("type", [
      z.object({ type: z.literal("local"), value: RelativePathSchema }).strict(),
      z.object({ type: z.literal("package"), value: z.string().min(1) }).strict(),
      z.object({ type: z.literal("registry"), value: z.string().min(1) }).strict(),
    ]),
    enabled: z.boolean(),
    runtimeIds: z.array(IdSchema),
  })
  .strict();

export const ToolDefinitionSchema = z
  .object({
    id: IdSchema,
    description: z.string().min(1),
    inputSchema: JsonSchemaSchema,
    outputSchema: JsonSchemaSchema.optional(),
    risk: z.enum(["read", "write", "irreversible"]),
    approval: z
      .object({
        required: z.boolean(),
        policyId: IdSchema.optional(),
      })
      .strict(),
    runtimeIds: z.array(IdSchema),
  })
  .strict();

export const ConnectorDefinitionSchema = z
  .object({
    id: IdSchema,
    kind: z.enum(["api", "mcp", "oauth", "webhook", "database", "custom"]),
    endpoint: z.string().url().optional(),
    auth: z
      .object({
        type: z.enum(["none", "api-key", "oauth2", "service-account", "custom"]),
        env: z.array(
          z.string().regex(/^[A-Z][A-Z0-9_]*$/, "Use environment variable names, never values"),
        ),
      })
      .strict(),
    scopes: z.array(z.string().min(1)),
  })
  .strict();

export const ApprovalPolicySchema = z
  .object({
    id: IdSchema,
    when: z
      .object({
        risks: z.array(z.enum(["write", "irreversible"])),
        toolIds: z.array(IdSchema),
      })
      .strict(),
    approvers: z.array(z.enum(["user", "workspace-admin", "policy-engine"])).min(1),
    expiresInSeconds: z.number().int().positive().optional(),
  })
  .strict();

export const EvalDefinitionSchema = z
  .object({
    id: IdSchema,
    type: z.enum(["fixture", "rubric", "programmatic"]),
    path: RelativePathSchema,
    threshold: z.number().min(0).max(1).optional(),
  })
  .strict();

export const AgentProjectManifestSchema = z
  .object({
    $schema: z.string().optional(),
    schemaVersion: z.literal(AGENT_PROJECT_SCHEMA_VERSION),
    kind: z.literal("AgentProject"),
    metadata: z
      .object({
        id: IdSchema,
        name: z.string().min(1).max(120),
        description: z.string().max(500).optional(),
        version: SemverSchema,
        tags: z.array(z.string().min(1)),
      })
      .strict(),
    runtimes: z.array(RuntimeAdapterSchema).min(1),
    skills: z.array(SkillReferenceSchema),
    tools: z.array(ToolDefinitionSchema),
    connectors: z.array(ConnectorDefinitionSchema),
    policies: z
      .object({
        defaultToolMode: z.enum(["deny", "allow-read"]),
        approvals: z.array(ApprovalPolicySchema),
      })
      .strict(),
    evals: z.array(EvalDefinitionSchema),
    ui: z
      .object({
        shell: z.enum(["chat", "chat-artifact", "headless"]),
        surfaces: z.array(
          z.enum(["sidebar", "chat", "artifact", "connectors", "files", "knowledge", "loops"]),
        ),
        composer: z
          .object({ owner: z.literal("parent-shell") })
          .strict()
          .optional(),
      })
      .strict(),
    provenance: z
      .object({
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        generator: z.string().min(1),
        source: z
          .object({
            type: z.enum(["repository", "template", "import"]),
            uri: z.string().optional(),
          })
          .strict(),
        revision: z.string().min(1).optional(),
      })
      .strict(),
  })
  .strict()
  .superRefine((manifest, context) => {
    const collections = [
      ["runtimes", manifest.runtimes],
      ["skills", manifest.skills],
      ["tools", manifest.tools],
      ["connectors", manifest.connectors],
      ["policies.approvals", manifest.policies.approvals],
      ["evals", manifest.evals],
    ] as const;
    for (const [name, records] of collections) {
      const seen = new Set<string>();
      records.forEach((record, index) => {
        if (seen.has(record.id))
          context.addIssue({
            code: "custom",
            path: [name, index, "id"],
            message: `Duplicate id: ${record.id}`,
          });
        seen.add(record.id);
      });
    }

    const runtimeIds = new Set(manifest.runtimes.map((runtime) => runtime.id));
    for (const [collection, records] of [
      ["skills", manifest.skills],
      ["tools", manifest.tools],
    ] as const) {
      records.forEach((record, index) =>
        record.runtimeIds.forEach((runtimeId, runtimeIndex) => {
          if (!runtimeIds.has(runtimeId))
            context.addIssue({
              code: "custom",
              path: [collection, index, "runtimeIds", runtimeIndex],
              message: `Unknown runtime: ${runtimeId}`,
            });
        }),
      );
    }

    const policyIds = new Set(manifest.policies.approvals.map((policy) => policy.id));
    const toolIds = new Set(manifest.tools.map((tool) => tool.id));
    manifest.tools.forEach((tool, index) => {
      if (tool.risk !== "read" && !tool.approval.required)
        context.addIssue({
          code: "custom",
          path: ["tools", index, "approval", "required"],
          message: `${tool.risk} tools require explicit approval`,
        });
      if (tool.approval.policyId && !policyIds.has(tool.approval.policyId))
        context.addIssue({
          code: "custom",
          path: ["tools", index, "approval", "policyId"],
          message: `Unknown approval policy: ${tool.approval.policyId}`,
        });
    });
    manifest.policies.approvals.forEach((policy, index) =>
      policy.when.toolIds.forEach((toolId, toolIndex) => {
        if (!toolIds.has(toolId))
          context.addIssue({
            code: "custom",
            path: ["policies", "approvals", index, "when", "toolIds", toolIndex],
            message: `Unknown tool: ${toolId}`,
          });
      }),
    );
  });

export type AgentProjectManifest = z.infer<typeof AgentProjectManifestSchema>;

export interface ValidationIssue {
  path: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; manifest: AgentProjectManifest; issues: [] }
  | { ok: false; issues: ValidationIssue[] };

export function validateAgentProject(input: unknown): ValidationResult {
  const result = AgentProjectManifestSchema.safeParse(input);
  if (result.success) return { ok: true, manifest: result.data, issues: [] };
  return {
    ok: false,
    issues: result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}

export function catalogAgentProject(manifest: AgentProjectManifest) {
  return {
    project: {
      id: manifest.metadata.id,
      name: manifest.metadata.name,
      version: manifest.metadata.version,
    },
    runtimes: manifest.runtimes.map(({ id, adapter, capabilities }) => ({
      id,
      adapter,
      capabilities,
    })),
    skills: manifest.skills.map(({ id, source, enabled }) => ({ id, source, enabled })),
    tools: manifest.tools.map(({ id, risk, approval }) => ({
      id,
      risk,
      approvalRequired: approval.required,
    })),
    connectors: manifest.connectors.map(({ id, kind, scopes }) => ({ id, kind, scopes })),
    evals: manifest.evals.map(({ id, type, threshold }) => ({ id, type, threshold })),
  };
}
