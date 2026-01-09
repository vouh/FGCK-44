"use client";

import Image from "next/image";
import HeroCarousel from "@/components/site/HeroCarousel";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import ScrollFadeIn from "@/components/site/ScrollFadeIn";
import { site } from "@/lib/site";
import HeroTextImageCarousel from "@/components/site/HeroTextImageCarousel";
// import PageTracker from "@/components/site/PageTracker"; // removed tracking
import { useState, useEffect } from "react";
import { 
  getRecentBlogs, 
  getRecentEvents, 
  getRecentSermons, 
  getRecentProjects,
  Blog,
  Event,
  Sermon,
  Project,
  slugify
} from "@/lib/firestore";
import { Loader2 } from "lucide-react";

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
      className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return { day, month };
}

export default function HomePage() {
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const [latestEvent, setLatestEvent] = useState<Event | null>(null);
  const [latestProject, setLatestProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatestData() {
      try {
        const [sermons, events, projects] = await Promise.all([
          getRecentSermons(1),
          getRecentEvents(1),
          getRecentProjects(1),
        ]);
        
        setLatestSermon(sermons[0] || null);
        setLatestEvent(events[0] || null);
        setLatestProject(projects[0] || null);
      } catch (error) {
        console.error("Error loading latest data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadLatestData();
  }, []);

  const eventDate = latestEvent?.date ? formatDate(latestEvent.date) : { day: "--", month: "TBD" };

  return (
    <>
      {/* Tracking removed */}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        <HeroTextImageCarousel />
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
              href="/about#service-times"
              className="group rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-800 hover:to-blue-700 hover:scale-105"
            >
              View Service Times
              <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Theme of the Year 2026 Section */}
      <section className="relative w-full py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-105"
          style={{ 
            backgroundImage: 'url("/images/newyear.jpg")',
          }}
        />
        
        {/* Blue Overlay & Gradient */}
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-blue-900/30" />

        {/* Content */}
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-14 border border-white/20 shadow-2xl ring-1 ring-white/10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-300/30 text-blue-50 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
                2026 Theme  
              </span>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight drop-shadow-lg">
                Year of God&apos;s Favor & <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-100 filter drop-shadow-sm">
                  Divine Acceleration
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-blue-50 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-md mb-8">
                &quot;For You, O Lord, will bless the righteous; With favor You will surround them as with a shield.&quot; <br/>
                <span className="text-sm opacity-80 mt-2 block">- Psalm 5:12</span>
              </p>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto opacity-50 rounded-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Info Section - Latest Updates */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mt-2 text-3xl font-black text-slate-900">Latest Updates</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {/* Latest Sermon */}
              <QuickInfoCard title="Latest Sermon" delay={0}>
                {latestSermon ? (
                  <>
                    <div className="group relative mb-4 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-slate-100 shadow-md">
                      {latestSermon.image ? (
                        <Image
                          src={latestSermon.image}
                          alt={latestSermon.title}
                          fill
                          className="object-contain sm:object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : latestSermon.youtube ? (
                        <Image
                          src={`https://img.youtube.com/vi/${latestSermon.youtube.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                          alt={latestSermon.title}
                          fill
                          className="object-contain sm:object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <Image
                          src="/images/placeholder-sermon.svg"
                          alt="Latest sermon"
                          fill
                          className="object-contain sm:object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white/90 p-4 shadow-xl">
                          <svg className="h-8 w-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h5 className="text-xl font-black text-slate-900 line-clamp-1">{latestSermon.title}</h5>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {latestSermon.date || "No date"}
                    </p>
                    {latestSermon.youtube ? (
                      <a
                        href={latestSermon.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-all hover:gap-3"
                      >
                        Watch now
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={`/sermons/${slugify(latestSermon.title)}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-all hover:gap-3"
                      >
                        View sermon
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </>
                ) : (
                  <p className="text-slate-500 text-sm italic">No sermons available yet.</p>
                )}
              </QuickInfoCard>

              {/* Upcoming Event */}
              <QuickInfoCard title="Upcoming Event" delay={100}>
                {latestEvent ? (
                  <>
                    <div className="group relative mb-4 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 shadow-md">
                      <Image
                        src={latestEvent.image || "/images/placeholder-event.svg"}
                        alt={latestEvent.title}
                        fill
                        className="object-contain sm:object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 rounded-xl bg-white/95 p-3 shadow-xl backdrop-blur-sm">
                        <div className="text-center">
                          <div className="text-xs font-black uppercase tracking-widest text-red-600">{eventDate.month}</div>
                          <div className="text-2xl font-black text-slate-900">{eventDate.day}</div>
                        </div>
                      </div>
                    </div>
                    <h5 className="text-xl font-black text-slate-900 line-clamp-1">{latestEvent.title}</h5>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {latestEvent.date || "Date TBD"}
                    </p>
                    <Link href="/events" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-all hover:gap-3">
                      View all events
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm italic">No events available yet.</p>
                )}
              </QuickInfoCard>

              {/* Featured Project */}
              <QuickInfoCard title="Featured Project" delay={200}>
                {latestProject ? (
                  <>
                    <div className="group relative mb-4 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-md">
                      <Image
                        src={latestProject.image || "/images/placeholder-project.svg"}
                        alt={latestProject.title}
                        fill
                        className="object-contain sm:object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 rounded-full bg-white/25">
                            <div
                              className="h-full rounded-full bg-green-400"
                              style={{ width: `${latestProject.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-white">{latestProject.progress || 0}%</span>
                        </div>
                      </div>
                    </div>
                    <h5 className="text-xl font-black text-slate-900 line-clamp-1">{latestProject.title}</h5>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">Status: Active</p>
                    <Link
                      href={`/projects/${slugify(latestProject.title)}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-all hover:gap-3"
                    >
                      Learn more
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm italic">No projects available yet.</p>
                )}
              </QuickInfoCard>
            </div>
          )}
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
              image="/images/f2.jpeg"
              index={0}
            />
            <FeatureCard
              title="Events"
              description="Stay updated with weekly services, special gatherings, and community outreach."
              href="/events"
              image="/images/youth3.jpeg"
              index={1}
            />
            <FeatureCard
              title="Ministries"
              description="Find your place in our community through various ministry departments."
              href="/ministries"
              image="/images/choir2.jpeg"
              index={2}
            />
            <FeatureCard
              title="Our Pastors"
              description="Meet our spiritual leaders who shepherd our congregation with love."
              href="/pastors"
              image="/images/pastorofficial.png"
              index={3}
            />
            <FeatureCard
              title="Blog"
              description="Read devotionals, announcements, and updates from our church family."
              href="/blog"
              image="/images/blog.jpg"
              index={4}
            />
            <FeatureCard
              title="New Here?"
              description="Plan your first visit and learn what to expect on Sunday morning."
              href="/new-here"
              image="/images/welcome.jpg"
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
              href="https://www.google.com/maps/dir//Full+Gospel+Churches+of+Kenya+Githurai+44.Jesus+healing+center,+Githurai,+44+Ngumba+Rd,+Nairobi,+Kenya/@-1.1999106,36.9050656,16.83z/data=!4m16!1m7!3m6!1s0x182f3f2ae8740691:0x6f9dba54754c29fc!2sFull+Gospel+Churches+of+Kenya+Githurai+44.Jesus+healing+center!8m2!3d-1.2009733!4d36.9100173!16s%2Fg%2F11sycxzc4b!4m7!1m0!1m5!1m1!1s0x182f3f2ae8740691:0x6f9dba54754c29fc!2m2!1d36.9100124!2d-1.2009876?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
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
          <div className="absolute top-10 left-20 text-8xl animate-float" style={{ display: 'none' }}>✦</div>
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
