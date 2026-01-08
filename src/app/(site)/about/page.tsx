import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission, vision, and the leadership of Full Gospel Church Githurai 44.",
};

function LeaderCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 bg-slate-100">
        <Image src="/images/placeholder-person.svg" alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 text-center">
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="mt-1 text-sm text-slate-600">{role}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell title="About Us" description="Learn about our mission, vision, and the leadership of Full Gospel Church Githurai 44.">
      {/* Hero Image */}
      <div className="relative mb-10 h-64 overflow-hidden rounded-2xl bg-slate-100 md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1438032009581-05ea18774e10?auto=format&fit=crop&q=80&w=2000"
          alt="About FGCK"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-blue-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">Jesus Healing Center</h2>
          <p className="mt-2 text-white/90">A community of faith in Githurai 44, Kenya</p>
        </div>
      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="hover-lift rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            To proclaim the full Gospel of Jesus Christ through sound biblical teaching, discipleship, prayer, and compassionate outreach, equipping believers to live godly lives and serve God effectively.
          </p>
        </div>

        <div className="hover-lift rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            To be a Christ-centered church that transforms lives, families, and the community of Githurai 44 and beyond through the power of the Gospel.
          </p>
        </div>
      </div>

        {/* Service Times & Weekly Events */}
        <div id="service-times" className="mt-12">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Service Times</h3>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900">Sunday Services</h4>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">Morning Devotion</span>
                  <span className="font-bold text-blue-900">7:00am – 8:00am</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">Bible Study</span>
                  <span className="font-bold text-blue-900">8:00am – 9:00am</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">First Service</span>
                  <span className="font-bold text-blue-900">9:00am – 10:45am</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">Second Service</span>
                  <span className="font-bold text-blue-900">10:45am – 1:00pm</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900">Weekly Events</h4>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Monday</span>
                    <span className="font-bold text-blue-900">7:00am – 8:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Intercessory Prayers</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Tuesday</span>
                    <span className="font-bold text-blue-900">7:00am – 8:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Men Fellowship</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Wednesday</span>
                    <span className="font-bold text-blue-900">2:00pm – 3:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Ladies Fellowship</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Wednesday</span>
                    <span className="font-bold text-blue-900">7:00pm – 8:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Youth Fellowship</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Thursday</span>
                    <span className="font-bold text-blue-900">7:00pm – 8:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">All Fellowship</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Friday</span>
                    <span className="font-bold text-blue-900">7:00am – 8:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Intercessory Prayers</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Saturday</span>
                    <span className="font-bold text-blue-900">5:00pm – 7:00pm</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Praise &amp; Worship Practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Leadership Section */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Church Leadership</span>
          <h3 className="mt-2 text-3xl font-black text-slate-900">Meet Our Leaders</h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Our leadership team is committed to shepherding God&apos;s people with wisdom, integrity, and a heart of service.
          </p>
        </div>

        {/* Pastor Section */}
        <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 shadow-2xl">
          <div className="grid md:grid-cols-5">
            <div className="relative h-80 md:col-span-2 md:h-auto">
              <Image
                src="/images/pastor.png"
                alt="Pastor Joseph Ngaruiya John"
                fill
                className="object-contain md:object-cover bg-blue-900"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-blue-950/40" />
            </div>
            <div className="relative flex flex-col justify-center p-8 md:col-span-3 lg:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-4 py-2 shadow-lg">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Senior Pastor</span>
              </div>
              <h4 className="mt-4 text-3xl font-black text-white lg:text-4xl">Pastor Joseph Ngaruiya John</h4>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Our Senior Pastor provides spiritual leadership and oversight for the congregation, preaching the Word with power and guiding our church in fulfilling God&apos;s vision for FGCK Githurai 44.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Bachelor in Theology</span>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">35+ Years of Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elders Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 shadow-md">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">Church Elders</h4>
              <p className="text-slate-600">Providing spiritual guidance and wisdom to the congregation</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-slate-100">
                <Image src="/images/placeholder-person.svg" alt="Elder" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-white">Active Elder</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-xl font-black text-slate-900">Elder Name</h5>
                <p className="mt-1 text-sm font-semibold text-blue-600">Church Elder</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Serving with wisdom and compassion, providing spiritual oversight and pastoral care to our church family.
                </p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-slate-100">
                <Image src="/images/placeholder-person.svg" alt="Elder" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-white">Active Elder</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-xl font-black text-slate-900">Elder Name</h5>
                <p className="mt-1 text-sm font-semibold text-blue-600">Church Elder</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Committed to shepherding the flock with biblical teaching and godly counsel.
                </p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-slate-100">
                <Image src="/images/placeholder-person.svg" alt="Elder" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-white">Active Elder</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-xl font-black text-slate-900">Elder Name</h5>
                <p className="mt-1 text-sm font-semibold text-blue-600">Church Elder</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Dedicated to prayer, spiritual mentorship, and supporting the vision of the church.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deacons Section */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 shadow-md">
              <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">Church Deacons</h4>
              <p className="text-slate-600">Serving the church through practical ministry and support</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
                <Image src="/images/placeholder-person.svg" alt="Deacon" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h5 className="text-lg font-black text-slate-900">Deacon Name</h5>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-green-600">Church Deacon</p>
                <p className="mt-2 text-xs text-slate-600">Serving with diligence and faithfulness</p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
                <Image src="/images/placeholder-person.svg" alt="Deacon" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h5 className="text-lg font-black text-slate-900">Deacon Name</h5>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-green-600">Church Deacon</p>
                <p className="mt-2 text-xs text-slate-600">Committed to practical service</p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
                <Image src="/images/placeholder-person.svg" alt="Deacon" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h5 className="text-lg font-black text-slate-900">Deacon Name</h5>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-green-600">Church Deacon</p>
                <p className="mt-2 text-xs text-slate-600">Supporting ministry operations</p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
                <Image src="/images/placeholder-person.svg" alt="Deacon" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h5 className="text-lg font-black text-slate-900">Deacon Name</h5>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-green-600">Church Deacon</p>
                <p className="mt-2 text-xs text-slate-600">Dedicated to church care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Core Values</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Biblical Authority</div>
            <div className="mt-1 text-sm text-slate-600">We uphold the Bible as the inspired and final authority in faith and practice.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">2 Timothy 3:16</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Prayer and the Holy Spirit</div>
            <div className="mt-1 text-sm text-slate-600">We depend on prayer and the leading of the Holy Spirit in all aspects of ministry.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">Acts 1:8</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Christ-Centered Worship</div>
            <div className="mt-1 text-sm text-slate-600">We worship God in spirit and in truth, honoring Jesus Christ in all we do.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">John 4:24</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Discipleship and Growth</div>
            <div className="mt-1 text-sm text-slate-600">We commit to nurturing believers toward spiritual maturity and Christ-likeness.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">Matthew 28:19–20</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Love and Compassion</div>
            <div className="mt-1 text-sm text-slate-600">We demonstrate God’s love through care, generosity, and service to others.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">John 13:34–35</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Integrity and Accountability</div>
            <div className="mt-1 text-sm text-slate-600">We practice honesty, transparency, and responsible stewardship.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">Proverbs 11:3</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Unity and Fellowship</div>
            <div className="mt-1 text-sm text-slate-600">We value oneness in the body of Christ, walking together in peace and mutual respect.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">Psalm 133:1</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-bold text-slate-900">Evangelism and Missions</div>
            <div className="mt-1 text-sm text-slate-600">We are committed to winning souls and extending the Kingdom of God locally and globally.</div>
            <div className="mt-2 text-xs font-semibold text-blue-900">Mark 16:15</div>
          </div>
        </div>
      </div>



      {/* Statement of Faith */}
      <div className="mt-12 rounded-2xl bg-blue-950 p-8 text-white">
        <h3 className="text-2xl font-bold">What We Believe</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="font-bold">The Bible</h4>
            <p className="mt-2 text-sm text-white/80">We believe the Bible is the inspired Word of God.</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="font-bold">Salvation</h4>
            <p className="mt-2 text-sm text-white/80">We believe in salvation through faith in Jesus Christ.</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="font-bold">The Holy Spirit</h4>
            <p className="mt-2 text-sm text-white/80">We believe in the power and gifts of the Holy Spirit.</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="font-bold">The Church</h4>
            <p className="mt-2 text-sm text-white/80">We believe in the body of Christ and fellowship.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
