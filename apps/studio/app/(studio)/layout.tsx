import { SiteShell } from "@/components/site-shell";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
