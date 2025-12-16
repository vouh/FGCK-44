import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { placeholderMinistries } from "@/lib/placeholders";

function MinistryCard({ title, subtitle, slug }: { title: string; subtitle?: string; slug?: string }) {
  return (
    <Link
      href={`/ministries/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-40 bg-slate-100">
        <Image src="/images/placeholder-ministry.svg" alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-200">{title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600">{subtitle}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-blue-900">Learn more →</span>
      </div>
    </Link>
  );
}

export default function MinistriesPage() {
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

      {/* Ministry Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderMinistries.map((m) => (
          <MinistryCard key={m.id} title={m.title} subtitle={m.subtitle} slug={m.slug} />
        ))}
      </div>
    </PageShell>
  );
}
