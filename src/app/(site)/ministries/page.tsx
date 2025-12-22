import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import ministriesData from "@/lib/ministries.json";
import { useRef } from "react";

function MinistryCard({ name, description, image, id }: { name: string; description: string; image: string; id: string }) {
  return (
    <Link
      href={`/ministries/${id}`}
      className="group min-w-[260px] max-w-xs flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md mx-2"
    >
      <div className="relative h-40 bg-slate-100">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-200">{name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600">{description}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-blue-900">Learn more →</span>
      </div>
    </Link>
  );
}

export default function MinistriesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const node = scrollRef.current;
    if (!node) return;
    const scrollAmount = 320; // px
    node.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <PageShell title="Ministries" description="Find your place in our church community. We have ministries for all ages and interests.">
      {/* Ministry Intro */}
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 p-8">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-blue-950">Get Involved</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Our ministries provide opportunities for fellowship, spiritual growth, and service.
              Whether you&apos;re looking to serve, learn, or connect, there&apos;s a place for you.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              Contact Us to Join
            </Link>
          </div>
          <div className="relative h-48 overflow-hidden rounded-xl">
            <Image src="/images/placeholder-ministry.svg" alt="Ministries" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Ministry Horizontal Scroll with Arrows */}
      <div className="relative">
        <button
          aria-label="Scroll ministries left"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-slate-200 rounded-full shadow p-2 hover:bg-blue-100 transition hidden md:block"
          style={{ marginLeft: '-1.5rem' }}
        >
          <svg className="w-6 h-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {ministriesData.map((m) => (
            <MinistryCard key={m.id} {...m} />
          ))}
        </div>
        <button
          aria-label="Scroll ministries right"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-slate-200 rounded-full shadow p-2 hover:bg-blue-100 transition hidden md:block"
          style={{ marginRight: '-1.5rem' }}
        >
          <svg className="w-6 h-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </PageShell>
  );
}
