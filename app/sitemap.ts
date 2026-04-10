import type { MetadataRoute } from "next";

const BASE = "https://dev-x100.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/webinars",
    "/training",
    "/contact",
    "/privacy",
    "/terms",
    "/login",
  ];

  return staticPages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/webinars" ? 0.9 : 0.7,
  }));
}
