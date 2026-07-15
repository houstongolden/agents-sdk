import type { Metadata } from "next";
import { DemoSession } from "@/components/demo-session";

export const metadata: Metadata = { title: "Reference build" };

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const query = await searchParams;
  const prompt = typeof query.prompt === "string" ? query.prompt : undefined;
  return <DemoSession {...(prompt ? { initialPrompt: prompt } : {})} />;
}
