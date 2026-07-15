# Agents SDK v0.1 plan

**Status:** A1–A7 complete locally; A8 public release pending
**Positioning:** The open-source component system for building production agentic applications.
**North-star goal:** Pass every gate in `ACCEPTANCE.md` from a clean directory without fake inventory or a hosted runtime dependency.

## Current release state

The previous Agenty direction remains superseded. The Agents SDK product reset and local v0.1 implementation now pass A1–A7, including repository validation, docs/catalog browser QA, and a clean-room support-agent install/test/typecheck/build proof. The canonical repository path is `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`; the prior `agenty` path is a temporary compatibility symlink only. The dated [full project handoff audit](audits/2026-07-15-full-project-handoff/00-README.md) preserves documentation and implementation continuity. Public release evidence remains A8 work.

## Phase 1 — Identity, scope, and information architecture

**Status:** complete.

Rename the product, packages, schemas, command language, project context, and public copy. Establish the eight-area navigation and clearly separate shipped, preview, and roadmap inventory.

**Exit:** A1 passes; repository search finds no active legacy brand; v0.1 inventory is exact.

## Phase 2 — Public docs foundation

**Status:** complete. Browser QA passes across desktop, mobile, overflow, console, approval, menu, and CTA flows; 23 pages generate.

Replace the chat-dashboard-first site with the industrial-editorial homepage, documentation shell, catalog navigation, item-page anatomy, and restrained BAMF attribution defined in `DESIGN.md`.

**Exit:** A2 passes on desktop and mobile with accessibility and visual evidence.

## Phase 3 — Registry and CLI ownership loop

**Status:** complete. Core and CLI contract suites pass; compiled clean-room `init/add/diff/doctor` proof passes.

Define the registry item contract. Implement `agents init`, `add`, `list`, `diff`, and `doctor` with deterministic file planning, dependency handling, conflict refusal, local-modification detection, and rollback on failed writes.

**Exit:** A3 and A4 pass from a temporary clean application.

## Phase 4 — Three excellent components

**Status:** complete. Component, site, and browser evidence pass for all three v0.1 items.

Ship `agent-chat`, `human-approval`, and `artifact-workspace` as installable, developer-owned source. Each gets a focused example, tests, item docs, responsive and accessibility proof, error/empty/loading states, and integration boundaries.

**Exit:** A5 passes. A component is not accepted merely because a similarly named internal primitive exists.

## Phase 5 — Pattern and complete template

**Status:** complete. The clean-room template installs dependencies, runs 11 tests, typechecks, and builds.

Ship the `approval-gates` architecture pattern with named failure paths, then build one support-agent template that composes all three components and demonstrates a consequential action requiring allow/deny approval.

**Exit:** A6 passes, including clean install and runnable behavior.

## Phase 6 — Documentation and contributor proof

**Status:** complete. API docs guard, JSON, diff, secret, package dry-run, and fresh-developer proofs pass.

Complete quickstart, registry authoring, contribution, compatibility, security, accessibility, customization, and upgrade/diff guidance. Run the flow with a fresh contributor perspective.

**Exit:** A7 passes with no generic filler or empty pages presented as product.

## Documentation continuity and handoff milestone

**Status:** complete 2026-07-15.

Rename the physical repository identity to lowercase `agents-sdk` without losing the active Codex task, Git history, linked worktrees, project context, or provenance. Preserve the old `agenty` path only as a compatibility symlink. Produce a comprehensive, dated, source-linked handoff package covering the thread/work log, prompt history, documentation and code inventories, decisions/status/source-of-truth hierarchy, risks, gaps, and next actions.

**Exit:** D-013 is recorded; canonical context links to the [2026-07-15 handoff audit](audits/2026-07-15-full-project-handoff/00-README.md); the exact rename and audit prompts remain in `prompts.md`; Phase 7/A8 remains pending rather than being inferred complete from documentation work.

## Phase 7 — Release proof

**Status:** pending.

Publish the scoped packages and agents-sdk.com only after clean CI, second-worktree/machine proof, package provenance, limitations, changelog, rollback, and human launch approval.

**Exit:** A8 passes.

Remaining work is intentionally external and release-specific: publish scoped packages, serve the accepted build at agents-sdk.com, prove npm/domain/GitHub organization ownership and access, create tagged rollback evidence, and repeat the release proof in the required second environment.

## Transition stabilization

**Status:** collision cleanup and ADIL branch disposition complete; durability and You.md authority pending.

The old `agenty` path resolves to the canonical repository and requires no file copy. The recovered task history is indexed in the handoff audit. The 29 visible historical collision snapshots and six ignored generated collision artifacts were proven non-unique and removed, restoring a canonical raw working tree. The separate ADIL branch was reviewed: its implementation was adapted as the private `@agents-sdk/intelligence-contracts` roadmap package, while its superseded Agenty ledgers and lockfile were excluded. Local You.md project metadata and logging work, but v1 descriptor adoption/task-write authority remains blocked because the control plane returned `applyAvailable: false`. Remaining transition work is that authority grant plus remote/off-machine durability.

## Work loop

For each item: verify the repeated user problem → inventory proven source → record provenance → specify the registry contract → implement the smallest complete slice → test happy and shadow paths → document tradeoffs → run visual/accessibility/security review → record evidence → commit one logical change.
