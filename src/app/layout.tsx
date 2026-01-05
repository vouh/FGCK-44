import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Full Gospel Church Githurai 44",
    template: "%s | Full Gospel Church Githurai 44",
  },
  description:
    "Full Gospel Church Githurai 44 — sermons, events, ministries, projects, and visitor information.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics removed */}
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
