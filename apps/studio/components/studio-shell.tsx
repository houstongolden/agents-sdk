"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Braces,
  Clock3,
  FileText,
  FolderKanban,
  HelpCircle,
  Link2,
  Menu,
  MessageSquare,
  Search,
  Settings,
  X,
} from "lucide-react";
import { AppShell, Sidebar, type SidebarSection } from "@agenty/ui";

const sections: SidebarSection[] = [
  {
    id: "build",
    label: "Build",
    items: [
      {
        id: "home",
        label: "Chat",
        href: "/",
        icon: MessageSquare,
        priority: 10,
        collapsed: "show",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
        priority: 20,
        collapsed: "show",
      },
      {
        id: "files",
        label: "Files",
        href: "/files",
        icon: FileText,
        priority: 30,
        collapsed: "show",
      },
      {
        id: "knowledge",
        label: "Knowledge",
        href: "/knowledge",
        icon: BookOpen,
        priority: 40,
        collapsed: "show",
      },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    items: [
      { id: "connectors", label: "Connectors", href: "/connectors", icon: Link2, priority: 50 },
      { id: "loops", label: "Loops", href: "/loops", icon: Clock3, priority: 60 },
      { id: "settings", label: "Settings", href: "/settings", icon: Settings, priority: 70 },
    ],
  },
];

const destinations = [
  {
    href: "/chat/demo",
    label: "Open deterministic demo",
    detail: "Chat, tool call, progress, artifact",
  },
  { href: "/projects", label: "Projects", detail: "Agent app workspaces and sessions" },
  { href: "/files", label: "Files", detail: "Inputs and generated outputs" },
  { href: "/knowledge", label: "Knowledge", detail: "Context and source boundaries" },
  { href: "/connectors", label: "Connectors", detail: "Catalog, selection, and connection health" },
  { href: "/loops", label: "Loops", detail: "Scheduled and recurring runs" },
  { href: "/settings", label: "Settings", detail: "Local studio configuration" },
];

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const sidebarProps = useMemo(
    () => ({
      appName: "Agenty",
      brandCollapsed: "A",
      sections,
      activeHref: pathname,
      projects: [{ id: "agenty-studio", label: "Agenty Studio", href: "/projects" }],
      sessions: [{ id: "demo", title: "Reference build", href: "/chat/demo" }],
      account: { name: "Local studio", subtitle: "No account required" },
      accountItems: [
        { id: "settings", label: "Settings", href: "/settings", icon: Settings },
        { id: "contracts", label: "Contracts", href: "/knowledge", icon: Braces },
        { id: "help", label: "Docs and help", href: "/knowledge", icon: HelpCircle },
      ],
      onNewChat: () => router.push("/chat/demo?new=1"),
      onSearch: () => setSearchOpen(true),
    }),
    [pathname, router],
  );

  const sidebar = (
    <>
      <div className="hidden md:block">
        <Sidebar {...sidebarProps} collapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] md:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Sidebar {...sidebarProps} collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </div>
        </>
      ) : null}
    </>
  );

  return (
    <>
      <AppShell sidebar={sidebar}>
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-foreground/10 px-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-foreground/58 hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">Agenty</span>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-foreground/58 hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
        {children}
      </AppShell>
      {searchOpen ? <CommandSearch onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}

function CommandSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = destinations.filter((destination) =>
    `${destination.label} ${destination.detail}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/45 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search Agenty"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-[14px] border border-foreground/12 bg-popover text-popover-foreground shadow-2xl">
        <div className="flex items-center gap-2 border-b border-foreground/10 px-3">
          <Search className="h-4 w-4 text-foreground/42" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search routes and capabilities"
            className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/36"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[7px] text-foreground/46 hover:bg-foreground/[0.06]"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-2">
          {filtered.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              onClick={onClose}
              className="block rounded-[8px] px-3 py-2.5 hover:bg-foreground/[0.055]"
            >
              <span className="block text-sm font-medium">{destination.label}</span>
              <span className="mt-0.5 block text-xs text-foreground/46">{destination.detail}</span>
            </Link>
          ))}
          {!filtered.length ? (
            <p className="px-3 py-8 text-center text-sm text-foreground/42">No matching surface.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
