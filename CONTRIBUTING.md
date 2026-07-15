# Contributing to Agents SDK

Agents SDK grows one proven building block at a time. Start with an issue or `project-context/tasks.md`, keep the change to one coherent capability, and include evidence proportional to risk.

## Local workflow

1. Install with `corepack enable && pnpm install`.
2. Create a `codex/<topic>` branch when a branch is needed.
3. Preserve the ownership boundaries in `project-context/ARCHITECTURE.md`.
4. Add provenance before promoting a pattern learned in another project.
5. Run `pnpm validate` and update acceptance/task evidence.

## Registry contribution standard

An installable component, agent, skill, tool, pattern, template, or example is accepted only when it includes:

- a narrow job and honest maturity label;
- readable source that the developer owns after installation;
- declared files, dependencies, compatibility, and install/remove behavior;
- a runnable example and deterministic tests;
- documentation for installation, anatomy, customization, when to use it, when not to use it, and tradeoffs;
- accessibility evidence for user-interface work;
- security, permission, and data-boundary notes where relevant;
- provenance and license compatibility.

Avoid placeholder categories, generic wrappers, generated filler, and dependencies added only to make the catalog look larger. Quality is the release metric.

Never commit secrets, client-private material, paid asset payloads, or generated You.md brain outputs. Security reports follow `SECURITY.md`.
