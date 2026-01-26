import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Church Projects - Building & Community",
  description: "See the ongoing and completed building and community projects of Full Gospel Church Githurai 44. Support our mission to serve the community through various development initiatives.",
  keywords: ["Church Projects", "Church Building Projects", "Community Projects", "FGCK Projects", "Church Development"],
  openGraph: {
    title: "Church Projects - FGCK Githurai 44",
    description: "See the ongoing and completed building and community projects of Full Gospel Church Githurai 44.",
    url: "https://fgckgithurai44.org/projects",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/project1.jpeg",
        width: 1200,
        height: 630,
        alt: "Projects at Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Church Projects - FGCK Githurai 44",
    description: "See ongoing and completed building and community projects.",
    images: ["/images/project1.jpeg"],
  },
  alternates: {
    canonical: "https://fgckgithurai44.org/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
