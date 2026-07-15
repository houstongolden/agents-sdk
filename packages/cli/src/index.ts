import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AgentsSdkConfigSchema,
  RegistryIndexSchema,
  RegistryItemSchema,
  SafeRelativePathSchema,
  catalogAgentProject,
  createAgentsSdkConfig,
  validateAgentProject,
  type AgentsSdkConfig,
  type RegistryIndex,
  type RegistryItem,
} from "@agents-sdk/core";

export interface CliIo {
  cwd: string;
  stdout: (message: string) => void;
  stderr: (message: string) => void;
  beforeWrite?: (index: number, filePath: string) => void;
  afterWrite?: (index: number, filePath: string) => void;
}

interface CommandResult {
  exitCode: number;
  data: unknown;
}
interface ParsedArgs {
  command?: string;
  positionals: string[];
  json: boolean;
  dryRun: boolean;
  registry?: string;
}

const defaultIo: CliIo = { cwd: process.cwd(), stdout: console.log, stderr: console.error };
const CONFIG_FILE = "agents-sdk.json";

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let json = false;
  let dryRun = false;
  let registry: string | undefined;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--json") json = true;
    else if (value === "--dry-run") dryRun = true;
    else if (value === "--registry") {
      registry = argv[index + 1];
      index += 1;
    } else if (value?.startsWith("--registry=")) registry = value.slice("--registry=".length);
    else if (value) positionals.push(value);
  }
  const [command, ...rest] = positionals;
  return {
    ...(command ? { command } : {}),
    positionals: rest,
    json,
    dryRun,
    ...(registry ? { registry } : {}),
  };
}

function output(result: CommandResult, args: ParsedArgs, io: CliIo): number {
  const target = result.exitCode === 0 ? io.stdout : io.stderr;
  target(args.json ? JSON.stringify(result.data, null, 2) : formatHuman(result.data));
  return result.exitCode;
}

function formatHuman(data: unknown): string {
  if (!data || typeof data !== "object") return String(data);
  const record = data as Record<string, unknown>;
  if (typeof record.message === "string") return record.message;
  if (Array.isArray(record.items))
    return record.items
      .map((item) => `${(item as { name: string }).name}\t${(item as { type: string }).type}`)
      .join("\n");
  if (Array.isArray(record.files))
    return record.files
      .map((file) => `${(file as { status: string }).status}\t${(file as { path: string }).path}`)
      .join("\n");
  return JSON.stringify(data, null, 2);
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

async function readJson(filePath: string): Promise<unknown> {
  return JSON.parse(await readFile(filePath, "utf8")) as unknown;
}

async function loadConfig(cwd: string): Promise<AgentsSdkConfig> {
  return AgentsSdkConfigSchema.parse(await readJson(path.join(cwd, CONFIG_FILE)));
}

function safeDestination(cwd: string, relative: string): string {
  const safe = SafeRelativePathSchema.parse(relative.replaceAll("\\", "/"));
  const destination = path.resolve(cwd, safe);
  const relation = path.relative(cwd, destination);
  if (!relation || relation.startsWith("..") || path.isAbsolute(relation))
    throw new Error(`Unsafe registry target: ${relative}`);
  return destination;
}

function mapTarget(target: string, config: AgentsSdkConfig): string {
  const [prefix, ...rest] = target.split("/");
  if (prefix === "components" || prefix === "patterns" || prefix === "examples")
    return path.posix.join(config.paths[prefix], ...rest);
  return target;
}

interface LoadedRegistry {
  root: string;
  index: RegistryIndex;
  entries: Map<string, { path: string; type: RegistryItem["type"] }>;
}

async function hasIndex(root: string): Promise<boolean> {
  return (await pathKind(path.join(root, "index.json"))) === "file";
}

async function resolveRegistryRoot(cwd: string, requested?: string): Promise<string> {
  const candidates: string[] = [];
  if (requested && !/^https?:\/\//.test(requested)) candidates.push(path.resolve(cwd, requested));
  if (process.env.AGENTS_SDK_REGISTRY)
    candidates.push(path.resolve(cwd, process.env.AGENTS_SDK_REGISTRY));
  candidates.push(
    fileURLToPath(new URL("../registry", import.meta.url)),
    fileURLToPath(new URL("../../../registry", import.meta.url)),
  );
  for (const candidate of candidates) if (await hasIndex(candidate)) return candidate;
  throw new Error("No offline Agents SDK registry found; pass --registry <path>");
}

async function loadRegistry(cwd: string, requested?: string): Promise<LoadedRegistry> {
  const root = await resolveRegistryRoot(cwd, requested);
  const index = RegistryIndexSchema.parse(await readJson(path.join(root, "index.json")));
  return {
    root,
    index,
    entries: new Map(
      index.items.map((entry) => [entry.name, { path: entry.path, type: entry.type }]),
    ),
  };
}

async function loadItem(registry: LoadedRegistry, name: string): Promise<RegistryItem> {
  const entry = registry.entries.get(name);
  if (!entry) throw new Error(`Unknown registry item: ${name}`);
  const item = RegistryItemSchema.parse(await readJson(safeDestination(registry.root, entry.path)));
  if (item.name !== name || item.type !== entry.type)
    throw new Error(`Registry index mismatch for ${name}`);
  return item;
}

async function readRegistrySource(registry: LoadedRegistry, source: string): Promise<string> {
  const candidates = [safeDestination(registry.root, source)];
  const parent = path.dirname(registry.root);
  candidates.push(safeDestination(parent, source));
  for (const candidate of candidates)
    if ((await pathKind(candidate)) === "file") return readFile(candidate, "utf8");
  throw new Error(`Missing registry source: ${source}`);
}

async function resolveItems(
  registry: LoadedRegistry,
  requested: string[],
): Promise<RegistryItem[]> {
  const ordered: RegistryItem[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();
  async function visit(name: string) {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new Error(`Registry dependency cycle at ${name}`);
    visiting.add(name);
    const item = await loadItem(registry, name);
    for (const dependency of item.registryDependencies) await visit(dependency);
    visiting.delete(name);
    visited.add(name);
    ordered.push(item);
  }
  for (const name of requested) await visit(name);
  return ordered;
}

interface PlannedFile {
  item: string;
  path: string;
  sha256: string;
  status: "create" | "update" | "identical" | "conflict";
  content: string;
}

interface FileSnapshot {
  kind: "missing" | "file";
  content?: string;
}

async function snapshotFile(filePath: string): Promise<FileSnapshot> {
  const kind = await pathKind(filePath);
  if (kind === "missing") return { kind };
  if (kind === "file") return { kind, content: await readFile(filePath, "utf8") };
  throw new Error(`Cannot install over non-file path: ${filePath}`);
}

async function ensureParentDirectories(
  cwd: string,
  destination: string,
  createdDirectories: Set<string>,
): Promise<void> {
  const missing: string[] = [];
  let current = path.dirname(destination);
  while (current !== cwd) {
    const relation = path.relative(cwd, current);
    if (relation.startsWith("..") || path.isAbsolute(relation))
      throw new Error(`Unsafe parent directory: ${current}`);
    const kind = await pathKind(current);
    if (kind === "directory") break;
    if (kind !== "missing") throw new Error(`Cannot create directory over ${kind}: ${current}`);
    missing.push(current);
    current = path.dirname(current);
  }
  for (const directory of missing.reverse()) {
    await mkdir(directory);
    createdDirectories.add(directory);
  }
}

async function rollbackInstall(
  attemptedPaths: string[],
  snapshots: Map<string, FileSnapshot>,
  createdDirectories: Set<string>,
): Promise<void> {
  const failures: unknown[] = [];
  for (const filePath of [...attemptedPaths].reverse()) {
    const snapshot = snapshots.get(filePath);
    if (!snapshot) continue;
    try {
      if (snapshot.kind === "missing") await unlink(filePath).catch(ignoreMissing);
      else await writeFile(filePath, snapshot.content ?? "");
    } catch (error) {
      failures.push(error);
    }
  }
  const directories = [...createdDirectories].sort(
    (left, right) => right.split(path.sep).length - left.split(path.sep).length,
  );
  for (const directory of directories) {
    try {
      await rmdir(directory);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") failures.push(error);
    }
  }
  if (failures.length) throw new AggregateError(failures, "Agents SDK rollback failed");
}

function ignoreMissing(error: unknown): void {
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}

async function planInstall(
  cwd: string,
  config: AgentsSdkConfig,
  registry: LoadedRegistry,
  items: RegistryItem[],
) {
  const planned = new Map<string, PlannedFile>();
  for (const item of items) {
    for (const file of item.files) {
      const relative = mapTarget(file.target, config);
      const destination = safeDestination(cwd, relative);
      const content = await readRegistrySource(registry, file.source);
      const digest = sha256(content);
      const existingPlan = planned.get(relative);
      if (existingPlan && existingPlan.sha256 !== digest)
        throw new Error(`Registry items disagree on target: ${relative}`);
      const kind = await pathKind(destination);
      const status =
        kind === "missing"
          ? "create"
          : kind === "file" && sha256(await readFile(destination, "utf8")) === digest
            ? "identical"
            : "conflict";
      planned.set(relative, { item: item.name, path: relative, sha256: digest, status, content });
    }
  }
  return [...planned.values()];
}

function mergePackageMap(
  requested: Record<string, string>,
  existing: Record<string, string> | undefined,
) {
  return Object.fromEntries(
    Object.entries({ ...requested, ...(existing ?? {}) }).sort(([left], [right]) =>
      left.localeCompare(right),
    ),
  );
}

async function planPackageDependencies(
  cwd: string,
  files: PlannedFile[],
  items: RegistryItem[],
): Promise<PlannedFile[]> {
  const ownedPackage = files.find((file) => file.path === "package.json");
  if (ownedPackage?.status === "conflict") return files;
  const dependencies = Object.assign({}, ...items.map((item) => item.dependencies)) as Record<
    string,
    string
  >;
  const devDependencies = Object.assign({}, ...items.map((item) => item.devDependencies)) as Record<
    string,
    string
  >;
  if (!Object.keys(dependencies).length && !Object.keys(devDependencies).length) return files;
  const packagePath = path.join(cwd, "package.json");
  const kind = await pathKind(packagePath);
  const baseContent =
    ownedPackage?.content ?? (kind === "file" ? await readFile(packagePath, "utf8") : "{}");
  const base = JSON.parse(baseContent) as Record<string, unknown>;
  const content = `${JSON.stringify(
    {
      ...base,
      ...(kind === "missing" && base.private === undefined ? { private: true } : {}),
      dependencies: mergePackageMap(
        dependencies,
        base.dependencies as Record<string, string> | undefined,
      ),
      devDependencies: mergePackageMap(
        devDependencies,
        base.devDependencies as Record<string, string> | undefined,
      ),
    },
    null,
    2,
  )}\n`;
  const digest = sha256(content);
  const currentDigest = kind === "file" ? sha256(await readFile(packagePath, "utf8")) : undefined;
  const packagePlan: PlannedFile = {
    item: ownedPackage?.item ?? "dependency-metadata",
    path: "package.json",
    sha256: digest,
    status: kind === "missing" ? "create" : currentDigest === digest ? "identical" : "update",
    content,
  };
  return [...files.filter((file) => file.path !== "package.json"), packagePlan];
}

async function init(
  directory: string,
  registry: string | undefined,
  io: CliIo,
): Promise<CommandResult> {
  const target = path.resolve(io.cwd, directory);
  const configPath = path.join(target, CONFIG_FILE);
  if ((await pathKind(configPath)) !== "missing")
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTS_SDK_CONFLICT",
        message: `Refusing to overwrite ${configPath}`,
      },
    };
  await mkdir(target, { recursive: true });
  await writeFile(configPath, `${JSON.stringify(createAgentsSdkConfig(registry), null, 2)}\n`, {
    flag: "wx",
  });
  return {
    exitCode: 0,
    data: { ok: true, command: "init", path: configPath, message: `Initialized ${configPath}` },
  };
}

async function list(args: ParsedArgs, io: CliIo): Promise<CommandResult> {
  const registry = await loadRegistry(io.cwd, args.registry);
  const items = await Promise.all(
    registry.index.items.map(async (entry) => {
      const item = await loadItem(registry, entry.name);
      return {
        name: item.name,
        type: item.type,
        maturity: item.maturity,
        description: item.description,
      };
    }),
  );
  return { exitCode: 0, data: { ok: true, command: "list", items } };
}

function minimumMajor(range: string): number {
  return Number(range.slice(2));
}

function declaredMajor(range: string): number | undefined {
  const match = range.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

async function compatibilityIssues(cwd: string, items: RegistryItem[]): Promise<string[]> {
  const issues: string[] = [];
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  let declaredPackages: Record<string, string> = {};
  const packagePath = path.join(cwd, "package.json");
  if ((await pathKind(packagePath)) === "file") {
    const packageJson = (await readJson(packagePath)) as Record<string, unknown>;
    declaredPackages = {
      ...((packageJson.dependencies as Record<string, string> | undefined) ?? {}),
      ...((packageJson.devDependencies as Record<string, string> | undefined) ?? {}),
      ...((packageJson.peerDependencies as Record<string, string> | undefined) ?? {}),
    };
  }
  for (const item of items) {
    if (nodeMajor < minimumMajor(item.compatibility.node))
      issues.push(`${item.name} requires Node ${item.compatibility.node}`);
    const requirements = {
      ...(item.compatibility.react ? { react: item.compatibility.react } : {}),
      ...item.compatibility.packages,
    };
    for (const [packageName, requiredRange] of Object.entries(requirements)) {
      const declaredRange = declaredPackages[packageName];
      if (!declaredRange) continue;
      const actual = declaredMajor(declaredRange);
      if (actual !== undefined && actual < minimumMajor(requiredRange))
        issues.push(
          `${item.name} requires ${packageName} ${requiredRange}; project declares ${declaredRange}`,
        );
    }
  }
  return issues;
}

async function add(names: string[], args: ParsedArgs, io: CliIo): Promise<CommandResult> {
  if (!names.length)
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTS_SDK_USAGE",
        message: "Usage: agents add <item...> [--dry-run] [--registry <path>]",
      },
    };
  const config = await loadConfig(io.cwd);
  const registry = await loadRegistry(io.cwd, args.registry ?? config.registry);
  const unknown = names.filter((name) => !registry.entries.has(name));
  if (unknown.length)
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTS_SDK_UNKNOWN_ITEM",
        command: "add",
        items: unknown,
        message: `Unknown registry item: ${unknown.join(", ")}`,
      },
    };
  const items = await resolveItems(registry, names);
  const incompatible = await compatibilityIssues(io.cwd, items);
  if (incompatible.length)
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTS_SDK_INCOMPATIBLE",
        command: "add",
        issues: incompatible,
        message: incompatible.join("\n"),
      },
    };
  const files = await planPackageDependencies(
    io.cwd,
    await planInstall(io.cwd, config, registry, items),
    items,
  );
  const conflicts = files.filter((file) => file.status === "conflict");
  if (conflicts.length)
    return {
      exitCode: 2,
      data: {
        ok: false,
        code: "AGENTS_SDK_CONFLICT",
        command: "add",
        files: conflicts.map(({ content: _content, ...file }) => file),
        message: `Refusing to overwrite ${conflicts.map((file) => file.path).join(", ")}`,
      },
    };
  const publicFiles = files.map(({ content: _content, ...file }) => file);
  if (args.dryRun)
    return {
      exitCode: 0,
      data: {
        ok: true,
        command: "add",
        dryRun: true,
        order: items.map((item) => item.name),
        files: publicFiles,
      },
    };
  const installedByName = new Map(config.installed.map((entry) => [entry.name, entry]));
  for (const item of items)
    installedByName.set(item.name, {
      name: item.name,
      version: item.version,
      dependencies: item.dependencies,
      devDependencies: item.devDependencies,
      files: files
        .filter((file) => file.item === item.name && file.path !== "package.json")
        .map((file) => ({ path: file.path, sha256: file.sha256 }))
        .sort((left, right) => left.path.localeCompare(right.path)),
    });
  const next = AgentsSdkConfigSchema.parse({
    ...config,
    installed: [...installedByName.values()].sort((left, right) =>
      left.name.localeCompare(right.name),
    ),
  });
  const configPath = path.join(io.cwd, CONFIG_FILE);
  const writes = [
    ...files
      .filter((candidate) => candidate.status === "create" || candidate.status === "update")
      .map((file) => ({
        path: safeDestination(io.cwd, file.path),
        content: file.content,
        exclusive: true,
      })),
    { path: configPath, content: `${JSON.stringify(next, null, 2)}\n`, exclusive: false },
  ];
  const snapshots = new Map<string, FileSnapshot>();
  for (const write of writes) snapshots.set(write.path, await snapshotFile(write.path));
  const attemptedPaths: string[] = [];
  const createdDirectories = new Set<string>();
  let writeIndex = 0;
  try {
    for (const write of writes) {
      await ensureParentDirectories(io.cwd, write.path, createdDirectories);
      attemptedPaths.push(write.path);
      writeIndex += 1;
      io.beforeWrite?.(writeIndex, write.path);
      await writeFile(
        write.path,
        write.content,
        write.exclusive && snapshots.get(write.path)?.kind === "missing"
          ? { flag: "wx" }
          : undefined,
      );
      io.afterWrite?.(writeIndex, write.path);
    }
  } catch (error) {
    try {
      await rollbackInstall(attemptedPaths, snapshots, createdDirectories);
    } catch (rollbackError) {
      throw new AggregateError(
        [error, rollbackError],
        "Install failed and rollback was incomplete",
      );
    }
    throw error;
  }
  return {
    exitCode: 0,
    data: {
      ok: true,
      command: "add",
      order: items.map((item) => item.name),
      files: publicFiles,
      message: `Installed ${items.map((item) => item.name).join(", ")}`,
    },
  };
}

async function diff(args: ParsedArgs, io: CliIo): Promise<CommandResult> {
  const config = await loadConfig(io.cwd);
  const registry = await loadRegistry(io.cwd, args.registry ?? config.registry);
  const requested = args.positionals.length ? new Set(args.positionals) : undefined;
  const files: Array<{
    item: string;
    path: string;
    status: "current" | "modified" | "missing" | "update-available";
  }> = [];
  for (const installed of config.installed.filter(
    (entry) => !requested || requested.has(entry.name),
  )) {
    const item = await loadItem(registry, installed.name);
    const upstream = new Map<string, string>();
    for (const file of item.files)
      upstream.set(
        mapTarget(file.target, config),
        sha256(await readRegistrySource(registry, file.source)),
      );
    for (const file of installed.files) {
      const destination = safeDestination(io.cwd, file.path);
      const kind = await pathKind(destination);
      let status: "current" | "modified" | "missing" | "update-available";
      if (kind !== "file") status = "missing";
      else if (sha256(await readFile(destination, "utf8")) !== file.sha256) status = "modified";
      else if (upstream.get(file.path) && upstream.get(file.path) !== file.sha256)
        status = "update-available";
      else status = "current";
      files.push({ item: installed.name, path: file.path, status });
    }
  }
  return { exitCode: 0, data: { ok: true, command: "diff", files } };
}

async function installedDependencyIssues(cwd: string, config: AgentsSdkConfig): Promise<string[]> {
  const expected = Object.assign(
    {},
    ...config.installed.map((item) => ({ ...item.dependencies, ...item.devDependencies })),
  ) as Record<string, string>;
  if (!Object.keys(expected).length) return [];
  const packagePath = path.join(cwd, "package.json");
  if ((await pathKind(packagePath)) !== "file") return ["package.json is missing"];
  const packageJson = (await readJson(packagePath)) as Record<string, unknown>;
  const declared = {
    ...((packageJson.dependencies as Record<string, string> | undefined) ?? {}),
    ...((packageJson.devDependencies as Record<string, string> | undefined) ?? {}),
    ...((packageJson.peerDependencies as Record<string, string> | undefined) ?? {}),
  };
  return Object.entries(expected).flatMap(([name, required]) => {
    const actual = declared[name];
    if (!actual) return [`Missing dependency ${name} (${required})`];
    const actualMajor = declaredMajor(actual);
    const requiredMajor = declaredMajor(required);
    return actualMajor !== undefined && requiredMajor !== undefined && actualMajor < requiredMajor
      ? [`Dependency ${name} declares ${actual}; installed item requires ${required}`]
      : [];
  });
}

async function doctor(args: ParsedArgs, io: CliIo): Promise<CommandResult> {
  try {
    const config = await loadConfig(io.cwd);
    const report = await diff({ ...args, positionals: [] }, io);
    const files = (report.data as { files: Array<{ status: string; path: string }> }).files;
    const dependencyIssues = await installedDependencyIssues(io.cwd, config);
    const failures = files.filter((file) => file.status !== "current");
    return {
      exitCode: failures.length || dependencyIssues.length ? 1 : 0,
      data: {
        ok: failures.length === 0 && dependencyIssues.length === 0,
        command: "doctor",
        config: CONFIG_FILE,
        files,
        dependencyIssues,
        failures: failures.length + dependencyIssues.length,
        message:
          failures.length || dependencyIssues.length
            ? `${failures.length + dependencyIssues.length} installation issue(s)`
            : "Agents SDK installation is healthy",
      },
    };
  } catch (error) {
    return {
      exitCode: 2,
      data: {
        ok: false,
        command: "doctor",
        code: "AGENTS_SDK_DOCTOR_FAILED",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

async function validate(candidate: string, io: CliIo): Promise<CommandResult> {
  try {
    const resolved = path.resolve(io.cwd, candidate);
    const result = validateAgentProject(await readJson(resolved));
    return result.ok
      ? {
          exitCode: 0,
          data: {
            ok: true,
            command: "validate",
            path: resolved,
            project: result.manifest.metadata,
          },
        }
      : {
          exitCode: 1,
          data: { ok: false, command: "validate", path: resolved, issues: result.issues },
        };
  } catch (error) {
    return {
      exitCode: 2,
      data: {
        ok: false,
        command: "validate",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

async function catalog(candidate: string, io: CliIo): Promise<CommandResult> {
  try {
    const result = validateAgentProject(await readJson(path.resolve(io.cwd, candidate)));
    return result.ok
      ? {
          exitCode: 0,
          data: { ok: true, command: "catalog", catalog: catalogAgentProject(result.manifest) },
        }
      : { exitCode: 1, data: { ok: false, command: "catalog", issues: result.issues } };
  } catch (error) {
    return {
      exitCode: 2,
      data: {
        ok: false,
        command: "catalog",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

export async function runCli(argv: string[], overrides: Partial<CliIo> = {}): Promise<number> {
  const io = { ...defaultIo, ...overrides };
  const args = parseArgs(argv);
  try {
    let result: CommandResult;
    if (args.command === "init") result = await init(args.positionals[0] ?? ".", args.registry, io);
    else if (args.command === "list") result = await list(args, io);
    else if (args.command === "add") result = await add(args.positionals, args, io);
    else if (args.command === "diff") result = await diff(args, io);
    else if (args.command === "doctor") result = await doctor(args, io);
    else if (args.command === "validate")
      result = await validate(args.positionals[0] ?? "agent-project.json", io);
    else if (args.command === "catalog")
      result = await catalog(args.positionals[0] ?? "agent-project.json", io);
    else
      result = {
        exitCode: 2,
        data: {
          ok: false,
          code: "AGENTS_SDK_USAGE",
          message: "Usage: agents <init|list|add|diff|doctor|validate|catalog> [args] [--json]",
        },
      };
    return output(result, args, io);
  } catch (error) {
    return output(
      {
        exitCode: 2,
        data: {
          ok: false,
          code: "AGENTS_SDK_FAILED",
          message: error instanceof Error ? error.message : String(error),
        },
      },
      args,
      io,
    );
  }
}
