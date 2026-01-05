"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
// import PageTracker from "@/components/site/PageTracker"; // removed tracking
import { useState, useEffect } from "react";
import { getBlogs, Blog, slugify } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

function BlogCard({
  title,
  subheading,
  date,
  image,
  slug,
}: {
  title: string;
  subheading?: string;
  date?: string;
  image?: string;
  slug?: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 bg-slate-100">
        <Image 
          src={image || "/images/placeholder-sermon.svg"} 
          alt={title} 
          fill 
          className="object-cover" 
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{date || "No date"}</span>
          <span>•</span>
          <span>3 min read</span>
        </div>
        <h3 className="mt-2 font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{subheading}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-blue-900">Read more →</span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const featuredBlog = blogs[0];
  const restBlogs = blogs.slice(1);

  return (
    <PageShell title="Blog" description="Read devotionals, announcements, and updates from our church family.">
      {/* Tracking removed */}
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-slate-600">No blog posts available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Check back soon for updates!</p>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredBlog && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src={featuredBlog.image || "/images/placeholder-sermon.svg"} 
                    alt="Featured post" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{featuredBlog.date || "No date"}</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-black">{featuredBlog.title}</h2>
                  <p className="mt-3 text-white/80">{featuredBlog.subheading}</p>
                  <Link
                    href={`/blog/${slugify(featuredBlog.title)}`}
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
          )}

          {/* Blog Grid */}
          <h3 className="text-xl font-bold text-slate-900">Recent Posts</h3>
          {restBlogs.length === 0 ? (
            <p className="mt-4 text-slate-600">No other posts available.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  title={blog.title}
                  subheading={blog.subheading}
                  date={blog.date}
                  image={blog.image}
                  slug={slugify(blog.title)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
