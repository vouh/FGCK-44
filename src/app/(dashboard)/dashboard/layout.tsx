import type { PropsWithChildren } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false, // Don't index admin pages
    follow: false,
  },
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <DashboardShell>{children}</DashboardShell>;
}
