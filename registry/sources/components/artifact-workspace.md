# Artifact Workspace

## When to use

Use when documents, reports, code, or other durable outputs need a lifecycle separate from chat. Do not use it as storage, schema validation, an editor, or a binary sandbox.

## Anatomy and API

- `title: string`, `status?: string`: artifact identity and lifecycle.
- `tabs?: ArtifactWorkspaceTab[]`, `activeTab?`, `onTabChange?`: controlled views.
- `children: ReactNode`, `className?`: host-validated renderer and styling.

```tsx
<ArtifactWorkspace
  title="Resolution"
  status="complete"
  tabs={[{ id: "final", label: "Final" }]}
  activeTab="final"
>
  <article>
    <h2>Approved resolution</h2>
  </article>
</ArtifactWorkspace>
```

## States and failure paths

Render host-owned empty, generating, complete, invalid-payload, and load-error content through `children`. A missing `activeTab` leaves every tab unselected; keep controlled state valid when tabs change.

## Customization, accessibility, and security

Edit the installed Tailwind classes and child renderer. Tabs expose `tab`/`aria-selected`; preserve headings and keyboard-reachable content. Validate untrusted payloads and permissions before rendering or fetching versions.

## Dependencies, tradeoffs, and ownership

Requires React and Tailwind-compatible styling. Persistence, version history, editing, and large-file adapters are deliberately omitted. After install, source and artifact contracts belong to your application.
