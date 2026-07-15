# Risks, gaps, and next work

**Snapshot date:** 2026-07-15
**Scope:** closure risks from local v0.1 release candidate to an evidence-backed public release
**Rule:** public release, credentials, domains/namespaces, and consequential external writes remain human-gated

## Risk model

- **P0 — release blocking:** must close before public release or before claiming A8.
- **P1 — high:** can cause lost work, contradictory truth, failed reproduction, or unsafe integration; close before or within the release preparation window.
- **P2 — medium:** does not block local A1–A7 today but will create maintenance, clarity, or scope problems if ignored.
- **P3 — watch:** intentionally deferred scope that must remain labeled as unshipped.

## Ranked risk register

### R1 — A8 has no public release proof

**Priority:** P0
**State:** blocked
**Owner:** `t-sdk-010`, after human/external gates

No `@agents-sdk/*` package is published, agents-sdk.com is not serving this release, and there is no tagged release/rollback/second-environment evidence bundle. Local A1–A7 cannot substitute for A8.

**Next work**

1. Close R2/R3 ownership and approval gates.
2. Create a clean release candidate from a reconciled, committed tree.
3. Run `pnpm install --frozen-lockfile`, `pnpm validate`, secret scans, package dry-runs, clean-room CLI/template proof, and governed browser QA.
4. Record command, exact exit code, artifact path, environment, and commit SHA for every A1–A8 check.
5. Publish only approved scoped packages and deploy matching docs.
6. Verify public install and rollback from a second worktree/machine.

**Acceptance evidence**

- public npm package/version pages and `npm view` output;
- clean `npx @agents-sdk/cli@<version>` install/add/diff/doctor transcript;
- live agents-sdk.com URL/content/version/limitations/changelog checks;
- release tag and immutable commit SHA;
- rollback command and successful rollback proof;
- second-environment A1–A7 evidence bundle;
- Houston’s recorded release approval.

### R2 — npm scope, GitHub organization, and domain ownership/access are unproven

**Priority:** P0
**State:** blocked on external state/human authority
**Owners:** `t-hy-001`, `t-hy-002`

The intended namespace and public identities are decisions, not verified assets. Publishing without confirmed ownership risks package squatting, wrong-account release, broken provenance, or an unrecoverable public identity mismatch.

**Next work**

1. Houston confirms or secures `@agents-sdk` npm organization membership and publish permission.
2. Confirm the `agents-sdk` GitHub organization/repository destination and administrator access.
3. Confirm agents-sdk.com registrar/DNS/deployment access.
4. Record approved production actors, credential location (never values), 2FA/recovery policy, and least-privilege release method.
5. Decide whether GitHub/npm provenance signing is required and test it with a non-public dry run where supported.

**Acceptance evidence**

- redacted ownership/access screenshots or CLI identity checks;
- named release principals and scopes;
- npm organization membership/publish authorization;
- GitHub repository/org administrator verification;
- domain/DNS/deployment project verification;
- explicit Houston approval in the task ledger or decision record.

### R3 — no Git remote, upstream, or release tags

**Priority:** P0
**State:** not started
**Impact:** no off-machine source of truth, CI-on-remote proof, immutable release reference, or conventional recovery path

`main` has seven local commits but no configured remote, no upstream tracking branch, and no tags. A public package/site release cannot be tied to a durable published source revision in this state.

**Next work**

1. After R2 confirms destination, configure the approved remote.
2. Push `main` and verify remote branch protection/CI.
3. Run CI on the exact candidate commit.
4. Create a signed/annotated version tag only after the release candidate passes.
5. Push the tag and record remote URLs and immutable SHAs.

**Acceptance evidence**

- `git remote -v`, `git branch -vv`, and remote repository URL;
- successful remote CI URL for the candidate SHA;
- protected/default branch settings evidence;
- annotated tag and `git ls-remote --tags` proof;
- clone/fetch/checkout proof from a clean directory.

### R4 — 29 untracked legacy duplicate files can corrupt the canonical tree

**Priority:** P0 before any commit/release
**State:** unresolved

The working tree contains 29 untracked names ending in ` 2` across root docs, project context, studio pages, CLI source/tests, and `youstack.json`. They are excluded from current tracked counts and are not canonical merely because they may be newer, longer, or duplicated by a filesystem operation.

**Next work**

1. Produce a manifest of every duplicate and its canonical counterpart.
2. Compare content/hash and classify each as identical, divergent-but-obsolete, or containing unique intended work.
3. For unique work, apply a reviewed minimal patch to the canonical file and verify its owning tests/docs.
4. Remove only confirmed duplicates; preserve an audit table of decisions.
5. Re-run JSON parsing, formatting, build/test, and `git status`.

**Acceptance evidence**

- duplicate reconciliation table with paths, hashes, classification, and disposition;
- zero unintended `* 2.*` files from `find`/`git status`;
- reviewed diffs for any promoted content;
- `pnpm validate` and `git diff --check` pass;
- clean or explicitly scoped working tree before release commit.

### R5 — `codex/adil-contracts` contains a large unmerged product/architecture branch

**Priority:** P1
**State:** decision required
**Branch/worktree:** `codex/adil-contracts` at `0a5d80e`, `/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty`

The branch adds 73 files and roughly 7,045 lines: an `intelligence-contracts` package, extensive intelligence schemas/tools/tests, and task/plan/provenance changes. It is based before the final Agents SDK reset commits and is not part of `main`. Blind merging could violate D-010’s honest v0.1 scope, duplicate later changes, or create conflicts; ignoring it risks losing substantial work.

**Next work**

1. Preserve the branch/worktree until reviewed and backed up to an approved remote.
2. Audit it against D-007/D-008/D-010/D-012 and the current registry/package ownership rules.
3. Decide one of: merge as a versioned v0.2 candidate, extract only generalized contracts/provenance, park with an explicit roadmap record, or reject with rationale.
4. If integrating, rebase/cherry-pick intentionally, resolve task/context changes against the current 13-task schema, and add package/docs/registry/release evidence.
5. Run its conformance tests plus full `pnpm validate`.

**Acceptance evidence**

- written architecture/scope decision;
- branch preserved remotely or intentionally merged;
- reviewed diff against current `main`;
- provenance/privacy/license classification;
- package and schema tests, API docs guard, and full validation;
- no silent expansion of v0.1 shipped claims.

### R6 — remote You.md Brain/task sync lacks `write:brain`

**Priority:** P1
**State:** blocked on credential scope

Local You.md evidence passes: the Brain scan is ready under stable `project:agenty` with Agents SDK display identity, the strict 13-task ledger passes, and T1 YouStack doctor passes. Remote projection was correctly skipped because the credential lacks `write:brain`; no upload occurred.

**Next work**

1. Re-authenticate through the supported You.md workflow with only the required scope.
2. Confirm the target project identity and whether the stable `project:agenty` key should remain an alias or be migrated through an official command.
3. Dry-run/inspect the outgoing safe projection; exclude secrets, private memory, `.you-project`, and generated portfolio artifacts.
4. Upload once, then read back remote state and compare task IDs/count/status.
5. Append the verified result to `project-context/you.md/log.md` and update `CURRENT_STATE.md`.

**Acceptance evidence**

- successful auth/scope check without credential values;
- remote write result and read-back;
- exact 13-task parity and Agents SDK display identity;
- no secret/private-data leakage scan;
- dated project log entry and current-state update.

### R7 — release-specific documentation and package reference surfaces are incomplete until public assets exist

**Priority:** P1
**State:** partially blocked by R1–R3

A7 passes locally, but release-specific documentation cannot be truthful before real package versions, URLs, repository links, support channels, provenance, and rollback commands exist. Package-level API guidance is concentrated in root/item docs and `packages/ui/README.md`; the CLI/core/harness public reference should be re-audited against the actually published artifact.

**Next work**

1. Generate/verify package README contents for every public package in the packed tarball.
2. Document exact supported Node/React/framework versions, exports, CLI exit codes, error codes, ownership-after-install, security boundaries, and removal/rollback.
3. Replace intended URLs/commands with verified public versions only after publish.
4. Add release limitations, migration notes, changelog, integrity/provenance, support/security contacts, and uninstall guidance.
5. Keep Agents & Skills, Tools & MCP, memory, auth, queues, observability, and deployment clearly labeled roadmap unless runnable items ship.

**Acceptance evidence**

- package tarball inspection showing README/license/types/assets;
- API docs guard on public contracts;
- link checker against the live site and package/repository URLs;
- quickstart completed from public npm in a clean environment;
- documentation/version parity check against the release tag.

### R8 — compatibility symlink can outlive its migration purpose

**Priority:** P1
**State:** compatibility measure active

`/Users/houstongolden/Desktop/CODE_2025/agenty` currently points to lowercase `agents-sdk`, and the linked `.git` pointer is also normalized to the lowercase physical path. The symlink preserves this already-open Codex task, but stale tooling may continue persisting the old `agenty` path indefinitely.

**Next work**

1. Keep the symlink during the current task/handoff and linked-process migration.
2. Register/open `/Users/houstongolden/Desktop/CODE_2025/agents-sdk` as the canonical Codex project.
3. Audit scripts, CI config, editor workspaces, shell aliases, You.md project records, and docs for noncanonical absolute `agenty` or uppercase path variants.
4. Migrate supported integrations; preserve `agenty` only as a documented alias where identity history requires it.
5. Remove the symlink only after no active task/process/config depends on it and a fresh Codex session opens the canonical path successfully.

**Acceptance evidence**

- canonical project opens/builds/tests in a fresh Codex task;
- absolute-path scan has only approved historical references;
- `git worktree list` and linked branch remain valid;
- You.md scan/project lookup succeeds;
- symlink removal decision and rollback (`ln -s agents-sdk agenty`) documented.

### R9 — current handoff/audit files are snapshots, not automatically maintained truth

**Priority:** P2
**State:** documentation-governance gap

The exhaustive handoff improves recovery but can become a second project brain if future agents update it instead of canonical files. Audit documents can also capture transient dirty-tree facts that become stale after reconciliation.

**Next work**

1. Keep a clear index with snapshot date, source paths, and canonical precedence.
2. Update `ACCEPTANCE.md`, `DECISIONS.md`, `ARCHITECTURE.md`, `tasks.json`, and `CURRENT_STATE.md` first.
3. Treat this audit directory as immutable handoff evidence after commit, or create a new dated audit rather than silently rewriting history.
4. Link new release evidence instead of duplicating large command logs into multiple files.

**Acceptance evidence**

- audit index labels snapshots and canonical owners;
- no conflicting active task/decision ledger;
- documentation link check;
- future material milestones reflected in `CURRENT_STATE.md` and task ledger.

### R10 — generated dependencies/build output are large local state, not release source

**Priority:** P2
**State:** controlled by ignore rules, but worth cleanup/reproduction proof

The working directory was approximately 1.1 GB at inventory time, including roughly 508 MB of root `node_modules` and 660 MB of `apps/studio/.next`. These artifacts are ignored and should not be copied as project context, committed, or treated as release evidence without a reproducible command record.

**Next work**

1. Confirm no ignored build output or dependency tree is staged/tracked.
2. Reproduce from lockfile in a clean directory/container.
3. Retain only intentional evidence artifacts with commands, SHAs, and checksums.
4. Clean caches only when no active dev server relies on them; preserve the local server lifecycle rule.

**Acceptance evidence**

- `git ls-files` secret/build-output scan;
- frozen-lockfile clean install/build/test pass;
- package tarballs exclude `.next`, `node_modules`, secrets, and local logs;
- artifact manifest for retained release evidence.

### R11 — claim drift can turn roadmap categories into fake inventory

**Priority:** P2
**State:** ongoing governance risk

The durable IA includes Agents & Skills and Tools & MCP, while memory/context, queues, auth/team, observability, deployment, and broad providers are later possibilities. Category pages or source references do not prove shipped capabilities.

**Next work**

1. Keep registry index and runnable tests as the inventory authority.
2. Require provenance, owner, versioned contract, runnable example, tests, docs, security/accessibility notes, and removal behavior for every promotion.
3. Apply D-012 proposal-first learning and D-010 honest-scope review before adding public claims.
4. Add explicit maturity labels and “not included” sections to future work.

**Acceptance evidence**

- registry/schema validation;
- site content tests comparing claims to registry entries;
- review checklist for every new item;
- no empty package/category counted in release notes.

### R12 — restrained Enterprise/BAMF public treatment awaits explicit approval

**Priority:** P2 before public launch
**State:** human gate (`t-hy-003`)

D-011 defines BAMF as secondary, but Houston has not yet approved or revised the exact Enterprise link and “Built by BAMF” presentation.

**Next work**

1. Present the exact public locations/copy once, without expanding the developer-first narrative.
2. Houston approves or revises.
3. Record the ruling in the task ledger and, if it changes policy, `DECISIONS.md`.
4. Browser-check the resulting links and hierarchy.

**Acceptance evidence**

- explicit Houston decision;
- final copy/link diff;
- browser QA showing secondary hierarchy and working destination;
- `t-hy-003` marked done.

### R13 — disaster recovery remains weak until local-only history is backed up

**Priority:** P1 until remote exists
**State:** exposed

The main repository and the substantial ADIL branch are local-only. A machine failure could lose both committed and uncommitted work. The compatibility symlink is not a backup.

**Next work**

1. Do not confuse duplicating files inside one directory with backup.
2. After approved remote ownership is established, push every retained branch and tags.
3. Use the governed machine-sync/encrypted backup workflow for environment templates and secret transport; never commit actual secrets.
4. Verify clone/recovery on a second environment.

**Acceptance evidence**

- remote branch parity for `main` and retained work branches;
- off-machine backup record;
- successful clean clone and validation;
- `.env.example` completeness and secret scan.

## Ordered closure plan

The dependencies make the next sequence explicit:

1. **Reconcile dirty duplicates (R4).** No release or handoff commit should include ambiguous `* 2.*` files.
2. **Validate and commit the handoff as an atomic docs unit.** Run formatting/diff checks and update canonical task/current-state sources only if their truth changed.
3. **Review and preserve the ADIL branch (R5/R13).** Make a scope decision; do not delete its linked worktree.
4. **Open/register the canonical Codex project path (R8).** Keep the old symlink until fresh-session and integration proof passes.
5. **Resolve external ownership and approvals (R2/R12).** Houston confirms npm, GitHub, domain, launch, and Enterprise treatment.
6. **Establish remote and CI (R3/R13).** Push clean history/retained branches; verify protected CI.
7. **Close release documentation gaps (R7).** Tie actual package/site references to the release candidate.
8. **Build the release evidence bundle (R1).** Re-run full clean-room, browser, package, schema, security, and rollback checks at one SHA.
9. **Publish with explicit approval, then verify externally (R1).** Packages and site must match tag/SHA.
10. **Run second-machine proof and rollback rehearsal (R1/R13).** Only then mark A8 and `t-sdk-010` done.
11. **Retry remote You.md sync (R6) when scoped auth exists.** This may proceed independently once credentials are authorized, but is not a substitute for A8.

## Minimum release evidence directory

A8 should produce one immutable, dated bundle containing:

```text
release-report.md                    gate-by-gate commands/exits/artifacts/SHA
environment.json                    redacted OS/Node/pnpm/package metadata
git.txt                             remote, branch, tag, clean status, SHA
ci.md                               remote CI links and result
packages/                           npm pack manifests/checksums/public metadata
clean-room-cli/                     init/add/list/diff/doctor transcripts
support-agent/                      install/test/typecheck/build transcripts
browser/                            desktop/mobile/a11y/overflow/console evidence
security/                           secret scan, permissions, approval-boundary checks
site/                               live URL/version/link/limitations/changelog proof
rollback/                           package/site rollback steps and rehearsal output
second-environment/                 independent reproduction report
approvals.md                        human release/namespace/domain decisions
```

Every evidence entry needs the exact command, UTC timestamp, exit code, artifact path/checksum where relevant, environment, and immutable commit/tag. Screenshots supplement behavior tests; they never replace them.

## Stop conditions

Do not mark A8 complete or describe Agents SDK as publicly available while any of the following remains true:

- packages are not installable from the public npm registry;
- agents-sdk.com does not serve matching docs;
- namespace/domain/GitHub ownership is unverified;
- the candidate is uncommitted, dirty, untagged, or lacks remote CI;
- public package and site versions do not map to one immutable SHA;
- rollback has not been documented and rehearsed;
- a clean second environment has not repeated A1–A7;
- required human release approval is absent.

Local completeness is real and valuable: A1–A7 are accepted. The remaining work is an external-release and durability problem, not permission to inflate claims or bypass the evidence contract.
