import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageShell
      title="Event"
      description={
        <>
          Placeholder event detail for <span className="font-semibold text-slate-900">{id}</span>.
        </>
      }
    >
      <div className="grid gap-4 rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="grid gap-1 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-900">Date/Time:</span> (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Location:</span> (placeholder)
          </div>
          <div>
            <span className="font-semibold text-slate-900">Contact:</span> (placeholder)
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Flyer image placeholder.</div>
        <div>
          <div className="text-sm font-extrabold text-blue-950">Description</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">(Placeholder) Event details go here.</p>
        </div>
        <Link href="/events" className="text-sm font-semibold text-blue-900">
          ← Back to events
        </Link>
      </div>
    </PageShell>
  );
}
