import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getEvents } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const events = await getEvents();
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
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
            {event.time && (
              <div>
                <span className="font-semibold text-slate-900">Time:</span> {event.time}
              </div>
            )}
            <div>
              <span className="font-semibold text-slate-900">Location:</span> {event.location || "To be announced"}
            </div>
            {event.contact && (
              <div>
                <span className="font-semibold text-slate-900">Contact:</span> {event.contact}
              </div>
            )}
          </div>

          {event.description && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="text-sm font-extrabold text-blue-950">About This Event</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {event.registrationUrl && (
            <div className="mt-6">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
              >
                Register Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
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
