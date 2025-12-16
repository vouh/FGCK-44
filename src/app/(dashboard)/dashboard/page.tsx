import { AuthPanel } from "@/features/auth/AuthPanel";

export default function DashboardHome() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="text-2xl font-black tracking-tight text-blue-950">Dashboard</div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Placeholder admin area for managing sermons, events, ministries, projects, blog posts, pages, and media.
        </p>
      </div>

      <AuthPanel />

      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="text-sm font-extrabold text-blue-950">Next steps</div>
        <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm text-slate-600">
          <li>Connect Firebase project and add env vars.</li>
          <li>Enforce role-based access and Firestore/Storage rules.</li>
          <li>Replace placeholders with Firestore-powered CRUD.</li>
        </ul>
      </div>
    </div>
  );
}
