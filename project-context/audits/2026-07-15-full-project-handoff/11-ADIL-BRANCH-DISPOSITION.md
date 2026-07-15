# ADIL branch disposition

**Date:** 2026-07-15

**Source branch:** `codex/adil-contracts`

**Source commit:** `0a5d80e`

**Decision:** adapt implementation; reject blind merge

## Review result

The branch contains a substantial provider-neutral intelligence contract package: typed resource and evidence records, twelve static `intelligence.*` tool contracts, actor-visible manifest filtering, approval/idempotency declarations, adapter conformance probes, fixtures, and Zod-to-JSON-Schema generation. This work is useful Agents SDK roadmap material.

The branch's Agenty-era plan/task/provenance edits and lockfile are superseded. A cherry-pick would also retain the private `@houston/*` package identity and `urn:houston` protocol examples. Those surfaces were not merged.

## Adapted custody

- Canonical package: `packages/intelligence-contracts/`
- Package identity: `@agents-sdk/intelligence-contracts`
- Portable URN prefix: `urn:agents-sdk`
- Generated schemas: `schemas/intelligence/`
- Status: private workspace roadmap primitive; excluded from v0.1 inventory and A1–A8 claims
- Canonical contracts: Zod source in the package; JSON Schemas are generated artifacts
- Verification: package build, typecheck, 19 tests, schema generation, and full repository validation

The original branch/commit remains historical custody until remote/off-machine durability is established. No merge, rebase, or worktree deletion was required to preserve the adapted implementation.

## API documentation boundary

The package README is the smallest canonical reader-facing contract. It records exports, records, tool behavior, authorization boundaries, approval/idempotency requirements, compatibility, and verification. No public docs/catalog claim was added because the package remains private and incubating.
