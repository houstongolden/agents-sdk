# Architecture and ownership

## Role

Agenty is the **productization and conformance layer** for agent engineering: contracts, packages, starters, UI, harnesses, evals, docs, and service delivery assets. It promotes proven patterns; it does not absorb every file from every agent project.

## Exact ownership boundary

| Surface                                                        | Canonical owner                  | Agenty relationship                                                                                                               |
| -------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Global agent behavior, shared skills, sync scripts             | `~/.agent-shared`                | Reference/install; contribute upstream through its governance. Never fork silently.                                               |
| Identity, private memory, project graph, cross-machine catalog | You.md / Houston You.md repo     | Publish a safe `youstack.json` and project context for indexing. Do not copy private brain data or hand-edit generated snapshots. |
| Product domain data, auth, RLS, deployment, business rules     | Each product repo                | Provide adapters/contracts; the product remains authoritative.                                                                    |
| Historical cross-project agent standards                       | Codex Mgmt                       | Evidence/incubator. Promote selected material here with provenance; do not destructively move history.                            |
| Agent app shell routing standards                              | shared `agentic-app-shell` skill | Consume today; Agenty can own tested product packages while the shared skill remains the routing/install surface.                 |
| Streaming/tool/artifact reference patterns                     | shared `aisdkagents` references  | Build against installed references without republishing paid/private assets or inventing APIs.                                    |
| Reusable public framework and delivery system                  | **Agenty**                       | Canonical owner.                                                                                                                  |

## Layers

```text
apps/docs + examples                      public learning and proof
packages/ui + starter                     product shell and scaffold
packages/runtime + adapters               execution, tools, approvals, events
packages/contracts                        versioned portable schemas
tooling/evals + conformance               verification and release gates
project-context                           local intent, provenance, decisions, proof
```

Dependencies point downward. Contracts have no UI/provider dependency. Runtime depends on contracts. UI consumes typed events/contracts but does not own execution policy. Product adapters cannot weaken core safety semantics without declaring a conformance deviation.

## Core flow

`manifest → validate → resolve adapters/policy → execute bounded run → request approval when required → emit append-only events/artifacts → evaluate → conformance report`

Every external action declares scopes, risk, idempotency, timeout, retry behavior, approval policy, and evidence. Secrets are references resolved at runtime. Retrieved content is untrusted.

## Learning flow

Cross-project observation → provenance record → privacy/ownership classification → generalized proposal → fixture/eval → review → versioned Agenty primitive. Automatic dream cycles may discover and propose; they do not copy private code, change upstream canonical skills, or deploy consequential changes.
