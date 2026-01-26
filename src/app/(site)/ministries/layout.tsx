import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministries - Get Involved",
  description: "Explore the various ministries at FGCK Githurai 44 including Men's Ministry, Women's Ministry, Youth Ministry, Children's Ministry, Choir, Ushers, and more. Find your place to serve.",
  keywords: ["Church Ministries", "Youth Ministry", "Women Ministry", "Men Ministry", "Children Ministry", "Church Choir", "Get Involved"],
  openGraph: {
    title: "Ministries - FGCK Githurai 44",
    description: "Explore various ministries including Men, Women, Youth, Children, and more. Find your place to serve.",
    url: "https://fgckgithurai44.org/ministries",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/hospitality.jpeg",
        width: 1200,
        height: 630,
        alt: "Ministries at Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ministries - FGCK Githurai 44",
    description: "Explore various ministries and find your place to serve.",
    images: ["/images/hospitality.jpeg"],
  },
  alternates: {
    canonical: "https://fgckgithurai44.org/ministries",
  },
};

export default function MinistriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
