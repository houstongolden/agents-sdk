import {
  BookOpen,
  Bot,
  FolderOpen,
  HelpCircle,
  History,
  Link2,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { AccountMenuItem, ConnectorCatalogEntry, SidebarSection } from "./types";

export const starterSidebarSections: SidebarSection[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "chat", label: "Chat", href: "/", icon: Sparkles, priority: 10, collapsed: "show" },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: FolderOpen,
        priority: 20,
        collapsed: "show",
      },
      {
        id: "history",
        label: "Sessions",
        href: "/sessions",
        icon: History,
        priority: 30,
        collapsed: "show",
      },
    ],
  },
  {
    id: "context",
    label: "Context",
    items: [
      { id: "knowledge", label: "Knowledge", href: "/knowledge", icon: BookOpen, priority: 40 },
      { id: "connectors", label: "Connectors", href: "/connectors", icon: Link2, priority: 50 },
      { id: "agents", label: "Agents", href: "/agents", icon: Bot, priority: 60 },
    ],
  },
];

export const starterAccountItems: AccountMenuItem[] = [
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
  { id: "security", label: "Security", href: "/settings/security", icon: ShieldCheck },
  { id: "help", label: "Docs and help", href: "/docs", icon: HelpCircle },
];

export const starterConnectors: ConnectorCatalogEntry[] = [
  {
    id: "gmail",
    label: "Gmail",
    description: "Search and draft email with explicit write approval.",
    category: "Communication",
    domain: "gmail.com",
    authKind: "oauth",
    availability: "planned",
    capabilities: ["read", "draft"],
  },
  {
    id: "google-drive",
    label: "Drive",
    description: "Ground the agent in files you choose.",
    category: "Knowledge",
    domain: "drive.google.com",
    authKind: "oauth",
    availability: "planned",
    capabilities: ["read"],
  },
  {
    id: "slack",
    label: "Slack",
    description: "Search workspace context and prepare replies.",
    category: "Communication",
    domain: "slack.com",
    authKind: "oauth",
    availability: "planned",
    capabilities: ["read", "draft"],
  },
  {
    id: "github",
    label: "GitHub",
    description: "Connect repositories, project context, and sync health.",
    category: "Development",
    domain: "github.com",
    authKind: "oauth",
    availability: "planned",
    capabilities: ["read", "sync"],
  },
];
