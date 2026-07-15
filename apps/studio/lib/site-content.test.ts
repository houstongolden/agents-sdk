import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  catalogNavigation,
  componentCollection,
  INSTALL_COMMAND,
  LOCAL_CLI_BUILD_COMMAND,
  LOCAL_CLI_LIST_COMMAND,
  POSITIONING,
  PUBLIC_PACKAGE_NOTE,
  PUBLIC_PACKAGE_PUBLISHED,
  REGISTRY_ITEM_KINDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  topNavigation,
} from "./catalog";

describe("public ecosystem content", () => {
  it("locks primary link text to an accessible contrasting color", () => {
    const stylesheet = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
    expect(stylesheet).toMatch(
      /\.primary-cta\s*\{[^}]*background-color:\s*var\(--foreground\);[^}]*color:\s*#f7f7f4;/s,
    );
  });

  it("keeps CLI documentation within implemented commands", () => {
    const cliDocs = readFileSync(
      new URL("../app/(studio)/docs/cli/page.tsx", import.meta.url),
      "utf8",
    );
    const gettingStarted = readFileSync(
      new URL("../app/(studio)/docs/getting-started/page.tsx", import.meta.url),
      "utf8",
    );
    const documentation = `${cliDocs}\n${gettingStarted}`;

    expect(documentation).not.toContain("--yes");
    expect(documentation).not.toMatch(/agents-sdk\/cli@latest verify/);
    expect(documentation).not.toContain("detect the package manager");
    expect(documentation).not.toContain("checks peer dependencies");
    expect(documentation).not.toContain("dependency ranges");
    expect(documentation).not.toContain("maturity labels");
  });

  it("publishes developer-focused site metadata", () => {
    expect(SITE_NAME).toBe("Agents SDK");
    expect(SITE_DESCRIPTION).toContain("inspectable agent applications");
  });

  it("uses the accepted positioning and public IA", () => {
    expect(POSITIONING).toBe(
      "The open-source component system for building production agentic applications.",
    );
    expect(topNavigation.map((item) => item.label)).toEqual([
      "Components",
      "Agents & Skills",
      "Tools & MCP",
      "Patterns",
      "Templates",
      "Examples",
      "Documentation",
    ]);
  });

  it("advertises only implemented registry item kinds", () => {
    expect(REGISTRY_ITEM_KINDS).toEqual(["component", "pattern", "template", "example"]);
    const registryDocs = readFileSync(
      new URL("../app/(studio)/docs/registry/page.tsx", import.meta.url),
      "utf8",
    );
    expect(registryDocs).not.toContain("agent, tool");
    expect(registryDocs).not.toContain("harness");
    expect(registryDocs).not.toContain("stack.");
  });

  it("keeps support template claims inside tested behavior", () => {
    const templateDocs = readFileSync(
      new URL("../app/(studio)/templates/support-agent/page.tsx", import.meta.url),
      "utf8",
    );
    expect(templateDocs).not.toContain("knowledge search");
    expect(templateDocs).not.toContain("account actions");
    expect(templateDocs).not.toContain("pause and resume");
    expect(templateDocs).not.toContain("changed payload");
    expect(templateDocs).toContain("offline lookup");
    expect(templateDocs).toContain("allow or deny");
    expect(templateDocs).toContain("artifact creation");
    expect(templateDocs).toContain("UI composition");
    expect(templateDocs).toContain("application build");
  });

  it("publishes the exact first-run command", () => {
    expect(INSTALL_COMMAND).toBe("npx @agents-sdk/cli@latest add agent-chat");
  });

  it("does not imply the CLI package is published before release", () => {
    expect(PUBLIC_PACKAGE_PUBLISHED).toBe(false);
    expect(PUBLIC_PACKAGE_NOTE).toContain("is not yet published");
    expect(LOCAL_CLI_BUILD_COMMAND).toBe("pnpm --filter @agents-sdk/cli build");
    expect(LOCAL_CLI_LIST_COMMAND).toBe("node packages/cli/dist/bin.js list --registry registry");

    const disclosedSurfaces = [
      "../app/(studio)/page.tsx",
      "../app/(studio)/docs/cli/page.tsx",
      "../app/(studio)/docs/getting-started/page.tsx",
      "../components/component-detail.tsx",
      "../app/(studio)/templates/support-agent/page.tsx",
    ];
    for (const surface of disclosedSurfaces) {
      expect(readFileSync(new URL(surface, import.meta.url), "utf8")).toContain(
        "PUBLIC_PACKAGE_NOTE",
      );
    }
  });

  it("labels the v0.1 collection honestly", () => {
    expect(componentCollection.map((item) => item.slug)).toEqual([
      "agent-chat",
      "human-approval",
      "artifact-workspace",
    ]);
    expect(componentCollection.every((item) => item.maturity === "preview")).toBe(true);
    expect(
      componentCollection.every(
        (item) =>
          item.source.startsWith("registry/sources/components/") &&
          item.tests.startsWith("registry/sources/components/"),
      ),
    ).toBe(true);
  });

  it("documents API names present in canonical registry source", () => {
    for (const component of componentCollection) {
      const source = readFileSync(new URL(`../../../${component.source}`, import.meta.url), "utf8");
      for (const property of component.api) {
        expect(source, `${component.slug} is missing ${property.name}`).toContain(property.name);
      }
    }
  });

  it("keeps developer routes discoverable", () => {
    const links: string[] = topNavigation.map((item) => item.href);
    for (const group of catalogNavigation) {
      links.push(...group.items.map((item) => item.href));
    }
    expect(links).toContain("/docs/getting-started");
    expect(links).toContain("/patterns/approval-gates");
    expect(links).toContain("/templates/support-agent");
  });
});
