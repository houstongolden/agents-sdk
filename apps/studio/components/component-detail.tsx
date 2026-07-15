import { CatalogShell } from "@/components/catalog-shell";
import { CopyCommand } from "@/components/copy-command";
import { PUBLIC_PACKAGE_NOTE, type ComponentEntry } from "@/lib/catalog";
import {
  AgentChatPreview,
  ArtifactWorkspacePreview,
  HumanApprovalPreview,
} from "./component-previews";

export function ComponentDetail({ component }: { component: ComponentEntry }) {
  return (
    <CatalogShell>
      <article className="max-w-5xl">
        <header className="border-b border-foreground/14 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-accent">component</span>
            <span className="border border-foreground/14 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
              {component.maturity}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {component.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{component.summary}</p>
        </header>

        <DetailSection
          title="Preview"
          intro="A local interactive state. No model, transport, account, or persistence is implied."
        >
          <div className="border border-foreground/14 bg-[#fbfbf8] p-3 sm:p-5">
            {previewFor(component.slug)}
          </div>
        </DetailSection>

        <DetailSection
          title="Install"
          intro={`${PUBLIC_PACKAGE_NOTE} Until release, contributors should build and run the CLI from this repository.`}
        >
          <CopyCommand command={component.install} />
        </DetailSection>

        <div className="grid border-t border-foreground/14 md:grid-cols-2">
          <DetailColumn title="Anatomy" items={component.anatomy} />
          <DetailColumn title="States" items={component.states} />
        </div>

        <DetailSection
          title="API"
          intro="The public surface is intentionally small. Runtime concerns stay outside the component."
        >
          <div className="overflow-x-auto border border-foreground/14">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead className="bg-foreground/[0.035] font-mono text-xs text-muted">
                <tr>
                  <th className="p-3 font-medium">Prop</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {component.api.map((item) => (
                  <tr key={item.name}>
                    <td className="p-3 font-mono text-xs text-accent">{item.name}</td>
                    <td className="p-3 font-mono text-xs">{item.type}</td>
                    <td className="p-3 text-muted">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailSection>

        <div className="grid border-t border-foreground/14 md:grid-cols-2">
          <DetailColumn title="Accessibility" items={component.accessibility} />
          <DetailColumn title="Tradeoffs" items={component.tradeoffs} />
        </div>

        <DetailSection
          title="Source and tests"
          intro="These registry files are the canonical copy-owned source installed into your application. The preview uses @agents-sdk/ui as a separate reference; inspect the registry source before installation."
        >
          <dl className="grid gap-4 font-mono text-xs sm:grid-cols-2">
            <div>
              <dt className="text-muted">Canonical registry source</dt>
              <dd className="mt-1 break-all text-foreground">{component.source}</dd>
            </div>
            <div>
              <dt className="text-muted">Canonical registry test</dt>
              <dd className="mt-1 break-all text-foreground">{component.tests}</dd>
            </div>
          </dl>
        </DetailSection>
      </article>
    </CatalogShell>
  );
}

function previewFor(slug: ComponentEntry["slug"]) {
  if (slug === "agent-chat") return <AgentChatPreview />;
  if (slug === "human-approval") return <HumanApprovalPreview />;
  return <ArtifactWorkspacePreview />;
}

function DetailSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-foreground/14 py-9 first:border-t-0">
      <h2 className="text-xl font-semibold tracking-[-0.025em]">{title}</h2>
      {intro ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{intro}</p> : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}

function DetailColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-b border-foreground/14 py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-foreground/14 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
