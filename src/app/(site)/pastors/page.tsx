import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

const pastors = [
  {
    id: 1,
    name: "Pastor John Doe",
    title: "Senior Pastor",
    bio: "Pastor John has been serving at FGCK Githurai 44 for over 15 years. His passion for the Word of God and heart for the community has helped grow our church into a vibrant family of believers.",
    image: "/images/placeholder-person.svg",
    email: "pastor.john@fgckgithurai44.com",
    featured: true,
  },
  {
    id: 2,
    name: "Pastor Jane Wanjiku",
    title: "Associate Pastor",
    bio: "Pastor Jane oversees our women's ministry and counseling programs. Her compassionate leadership has touched countless lives in our congregation.",
    image: "/images/placeholder-person.svg",
    email: "pastor.jane@fgckgithurai44.com",
  },
  {
    id: 3,
    name: "Pastor David Kamau",
    title: "Youth Pastor",
    bio: "Pastor David leads our dynamic youth ministry, empowering the next generation to live for Christ. His energy and dedication inspire our young people.",
    image: "/images/placeholder-person.svg",
    email: "pastor.david@fgckgithurai44.com",
  },
  {
    id: 4,
    name: "Elder Mary Njeri",
    title: "Children's Ministry Director",
    bio: "Elder Mary has a special gift for teaching children about God's love. She leads our Sunday School and children's programs with creativity and joy.",
    image: "/images/placeholder-person.svg",
  },
  {
    id: 5,
    name: "Elder Peter Ochieng",
    title: "Worship Leader",
    bio: "Elder Peter leads our worship team with excellence. His heart for praise creates an atmosphere where people encounter God's presence.",
    image: "/images/placeholder-person.svg",
  },
  {
    id: 6,
    name: "Elder Grace Akinyi",
    title: "Outreach Coordinator",
    bio: "Elder Grace coordinates our community outreach programs, ensuring we are the hands and feet of Jesus in Githurai and beyond.",
    image: "/images/placeholder-person.svg",
  },
];

function PastorCard({
  pastor,
  featured = false,
}: {
  pastor: typeof pastors[0];
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-xl animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
        <div className="grid md:grid-cols-2">
          <div className="relative h-80 md:h-full">
            <Image
              src={pastor.image}
              alt={pastor.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-950/50 md:block hidden" />
          </div>
          <div className="relative flex flex-col justify-center p-8 md:p-12">
            <span className="inline-flex w-fit rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              {pastor.title}
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{pastor.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{pastor.bio}</p>
            {pastor.email && (
              <a
                href={`mailto:${pastor.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {pastor.email}
              </a>
            )}
            <Link
              href="/contact"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-blue-950 transition-all hover:bg-blue-50 hover:scale-105"
            >
              Schedule a Meeting
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group hover-lift overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100">
        <Image
          src={pastor.image}
          alt={pastor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {pastor.title}
        </span>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{pastor.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">{pastor.bio}</p>
        {pastor.email && (
          <a
            href={`mailto:${pastor.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </a>
        )}
      </div>
    </div>
  );
}

export default function PastorsPage() {
  const featuredPastor = pastors.find((p) => p.featured);
  const otherPastors = pastors.filter((p) => !p.featured);

  return (
    <PageShell
      title="Our Pastors"
      description="Meet the spiritual leaders who shepherd our congregation with love and dedication."
    >
      {/* Intro */}
      <div className="mb-10 text-center animate-fade-in">
        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
          Our pastoral team is committed to serving God and our community. They provide spiritual
          guidance, counseling, and leadership to help you grow in your faith journey.
        </p>
      </div>

      {/* Featured Pastor */}
      {featuredPastor && (
        <div className="mb-12">
          <PastorCard pastor={featuredPastor} featured />
        </div>
      )}

      {/* Leadership Team */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Leadership Team</h2>
        <p className="mt-2 text-slate-600">Our elders and ministry leaders.</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {otherPastors.map((pastor, i) => (
          <div
            key={pastor.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <PastorCard pastor={pastor} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-50 to-slate-50 p-8 text-center animate-fade-in">
        <h3 className="text-xl font-bold text-slate-900">Need Pastoral Care?</h3>
        <p className="mt-2 text-slate-600">
          Our pastors are here to support you through prayer, counseling, and guidance.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:scale-105"
          >
            Request Prayer
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-white hover:scale-105"
          >
            Schedule Counseling
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
