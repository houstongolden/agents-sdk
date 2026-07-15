# Changelog

All notable changes to Agents SDK are documented here. Package-level release notes are generated from Changesets; this file records repository-wide milestones.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and released packages use semantic versioning.

## [Unreleased]

### Changed

- Reset the product from the former Agenty framework/service direction to Agents SDK, the open-source component system for complete agentic applications.
- Defined the agents-sdk.com information architecture, `@agents-sdk/*` namespace, ownership model, honest v0.1 scope, design language, and release gates.

### Added

- Versioned registry contracts and copy-owned `agent-chat`, `human-approval`, and `artifact-workspace` components.
- Executable `approval-gates` pattern, focused examples, and a complete support-agent template.
- `agents init`, `add`, `list`, `diff`, and `doctor` with dependency planning, conflict refusal, modification reporting, and rollback behavior.
- Industrial-editorial docs/catalog experience with 23 generated pages.

### Verified

- Local gates A1–A7: repository validation, API docs guard, diff/JSON/secret scans, package dry-runs, and desktop/mobile browser QA pass.
- Clean-room compiled CLI and support-agent dependency install, 11 tests, typecheck, and production build pass.
- Shared `AgentsSDKStack` synchronization succeeds without changing `.agent-shared` or You.md ownership boundaries.

### Pending

- A8 public release: scoped packages are not published, agents-sdk.com is not serving the release, and npm namespace/domain/GitHub organization ownership is not proven.
