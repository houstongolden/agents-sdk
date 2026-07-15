import { ARTIFACT_SCHEMA_VERSION, type ArtifactSpec } from "@agents-sdk/ui";

export type DemoPhaseId = "understand" | "inspect" | "compose" | "verify";
export type DemoPhaseStatus = "pending" | "running" | "done";

export type DemoProgress = {
  id: DemoPhaseId;
  label: string;
  status: DemoPhaseStatus;
  detail: string;
};

export type DemoToolCall = {
  id: string;
  name: string;
  label: string;
  status: "running" | "complete";
  detail: string;
};

export type DemoStreamPart =
  | { type: "progress"; id: DemoPhaseId; status: DemoPhaseStatus; detail: string }
  | { type: "tool-call"; call: DemoToolCall }
  | { type: "artifact"; artifact: ArtifactSpec }
  | { type: "text-delta"; delta: string }
  | { type: "finish" };

export type DemoStreamEvent = { delayMs: number; part: DemoStreamPart };

export type DemoRunState = {
  status: "idle" | "running" | "complete" | "stopped";
  progress: DemoProgress[];
  toolCalls: DemoToolCall[];
  artifact: ArtifactSpec | null;
  response: string;
};

export const initialDemoProgress: DemoProgress[] = [
  { id: "understand", label: "Understand the outcome", status: "pending", detail: "Waiting" },
  { id: "inspect", label: "Inspect reusable contracts", status: "pending", detail: "Waiting" },
  { id: "compose", label: "Compose the starter", status: "pending", detail: "Waiting" },
  { id: "verify", label: "Verify the result", status: "pending", detail: "Waiting" },
];

export function createInitialDemoState(): DemoRunState {
  return {
    status: "idle",
    progress: initialDemoProgress.map((phase) => ({ ...phase })),
    toolCalls: [],
    artifact: null,
    response: "",
  };
}

export function applyDemoStreamPart(state: DemoRunState, part: DemoStreamPart): DemoRunState {
  switch (part.type) {
    case "progress":
      return {
        ...state,
        status: "running",
        progress: state.progress.map((phase) =>
          phase.id === part.id ? { ...phase, status: part.status, detail: part.detail } : phase,
        ),
      };
    case "tool-call": {
      const exists = state.toolCalls.some((call) => call.id === part.call.id);
      return {
        ...state,
        status: "running",
        toolCalls: exists
          ? state.toolCalls.map((call) => (call.id === part.call.id ? part.call : call))
          : [...state.toolCalls, part.call],
      };
    }
    case "artifact":
      return { ...state, status: "running", artifact: part.artifact };
    case "text-delta":
      return { ...state, status: "running", response: state.response + part.delta };
    case "finish":
      return { ...state, status: "complete" };
  }
}

export function createDemoSequence(prompt: string): DemoStreamEvent[] {
  const artifact = createDemoArtifact(prompt);
  return [
    {
      delayMs: 80,
      part: {
        type: "progress",
        id: "understand",
        status: "running",
        detail: "Turning the request into acceptance criteria",
      },
    },
    {
      delayMs: 420,
      part: {
        type: "progress",
        id: "understand",
        status: "done",
        detail: "Outcome and boundaries captured",
      },
    },
    {
      delayMs: 500,
      part: {
        type: "progress",
        id: "inspect",
        status: "running",
        detail: "Checking the UI, artifact, and verification contracts",
      },
    },
    {
      delayMs: 650,
      part: {
        type: "tool-call",
        call: {
          id: "tool-contracts",
          name: "inspect_contracts",
          label: "Inspect Agents SDK contracts",
          status: "running",
          detail: "Reading local package exports",
        },
      },
    },
    {
      delayMs: 1050,
      part: {
        type: "tool-call",
        call: {
          id: "tool-contracts",
          name: "inspect_contracts",
          label: "Inspect Agents SDK contracts",
          status: "complete",
          detail: "4 reusable boundaries selected",
        },
      },
    },
    {
      delayMs: 1120,
      part: {
        type: "progress",
        id: "inspect",
        status: "done",
        detail: "Reusable contracts selected",
      },
    },
    {
      delayMs: 1200,
      part: {
        type: "progress",
        id: "compose",
        status: "running",
        detail: "Building a versioned plan artifact",
      },
    },
    { delayMs: 1450, part: { type: "artifact", artifact } },
    {
      delayMs: 1550,
      part: {
        type: "progress",
        id: "compose",
        status: "done",
        detail: "Artifact emitted separately from chat text",
      },
    },
    {
      delayMs: 1650,
      part: {
        type: "progress",
        id: "verify",
        status: "running",
        detail: "Checking schema and deterministic gates",
      },
    },
    {
      delayMs: 1800,
      part: {
        type: "tool-call",
        call: {
          id: "tool-verify",
          name: "run_verification",
          label: "Run verification",
          status: "running",
          detail: "Validating typed artifact",
        },
      },
    },
    {
      delayMs: 2150,
      part: {
        type: "tool-call",
        call: {
          id: "tool-verify",
          name: "run_verification",
          label: "Run verification",
          status: "complete",
          detail: "Schema and smoke contract passed",
        },
      },
    },
    {
      delayMs: 2220,
      part: {
        type: "progress",
        id: "verify",
        status: "done",
        detail: "Deterministic verification passed",
      },
    },
    { delayMs: 2300, part: { type: "text-delta", delta: "The deterministic preview is ready. " } },
    {
      delayMs: 2460,
      part: {
        type: "text-delta",
        delta: "Chat, progress, tool calls, and the artifact remain separate typed state.",
      },
    },
    { delayMs: 2520, part: { type: "finish" } },
  ];
}

export function createDemoArtifact(prompt: string): ArtifactSpec {
  const request = prompt.trim() || "Build a reusable, verifiable agent application.";
  return {
    schemaVersion: ARTIFACT_SCHEMA_VERSION,
    id: "local-preview-build",
    title: "Fixture agent output",
    summary: request,
    status: "complete",
    blocks: [
      {
        id: "architecture",
        type: "markdown",
        body: "## Architecture\n\nThis browser-only fixture replays a fixed workflow. It demonstrates separate chat, progress, tool-call, and artifact states without claiming a model, transport, or persistence layer.",
      },
      {
        id: "contracts",
        type: "table",
        title: "Selected contracts",
        columns: [
          { key: "surface", label: "Surface" },
          { key: "contract", label: "Contract" },
        ],
        rows: [
          { surface: "Shell", contract: "Adapter-owned routing and session state" },
          { surface: "Stream", contract: "Discriminated local event parts" },
          { surface: "Artifact", contract: "agents-sdk.artifact/v1" },
          { surface: "Verification", contract: "Deterministic reducer and schema tests" },
        ],
      },
      {
        id: "next-actions",
        type: "task-list",
        title: "Production adapter steps",
        items: [
          { id: "runtime", label: "Connect a verified chat transport", status: "pending" },
          { id: "persistence", label: "Persist sessions and artifact versions", status: "pending" },
          { id: "approval", label: "Add approval for consequential writes", status: "pending" },
          { id: "local-proof", label: "Keep the deterministic fixture", status: "done" },
        ],
      },
    ],
  };
}
