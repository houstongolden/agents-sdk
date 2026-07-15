import Link from "next/link";
import { topNavigation } from "@/lib/catalog";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-foreground/12 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-semibold tracking-[-0.02em]"
          >
            <span className="grid h-6 w-6 place-items-center bg-foreground font-mono text-[11px] text-background">
              A
            </span>
            <span>Agents SDK</span>
          </Link>
          <nav
            className="hidden min-w-0 flex-1 items-center gap-4 xl:flex"
            aria-label="Primary navigation"
          >
            {topNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <Link
              href="/studio"
              className="px-2.5 py-2 text-sm text-muted transition hover:text-foreground"
            >
              UI preview
            </Link>
          </div>
          <details className="relative ml-auto xl:hidden">
            <summary className="cursor-pointer list-none border border-foreground/14 px-3 py-2 text-sm">
              Menu
            </summary>
            <nav
              className="absolute right-0 top-11 w-64 border border-foreground/14 bg-popover p-2 shadow-sm"
              aria-label="Mobile navigation"
            >
              {topNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm text-muted hover:bg-foreground/[0.05] hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/studio"
                className="block border-t border-foreground/10 px-3 py-2.5 text-sm text-muted hover:text-foreground"
              >
                Deterministic UI preview
              </Link>
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className="border-t border-foreground/12">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-sm font-semibold">Agents SDK</p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
              Open-source building blocks for inspectable agent applications. Runtime, data, and
              authorization stay in your stack.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-5 gap-y-2 text-sm text-muted">
            <a href="https://bamf.com" className="hover:text-foreground">
              Built by BAMF
            </a>
            <a href="https://bamf.com" className="hover:text-foreground">
              Enterprise agent systems
            </a>
            <Link href="/docs/getting-started" className="hover:text-foreground">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
