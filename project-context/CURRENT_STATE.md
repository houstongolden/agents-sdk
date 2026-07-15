# Current state

**As of:** 2026-07-15
**Lifecycle:** local v0.1 release candidate
**Public release:** none

## What is true

- The active product is Agents SDK at agents-sdk.com.
- Acceptance gates A1–A7 pass locally.
- The positioning, eight-area information architecture, industrial-editorial design system, ownership model, plan, and acceptance contract are implemented and documented.
- The versioned registry includes the three v0.1 components, approval pattern, focused examples, and complete support-agent template.
- The compiled CLI implements `init`, `add`, `list`, `diff`, and `doctor` with copy-owned source, dependency planning, conflict refusal, modification detection, and rollback coverage.
- The docs/catalog site contains 23 generated pages and passes desktop/mobile browser QA.
- `AgentsSDKStack` is synchronized into the shared stack map while `~/.agent-shared` and You.md retain their canonical ownership boundaries.
- Original source prompts and cross-project provenance remain preserved.

## Verified evidence

- `pnpm validate`: pass. Core 10 tests, UI 5, CLI 22, harness 1, site 14; 23 site pages generated.
- API documentation guard, repository diff check, JSON parsing, and secret scans: pass.
- Browser QA: desktop, mobile, overflow, console, approval interaction, navigation menu, and primary CTA: pass.
- Clean-room compiled CLI: `init`, `add support-agent`, `diff`, and `doctor`: pass.
- Clean-room installed support-agent: dependency install, 11 tests, typecheck, and production build: pass.
- Package dry-runs: pass.
- Shared `AgentsSDKStack` synchronization: pass.
- You.md integration: the local Brain scan is ready under stable physical `project:agenty` with Agents SDK as the display identity; the strict 13-task ledger and T1 YouStack doctor pass. Remote Brain/task projection remains blocked because the current credential lacks `write:brain`; no upload was performed.

## A8 remains pending

- No `@agents-sdk/*` package is published.
- agents-sdk.com is not serving this release.
- Ownership and release access for the npm namespace, domain, and GitHub organization are not proven.
- The tagged public-release, rollback, and second-environment evidence bundle does not exist yet.

Memory, auth/team, queues/background jobs, observability suites, deployment integrations, and broad MCP/provider catalogs remain roadmap subjects, not v0.1 claims.

The authoritative objective and gates are in `ACCEPTANCE.md`. Update this snapshot after every material milestone.
