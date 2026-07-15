# Contributing

Start with the issue or `project-context/tasks.md`, keep changes to one coherent capability, and include tests or evidence proportional to risk.

1. Install with `corepack enable && pnpm install`.
2. Create a `codex/<topic>` branch when a branch is needed.
3. Preserve provider neutrality and the ownership boundaries in `project-context/ARCHITECTURE.md`.
4. Add provenance before promoting a pattern learned in another project.
5. Run `pnpm validate` and update acceptance/task evidence.

Never commit secrets, client-private material, paid asset payloads, or generated You.md brain outputs. Security reports follow `SECURITY.md`.
