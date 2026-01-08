import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Church Projects",
  description: "See the ongoing and completed building and community projects of Full Gospel Church Githurai 44.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
