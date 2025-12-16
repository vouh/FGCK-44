import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

export default function NewHerePage() {
  return (
    <PageShell title="Plan Your Visit" description="We'd love to welcome you this Sunday. Here's everything you need to know.">
      {/* Welcome Hero */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 text-white">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">You&apos;re Welcome Here</span>
            <h2 className="mt-3 text-3xl font-black">We Can&apos;t Wait to Meet You</h2>
            <p className="mt-4 text-lg text-white/80">
              Whether you&apos;re exploring faith or looking for a church home, you&apos;ll find a warm,
              welcoming community at FGCK Githurai 44.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-fit rounded-lg bg-white px-6 py-3 text-sm font-bold text-blue-950 transition hover:bg-blue-50"
            >
              Let Us Know You&apos;re Coming
            </Link>
          </div>
          <div className="relative hidden h-64 md:block md:h-auto">
            <Image src="/images/hero-bg.svg" alt="Welcome" fill className="object-cover opacity-50" />
          </div>
        </div>
      </div>

      {/* Service Times */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Service Times</h3>
          <ul className="mt-4 space-y-3">
            {site.serviceTimes.map((t) => (
              <li key={t.label} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-slate-600">{t.label}</span>
                <span className="font-bold text-slate-900">{t.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Location</h3>
          <p className="mt-4 text-slate-600">{site.contact.addressLine}</p>
          <div className="mt-4 h-32 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-500">
            Map will be embedded here
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Questions?</h3>
          <p className="mt-4 text-slate-600">We&apos;re here to help. Reach out anytime.</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="font-semibold text-slate-900">{site.contact.phone}</div>
            <div className="text-slate-600">{site.contact.email}</div>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-slate-900">What to Expect</h3>
        <p className="mt-2 text-slate-600">Here&apos;s a quick guide for your first visit.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 font-bold">1</div>
            <div>
              <h4 className="font-bold text-slate-900">Arrive Early</h4>
              <p className="mt-1 text-sm text-slate-600">Come 10-15 minutes early to find parking and get settled.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 font-bold">2</div>
            <div>
              <h4 className="font-bold text-slate-900">Come As You Are</h4>
              <p className="mt-1 text-sm text-slate-600">No dress code. Wear what makes you comfortable.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 font-bold">3</div>
            <div>
              <h4 className="font-bold text-slate-900">Kids Are Welcome</h4>
              <p className="mt-1 text-sm text-slate-600">We have children&apos;s ministry during the service.</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 font-bold">4</div>
            <div>
              <h4 className="font-bold text-slate-900">Meet Our Ushers</h4>
              <p className="mt-1 text-sm text-slate-600">Our friendly team will help you find a seat and answer questions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-slate-100 p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900">Ready to Visit?</h3>
        <p className="mt-2 text-slate-600">We can&apos;t wait to meet you and your family.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
            Contact Us
          </Link>
          <Link href="/events" className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-white">
            See Upcoming Events
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
