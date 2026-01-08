import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons Archive",
  description: "Watch and listen to recent sermons, teachings, and messages from our pastors.",
};

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
