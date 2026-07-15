import type { Metadata } from "next";
import { Command, DefinitionList, DocPage, DocSection } from "@/components/doc-page";
import {
  LOCAL_CLI_BUILD_COMMAND,
  LOCAL_CLI_LIST_COMMAND,
  PUBLIC_PACKAGE_NOTE,
} from "@/lib/catalog";

export const metadata: Metadata = { title: "CLI" };

export default function CliPage() {
  return (
    <DocPage
      kind="Docs"
      title="CLI"
      summary="Initialize a source-owned install ledger, add registry items without overwriting local work, and inspect recorded file state."
    >
      <DocSection title="Pre-release access">
        <p>{PUBLIC_PACKAGE_NOTE}</p>
        <p>Contributors can run the implemented CLI from this repository:</p>
        <Command>{LOCAL_CLI_BUILD_COMMAND}</Command>
        <Command>{LOCAL_CLI_LIST_COMMAND}</Command>
      </DocSection>
      <DocSection title="Commands">
        <DefinitionList
          items={[
            {
              term: "init",
              detail:
                "Create agents-sdk.json with local paths and an install ledger. Refuse to overwrite an existing configuration.",
            },
            {
              term: "add <item>",
              detail:
                "Resolve registry dependencies in order, refuse conflicting targets, write source, and record file hashes.",
            },
            { term: "list", detail: "Show the names and types in the selected registry index." },
            {
              term: "diff",
              detail:
                "Compare installed files with recorded hashes and report current, modified, missing, or update-available.",
            },
            {
              term: "doctor",
              detail:
                "Run the file-state audit and return a failing exit code when any installed file is not current.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Initialize the ledger">
        <Command>npx @agents-sdk/cli@latest init .</Command>
        <p>
          Init writes agents-sdk.json. If that file already exists, the command exits without
          replacing it.
        </p>
      </DocSection>
      <DocSection title="Inspect the registry">
        <Command>npx @agents-sdk/cli@latest list</Command>
        <p>List prints each indexed item name and type from the resolved offline registry.</p>
      </DocSection>
      <DocSection title="Add a component">
        <Command>npx @agents-sdk/cli@latest add human-approval</Command>
        <p>
          Add computes source hashes before writing. Existing non-identical targets cause a conflict
          and no files are changed. A mid-install failure restores written files, the ledger, and
          directories created by that attempt.
        </p>
      </DocSection>
      <DocSection title="Inspect local changes">
        <Command>npx @agents-sdk/cli@latest diff</Command>
        <p>
          Diff detects local modifications and missing files from the hashes recorded when each item
          was added. It also reports when the selected registry contains different source.
        </p>
      </DocSection>
      <DocSection title="Check source state">
        <Command>npx @agents-sdk/cli@latest doctor</Command>
        <p>
          Doctor reports the same installed-file state and exits nonzero when any file differs. It
          does not overwrite local changes.
        </p>
      </DocSection>
      <DocSection title="Preview an add">
        <Command>npx @agents-sdk/cli@latest add artifact-workspace --dry-run</Command>
        <p>
          Dry-run returns dependency order and planned file statuses without writing source or the
          install ledger.
        </p>
      </DocSection>
    </DocPage>
  );
}
