import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title="Ministry"
      description={
        <>
          Placeholder ministry detail for <span className="font-semibold text-slate-900">{slug}</span>.
        </>
      }
    >
      <div className="grid gap-4 rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="grid gap-1 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">Meeting times:</span> (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Leader contact:</span> (placeholder)
          </div>
        </div>
        <div>
          <div className="text-sm font-extrabold text-blue-950">Description</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">(Placeholder) Ministry description goes here.</p>
        </div>
        <Link href="/ministries" className="text-sm font-semibold text-blue-900">
          ← Back to ministries
        </Link>
      </div>
    </PageShell>
  );
}
