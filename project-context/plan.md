# Agenty eight-stage plan

**Status:** active  
**North-star goal:** From a clean clone, a developer can choose a starter, define a typed agent with tools and approvals, run it locally, inspect streaming/tool/artifact state, execute safety and capability evals, and receive a machine-readable conformance report in 15 minutes without copying private project code or secrets.

The goal passes only when every check in `ACCEPTANCE.md` has linked evidence. A polished demo without reproducible commands does not pass.

## Current implementation snapshot

- Stage 1: complete in this repository; remote You.md brain publication remains an upstream blocker tracked as AG-002.
- Stage 2: first v1 AgentProject contract complete and tested; additional run/event-specific contracts remain part of Stage 3.
- Stage 3: not complete; the current harness validates manifests but does not yet execute provider-neutral bounded runs or durable approvals.
- Stage 4: in progress; the compiled CLI creates a contract-complete skeleton and passes conflict/doctor proofs, but not yet a fully installable application.
- Stage 5: first reference proof passes desktop/mobile browser QA; approval interaction and durable artifact lifecycle remain.
- Stage 6: in progress; deterministic acceptance exists, full conformance and learning-proposal ingestion do not.
- Stages 7–8: planned.

## Stage 1 — Foundation and ownership

Define vision, repository rules, monorepo tooling, source-of-truth boundaries, decision/provenance ledgers, tasks, and acceptance contract.

**Exit:** required context files parse; clean install and root validation commands are documented; no `.you-project` or secret is committed.

## Stage 2 — Versioned contracts

Implement schemas/types for agent, tool, skill, connector, approval, artifact, run event, eval, and conformance manifests. Include examples and compatibility policy.

**Exit:** valid fixtures pass, intentionally invalid fixtures fail with actionable paths, and JSON Schema output matches runtime validation.

## Stage 3 — Runtime and safety harness

Build provider-neutral execution, typed tool dispatch, bounded loops, cancellation, durable run events, approval gates, redaction, budgets, and replay.

**Exit:** deterministic fake-provider tests prove approve/deny/expire, retry/idempotency, cancellation, and replay behavior.

## Stage 4 — Starter and CLI

Ship a single-command scaffold with adapter choices, local env template, sample agent/tool, tests, and upgrade-safe configuration.

**Exit:** a temporary clean directory can scaffold, install, typecheck, test, and run the sample without manual source edits.

## Stage 5 — Agentic application UI

Package the Houston shell: collapsible sidebar, chat-first session, parent-shell composer, typed message parts, connectors, progress/tool rows, approvals, and durable artifact pane.

**Exit:** component tests, responsive browser flows, accessibility checks, and visual evidence pass; no nested composer focus border is introduced.

## Stage 6 — Evals, conformance, and learning loop

Add capability/safety eval fixtures, conformance CLI/report, provenance checks, regression ledgers, and proposal-only cross-project learning ingestion.

**Exit:** conformance catches a broken example; learning proposals contain source, owner, evidence, privacy class, and approval without auto-editing upstream repos.

## Stage 7 — Docs, examples, and service system

Publish the architecture, API/MCP contracts, recipes, reference apps, delivery discovery/audit/build/acceptance templates, and public/private boundary.

**Exit:** a new contributor completes the quickstart; one BAMF-shaped reference and one neutral reference pass; service deliverables map to framework artifacts.

## Stage 8 — Release and proof

Release the first version, deploy `agenty.so`, run the clean-clone proof on a second machine/worktree, publish limitations and changelog, and create the ongoing improvement cadence.

**Exit:** all acceptance gates pass from the tagged release, install artifacts are reproducible, rollback is documented, and any `agenty.io` purchase remains a human business decision.

## Work loop

For every stage: inventory evidence → specify the contract → implement the smallest complete slice → test failure paths → review ownership/security → record proof → commit one logical change. Cross-project discoveries enter as proposals first.
