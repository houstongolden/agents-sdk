# Decisions, status, and source-of-truth map

**Snapshot date:** 2026-07-15
**Canonical project:** Agents SDK
**Canonical repository path:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Lifecycle:** local v0.1 release candidate; no public release

## Executive truth

The active product is **Agents SDK**, the open-source component system for building production agentic applications. The public identity target is `agents-sdk.com`, the npm scope target is `@agents-sdk/*`, and the CLI executable is `agents`. The former Agenty/agency-first direction is historical provenance only.

The repository rename is complete: all project code and context live under `agents-sdk`; `/Users/houstongolden/Desktop/CODE_2025/agenty` is only a compatibility symlink into that directory. Local acceptance gates A1 through A7 pass. A8 is blocked on external ownership, human release approval, public publishing/hosting, tags/rollback evidence, and second-environment reproduction.

## Status vocabulary

This audit uses four mutually exclusive states:

- **Done:** the requested outcome exists and has recorded verification evidence.
- **In progress:** authorized work is actively being produced, but its acceptance evidence is not yet complete.
- **Blocked:** meaningful next execution depends on a named human gate, missing authority/credential, or external state.
- **Not started:** accepted future work has no implementation/evidence yet and is not a current claim.

“Open” in the task ledger is refined below into **blocked** or **not started** so the handoff does not imply active execution where none exists.

## User-ask outcome map

The requests are decomposed once into non-overlapping outcomes. Historical asks are preserved, but superseded outcomes do not compete with the active brief.

| User ask/outcome                                                                              | Status                   | Result and evidence                                                                                     | Remaining condition                                                                                           |
| --------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Establish a durable project home for reusable agent application work                          | Done                     | Repository, `project-context/`, pnpm workspace, packages, schemas, registry, templates, and tests exist | Continue to respect ownership boundaries                                                                      |
| Connect project facts to shared global standards without duplicating them                     | Done                     | `AGENTS.md`, `CLAUDE.md`, `ARCHITECTURE.md`, `provenance.md`, shared `AgentsSDKStack` sync evidence     | Shared skills remain upstream-owned                                                                           |
| Create a real verifiable goal and execution plan                                              | Done                     | `ACCEPTANCE.md` defines SDK-0.1/A1–A8; `plan.md` and 13-task ledger exist                               | A8 remains unresolved, not the plan itself                                                                    |
| Build a broad “Agenty / agency for agents” framework and service                              | Superseded               | Original prompt and decisions remain preserved                                                          | Replaced by the Agents SDK reset; do not resume                                                               |
| Reset identity to Agents SDK and agents-sdk.com                                               | Done                     | D-006, A1, docs/site/package/schema vocabulary, `youstack.json` display identity                        | Public domain serving is an A8 concern                                                                        |
| Make the product source-owned components rather than a universal runtime                      | Done                     | D-007, registry contract, CLI copy/install/diff behavior, consuming-app boundaries                      | Guard against future scope drift                                                                              |
| Organize the product under eight durable public areas                                         | Done                     | D-008, docs navigation, 23 generated pages                                                              | Empty categories remain labeled vision/roadmap, not shipped inventory                                         |
| Establish honest v0.1 inventory                                                               | Done                     | Three components, one pattern, support-agent template, two focused examples                             | Do not count future agents/MCP/memory/etc. as shipped                                                         |
| Ship tested registry and CLI ownership loop                                                   | Done                     | A3/A4, core and CLI tests, compiled clean-room `init/add/diff/doctor` proof                             | Public package install remains A8                                                                             |
| Ship reusable UI components and complete template                                             | Done                     | A5/A6, browser QA, support-agent 11-test/typecheck/build proof                                          | Provider/auth/persistence/deployment remain host-owned                                                        |
| Complete docs and fresh-developer local proof                                                 | Done                     | A7, site tests/build, API docs guard, package dry-runs, clean-room proof                                | Public URLs and published packages remain A8                                                                  |
| Keep BAMF attribution/Enterprise path restrained and secondary                                | Blocked                  | D-011 defines the boundary; current copy follows it                                                     | `t-hy-003` requires Houston approval/revision                                                                 |
| Rename the project directory from `agenty` to `agents-sdk` without losing this task context   | Done                     | Physical repository is `agents-sdk`; old path is a compatibility symlink; Git history/worktrees remain  | Retire symlink only after Codex and integrations use the canonical path                                       |
| Preserve the entire current-project context and create a comprehensive handoff directory      | In progress at snapshot  | Audit directory and inventories are being created from canonical docs, code, Git, and task evidence     | Complete audit index, reconcile duplicates, validate, and commit as one coherent docs unit                    |
| Publish packages and agents-sdk.com                                                           | Blocked                  | Local A1–A7 proof exists                                                                                | Namespace/domain/GitHub access, human approval, remote/tag, public deploy, rollback, second-environment proof |
| Sync local project/ledger evidence into You.md                                                | Partially done / blocked | Local scan, display identity, strict task ledger, and T1 doctor pass                                    | Remote Brain/task projection needs `write:brain`; no upload occurred                                          |
| Expand into memory, auth/team, queues, observability, deployment, broad MCP/provider catalogs | Not started              | Listed only in vision/roadmap                                                                           | Requires production evidence and explicit future acceptance scope                                             |

## Decision history and supersession

### D-001 through D-005 — historical Agenty decisions

These decisions were accepted under the initial Agenty brief and are formally superseded as active product decisions. Their reusable principles survive only where the current Agents SDK decisions and architecture explicitly re-adopt them.

| Decision                                       | Historical content                                                                                                                                   | Current disposition                                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **D-001 — Agenty owns productized primitives** | Agenty owned reusable code/contracts/tests; shared skills owned global behavior; You.md owned identity/catalog; product repos owned domain/auth/data | Brand/product owner superseded by Agents SDK. The ownership partition is re-adopted in `ARCHITECTURE.md` and remains valid under the new owner |
| **D-002 — Contracts before broad adapters**    | Stabilize manifests and conformance semantics before multiplying providers                                                                           | Formally superseded with the old brief, but substantively retained by D-007, D-008, D-010, strict schemas, and honest integration boundaries   |
| **D-003 — Proposal-first self-improvement**    | Cross-project learning may propose; promotion requires privacy classification, tests, review                                                         | Superseded and explicitly succeeded by D-012 with provenance, generalization, documentation, and versioned ownership requirements              |
| **D-004 — Framework plus service**             | Open primitives build trust; private client context/operations/custom work remain separate; exact boundary pending                                   | “Framework” and agency-led framing superseded by D-007. Secondary custom implementation survives narrowly under D-011 and `t-hy-003`           |
| **D-005 — Domain purchase gated by proof**     | Use `agenty.so`; consider purchasing `agenty.io` only after evidence                                                                                 | Obsolete. D-006 establishes agents-sdk.com; public launch and ownership are gated by A8 and `t-hy-001`/`t-hy-002`                              |

The authoritative historical text is retrievable from commit `60861a0`. It should not be copied back into the active decision ledger as live policy.

### D-006 through D-012 — current Agents SDK decisions

| Decision                                              | Status              | Binding consequence                                                                                                   |
| ----------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **D-006 — Agents SDK supersedes Agenty**              | Accepted 2026-07-14 | Agents SDK/agents-sdk.com is active; Agenty is provenance/migration history only                                      |
| **D-007 — Component system, not universal framework** | Accepted 2026-07-14 | Distribute developer-owned source and guidance; do not claim every runtime layer                                      |
| **D-008 — Docs and registry are the primary product** | Accepted 2026-07-14 | Eight-area IA is durable; category presence is not shipped inventory                                                  |
| **D-009 — Scoped npm namespace**                      | Accepted 2026-07-14 | Use `@agents-sdk/*`; prefer `agents`; occupied unscoped package does not change brand                                 |
| **D-010 — Honest v0.1**                               | Accepted 2026-07-14 | Exactly three components, one approval pattern, one support template, focused examples, CLI, and complete docs        |
| **D-011 — BAMF is secondary**                         | Accepted 2026-07-14 | Restrained credit/Enterprise path only; never the homepage or IA narrative                                            |
| **D-012 — Proposal-first cross-project learning**     | Carried forward     | Learning creates attributed proposals; promotion requires privacy classification, generalization, tests, docs, review |

## Canonical source-of-truth hierarchy

When two records disagree, resolve the conflict using this precedence and update downstream summaries. “Newer” alone does not make a generated snapshot canonical.

1. **Current explicit user directive and human approval.** The user can revise scope or approve consequential actions. Public release, production credentials/actions, purchases, and client promises require explicit approval.
2. **Repository agent instructions:** `AGENTS.md`, `CLAUDE.md`, and applicable shared global instructions. These govern how work is performed and routed.
3. **Acceptance contract:** `project-context/ACCEPTANCE.md`. This is the authoritative SDK-0.1 objective, gates, and evidence standard.
4. **Decision ledger:** `project-context/DECISIONS.md`. This records accepted product/architecture choices and supersession.
5. **Architecture/ownership:** `project-context/ARCHITECTURE.md`. This assigns canonical ownership across Agents SDK, shared skills, You.md, consuming products, and BAMF.
6. **Machine task ledger:** `project-context/tasks.json`. This is the canonical 13-task state under `you-md/tasks/v1`. `tasks.md` is generated from it and must not be edited manually.
7. **Current truth snapshot:** `project-context/CURRENT_STATE.md`. This summarizes verified present state and must be refreshed after material milestones.
8. **Execution design:** `project-context/plan.md`, `ROADMAP.md`, `VISION.md`, `STACK.md`, and design docs. These guide delivery but cannot overrule acceptance or accepted decisions.
9. **Runnable implementation and tests:** packages, registry, templates, schemas, CI, build/test outputs, browser evidence, and release artifacts. Claims require this evidence; code behavior can expose stale docs but does not silently rewrite product policy.
10. **Prompt and provenance history:** `prompts.md`, `provenance.md`, Git commits, and handoff audit snapshots. These explain origin and change but do not revive superseded direction.

### Ownership by system

| Knowledge/code surface                                                                     | Canonical owner         | Agents SDK rule                                                                |
| ------------------------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------ |
| Public registry, package source, CLI, docs, templates, examples, schemas, release evidence | This repository         | Edit and version here                                                          |
| Global agent behavior, skills, sync scripts, cross-agent rules                             | `~/.agent-shared`       | Reference/install; govern and change upstream, never duplicate here            |
| Identity, private memory, project graph, portable project catalog                          | You.md                  | Add safe project context; never copy secrets/private brain data into this repo |
| Product auth, tenancy, database, business rules, model credentials, deployment             | Consuming product repo  | Document integration only; consumer remains authoritative                      |
| Shared agentic shell standards and paid AI SDK Agents references                           | Canonical shared skills | Use as design/provenance input; do not republish private or paid assets        |
| Historical standards and cross-project source material                                     | Original source repos   | Cite as evidence; promote only through provenance/review                       |
| Custom implementation/Enterprise delivery                                                  | BAMF                    | Secondary service boundary, never public product architecture                  |

## Acceptance status A1–A8

| Gate                     | Status       | Current evidence                                                                                                          | What would change status                                                               |
| ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **A1 Identity**          | Done         | Agents SDK naming across repo/packages/schemas/site; D-006/D-009; API docs and secret scans                               | Regress only if active legacy branding or ownership drift returns                      |
| **A2 Public experience** | Done locally | Homepage/docs shell, eight-area navigation, 23 generated pages, desktop/mobile/overflow/console/menu/CTA QA               | Public serving is evaluated separately under A8                                        |
| **A3 Registry**          | Done         | Seven items, v1 schemas, dependency/source/docs/test/provenance validation, core tests                                    | New item requires equivalent contract and evidence                                     |
| **A4 CLI**               | Done locally | `init/add/list/diff/doctor`, error/conflict/rollback coverage, compiled clean-room proof                                  | Public npm execution is A8                                                             |
| **A5 Components**        | Done locally | `agent-chat`, `human-approval`, `artifact-workspace`; tests/docs; responsive browser QA                                   | New variants are separate scope                                                        |
| **A6 Pattern/template**  | Done locally | `approval-gates`; support-agent install, allow/deny flow, 11 tests, typecheck, build                                      | Hosted provider/auth/persistence are not required v0.1 claims                          |
| **A7 Documentation**     | Done locally | Quickstart/item docs, API docs guard, package dry-runs, clean-room developer proof                                        | Release-specific public URLs/rollback must match A8                                    |
| **A8 Release proof**     | Blocked      | No published scoped packages, live site, namespace proof, remote/tag, rollback bundle, or second-environment reproduction | Complete every A8 condition with command/exit/artifact/SHA evidence and human approval |

## Current 13-task ledger

`project-context/tasks.json` is canonical. `project-context/tasks.md` is generated output. The ledger contains 9 done tasks and 4 open tasks.

### Done — agent-owned local acceptance

| ID          | Outcome                                     | Gate/evidence relationship |
| ----------- | ------------------------------------------- | -------------------------- |
| `t-sdk-001` | Identity and namespace migration            | A1                         |
| `t-sdk-002` | Homepage, docs shell, IA, item-page anatomy | A2                         |
| `t-sdk-003` | Registry item contract                      | A3                         |
| `t-sdk-004` | CLI ownership loop                          | A4                         |
| `t-sdk-005` | Agent Chat                                  | A5 component 1             |
| `t-sdk-006` | Human Approval                              | A5 component 2             |
| `t-sdk-007` | Artifact Workspace                          | A5 component 3             |
| `t-sdk-008` | Approval Gates and support-agent template   | A6                         |
| `t-sdk-009` | Documentation and fresh-developer proof     | A7                         |

### Open — human/external release gates

| ID          | Effective status         | Owner              | Dependency/blocker                                                                      |
| ----------- | ------------------------ | ------------------ | --------------------------------------------------------------------------------------- |
| `t-hy-001`  | Not started / human gate | Houston            | Secure or approve `@agents-sdk` npm organization and release access                     |
| `t-hy-002`  | Not started / human gate | Houston            | Approve package and agents-sdk.com launch after `t-sdk-009`                             |
| `t-hy-003`  | Not started / human gate | Houston            | Approve/revise restrained Enterprise path and BAMF attribution                          |
| `t-sdk-010` | Blocked                  | Agent, after gates | Depends on `t-sdk-009`, `t-hy-001`, `t-hy-002`; packages/site/ownership evidence absent |

This is intentionally MECE: the first nine tasks own local construction/acceptance; three human tasks own external approvals; one final agent task owns the public release proof. Do not add a parallel “launch” task unless it represents a genuinely separate acceptance outcome.

## You.md integration: prior and current evidence

### Prior Agenty-era record

The foundation snapshot at commit `60861a0` used `agenty/tasks/v1` and a 12-task `AG-*`/`HY-*` ledger. Its You.md registration task `AG-002` was blocked with evidence labels including `PROJECT_BRAIN_SYNC_SNAPSHOT_FAILED` and `PROJECT_BRAIN_INTERNAL`. That ledger describes an obsolete product plan and is not current task state.

### Current local Agents SDK record

The current repository uses:

- `youstack.json` with slug `agents-sdk`, name `Agents SDK`, aliases including `agenty`, private default visibility, and T1 safety;
- `project-context/tasks.json` using `you-md/tasks/v1`, project `agents-sdk`, with 13 strict tasks;
- `project-context/you.md/log.md` as an append-only agent activity log;
- local Brain scan readiness under the stable physical reference `project:agenty`, with Agents SDK as the display identity;
- a passing T1 YouStack doctor check;
- synchronized `AgentsSDKStack` mapping in the shared stack catalog.

The stable `project:agenty` reference is a local You.md identity/catalog key inherited from the original physical project registration. It does not make Agenty the product name and does not override the canonical repository path. Change it only through You.md’s supported project/sync workflow, with migration evidence, rather than hand-editing generated portfolio artifacts.

### Current remote blocker

Remote Brain/task projection has **not** been uploaded. The current credential lacks `write:brain`. The agent correctly stopped without printing credentials or claiming a remote sync. Re-authentication with the required scope, an explicit retry, and remote read-back verification are needed before remote sync can be marked done.

## Why legacy snapshots remain evidence only

Legacy prompts, decisions, task ledgers, names, paths, and Git commits are deliberately preserved because they provide:

- provenance for why the repository exists;
- an audit trail for the product reset;
- evidence of which ideas were generalized, rejected, or superseded;
- historical context for the compatibility symlink and You.md project key;
- protection against silently rewriting user intent;
- a basis for migration, attribution, rollback, and future decision review.

They are not active sources of truth because they use the wrong product identity, obsolete domains and package assumptions, superseded agency/framework scope, outdated task schemas/statuses, or pre-reset acceptance criteria. Treating them as live would create duplicate plans and contradictory ownership.

Therefore:

1. Preserve legacy text verbatim in `prompts.md`, Git history, and clearly labeled audit/provenance records.
2. Never copy legacy tasks back into the current 13-task ledger.
3. Never infer that `agenty`, `agenty.so`, `agenty.io`, or the old service-led plan is active.
4. Resolve conflicts using the source-of-truth hierarchy above.
5. Update canonical current files first; regenerate summaries and snapshots afterward.

## Status update protocol

After any material milestone:

1. Record the implementation/evidence at its canonical owner.
2. Update `project-context/tasks.json`; regenerate `tasks.md` with the supported You.md task command.
3. Update `CURRENT_STATE.md` when truth changes.
4. Update `DECISIONS.md` only for an accepted decision, supersession, or explicit human ruling.
5. Append a concise `project-context/you.md/log.md` entry when meaningful.
6. Sync safe You.md/shared-stack metadata only through their owning tools and scopes.
7. Refresh this handoff snapshot only if a new handoff is actually needed.

No audit document, generated HTML portfolio, duplicated `* 2.*` file, stale Codex workspace label, or compatibility symlink may silently override these canonical records.
