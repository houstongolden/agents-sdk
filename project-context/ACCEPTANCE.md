# Acceptance contract

## Goal A8 — clean-clone agent app proof

Agenty is “really built out” for its first release when an evaluator with a clean checkout can complete the flow below and all evidence is reproducible from the tagged commit.

| Gate             | Verifiable result                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A1 Foundation    | Required root/context files exist; JSON parses; no secret or `.you-project` is tracked.                                                                |
| A2 Contracts     | Agent/tool/connector/approval/artifact/run/eval manifests validate; negative fixtures fail at the expected field.                                      |
| A3 Runtime       | Fake-provider tests prove bounded execution, cancellation, idempotent retry, approval allow/deny/expiry, redaction, and event replay.                  |
| A4 Scaffold      | In a temporary empty directory, one documented command creates an app that installs, typechecks, tests, and starts without source edits.               |
| A5 Experience    | The reference app streams typed parts, exposes stop/progress/tool state, gates a risky action, and creates/restores an artifact on desktop and mobile. |
| A6 Conformance   | One command emits human-readable and JSON reports; a deliberately broken fixture makes it nonzero.                                                     |
| A7 Documentation | Quickstart succeeds for a fresh contributor; API/MCP scopes, errors, approvals, limitations, and upgrade policy are documented.                        |
| A8 Release proof | A tagged release repeats A1–A7 in clean CI and a second worktree/machine; `agenty.so` serves the matching docs/demo with rollback noted.               |

## Evidence rules

- Each gate needs a command, exit code, artifact path, and commit SHA in a release report.
- Visual evidence supplements but never replaces behavior tests.
- No gate passes by assertion, mocked screenshot, or uncommitted local state.
- Human approval is required for public release, production credentials/actions, client promises, and domain purchase.

## Foundation check (current milestone)

```bash
pnpm install --frozen-lockfile=false
pnpm validate
git ls-files | grep -E '(^|/)(\.env\.local|\.you-project)$' && exit 1 || true
node -e "for (const f of ['package.json','youstack.json','project-context/tasks.json','project-context/braindump.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```
