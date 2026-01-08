import type { Metadata } from "next";
import { getBlogBySlug } from "@/lib/firestore/server-utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.subheading,
    openGraph: {
        title: blog.title,
        description: blog.subheading,
        images: [blog.image],
        type: "article",
        publishedTime: new Date(blog.createdAt).toISOString(),
    }
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
