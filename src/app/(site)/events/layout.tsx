import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Calendar",
  description: "Stay updated with upcoming events, conferences, special services, and gatherings at FGCK Githurai 44.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
