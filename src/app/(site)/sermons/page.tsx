"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
// import PageTracker from "@/components/site/PageTracker"; // removed tracking
import { useState, useEffect } from "react";
import { getSermons, Sermon, slugify } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

function SermonCard({
  title,
  description,
  date,
  image,
  youtube,
  slug,
}: {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  youtube?: string;
  slug?: string;
}) {
  const youtubeId = youtube?.split("/").pop()?.split("?")[0];
  const thumbnail = image || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : undefined);

  return (
    <Link
      href={`/sermons/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 bg-slate-100">
        <Image
          src={thumbnail || "/images/placeholder-sermon.svg"}
          alt={title}
          fill
          className="object-contain sm:object-cover bg-slate-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <div className="rounded-full bg-white p-4">
            <svg className="h-8 w-8 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
          <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-900">
            {date || "No date"}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
            </svg>
            Audio
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notes
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSermons() {
      try {
        const data = await getSermons();
        setSermons(data);
      } catch (error) {
        console.error("Error loading sermons:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSermons();
  }, []);

  const featuredSermon = sermons[0];
  const restSermons = sermons.slice(1);

  const featuredYoutubeId = featuredSermon?.youtube?.split("/").pop()?.split("?")[0];
  const featuredThumb = featuredSermon?.image || (featuredYoutubeId ? `https://img.youtube.com/vi/${featuredYoutubeId}/maxresdefault.jpg` : undefined);

  return (
    <PageShell title="Sermons" description="Listen to inspiring messages from our pastors. Browse by topic, speaker, or series.">
      {/* Tracking removed */}
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : sermons.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-slate-600">No sermons available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Check back soon for new messages!</p>
        </div>
      ) : (
        <>
          {/* Featured Sermon */}
          {featuredSermon && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 text-white">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredThumb || "/images/placeholder-sermon.svg"}
                    alt={featuredSermon.title}
                    fill
                    className="object-contain sm:object-cover bg-blue-900"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">Featured Sermon</span>
                  <h2 className="mt-3 text-2xl font-black">{featuredSermon.title}</h2>
                  <p className="mt-3 text-white/80">{featuredSermon.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full bg-white/10 px-3 py-1">{featuredSermon.date || "No date"}</span>
                  </div>
                  <Link
                    href={`/sermons/${slugify(featuredSermon.title)}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-950 transition hover:bg-blue-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sermon Grid */}
          <div className="mb-6 mt-10">
            <h3 className="text-xl font-bold text-slate-900">All Sermons</h3>
          </div>

          {restSermons.length === 0 && sermons.length === 1 ? (
            <p className="mt-4 text-slate-600">More sermons coming soon.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(restSermons.length > 0 ? restSermons : sermons).map((sermon) => (
                <SermonCard 
                  key={sermon.id} 
                  title={sermon.title}
                  description={sermon.description}
                  date={sermon.date}
                  image={sermon.image}
                  youtube={sermon.youtube}
                  slug={slugify(sermon.title)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
