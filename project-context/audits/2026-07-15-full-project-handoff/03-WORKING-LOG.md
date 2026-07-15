# Working log: Agenty creation, Agents SDK reset, path migration, and handoff audit

**Log date:** 2026-07-15
**Canonical physical repository:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Git branch/HEAD at audit capture:** `main` / `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`

## Evidence and labeling contract

This is an evidence-backed chronology, not a replay of hidden reasoning. It was assembled from:

- public user and assistant messages in Codex threads `019f63b9-0080-79e0-a672-aea6ee390025` and `019f66ea-5794-7802-838d-1b31bf3f4fbe`;
- the corresponding local Codex rollout JSONL records;
- Git history, worktree metadata, filesystem state, and command records;
- canonical `project-context` files and the numbered historical collision copies;
- the other files in this dated audit package.

Labels used below:

- **Observed:** directly supported by a command, file, commit, or public message.
- **Reported:** stated in a public assistant update/final but not rerun during this writing lane.
- **Inferred:** a conservative conclusion drawn from two or more observed facts.
- **Historical:** true for an earlier project generation but superseded as current product direction.

Raw tool payloads, secrets, encrypted inter-agent content, and hidden chain-of-thought are deliberately excluded. Commands are summarized only to the detail needed for reproducibility.

## Current outcome

As of this audit capture:

- **Observed:** the product is Agents SDK, a docs/registry-first component system with developer-owned source.
- **Observed:** canonical context says local gates A1–A7 pass; A8 public release remains pending.
- **Observed:** the current task ledger contains 13 tasks: 9 done and 4 open.
- **Observed:** the real directory is lowercase `agents-sdk`; macOS resolves `agents-SDK` to the same inode.
- **Observed:** `agenty` is a compatibility symlink to `agents-sdk`, preserving the original Codex task binding.
- **Observed:** the main and linked `codex/adil-contracts` worktrees resolve successfully after pointer repair.
- **Observed:** Git tracks 171 repository files at `HEAD`; the dated audit and historical collision copies are presently untracked work.
- **Observed:** no public package/site release has occurred.

## Chronology

### 1. Founding request and evidence recovery — 2026-07-15 03:01–03:09 UTC

1. **Observed:** the user asked for the empty `agenty` directory to become the durable home for a reusable agent-building framework, UI/templates/skills/schemas/tools/harnesses/stacks, cross-project learning, You.md integration, and an eight-stage verifiable plan.
2. **Reported:** the main agent routed the request through the brain-dump workflow, separating agent-owned implementation from human decisions such as a domain purchase and public launch.
3. **Reported:** the AI SDK Agents and agentic-app-shell references established a skills-on-disk, typed-manifest, installable-source, observable shell direction.
4. **Observed:** three read-only subagent lanes were spawned:

   - `mgmt_audit` — recover relevant Codex Management standards and provenance;
   - `brain_inventory` — establish You.md/shared-stack ownership and sync boundaries;
   - `reuse_audit` — identify reusable shell/UI primitives and exact source references.

5. **Reported:** the repository was genuinely empty, so the first generation was a greenfield foundation rather than a migration.
6. **Reported:** official framework/runtime documentation was checked before selecting pnpm workspaces, strict TypeScript, package/release tooling, and the Next.js reference application.

### 2. First-generation Agenty implementation — 2026-07-15 03:09–05:35 UTC

1. **Observed:** implementation was split into independent lanes:

   - `foundation_docs` — root governance and `project-context`;
   - `core_cli` — contracts, schema, CLI, and conformance harness;
   - the reused UI lane — `@agenty/ui` and the reference Studio shell.

2. **Historical / Reported:** the first architecture positioned Agenty as a productization/conformance layer with:

   - `@agenty/core`, `@agenty/cli`, `@agenty/harness`, and `@agenty/ui`;
   - an AgentProject schema and semantic validation;
   - CLI commands `init`, `validate`, `doctor`, and `catalog`;
   - a Next.js Studio with a collapsible sidebar, chat-first session, progress/tool state, artifact pane, connectors/files/knowledge/loops/settings, and mobile behavior;
   - an eight-stage roadmap covering contracts, runtime, scaffold, UI, conformance, docs, and release proof.

3. **Observed:** initial integrated verification commands included `pnpm validate`, `pnpm build`, formatting checks, and `git diff --check`.
4. **Reported:** the first integrated run caught exact-optional prop errors in `Sidebar` and a Next workspace-root configuration issue; both were corrected.
5. **Reported:** the integrated workspace then passed typecheck, formatting, a production build, and 13 tests at that milestone.
6. **Observed:** the development server was started with `pnpm --filter @agenty/studio dev --hostname 127.0.0.1 --port 3017` and intentionally kept alive for browser testing.
7. **Reported:** visible browser QA caught a React Strict Mode timer-cleanup defect that package tests had missed. After correction, desktop and 390×844 mobile flows passed with zero console warnings/errors.

### 3. Initial You.md integration and upstream fixes — 2026-07-15 05:39–06:05 UTC

1. **Reported:** Agenty became discoverable in the local project-brain scan and was registered in the shared stack map without committing `.you-project` or secrets.
2. **Observed:** `youmd brain sync --root ... --project agenty` was run repeatedly while the failure boundary was narrowed.
3. **Reported:** the first blocker was a local safety false positive on opaque artifact references. The upstream You.md fix is recorded as commit `b1ad5934`.
4. **Reported:** after the local safety gate cleared, the hosted snapshot was accepted but task projection crashed because heuristic `project-context/tasks.json` evidence was treated as an authoritative managed ledger.
5. **Observed:** focused and full You.md verification was run, including `pnpm exec vitest run convex/projectBrain.test.ts` and `pnpm test:convex`.
6. **Reported:** the focused regression suite passed 8/8 and the full Convex suite passed 670 tests across 75 files.
7. **Observed:** the second upstream fix was committed as `36c8eab8` with message `fix(brain): keep heuristic task evidence read-only`.
8. **Reported:** the final Agenty sync accepted one immutable snapshot and six bounded context artifacts, with `secretValuesExposed=false`; readiness was `ready=true` / `status=degraded` only because safe metadata-only/non-content artifacts were not content-sync eligible.

This successful earlier sync and the later Agents SDK credential failure are both preserved. They occurred at different times and under different authorization state; neither should be rewritten to make the other disappear.

### 4. First-generation verification and commits — 2026-07-15 05:47–06:06 UTC

1. **Observed:** the repository gate included `pnpm validate`, `git diff --check`, JSON parsing, a tracked-secret-file check, and a bounded secret-pattern scan.
2. **Reported:** the final first-generation result passed production build, TypeScript, lint, formatting, and 25/25 tests; desktop/mobile browser QA also passed.
3. **Observed:** three initial repository commits were created atomically:

   | Commit                                     | Local time             | Change                                                 |
   | ------------------------------------------ | ---------------------- | ------------------------------------------------------ |
   | `60861a07f05b138caa2183295d36d0d9b35a7ced` | 2026-07-14 22:50:25 PT | `docs: establish Agenty project foundation`            |
   | `b494eb89508f0f58cbf42e6e21e655c5728c2ebc` | 2026-07-14 22:50:35 PT | `feat(core): add manifest CLI and conformance harness` |
   | `7dfeaea45e2c7b1a814d7f1150ab23f9f7463969` | 2026-07-14 22:50:43 PT | `feat(studio): ship reusable agentic reference shell`  |

4. **Observed:** the verified You.md state was committed separately:

   | Commit                                     | Local time             | Change                                     |
   | ------------------------------------------ | ---------------------- | ------------------------------------------ |
   | `4d8e679507bd66ff4c8c2a9611a02879d645f450` | 2026-07-14 23:05:03 PT | `docs: record verified You.md integration` |

5. **Reported:** the Studio remained available at `http://127.0.0.1:3017` after the initial completion response.

### 5. Product reset request — 2026-07-15 06:35–06:42 UTC

1. **Observed:** the user explicitly rejected the agency-first/universal-framework interpretation and reset the product to **Agents SDK** at **agents-sdk.com**.
2. **Observed:** the new metaphor was “shadcn/ui for complete agentic applications”: developers discover, install, copy, customize, and own production-quality source.
3. **Observed:** the durable public information architecture became Components, Agents & Skills, Tools & MCP, Patterns, Templates, Examples, CLI, and Docs.
4. **Observed:** broad future categories were retained as roadmap subjects, not claims of shipped inventory.
5. **Reported:** AI SDK Agents references and the design-consultation workflow were used to reset both technical product boundaries and visual direction.
6. **Reported:** the selected design direction was industrial-editorial developer documentation: restrained chrome, IBM Plex Sans, JetBrains Mono, off-white/near-black/blue, thin dividers, no generic AI marketing, and no nested card clutter.
7. **Observed:** three reset subagents were spawned:

   - `product_reset_audit` — identity, scope, context, and governance;
   - `package_cli_audit` — registry item contract and copy-owned CLI workflow;
   - `site_ui_audit` — homepage, docs shell, navigation, responsive behavior, and public-site QA.

### 6. Agents SDK implementation — 2026-07-15 06:42–07:39 UTC

1. **Observed:** package identities migrated to `@agents-sdk/*`; the intended executable became `agents`.
2. **Observed:** the canonical product context superseded Agenty decisions D-001–D-005 with Agents SDK decisions D-006–D-012 while preserving the original prompt in `project-context/prompts.md`.
3. **Observed:** the v0.1 release scope was narrowed to:

   - components: `agent-chat`, `human-approval`, `artifact-workspace`;
   - pattern: `approval-gates`;
   - template: `support-agent`;
   - focused examples;
   - CLI: `init`, `add`, `list`, `diff`, `doctor`;
   - complete docs and release evidence.

4. **Observed:** an additional repository commit landed during the reset window:

   | Commit                                     | Local time             | Change                                          |
   | ------------------------------------------ | ---------------------- | ----------------------------------------------- |
   | `0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1` | 2026-07-14 23:51:53 PT | `feat(intelligence): add ADIL contract package` |

5. **Reported:** the site was rebuilt as a docs/catalog application with 23 generated routes rather than an authenticated chat dashboard as the primary product surface.
6. **Reported:** acceptance work caught and closed several credibility gaps:

   - navigation taxonomy had to exactly match the eight product areas;
   - docs initially described CLI behaviors not yet implemented;
   - displayed component APIs initially diverged from installed source APIs;
   - the long-lived dev server served stale CSS after package rename and was restarted on port 3017;
   - copy distinguished “implemented locally” from “published publicly”;
   - the CLI had to install/merge declared dependencies, not merely copy files.

7. **Reported:** the compiled clean-room proof succeeded from an empty directory: initialize, add the full support agent and dependencies, install, run 11 tests, typecheck, build, run `diff`, and run `doctor`.
8. **Observed:** verification included `pnpm install && pnpm validate`, `git diff --check`, JSON parsing, tracked-secret checks, package dry-runs, the API documentation guard, and visible desktop/mobile browser QA.
9. **Reported:** the final Agents SDK gate passed production build, typecheck, lint, formatting, and 52 repository tests across 23 generated routes.

### 7. Agents SDK You.md reconciliation — 2026-07-15 07:39–07:54 UTC

1. **Reported:** the old repository-specific task schema was rejected by You.md’s strict portable task contract.
2. **Observed:** the ledger was converted to `you-md/tasks/v1` with 13 tasks and generated `tasks.md`.
3. **Observed:** local `youmd tasks validate` and `youmd stack doctor` passed after the conversion.
4. **Reported:** the Brain scan correctly displayed Agents SDK but retained the stable physical identity `project:agenty`, derived from the original filesystem/project identity.
5. **Reported:** remote Brain/task projection was not performed because the current credential lacked `write:brain`; the failure was treated as an authorization boundary, not bypassed.

### 8. Agents SDK commits and local acceptance — 2026-07-15 07:55–07:56 UTC

The reset was split into three bisectable commits:

| Commit                                     | Local time             | Change                                                    |
| ------------------------------------------ | ---------------------- | --------------------------------------------------------- |
| `e94320d8b391f23ae40a689496920df5419b1d8f` | 2026-07-15 00:55:41 PT | `feat(core): establish Agents SDK registry and CLI`       |
| `4781db7b4fa29fa80fb48b32b2e368afe6c682fa` | 2026-07-15 00:55:47 PT | `feat(site): rebuild the Agents SDK developer experience` |
| `9c7f1f918ad1679a1d2e85db57582b5d363ad21d` | 2026-07-15 00:55:56 PT | `docs: formalize Agents SDK product and release evidence` |

**Reported accepted evidence:** production build/typecheck, lint/format, 52 repository tests, 11 clean-room template tests, package dry-runs, desktop/mobile browser QA, approval interaction QA, and a clean worktree at that moment.

**Observed canonical status after reset:** A1–A7 complete locally; A8 pending because packages were not public, agents-sdk.com was not serving the release, external namespace/domain/GitHub ownership was not proven, and tagged rollback/second-environment proof did not exist.

### 9. Directory rename and Codex compatibility repair — 2026-07-15 17:54–17:57 UTC

1. **Observed:** the user authorized renaming `/Users/houstongolden/Desktop/CODE_2025/agenty` to Agents SDK without losing the live Codex task context.
2. **Observed:** the `rename_path_audit` subagent was spawned for a read-only path-risk review.
3. **Observed preflight:** the destination was free; Git status/history and `project-context` were inspected. Existing untracked files ending in ` 2` were intentionally preserved.
4. **Observed mutation:** from the parent directory, the repository was moved with:

   ```bash
   mv -- agenty agents-SDK
   ```

5. **Observed:** Git resolved the moved top level and all repository context remained present.
6. **Observed:** searches found no repository file hard-coding the old absolute `.../CODE_2025/agenty` path.
7. **Observed:** the linked Codex worktree `.codex-worktrees/adil-agenty` retained an absolute Git pointer to the prior main-worktree location.
8. **Observed:** `git worktree repair` was rerun with the absolute linked-worktree path; the linked worktree became healthy.
9. **Observed:** a compatibility symlink was created so the already-open Codex task could continue resolving its original working directory.
10. **Reported:** Codex’s saved project identity continued to reflect the original `agenty` registration. The rename preserved conversation context; a newly opened project would be needed for the sidebar label/path to change independently.

### 10. Lowercase path hardening — 2026-07-15 21:25 UTC

1. **Observed:** later filesystem inspection showed the real directory entry as lowercase `agents-sdk`; `agents-SDK` and `agents-sdk` resolve to the same inode on this macOS volume.
2. **Observed:** the compatibility link was normalized with `ln -sfn -- agents-sdk agenty`.
3. **Observed:** the linked worktree’s `.git` file still contained the mixed-case absolute path after `git worktree repair`, so that one-line pointer was patched from `.../agents-SDK/.git/worktrees/adil-agenty` to `.../agents-sdk/.git/worktrees/adil-agenty`.
4. **Observed:** `git -C .../.codex-worktrees/adil-agenty status --short --branch` succeeded after the pointer change.

Current path contract:

| Path                                                                  | Role                                                                                         |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`                   | canonical physical repository                                                                |
| `/Users/houstongolden/Desktop/CODE_2025/agents-SDK`                   | case-insensitive alias to the same inode; do not use as canonical documentation              |
| `/Users/houstongolden/Desktop/CODE_2025/agenty`                       | compatibility symlink to `agents-sdk` for the already-open Codex task and historical tooling |
| `/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty` | linked worktree on `codex/adil-contracts`                                                    |

### 11. Full-project handoff audit — 2026-07-15 21:21 UTC onward

1. **Observed:** the user requested a comprehensive audit, documentation directory, complete public chat/work log, code and documentation inventories, and custody transfer into the new physical project directory.
2. **Observed:** the main agent invoked the `long-thread-audit` and `context-save` skills.
3. **Reported:** `context-save` reached a required interactive routing prompt, but the needed `AskUserQuestion` surface was unavailable in Default mode. The agent continued with a bounded handoff archive instead of fabricating an answer or changing product code.
4. **Observed:** the main task attempted Codex `read_thread` pagination for both historical threads. Some reads stalled; the transcript lane used the exact local rollout JSONL as a documented fallback.
5. **Observed:** the audit plan covers history recovery, code/docs/context inventory, archive writing, canonical status reconciliation, validation/link/checksum verification, and one atomic documentation commit.
6. **Observed:** three parallel audit workers were spawned:

   - `repo_doc_inventory` — documentation inventory and cross-link coverage;
   - `code_arch_inventory` — code, package, test, route, and architecture inventory;
   - `context_truth_audit` — canonical-versus-numbered context truth audit, then transcript and working-log writing.

7. **Observed truth audit:** all 12 `project-context/* 2.*` pairs are non-identical historical Agenty snapshots, not redundant byte copies.
8. **Observed truth audit counts:** canonical top-level context set: 14 files, 48,310 bytes, 789 lines; aggregate SHA-256 `ad95d6092b9a1ddb3de794be91c3fe624222725f759b60bd6a512d1b58ca38b4`.
9. **Observed truth audit counts:** numbered context set: 12 files, 28,519 bytes, 498 lines; aggregate SHA-256 `fe18004ae3672e38b29c4eb3317229350aec9b7187b4816bdd5b253c5ea8a93c`.
10. **Observed:** the numbered context uniquely preserves D-001–D-005, the `@agenty`/`agenty.so` plan, universal-runtime milestones, earlier You.md sync evidence, and the Studio `:3017` state. It must be archived as superseded history, not merged into current tasks/status.
11. **Observed:** Git currently shows 29 untracked collision-copy files plus the audit directory as an additional untracked entry. No collision copy was deleted or silently staged by this writing lane.

### 12. Audit task-ledger write guard — 2026-07-15 21:30–21:33 UTC

1. **Observed:** the main task tried to track the handoff through the canonical CLI using `youmd tasks add ... --no-sync --json`.
2. **Observed failure:** `TASKS_WRITE_NOT_GRANTED: a valid .you-project descriptor is required`.
3. **Observed:** no task file changed; the existing 13-task ledger was preserved.
4. **Interpretation:** this is path/You.md write-authority evidence. It is not permission to bypass the guard, hand-edit generated `tasks.md`, or manufacture a `.you-project` descriptor.

### 13. Final audit formatting and collision-aware validation

1. **Observed:** the first targeted Prettier audit found eight handoff-audit Markdown files; all eight were formatted before the final repository gate.
2. **Observed failure:** an unquarantined `pnpm validate` read the raw dirty worktree and failed because the untracked historical collision file `packages/cli/src/index 2.ts` imports the superseded `@agenty/core` package.
3. **Interpretation:** this failure comes from preserved, untracked Agenty-era custody evidence. It does not identify a failure in the canonical tracked Agents SDK source, but it means the raw dirty-tree validation command is not green while those collision files remain in executable source locations.
4. **Observed controlled proof:** a trap-protected command temporarily moved exactly 29 files matching `* 2.*` to a temporary directory, ran the full `pnpm validate`, and restored every collision file even if the command exited early.
5. **Observed canonical result:** with collision copies quarantined, the full gate passed production build, typecheck, lint, formatting, 52 tests (`core` 10, `ui` 5, `cli` 22, `harness` 1, `site` 14), and a 23-page production site build.
6. **Observed restoration:** the post-run check confirmed all 29 collision files were restored byte-for-byte, `agenty -> agents-sdk` still resolved, and the linked `codex/adil-contracts` worktree remained healthy.

The evidence boundary is therefore explicit: **canonical Agents SDK code passes the complete validation gate; the unresolved historical collision files make an unquarantined validation of the raw dirty tree fail until they are moved into a non-executable archive location or otherwise resolved through an approved custody decision.**

## Subagent ledger

| Thread phase         | Agent                       | Assignment/outcome                                                                             |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| Initial discovery    | `mgmt_audit`                | Recovered Codex Management standards/provenance; warned not to fabricate unavailable task IDs. |
| Initial discovery    | `brain_inventory`           | Defined Agenty/You.md/shared-stack ownership and sync commands.                                |
| Initial discovery/UI | `reuse_audit`               | Selected the minimal shell/chat/artifact vertical slice and reusable source references.        |
| Initial build        | `foundation_docs`           | Root governance, project context, acceptance, tasks, and provenance.                           |
| Initial build        | `core_cli`                  | Schema, validation, CLI, harness, registry, and starter contract.                              |
| You.md closure       | `fix_brain_sync_input`      | Cleared the opaque-artifact safety false positive; associated with upstream fix `b1ad5934`.    |
| You.md closure       | `fix_youmd_task_projection` | Corrected heuristic task evidence projection; commit `36c8eab8`.                               |
| You.md closure       | `record_youmd_sync`         | Reconciled project context with successful sync evidence.                                      |
| Product reset        | `product_reset_audit`       | Rewrote identity/scope/context around Agents SDK.                                              |
| Product reset        | `package_cli_audit`         | Built registry contracts and copy-owned CLI/install workflow.                                  |
| Product reset        | `site_ui_audit`             | Rebuilt and browser-tested docs/catalog site.                                                  |
| Rename               | `rename_path_audit`         | Audited path/worktree/Codex risks; no product-file edits.                                      |
| Current audit        | `repo_doc_inventory`        | Produced documentation inventory/index content.                                                |
| Current audit        | `code_arch_inventory`       | Produced codebase/architecture/test inventory.                                                 |
| Current audit        | `context_truth_audit`       | Proved numbered context is unique history; produced the public transcript and this log.        |

Agent prompts and some inter-agent payloads are encrypted in the local rollout records; this ledger uses observable task names, public status messages, delivered files, and repository evidence rather than attempting to decrypt or reproduce private payloads.

## Verification ledger

| Milestone                    | Commands/evidence                                                                       | Result                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| First integration            | `pnpm validate`, `pnpm build`, `git diff --check`                                       | Reported green after optional-prop/Next fixes; 13 tests at that intermediate point.                    |
| First release-candidate pass | build, typecheck, lint, formatting, tests                                               | Reported 25/25 repository tests green.                                                                 |
| First browser pass           | governed visible desktop/mobile QA at `:3017`                                           | Reported zero console warnings/errors after Strict Mode timer fix.                                     |
| You.md upstream fix          | focused Vitest + `pnpm test:convex`                                                     | Reported 8/8 focused and 670 full Convex tests.                                                        |
| Agents SDK integrated pass   | `pnpm install && pnpm validate`                                                         | Reported build/typecheck/lint/format and 52 repository tests green.                                    |
| Clean-room support agent     | compiled CLI init/add/diff/doctor, install, test, typecheck, build                      | Reported 11 template tests and full production build green.                                            |
| Static safety                | JSON parse, tracked-secret check, bounded secret scan, API docs guard, package dry-runs | Reported green.                                                                                        |
| Agents SDK browser pass      | desktop/mobile/overflow/console/menu/CTA/approval flows                                 | Reported green across 23 generated routes.                                                             |
| Path migration               | Git top-level, `git worktree list`, linked-worktree status, symlink readback            | Observed healthy after lowercase pointer repair.                                                       |
| Context truth audit          | SHA-256/count comparison                                                                | Observed 12/12 numbered pairs differ and contain unique history.                                       |
| Collision-aware final gate   | trap-protected quarantine of 29 `* 2.*` files, `pnpm validate`, byte restoration check  | Canonical build/typecheck/lint/format, 52 tests, and 23-page build pass; all collision files restored. |

The documentation package has now passed targeted formatting and the collision-aware full repository gate. Link/checksum verification, final staging discipline, and the atomic documentation commit remain separate closeout actions unless recorded elsewhere in the completed audit evidence.

## Known blockers and non-claims

- A8 remains open: `@agents-sdk/*` is not published and agents-sdk.com is not serving the accepted build.
- npm scope, GitHub organization, domain ownership/access, public launch approval, tagged rollback, and second-environment evidence remain unproven.
- Current remote You.md projection requires authorization with `write:brain`; no upload should be claimed.
- The stable You.md physical project reference may remain `project:agenty` until a governed migration is supported; the display/product identity is Agents SDK.
- Memory, auth/team, queues/background jobs, broad observability/deployment integrations, and broad MCP/provider catalogs are roadmap areas, not v0.1 inventory.
- The `* 2.*` files are custody evidence. Do not delete, merge, or stage them automatically until the audit’s archive policy and user intent are explicit.
- Canonical tracked code is green, but an unquarantined `pnpm validate` of the current dirty tree fails because `packages/cli/src/index 2.ts` is executable-path legacy source importing `@agenty/core`. Preserve both facts; do not report the raw dirty tree as green.
- The assistant reported a clean worktree at reset completion, while the later rename preflight observed untracked collision copies. Treat those as time-scoped observations; do not retroactively rewrite either statement.

## Resume checklist

1. Read `00-README.md`, `01-EXECUTIVE-SUMMARY.md`, this log, and `06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md`.
2. Use lowercase `/Users/houstongolden/Desktop/CODE_2025/agents-sdk` as the canonical path; retain the `agenty` compatibility symlink while this Codex task depends on it.
3. Keep canonical Agents SDK context separate from numbered Agenty history.
4. Verify every audit file/link/checksum and rerun `pnpm validate` plus `git diff --check`.
5. Stage only the intended audit/context reconciliation; inspect every `* 2.*` file separately before any archival commit.
6. Commit one bisectable documentation/handoff unit only after the full gate is green.
