import Link from "next/link";
import type { PropsWithChildren } from "react";

const nav = [
  { label: "Overview", href: "/dashboard" },
  { label: "Inbox", href: "/dashboard/inbox" },
  { label: "Blog", href: "/dashboard/blog" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Sermons", href: "/dashboard/sermons" },
  { label: "Events", href: "/dashboard/events" },
];

export function DashboardShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="border-b border-blue-900/10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-sm font-extrabold tracking-tight text-blue-950">FGCK Admin Dashboard</div>
          <Link href="/" className="text-sm font-semibold text-blue-900">
            View site
          </Link>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-blue-900/10 bg-white p-3">
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
