import type { Metadata } from "next";
import { getSermonBySlug } from "@/lib/firestore/server-utils";
import { getYoutubeThumbnail } from "@/lib/youtube";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    };
  }

  const thumbnail = sermon.image || getYoutubeThumbnail(sermon.youtube, "maxresdefault") || "/images/placeholder-sermon.svg";
  
  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
        title: sermon.title,
        description: sermon.description,
        type: "video.other",
        images: [
          {
            url: thumbnail,
            width: 1280,
            height: 720,
            alt: sermon.title,
          }
        ]
    }
  };
}

export default function SermonDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
