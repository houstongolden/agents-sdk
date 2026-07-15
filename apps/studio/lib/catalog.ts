export const SITE_NAME = "Agents SDK";
export const SITE_DESCRIPTION =
  "Open-source components, patterns, tools, and templates for inspectable agent applications.";
export const POSITIONING =
  "The open-source component system for building production agentic applications.";
export const PUBLIC_PACKAGE_PUBLISHED = false;
export const PUBLIC_PACKAGE_NOTE =
  "Pre-release: @agents-sdk/cli is not yet published. The npx commands below are the intended public interface.";
export const LOCAL_CLI_BUILD_COMMAND = "pnpm --filter @agents-sdk/cli build";
export const LOCAL_CLI_LIST_COMMAND = "node packages/cli/dist/bin.js list --registry registry";
export const INSTALL_COMMAND = "npx @agents-sdk/cli@latest add agent-chat";
export const REGISTRY_ITEM_KINDS = ["component", "pattern", "template", "example"] as const;

export const topNavigation = [
  { href: "/components", label: "Components" },
  { href: "/agents", label: "Agents & Skills" },
  { href: "/tools", label: "Tools & MCP" },
  { href: "/patterns/approval-gates", label: "Patterns" },
  { href: "/templates/support-agent", label: "Templates" },
  { href: "/examples", label: "Examples" },
  { href: "/docs/getting-started", label: "Documentation" },
] as const;

export const catalogNavigation = [
  {
    label: "Start",
    items: [
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/registry", label: "Registry model" },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "/components", label: "Collection" },
      { href: "/components/agent-chat", label: "Agent Chat" },
      { href: "/components/human-approval", label: "Human Approval" },
      { href: "/components/artifact-workspace", label: "Artifact Workspace" },
    ],
  },
  {
    label: "Build",
    items: [
      { href: "/agents", label: "Agents & Skills" },
      { href: "/tools", label: "Tools & MCP" },
      { href: "/patterns/approval-gates", label: "Patterns" },
      { href: "/templates/support-agent", label: "Templates" },
      { href: "/examples", label: "Examples" },
    ],
  },
] as const;

export type Maturity = "preview" | "experimental";

export type ComponentEntry = {
  slug: "agent-chat" | "human-approval" | "artifact-workspace";
  name: string;
  summary: string;
  maturity: Maturity;
  install: string;
  anatomy: string[];
  api: Array<{ name: string; type: string; purpose: string }>;
  states: string[];
  accessibility: string[];
  tradeoffs: string[];
  source: string;
  tests: string;
};

export const componentCollection: ComponentEntry[] = [
  {
    slug: "agent-chat",
    name: "Agent Chat",
    summary:
      "A transport-neutral conversation frame with a host-owned composer and typed message roles.",
    maturity: "preview",
    install: INSTALL_COMMAND,
    anatomy: [
      "Optional session header",
      "Scrollable message region",
      "User, assistant, and tool roles",
      "Host-supplied composer",
    ],
    api: [
      { name: "messages", type: "AgentChatMessage[]", purpose: "Rendered conversation state" },
      { name: "composer", type: "ReactNode", purpose: "Host-controlled input surface" },
      { name: "header", type: "ReactNode?", purpose: "Session title and controls" },
      { name: "empty", type: "ReactNode?", purpose: "Purposeful zero-message state" },
    ],
    states: ["Empty", "Conversation", "Tool activity", "Disabled or running composer"],
    accessibility: [
      "Conversation landmark has a configurable label",
      "Tool messages retain readable text labels",
      "Keyboard behavior remains owned by the supplied composer",
    ],
    tradeoffs: [
      "The component does not select a model or transport",
      "Virtualization is intentionally left to high-volume hosts",
      "Message persistence is not implied by rendering",
    ],
    source: "registry/sources/components/agent-chat.tsx",
    tests: "registry/sources/components/agent-chat.test.tsx",
  },
  {
    slug: "human-approval",
    name: "Human Approval",
    summary:
      "A consequential-action boundary that exposes action, impact, decision state, and explicit controls.",
    maturity: "preview",
    install: "npx @agents-sdk/cli@latest add human-approval",
    anatomy: [
      "Risk context",
      "Action and impact fields",
      "Decision status",
      "Approve and reject controls",
    ],
    api: [
      { name: "action", type: "string", purpose: "The operation being requested" },
      { name: "impact", type: "string", purpose: "The scope of the side effect" },
      { name: "status", type: "ApprovalStatus", purpose: "Pending or resolved decision" },
      { name: "onApprove", type: "() => void", purpose: "Host-owned approval handler" },
    ],
    states: ["Pending", "Approved", "Rejected", "Expired"],
    accessibility: [
      "Decision status is announced through an aria-live region",
      "Controls use explicit action labels",
      "Resolved decisions disable duplicate actions",
    ],
    tradeoffs: [
      "Rendering approval does not enforce server authorization",
      "The host must bind the decision to an immutable action payload",
      "Expiry and audit logging are backend responsibilities",
    ],
    source: "registry/sources/components/human-approval.tsx",
    tests: "registry/sources/components/human-approval.test.tsx",
  },
  {
    slug: "artifact-workspace",
    name: "Artifact Workspace",
    summary:
      "A durable-output frame for versioned artifacts, tasks, files, and host-defined views.",
    maturity: "preview",
    install: "npx @agents-sdk/cli@latest add artifact-workspace",
    anatomy: [
      "Artifact identity and status",
      "Optional view tabs",
      "Scrollable output region",
      "Host-supplied renderer",
    ],
    api: [
      { name: "title", type: "string", purpose: "Durable output identity" },
      { name: "tabs", type: "ArtifactWorkspaceTab[]", purpose: "Available output views" },
      { name: "activeTab", type: "string?", purpose: "Controlled view state" },
      { name: "children", type: "ReactNode", purpose: "Validated artifact content" },
    ],
    states: ["Empty", "Generating", "Complete", "Invalid payload fallback"],
    accessibility: [
      "Tabs expose tab and selected semantics",
      "Horizontal tab overflow remains keyboard reachable",
      "Artifact headings preserve document structure",
    ],
    tradeoffs: [
      "The workspace does not persist versions",
      "Hosts must validate untrusted artifact payloads",
      "Large binary previews require a dedicated adapter",
    ],
    source: "registry/sources/components/artifact-workspace.tsx",
    tests: "registry/sources/components/artifact-workspace.test.tsx",
  },
];

export function getComponent(slug: string) {
  return componentCollection.find((component) => component.slug === slug);
}
