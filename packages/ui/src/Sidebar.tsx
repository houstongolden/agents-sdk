"use client";

import { useMemo, useState } from "react";
import { PanelLeft, Plus, Search } from "lucide-react";
import { AccountPopout } from "./AccountPopout";
import type { SidebarItem, SidebarLabels, SidebarProps, SidebarSection } from "./types";
import { cx } from "./utils";

const DEFAULT_LABELS: SidebarLabels = {
  newChat: "New chat",
  search: "Search",
  searchShortcut: "Cmd K",
  projects: "Projects",
  recentChats: "Recent chats",
  emptyChats: "No chats yet",
};

export function Sidebar({
  appName,
  appHref = "/",
  brandCollapsed,
  sections,
  projects = [],
  sessions = [],
  account,
  accountItems = [],
  accountTheme,
  onAccountThemeChange,
  onSignOut,
  activeHref,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  onNavigate,
  onNewChat,
  onSearch,
  labels: labelOverrides,
  projectLimit = 6,
  sessionLimit = 6,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const visibleSections = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        items: [...section.items].sort((a, b) => (a.priority ?? 50) - (b.priority ?? 50)),
      })),
    [sections],
  );

  function setCollapsed(nextCollapsed: boolean) {
    if (controlledCollapsed === undefined) setInternalCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
  }

  return (
    <aside
      className={cx(
        "flex h-dvh shrink-0 flex-col border-r border-foreground/10 bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-14" : "w-[244px]",
        className,
      )}
      aria-label="Primary navigation"
    >
      <div
        className={cx(
          "flex h-12 shrink-0 items-center gap-2 px-2",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <a
          href={appHref}
          onClick={() => onNavigate?.(appHref)}
          className={cx(
            "min-w-0 rounded-[8px] text-sm font-semibold text-foreground outline-none transition hover:text-foreground/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/28",
            collapsed && "flex h-8 w-8 items-center justify-center",
          )}
          aria-label={appName}
          title={collapsed ? appName : undefined}
        >
          {collapsed ? brandCollapsed || appName.slice(0, 1) : appName}
        </a>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-foreground/52 transition hover:bg-foreground/[0.06] hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      <div className={cx("space-y-1 px-2", collapsed && "flex flex-col items-center")}>
        <ActionButton
          collapsed={collapsed}
          label={labels.newChat}
          icon={Plus}
          {...(onNewChat ? { onClick: onNewChat } : {})}
          strong
        />
        <ActionButton
          collapsed={collapsed}
          label={labels.search}
          icon={Search}
          shortcut={labels.searchShortcut}
          {...(onSearch ? { onClick: onSearch } : {})}
        />
      </div>

      <div className="mt-2 min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        <div className={cx("space-y-2", collapsed && "space-y-1.5")}>
          {visibleSections.map((section) => (
            <NavSection
              key={section.id}
              section={section}
              collapsed={collapsed}
              {...(activeHref ? { activeHref } : {})}
              {...(onNavigate ? { onNavigate } : {})}
            />
          ))}
          <SimpleList
            label={labels.projects}
            collapsed={collapsed}
            rows={projects.map((project) => ({
              id: project.id,
              href: project.href,
              label: project.label,
            }))}
            limit={projectLimit}
            {...(activeHref ? { activeHref } : {})}
            {...(onNavigate ? { onNavigate } : {})}
          />
          <SimpleList
            label={labels.recentChats}
            collapsed={collapsed}
            rows={sessions.map((session) => ({
              id: session.id,
              href: session.href,
              label: session.title,
            }))}
            limit={sessionLimit}
            emptyLabel={labels.emptyChats}
            {...(activeHref ? { activeHref } : {})}
            {...(onNavigate ? { onNavigate } : {})}
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-foreground/10 p-2">
        <AccountPopout
          collapsed={collapsed}
          menuItems={accountItems}
          {...(account ? { user: account } : {})}
          {...(accountTheme ? { theme: accountTheme } : {})}
          {...(onAccountThemeChange ? { onThemeChange: onAccountThemeChange } : {})}
          {...(onSignOut ? { onSignOut } : {})}
        />
      </div>
    </aside>
  );
}

function NavSection({
  section,
  collapsed,
  activeHref,
  onNavigate,
}: {
  section: SidebarSection;
  collapsed: boolean;
  activeHref?: string;
  onNavigate?: (href: string) => void;
}) {
  const items = collapsed
    ? section.items.filter(
        (item) =>
          item.collapsed === "show" ||
          (item.collapsed === "active-only" && isActive(activeHref, item.href)),
      )
    : section.items;
  if (!items.length) return null;

  return (
    <section className="space-y-1">
      {!collapsed ? (
        <p className="px-2 pt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/38">
          {section.label}
        </p>
      ) : null}
      <div className="space-y-0.5">
        {items.map((item) => (
          <SidebarLink
            key={item.id}
            item={item}
            collapsed={collapsed}
            active={isActive(activeHref, item.href)}
            {...(onNavigate ? { onNavigate } : {})}
          />
        ))}
      </div>
    </section>
  );
}

function SimpleList({
  label,
  rows,
  collapsed,
  activeHref,
  emptyLabel,
  limit = 6,
  onNavigate,
}: {
  label: string;
  rows: Array<{ id: string; href: string; label: string }>;
  collapsed: boolean;
  activeHref?: string;
  emptyLabel?: string;
  limit?: number;
  onNavigate?: (href: string) => void;
}) {
  if (collapsed) return null;
  return (
    <section className="space-y-1 pt-1">
      <p className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/38">
        {label}
      </p>
      {rows.length ? (
        rows.slice(0, limit).map((row) => (
          <a
            key={row.id}
            href={row.href}
            onClick={() => onNavigate?.(row.href)}
            className={cx(
              "block truncate rounded-[7px] px-2 py-1.5 text-xs transition hover:bg-foreground/[0.06] hover:text-foreground",
              isActive(activeHref, row.href)
                ? "bg-foreground/[0.08] text-foreground"
                : "text-foreground/62",
            )}
          >
            {row.label}
          </a>
        ))
      ) : (
        <p className="px-2 py-1.5 text-xs text-foreground/38">{emptyLabel}</p>
      )}
    </section>
  );
}

function SidebarLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: SidebarItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: (href: string) => void;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      onClick={() => onNavigate?.(item.href)}
      title={collapsed ? item.label : undefined}
      className={cx(
        "relative flex h-8 items-center rounded-[8px] px-2 text-sm transition hover:bg-foreground/[0.06] hover:text-foreground",
        active ? "bg-foreground/[0.08] text-foreground" : "text-foreground/68",
        collapsed && "justify-center px-0",
      )}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
      {collapsed ? <span className="sr-only">{item.label}</span> : null}
      {!collapsed ? (
        <>
          <span className={cx("min-w-0 flex-1 truncate", Icon && "ml-2")}>{item.label}</span>
          {item.badge ? (
            <span className="ml-2 rounded-[5px] bg-foreground/[0.08] px-1.5 py-0.5 text-[10px] text-foreground/58">
              {item.badge}
            </span>
          ) : null}
        </>
      ) : null}
    </a>
  );
}

function ActionButton({
  label,
  icon: Icon,
  shortcut,
  strong,
  collapsed,
  onClick,
}: {
  label: string;
  icon: typeof Plus;
  shortcut?: string;
  strong?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cx(
        "flex h-8 w-full items-center rounded-[8px] px-2 text-sm transition hover:bg-foreground/[0.06]",
        strong ? "font-medium text-foreground" : "text-foreground/66",
        collapsed && "w-10 justify-center px-0",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed ? (
        <>
          <span className="ml-2 min-w-0 flex-1 text-left">{label}</span>
          {shortcut ? (
            <span className="font-mono text-[10px] text-foreground/36">{shortcut}</span>
          ) : null}
        </>
      ) : null}
    </button>
  );
}

function isActive(activeHref: string | undefined, href: string) {
  if (!activeHref) return false;
  if (href === "/") return activeHref === "/";
  return activeHref === href || activeHref.startsWith(`${href}/`);
}
