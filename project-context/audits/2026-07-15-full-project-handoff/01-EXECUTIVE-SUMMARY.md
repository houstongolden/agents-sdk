# Executive summary

**Project:** Agents SDK
**Lifecycle:** Local v0.1 release candidate
**Canonical path:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Snapshot:** `main` at `9c7f1f918ad1679a1d2e85db57582b5d363ad21d` before the uncommitted audit bundle

## Outcome

The repository is no longer an early Agenty concept. It is a working, locally accepted **Agents SDK v0.1 release candidate**: a docs-and-registry-first component system that distributes readable, installable, developer-owned source for production agentic applications. Local acceptance gates A1 through A7 are recorded as passing. The remaining work is primarily duplicate reconciliation and public-release gate A8; no public package or live-site release should be claimed yet.

## From Agenty to Agents SDK

### Initial Agenty build

The first four commits established a meaningful foundation rather than disposable scaffolding:

| Commit    | Result                                                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `60861a0` | Established Agenty project governance, context, architecture, acceptance thinking, and provenance.                                                          |
| `b494eb8` | Added versioned manifest contracts, a CLI foundation, conformance harness, tests, and starter behavior.                                                     |
| `7dfeaea` | Shipped a reusable agentic Studio shell with sidebar, chat, composer, artifact workspace, connectors/files/knowledge/loops/settings surfaces, and UI tests. |
| `4d8e679` | Recorded verified You.md and shared-stack integration while preserving ownership boundaries.                                                                |

That work proved reusable primitives, but the Agenty framing combined a broad framework/productization layer with an agency/service direction. It risked becoming a universal runtime or agency landing page rather than a focused developer product.

### Explicit product reset

On 2026-07-14, the user reset the active product to **Agents SDK** at **agents-sdk.com**. Decisions D-006 through D-012 superseded the earlier Agenty decisions. The durable framing became “shadcn/ui for complete agentic applications”: developers discover a proven item, copy source into their own repository, customize it, test it, and own it without depending on a hosted Agents SDK runtime.

The reset preserved useful code and provenance while changing the product boundary:

- canonical product areas became Components, Agents & Skills, Tools & MCP, Patterns, Templates, Examples, CLI, and Docs;
- the npm direction became `@agents-sdk/*`, with `agents` as the intended executable;
- docs and the registry became the primary product, not an agency marketing site or universal framework;
- provider, model, auth, database, deployment, queues, and production runtime choices remained behind documented integration boundaries;
- categories without runnable, documented, tested inventory were not allowed to masquerade as shipped capabilities.

Three subsequent commits implemented that reset:

| Commit    | Result                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `e94320d` | Established the Agents SDK registry contracts, source-owned installation model, and CLI ownership loop.              |
| `4781db7` | Rebuilt the public developer experience, catalog, docs shell, routes, demos, and industrial-editorial design system. |
| `9c7f1f9` | Formalized product truth, acceptance state, release evidence, tasks, roadmap, changelog, and current limitations.    |

## What is implemented

The tracked repository at the snapshot contains 171 files, including 88 TypeScript/TSX files and 19 test files. Its primary implemented surfaces are:

- `@agents-sdk/core`: strict manifest and registry parsing, cross-reference validation, safe-path and dependency/file-plan contracts, and local install state;
- `@agents-sdk/cli`: `init`, `add`, `list`, `diff`, `doctor`, validation/catalog behavior, dependency ordering, conflict refusal, hashes, rollback, and embedded offline registry assets;
- `@agents-sdk/ui`: reusable shell, chat, composer, approval, artifact, sidebar, right-pane, integration-icon, and starter configuration primitives;
- `@agents-sdk/harness`: structured agent-manifest acceptance checks;
- `@agents-sdk/site`: the Next.js docs/catalog/reference application;
- three v0.1 components: `agent-chat`, `human-approval`, and `artifact-workspace`;
- one executable pattern: `approval-gates`;
- two focused examples: `approval-flow` and `artifact-flow`;
- one complete Support Agent template using all three components and approval allow/deny behavior;
- four versioned JSON Schemas and seven registry item manifests.

The system deliberately does not claim to be an auth provider, model/provider abstraction, database, deployment platform, job/queue system, hosted marketplace, universal runtime, or broad MCP catalog.

## Verified local v0.1 state

The canonical current-state record reports:

| Evidence                                              | Recorded result                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm validate`                                       | Pass                                                                                       |
| Core tests                                            | 10 pass                                                                                    |
| UI tests                                              | 5 pass                                                                                     |
| CLI tests                                             | 22 pass                                                                                    |
| Harness tests                                         | 1 pass                                                                                     |
| Site tests                                            | 14 pass                                                                                    |
| Generated site pages                                  | 23                                                                                         |
| API-doc guard, diff check, JSON parsing, secret scans | Pass                                                                                       |
| Governed browser QA                                   | Desktop, mobile, overflow, console, approval interaction, navigation, and primary CTA pass |
| Clean-room compiled CLI                               | `init`, `add support-agent`, `diff`, and `doctor` pass                                     |
| Installed Support Agent                               | Dependency install, 11 tests, typecheck, and production build pass                         |
| Package dry-runs                                      | Pass                                                                                       |
| Shared `AgentsSDKStack` synchronization               | Pass                                                                                       |

This evidence supports local acceptance gates A1 through A7: identity, public experience, registry, CLI, components, pattern/template, and fresh-developer documentation proof.

The repository must still be described as a **local release candidate**. Intended commands such as `npx @agents-sdk/cli@latest ...` describe the target public interface; they are not currently available from a proven public release.

## Directory rename and session continuity

The project was physically renamed from the old `agenty` directory, passed through an interim mixed-case spelling during migration, and was then normalized to the lowercase physical directory `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`.

To preserve the already-open Codex task, stale absolute paths, and worktree continuity, the old path remains a compatibility symlink:

```text
/Users/houstongolden/Desktop/CODE_2025/agenty -> agents-sdk
```

There is one repository, not two copies. Git history, branches, tracked files, untracked files, and project context live in the renamed repository. New commands, docs, handoffs, and registrations should use the canonical `agents-sdk` path. The compatibility symlink should remain until the Codex project and other durable references have been re-registered and verified against the new path.

## Duplicate and legacy findings

The rename/copy state exposed **29 untracked files whose names contain ` 2` before the extension**. They are outside the 171 tracked-file inventory and must not be bulk-added.

| Class                                |  Count | Finding                                                                                                     |
| ------------------------------------ | -----: | ----------------------------------------------------------------------------------------------------------- |
| Root legacy Markdown                 |      7 | Divergent Agenty/older copies of governance and product docs                                                |
| Project-context legacy Markdown      |     10 | Divergent older acceptance, architecture, state, decisions, design, roadmap, stack, vision, plan, and tasks |
| Legacy context JSON                  |      3 | Divergent `braindump`, tasks, and YouStack copies                                                           |
| Duplicated Studio TSX pages          |      7 | Untracked `page 2.tsx` collision files                                                                      |
| Duplicated CLI TypeScript/test files |      2 | Untracked `index 2.ts` and `cli.test 2.ts`                                                                  |
| **Total**                            | **29** | Requires deliberate content comparison and reconciliation                                                   |

The documentation audit proves all 17 `* 2.md` and three `* 2.json` files differ from their tracked base counterparts. The tracked non-` 2` files are canonical. Generated files under `packages/cli/registry/` are a separate, expected class: nine documentation/HTML assets are exact mirrors created from canonical `registry/` and `templates/` sources and are gitignored.

The legacy files may contain useful historical decisions or evidence, but retaining them in the active tree creates split-brain search and context risk. Reconcile unique content into dated provenance/archive records, then remove the collision copies. Compare the nine code copies before removal; do not assume equivalence from naming alone.

## Current blockers

### Public-release gate A8

A8 is incomplete because:

1. No `@agents-sdk/*` package is published to npm.
2. agents-sdk.com is not serving the matching accepted build.
3. Ownership/release access for the npm namespace, domain, and intended GitHub organization has not been proven.
4. Human approval for the public package and site launch is still required.
5. Human approval for the restrained Enterprise path and “Built by BAMF” attribution is still required.
6. No tagged public-release and rollback evidence bundle exists.
7. No remote is configured and no pushed release commit exists at the audited snapshot.
8. A second worktree/machine has not repeated A1 through A7 against public packages and the live site.
9. The 29 untracked collision files prevent an unqualified clean-release-tree assertion.

### Secondary integration blocker

Local You.md integration, the strict 13-task ledger, and T1 YouStack doctor pass. Remote Brain/task projection was not uploaded because the current credential lacks `write:brain`; re-authentication with the correct scope is required before retrying. No secret value should be printed or copied into this audit.

## Immediate next actions

### Safe local actions

1. Finish and verify all audit artifacts `00` through `09`; run link and secret checks over the handoff directory.
2. Compare each of the 29 `* 2.*` files with its canonical/tracked counterpart.
3. Extract genuinely unique historical decisions, prompts, or verification evidence into a dated migration archive or canonical ledger.
4. Remove reconciled collision copies from the active tree; never stage them wholesale.
5. Re-run `git status`, JSON parsing, `git diff --check`, and `pnpm validate` after reconciliation.
6. Update `project-context/tasks.json`, regenerate `tasks.md`, update `CURRENT_STATE.md`, and record the new verification evidence.
7. Re-register/open `/Users/houstongolden/Desktop/CODE_2025/agents-sdk` as the Codex project; remove the `agenty` compatibility symlink only after task/session continuity is proven and no durable reference still depends on it.

### Human-gated release actions

1. Confirm or acquire `@agents-sdk` npm organization ownership and release access.
2. Confirm agents-sdk.com and GitHub organization ownership/access.
3. Approve the public launch, Enterprise path, and BAMF attribution.
4. Configure the remote and release provenance without exposing credentials.
5. Produce signed/tagged package, site, changelog, limitations, rollback, and artifact evidence.
6. Repeat A1 through A7 from a clean second environment against the actual published packages and live site.
7. Mark A8 complete only after all public evidence passes.

## Canonical handoff reading order

1. [00-README.md](00-README.md) — audit scope, limits, source hierarchy, and resume procedure.
2. [06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md](06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md) — active truth and superseded decisions.
3. [07-RISKS-GAPS-AND-NEXT-WORK.md](07-RISKS-GAPS-AND-NEXT-WORK.md) — prioritized closure plan.
4. [08-PATH-MIGRATION-AND-CODE-CUSTODY.md](08-PATH-MIGRATION-AND-CODE-CUSTODY.md) — rename and continuity evidence.
5. [04-DOCUMENTATION-INVENTORY.md](04-DOCUMENTATION-INVENTORY.md) and [05-CODEBASE-INVENTORY.md](05-CODEBASE-INVENTORY.md) — exhaustive surface inventories.
6. [09-REPOSITORY-FILE-MANIFEST.md](09-REPOSITORY-FILE-MANIFEST.md) — exact file-level snapshot.
7. [03-WORKING-LOG.md](03-WORKING-LOG.md) and [02-CHAT-TRANSCRIPT.md](02-CHAT-TRANSCRIPT.md) — chronological work and public intent.

## Bottom line

The valuable project context and implementation survived the rename. Agents SDK has a coherent product boundary, working source-owned registry/CLI loop, accepted local UI/components/pattern/template, substantive tests, a docs-first site, and preserved provenance. The project is ready for disciplined cleanup and release preparation, not yet for an unqualified public-release claim. Reconcile the duplicate collision files first; then complete the human-gated namespace, domain, remote, publication, rollback, and second-environment proof required by A8.
