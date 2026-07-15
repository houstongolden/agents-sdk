# Agenty

**The agency for agents.** Agenty is an open agent-building framework and the delivery system behind a premium agent engineering service.

The framework turns repeated lessons from real agent products into versioned contracts, composable UI, runtime adapters, skills, templates, evals, and release gates. The service uses that system to design and ship production agents for BAMF and other clients without rebuilding the same foundations each time.

## What belongs here

- Agent and harness manifests, schemas, safety classes, approval records, and run ledgers.
- Reusable chat, artifact, connector, shell, and observability UI.
- Framework-neutral core contracts plus provider/runtime adapters.
- Installable starters, examples, eval fixtures, conformance checks, and documentation.
- Proven cross-project patterns with source attribution and an explicit promotion path.

Agenty does **not** replace the canonical shared skill store (`~/.agent-shared`), the You.md identity/project catalog, or a product repository's domain logic. See [Architecture](project-context/ARCHITECTURE.md).

## Quickstart (contributors)

```bash
corepack enable
pnpm install
pnpm validate
```

Explore workspace packages with `pnpm -r list --depth -1`.

The source-checkout CLI currently supports `init`, `validate`, `doctor`, and `catalog`:

```bash
# Create a safe starter manifest in ./my-agent (never overwrites one).
pnpm --filter @agenty/cli exec agenty init my-agent

# Inspect it from the generated directory.
pnpm --filter @agenty/cli exec agenty validate my-agent/agenty.json
pnpm --filter @agenty/cli exec agenty doctor my-agent/agenty.json
pnpm --filter @agenty/cli exec agenty catalog my-agent/agenty.json --json
```

These commands create and inspect the versioned manifest plus every local runtime, eval, and skill file it declares. The result is a contract-complete starter skeleton, not yet a complete installable application or globally published package. Package-specific commands live beside each package.

The JSON Schema validates portable structure in any compatible validator. `@agenty/core` then enforces graph-level safety that JSON Schema intentionally does not duplicate, including unique ids, cross-reference integrity, and approval requirements for mutating tools.

## Product direction

Agenty should make a clean-clone proof possible: choose a starter, declare an agent and tools, run locally, inspect tool/approval/artifact state, execute evals, and receive a conformance report. The same primitives power `agenty.so` documentation, examples, and service delivery.

Start with [Vision](project-context/VISION.md), the [eight-stage plan](project-context/plan.md), and the [acceptance contract](project-context/ACCEPTANCE.md).

## Status

Foundation / pre-release. APIs may change until the first conformance release. Do not use unversioned contracts for consequential production automation.

## License

MIT. See [LICENSE](LICENSE).
