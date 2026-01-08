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
  metadataBase: new URL("https://fgck-githurai44.com"),
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
