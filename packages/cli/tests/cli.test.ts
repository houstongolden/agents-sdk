import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { runCli } from "../src/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const registry = path.join(root, "registry");

function capture(cwd: string) {
  const messages: string[] = [];
  return {
    cwd,
    messages,
    stdout: (value: string) => messages.push(value),
    stderr: (value: string) => messages.push(value),
  };
}

async function initialized() {
  const cwd = await mkdtemp(path.join(os.tmpdir(), "agents-sdk-cli-"));
  expect(await runCli(["init", ".", "--registry", registry, "--json"], capture(cwd))).toBe(0);
  return cwd;
}

describe("agents CLI", () => {
  it("initializes a copy-owned install ledger and refuses overwrite", async () => {
    const cwd = await initialized();
    const config = JSON.parse(await readFile(path.join(cwd, "agents-sdk.json"), "utf8"));
    expect(config.schemaVersion).toBe("agents-sdk.com/config/v1");
    expect(await runCli(["init", ".", "--registry", registry, "--json"], capture(cwd))).toBe(2);
  });

  it("lists the offline registry", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agents-sdk-cli-"));
    const io = capture(cwd);
    expect(await runCli(["list", "--registry", registry, "--json"], io)).toBe(0);
    const items = JSON.parse(io.messages[0] ?? "{}").items as Array<{
      name: string;
      maturity: string;
    }>;
    expect(items.map((item) => item.name)).toContain("agent-chat");
    expect(
      items.every((item) => ["experimental", "preview", "stable"].includes(item.maturity)),
    ).toBe(true);
  });

  it("A4 clean path: init, add, diff, and doctor succeed", async () => {
    const cwd = await initialized();
    expect(
      await runCli(["add", "agent-chat", "--registry", registry, "--json"], capture(cwd)),
    ).toBe(0);
    const diffIo = capture(cwd);
    expect(await runCli(["diff", "--registry", registry, "--json"], diffIo)).toBe(0);
    expect(
      JSON.parse(diffIo.messages[0] ?? "{}").files.every(
        (file: { status: string }) => file.status === "current",
      ),
    ).toBe(true);
    expect(await runCli(["doctor", "--registry", registry, "--json"], capture(cwd))).toBe(0);
  });

  it("A4 unknown item: add returns AGENTS_SDK_UNKNOWN_ITEM", async () => {
    const cwd = await initialized();
    const io = capture(cwd);
    expect(await runCli(["add", "not-real", "--registry", registry, "--json"], io)).toBe(2);
    expect(JSON.parse(io.messages[0] ?? "{}").code).toBe("AGENTS_SDK_UNKNOWN_ITEM");
  });

  it("A4 incompatible version: declared React 17 is rejected", async () => {
    const cwd = await initialized();
    await writeFile(
      path.join(cwd, "package.json"),
      `${JSON.stringify({ dependencies: { react: "^17.0.0" } })}\n`,
    );
    const io = capture(cwd);
    expect(await runCli(["add", "agent-chat", "--registry", registry, "--json"], io)).toBe(2);
    expect(JSON.parse(io.messages[0] ?? "{}").code).toBe("AGENTS_SDK_INCOMPATIBLE");
  });

  it("resolves dependencies before requested items and records hashes", async () => {
    const cwd = await initialized();
    const io = capture(cwd);
    expect(await runCli(["add", "human-approval", "--registry", registry, "--json"], io)).toBe(0);
    const result = JSON.parse(io.messages[0] ?? "{}");
    expect(result.order).toEqual(["approval-gates", "human-approval"]);
    const config = JSON.parse(await readFile(path.join(cwd, "agents-sdk.json"), "utf8"));
    expect(config.installed.map((item: { name: string }) => item.name)).toEqual([
      "approval-gates",
      "human-approval",
    ]);
    expect(config.installed[0].files[0].sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(config.installed[1].dependencies["lucide-react"]).toBe("^1.0.0");
  });

  it("transactionally merges item dependencies into an existing package manifest", async () => {
    const cwd = await initialized();
    await writeFile(
      path.join(cwd, "package.json"),
      `${JSON.stringify({ name: "host-app", scripts: { test: "vitest" }, dependencies: { react: "^19.0.0" } }, null, 2)}\n`,
    );
    expect(
      await runCli(["add", "human-approval", "--registry", registry, "--json"], capture(cwd)),
    ).toBe(0);
    const packageJson = JSON.parse(await readFile(path.join(cwd, "package.json"), "utf8"));
    expect(packageJson.name).toBe("host-app");
    expect(packageJson).not.toHaveProperty("private");
    expect(packageJson.scripts.test).toBe("vitest");
    expect(packageJson.dependencies.react).toBe("^19.0.0");
    expect(packageJson.dependencies["lucide-react"]).toBe("^1.0.0");
    expect(packageJson.devDependencies.vitest).toBe("^3.2.4");
  });

  it("A4 conflict: refuses conflicts without partial writes and accepts identical files", async () => {
    const cwd = await initialized();
    const target = path.join(cwd, "components/agent-chat.tsx");
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, "user-owned\n");
    expect(
      await runCli(["add", "agent-chat", "--registry", registry, "--json"], capture(cwd)),
    ).toBe(2);
    expect(JSON.parse(await readFile(path.join(cwd, "agents-sdk.json"), "utf8")).installed).toEqual(
      [],
    );

    const clean = await initialized();
    expect(
      await runCli(["add", "agent-chat", "--registry", registry, "--json"], capture(clean)),
    ).toBe(0);
    const io = capture(clean);
    expect(await runCli(["add", "agent-chat", "--registry", registry, "--json"], io)).toBe(0);
    expect(
      JSON.parse(io.messages[0] ?? "{}").files.every(
        (file: { status: string }) => file.status === "identical",
      ),
    ).toBe(true);
  });

  it("A4 locally modified file: reports the recorded hash mismatch", async () => {
    const cwd = await initialized();
    await runCli(["add", "artifact-workspace", "--registry", registry, "--json"], capture(cwd));
    await writeFile(path.join(cwd, "components/artifact-workspace.tsx"), "changed\n");
    const io = capture(cwd);
    expect(await runCli(["diff", "--registry", registry, "--json"], io)).toBe(0);
    expect(
      JSON.parse(io.messages[0] ?? "{}").files.some(
        (file: { status: string }) => file.status === "modified",
      ),
    ).toBe(true);
    expect(await runCli(["doctor", "--registry", registry, "--json"], capture(cwd))).toBe(1);
  });

  it("supports deterministic dry-run without writing files", async () => {
    const cwd = await initialized();
    const io = capture(cwd);
    expect(
      await runCli(["add", "approval-flow", "--dry-run", "--registry", registry, "--json"], io),
    ).toBe(0);
    expect(JSON.parse(io.messages[0] ?? "{}").order).toEqual(["approval-gates", "approval-flow"]);
    await expect(readFile(path.join(cwd, "patterns/approval-gates.ts"), "utf8")).rejects.toThrow();
  });

  it("A4 partial-write rollback: restores every file and the original ledger", async () => {
    const cwd = await initialized();
    const configPath = path.join(cwd, "agents-sdk.json");
    const originalConfig = await readFile(configPath, "utf8");
    const io = {
      ...capture(cwd),
      afterWrite: (_index: number, filePath: string) => {
        if (filePath === configPath) throw new Error("deterministic post-write failure");
      },
    };
    expect(await runCli(["add", "human-approval", "--registry", registry, "--json"], io)).toBe(2);
    expect(await readFile(configPath, "utf8")).toBe(originalConfig);
    expect(await readdir(cwd)).toEqual(["agents-sdk.json"]);
  });

  it("installs the runnable support-agent template from the offline registry", async () => {
    const cwd = await initialized();
    expect(
      await runCli(["add", "support-agent", "--registry", registry, "--json"], capture(cwd)),
    ).toBe(0);
    expect(JSON.parse(await readFile(path.join(cwd, "package.json"), "utf8")).name).toBe(
      "support-agent",
    );
    const packageJson = JSON.parse(await readFile(path.join(cwd, "package.json"), "utf8"));
    expect(packageJson.devDependencies["@tailwindcss/vite"]).toBe("^4.0.0");
    const config = JSON.parse(await readFile(path.join(cwd, "agents-sdk.json"), "utf8"));
    expect(
      config.installed.find((item: { name: string }) => item.name === "support-agent").files,
    ).not.toContainEqual(expect.objectContaining({ path: "package.json" }));
    expect(await readFile(path.join(cwd, "components/agent-chat.tsx"), "utf8")).toContain(
      "export function AgentChat",
    );
    expect(await runCli(["validate", "agent-project.json", "--json"], capture(cwd))).toBe(0);
  });

  it("executes the compiled CLI with Node", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agents-sdk-cli-"));
    const bin = path.resolve(here, "../dist/bin.js");
    const execute = promisify(execFile);
    const listed = await execute(
      process.execPath,
      [bin, "list", "--registry", registry, "--json"],
      { cwd },
    );
    expect(JSON.parse(listed.stdout).items.length).toBeGreaterThanOrEqual(7);
    const initializedResult = await execute(
      process.execPath,
      [bin, "init", ".", "--registry", registry, "--json"],
      { cwd },
    );
    expect(JSON.parse(initializedResult.stdout).ok).toBe(true);
  });
});
