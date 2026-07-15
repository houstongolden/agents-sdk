# Stack

## Foundation

- pnpm workspace, strict TypeScript, Node 20+.
- Next.js for the public documentation/catalog application.
- React and framework-compatible source for installable UI items.
- Versioned JSON registry metadata with runtime validation.
- Vitest for unit and contract tests; governed visible-browser QA for public docs, examples, and components.
- Changesets for scoped package releases.

## Package direction

- `@agents-sdk/cli` — `init`, `add`, `list`, `diff`, and `doctor`.
- `@agents-sdk/core` — registry parsing, resolution, compatibility, and file-plan contracts.
- `@agents-sdk/ui` — reusable source helpers only where package distribution is more honest than copy-installation.
- Future namespaces such as `@agents-sdk/mcp`, `@agents-sdk/skills`, `@agents-sdk/patterns`, and `@agents-sdk/evals` require implemented demand and must not be created as empty branding.

## Source-owned installation

Registry items are copied into a consuming project with their source, tests, and local dependencies. The consuming developer can edit them directly. Package dependencies remain reserved for stable infrastructure that benefits from centralized upgrades.

Framework and provider versions must be checked against official documentation when an integration is implemented. The consuming product owns auth, tenancy, database migrations, model credentials, and deployment configuration.
