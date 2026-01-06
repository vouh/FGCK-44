"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getBlogs, slugify, Blog } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const blogs = await getBlogs();
        const found = blogs.find((b) => slugify(b.title) === params.slug);
        setBlog(found || null);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </PageShell>
    );
  }

  if (!blog) {
    return (
      <PageShell title="Blog Post Not Found" description="">
        <div className="text-center py-12">
          <p className="text-slate-600">This blog post could not be found.</p>
          <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={blog.title}
      description={blog.subheading || "Read this blog post"}
    >
      <article className="grid gap-6">
        {/* Featured Image */}
        {blog.image && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Blog Meta */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {blog.date && (
              <div>
                <span className="font-semibold text-slate-900">Posted:</span> {blog.date}
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>

          <Link href="/blog" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
