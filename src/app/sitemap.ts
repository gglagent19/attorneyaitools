import type { MetadataRoute } from "next";
import {
  getAllTools,
  getAllStates,
  getAllCities,
  getAllPracticeAreas,
  getAllAttorneys,
  getAllBlogPosts,
  getAllProgrammaticPages,
} from "@/lib/vault";

const SITE_URL = "https://attorneyaitools.org";
const MAX_PER_SITEMAP = 50000; // Google's limit per sitemap

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  entries.push(
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/ai-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/attorneys`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/submit-tool`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/submit-attorney`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }
  );

  // AI Tools
  for (const tool of getAllTools()) {
    entries.push({
      url: `${SITE_URL}/ai-tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // States
  for (const state of getAllStates()) {
    entries.push({
      url: `${SITE_URL}/attorneys/${state.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Cities (all 20K+)
  for (const city of getAllCities()) {
    entries.push({
      url: `${SITE_URL}/attorneys/${city.state_slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Attorneys
  for (const attorney of getAllAttorneys()) {
    entries.push({
      url: `${SITE_URL}/attorneys/${attorney.state_slug}/${attorney.city_slug}/${attorney.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Practice Areas
  for (const pa of getAllPracticeAreas()) {
    entries.push({
      url: `${SITE_URL}/practice-areas/${pa.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Blog Posts
  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Programmatic SEO pages
  for (const page of getAllProgrammaticPages()) {
    entries.push({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
