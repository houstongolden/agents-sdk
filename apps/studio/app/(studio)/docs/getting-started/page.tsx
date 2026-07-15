import type { Metadata } from "next";
import Link from "next/link";
import { Command, DefinitionList, DocPage, DocSection } from "@/components/doc-page";
import {
  LOCAL_CLI_BUILD_COMMAND,
  LOCAL_CLI_LIST_COMMAND,
  PUBLIC_PACKAGE_NOTE,
} from "@/lib/catalog";

export const metadata: Metadata = { title: "Getting started" };

export default function GettingStartedPage() {
  return (
    <DocPage
      kind="Docs"
      title="Getting started"
      summary="Add one source-owned component, connect host adapters, and verify the boundary before adding orchestration."
    >
      <DocSection title="Pre-release access">
        <p>{PUBLIC_PACKAGE_NOTE}</p>
        <p>From this repository, build the CLI and confirm the bundled registry locally:</p>
        <Command>{LOCAL_CLI_BUILD_COMMAND}</Command>
        <Command>{LOCAL_CLI_LIST_COMMAND}</Command>
      </DocSection>
      <DocSection title="Create or open a React application">
        <p>
          Agents SDK currently targets React 18 or newer. The registry writes source into your
          repository so you can review and modify it.
        </p>
      </DocSection>
      <DocSection title="Initialize source ownership">
        <Command>npx @agents-sdk/cli@latest init .</Command>
        <p>
          Init creates agents-sdk.json with source destinations and an empty install ledger. It
          refuses to replace an existing configuration.
        </p>
      </DocSection>
      <DocSection title="Add Agent Chat">
        <Command>npx @agents-sdk/cli@latest add agent-chat</Command>
        <p>
          Add resolves registry dependencies, refuses non-identical existing targets, writes owned
          source, and records file hashes. If a write fails mid-install, the CLI restores files and
          the ledger to their prior state.
        </p>
      </DocSection>
      <DocSection title="Review source state">
        <Command>npx @agents-sdk/cli@latest diff</Command>
        <p>
          Diff uses the recorded hashes to identify current, locally modified, missing, and
          update-available files. It never overwrites the installed source.
        </p>
      </DocSection>
      <DocSection title="Connect the boundaries">
        <DefinitionList
          items={[
            {
              term: "messages",
              detail: "Map durable or streamed UI messages into user, assistant, and tool roles.",
            },
            {
              term: "composer",
              detail: "Supply your controlled input, submit, stop, and attachment behavior.",
            },
            {
              term: "transport",
              detail: "Keep provider and transport code in your application layer.",
            },
            {
              term: "side effects",
              detail: "Route consequential tools through an authenticated approval boundary.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Verify before extending">
        <Command>pnpm typecheck && pnpm test</Command>
        <p>
          Then review the{" "}
          <Link href="/patterns/approval-gates" className="text-accent hover:underline">
            approval gate pattern
          </Link>{" "}
          before enabling external writes.
        </p>
      </DocSection>
    </DocPage>
  );
}
