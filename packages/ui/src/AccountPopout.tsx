"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react";
import type { AccountMenuItem, AccountPopoutProps } from "./types";
import { cx, initialsFor } from "./utils";

export function AccountPopout({
  user,
  collapsed,
  menuItems = [],
  theme,
  onThemeChange,
  onSignOut,
}: AccountPopoutProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const displayName = user?.name || user?.email || "Account";
  const initials = user?.initials || initialsFor(displayName);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx("relative", collapsed ? "w-10" : "w-full")}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cx(
          "flex w-full items-center gap-2 rounded-[8px] px-2 py-2 text-left text-sm text-foreground/82 transition hover:bg-foreground/[0.06]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/30",
          collapsed && "h-10 justify-center px-0",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${displayName}`}
      >
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground/[0.08] text-xs font-semibold text-foreground">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </span>
        {!collapsed ? (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{displayName}</span>
              <span className="block truncate text-xs text-foreground/46">
                {user?.subtitle || user?.email || "Personal account"}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-foreground/42" />
          </>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-50 mb-2 w-[268px] max-w-[calc(100vw-1rem)] rounded-[8px] border border-foreground/10 bg-popover p-1.5 text-popover-foreground shadow-lg md:bottom-0 md:left-full md:mb-0 md:ml-2"
        >
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground/[0.08] text-xs font-semibold">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{displayName}</span>
              <span className="block truncate text-xs text-foreground/48">
                {user?.email || user?.subtitle || "Signed in"}
              </span>
            </span>
          </div>

          {menuItems.map((item) => (
            <MenuRow key={item.id} item={item} onClose={() => setOpen(false)} />
          ))}

          {onThemeChange ? (
            <div className="mt-1 border-t border-foreground/10 px-2 py-2">
              <p className="mb-1.5 text-xs font-medium text-foreground/52">Theme</p>
              <div className="grid grid-cols-3 gap-1">
                {(["light", "dark", "system"] as const).map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => onThemeChange(choice)}
                    className={cx(
                      "inline-flex h-8 items-center justify-center gap-1 rounded-[6px] text-xs transition hover:bg-foreground/[0.07]",
                      theme === choice ? "bg-foreground text-background" : "text-foreground/68",
                    )}
                  >
                    {choice === "dark" ? (
                      <Moon className="h-3.5 w-3.5" />
                    ) : choice === "light" ? (
                      <Sun className="h-3.5 w-3.5" />
                    ) : (
                      <Settings className="h-3.5 w-3.5" />
                    )}
                    <span className="capitalize">{choice}</span>
                    {theme === choice ? <Check className="h-3 w-3" /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {onSignOut ? (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-[6px] px-2 py-1.5 text-left text-xs text-foreground/76 transition hover:bg-foreground/[0.07]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MenuRow({ item, onClose }: { item: AccountMenuItem; onClose: () => void }) {
  const Icon = item.icon;
  const className =
    "flex w-full items-center gap-2 rounded-[6px] px-2 py-1.5 text-left text-xs text-foreground/76 transition hover:bg-foreground/[0.07]";

  if (item.href) {
    return (
      <a href={item.href} className={className} role="menuitem" onClick={onClose}>
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      role="menuitem"
      onClick={() => {
        onClose();
        item.onSelect?.();
      }}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {item.label}
    </button>
  );
}
