# Agents SDK

**The open-source component system for building production agentic applications.**

Agents SDK is a docs-and-registry ecosystem of installable components, agents, skills, tools, MCP integrations, patterns, templates, and examples. Developers copy selected building blocks into their applications, customize the source, and own the result.

The project is for teams building the application around the agent: streaming interfaces, tool calls, approvals, artifacts, memory boundaries, background work, permissions, evaluation, reliability, and deployment. It is not another abstraction over `new Agent()`, a hosted marketplace, or a claim that one runtime can own every product decision.

## Ecosystem

- **Components** — installable agentic UI and application components.
- **Agents & Skills** — reusable agent definitions, instructions, prompts, and behavior patterns.
- **Tools & MCP** — tool contracts, MCP clients and servers, integrations, and registries.
- **Patterns** — opinionated solutions for recurring production problems.
- **Templates** — complete starter applications for common agentic product categories.
- **Examples** — focused, runnable demonstrations of individual capabilities.
- **CLI** — initialization, discovery, installation, updates, diffs, and diagnostics.
- **Docs** — implementation guidance that explains when, why, and what tradeoffs apply.

## v0.1 release scope

The first release proves the system with a small set of complete, documented building blocks:

- Components: `agent-chat`, `human-approval`, and `artifact-workspace`.
- Pattern: `approval-gates`.
- Template: one runnable support-agent application.
- Examples: focused chat streaming, approval, and artifact examples.
- CLI: `init`, `add`, `list`, `diff`, and `doctor` using the `@agents-sdk/*` package scope.
- Documentation: installation, anatomy, customization, accessibility, security, testing, tradeoffs, and ownership for every shipped item.

Everything else belongs on the roadmap until it is runnable, tested, documented, and installable. Memory systems, auth/team packages, background jobs, broad provider adapters, observability suites, and a public MCP catalog are not v0.1 claims.

## Package and command direction

The product remains **Agents SDK** at **agents-sdk.com**. The intended npm organization is `@agents-sdk` even if the generic unscoped package name is occupied.

```bash
npx @agents-sdk/cli@latest init
npx @agents-sdk/cli@latest add agent-chat
npx @agents-sdk/cli@latest add human-approval
```

The terminal executable may be `agents`; package names stay scoped. These public commands are the v0.1 acceptance target and must not be presented as available until package-release proof passes.

## Contributor quickstart

```bash
corepack enable
pnpm install
pnpm validate
```

Start with [the product plan](project-context/plan.md), [acceptance contract](project-context/ACCEPTANCE.md), [design system](DESIGN.md), and [contribution guide](CONTRIBUTING.md).

## Status

Local v0.1 release candidate. Acceptance gates A1–A7 pass: the repository validates, the docs/catalog experience passes browser QA, and a clean-room compiled CLI install of the support-agent template installs dependencies, runs 11 tests, typechecks, and builds.

A8 is still pending. No `@agents-sdk/*` package has been published, agents-sdk.com is not serving the release, and ownership of the npm namespace, domain, and GitHub organization has not been proven. The `npx` commands above describe the intended public interface, not an available release.

MIT licensed. Built by [BAMF](https://bamf.com). Companies that need implementation help can follow the restrained Enterprise path on agents-sdk.com when it launches.
