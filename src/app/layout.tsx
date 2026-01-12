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
    "Full Gospel Church Githurai 44 — Jesus Healing Center. Join us for sermons, events, ministries, projects, and community.",
  metadataBase: new URL("https://www.fgck-githurai44.com"),
  keywords: ["Church", "Githurai 44", "Full Gospel", "Sermons", "Kenya", "Jesus Healing Center", "Christianity", "Worship"],
  authors: [{ name: "FGCK Githurai 44" }],
  openGraph: {
    title: "Full Gospel Church Githurai 44",
    description: "Jesus Healing Center - Githurai 44. Join our community.",
    url: "https://fgck-githurai44.com",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/og-default.jpg", 
        width: 1200,
        height: 630,
        alt: "Full Gospel Church Githurai 44",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Gospel Church Githurai 44",
    description: "Jesus Healing Center - Githurai 44. Join our community.",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
