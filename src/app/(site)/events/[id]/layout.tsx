import type { Metadata } from "next";
import { getEventById } from "@/lib/firestore/server-utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
        title: event.title,
        description: event.description,
        images: [event.image],
    }
  };
}

export default function EventDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
