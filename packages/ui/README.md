# `@agents-sdk/ui`

Adapter-light React, Tailwind, and `lucide-react` primitives for agentic product
shells. The package deliberately owns no router, auth provider, chat runtime,
database, OAuth state, or model/provider integration.

## Attribution

`Sidebar`, `AccountPopout`, `ChatComposer`, `IntegrationIcon`, their base types,
and starter configuration originate from Houston Golden's shared
`agentic-app-shell` starter package:

`~/.agent-shared/claude-skills/agentic-app-shell/templates/starter-package/`

Agents SDK adds `AgentChat`, `HumanApproval`, `ArtifactWorkspace`, the reusable `AppShell`, `RightPane`, versioned `ArtifactSpec`,
tolerant `ArtifactRenderer`, and `DemoAgenticSurface` proof surface. The shared
skill remains the upstream design-standard source; this package is the
versioned product/repository distribution.

## Project-owned adapters

- Routing: supply `href`, `activeHref`, and `onNavigate`.
- Auth/account/theme: map local state into the typed account props.
- Chat: own draft, stream, run, submit, stop, and queued-message state.
- Connectors: keep catalog, user preference, and connection health separate.
- Artifacts: validate untrusted payloads with `parseArtifactSpec` before use.
- Design tokens: provide Tailwind-compatible `foreground`, `background`,
  `sidebar`, `sidebar-foreground`, `popover`, and `popover-foreground` colors.

## Usage

```tsx
import {
  AppShell,
  ArtifactRenderer,
  ChatComposer,
  RightPane,
  Sidebar,
  parseArtifactSpec,
} from "@agents-sdk/ui";
```

`DemoAgenticSurface` is an in-memory integration example, not a production chat
runtime. Copy its adapter shape, then replace local state with project-owned
navigation, session, connector, and agent adapters.
