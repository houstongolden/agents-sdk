# You.md registration and authority result

**Date:** 2026-07-15

The supported `you project init agents-sdk` flow created local `.youmd/projects/agents-sdk/project.json`, and `you project log` successfully appended the recovery milestone to `project-context/you.md/log.md`.

The root marker emitted by that legacy init flow did not satisfy the v1 Project Brain descriptor contract. A subsequent `youmd brain scan` classified the project as unmanaged/read-only, and `youmd brain adopt` generated an exact adoption proposal with:

- `approval.required: true`;
- `applyAvailable: false`;
- `writePolicy.default: propose`;
- `taskWrite.enabled: false`.

The invalid legacy marker was removed. A direct supported task mutation was rejected with `TASKS_WRITE_NOT_GRANTED`, as intended. The canonical 17-task ledger passes `youmd tasks validate --json`, but task-write adoption cannot complete until the You.md control plane makes the approved descriptor/grant applicable. No descriptor or grant was fabricated manually.
