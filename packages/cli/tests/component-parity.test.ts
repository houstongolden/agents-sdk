import { describe, expect, it } from "vitest";
import type {
  AgentChatProps as PackageAgentChatProps,
  ArtifactWorkspaceProps as PackageArtifactWorkspaceProps,
  HumanApprovalProps as PackageHumanApprovalProps,
} from "@agents-sdk/ui";
import type { AgentChatProps as RegistryAgentChatProps } from "../../../registry/sources/components/agent-chat";
import type { ArtifactWorkspaceProps as RegistryArtifactWorkspaceProps } from "../../../registry/sources/components/artifact-workspace";
import type { HumanApprovalProps as RegistryHumanApprovalProps } from "../../../registry/sources/components/human-approval";

type Equal<Left, Right> =
  (<Type>() => Type extends Left ? 1 : 2) extends <Type>() => Type extends Right ? 1 : 2
    ? true
    : false;
type Assert<Type extends true> = Type;

type AgentChatParity = Assert<Equal<PackageAgentChatProps, RegistryAgentChatProps>>;
type ApprovalParity = Assert<Equal<PackageHumanApprovalProps, RegistryHumanApprovalProps>>;
type ArtifactParity = Assert<Equal<PackageArtifactWorkspaceProps, RegistryArtifactWorkspaceProps>>;

describe("registry component API parity", () => {
  it("typechecks against the public package contracts", () => {
    const proof: [AgentChatParity, ApprovalParity, ArtifactParity] = [true, true, true];
    expect(proof).toEqual([true, true, true]);
  });
});
