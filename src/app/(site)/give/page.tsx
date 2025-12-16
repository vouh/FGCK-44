import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

function PaymentMethodCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

export default function GivePage() {
  return (
    <PageShell title="Give" description="Support the mission and ministry of Full Gospel Church Githurai 44.">
      {/* Hero */}
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-black md:text-3xl">Partner With Us</h2>
          <p className="mt-4 text-lg text-white/80">
            Your generosity enables us to spread the Gospel, serve our community, and build God&apos;s kingdom.
            Every gift makes a difference.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-xs font-semibold text-white/70">Tithes &amp; Offerings</div>
              <div className="text-lg font-bold">Sunday Service</div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-xs font-semibold text-white/70">Building Fund</div>
              <div className="text-lg font-bold">Development Project</div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-xs font-semibold text-white/70">Missions</div>
              <div className="text-lg font-bold">Outreach Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 className="text-xl font-bold text-slate-900">Payment Methods</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PaymentMethodCard
          icon={
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          title="M-Pesa Paybill"
        >
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Paybill:</span>
              <span className="font-bold text-slate-900">(placeholder)</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-slate-500">Account:</span>
              <span className="font-bold text-slate-900">(placeholder)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Go to M-Pesa → Lipa na M-Pesa → Paybill</p>
        </PaymentMethodCard>

        <PaymentMethodCard
          icon={
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          title="Bank Transfer"
        >
          <div className="rounded-lg bg-slate-50 p-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Bank:</span>
              <span className="font-bold text-slate-900">(placeholder)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Account:</span>
              <span className="font-bold text-slate-900">(placeholder)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Branch:</span>
              <span className="font-bold text-slate-900">(placeholder)</span>
            </div>
          </div>
        </PaymentMethodCard>

        <PaymentMethodCard
          icon={
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="In-Person"
        >
          <p>Give your tithes and offerings during our Sunday services or visit the church office.</p>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-xs font-semibold text-slate-500">Office Hours</div>
            <div className="font-bold text-slate-900">Mon-Fri: 9AM - 5PM</div>
          </div>
        </PaymentMethodCard>
      </div>

      {/* Scripture */}
      <div className="mt-12 rounded-2xl bg-slate-100 p-8 text-center">
        <blockquote className="text-lg italic text-slate-700">
          &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under
          compulsion, for God loves a cheerful giver.&rdquo;
        </blockquote>
        <cite className="mt-4 block text-sm font-semibold text-slate-900">2 Corinthians 9:7</cite>
      </div>

      {/* Contact CTA */}
      <div className="mt-8 text-center">
        <p className="text-slate-600">Have questions about giving?</p>
        <Link href="/contact" className="mt-2 inline-block text-sm font-semibold text-blue-900 hover:underline">
          Contact our finance team →
        </Link>
      </div>
    </PageShell>
  );
}
