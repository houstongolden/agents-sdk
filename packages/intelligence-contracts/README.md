# `@agents-sdk/intelligence-contracts`

Provider-neutral roadmap contracts for the Agentic Data Intelligence Layer (ADIL).
The package defines portable resource identity, locators, manifests, derived
intelligence records, typed retrieval/mutation tools, and adapter conformance. It
contains no provider SDK, UI, database migration, tenant resolver, or product data.

This private workspace package is an incubating roadmap primitive. It is not part
of the Agents SDK v0.1 acceptance inventory and is not published or installable
from the public registry.

## Public API

```ts
import {
  formatAdilUrn,
  IntelligenceManifestSchema,
  intelligenceToolContracts,
  runIntelligenceAdapterConformance,
  toActorVisibleIntelligenceManifest,
  validateIntelligenceManifest,
  validateResourceAgainstManifest,
} from "@agents-sdk/intelligence-contracts";
```

- Canonical IDs: `parseAdilUrn`, `formatAdilUrn`, `AdilUrnSchema`.
- Locators: `parseFragmentLocator`, `formatFragmentLocator`,
  `FragmentLocatorSchema`.
  Image regions store a normalized top-left `x`/`y`; `widthWithinRemainder`
  and `heightWithinRemainder` are fractions of the space remaining after that
  origin, so every structurally valid region is bounded without a validator-
  specific cross-field rule.
- Registry: `IntelligenceManifestSchema`, `ResourceTypeSchema`,
  `FieldDefinitionSchema`, `validateIntelligenceManifest`, and
  `validateResourceAgainstManifest`. Resource validation binds the URN issuer,
  app, environment, and resource-type segment to the owning manifest.
- Records: resource, fragment, enrichment, embedding/search document, fact,
  observation, edge, event, job, policy, and feedback schemas/types.
  Jobs serialize `attempt` plus `remainingAttempts`; this preserves retry-budget
  semantics without an unenforceable cross-field constraint in JSON Schema.
- Retrieval: actor, filter, query, cursor, citation, evidence-pack, and lineage
  schemas/types.
- Tools: twelve static `intelligence.*` contracts. Each declares its scope,
  risk, approval mode, idempotency requirement, rate/cost policy names, audit
  behavior, and input/success/error/response schemas. Responses use
  `{requestId, data, page?, warnings?}` or `{requestId, error}`.
- Adapters: `IntelligenceAdapter` and `runIntelligenceAdapterConformance` cover
  every declared capability. Apps supply negative-isolation and policy-recheck
  probes; mutation adapters also supply approval and idempotency-replay probes.

JSON Schema Draft 2020-12 files in `schemas/intelligence/` are generated from
the canonical Zod contracts during `pnpm build`; do not edit them by hand. Tests
enforce parity for claim XOR constraints and embedding vector dimensions. ADIL
v0.1 supports 384, 512, 768, 1024, 1536, 3072, and 4096 dimensions.

## Authorization and policy boundary

ADIL contracts carry actor, audience, tenant, scope, policy version, and policy
decision evidence, but they do not authorize a request. Every product adapter
must evaluate its authoritative ACL/RLS predicate before candidate generation
and ranking, recheck it before return, and fail closed. A service role may enrich
records but may not retrieve end-user data without actor-scoped policy evaluation.
Private source mappings and internal database names belong in product-owned
manifests, not this package.
`intelligence.describe_schema` returns only
`ActorVisibleIntelligenceManifestSchema`; construct it with
`toActorVisibleIntelligenceManifest` after actor visibility is resolved.

Read tools do not require approval. Mutations require an idempotency key and a
policy or owner/admin approval mode; adapters remain responsible for durable
approval and audit evidence. Retrieved content is untrusted data, never tool
instructions.

```ts
await runIntelligenceAdapterConformance(adapter, {
  cases: contractCases,
  probes: {
    negative_isolation: verifyCrossTenantWithheld,
    policy_version_recheck: verifyStalePolicyWithheld,
    approval_enforcement: verifyMutationApproval,
    idempotency_replay: verifyReplayReceipt,
  },
});
```

## Compatibility

The package follows semantic versioning. Additive optional fields and new schema
documents are minor changes. Required-field, enum-removal, identifier grammar,
tool-name, scope, risk, or serialized-shape changes are major changes. Patch
releases may clarify docs or tighten validation only where previously invalid
data was never accepted by the documented contract. Each app owns its migration,
shadow-read, cutover, and rollback decision.

## Verification

```bash
pnpm --filter @agents-sdk/intelligence-contracts build
pnpm --filter @agents-sdk/intelligence-contracts typecheck
pnpm --filter @agents-sdk/intelligence-contracts test
pnpm validate
```
