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
    default: "Full Gospel Church Githurai 44 - Jesus Healing Center",
    template: "%s | FGCK Githurai 44",
  },
  description:
    "Full Gospel Church Githurai 44 — Jesus Healing Center in Nairobi, Kenya. Join us for worship services, inspiring sermons, community events, and ministries. Experience God's love and healing power.",
  metadataBase: new URL("https://fgckgithurai44.org"),
  keywords: [
    "Full Gospel Church Kenya",
    "Githurai 44 Church",
    "Jesus Healing Center",
    "FGCK Githurai",
    "Church in Githurai",
    "Nairobi Churches",
    "Christian Church Kenya",
    "Sunday Service Githurai",
    "Pastor Joseph Ngaruiya",
    "Worship Services Nairobi",
    "Community Church Kenya",
  ],
  authors: [{ name: "FGCK Githurai 44" }],
  creator: "Full Gospel Churches of Kenya",
  publisher: "Full Gospel Churches of Kenya - Githurai 44",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://fgckgithurai44.org",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
  },
  openGraph: {
    title: "Full Gospel Church Githurai 44 - Jesus Healing Center",
    description: "Experience God's love and healing power at Jesus Healing Center, Githurai 44. Join our vibrant community for worship services, inspiring sermons, and life-changing events in Nairobi, Kenya.",
    url: "https://fgckgithurai44.org",
    siteName: "Full Gospel Church Githurai 44",
    images: [
      {
        url: "/images/f2.jpeg",
        width: 1200,
        height: 630,
        alt: "Full Gospel Church Githurai 44 - Jesus Healing Center",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Gospel Church Githurai 44 - Jesus Healing Center",
    description: "Experience God's love and healing power at Jesus Healing Center, Githurai 44. Join our vibrant community in Nairobi, Kenya.",
    images: ["/images/f2.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "Full Gospel Church Githurai 44",
    "alternateName": "FGCK Githurai 44 - Jesus Healing Center",
    "url": "https://fgckgithurai44.org",
    "logo": "https://fgckgithurai44.org/images/logo.png",
    "image": "https://fgckgithurai44.org/images/f2.jpeg",
    "description": "Full Gospel Church Githurai 44 — Jesus Healing Center in Nairobi, Kenya. Join us for worship services, inspiring sermons, and community events.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ngumba Road, Githurai 44",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.2009733,
      "longitude": 36.9100173
    },
    "telephone": "+254722123456",
    "email": "info@fgckgithurai44.org",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Wednesday",
        "opens": "17:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/fgckgithurai44",
      "https://www.youtube.com/@fgckgithurai44"
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
