import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    "",
    "/about",
    "/new-here",
    "/ministries",
    "/sermons",
    "/sermons/archive",
    "/events",
    "/projects",
    "/blog",
    "/give",
    "/contact",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
