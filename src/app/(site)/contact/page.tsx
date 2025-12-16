import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" description="Have questions? We'd love to hear from you. Reach out anytime.">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 bg-slate-100">
              <Image src="/images/hero-bg.svg" alt="FGCK Githurai 44" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-bold text-white">FGCK Githurai 44</h3>
                <p className="text-sm text-white/80">Jesus Healing Center</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Address</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.addressLine}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Phone</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-500">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm">Google Maps embed will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
          <p className="mt-2 text-sm text-slate-600">We&apos;ll get back to you as soon as possible.</p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Full Name</label>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Phone (optional)</label>
              <input
                type="tel"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Message</label>
              <textarea
                className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-blue-900 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              Send Message
            </button>
            <p className="text-center text-xs text-slate-500">
              Form submission will be connected to Firestore + email notifications.
            </p>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
