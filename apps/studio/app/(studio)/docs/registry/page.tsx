import type { Metadata } from "next";
import { DefinitionList, DocPage, DocSection } from "@/components/doc-page";
import { REGISTRY_ITEM_KINDS } from "@/lib/catalog";

export const metadata: Metadata = { title: "Registry model" };

export default function RegistryPage() {
  return (
    <DocPage
      kind="Docs"
      title="Registry model"
      summary="A registry item is a versioned source bundle with explicit dependencies, files, provenance, test metadata, and maturity."
    >
      <DocSection title="Manifest contract">
        <DefinitionList
          items={[
            {
              term: "id and version",
              detail: "Stable identity and a semver release for the item contract.",
            },
            {
              term: "kind",
              detail: `${REGISTRY_ITEM_KINDS.join(", ")}.`,
            },
            {
              term: "maturity",
              detail: "Experimental, preview, or stable. v0.1 UI items are preview.",
            },
            { term: "files", detail: "Destination-aware source entries with integrity metadata." },
            {
              term: "dependencies",
              detail:
                "Other registry item names plus runtime, development, and compatibility package maps.",
            },
            {
              term: "test metadata",
              detail: "A declared test command and the source paths it covers.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Ownership">
        <p>
          The registry owns the published manifest and canonical item source. The CLI records
          installed versions and file hashes. Your repository owns the installed copy and may change
          it. Production runtime state never belongs in a registry manifest.
        </p>
      </DocSection>
      <DocSection title="Trust boundary">
        <p>
          Treat manifests and their referenced source as code. The CLI validates safe relative
          targets and refuses non-identical existing files. Keep credentials out of manifests,
          registry source, and generated files.
        </p>
      </DocSection>
    </DocPage>
  );
}
