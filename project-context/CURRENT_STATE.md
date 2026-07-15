# Current state

**As of:** 2026-07-15
**Lifecycle:** local v0.1 release candidate
**Public release:** none

## What is true

- The active product is Agents SDK at agents-sdk.com.
- The canonical lowercase physical repository path is `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`. `/Users/houstongolden/Desktop/CODE_2025/agenty` is a compatibility symlink into that repository for already-open Codex context; it is not a second checkout or active product identity.
- Acceptance gates A1–A7 pass locally.
- The positioning, eight-area information architecture, industrial-editorial design system, ownership model, plan, and acceptance contract are implemented and documented.
- The versioned registry includes the three v0.1 components, approval pattern, focused examples, and complete support-agent template.
- The compiled CLI implements `init`, `add`, `list`, `diff`, and `doctor` with copy-owned source, dependency planning, conflict refusal, modification detection, and rollback coverage.
- The docs/catalog site contains 23 generated pages and passes desktop/mobile browser QA.
- `AgentsSDKStack` is synchronized into the shared stack map while `~/.agent-shared` and You.md retain their canonical ownership boundaries.
- Original source prompts and cross-project provenance remain preserved.
- The dated [full project handoff audit](audits/2026-07-15-full-project-handoff/00-README.md) records the build/refocus/rename thread, documentation and code inventories, decision/status map, risks, and next work without replacing canonical project context.
- Canonical Agents SDK code passes the full repository gate. The 29 visible `* 2.*` historical collision files and six ignored generated collision artifacts were audited, proven non-unique, and removed; raw-tree validation no longer requires quarantine.

## Verified evidence

- Targeted audit formatting: the initial Prettier pass found eight audit Markdown files and formatted all eight.
- Collision custody audit: all 29 visible snapshots were already preserved as Git blobs; none contained unique evidence. Six ignored artifacts were generated output or generated registry copies. The closure is recorded in `audits/2026-07-15-full-project-handoff/10-CONTEXT-RECOVERY-AND-COLLISION-CLOSURE.md`.
- Raw-tree `pnpm validate`: passed after collision cleanup with build, typecheck, all 52 tests, lint, formatting, and the 23-page production build; no quarantine path was required.
- API documentation guard, repository diff check, JSON parsing, and secret scans: pass.
- Browser QA: desktop, mobile, overflow, console, approval interaction, navigation menu, and primary CTA: pass.
- Clean-room compiled CLI: `init`, `add support-agent`, `diff`, and `doctor`: pass.
- Clean-room installed support-agent: dependency install, 11 tests, typecheck, and production build: pass.
- Package dry-runs: pass.
- Shared `AgentsSDKStack` synchronization: pass.
- Repository continuity: the renamed lowercase path resolves the existing Git history and linked worktrees; the old `agenty` path resolves only through the compatibility symlink.
- Documentation continuity: the [2026-07-15 full handoff package](audits/2026-07-15-full-project-handoff/00-README.md) is complete and `git diff --check` passes for its authored Markdown files.
- You.md integration: the local Brain scan is ready under the stable local `project:agenty` reference with Agents SDK as the display identity; the strict 13-task ledger and T1 YouStack doctor pass. Remote Brain/task projection remains blocked because the current credential lacks `write:brain`; no upload was performed.
- You.md local write authority after the rename: `youmd tasks add ... --no-sync` was rejected with `TASKS_WRITE_NOT_GRANTED` because the renamed checkout does not currently have a valid `.you-project` descriptor. No task file was changed or guard bypassed; the existing 13-task `tasks.json` remains canonical until the supported project registration grants local write authority.

## A8 remains pending

- No `@agents-sdk/*` package is published.
- agents-sdk.com is not serving this release.
- Ownership and release access for the npm namespace, domain, and GitHub organization are not proven.
- The tagged public-release, rollback, and second-environment evidence bundle does not exist yet.

Memory, auth/team, queues/background jobs, observability suites, deployment integrations, and broad MCP/provider catalogs remain roadmap subjects, not v0.1 claims.

The authoritative objective and gates are in `ACCEPTANCE.md`. Update this snapshot after every material milestone.
