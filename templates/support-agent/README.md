# Support Agent application

A runnable React/Vite/Tailwind application that composes Agent Chat, Human Approval, Artifact Workspace, and Approval Gates. It shows an evidence-backed order lookup, explicit allow/deny, and an artifact created only after approval.

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm dev
```

Use it when you need a small end-to-end reference rather than another `new Agent()` snippet. Do not deploy it unchanged: provider credentials, authenticated users, durable approval/grant storage, artifact persistence, audit retention, queues, and deployment policy remain host-owned.

The AI SDK agent in `src/agent.ts` bounds its loop, reads deterministic order evidence, and declares `issueCredit` with `needsApproval`. The UI uses the copy-owned components in `/components`; `src/support-flow.ts` demonstrates fail-closed exact-input approval. Tests cover lookup evidence, allow, deny, and application composition. Tailwind 4 is wired through the Vite plugin and `src/styles.css`.

Failure paths should remain visible: denied/expired approvals create no artifact, invalid grants throw before execution, provider failures must not be presented as successful writes, and persistence/retry failures need host UI. After installation every file is yours to edit; Agents SDK is not a hosted runtime dependency.
