import type { Metadata } from "next";
import { getSermonBySlug } from "@/lib/firestore/server-utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    };
  }

  // Extract thumbnail from Youtube if possible, or use default
  // Youtube thumbnails: https://img.youtube.com/vi/<video-id>/maxresdefault.jpg
  // Assuming sermon.youtube is full URL or ID.
  
  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
        title: sermon.title,
        description: sermon.description,
        type: "video.other",
    }
  };
}

export default function SermonDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
