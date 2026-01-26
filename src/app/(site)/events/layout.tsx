import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Calendar - Upcoming Events",
  description: "Stay updated with upcoming events, conferences, special services, youth gatherings, and community outreach programs at FGCK Githurai 44 - Jesus Healing Center.",
  keywords: ["Church Events", "Githurai Events", "Church Calendar", "Youth Events", "Church Conferences", "Community Events"],
  openGraph: {
    title: "Events Calendar - FGCK Githurai 44",
    description: "Stay updated with upcoming events, conferences, special services, and gatherings at Jesus Healing Center.",
    url: "https://fgckgithurai44.org/events",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/youth3.jpeg",
        width: 1200,
        height: 630,
        alt: "Events at Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events Calendar - FGCK Githurai 44",
    description: "Stay updated with upcoming events and gatherings at Jesus Healing Center.",
    images: ["/images/youth3.jpeg"],
  },
  alternates: {
    canonical: "https://fgckgithurai44.org/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
