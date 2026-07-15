import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { runCli } from "../src/index.js";

describe("agenty CLI", () => {
  it("initializes safely and refuses overwrite", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    const messages: string[] = [];
    expect(
      await runCli(["init", "demo-agent", "--json"], {
        cwd,
        stdout: (value) => messages.push(value),
        stderr: (value) => messages.push(value),
      }),
    ).toBe(0);
    expect(
      JSON.parse(await readFile(path.join(cwd, "demo-agent", "agenty.json"), "utf8")).kind,
    ).toBe("AgentProject");
    for (const relative of ["src/agent.ts", "evals/manifest-smoke.json", "skills/starter/SKILL.md"])
      expect(await readFile(path.join(cwd, "demo-agent", relative), "utf8")).not.toHaveLength(0);
    expect(
      await runCli(["doctor", "demo-agent/agenty.json", "--json"], {
        cwd,
        stdout: () => {},
        stderr: () => {},
      }),
    ).toBe(0);
    expect(
      await runCli(["init", "demo-agent", "--json"], { cwd, stdout: () => {}, stderr: () => {} }),
    ).toBe(2);
  });

  it("returns JSON and nonzero for invalid manifests", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    const messages: string[] = [];
    expect(
      await runCli(["validate", "missing.json", "--json"], {
        cwd,
        stdout: (value) => messages.push(value),
        stderr: (value) => messages.push(value),
      }),
    ).toBe(2);
    expect(JSON.parse(messages[0] ?? "{}").ok).toBe(false);
  });

  it.each(["123", "!!!", "a".repeat(100)])(
    "normalizes unsafe project ids from %s",
    async (name) => {
      const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
      expect(
        await runCli(["init", name, "--json"], { cwd, stdout: () => {}, stderr: () => {} }),
      ).toBe(0);
      const manifest = JSON.parse(await readFile(path.join(cwd, name, "agenty.json"), "utf8")) as {
        metadata: { id: string };
      };
      expect(manifest.metadata.id).toMatch(/^[a-z][a-z0-9-]{1,62}$/);
    },
  );

  it("refuses any conflicting scaffold file without partial writes", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    const target = path.join(cwd, "conflicted-agent");
    await mkdir(path.join(target, "src"), { recursive: true });
    await writeFile(path.join(target, "src/agent.ts"), "user-owned\n");
    const messages: string[] = [];
    expect(
      await runCli(["init", target, "--json"], {
        cwd,
        stdout: (value) => messages.push(value),
        stderr: (value) => messages.push(value),
      }),
    ).toBe(2);
    expect(JSON.parse(messages[0] ?? "{}").code).toBe("AGENTY_PATH_CONFLICT");
    await expect(readFile(path.join(target, "agenty.json"), "utf8")).rejects.toThrow();
    expect(await readFile(path.join(target, "src/agent.ts"), "utf8")).toBe("user-owned\n");
  });

  it("returns structured failure for invalid targets and a missing init argument", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    await writeFile(path.join(cwd, "blocked"), "not a directory\n");
    for (const args of [
      ["init", "blocked/child", "--json"],
      ["init", "--json"],
    ]) {
      const messages: string[] = [];
      expect(
        await runCli(args, {
          cwd,
          stdout: (value) => messages.push(value),
          stderr: (value) => messages.push(value),
        }),
      ).toBe(2);
      expect(JSON.parse(messages[0] ?? "{}").ok).toBe(false);
    }
  });

  it("fails doctor when a declared path is missing", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    await runCli(["init", "broken-agent"], { cwd, stdout: () => {}, stderr: () => {} });
    await unlink(path.join(cwd, "broken-agent/src/agent.ts"));
    const messages: string[] = [];
    expect(
      await runCli(["doctor", "broken-agent/agenty.json", "--json"], {
        cwd,
        stdout: (value) => messages.push(value),
        stderr: (value) => messages.push(value),
      }),
    ).toBe(1);
    expect(JSON.parse(messages[0] ?? "{}").failures).toBe(1);
  });

  it("executes the compiled CLI with Node", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agenty-cli-"));
    const here = path.dirname(fileURLToPath(import.meta.url));
    const bin = path.resolve(here, "../dist/bin.js");
    const execute = promisify(execFile);
    const initialized = await execute(process.execPath, [bin, "init", "compiled-agent", "--json"], {
      cwd,
    });
    expect(JSON.parse(initialized.stdout).ok).toBe(true);
    const diagnosed = await execute(
      process.execPath,
      [bin, "doctor", "compiled-agent/agenty.json", "--json"],
      { cwd },
    );
    expect(JSON.parse(diagnosed.stdout).ok).toBe(true);
  });
});
