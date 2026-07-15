import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentDetail } from "@/components/component-detail";
import { componentCollection, getComponent } from "@/lib/catalog";

export function generateStaticParams() {
  return componentCollection.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const component = getComponent((await params).slug);
  if (!component) return {};
  return { title: component.name, description: component.summary };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const component = getComponent((await params).slug);
  if (!component) notFound();
  return <ComponentDetail component={component} />;
}
