import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title="Project"
      description={
        <>
          Placeholder project detail for <span className="font-semibold text-slate-900">{slug}</span>.
        </>
      }
    >
      <div className="grid gap-4 rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="grid gap-1 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">Status:</span> Active/Completed (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Timeline:</span> (placeholder)
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Project images/gallery placeholder.</div>
        <div>
          <div className="text-sm font-extrabold text-blue-950">Summary</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">(Placeholder) Project details and impact notes.</p>
        </div>
        <div>
          <div className="text-sm font-extrabold text-blue-950">How to support</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            (Placeholder) Add giving methods, materials needed, or volunteer contact.
          </p>
        </div>
        <Link href="/projects" className="text-sm font-semibold text-blue-900">
          ← Back to projects
        </Link>
      </div>
    </PageShell>
  );
}
