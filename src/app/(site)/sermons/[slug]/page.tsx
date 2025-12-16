import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title="Sermon"
      description={
        <>
          Placeholder sermon detail for <span className="font-semibold text-slate-900">{slug}</span>.
        </>
      }
    >
      <div className="grid gap-4 rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="grid gap-1 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">Speaker:</span> (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Scripture:</span> (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Series / Topic:</span> (placeholder)
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Media placeholder — audio/video links and downloads will appear here.
        </div>

        <div>
          <div className="text-sm font-extrabold text-blue-950">Notes</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            (Placeholder) This will render sermon notes stored in Firestore.
          </p>
        </div>

        <Link href="/sermons" className="text-sm font-semibold text-blue-900">
          ← Back to sermons
        </Link>
      </div>
    </PageShell>
  );
}
