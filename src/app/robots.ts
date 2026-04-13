import type { MetadataRoute } from "next";

const SITE_URL = "https://attorneyaitools.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers — block individual attorney profile pages (still
      // noindexed at the page level until verified). City and state hubs are
      // allowed because they now ship rich, unique content.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/attorneys/*/*/*"],
      },
      // Explicit AI crawler allow-list (signals intent + future-proofs against default-deny)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
