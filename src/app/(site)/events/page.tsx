"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";
import { useState, useEffect } from "react";
import { getEvents, Event } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return { day, month };
}

function EventCard({
  title,
  description,
  date,
  image,
  id,
  category,
}: {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  id: string;
  category?: Event["category"];
}) {
  const dateInfo = date ? formatDate(date) : { day: "--", month: "TBD" };
  const categoryLabel = category === "announcement" ? "Announcement" : "Event";
  
  return (
    <Link
      href={`/events/${id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 bg-slate-100">
        <Image 
          src={image || "/images/placeholder-event.svg"} 
          alt={title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
          {categoryLabel}
        </div>
        <div className="absolute right-4 top-4 rounded-lg bg-white px-3 py-2 text-center shadow-md">
          <div className="text-xs font-semibold uppercase text-slate-500">{dateInfo.month}</div>
          <div className="text-xl font-black text-blue-900">{dateInfo.day}</div>
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-blue-600">{date || "Date TBD"}</span>
        <h3 className="mt-1 font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{description}</p>
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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Event["category"][]>([
    "event",
    "announcement",
  ]);
  const [filterValue, setFilterValue] = useState<"all" | "event" | "announcement">("all");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleFilterChange = (value: "all" | "event" | "announcement") => {
    setFilterValue(value);
    if (value === "all") {
      setSelectedCategories(["event", "announcement"]);
    } else {
      setSelectedCategories([value]);
    }
  };

  const filteredEvents = events.filter((event) =>
    selectedCategories.includes(event.category ?? "event")
  );

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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-900">Upcoming Events & Announcements</h3>
        <div className="w-full sm:w-48">
          <select
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value as "all" | "event" | "announcement")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-semibold text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231e293b' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              paddingRight: "2.5rem",
            }}
          >
            <option value="all">Events & Announcements</option>
            <option value="event">Events Only</option>
            <option value="announcement">Announcements Only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600">No items match these filters.</p>
          <p className="mt-2 text-sm text-slate-500">Try selecting both Events and Announcements.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              id={event.id || ""}
              title={event.title}
              description={event.description}
              date={event.date}
              image={event.image}
              category={event.category}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
