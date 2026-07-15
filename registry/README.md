# Agents SDK registry

`index.json` is the offline source of truth used by `agents list`, `agents add`, and `agents diff`. Each item declares copy-owned source, documentation, tests, dependencies, and deterministic target paths. Registry sources never import `@agents-sdk/ui`; consumers own the installed files.
