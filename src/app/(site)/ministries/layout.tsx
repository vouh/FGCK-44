import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Explore the various ministries at FGCK Githurai 44 including Men, Women, Youth, Children, and more.",
};

export default function MinistriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
