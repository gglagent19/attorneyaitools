import type { MetadataRoute } from "next";
import {
  getAllTools,
  getAllStates,
  getAllPracticeAreas,
  getAllBlogPosts,
  getAllProgrammaticPages,
  getAllComparisons,
  getAllCities,
} from "@/lib/vault";
import { isQualifiedCity } from "@/lib/city-facts";

const SITE_URL = "https://attorneyaitools.org";

// Note: city pages and individual attorney profiles are intentionally excluded
// from the sitemap. They are noindexed via per-route metadata until each page
// can prove unique content (see ACTION-PLAN.md).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static / hub pages
  entries.push(
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/ai-tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/attorneys`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/submit-tool`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/submit-attorney`, lastModified: now, changeFrequency: "yearly", priority: 0.4 }
  );

  // AI Tools (~98)
  for (const tool of getAllTools()) {
    entries.push({
      url: `${SITE_URL}/ai-tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Comparison guides — high citation value
  for (const c of getAllComparisons()) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: c.date ? new Date(c.date) : now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // States (50) — state hub pages remain indexable
  for (const state of getAllStates()) {
    entries.push({
      url: `${SITE_URL}/attorneys/${state.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // City pages — every city has unique Census facts; cities with 3+ verified
  // attorneys get the full editorial template at higher priority.
  for (const c of getAllCities()) {
    const qualified = isQualifiedCity(c.state_slug, c.slug);
    entries.push({
      url: `${SITE_URL}/attorneys/${c.state_slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: qualified ? 0.55 : 0.4,
    });
  }

  // Practice Areas
  for (const pa of getAllPracticeAreas()) {
    entries.push({
      url: `${SITE_URL}/practice-areas/${pa.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Blog
  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Programmatic SEO pages (only if they pass uniqueness gate elsewhere)
  for (const page of getAllProgrammaticPages()) {
    entries.push({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
