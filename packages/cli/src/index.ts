import { lstat, mkdir, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  AgentProjectManifestSchema,
  catalogAgentProject,
  validateAgentProject,
  type AgentProjectManifest,
} from "@agenty/core";

export interface CliIo {
  cwd: string;
  stdout: (message: string) => void;
  stderr: (message: string) => void;
}

interface CommandResult {
  exitCode: number;
  data: unknown;
}

const defaultIo: CliIo = { cwd: process.cwd(), stdout: console.log, stderr: console.error };

function output(result: CommandResult, json: boolean, io: CliIo): number {
  const target = result.exitCode === 0 ? io.stdout : io.stderr;
  target(json ? JSON.stringify(result.data, null, 2) : formatHuman(result.data));
  return result.exitCode;
}

function formatHuman(data: unknown): string {
  if (!data || typeof data !== "object") return String(data);
  const record = data as Record<string, unknown>;
  if (record.ok === false && Array.isArray(record.issues))
    return `invalid\n${record.issues.map((issue) => `- ${(issue as { path: string; message: string }).path}: ${(issue as { message: string }).message}`).join("\n")}`;
  if (typeof record.message === "string") return record.message;
  return JSON.stringify(data, null, 2);
}

function defaultManifest(id: string, timestamp: string): AgentProjectManifest {
  return AgentProjectManifestSchema.parse({
    $schema: "https://agenty.dev/schemas/agent-project/v1.json",
    schemaVersion: "agenty.dev/agent-project/v1",
    kind: "AgentProject",
    metadata: {
      id,
      name: id
        .split("-")
        .map((word) => word[0]?.toUpperCase() + word.slice(1))
        .join(" "),
      version: "0.1.0",
      tags: ["agenty"],
    },
    runtimes: [
      {
        id: "default-runtime",
        adapter: "custom",
        entrypoint: "src/agent.ts",
        capabilities: ["chat"],
      },
    ],
    skills: [
      {
        id: "starter-skill",
        source: { type: "local", value: "skills/starter/SKILL.md" },
        enabled: true,
        runtimeIds: ["default-runtime"],
      },
    ],
    tools: [],
    connectors: [],
    policies: { defaultToolMode: "deny", approvals: [] },
    evals: [
      { id: "manifest-smoke", type: "fixture", path: "evals/manifest-smoke.json", threshold: 1 },
    ],
    ui: {
      shell: "chat-artifact",
      surfaces: ["sidebar", "chat", "artifact", "connectors"],
      composer: { owner: "parent-shell" },
    },
    provenance: {
      createdAt: timestamp,
      updatedAt: timestamp,
      generator: "@agenty/cli",
      source: { type: "template", uri: "registry:agent-app" },
    },
  });
}

async function isRegularFile(filePath: string): Promise<boolean> {
  try {
    return (await lstat(filePath)).isFile();
  } catch {
    return false;
  }
}

function normalizeProjectId(directoryName: string): string {
  let id = directoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!id) id = "agent-app";
  if (!/^[a-z]/.test(id)) id = `agent-${id}`;
  id = id.slice(0, 63).replace(/-+$/g, "");
  return id.length >= 2 ? id : "agent-app";
}

interface ScaffoldFile {
  path: string;
  content: string;
}

function createScaffoldPlan(target: string, manifest: AgentProjectManifest): ScaffoldFile[] {
  const files: ScaffoldFile[] = [
    { path: path.join(target, "agenty.json"), content: `${JSON.stringify(manifest, null, 2)}\n` },
    ...manifest.runtimes.map((runtime) => ({
      path: path.join(target, runtime.entrypoint),
      content: `export const agent = ${JSON.stringify({ id: manifest.metadata.id, runtime: runtime.id, adapter: runtime.adapter }, null, 2)} as const;\n`,
    })),
    ...manifest.evals.map((evaluation) => ({
      path: path.join(target, evaluation.path),
      content: `${JSON.stringify({ schemaVersion: "agenty.dev/eval-fixture/v1", id: evaluation.id, cases: [] }, null, 2)}\n`,
    })),
    ...manifest.skills
      .filter((skill) => skill.source.type === "local")
      .map((skill) => ({
        path: path.join(target, skill.source.value),
        content: `---\nname: ${skill.id}\ndescription: Starter skill for ${manifest.metadata.name}.\n---\n\n# ${skill.id}\n\nAdd task-specific instructions here.\n`,
      })),
  ];
  const uniquePaths = new Set(files.map((file) => file.path));
  if (uniquePaths.size !== files.length)
    throw new Error("The scaffold plan contains duplicate file paths");
  return files;
}

async function pathKind(filePath: string): Promise<"missing" | "file" | "directory" | "other"> {
  try {
    const stat = await lstat(filePath);
    if (stat.isFile()) return "file";
    if (stat.isDirectory()) return "directory";
    return "other";
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "missing";
    throw error;
  }
}

async function writeScaffoldAtomically(target: string, files: ScaffoldFile[]): Promise<void> {
  const directorySet = new Set([target]);
  for (const file of files) {
    let directory = path.dirname(file.path);
    while (directory !== target && directory.startsWith(`${target}${path.sep}`)) {
      directorySet.add(directory);
      directory = path.dirname(directory);
    }
  }
  const directories = [...directorySet].sort(
    (left, right) => left.split(path.sep).length - right.split(path.sep).length,
  );
  const conflicts: string[] = [];
  for (const file of files)
    if ((await pathKind(file.path)) !== "missing") conflicts.push(file.path);
  for (const directory of directories) {
    const kind = await pathKind(directory);
    if (kind !== "missing" && kind !== "directory") conflicts.push(directory);
  }
  if (conflicts.length) {
    const error = new Error(
      `Refusing to overwrite conflicting path(s): ${[...new Set(conflicts)].join(", ")}`,
    );
    (error as NodeJS.ErrnoException).code = "AGENTY_PATH_CONFLICT";
    throw error;
  }

  const createdFiles: string[] = [];
  const createdDirectories: string[] = [];
  try {
    for (const directory of directories) {
      if ((await pathKind(directory)) === "missing") {
        await mkdir(directory);
        createdDirectories.push(directory);
      }
    }
    for (const file of files) {
      await writeFile(file.path, file.content, { flag: "wx" });
      createdFiles.push(file.path);
    }
  } catch (error) {
    await Promise.allSettled(createdFiles.reverse().map((file) => unlink(file)));
    for (const directory of createdDirectories.reverse())
      await rmdir(directory).catch(() => undefined);
    throw error;
  }
}

async function loadManifest(candidate: string, cwd: string) {
  const resolved = path.resolve(cwd, candidate);
  try {
    return { resolved, input: JSON.parse(await readFile(resolved, "utf8")) as unknown };
  } catch (error) {
    return { resolved, error: error instanceof Error ? error.message : String(error) };
  }
}

async function init(directory: string, io: CliIo): Promise<CommandResult> {
  const target = path.resolve(io.cwd, directory);
  const manifestPath = path.join(target, "agenty.json");
  try {
    const timestamp = new Date().toISOString();
    const manifest = defaultManifest(normalizeProjectId(path.basename(target)), timestamp);
    const files = createScaffoldPlan(target, manifest);
    await writeScaffoldAtomically(target, files);
    return {
      exitCode: 0,
      data: {
        ok: true,
        command: "init",
        path: manifestPath,
        files: files.map((file) => file.path),
        message: `Initialized ${manifestPath}`,
      },
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return {
      exitCode: 2,
      data: {
        ok: false,
        command: "init",
        code:
          code === "AGENTY_PATH_CONFLICT" || code === "EEXIST"
            ? "AGENTY_PATH_CONFLICT"
            : "AGENTY_INIT_FAILED",
        path: manifestPath,
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

async function validate(candidate: string, io: CliIo): Promise<CommandResult> {
  const loaded = await loadManifest(candidate, io.cwd);
  if ("error" in loaded)
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTY_READ_FAILED",
        path: loaded.resolved,
        issues: [{ path: "", message: loaded.error }],
      },
    };
  const result = validateAgentProject(loaded.input);
  return result.ok
    ? {
        exitCode: 0,
        data: {
          ok: true,
          command: "validate",
          path: loaded.resolved,
          project: result.manifest.metadata,
        },
      }
    : {
        exitCode: 1,
        data: { ok: false, command: "validate", path: loaded.resolved, issues: result.issues },
      };
}

async function doctor(candidate: string, io: CliIo): Promise<CommandResult> {
  const loaded = await loadManifest(candidate, io.cwd);
  if ("error" in loaded)
    return {
      exitCode: 2,
      data: {
        ok: false,
        command: "doctor",
        checks: [{ id: "manifest-readable", status: "fail", message: loaded.error }],
      },
    };
  const result = validateAgentProject(loaded.input);
  if (!result.ok)
    return {
      exitCode: 1,
      data: {
        ok: false,
        command: "doctor",
        checks: [{ id: "manifest-valid", status: "fail", issues: result.issues }],
      },
    };
  const root = path.dirname(loaded.resolved);
  const referenced = [
    ...result.manifest.runtimes.map((runtime) => [runtime.id, runtime.entrypoint] as const),
    ...result.manifest.skills
      .filter((skill) => skill.source.type === "local")
      .map((skill) => [skill.id, skill.source.value] as const),
    ...result.manifest.evals.map((evaluation) => [evaluation.id, evaluation.path] as const),
  ];
  const checks = await Promise.all(
    referenced.map(async ([id, relative]) => ({
      id: `path:${id}`,
      status: (await isRegularFile(path.resolve(root, relative))) ? "pass" : "fail",
      path: relative,
    })),
  );
  const failures = checks.filter((check) => check.status === "fail");
  return {
    exitCode: failures.length ? 1 : 0,
    data: {
      ok: failures.length === 0,
      command: "doctor",
      path: loaded.resolved,
      checks: [{ id: "manifest-valid", status: "pass" }, ...checks],
      failures: failures.length,
    },
  };
}

async function catalog(candidate: string, io: CliIo): Promise<CommandResult> {
  const loaded = await loadManifest(candidate, io.cwd);
  if ("error" in loaded)
    return {
      exitCode: 2,
      data: { ok: false, command: "catalog", issues: [{ path: "", message: loaded.error }] },
    };
  const result = validateAgentProject(loaded.input);
  return result.ok
    ? {
        exitCode: 0,
        data: { ok: true, command: "catalog", catalog: catalogAgentProject(result.manifest) },
      }
    : { exitCode: 1, data: { ok: false, command: "catalog", issues: result.issues } };
}

export async function runCli(argv: string[], overrides: Partial<CliIo> = {}): Promise<number> {
  const io = { ...defaultIo, ...overrides };
  const json = argv.includes("--json");
  const args = argv.filter((arg) => arg !== "--json");
  const command = args[0];
  const candidate = args[1] ?? "agenty.json";
  if (command === "init" && !args[1])
    return output(
      {
        exitCode: 2,
        data: { ok: false, code: "AGENTY_USAGE", message: "Usage: agenty init <dir> [--json]" },
      },
      json,
      io,
    );
  if (command === "init") return output(await init(candidate, io), json, io);
  if (command === "validate") return output(await validate(candidate, io), json, io);
  if (command === "doctor") return output(await doctor(candidate, io), json, io);
  if (command === "catalog") return output(await catalog(candidate, io), json, io);
  return output(
    {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTY_USAGE",
        message: "Usage: agenty <init|validate|doctor|catalog> [path] [--json]",
      },
    },
    json,
    io,
  );
}
