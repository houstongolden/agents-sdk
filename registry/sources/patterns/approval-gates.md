# Approval Gates

Use this server-boundary pattern for write or irreversible tools; do not gate cheap reads or trust client state alone. `requiresApproval(intent)` classifies risk, `grantAllows(intent, grant, now)` binds an unconsumed grant to the exact tool/input hash and expiry, and `assertExecutionAllowed` fails closed.

Canonicalize and hash input before requesting approval. Persist the intent, authenticated approver, expiry, decision, consumption, and result. In production consume the grant and enqueue/execute the action transactionally. Expired, changed, missing, or already-consumed grants must fail without side effects; surface those failures to the decision UI.

Customize risk classes and grant storage around your domain, not by weakening exact-input binding. The installed file has no dependencies. The tradeoff is added latency and durable state. After install, authorization policy, storage, audit retention, and recovery belong to the host.
