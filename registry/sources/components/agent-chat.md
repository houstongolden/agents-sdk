# Agent Chat

## When to use

Use a transport-neutral conversation frame when the host already owns messages, submission, cancellation, and persistence. Do not use it as a chat runtime, authorization boundary, or tool-state store.

## Anatomy and API

- `messages: AgentChatMessage[]`: `{ id, role: "user" | "assistant" | "tool", content, label? }`.
- `composer: ReactNode`: the single host-controlled input surface.
- `header?`, `empty?`, `ariaLabel?`, `className?`: optional framing and customization.

```tsx
<AgentChat
  messages={[{ id: "1", role: "assistant", content: "Ready." }]}
  composer={
    <form>
      <input aria-label="Message" />
      <button>Send</button>
    </form>
  }
/>
```

## States and failure paths

Provide `empty` for zero messages. Represent tool progress/errors as readable `tool` messages. Disable or replace the host composer while submitting; this component does not infer runtime state or retry failures.

## Customization, accessibility, and security

Edit the installed Tailwind classes directly. Keep a descriptive `ariaLabel`, visible tool labels, and keyboard-complete composer controls. Sanitize any HTML/markdown renderer supplied as `content`; never treat rendered tool output as trusted.

## Dependencies, tradeoffs, and ownership

Requires React and Tailwind-compatible styling. It intentionally omits markdown, virtualization, transport, and storage. After install, the source and every integration decision belong to your application.
