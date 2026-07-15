# Agenty agent app template

`agenty.json` is the runtime-neutral source of truth. Runtime packages adapt it; they do not redefine it.

The sample keeps read-only tools automatic, requires user approval for publishing, scopes skill loading to a declared local file, and keeps the composer owned by the parent shell.

The checked-in JSON Schema is the portable structural contract. `@agenty/core` applies the additional semantic safety layer: unique ids, valid runtime/tool/policy references, and mandatory approval for mutating tools.
