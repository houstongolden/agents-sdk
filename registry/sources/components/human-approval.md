# Human Approval

## When to use

Use for a server-created request before a consequential write or irreversible tool executes. Do not interrupt cheap read-only work or treat client state as authorization.

## Anatomy and API

- `title`, `description`: risk context.
- `action`, `impact`: exact operation and consequence.
- `status?: "pending" | "approved" | "rejected" | "expired"`.
- `onApprove?`, `onReject?`, labels, and `className?`: host-owned decision wiring.

```tsx
<HumanApproval
  title="Issue credit"
  description="Order evidence was verified."
  action="Credit $25"
  impact="One customer balance write"
  status={status}
  onApprove={approve}
  onReject={reject}
/>
```

## States and failure paths

Pending enables both decisions; resolved/expired states disable duplicate actions. The host must expose network failure, stale/expired requests, and retry behavior rather than silently reverting to pending.

## Customization, accessibility, and security

Edit installed labels/classes. Status is announced with `aria-live`; buttons retain explicit verbs. Server code must bind approval to authenticated user, immutable input hash, tool, expiry, one-time consumption, and audit record.

## Dependencies, tradeoffs, and ownership

Requires React, `lucide-react`, and Tailwind-compatible styling. Approval adds latency and durable state. After install, the UI is yours; authority, persistence, and execution remain your responsibility.
