import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News & Blog",
  description: "Read the latest news, updates, and inspirational articles from Full Gospel Church Githurai 44.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
