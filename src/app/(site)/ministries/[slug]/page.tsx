import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import ministriesData from "@/lib/ministries.json";
import type { Metadata } from "next";

type Ministry = {
  id: string;
  name: string;
  description: string;
  image: string;
  phone?: string;
  quote?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ministry = (ministriesData as Ministry[]).find((m) => m.id === slug);
  if (!ministry) {
    return {
      title: "Ministry not found",
    };
  }
  return {
    title: ministry.name,
    description: ministry.description,
    openGraph: {
      title: ministry.name,
      description: ministry.description,
      images: [ministry.image],
    },
  };
}

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = (ministriesData as Ministry[]).find((m) => m.id === slug);
  if (!ministry) notFound();

  return (
    <PageShell title={ministry.name} description={ministry.description}>
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-slate-100">
        <div className="relative h-56 sm:h-72 md:h-96">
          <Image src={ministry.image} alt={ministry.name} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-blue-950/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl font-black text-white md:text-3xl">{ministry.name}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">What We Do</h3>
          <p className="mt-3 leading-relaxed text-slate-600">{ministry.description}</p>

          {ministry.quote ? (
            <blockquote className="mt-6 rounded-2xl bg-slate-50 p-5 text-slate-700">
              <p className="italic">“{ministry.quote}”</p>
            </blockquote>
          ) : null}

          <div className="mt-6">
            <Link href="/ministries" className="text-sm font-semibold text-blue-900 hover:underline">
              ← Back to ministries
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Contact</h3>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <div className="font-semibold text-slate-900">Phone</div>
              {ministry.phone ? (
                <a className="text-blue-900 hover:underline" href={`tel:${ministry.phone}`}>
                  {ministry.phone}
                </a>
              ) : (
                <div className="text-slate-600">Call the church office for more details.</div>
              )}
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
