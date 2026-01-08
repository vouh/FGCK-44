import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons Archive - Full List",
  description: "Browse all past sermons and messages from Full Gospel Church Githurai 44.",
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
