"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getEvents, Event } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const events = await getEvents();
        const found = events.find((e) => e.id === params.id);
        setEvent(found || null);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [params.id]);

  if (loading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </PageShell>
    );
  }

  if (!event) {
    return (
      <PageShell title="Event Not Found" description="">
        <div className="text-center py-12">
          <p className="text-slate-600">This event could not be found.</p>
          <Link href="/events" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to events
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={event.title}
      description={event.description || "Join us for this special event"}
    >
      <div className="grid gap-6">
        {/* Event Flyer/Image */}
        {event.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Event Details Card */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 shadow-sm">
          <div className="grid gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-900">Date:</span> {event.date || "TBD"}
            </div>
          </div>

          {event.description && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="text-sm font-extrabold text-blue-950">About This Event</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}



          <Link href="/events" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to events
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
