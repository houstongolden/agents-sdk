# Architecture and ownership

## Role

Agents SDK is a docs-and-registry system for developer-owned agent application source. It catalogs installable items, resolves their files and dependencies, copies them into an application, and verifies that each item remains runnable and documented.

It does not own a universal agent runtime. Components and patterns integrate with existing frameworks and providers through explicit compatibility contracts.

## Ownership boundary

| Surface                                                                 | Canonical owner             | Agents SDK relationship                                                                      |
| ----------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| Public registry items, docs, CLI, templates, examples, release evidence | **Agents SDK**              | Canonical owner                                                                              |
| Global agent behavior, shared skills, sync scripts                      | `~/.agent-shared`           | Reference or install; contribute upstream through its governance                             |
| Identity, private memory, project graph, cross-machine catalog          | You.md                      | Publish safe project context; never copy private brain data or hand-edit generated snapshots |
| Product data, auth, tenancy/RLS, deployment, business rules             | Consuming product repo      | Document integration points; consuming product remains authoritative                         |
| Historical cross-project standards                                      | Codex Mgmt and source repos | Evidence and provenance, never destructive migration                                         |
| Shared agentic shell and AI SDK Agents references                       | Canonical shared skills     | Source of proven behavior and design knowledge; do not republish paid/private assets         |
| Custom implementation and enterprise support                            | BAMF                        | Secondary service path, not public product architecture                                      |

## Repository layers

```text
agents-sdk.com docs and catalog
        ↓ discovers and explains
versioned registry metadata
        ↓ resolves
@agents-sdk/cli install, diff, and doctor
        ↓ copies
developer-owned source + dependencies + tests
        ↓ demonstrated by
runnable examples and complete templates
        ↓ accepted by
CI, visual/accessibility proof, security checks, and provenance
```

## Registry item contract

Every item declares:

- stable name, category, version, maturity, license, and provenance;
- owned files and allowed write targets;
- package and item dependencies;
- supported frameworks/providers and tested versions;
- installation, conflict, diff, update, and removal behavior;
- runnable example and deterministic tests;
- documentation sections required by `CONTRIBUTING.md`;
- security, permission, privacy, and accessibility considerations.

The CLI must preflight all writes, never silently overwrite local changes, and make the copy-own boundary obvious.

## Promotion flow

Cross-project observation → provenance/privacy classification → generalized proposal → focused implementation → runnable example → tests and docs → review → versioned registry item.

Automatic learning may discover and propose. It does not copy private code, publish assets, mutate canonical shared skills, or deploy consequential changes.
