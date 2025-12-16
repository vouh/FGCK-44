import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { placeholderSermons } from "@/lib/placeholders";

export default function SermonArchivePage() {
  return (
    <PageShell
      title="Sermon Archive"
      description="Placeholder search and filters — later powered by Firestore queries (date, speaker, series, topic)."
    >
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Speaker</span>
            <select className="h-11 rounded-md border border-blue-900/15 px-3">
              <option>All (placeholder)</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Series</span>
            <select className="h-11 rounded-md border border-blue-900/15 px-3">
              <option>All (placeholder)</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Topic</span>
            <select className="h-11 rounded-md border border-blue-900/15 px-3">
              <option>All (placeholder)</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Date</span>
            <input className="h-11 rounded-md border border-blue-900/15 px-3" placeholder="YYYY-MM" />
          </label>
        </div>

        <div className="mt-6 grid gap-3">
          {placeholderSermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.slug}`}
              className="rounded-xl border border-blue-900/10 p-4 transition hover:border-blue-900/20"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-sm font-extrabold text-blue-950">{sermon.title}</div>
                <div className="text-xs font-semibold text-slate-500">{sermon.dateLabel}</div>
              </div>
              <div className="mt-1 text-sm text-slate-600">{sermon.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
