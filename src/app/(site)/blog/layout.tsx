import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News & Blog - Church Updates",
  description: "Read the latest news, updates, devotionals, and inspirational articles from Full Gospel Church Githurai 44. Stay connected with our church family.",
  keywords: ["Church Blog", "Church News", "Church Updates", "Devotionals", "FGCK News", "Christian Articles"],
  openGraph: {
    title: "Latest News & Blog - FGCK Githurai 44",
    description: "Read the latest news, updates, and inspirational articles from Full Gospel Church Githurai 44.",
    url: "https://fgckgithurai44.org/blog",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog from Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest News & Blog - FGCK Githurai 44",
    description: "Read the latest news, updates, and inspirational articles.",
    images: ["/images/blog.jpg"],
  },
  alternates: {
    canonical: "https://fgckgithurai44.org/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
