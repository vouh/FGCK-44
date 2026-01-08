import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import ministriesData from "@/lib/ministries.json";
import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

type Ministry = {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  phone?: string;
  meetingHours?: string;
  classes?: { name: string; age: string }[];
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

  // Sort images into a "gallery" if multiple exist
  const gallery = ministry.images || [ministry.image];

  return (
    <PageShell title={ministry.name} description={ministry.description}>
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
        <div className="relative h-64 sm:h-80 md:h-[450px]">
          <ResponsiveImage
            src={ministry.image}
            alt={ministry.name}
            fill
            fit="containOnMobile"
            className="bg-slate-100"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="text-3xl font-black text-white md:text-5xl drop-shadow-lg">{ministry.name}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">About Us</h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{ministry.description}</p>

            {ministry.classes && (
              <div className="mt-8 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">Our Classes</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  {ministry.classes.map((c) => (
                    <div key={c.name} className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                      <div className="font-bold text-blue-900">{c.name}</div>
                      <div className="text-sm text-blue-700">{c.age}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ministry.quote ? (
              <blockquote className="mt-8 relative rounded-2xl bg-slate-50 p-8 text-slate-700 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-2 bg-blue-900" />
                <p className="relative z-10 text-xl italic leading-relaxed">“{ministry.quote}”</p>
              </blockquote>
            ) : null}
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">Gallery</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((img, i) => (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] ${
                      gallery.length === 1 ? "sm:col-span-2 h-96" : 
                      gallery.length === 3 && i === 0 ? "sm:col-span-2 h-80" : 
                      "h-64"
                    }`}
                  >
                    <ResponsiveImage
                      src={img}
                      alt={`${ministry.name} image ${i + 1}`}
                      fill
                      fit="contain"
                      className="bg-slate-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-start">
            <Link href="/ministries" className="inline-flex items-center gap-2 font-bold text-blue-900 hover:text-blue-700 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to ministries
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Information</h3>
            <div className="mt-6 space-y-6">
              {ministry.meetingHours && (
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Meeting Hours
                  </div>
                  <div className="mt-1 text-slate-600 pl-7">{ministry.meetingHours}</div>
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone
                </div>
                <div className="mt-1 pl-7">
                  {ministry.phone ? (
                    <a className="text-blue-900 font-medium hover:underline" href={`tel:${ministry.phone}`}>
                      {ministry.phone}
                    </a>
                  ) : (
                    <div className="text-slate-600">Call the church office</div>
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-95"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
