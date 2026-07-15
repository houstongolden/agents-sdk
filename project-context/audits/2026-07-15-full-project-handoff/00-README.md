# Agents SDK full-project handoff audit

**Audit date:** 2026-07-15
**Canonical repository path:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Physical directory:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Compatibility path:** `/Users/houstongolden/Desktop/CODE_2025/agenty` → `agents-sdk`
**Snapshot:** `main` at `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`, plus explicitly inventoried untracked handoff and `* 2.*` files

## Purpose and authority

This directory is the authoritative **index and evidence-oriented handoff** for the Agenty-to-Agents-SDK work completed through 2026-07-15. It is designed to let a future human or agent recover the product direction, public conversation, implementation history, repository contents, verification state, directory migration, unresolved risks, and exact next work without relying on the old directory name or transient agent memory.

The audit does not replace the repository's canonical product sources. It indexes and explains them. If an audit statement conflicts with tracked code, tests, schemas, registry manifests, or a newer canonical project-context record, re-run the evidence and update the audit.

## Scope

The handoff covers:

- the original Agenty product foundation and its retained provenance;
- the explicit reset to Agents SDK and agents-sdk.com;
- all seven commits on `main` through `9c7f1f9`;
- the docs-and-registry-first architecture, packages, CLI, UI primitives, patterns, examples, schemas, and Support Agent template;
- local v0.1 acceptance gates A1 through A7 and their recorded verification evidence;
- the still-pending public-release gate A8;
- the filesystem rename from `agenty`, through an interim mixed-case name, to the canonical lowercase physical directory `agents-sdk`;
- the compatibility symlink retained for the already-open Codex task;
- canonical, generated, ignored, and untracked documentation/code surfaces;
- all 29 observed untracked `* 2.*` collision copies and the risk they create;
- current external/human blockers, gaps, and next work;
- a reproducible repository file manifest and resume procedure.

Dependency contents under `node_modules/`, generated Next.js output under `.next/`, compiled package output under `dist/`, short-lived logs, and other disposable caches are not treated as durable project content.

## Covered Codex tasks, agents, and public turns

### Visible task and agent identifiers

| Identifier                             | Role in this handoff                                                    | Coverage boundary                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `019f66ea-5794-7802-838d-1b31bf3f4fbe` | Primary Codex desktop task/workspace identifier visible to this audit   | Public user/assistant conversation and repository evidence available to the active task |
| `019f66ea-9aa3-7620-b9a2-c0db561bb230` | Visible child-agent identifier associated with the rename/audit session | Returned work product and observable repository effects only                            |
| `/root/repo_doc_inventory`             | Documentation-inventory audit lane                                      | Documentation enumeration and files `00`, `01`, and `04` only                           |
| `/root/code_arch_inventory`            | Code/architecture inventory lane                                        | File `05` and its evidence only                                                         |
| `/root/context_truth_audit`            | Context/source-of-truth audit lane                                      | Assigned context and truth-audit artifacts only                                         |

Only identifiers exposed to the active task are recorded. The audit does not invent IDs for agents or earlier tasks whose stable identifiers were not visible.

### Covered public turn sequence

| Date       | Public turn or durable equivalent                                                                                                          | Primary evidence                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| 2026-07-14 | “Found Agenty as the agency for agents” foundation brief                                                                                   | `project-context/prompts.md`; commit `60861a0` and subsequent Agenty commits                     |
| 2026-07-14 | Explicit product reset to Agents SDK                                                                                                       | `project-context/prompts.md`; decisions D-006 through D-012; commits `e94320d` through `9c7f1f9` |
| 2026-07-15 | Request to rename the directory without losing Codex project/session context                                                               | Public task transcript; filesystem and Git-path evidence                                         |
| 2026-07-15 | Rename completion report retaining `agenty` as a compatibility symlink                                                                     | Public task transcript; `pwd -P`, symlink, and worktree evidence                                 |
| 2026-07-15 | Request for a comprehensive transcript, work log, audit, code/context directory, and duplication into the new Agents SDK project directory | Public task transcript and this handoff directory                                                |

The public transcript artifact records the conversation available to the task. Earlier build work is reconstructed from the preserved public prompts, Git history, project-context ledgers, tests, and generated evidence where a byte-for-byte desktop transcript was not available.

## Audit file map

Read these files as one numbered handoff:

| File                                                                                     | Purpose                                                                                  | Status at index creation    |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------- |
| [00-README.md](00-README.md)                                                             | Authoritative index, scope, coverage, source hierarchy, limits, and restore instructions | Present                     |
| [01-EXECUTIVE-SUMMARY.md](01-EXECUTIVE-SUMMARY.md)                                       | Product/work synthesis, verified state, blockers, and immediate actions                  | Present                     |
| [02-CHAT-TRANSCRIPT.md](02-CHAT-TRANSCRIPT.md)                                           | Public user/assistant transcript and durable prompt excerpts                             | Present                     |
| [03-WORKING-LOG.md](03-WORKING-LOG.md)                                                   | Chronological implementation, verification, rename, and audit log                        | Expected companion artifact |
| [04-DOCUMENTATION-INVENTORY.md](04-DOCUMENTATION-INVENTORY.md)                           | Complete canonical/generated/legacy documentation and context directory                  | Present                     |
| [05-CODEBASE-INVENTORY.md](05-CODEBASE-INVENTORY.md)                                     | Architecture, packages, routes, registry, schemas, tests, Git, and code inventory        | Present                     |
| [06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md](06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md) | Active/superseded decisions, current status, owners, and truth hierarchy                 | Present                     |
| [07-RISKS-GAPS-AND-NEXT-WORK.md](07-RISKS-GAPS-AND-NEXT-WORK.md)                         | Prioritized risks, unresolved gaps, blockers, and execution plan                         | Present                     |
| [08-PATH-MIGRATION-AND-CODE-CUSTODY.md](08-PATH-MIGRATION-AND-CODE-CUSTODY.md)           | Rename mechanics, compatibility link, worktree continuity, and custody rules             | Present                     |
| [09-REPOSITORY-FILE-MANIFEST.md](09-REPOSITORY-FILE-MANIFEST.md)                         | Exact repository file manifest and classification                                        | Expected companion artifact |

“Expected” means another audit lane may still be creating the file. A missing companion is an incomplete handoff condition, not evidence that the underlying project work is absent.

## Source-of-truth hierarchy

When sources disagree, use this order and the narrowest owner for the claim:

1. **Executable and contract truth:** tracked source code, tests, package manifests, JSON Schemas, registry manifests, and CI/build configuration at the stated commit.
2. **Acceptance evidence:** commands, exit codes, clean-room artifacts, browser evidence, and commit SHA recorded in `project-context/CURRENT_STATE.md`, `project-context/ACCEPTANCE.md`, `CHANGELOG.md`, and the eventual release report.
3. **Active product decisions:** `AGENTS.md`, `project-context/DECISIONS.md`, `project-context/ARCHITECTURE.md`, and `project-context/VISION.md`.
4. **Current planning/status:** `project-context/tasks.json` is the machine-readable task source; `project-context/tasks.md` is generated from it. `project-context/plan.md`, `project-context/CURRENT_STATE.md`, and `project-context/ROADMAP.md` provide scoped human context.
5. **Public product explanation:** `README.md`, `DESIGN.md`, `CONTRIBUTING.md`, registry source docs, template docs, package docs, and the three TSX docs routes.
6. **Historical provenance:** `project-context/prompts.md`, `project-context/provenance.md`, Git history, and explicitly archived migration evidence.
7. **This audit:** a dated synthesis of the sources above. It is authoritative as a handoff index, but it must be regenerated or amended after material repository changes.

Files containing ` 2` before their extension are not canonical. Generated files under `packages/cli/registry/` are not authoring sources. The active product is Agents SDK; Agenty is historical provenance and a compatibility pathname only.

## Privacy, safety, and completeness limits

This handoff includes the maximum durable, reproducible project evidence available to the active Codex task. It intentionally includes only:

- public user and assistant messages available in the task;
- user-approved or repository-preserved prompt excerpts;
- observable commands and summarized outputs needed to reproduce claims;
- tracked code, documentation, schemas, manifests, tests, and Git metadata;
- non-secret filesystem and path-migration facts;
- returned sub-agent work products and their observable edits.

It intentionally does **not** include or attempt to reconstruct:

- hidden chain-of-thought, private model reasoning, system/developer prompt internals, or inaccessible agent scratch state;
- passwords, API keys, access tokens, cookies, `.env.local` values, credential-store contents, or other secrets;
- private client material, paid assets, identity/private memory, or unrelated machine data;
- transient caches, full dependency trees, `.next` output, `dist` output, disposable temporary files, or raw terminal noise with no evidentiary value;
- deleted or unavailable conversation content that was not preserved in public transcript, Git, or project context.

“Full” and “complete” in this audit mean complete with respect to public transcript and reproducible project evidence, not prohibited private reasoning or unavailable data. Secret values must never be added later to make the handoff appear more complete.

## Restore and resume instructions

### 1. Enter and verify the canonical repository

```bash
cd /Users/houstongolden/Desktop/CODE_2025/agents-sdk
pwd
pwd -P
git rev-parse --show-toplevel
git branch --show-current
git log -1 --oneline
git status --short
```

Expected physical resolution is the lowercase `agents-sdk` directory. The compatibility path can be inspected without following it:

```bash
ls -ld /Users/houstongolden/Desktop/CODE_2025/agenty
readlink /Users/houstongolden/Desktop/CODE_2025/agenty
```

Do not create a second checkout at `agenty`; it is intentionally a compatibility symlink into the same repository.

### 2. Read the handoff in decision order

1. Read this index and [01-EXECUTIVE-SUMMARY.md](01-EXECUTIVE-SUMMARY.md).
2. Read [06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md](06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md) and [07-RISKS-GAPS-AND-NEXT-WORK.md](07-RISKS-GAPS-AND-NEXT-WORK.md).
3. Confirm rename/custody facts in [08-PATH-MIGRATION-AND-CODE-CUSTODY.md](08-PATH-MIGRATION-AND-CODE-CUSTODY.md).
4. Use [04-DOCUMENTATION-INVENTORY.md](04-DOCUMENTATION-INVENTORY.md), [05-CODEBASE-INVENTORY.md](05-CODEBASE-INVENTORY.md), and [09-REPOSITORY-FILE-MANIFEST.md](09-REPOSITORY-FILE-MANIFEST.md) for exact surfaces.
5. Use [03-WORKING-LOG.md](03-WORKING-LOG.md) and [02-CHAT-TRANSCRIPT.md](02-CHAT-TRANSCRIPT.md) when provenance or turn-by-turn intent matters.

### 3. Re-establish canonical project truth

Read, at minimum:

```text
AGENTS.md
README.md
project-context/CURRENT_STATE.md
project-context/ACCEPTANCE.md
project-context/DECISIONS.md
project-context/tasks.json
project-context/plan.md
```

Do not load `* 2.*` files as current context and do not bulk-add them. Reconcile them according to the risk plan before asserting a clean release tree.

### 4. Reproduce local verification

After installing dependencies in the normal project workflow, run:

```bash
pnpm validate
git diff --check
node -e "for (const f of ['package.json','youstack.json','project-context/tasks.json','project-context/braindump.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```

For a release decision, also repeat the clean-directory compiled CLI install, Support Agent dependency install/tests/typecheck/build, package dry-runs, governed browser QA, secret scan, and second-environment verification described by `project-context/ACCEPTANCE.md` and the codebase inventory.

### 5. Resume only the next scoped work

The safe next local action is to reconcile the 29 untracked `* 2.*` collision files without losing unique historical content. Public package publication, domain launch, namespace acquisition, production credentials, and external release actions remain human-gated A8 work. Update `tasks.json`, regenerate `tasks.md`, update `CURRENT_STATE.md`, and extend this audit when status materially changes.

## Handoff completion criteria

This audit directory is complete when files `00` through `09` exist, internal links resolve, claims agree with the canonical sources at the snapshot commit, the repository manifest covers tracked and relevant untracked files, no secret values are present, and the duplicate/path migration risks are explicitly actionable.
