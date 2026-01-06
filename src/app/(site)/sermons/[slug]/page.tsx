import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getSermons, slugify } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const sermons = await getSermons();
  const sermon = sermons.find((s) => slugify(s.title) === slug);

  if (!sermon) {
    notFound();
  }

  return (
    <PageShell
      title={sermon.title}
      description={sermon.description || "Listen to this powerful sermon"}
    >
      <div className="grid gap-6">
        {/* Hero Image */}
        {sermon.youtubeUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <iframe
              src={`https://www.youtube.com/embed/${sermon.youtubeUrl.split('/').pop()?.split('?')[0]}`}
              title={sermon.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Sermon Details Card */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 shadow-sm">
          <div className="grid gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-900">Speaker:</span> {sermon.speaker || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-slate-900">Date:</span> {sermon.date || "N/A"}
            </div>
            {sermon.scripture && (
              <div>
                <span className="font-semibold text-slate-900">Scripture:</span> {sermon.scripture}
              </div>
            )}
            {sermon.series && (
              <div>
                <span className="font-semibold text-slate-900">Series:</span> {sermon.series}
              </div>
            )}
          </div>

          {sermon.notes && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="text-sm font-extrabold text-blue-950">Notes</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {sermon.notes}
              </p>
            </div>
          )}

          {sermon.audioUrl && (
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900 mb-2">Audio</div>
              <audio controls className="w-full">
                <source src={sermon.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <Link href="/sermons" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to sermons
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
