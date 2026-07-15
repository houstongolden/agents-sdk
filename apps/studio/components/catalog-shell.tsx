"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { catalogNavigation } from "@/lib/catalog";

export function CatalogShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navigation = <CatalogNavigation pathname={pathname} />;
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <details className="border-b border-foreground/12 py-3 lg:hidden">
        <summary className="cursor-pointer list-none font-mono text-xs text-muted">
          Browse documentation
        </summary>
        <div className="pt-4">{navigation}</div>
      </details>
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-foreground/12 py-10 pr-7 lg:block">
          {navigation}
        </aside>
        <main className="min-w-0 py-10 lg:px-12 lg:py-14 xl:px-16">{children}</main>
      </div>
    </div>
  );
}

function CatalogNavigation({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-7" aria-label="Documentation navigation">
      {catalogNavigation.map((group) => (
        <section key={group.label}>
          <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
            {group.label}
          </h2>
          <div className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block border-l-2 px-3 py-1.5 text-sm transition ${
                    active
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}
