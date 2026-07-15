import { openai } from "@ai-sdk/openai";
import { ToolLoopAgent, stepCountIs, tool } from "ai";
import { z } from "zod";
import { lookupOrder } from "./support-data.js";

export const supportAgent = new ToolLoopAgent({
  model: openai("gpt-4.1-mini"),
  instructions: "Resolve support questions with evidence. Never invent order state.",
  stopWhen: stepCountIs(5),
  tools: {
    lookupOrder: tool({
      description: "Look up the current status of an order.",
      inputSchema: z.object({ orderId: z.string().min(1) }),
      execute: async ({ orderId }) => lookupOrder(orderId),
    }),
    issueCredit: tool({
      description: "Stage a customer credit after explicit approval.",
      inputSchema: z.object({ orderId: z.string().min(1), amount: z.number().positive() }),
      needsApproval: true,
      execute: async ({ orderId, amount }) => ({
        status: "staged-for-host-adapter",
        orderId,
        amount,
      }),
    }),
  },
});
