import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { placeholderEvents } from "@/lib/placeholders";
import { site } from "@/lib/site";

function EventCard({
  title,
  subtitle,
  dateLabel,
  id,
}: {
  title: string;
  subtitle?: string;
  dateLabel?: string;
  id: string;
}) {
  return (
    <Link
      href={`/events/${id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 bg-slate-100">
        <Image src="/images/placeholder-event.svg" alt={title} fill className="object-cover" />
        <div className="absolute right-4 top-4 rounded-lg bg-white px-3 py-2 text-center shadow-md">
          <div className="text-xs font-semibold uppercase text-slate-500">Dec</div>
          <div className="text-xl font-black text-blue-900">15</div>
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-blue-600">{dateLabel}</span>
        <h3 className="mt-1 font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Githurai 44
        </div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  return (
    <PageShell title="Events & Calendar" description="Stay updated with our weekly services, special gatherings, and community outreach events.">
      {/* Weekly Services Banner */}
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 p-8 text-white">
        <h2 className="text-2xl font-black">Weekly Services</h2>
        <p className="mt-2 text-white/80">Join us every week for worship, prayer, and fellowship.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.serviceTimes.map((t) => (
            <div key={t.label} className="rounded-xl bg-white/10 p-4">
              <div className="text-sm font-bold">{t.label}</div>
              <div className="mt-1 text-xl font-black text-blue-200">{t.time}</div>
            </div>
          ))}
          <div className="rounded-xl bg-white/10 p-4">
            <div className="text-sm font-bold">Location</div>
            <div className="mt-1 text-sm text-white/80">{site.contact.addressLine}</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Upcoming Events</h3>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderEvents.map((event) => (
          <EventCard key={event.id} {...event} id={event.id} />
        ))}
      </div>
    </PageShell>
  );
}
