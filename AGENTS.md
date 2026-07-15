# Agenty local agent rules

Agenty is the product repository for reusable, verifiable agent-building contracts, code, templates, harnesses, and documentation.

- Keep project facts, plans, decisions, and evidence in `project-context/`.
- Do not duplicate canonical global skills or host configuration from `~/.agent-shared`; reference or install them.
- Do not store identity, private memory, secrets, or generated portfolio snapshots here. You.md owns those surfaces.
- Promote a cross-project pattern only with provenance, an explicit owner, a versioned contract, and tests.
- Keep provider, model, auth, database, and deployment choices behind adapters.
- Consequential writes require explicit approval contracts and durable audit evidence.
- Run `pnpm validate` before committing a coherent change. Preserve unrelated work.
- Update `project-context/tasks.md`, `tasks.json`, and `plan.md` when scope or status changes.

See `project-context/ARCHITECTURE.md` for ownership boundaries and `project-context/ACCEPTANCE.md` for the current goal.
