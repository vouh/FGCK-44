import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { site } from "@/lib/site";

function FeatureCard({
  title,
  description,
  href,
  image,
  index = 0,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  index?: number;
}) {
  return (
    <Link
      href={href}
      className="group hover-lift overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition-transform group-hover:translate-x-1">
          Learn more 
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function QuickInfoCard({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <div 
      className="hover-lift rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        {title}
      </h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-20" />
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl text-white/5 animate-float">✦</div>
          <div className="absolute top-40 right-20 text-4xl text-white/5 animate-float delay-200">★</div>
          <div className="absolute bottom-20 left-1/4 text-5xl text-white/5 animate-float delay-400">✦</div>
        </div>
        <Container>
          <div className="relative grid min-h-[75vh] items-center gap-12 py-20 lg:grid-cols-2">
            <div className="text-center lg:text-left animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                <span className="animate-pulse">✦</span>
                {site.locationShort}
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Welcome to <br />
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">{site.name}</span>
              </h1>
              <p className="mt-6 text-lg italic text-blue-200">&ldquo;{site.tagline}&rdquo;</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80 lg:text-xl">
                We are grateful for your presence and thankful that you are part of our fellowship.
                Join us every Sunday as we worship together.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  href="/new-here"
                  className="group rounded-lg bg-white px-7 py-4 text-sm font-bold text-blue-950 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-xl"
                >
                  Plan Your Visit
                  <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
                </Link>
                <Link
                  href="/sermons"
                  className="rounded-lg border-2 border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105"
                >
                  Watch Sermons
                </Link>
              </div>
              {/* Service time highlight */}
              <div className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-sm">
                <svg className="h-5 w-5 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-white">
                  Join us every <strong>Sunday at 9:00 AM</strong> — All are welcome.
                </span>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in delay-200">
              <div className="relative mx-auto aspect-square max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 backdrop-blur animate-pulse-slow" />
                <div className="absolute inset-4 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
                  {/* Real worship image */}
                  <Image
                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80"
                    alt="Church worship service"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />
                </div>
                {/* Bouncing logo */}
                <div className="absolute -left-6 top-1/4 rounded-2xl bg-white p-3 shadow-xl animate-bounce-subtle">
                  <div className="relative h-12 w-12">
                    <Image src="/logo.png" alt="FGCK Logo" fill className="object-contain" />
                  </div>
                </div>
                {/* Bible icon */}
                <div className="absolute -right-4 bottom-1/4 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-4 shadow-xl animate-bounce-subtle delay-300">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Times Banner */}
      <section className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 py-6 shadow-sm">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 text-center lg:justify-between lg:text-left">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900">Join us for worship</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {site.serviceTimes.map((t) => (
                <div key={t.label} className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-slate-600">{t.label}:</span>
                  <span className="text-sm font-bold text-blue-900">{t.time}</span>
                </div>
              ))}
            </div>
            <Link
              href="/new-here"
              className="group rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-800 hover:to-blue-700 hover:scale-105"
            >
              Get Directions
              <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Quick Info Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Stay Connected</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Latest Updates</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <QuickInfoCard title="Latest Sermon" delay={0}>
              <div className="group relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-slate-100">
                <Image src="/images/placeholder-sermon.svg" alt="Latest sermon" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3">
                    <svg className="h-6 w-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h5 className="text-lg font-bold text-slate-900">Tremendous Divine Grace</h5>
              <p className="mt-1 text-sm text-slate-600">Pastor (placeholder) • Dec 2025</p>
              <Link href="/sermons" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition-transform hover:translate-x-1">
                Watch now 
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </QuickInfoCard>

            <QuickInfoCard title="Upcoming Event" delay={100}>
              <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-blue-100">
                <Image src="/images/placeholder-event.svg" alt="Upcoming event" fill className="object-cover" />
                <div className="absolute top-3 left-3 rounded-lg bg-white px-3 py-1 shadow-lg">
                  <div className="text-xs font-bold text-red-600">SUN</div>
                  <div className="text-lg font-black text-slate-900">22</div>
                </div>
              </div>
              <h5 className="text-lg font-bold text-slate-900">Sunday Worship Service</h5>
              <p className="mt-1 text-sm text-slate-600">This Sunday • 9:00 AM</p>
              <Link href="/events" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition-transform hover:translate-x-1">
                View all events 
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </QuickInfoCard>

            <QuickInfoCard title="Featured Project" delay={200}>
              <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                <Image src="/images/placeholder-project.svg" alt="Featured project" fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-white/30">
                      <div className="h-full w-3/4 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-bold text-white">75%</span>
                  </div>
                </div>
              </div>
              <h5 className="text-lg font-bold text-slate-900">Church Development Project</h5>
              <p className="mt-1 text-sm text-slate-600">Status: Active</p>
              <Link href="/projects" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition-transform hover:translate-x-1">
                Learn how to help 
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </QuickInfoCard>
          </div>
        </Container>
      </section>

      {/* Explore Section */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center animate-fade-in">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Discover</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Explore Our Church</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Discover sermons, events, ministries, and projects that make our community vibrant.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Sermons"
              description="Listen to inspiring messages from our pastors. Browse by topic, speaker, or series."
              href="/sermons"
              image="/images/placeholder-sermon.svg"
              index={0}
            />
            <FeatureCard
              title="Events"
              description="Stay updated with weekly services, special gatherings, and community outreach."
              href="/events"
              image="/images/placeholder-event.svg"
              index={1}
            />
            <FeatureCard
              title="Ministries"
              description="Find your place in our community through various ministry departments."
              href="/ministries"
              image="/images/placeholder-ministry.svg"
              index={2}
            />
            <FeatureCard
              title="Our Pastors"
              description="Meet our spiritual leaders who shepherd our congregation with love."
              href="/pastors"
              image="/images/placeholder-person.svg"
              index={3}
            />
            <FeatureCard
              title="Blog"
              description="Read devotionals, announcements, and updates from our church family."
              href="/blog"
              image="/images/placeholder-sermon.svg"
              index={4}
            />
            <FeatureCard
              title="New Here?"
              description="Plan your first visit and learn what to expect on Sunday morning."
              href="/new-here"
              image="/images/placeholder-event.svg"
              index={5}
            />
          </div>
        </Container>
      </section>

      {/* Location Map Section */}
      <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-16">
        <Container>
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-900">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find Us
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Visit Our Church</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Located in the heart of Githurai 44, we&apos;re easy to find. Come worship with us!
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg animate-fade-in-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.762749608763!2d36.90459324725747!3d-1.2017814305877208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f2ae8740691%3A0x6f9dba54754c29fc!2sFull%20Gospel%20Churches%20of%20Kenya%20Githurai%2044.Jesus%20healing%20center!5e0!3m2!1sen!2suk!4v1765977613853!5m2!1sen!2suk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="FGCK Githurai 44 Location"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{site.contact.addressLine}</span>
            </div>
            <Link
              href="https://maps.google.com/?q=Full+Gospel+Churches+of+Kenya+Githurai+44"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:scale-105"
            >
              Get Directions
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl animate-float">✦</div>
          <div className="absolute bottom-10 right-20 text-6xl animate-float delay-300">★</div>
        </div>
        <Container>
          <div className="relative text-center animate-fade-in">
            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">Ready to Join Our Community?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blue-200">
              We&apos;d love to welcome you this Sunday. Come experience the warmth of our church family.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group rounded-lg bg-white px-8 py-4 text-sm font-bold text-blue-950 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-xl"
              >
                Contact Us
                <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
              </Link>
              <Link
                href="/give"
                className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
