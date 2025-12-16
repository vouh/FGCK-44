import type { PropsWithChildren } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader />
      <main className="min-h-[70dvh]">{children}</main>
      <SiteFooter />
    </div>
  );
}
