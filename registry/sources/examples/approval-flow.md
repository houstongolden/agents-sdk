# Approval Flow Example

Use this focused example to see an exact grant checked before a write is queued. Do not copy it as production authorization: replace the return value with one transaction that consumes the grant and enqueues the job. Missing, changed, expired, or consumed grants throw before execution. Pair it with a UI that exposes action, impact, denial, expiry, and retry states. It depends on `approval-gates`; after install, persistence, identity, policy, audit, and recovery are host-owned.
