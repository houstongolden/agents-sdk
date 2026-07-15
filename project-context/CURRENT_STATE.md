# Current state

**As of:** 2026-07-14  
**Lifecycle:** foundation / pre-release  
**Release:** none

## Present in the repository

- Root ownership, security, contribution, package, CI, and release-governance foundations.
- Durable prompt, plan, task, architecture, design, stack, decision, acceptance, provenance, roadmap, and YouStack context.
- Compiled `@agenty/core`, `@agenty/cli`, `@agenty/harness`, and `@agenty/ui` packages.
- A v1 agent-project JSON Schema, semantic cross-reference/safety validation, registry catalog, and starter contract.
- A safe compiled CLI with `init`, `validate`, `doctor`, and `catalog`; `init` creates every declared local runtime, eval, and skill file and refuses conflicting writes.
- A Next.js Studio reference app with the reusable shell, chat-first home, deterministic progress/tool stream, responsive artifact pane, and baseline project/files/knowledge/connectors/loops/settings routes.
- Shared Stack Map registration and a tested upstream fix for opaque artifact references in the You.md PII scanner.

## Not yet proven or released

- No package is publicly published and no global install path is supported.
- `init` creates a manifest and all declared local runtime/eval/skill files; it does not yet scaffold a complete runnable application.
- The complete provider-neutral runtime, durable approval/event system, replay, budgets, and redaction are not yet accepted.
- You.md remote brain sync still rejects the Agenty snapshot and project-brain generation still fails internally; local Agenty discovery and repository context are intact.
- Cross-project learning is proposal-only; there is no autonomous upstream mutation or production deployment.
- `agenty.so` release and second-machine clean-clone proof remain Stage 8 work.

## Immediate verification queue

1. Keep frozen install, compiled package/app builds, 25 tests, typecheck, lint, and formatting green together.
2. Build the bounded runtime/approval/event harness (Stage 3).
3. Turn the contract skeleton into a fully installable/runnable application scaffold and full conformance report (Stages 4 and 6).

## Verification evidence

- `pnpm validate`: pass (compiled packages and Studio, 25 tests, typecheck, lint, Prettier).
- Compiled CLI proof: `init`, `validate`, `doctor`, and `catalog` pass; repeat `init` exits `2` without overwriting.
- Browser QA: desktop and 390×844 mobile pass; deterministic run completes; artifact pane opens/closes; zero console warnings/errors.
- Local Studio remains available at `http://127.0.0.1:3017` for continued testing.

The authoritative objective and gates remain `ACCEPTANCE.md`; this snapshot should be updated after every material milestone.
