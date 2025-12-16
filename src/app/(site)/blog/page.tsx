import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { placeholderPosts } from "@/lib/placeholders";

function BlogCard({
  title,
  subtitle,
  dateLabel,
  slug,
}: {
  title: string;
  subtitle?: string;
  dateLabel?: string;
  slug?: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 bg-slate-100">
        <Image src="/images/placeholder-sermon.svg" alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{dateLabel}</span>
          <span>•</span>
          <span>3 min read</span>
        </div>
        <h3 className="mt-2 font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{subtitle}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-blue-900">Read more →</span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <PageShell title="Blog" description="Read devotionals, announcements, and updates from our church family.">
      {/* Featured Post */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image src="/images/placeholder-sermon.svg" alt="Featured post" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Dec 2025</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <h2 className="mt-3 text-2xl font-black">Welcome to FGCK Githurai 44</h2>
            <p className="mt-3 text-white/80">
              A message of hope and welcome to our church community. Learn about our vision for the coming year.
            </p>
            <Link
              href="/blog/welcome-to-fgck-githurai-44"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Read Article
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <h3 className="text-xl font-bold text-slate-900">Recent Posts</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </PageShell>
  );
}
