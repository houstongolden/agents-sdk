# Changesets

Add a changeset for any user-visible package or contract change:

```bash
pnpm changeset
```

Choose the affected packages, select the smallest semver bump that accurately describes compatibility, and write a user-facing summary. Documentation-only, test-only, and repository-internal changes do not require a changeset unless they alter a published contract.

Maintainers use `pnpm version-packages` to consume pending changesets and update package versions/changelogs. `pnpm release` is reserved for an approved release with registry credentials and completed acceptance evidence; it must not be run from routine CI.
