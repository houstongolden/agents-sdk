import type { AppShellProps } from "./types";
import { cx } from "./utils";

/**
 * Structural shell only. Routing, sidebar state, and right-pane state remain
 * project-owned so this component works in Next.js, Vite, and embedded apps.
 */
export function AppShell({
  sidebar,
  children,
  rightPane,
  rightPaneOpen = Boolean(rightPane),
  onRightPaneClose,
  className,
  mainClassName,
}: AppShellProps) {
  return (
    <div
      className={cx("flex h-dvh min-h-0 overflow-hidden bg-background text-foreground", className)}
    >
      {sidebar}
      <main className={cx("relative flex min-w-0 flex-1 flex-col", mainClassName)}>{children}</main>
      {rightPaneOpen && rightPane ? (
        <>
          {onRightPaneClose ? (
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] xl:hidden"
              aria-label="Close work pane"
              onClick={onRightPaneClose}
            />
          ) : null}
          {rightPane}
        </>
      ) : null}
    </div>
  );
}
