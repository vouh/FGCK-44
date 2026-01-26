import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons Archive - Watch & Listen",
  description: "Watch and listen to recent sermons, teachings, and messages from Pastor Joseph Ngaruiya and our pastoral team at Full Gospel Church Githurai 44 - Jesus Healing Center.",
  keywords: ["Church Sermons", "Sunday Sermons", "Pastor Ngaruiya Sermons", "FGCK Sermons", "Online Church Messages", "Bible Teachings"],
  openGraph: {
    title: "Sermons Archive - FGCK Githurai 44",
    description: "Watch and listen to recent sermons, teachings, and messages from our pastors at Jesus Healing Center.",
    url: "https://fgckgithurai44.org/sermons",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/f2.jpeg",
        width: 1200,
        height: 630,
        alt: "Sermons from Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sermons Archive - FGCK Githurai 44",
    description: "Watch and listen to recent sermons and teachings from our pastors.",
    images: ["/images/f2.jpeg"],
  },
  alternates: {
    canonical: "https://fgckgithurai44.org/sermons",
  },
};

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
