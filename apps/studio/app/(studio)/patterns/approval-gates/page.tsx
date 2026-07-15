import type { Metadata } from "next";
import { DefinitionList, DocPage, DocSection } from "@/components/doc-page";

export const metadata: Metadata = { title: "Approval gates" };

export default function ApprovalGatesPage() {
  return (
    <DocPage
      kind="Pattern"
      title="Approval gates"
      summary="Pause a consequential tool call, bind a human decision to its exact payload, then resume once without re-planning the action."
    >
      <DocSection title="Invariant">
        <p>
          The approved payload must be the executed payload. Store a digest of the action,
          arguments, actor, tenant, expiry, and requested scopes before presenting the decision UI.
        </p>
      </DocSection>
      <DocSection title="Execution sequence">
        <DefinitionList
          items={[
            {
              term: "Prepare",
              detail: "Validate arguments and produce an immutable action request. Do not execute.",
            },
            {
              term: "Pause",
              detail: "Persist the run checkpoint and approval request with an expiry.",
            },
            {
              term: "Decide",
              detail:
                "Authenticate the reviewer and record approve or reject against the stored digest.",
            },
            {
              term: "Resume",
              detail:
                "Reload the checkpoint, re-check authorization and expiry, then execute the stored payload once.",
            },
            {
              term: "Record",
              detail: "Attach the operation ID, result, and decision evidence to the run ledger.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Failure modes">
        <p>
          Reject changed arguments, expired decisions, revoked scopes, duplicate resumes, mismatched
          tenants, and approvals issued by an unauthorized actor. Never treat a client-side button
          click as the authorization boundary.
        </p>
      </DocSection>
      <DocSection title="Verification">
        <p>
          Test approve, reject, expiry, payload tampering, replay, network retry, actor removal, and
          a crash between external execution and local acknowledgement.
        </p>
      </DocSection>
    </DocPage>
  );
}
