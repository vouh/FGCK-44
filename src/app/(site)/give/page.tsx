import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission and work of Full Gospel Church Githurai 44 through tithes and offerings.",
};

function PaymentMethodCard({
  icon,
  title,
  children,
  accentColor = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accentColor?: "blue" | "green" | "emerald";
}) {
  const colors = {
    blue: "from-blue-500 to-blue-700 bg-blue-50 border-blue-100",
    green: "from-green-500 to-green-700 bg-green-50 border-green-100",
    emerald: "from-emerald-500 to-emerald-700 bg-emerald-50 border-emerald-100",
  };

  return (
    <div className={`group relative overflow-hidden rounded-3xl border p-1 transition-all hover:scale-[1.02] hover:shadow-xl ${colors[accentColor]}`}>
      <div className="rounded-[calc(1.5rem-1px)] bg-white p-6 h-full">
        <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[accentColor]} text-white shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-black text-slate-900 leading-tight">{title}</h3>
        <div className="mt-4 space-y-3">{children}</div>
      </div>
    </div>
  );
}

export default function GivePage() {
  return (
    <PageShell title="Give" description="Support the mission and ministry of Full Gospel Church Githurai 44.">
      {/* Hero */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-blue-950 p-8 text-white shadow-2xl md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-900/40 blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black md:text-5xl">Partner With Us</h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed md:text-xl">
            Your generosity enables us to spread the Gospel, serve our community, and build God&apos;s kingdom.
            Every gift, no matter the size, makes a difference.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-5 py-4 border border-white/20">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-300">Tithes &amp; Offerings</div>
              <div className="mt-1 text-xl font-black">Spiritual Growth</div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-5 py-4 border border-white/20">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-300">Building Fund</div>
              <div className="mt-1 text-xl font-black">Development</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 className="text-2xl font-black text-slate-900">Payment Methods</h3>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <PaymentMethodCard
          accentColor="blue"
          icon={
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          title="Tithes (Paybill)"
        >
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Paybill No:</span>
              <span className="text-xl font-black text-blue-900">544600</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Account No:</span>
              <span className="text-xl font-black text-blue-900">T773330#NAME</span>
            </div>
          </div>
          <p className="px-1 text-xs font-medium text-slate-500 leading-relaxed">
            M-Pesa → Lipa na M-Pesa → Paybill. Replace <span className="text-blue-600 font-bold">NAME</span> with your first and last name.
          </p>
        </PaymentMethodCard>

        <PaymentMethodCard
          accentColor="emerald"
          icon={
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          title="Offerings (Paybill)"
        >
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Paybill No:</span>
              <span className="text-xl font-black text-emerald-900">544600</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Account No:</span>
              <span className="text-xl font-black text-emerald-900">F773330#NAME</span>
            </div>
          </div>
          <p className="px-1 text-xs font-medium text-slate-500 leading-relaxed">
            M-Pesa → Lipa na M-Pesa → Paybill. Replace <span className="text-emerald-600 font-bold">NAME</span> with your first and last name.
          </p>
        </PaymentMethodCard>

        <PaymentMethodCard
          accentColor="blue"
          icon={
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          title="Development (Paybill)"
        >
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Paybill No:</span>
              <span className="text-xl font-black text-blue-900">544600</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Account No:</span>
              <span className="text-xl font-black text-blue-900">P773330#NAME</span>
            </div>
          </div>
          <p className="px-1 text-xs font-medium text-slate-500 leading-relaxed">
            Funds for church construction and facility maintenance projects.
          </p>
        </PaymentMethodCard>

        <PaymentMethodCard
          accentColor="green"
          icon={
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="M-PESA Send Money"
        >
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Mobile No:</span>
              <span className="text-xl font-black text-green-900">0113788919</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Recipient:</span>
              <span className="text-base font-black text-green-900 uppercase">FGCK Githurai 44</span>
            </div>
          </div>
          <p className="px-1 text-xs font-medium text-slate-500 leading-relaxed">
            Directly send contribution to the church mobile number.
          </p>
        </PaymentMethodCard>
      </div>

      {/* Note */}
      <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center shadow-inner">
        <p className="text-sm text-slate-600">
          For any inquiries regarding giving or official receipts, please visit the church office or call 
          <a href="tel:0113788919" className="ml-1 font-bold text-blue-900 hover:underline">0113788919</a>.
        </p>
      </div>
    </PageShell>
  );
}
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Paybill:</span>
              <span className="font-bold text-slate-900">544600</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-slate-500">Account:</span>
              <span className="font-bold text-slate-900">P77330#NAME</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Replace NAME with your name.</p>
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
