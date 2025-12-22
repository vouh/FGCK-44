import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";

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
        <Image src="/images/hero-bg.svg" alt="About FGCK" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">Jesus Healing Center</h2>
          <p className="mt-2 text-white/80">A community of faith in Githurai 44, Kenya</p>
        </div>
      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Core Values</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Biblical Authority:</strong> We uphold the Bible as the inspired and final authority in faith and practice (2 Timothy 3:16).</li>
          <li><strong>Prayer and the Holy Spirit:</strong> We depend on prayer and the leading of the Holy Spirit in all aspects of ministry (Acts 1:8).</li>
          <li><strong>Christ-Centered Worship:</strong> We worship God in spirit and in truth, honoring Jesus Christ in all we do (John 4:24).</li>
          <li><strong>Discipleship and Growth:</strong> We commit to nurturing believers toward spiritual maturity and Christ-likeness (Matthew 28:19–20).</li>
          <li><strong>Love and Compassion:</strong> We demonstrate God’s love through care, generosity, and service to others (John 13:34–35).</li>
          <li><strong>Integrity and Accountability:</strong> We practice honesty, transparency, and responsible stewardship (Proverbs 11:3).</li>
          <li><strong>Unity and Fellowship:</strong> We value oneness in the body of Christ, walking together in peace and mutual respect (Psalm 133:1).</li>
          <li><strong>Evangelism and Missions:</strong> We are committed to winning souls and extending the Kingdom of God locally and globally (Mark 16:15).</li>
        </ul>
      </div>

      {/* Leadership */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-slate-900">Our Leadership</h3>
        <p className="mt-2 text-slate-600">Meet the pastors and leaders who guide our church family.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LeaderCard name="Bishop (Placeholder)" role="Senior Pastor" />
          <LeaderCard name="Pastor (Placeholder)" role="Associate Pastor" />
          <LeaderCard name="Elder (Placeholder)" role="Church Elder" />
          <LeaderCard name="Deacon (Placeholder)" role="Church Deacon" />
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
