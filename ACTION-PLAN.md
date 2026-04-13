# SEO Action Plan — attorneyaitools.org

Health score today: **55/100**. Hitting the items below in order takes you to ~75 within 2 weeks and ~85 within 6 weeks.

---

## CRITICAL — fix immediately

1. **Fix `/images/tools/*.png` 404s.** Every preloaded hero image is broken. Cuts LCP by ~1–2 s. Single biggest perf win.
2. **Paginate `/attorneys`.** Currently 19.5 MB of HTML. Paginate to ~50/page or convert to faceted index pages.
3. **Noindex 20K city pages** until each has >60% unique content (local bar rules, court info, city-specific tool adoption). 400× over the quality-gate hard stop.
4. **Noindex 8K attorney profiles** until each has 150+ words of verified, unique data. Otherwise: parasitic-directory / scraped-content risk under Aug 2024 + March 2025 core updates.
5. **Add sitewide canonical tags** via `export const metadata = { alternates: { canonical: ... } }` on every route.
6. **Remove the placeholder AdSense ID** `ca-pub-XXXXXXXXXXXXXXXX`. Loads adsbygoogle.js for zero revenue.
7. **Add non-attorney disclosure** sitewide: "Operated by a developer, not a licensed attorney. Nothing here is legal advice." Required for Trust under YMYL E-E-A-T.

## HIGH — within 1 week

8. **Build the comparison guides** that the marketing playbook already references. `/compare/[a]-vs-[b]` with: TL;DR verdict in first 60 words, feature + pricing tables, "Best for…" definitive blocks, FAQPage schema, last-updated date. These are the single highest-ROI GEO assets.
9. **Split the sitemap** into `sitemap_index.xml` → `sitemap-tools.xml`, `-comparisons.xml`, `-attorneys.xml`, `-cities.xml`, `-static.xml`.
10. **Add `Sitemap:` line to robots.txt** plus explicit allow-list for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, CCBot.
11. **Implement IndexNow.** Generate key file at root, POST on Obsidian-vault publish hook.
12. **Add CSP and Permissions-Policy headers** via `next.config.js` (start in report-only mode).
13. **Add `width`/`height` to all `<img>`** and migrate to `next/image` for automatic AVIF/WebP, lazy loading, and sizing.
14. **Code-split the 227 KB turbopack chunk.** Target <170 KB initial JS. Use `next/dynamic` for below-the-fold imports.
15. **Defer GTM** via `next/script` strategy="lazyOnload" to protect INP.
16. **Expand tool cards into full profiles** (400–800 words) with one-line definition, pros/cons table, "Who it's for", verified pricing, and last-verified date.
17. **Add `Organization` and full `WebSite` + `SearchAction` schema** sitewide. Add `BreadcrumbList` on every non-home page. Add `Article` schema to comparison guides.
18. **Add author bylines** (`Person` schema with LinkedIn `sameAs`) and a transparent "Why I built this" About page.
19. **Publish `/llms.txt`** listing top tool pages, comparisons, and practice-area hubs.
20. **Verify `aggregateRating` on tool pages is backed by real on-page reviews.** If not, remove — fake ratings are a Google policy violation.

## MEDIUM — within 1 month

21. Preload only the actual LCP image, not 6.
22. Reserve CSS space (`min-height`) for AdSense slots to prevent CLS.
23. Convert H2s to question format ("What is the best AI tool for legal research?").
24. Add `ItemList` schema on directory category pages.
25. Add `Attorney` / `LegalService` schema only on verified profiles with full NAP. Never on scraped entries.
26. Add freshness signals: `Last verified: YYYY-MM-DD` on every tool page; flag any >90 days as stale.
27. Vary intros across templated pages — avoid `{city} attorneys using {tool}` mad-libs.
28. Cluster internal links: tool pages → comparison guides, not city pages.
29. Add a "How we test / methodology" page (correlates with AI citation trust).
30. Realistic per-type `changefreq` and `lastmod`; drop `<priority>` (Google ignores it).
31. HSTS: add `includeSubDomains; preload` for preload-list eligibility.
32. Audit faceted-search / sort / filter URLs for `noindex` to prevent parameter index bloat.
33. Fix the 2 sub-44 px header tap targets on mobile (logo / hamburger).
34. Tighten hero top padding on mobile so CTAs sit closer to the fold.

## LOW — backlog

35. Self-host the woff2 font with `font-display: swap`.
36. `Cache-Control: immutable, max-age=31536000` on `/images/tools/*` once fixed.
37. Drop redundant `Refresh: 0` meta from HTTP→HTTPS redirect (`Location` is enough).
38. Build YouTube presence — strongest known correlation (~0.737) with AI citations.
39. Build Reddit footprint in r/LawFirm, r/Lawyertalk (the marketing playbook already drafts these).
40. Once traffic grows: real-user CWV monitoring via web-vitals.js → GA4.
41. RSL 1.0 licensing declaration if you later monetize AI access.

---

## Two-Week Sprint (Recommended Order)

**Day 1–2:** items 1, 2, 5, 6, 7, 10
**Day 3–4:** items 3, 4, 9, 11, 12
**Day 5–7:** items 13, 14, 15, 17, 18, 19
**Week 2:** item 8 (build 5–10 flagship comparison guides) + item 16 (expand tool profiles) + item 20

After this sprint, re-run `/seo audit https://attorneyaitools.org/` to confirm the score has moved.
