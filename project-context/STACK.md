# Stack

## Foundation

- pnpm workspace, TypeScript strict mode, Node 20+.
- Framework-neutral contracts with JSON Schema/runtime validation.
- Vitest for unit/contract tests; governed visible-browser QA for product flows.
- React package for reusable UI; Next.js is the likely docs/reference default, not a core dependency.

## Target package families

- `contracts`: manifests and compatibility.
- `runtime`: execution, events, tools, approvals, budgets, replay.
- `ui`: shell, chat, artifacts, connectors, approvals, observability.
- `adapters-*`: model, durable state, auth, connector, and deployment choices.
- `cli` / `create-agenty`: scaffold, doctor, eval, conformance, upgrades.
- `evals`: fixtures, graders, regression and safety suites.

Provider APIs and framework versions must be checked against official documentation at implementation time. Product repos own auth, tenancy/RLS, database migrations, and deployment credentials.
