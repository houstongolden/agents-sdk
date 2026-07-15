# Acceptance contract

## Goal SDK-0.1 — owned-source application proof

Agents SDK v0.1 is accepted when a developer in a clean directory can discover a real registry item, understand it, install its source, run it, customize it, inspect a meaningful diff, and remove or retain it without depending on an Agents SDK hosted runtime.

| Gate                    | Verifiable result                                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1 Identity             | Repository, packages, schemas, UI copy, metadata, and docs consistently use Agents SDK, agents-sdk.com, `@agents-sdk/*`, and the `agents` executable; historical Agenty references appear only in provenance/migration history. |
| A2 Public experience    | The homepage explains the product in the first viewport; the docs navigation exposes all eight product areas without fake inventory; visual/accessibility/browser checks pass.                                                  |
| A3 Registry             | Every shipped item validates against a versioned registry contract declaring files, dependencies, compatibility, provenance, maturity, examples, tests, docs, and security/accessibility notes.                                 |
| A4 CLI                  | From a clean directory, `init`, `add`, `list`, `diff`, and `doctor` work; conflict, unknown-item, incompatible-version, partial-write, and locally-modified-file paths are named and tested.                                    |
| A5 Components           | `agent-chat`, `human-approval`, and `artifact-workspace` install as readable source, build, test, render on desktop/mobile, and document anatomy, customization, tradeoffs, accessibility, and security.                        |
| A6 Pattern and template | `approval-gates` has an executable reference and the support-agent template installs, runs, tests, exercises approval allow/deny, and uses all three v0.1 components.                                                           |
| A7 Documentation        | A fresh developer completes the quickstart; every shipped item explains when to use it, when not to, dependencies, integration boundaries, error paths, and ownership after install.                                            |
| A8 Release proof        | Tagged scoped packages install from the public registry; clean CI and a second worktree/machine repeat A1–A7; agents-sdk.com serves matching docs with limitations, rollback, and changelog.                                    |

## Evidence rules

- Each gate needs a command, exit code, artifact path, and commit SHA in the release report.
- Visual evidence supplements but never replaces behavior and accessibility tests.
- No gate passes through assertions, mocked screenshots, placeholder routes, or uncommitted local state.
- Roadmap categories cannot be counted as shipped inventory.
- Human approval is required for public release, production credentials/actions, client promises, and external namespace/domain purchases.

## Foundation verification

```bash
pnpm install --frozen-lockfile=false
pnpm validate
git diff --check
git ls-files | grep -E '(^|/)(\.env\.local|\.you-project)$' && exit 1 || true
node -e "for (const f of ['package.json','youstack.json','project-context/tasks.json','project-context/braindump.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```
