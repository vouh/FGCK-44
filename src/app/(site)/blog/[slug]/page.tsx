"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getBlogs, slugify, Blog } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const blogs = await getBlogs();
        const found = blogs.find((b) => slugify(b.title) === slug);
        setBlog(found || null);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

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

  // Convert line breaks to paragraphs if content doesn't have HTML tags
  const formatContent = (content: string) => {
    if (!content) return '';
    
    // Check if content already has HTML tags
    if (content.includes('<p>') || content.includes('<div>')) {
      return content;
    }
    
    // Split by double line breaks for paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    return paragraphs.map(p => {
      // Replace single line breaks with <br>
      const formatted = p.replace(/\n/g, '<br />');
      return `<p>${formatted}</p>`;
    }).join('');
  };

  return (
    <PageShell
      title={blog.title}
      description={blog.subheading || "Read this blog post"}
    >
      <article className="grid gap-6">
        {/* Featured Image */}
        {blog.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-contain md:object-cover"
              priority
            />
          </div>
        )}

        {/* Blog Meta & Content */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 md:p-8 shadow-sm">
          {/* Date */}
          <div className="flex flex-wrap items-center gap-4 text-base text-slate-600 pb-6 border-b border-slate-200">
            {blog.date && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-slate-900">Posted:</span> {blog.date}
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="mt-6">
            <div 
              className="blog-content max-w-none" 
              dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }} 
            />
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
