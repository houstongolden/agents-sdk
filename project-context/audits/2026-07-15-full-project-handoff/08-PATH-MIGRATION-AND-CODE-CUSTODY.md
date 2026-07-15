# Path migration and code custody

**Migration date:** 2026-07-15
**Canonical project path:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Branch snapshot:** `main` at `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`
**Custody outcome:** One main repository, one shared Git object database, one linked ADIL worktree, and one temporary compatibility symlink

## Executive finding

The project was renamed without copying or recreating the Git repository. The original main working directory moved from `agenty` through the initially requested mixed-case `agents-SDK` spelling to the hardened lowercase physical directory `agents-sdk`. The old `agenty` pathname is now a symbolic link to the same main working tree so the already-open Codex task and stale absolute-path references continue to resolve.

All tracked source, project context, Git history, local branches, refs, Git objects, ignored build products, and untracked files moved with the directory. They were not re-imported into a new repository. The separate ADIL checkout remains a normal linked Git worktree sharing the main repository's object database; it is not merged into `main` and must remain under explicit custody.

## Exact path transition

| Phase                    | Path                                                                  | State                                                                                  |
| ------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Before rename            | `/Users/houstongolden/Desktop/CODE_2025/agenty`                       | Original physical main working directory and path saved by the active Codex task       |
| Initial requested rename | `/Users/houstongolden/Desktop/CODE_2025/agents-SDK`                   | Interim mixed-case physical name used during the rename                                |
| Case-hardened final path | `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`                   | Current physical directory and canonical spelling for all new references               |
| Compatibility path       | `/Users/houstongolden/Desktop/CODE_2025/agenty`                       | Current symlink to `agents-sdk`; not a second checkout                                 |
| Linked ADIL worktree     | `/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty` | Separate working tree for branch `codex/adil-contracts`, sharing the same Git database |

The current parent-directory entry is physically named `agents-sdk`. The compatibility link currently resolves as:

```text
/Users/houstongolden/Desktop/CODE_2025/agenty -> agents-sdk
```

The lowercase spelling is intentional. New documentation, terminal working directories, Codex project registration, scripts, worktree pointers, and external tooling must use:

```text
/Users/houstongolden/Desktop/CODE_2025/agents-sdk
```

## Why the lowercase hardening matters

The current volume is APFS and Git records `core.ignorecase=true`. On the current case-insensitive filesystem, `agents-SDK` and `agents-sdk` can resolve to the same directory even when only one directory entry exists. That convenience is not portable to a case-sensitive APFS volume, Linux machine, container bind mount, CI runner, or archive extraction.

Leaving mixed-case references would create avoidable risks:

- a future machine could treat `agents-SDK` and `agents-sdk` as distinct paths;
- a symlink or linked-worktree pointer could become invalid after migration;
- scripts and documentation could disagree about the repository root;
- tools might register two apparent projects pointing to one repository on one machine and fail on another;
- case-only renames can be missed by tools when `core.ignorecase=true`.

The final physical basename, compatibility-link target, linked-worktree pointer, and audit documentation therefore use lowercase `agents-sdk`. The former `agents-SDK` spelling is retained only as migration history.

## Codex saved-project and active-task behavior

Codex project/task metadata is path-oriented. Renaming a directory does not guarantee that an already-open task, saved sidebar project, terminal working directory, or workspace root will automatically rewrite its stored absolute path. The active task was originally associated with `/Users/houstongolden/Desktop/CODE_2025/agenty`.

The compatibility symlink preserves continuity because path lookups through the saved `agenty` location enter the renamed working tree. This keeps the current task's terminal and repository context usable while the canonical `/agents-sdk` root is opened or registered separately.

Expected behavior and limits:

- Codex can continue the existing task through the `agenty` symlink.
- A newly opened project should use `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`.
- The existing task/sidebar label may continue to display the old project name; filesystem renaming alone does not prove metadata migration.
- Opening the canonical directory does not copy the repository or erase conversation history; it registers another path to the same on-disk project.
- The old symlink should not be removed merely because the current shell works from the new path. Saved tasks, automations, scripts, and terminals must be checked first.

The transcript and project context remain stored by Codex and the repository respectively; they are not embedded in the directory name. The symlink is a path-compatibility measure, not a transcript-export mechanism.

## Git repository custody

### Main worktree

The main worktree contains a normal `.git` **directory**, not a linked-worktree pointer file:

```text
/Users/houstongolden/Desktop/CODE_2025/agents-sdk/.git
```

Current Git resolution from the canonical path is:

```text
git rev-parse --show-toplevel  -> /Users/houstongolden/Desktop/CODE_2025/agents-sdk
git rev-parse --git-dir        -> .git
git rev-parse --git-common-dir -> .git
git rev-parse --is-inside-work-tree -> true
```

Because `.git` moved inside the renamed main directory, the repository object database, refs, reflogs, index, configuration, worktree metadata, and branch history remained together. No `git init`, clone, export/import, history rewrite, or object copy was required.

### Preserved branches and commits

The shared repository currently exposes these branch heads:

```text
refs/heads/main                 9c7f1f918ad1679a1d2e85db57582b5d363ad21d
refs/heads/codex/adil-contracts 0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1
```

The seven-commit `main` history is intact:

```text
9c7f1f9 docs: formalize Agents SDK product and release evidence
4781db7 feat(site): rebuild the Agents SDK developer experience
e94320d feat(core): establish Agents SDK registry and CLI
4d8e679 docs: record verified You.md integration
7dfeaea feat(studio): ship reusable agentic reference shell
b494eb8 feat(core): add manifest CLI and conformance harness
60861a0 docs: establish Agenty project foundation
```

Renaming a working-tree directory does not change commit IDs because Git commits identify content, trees, parents, and metadata rather than the absolute path where a checkout happens to live.

## Linked ADIL worktree repair and pointer normalization

The ADIL work remains checked out separately at:

```text
/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty
```

It owns branch `codex/adil-contracts` at:

```text
0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1 feat(intelligence): add ADIL contract package
```

This checkout has a `.git` **file** pointing into the main repository's worktree metadata. After the main directory moved, linked-worktree metadata had to be repaired so neither side retained the stale `/agenty/.git/...` location. The pointer was then normalized to the lowercase canonical path.

Current ADIL `.git` pointer:

```text
gitdir: /Users/houstongolden/Desktop/CODE_2025/agents-sdk/.git/worktrees/adil-agenty
```

Current reciprocal metadata in the main repository:

```text
.git/worktrees/adil-agenty/commondir
  ../..

.git/worktrees/adil-agenty/gitdir
  /Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty/.git
```

The repair/normalization result is what matters for custody:

- the ADIL checkout points to the renamed lowercase main Git directory;
- the main Git directory points back to the ADIL checkout's `.git` file;
- `commondir` resolves to the one main `.git` object/ref database;
- `git worktree list` recognizes both checkouts and both branch heads;
- the ADIL branch remains separate and unmerged into `main` at the snapshot.

Future repairs should use Git's worktree repair mechanism from the canonical main repository and then verify both pointer directions. Do not hand-edit a pointer without immediately running all verification commands below.

## Current worktree topology

```text
/Users/houstongolden/Desktop/CODE_2025/agents-sdk
  branch: main
  HEAD:   9c7f1f918ad1679a1d2e85db57582b5d363ad21d
  .git:   directory; common repository/object database

/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty
  branch: codex/adil-contracts
  HEAD:   0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1
  .git:   pointer into agents-sdk/.git/worktrees/adil-agenty
```

The ADIL path still contains `agenty` in its basename. That is historical worktree naming, not active product identity. Renaming that linked worktree is optional and must be performed as a separate, Git-aware operation; it is not required to make the main repository canonical.

## What was and was not duplicated

### Not duplicated by the rename

- The tracked repository files were moved with the directory; there is no second tracked checkout behind `agenty`.
- The `.git` object database was moved in place; commit objects and branch refs were not copied.
- `main` history was not rewritten, squashed, or reinitialized.
- The `codex/adil-contracts` branch was not copied into `main` and was not deleted.
- The `agenty` compatibility entry is a symlink, not a directory containing another repository.
- Case-insensitive resolution of the historical `agents-SDK` spelling does not imply a second parent-directory entry; the current physical entry is lowercase `agents-sdk`.
- Ignored `node_modules`, `.next`, `dist`, and other local products remain ordinary contents/artifacts of the moved working tree, not a second canonical source.

### Separate or duplicated surfaces that do exist

- The ADIL linked worktree has a separate physical checkout of files for its branch. This is intentional Git worktree behavior, while Git objects and refs remain shared.
- The main worktree contains 29 untracked collision files named `* 2.*`: 20 documentation/context files and 9 TypeScript/TSX code/test files. They are not part of the tracked repository snapshot and must be compared and reconciled deliberately.
- `packages/cli/registry/` contains ignored, generated copies of canonical registry/template assets produced by `prepare-assets.mjs`. These are expected build/test mirrors, not authoring sources.
- This handoff directory contains newly generated audit documentation. It is derived evidence, not a duplicate repository.

The audit does not establish that the directory rename caused the `* 2.*` files. Their collision-style names and untracked state establish only that they are separate working-tree files outside the canonical tracked inventory.

## Verification commands and observed results

Run from `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`.

### Path and symlink

```bash
pwd
pwd -P
find /Users/houstongolden/Desktop/CODE_2025 -maxdepth 1 -mindepth 1 -type d -print | rg '/agents-sdk$'
ls -ld /Users/houstongolden/Desktop/CODE_2025/agenty
readlink /Users/houstongolden/Desktop/CODE_2025/agenty
```

Observed:

```text
pwd / pwd -P: /Users/houstongolden/Desktop/CODE_2025/agents-sdk
physical parent entry: /Users/houstongolden/Desktop/CODE_2025/agents-sdk
readlink agenty: agents-sdk
```

### Main repository resolution

```bash
git rev-parse --show-toplevel
git rev-parse --git-dir
git rev-parse --git-common-dir
git rev-parse --is-inside-work-tree
git config --get core.ignorecase
```

Observed:

```text
/Users/houstongolden/Desktop/CODE_2025/agents-sdk
.git
.git
true
true
```

### Worktree and pointer integrity

```bash
git worktree list --porcelain
sed -n '1,3p' /Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty/.git
sed -n '1,3p' .git/worktrees/adil-agenty/commondir
sed -n '1,3p' .git/worktrees/adil-agenty/gitdir
git branch -vv
git show-ref --heads
git fsck --no-progress --connectivity-only
```

Observed results:

- `git worktree list` reports the canonical main path and the ADIL linked worktree with the expected branch heads.
- The ADIL pointer uses `/agents-sdk/.git/worktrees/adil-agenty`.
- The reciprocal `gitdir` points to the external ADIL checkout.
- `git branch -vv` assigns `main` to the canonical worktree and `codex/adil-contracts` to the ADIL worktree.
- `git show-ref --heads` exposes both expected branch refs.
- Connectivity verification completed without a missing/corrupt-object error; it reported only the standard dangling empty-tree object `4b825dc642cb6eb9a060e54bf8d69288fbee4904`.

### Repository identity and release topology

```bash
git log --oneline --decorate --all --date-order -10
git remote -v
git tag --list
git status --short
```

Observed at the snapshot:

- all seven `main` commits and the separate ADIL commit are addressable;
- no remote is configured;
- no tag exists;
- the working tree contains the known untracked collision files and the in-progress handoff directory.

## Safe Codex re-registration procedure

1. Keep the current task open and leave `/agenty -> agents-sdk` in place.
2. In Codex, open/register `/Users/houstongolden/Desktop/CODE_2025/agents-sdk` as the project root.
3. In the new project context, verify `pwd -P`, `git rev-parse --show-toplevel`, `git status --short`, branch, and HEAD.
4. Confirm that repository instructions and `project-context/` load from the canonical path.
5. Confirm any active dev server, automation, terminal, or saved command uses or can resolve the new path.
6. Continue or hand off the current conversation using this audit directory; do not assume opening the new path automatically relabels the old task.
7. Search durable project-controlled text for stale absolute path dependencies:

```bash
rg -n --hidden --glob '!node_modules/**' --glob '!apps/studio/.next/**' \
  '/Users/houstongolden/Desktop/CODE_2025/agenty|/Users/houstongolden/Desktop/CODE_2025/agents-SDK' .
```

Historical mentions in this audit and provenance records are expected. Executable configuration and live pointers should use the lowercase canonical path.

## Safe future removal of the compatibility symlink

Remove the symlink only after all of the following are true:

- Codex shows the canonical `agents-sdk` project and a new task can read/write the repository correctly.
- No active task, terminal, automation, editor workspace, dev-server launcher, or durable script requires `/agenty`.
- `git worktree list`, the ADIL `.git` pointer, and the reciprocal `gitdir` all use valid paths independent of the compatibility link.
- A stale-path search finds no live executable/configuration dependency on `/agenty`.
- `pnpm validate`, `git diff --check`, and the required repository checks pass from `/agents-sdk`.
- The 29 collision files have been reconciled so symlink removal is not confused with duplicate cleanup.
- A recoverable checkpoint/commit exists for the completed local work.

Then remove only the symbolic link itself, from its parent directory, after verifying its type and target:

```bash
cd /Users/houstongolden/Desktop/CODE_2025
test -L agenty
test "$(readlink agenty)" = "agents-sdk"
rm agenty
test ! -e agenty
test -d agents-sdk/.git
```

`rm agenty` is safe only because the preconditions prove `agenty` is a symlink. Never append a trailing slash and never use recursive deletion for this cleanup.

After removal:

```bash
cd /Users/houstongolden/Desktop/CODE_2025/agents-sdk
git rev-parse --show-toplevel
git worktree list --porcelain
git fsck --no-progress --connectivity-only
git status --short
```

If any saved Codex task still requires `/agenty`, recreate the compatibility link rather than copying the repository:

```bash
cd /Users/houstongolden/Desktop/CODE_2025
ln -s agents-sdk agenty
```

## ADIL custody and future reconciliation

The ADIL branch must be handled independently from path cleanup:

1. Inspect it from `/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty`.
2. Verify its branch and HEAD before edits.
3. Review `0a5d80e` against current Agents SDK architecture and active decisions.
4. Decide explicitly whether to merge, rebase, adapt, archive, or abandon it; the main-directory rename makes none of those decisions.
5. Do not remove the linked worktree until any desired commit is safely retained and branch custody is explicit.
6. If moving the ADIL worktree path, use `git worktree move` or Git-aware repair, then re-run pointer and connectivity verification.

The branch name and worktree basename may retain historical `agenty` text without changing product identity. Rename them only as an atomic Git operation with a clear reason; cosmetic cleanup is subordinate to preserving the unmerged commit.

## Final custody statement

The rename preserved the project because custody stayed with the same `.git` database. The canonical repository is `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`; `/agenty` is a temporary path shim; `/agents-SDK` is an historical/interim spelling; and the ADIL checkout is a linked, unmerged worktree sharing the same Git objects. Path cleanup must never be conflated with duplicate-file cleanup, branch integration, publication, or deletion of the compatibility link.
