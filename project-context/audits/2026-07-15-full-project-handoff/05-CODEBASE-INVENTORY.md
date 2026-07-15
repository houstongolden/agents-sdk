# Codebase inventory and architecture handoff

**Snapshot date:** 2026-07-15
**Canonical project path:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Snapshot branch and commit:** `main` at `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`
**Lifecycle:** local v0.1 release candidate; no public release

## Path and rename truth

All project source, documentation, Git history, registry content, templates, tests, build configuration, and local generated artifacts physically reside in the repository now addressed as:

```text
/Users/houstongolden/Desktop/CODE_2025/agents-sdk
```

The physical directory and linked `.git` pointer are normalized to the canonical lowercase `agents-sdk` path. The former project path is retained only as a compatibility symlink:

```text
/Users/houstongolden/Desktop/CODE_2025/agenty -> agents-sdk
```

No second source checkout lives behind `agenty`. It is a symlink into the renamed Agents SDK repository, retained so this already-open Codex task and any stale absolute-path references continue to resolve. New work, docs, commands, tooling, and handoffs should use `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`.

## Product and architecture summary

Agents SDK is a docs-and-registry-first component system for complete agentic applications. It distributes readable, installable, developer-owned source plus contracts, patterns, examples, templates, and tests. It is not a universal agent runtime, hosted agent marketplace, provider abstraction, auth system, database, deployment platform, background-job service, or public MCP catalog.

The core flow is:

```text
Next.js docs/catalog
  -> versioned offline registry metadata
  -> @agents-sdk/cli resolution and write planning
  -> copy-owned source, dependencies, docs, and tests
  -> runnable examples and the support-agent template
  -> schema validation, package tests, CI, browser QA, and release evidence
```

Provider, model, auth, database, deployment, routing, persistence, tenancy, and business-rule choices remain behind explicit integration boundaries owned by consuming applications.

## Repository counts

Counts below come from `git ls-files` at the snapshot commit and therefore exclude `node_modules`, `.next`, `dist`, other ignored build products, and untracked rename/copy artifacts.

| Measure                              | Count | Notes                                                                                                                 |
| ------------------------------------ | ----: | --------------------------------------------------------------------------------------------------------------------- |
| Tracked files                        |   171 | Entire committed repository                                                                                           |
| Tracked TypeScript/TSX files         |    88 | Application, package, registry source, template, and tests                                                            |
| Tracked Markdown files               |    33 | Product docs, project context, item docs, governance, and changesets                                                  |
| Tracked test files                   |    19 | Files named `*.test.ts` or `*.test.tsx`                                                                               |
| Workspace/package test declarations  |    47 | Static `test(`/`it(` count: site 14, CLI 20, core 7, harness 1, UI 5; parameterized cases make executed totals higher |
| Registry entries                     |     7 | 3 components, 1 pattern, 1 template, 2 examples                                                                       |
| Registry source files                |    18 | Six source/doc/test triplets; template files are separate                                                             |
| Tracked support-agent template files |    18 | Includes app, tests, config, manifest, docs, and env example                                                          |
| JSON Schema documents                |     4 | AgentProject, install config, registry index, registry item                                                           |
| Generated site pages                 |    23 | Recorded build result in `CURRENT_STATE.md`                                                                           |
| Git commits on `main`                |     7 | Foundation through release-evidence formalization                                                                     |

The latest verified full run recorded in `project-context/CURRENT_STATE.md` executed 10 core tests, 5 UI tests, 22 CLI tests, 1 harness test, and 14 site tests. The clean-room installed support-agent proof executed 11 tests. These executed totals are authoritative evidence; they exceed simple syntax counts because test files use parameterized and nested test construction.

## Top-level directory

```text
agents-sdk/
├── .changeset/                 release/version metadata
├── .github/                    CI and dependency-update policy
├── apps/
│   └── studio/                 Next.js docs, catalog, and reference shell
├── packages/
│   ├── cli/                    @agents-sdk/cli and agents executable
│   ├── core/                   manifests, registry contracts, validation
│   ├── harness/                reusable acceptance checks
│   └── ui/                     installable/adaptable React primitives
├── project-context/            project brain, plans, decisions, evidence
├── registry/
│   ├── index.json              offline registry source of truth
│   ├── items/                  versioned item manifests
│   └── sources/                copy-owned component/pattern/example source
├── schemas/                    published JSON Schema representations
├── templates/
│   └── support-agent/          complete runnable reference application
├── package.json                root orchestration and release scripts
├── pnpm-lock.yaml              resolved dependency graph
├── pnpm-workspace.yaml         workspace membership
├── tsconfig.base.json          shared TypeScript policy
├── AGENTS.md / CLAUDE.md       agent/contributor instructions
├── README.md / DESIGN.md       public overview and design system
├── CONTRIBUTING.md             registry contribution contract
├── SECURITY.md                 security and disclosure boundary
└── youstack.json               safe You.md project catalog overlay
```

## Applications

### `apps/studio`

`@agents-sdk/site` is the public-facing Next.js documentation/catalog application and the integrated reference experience. It provides:

- a first-viewport product explanation and docs/catalog navigation;
- component index and dynamic component detail routes;
- pages for Agents & Skills, Tools & MCP, Patterns, Templates, Examples, CLI, and Docs;
- the support-agent template and approval-gates pattern documentation;
- an interactive demo session and component previews;
- reusable site/catalog/doc shells and copy-command interaction;
- a Houston-style agentic shell reference with projects, connectors, files, knowledge, loops, and settings surfaces;
- generated catalog data and deterministic demo-stream behavior;
- content, route, and streaming tests.

Key paths:

```text
apps/studio/app/                  App Router pages and global styles
apps/studio/components/           docs, catalog, preview, and demo UI
apps/studio/lib/catalog.ts        registry-to-site catalog model
apps/studio/lib/demo-stream.ts    deterministic demo streaming behavior
apps/studio/lib/*.test.ts         site behavior and content contracts
apps/studio/next.config.ts        Next configuration
apps/studio/vitest.config.ts      site test configuration
```

The site package commands are `pnpm --filter @agents-sdk/site dev`, `build`, `start`, `test`, and `typecheck`.

## Packages

### `packages/core` — `@agents-sdk/core`

Core owns runtime validation and TypeScript types for:

- `AgentProject` manifests;
- registry indexes and items;
- local `agents-sdk.json` installation state;
- safe relative paths and protected destination rules;
- catalog projections for validated agent projects.

`src/manifest.ts` uses strict Zod contracts and cross-reference checks. It requires mutating and irreversible tools to declare explicit approval, checks runtime and policy references, rejects duplicate IDs, and preserves provenance. `src/registry.ts` validates registry/install metadata, safe paths, unique targets, documentation ownership, and test-file declarations.

### `packages/cli` — `@agents-sdk/cli`

CLI owns registry discovery, dependency ordering, installation planning, local state, hashes, conflict refusal, rollback, diffs, diagnostics, manifest validation, and catalog output. The published executable is `agents`; `agents-sdk` is retained as a binary alias.

The CLI package embeds prepared registry/template assets during build and test through `scripts/prepare-assets.mjs`. Registry content is therefore tested both at the repository source and in the compiled-package layout.

### `packages/ui` — `@agents-sdk/ui`

UI exports adapter-light React primitives:

```text
AccountPopout
AgentChat
AppShell
ArtifactRenderer
ArtifactWorkspace
ChatComposer
DemoAgenticSurface
HumanApproval
IntegrationIcon
RightPane
Sidebar
ArtifactSpec / parseArtifactSpec
starter configuration and shared types
```

The package deliberately owns no router, auth provider, chat runtime, database, OAuth state, provider/model selection, or deployment behavior. `DemoAgenticSurface` is an in-memory integration proof, not a production runtime. Installed registry source does not import `@agents-sdk/ui`; consumers receive and own the readable files.

### `packages/harness` — `@agents-sdk/harness`

The harness exposes `runManifestAcceptance`, returning structured checks for a manifest fixture. Current checks cover readable JSON, schema v1, at least one runtime, approval on mutations, provenance, and one parent-shell-owned composer for interactive shells.

## Registry directory

`registry/index.json` is the offline source of truth used by `agents list`, `agents add`, and `agents diff`.

| Name                 | Type      | Maturity     | Registry dependencies               | Files |
| -------------------- | --------- | ------------ | ----------------------------------- | ----: |
| `agent-chat`         | component | preview      | none                                |     3 |
| `human-approval`     | component | preview      | `approval-gates`                    |     3 |
| `artifact-workspace` | component | preview      | none                                |     3 |
| `approval-gates`     | pattern   | preview      | none                                |     3 |
| `support-agent`      | template  | preview      | all 3 components + `approval-gates` |    18 |
| `approval-flow`      | example   | experimental | `approval-gates`                    |     3 |
| `artifact-flow`      | example   | experimental | none                                |     3 |

Each non-template source item has a readable implementation, documentation, and deterministic test under `registry/sources/{components,patterns,examples}`. Each item manifest under `registry/items` declares compatibility, dependencies, provenance, maturity, source/target paths, documentation, tests, security notes, accessibility notes, and removal/update ownership information.

## Template and examples

### `templates/support-agent`

The support-agent template is a complete React/Vite/Tailwind application, not a snippet. It composes Agent Chat, Human Approval, Artifact Workspace, and Approval Gates around an evidence-backed order lookup and explicit allow/deny flow. An artifact is created only after approval.

Important files:

```text
agent-project.json                AgentProject v1 manifest
src/agent.ts                     bounded AI SDK agent/tool definition
src/agent-adapter.ts             application adapter boundary
src/support-data.ts              deterministic order evidence
src/support-flow.ts              fail-closed exact-input approval flow
src/App.tsx                      integrated application surface
tests/*.test.{ts,tsx}            agent, data, approval, composition tests
.env.example                     names-only environment contract
README.md                        run, ownership, failure, and security guidance
```

The template intentionally leaves credentials, authenticated users, durable grants/approvals, artifact persistence, audit retention, retries, queues, provider failure handling, and deployment policy to the consuming host.

### Focused examples

- `approval-flow` demonstrates the approval-gates contract in isolation.
- `artifact-flow` demonstrates artifact production/rendering flow.

Examples are registry items with source, docs, tests, explicit dependencies, and experimental maturity; they are not claimed as hosted services.

## Schemas and public contracts

Four checked-in JSON Schemas mirror the strict TypeScript/Zod contracts:

| File                                 | Schema ID                                               | Required top-level contract                                                                                             |
| ------------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `schemas/agent-project.schema.json`  | `https://agents-sdk.com/schemas/agent-project/v1.json`  | `schemaVersion`, `kind`, metadata, runtimes, skills, tools, connectors, policies, evals, UI, provenance                 |
| `schemas/agents-sdk.schema.json`     | `https://agents-sdk.com/schemas/config/v1.json`         | `schemaVersion`, registry, install paths, installed items                                                               |
| `schemas/registry-index.schema.json` | `https://agents-sdk.com/schemas/registry-index/v1.json` | `schemaVersion`, unique item entries                                                                                    |
| `schemas/registry-item.schema.json`  | `https://agents-sdk.com/schemas/registry-item/v1.json`  | identity, type, version, maturity, provenance, compatibility, security, accessibility, dependencies, files, docs, tests |

Canonical version identifiers are:

```text
agents-sdk.com/agent-project/v1
agents-sdk.com/config/v1
agents-sdk.com/registry-index/v1
agents-sdk.com/registry-item/v1
```

Important behavioral contracts:

- IDs are lowercase kebab-case; versions use semantic versioning.
- Registry and install targets must be safe project-relative paths without parent traversal.
- Registry item source targets must be unique.
- Item documentation and test paths must correspond to installed declared files.
- AgentProject collections reject duplicate IDs and invalid runtime/tool/policy references.
- Every non-read tool requires explicit approval.
- Interactive agent shells declare a single parent-shell-owned composer.
- Provenance is required; secrets are represented only by environment-variable names.
- CLI writes are preflighted; local changes are never silently overwritten.
- Install state records SHA-256 hashes so `diff` and `doctor` can identify local modifications and missing files.
- Installed source belongs to the consuming developer and does not require a hosted Agents SDK runtime.

## CLI interface

Public command dispatcher:

```text
agents init [directory]
agents list
agents add <item...>
agents diff
agents doctor
agents validate [agent-project.json]
agents catalog [agent-project.json]
```

Global parsed options:

```text
--json                 structured output
--dry-run              calculate write/install plan without applying it
--registry <path>      use an explicit offline registry path
--registry=<path>      equivalent inline form
```

`AGENTS_SDK_REGISTRY` may provide the local registry path. The built package also searches its embedded registry asset. The configured public registry identity is `https://agents-sdk.com/registry`, but no public registry release is claimed yet.

Exit behavior is structured: success is `0`, validation/diagnostic failure is `1` where applicable, and usage/runtime failure is `2`. Usage failures use `AGENTS_SDK_USAGE`; caught command failures use `AGENTS_SDK_FAILED`.

Intended public package commands are:

```bash
npx @agents-sdk/cli@latest init
npx @agents-sdk/cli@latest add agent-chat
npx @agents-sdk/cli@latest add human-approval
```

These commands define the v0.1 public interface but must not be described as currently available until A8 package-release proof passes.

## Workspace dependencies and build flow

The repository uses pnpm workspaces, TypeScript, ESM packages, Zod contracts, Vitest, React, Next.js for the site, Vite for the template, Tailwind, and Changesets.

The dependency and verification flow is:

```text
pnpm-lock.yaml + pnpm-workspace.yaml
  -> pnpm install
  -> package TypeScript builds
  -> CLI prepares embedded registry/template assets
  -> site production build and page generation
  -> workspace typechecks
  -> Vitest suites across core/CLI/UI/harness/site
  -> lint scripts where present
  -> Prettier check
```

Root scripts:

```json
{
  "build": "pnpm -r --if-present run build",
  "test": "pnpm -r --if-present run test",
  "typecheck": "pnpm -r --if-present run typecheck",
  "lint": "pnpm -r --if-present run lint",
  "format:check": "prettier --check .",
  "format": "prettier --write .",
  "validate": "pnpm build && pnpm typecheck && pnpm test && pnpm lint && pnpm format:check",
  "changeset": "changeset",
  "version-packages": "changeset version",
  "release": "changeset publish"
}
```

All workspace packages are currently version `0.1.0`. The intended npm scope is `@agents-sdk/*`:

```text
@agents-sdk/core
@agents-sdk/cli
@agents-sdk/ui
@agents-sdk/harness
@agents-sdk/site (private application surface)
```

## Configuration and CI surfaces

- `pnpm-workspace.yaml`: workspace membership.
- `pnpm-lock.yaml`: exact dependency resolution.
- `tsconfig.base.json`: shared strict TypeScript settings.
- package-level `tsconfig.json` / `tsconfig.build.json`: library and application compilation.
- package/site/template `vitest.config.ts`: test execution.
- `apps/studio/next.config.ts`: docs site build.
- `apps/studio/postcss.config.mjs`: site CSS processing.
- `templates/support-agent/vite.config.ts`: template build and Tailwind/Vitest integration.
- `.prettierrc.json` / `.prettierignore`: formatting policy.
- `.gitignore`: excludes dependencies, builds, coverage, secrets, You.md runtime state, and generated run artifacts while allowing `.env.example`.
- `.changeset/config.json` and `.changeset/bright-agents-preview.md`: package version/release intent.
- `.github/dependabot.yml`: dependency-update policy.
- `.github/workflows/ci.yml`: pull-request and `main` validation on Node 20.

CI uses read-only repository permissions, cancels superseded runs, installs pnpm and Node 20, restores the pnpm cache, installs with a frozen lockfile, then runs build, typecheck, tests, and formatting checks. The root `pnpm validate` additionally invokes the workspace lint phase.

## Ownership boundaries

| Surface                                                                   | Canonical owner                   | Repository relationship                                                   |
| ------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| Registry items, docs, CLI, templates, examples, schemas, release evidence | Agents SDK                        | Canonical source of truth                                                 |
| Global agent behavior, shared skills, sync scripts                        | `~/.agent-shared`                 | Reference/install only; upstream changes through shared governance        |
| Identity, private memory, project graph, portable catalog                 | You.md                            | Safe additive project context only; never copy secrets/private brain data |
| Auth, data, tenancy/RLS, deployment, business rules                       | Consuming product                 | Explicit integration boundary; consumer stays authoritative               |
| Shared agentic shell and paid AI SDK Agents references                    | Canonical shared skills           | Provenance/design input only; no private or paid asset republishing       |
| Historical cross-project standards                                        | Source repos and Codex management | Evidence/provenance, not destructive migration                            |
| Enterprise/custom implementation                                          | BAMF                              | Secondary service path, not the public product architecture               |

Cross-project observations may become attributed proposals. Promotion into Agents SDK requires explicit provenance, privacy classification, a versioned contract, runnable implementation, tests, documentation, and review.

## Git history and worktrees

### Main history

`main` contains seven commits at the snapshot:

```text
9c7f1f9 docs: formalize Agents SDK product and release evidence
4781db7 feat(site): rebuild the Agents SDK developer experience
e94320d feat(core): establish Agents SDK registry and CLI
4d8e679 docs: record verified You.md integration
7dfeaea feat(studio): ship reusable agentic reference shell
b494eb8 feat(core): add manifest CLI and conformance harness
60861a0 docs: establish Agenty project foundation
```

The earliest `Agenty` commit is historical provenance. Active identity is Agents SDK under decisions D-006 through D-012.

### Branches and linked worktrees

```text
main
  path: /Users/houstongolden/Desktop/CODE_2025/agents-sdk
  HEAD: 9c7f1f918ad1679a1d2e85db57582b5d363ad21d

codex/adil-contracts
  path: /Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty
  HEAD: 0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1
  commit: feat(intelligence): add ADIL contract package
```

The ADIL branch is real work in a linked worktree and is not merged into `main` at this snapshot. A complete handoff must preserve and explicitly reconcile it; renaming the main directory does not merge or delete that branch.

### Remotes and tags

At the snapshot:

- no Git remote is configured;
- no Git tag exists;
- `main` has no upstream tracking branch;
- no public GitHub repository/organization ownership has been proven.

### Dirty-tree caveat captured before this handoff

Before the handoff directory was generated, `main` contained 29 untracked duplicate files whose names end in ` 2` (for example `README 2.md`, project-context `* 2.md`/`* 2.json`, duplicated studio pages, and duplicated CLI source/tests). They are not in the 171-file tracked inventory and were not treated as canonical source. They must be content-compared and deliberately reconciled or removed; they must never be bulk-added blindly. This audit file does not resolve them.

## Verification commands

Run from `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`:

```bash
corepack enable
pnpm install --frozen-lockfile=false
pnpm validate
git diff --check
git status --short --branch
git worktree list --porcelain
git ls-files | grep -E '(^|/)(\.env\.local|\.you-project)$' && exit 1 || true
node -e "for (const f of ['package.json','youstack.json','project-context/tasks.json','project-context/braindump.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```

Focused verification:

```bash
pnpm --filter @agents-sdk/core test
pnpm --filter @agents-sdk/cli test
pnpm --filter @agents-sdk/ui test
pnpm --filter @agents-sdk/harness test
pnpm --filter @agents-sdk/site test
pnpm --filter @agents-sdk/site build
pnpm --dir templates/support-agent test
pnpm --dir templates/support-agent typecheck
pnpm --dir templates/support-agent build
```

Release acceptance additionally requires a clean-directory compiled CLI installation, dependency install in the generated support-agent application, its tests/typecheck/build, browser QA across desktop/mobile/overflow/console/navigation/approval interaction, package dry-runs, secret scans, and an evidence record containing command, exit code, artifact path, and commit SHA.

## Current acceptance and release blockers

Local acceptance gates A1 through A7 are recorded as passing:

- identity and vocabulary are consistently Agents SDK;
- the public docs/catalog experience and eight-area information architecture exist without claiming empty inventory;
- all seven registry items validate against versioned contracts;
- CLI install/list/diff/doctor and error/rollback paths are tested;
- three v0.1 components are runnable, documented, and tested;
- the approval-gates pattern and support-agent template have executable proof;
- clean-room quickstart, template, tests, typecheck, and production build pass.

Gate A8 is not complete. Current blockers are:

1. No `@agents-sdk/*` package has been published to npm.
2. `agents-sdk.com` is not serving the matching release.
3. Ownership/access for the npm namespace, domain, and GitHub organization has not been proven.
4. No release tag exists.
5. No remote is configured and no pushed release commit exists.
6. No tagged public-release and rollback evidence bundle exists.
7. A second worktree/machine has not repeated A1 through A7 against public packages/site.
8. The separate `codex/adil-contracts` worktree remains outside `main` and requires an explicit merge/rejection decision.
9. The 29 untracked `* 2.*` duplicates require reconciliation before a clean release tree can be asserted.

Consequently, this repository may be described as a **local v0.1 release candidate**, not a publicly available SDK release. The intended `npx @agents-sdk/cli@latest ...` commands, public domain, registry URL, and release packages remain target interfaces until public evidence proves them.

## Canonical handoff reading order

1. `README.md` — public positioning and contributor entrypoint.
2. `project-context/CURRENT_STATE.md` — latest truth snapshot and verified evidence.
3. `project-context/ACCEPTANCE.md` — A1–A8 objective and evidence contract.
4. `project-context/ARCHITECTURE.md` — product/repository ownership boundary.
5. `project-context/DECISIONS.md` — accepted and superseded decisions.
6. `project-context/plan.md` and `project-context/tasks.{md,json}` — execution plan and strict task ledger.
7. `project-context/prompts.md` and `project-context/provenance.md` — source asks and provenance.
8. `CONTRIBUTING.md`, `SECURITY.md`, and `DESIGN.md` — public contribution, risk, and visual contracts.
9. `registry/index.json`, `registry/items/*.json`, and `schemas/*.json` — machine-readable public surface.
10. `packages/*/package.json`, root `package.json`, and `.github/workflows/ci.yml` — build, package, and CI truth.

This inventory is a handoff index, not a replacement for those canonical sources. When facts diverge, update the owning source first, then refresh `CURRENT_STATE.md`, the task ledger, and this audit snapshot.
