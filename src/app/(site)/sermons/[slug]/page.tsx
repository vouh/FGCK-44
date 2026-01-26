"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getSermons, slugify, Sermon } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

export default function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSermon() {
      try {
        const sermons = await getSermons();
        const found = sermons.find((s) => slugify(s.title) === slug);
        setSermon(found || null);
      } catch (error) {
        console.error("Error loading sermon:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSermon();
  }, [slug]);

  if (loading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </PageShell>
    );
  }

  if (!sermon) {
    return (
      <PageShell title="Sermon Not Found" description="">
        <div className="text-center py-12">
          <p className="text-slate-600">This sermon could not be found.</p>
          <Link href="/sermons" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to sermons
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={sermon.title}
      description={sermon.description || "Listen to this powerful sermon"}
    >
      <div className="grid gap-6">
        {/* Hero Image */}
        {sermon.youtube && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <iframe
              src={getYoutubeEmbedUrl(sermon.youtube)}
              title={sermon.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Sermon Details Card */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 md:p-8 shadow-sm">
          <div className="grid gap-4 text-base text-slate-600">
            <div>
              <span className="font-semibold text-slate-900">Date:</span> {sermon.date || "N/A"}
            </div>
          </div>

          {sermon.description && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="text-base font-extrabold text-blue-950">Description</div>
              <p className="mt-3 text-base md:text-lg leading-relaxed md:leading-loose text-slate-700 whitespace-pre-wrap">
                {sermon.description}
              </p>
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
