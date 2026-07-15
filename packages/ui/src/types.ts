import type { ComponentType, ReactNode } from "react";

export type AgenticIcon = ComponentType<{ className?: string }>;
export type ThemeMode = "light" | "dark" | "system";

export type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon?: AgenticIcon;
  priority?: number;
  group?: "primary" | "domain" | "settings" | "media";
  collapsed?: "show" | "hide" | "active-only";
  badge?: string | number;
  hint?: string;
};

export type SidebarSection = {
  id: string;
  label: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  items: SidebarItem[];
};

export type SidebarSession = {
  id: string;
  title: string;
  href: string;
  projectId?: string;
  updatedAt?: string;
  status?: "idle" | "running" | "failed" | "done";
};

export type SidebarProject = {
  id: string;
  label: string;
  href: string;
  status?: "idle" | "running" | "failed" | "done";
};

export type SidebarLabels = {
  newChat: string;
  search: string;
  searchShortcut: string;
  projects: string;
  recentChats: string;
  emptyChats: string;
};

export type AccountUser = {
  name?: string;
  email?: string;
  avatarUrl?: string;
  initials?: string;
  subtitle?: string;
};

export type AccountMenuItem = {
  id: string;
  label: string;
  href?: string;
  icon?: AgenticIcon;
  onSelect?: () => void;
};

export type AccountPopoutProps = {
  user?: AccountUser;
  collapsed?: boolean;
  menuItems?: AccountMenuItem[];
  theme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
  onSignOut?: () => void;
};

export type ConnectorAuthKind = "oauth" | "api-key" | "mcp" | "local" | "none";
export type ConnectorAvailability = "live" | "local" | "planned";
export type ConnectorConnectionStatus =
  "disconnected" | "authorizing" | "connected" | "action_required" | "error";

/** Product-owned catalog metadata. Never put tokens or OAuth state here. */
export type ConnectorCatalogEntry = {
  id: string;
  label: string;
  description?: string;
  outcome?: string;
  category: string;
  domain?: string;
  iconUrl?: string;
  authKind: ConnectorAuthKind;
  availability: ConnectorAvailability;
  capabilities?: string[];
  recommended?: boolean;
};

/** Durable user intent. Selection is deliberately independent of OAuth. */
export type ConnectorPreference = {
  connectorId: string;
  selectedAt: number;
  priority?: number;
};

/** Operational state supplied by a project-owned backend adapter. */
export type ConnectorConnection = {
  connectorId: string;
  status: ConnectorConnectionStatus;
  account?: { id?: string; label: string };
  workspace?: { id?: string; label: string };
  scopes?: string[];
  trust?: "read" | "write" | "admin";
  lastCheckedAt?: number;
  lastSyncAt?: number;
  errorCode?: string;
};

/** @deprecated Use ConnectorCatalogEntry plus ConnectorConnection. */
export type IntegrationSummary = Pick<
  ConnectorCatalogEntry,
  "id" | "label" | "domain" | "iconUrl"
> & { status?: "connected" | "available" | "syncing" | "error" };

export type IntegrationIconProps = {
  integration: Pick<ConnectorCatalogEntry, "label" | "domain" | "iconUrl">;
  size?: number;
  className?: string;
};

export type ComposerAction =
  | "attach"
  | "mention"
  | "connectors"
  | "voice"
  | "model"
  | "mode"
  | "send"
  | "stop"
  | "media-options";

export type ComposerChip = { id: string; label: string; icon?: ReactNode };
export type ComposerToolbarAction = Exclude<ComposerAction, "send" | "stop">;

export type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  disabled?: boolean;
  running?: boolean;
  placeholder?: string;
  selectedConnectorIds?: string[];
  connectors?: ConnectorCatalogEntry[];
  /** @deprecated Use connectors. */
  integrations?: IntegrationSummary[];
  contextChips?: ComposerChip[];
  actions?: ComposerAction[];
  onAction?: (action: ComposerToolbarAction) => void;
  className?: string;
  shellClassName?: string;
  textareaClassName?: string;
  toolbarClassName?: string;
  autoFocus?: boolean;
  submitOnEnter?: boolean;
};

export type SidebarProps = {
  appName: string;
  appHref?: string;
  brandCollapsed?: string;
  sections: SidebarSection[];
  projects?: SidebarProject[];
  sessions?: SidebarSession[];
  account?: AccountUser;
  accountItems?: AccountMenuItem[];
  accountTheme?: ThemeMode;
  onAccountThemeChange?: (theme: ThemeMode) => void;
  onSignOut?: () => void;
  activeHref?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onNavigate?: (href: string) => void;
  onNewChat?: () => void;
  onSearch?: () => void;
  labels?: Partial<SidebarLabels>;
  projectLimit?: number;
  sessionLimit?: number;
  className?: string;
};

export type RightPaneMode = {
  id: string;
  label: string;
  icon?: AgenticIcon;
  badge?: string | number;
};

export type RightPaneProps = {
  modes: RightPaneMode[];
  activeMode: string;
  onModeChange: (mode: string) => void;
  children: ReactNode | ((mode: string) => ReactNode);
  title?: string;
  open?: boolean;
  width?: number | string;
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
};

export type AppShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
  rightPane?: ReactNode;
  rightPaneOpen?: boolean;
  onRightPaneClose?: () => void;
  className?: string;
  mainClassName?: string;
};
