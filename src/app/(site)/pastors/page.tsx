import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

export default function PastorsPage() {
  return (
    <PageShell
      title="Pastor's Office"
      description="Meet our senior pastor and learn about pastoral care at FGCK Githurai 44."
    >
      {/* Pastor Profile */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-xl animate-fade-in">
        <div className="grid lg:grid-cols-2">
          {/* Pastor Image */}
          <div className="relative h-80 lg:h-full min-h-[400px]">
            <Image
              src="/images/pastor.png"
              alt="Pastor John Ngaruiya"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-blue-950/50" />
          </div>

          {/* Pastor Info */}
          <div className="relative flex flex-col justify-center p-8 lg:p-12">
            <span className="inline-flex w-fit rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Church Pastor
            </span>
            <h2 className="mt-4 text-3xl font-black lg:text-4xl">Pastor John Ngaruiya</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Pastor John Ngaruiya has been faithfully serving as the Pastor of FGCK Githurai 44 
              (Jesus Healing Center) for many years. His dedication to preaching the Word of God and 
              shepherding our congregation has been a blessing to countless families in our community.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              With a heart for souls and a passion for spiritual growth, Pastor Ngaruiya leads our 
              church with wisdom, love, and unwavering faith. Under his leadership, our church has 
              grown into a vibrant community of believers committed to serving Christ.
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Office Hours & Services */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Office Hours */}
        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Office Hours</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-slate-600">Tuesday & Thursday</span>
              <span className="font-bold text-slate-900">8:00 AM - 5:00 PM</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-slate-600">Other Hours</span>
              <span className="font-bold text-slate-900">By Appointment</span>
            </li>
          </ul>
        </div>

        {/* Pastoral Services */}
        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Pastoral Services</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Spiritual Counseling
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Marriage Counseling
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Prayer Sessions
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Hospital Visitation
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Home Blessings
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Funeral Services
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500">✓</span> Wedding Ceremonies
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
            <svg className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Get in Touch</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <div className="font-semibold text-slate-900">Phone</div>
              <div className="text-slate-600">{site.contact.phone}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Email</div>
              <div className="text-slate-600">{site.contact.email}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Location</div>
              <div className="text-slate-600">{site.contact.addressLine}</div>
            </div>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-blue-800"
          >
            Schedule Appointment
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scripture Quote */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-slate-50 p-8 text-center">
        <blockquote className="text-lg italic text-slate-700">
          &ldquo;The Lord is my shepherd; I shall not want. He maketh me to lie down in green 
          pastures: he leadeth me beside the still waters. He restoreth my soul.&rdquo;
        </blockquote>
        <cite className="mt-4 block text-sm font-semibold text-slate-900">Psalm 23:1-3</cite>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-slate-900">Need Pastoral Care?</h3>
        <p className="mt-2 text-slate-600">
          Pastor Ngaruiya and our church family are here to support you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:scale-105"
          >
            Request Prayer
          </Link>
          <Link
            href="/new-here"
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-white hover:scale-105"
          >
            Visit Us This Sunday
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
