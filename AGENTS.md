# Agents SDK local agent rules

Agents SDK is the open-source component system for building production agentic applications. This repository owns the public registry, installable source, documentation, CLI, templates, examples, and evidence for agents-sdk.com.

- Keep project facts, plans, decisions, and evidence in `project-context/`.
- Treat the product as docs/registry-first. Do not turn it into an agency landing page, hosted marketplace, or universal runtime.
- Organize public work under Components, Agents & Skills, Tools & MCP, Patterns, Templates, Examples, CLI, and Docs.
- Ship a small number of complete primitives. Never add an empty category page or claim a capability that is not runnable, documented, and tested.
- Installable items must be readable source that developers can copy, customize, and own. Record dependencies, files, compatibility, security boundaries, accessibility, tests, and removal steps.
- Do not duplicate canonical global skills or host configuration from `~/.agent-shared`; reference or install them.
- Do not store identity, private memory, secrets, client material, paid assets, or generated portfolio snapshots here. You.md owns portable catalog/context surfaces.
- Promote a cross-project pattern only with provenance, an explicit owner, a versioned contract, and tests.
- Keep provider, model, auth, database, and deployment choices behind documented integration boundaries.
- Consequential writes require explicit approval contracts and durable audit evidence.
- Use the `@agents-sdk/*` npm scope. The intended CLI executable is `agents`.
- Run `pnpm validate` before committing a coherent change. Preserve unrelated work.
- Update `project-context/tasks.md`, `tasks.json`, `plan.md`, and `CURRENT_STATE.md` when scope or status changes.

See `project-context/ARCHITECTURE.md` for ownership and `project-context/ACCEPTANCE.md` for the v0.1 goal.
