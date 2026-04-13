# Full SEO Audit — attorneyaitools.org

**Date:** 2026-04-12
**Business Type:** Directory / Publisher (Legal AI tools + attorney listings)
**Stack:** Next.js (SSR/prerendered) on Vercel, Obsidian-vault CMS

---

## SEO Health Score: **55 / 100**

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 78 | 22% | 17.2 |
| Content Quality | 38 | 23% | 8.7 |
| On-Page SEO | 70 | 20% | 14.0 |
| Schema / Structured Data | 50 | 10% | 5.0 |
| Performance (CWV) | 45 | 10% | 4.5 |
| AI Search Readiness | 38 | 10% | 3.8 |
| Images | 30 | 5% | 1.5 |
| **Total** | | | **54.7** |

The site has a strong technical foundation (SSR, HTTPS, HSTS, prerendered HTML, clean above-the-fold UX) but is undermined by three structural problems: a 19.5 MB `/attorneys` page, broken `/images/tools/*.png` 404s, and an enormous programmatic surface (28,481 URLs including 20K city pages) with thin/templated content in a YMYL legal vertical.

---

## Top 5 Critical Issues

1. **`/attorneys` page is 19.5 MB of HTML** — guaranteed LCP/CLS failure, crawl-budget sink. Paginate to ~50/page.
2. **All preloaded `/images/tools/*.png` return 404** — wastes connections, blocks LCP, breaks visual rendering. Single biggest perf win.
3. **20,000 city pages + 8,000 attorney profiles** breach quality gates 400× over. Doorway-page / parasitic-directory penalty risk under Aug 2024 / March 2025 core updates. Noindex until per-page uniqueness is proven.
4. **No `<link rel="canonical">` site-wide** — duplicate-content exposure across 28K+ URLs.
5. **Placeholder AdSense ID `ca-pub-XXXXXXXXXXXXXXXX`** loads adsbygoogle.js for zero revenue and looks unprofessional.

## Top 5 Quick Wins

1. Fix the `/images/tools/*.png` 404s (cuts LCP ~1–2 s).
2. Add `Sitemap:` line and explicit AI-crawler rules to robots.txt (15 min).
3. Publish `llms.txt` listing top tool pages and comparison guides (1 hr).
4. Add `<link rel="canonical">` via Next metadata API (sitewide).
5. Add non-attorney disclosure footer ("Operated by a developer, not a licensed attorney; not legal advice") for Trust/E-E-A-T.

---

## 1. Technical SEO — 78/100

**Pass:** SSR/prerendered (`X-Nextjs-Prerender: 1`), HTTPS + HSTS, mobile viewport, prerendered HTML for crawlers and LLMs, clean URL structure.

**Critical**
- `/attorneys` = **19,539,307 bytes** of HTML. Paginate.
- **No canonical tags** on homepage, `/ai-tools/harvey-ai`, or city pages.

**High**
- Single flat sitemap with 28,481 URLs — split into a `sitemap_index.xml`.
- IndexNow not implemented (`/indexnow` 404).
- No CSP / Permissions-Policy headers.
- AdSense placeholder client ID in homepage HTML.

**Medium**
- `changefreq: daily` + `priority: 1.0` on every URL (Google ignores; lazy signal).
- 6 hero images preloaded — only the LCP image should be.
- HSTS missing `includeSubDomains; preload`.

**Low**
- robots.txt has no AI-crawler directives, no future split-sitemap entries.
- HTTP→HTTPS uses `Refresh: 0` meta alongside `Location` (redundant).

---

## 2. Content Quality & E-E-A-T — 38/100

YMYL legal vertical + non-attorney solo operator + 28K+ programmatic pages = severe E-E-A-T exposure.

| Factor | Score |
|---|---|
| Experience | 4/20 |
| Expertise | 6/25 |
| Authoritativeness | 5/25 |
| Trust | 9/30 |

**Critical**
- 8,000 attorney profile pages: textbook scraped/parasitic-directory risk under the Sept 2025 QRG and recent core updates. Noindex until each has 150+ words of unique, verified data.
- 20,000 city pages: 400× over the 50-page hard-stop quality gate. Almost certainly templated. Noindex unless >60% unique content per page.
- Non-attorney operator on a YMYL topic with no prominent disclosure. Add sitewide footer.

**High**
- 98 tool pages risk pulling vendor marketing copy → duplicate-content overlap. Need 400+ words original + screenshots + verified pricing.
- Comparison guides (the strongest AI-citation surface) — see Section 6: **most don't actually exist yet**.
- Author bylines missing. Add a `Person` entity + "Why I built this" About page.

**Medium**
- Add FAQ blocks, definition blocks, question-format H2s, last-verified date stamps with a 90-day freshness SLA.
- Vary intros across templated pages.

---

## 3. On-Page SEO — 70/100

**Pass:** Homepage title (56 chars) and meta description (168 chars) within limits. Single H1 visible above the fold ("Discover the Best AI Tools for Attorneys"). Two CTAs above the fold on desktop and mobile. No horizontal scroll.

**Issues**
- Missing canonicals (covered in Technical).
- Tool-card descriptions truncated to ~60 chars on the homepage — un-citable and below the 134–167-word optimal passage length for AI engines.
- 2 mobile header tap targets under 44 px (likely logo / hamburger).
- Hero leaves significant top whitespace on mobile.
- Internal linking should cluster tool pages → comparison guides, not city pages.

---

## 4. Schema / Structured Data — 50/100

**Present:** `BreadcrumbList` on city pages; `SoftwareApplication` + `AggregateRating` + `Offer` on tool pages (good — but `aggregateRating` must be backed by genuine first-party reviews on-page or it's a policy violation); minimal `WebSite` + `SearchAction` on homepage.

**Missing — Critical**
- `Organization` (sitewide).
- Full `WebSite` + `SearchAction`.

**Missing — High**
- `BreadcrumbList` on non-city pages.
- `Article` / `BlogPosting` on comparison guides.
- `Attorney` / `LegalService` on attorney profiles (only with verified NAP — do not mark up scraped listings).

**Missing — Medium**
- `ItemList` on directory category pages.

**Do NOT add:** `HowTo` (deprecated Sept 2023), `SpecialAnnouncement` (deprecated July 2025), new `FAQPage` for SERP gain (Aug 2023 restriction limits rich results to gov/healthcare — keep existing FAQ blocks for LLM citation benefit only).

---

## 5. Performance / Core Web Vitals — 45/100

Lab estimates only (CrUX has no field data — insufficient traffic for the 28-day window).

| Metric | Homepage | Tool page | Status |
|---|---|---|---|
| LCP | ~3.4–4.2 s | ~3.0–3.6 s | Needs Improvement / Poor |
| INP | ~250–350 ms | ~220–300 ms | Needs Improvement |
| CLS | ~0.05–0.12 | ~0.05 | Borderline |

**Critical**
1. **Fix `/images/tools/*.png` 404s** — single biggest LCP win, ~1–2 s.
2. **Remove placeholder AdSense ID** — currently parses ~80 KB for nothing.

**High**
3. Add `width`/`height` (or aspect-ratio) to all `<img>`; migrate to `next/image`.
4. Code-split the 227 KB turbopack chunk; target <170 KB initial JS.
5. Defer GTM via `next/script` strategy="lazyOnload" to protect INP.

**Medium**
6. Preload only the actual LCP image, not 6.
7. Reserve CSS space for AdSense slots to prevent CLS.

Heaviest first-party JS: ~556 KB transfer (likely ~1.7 MB parse cost).

---

## 6. AI Search Readiness (GEO) — 38/100

| Dimension | Score |
|---|---|
| Citability | 25 |
| Structural Readability | 45 |
| Multi-Modal Content | 30 |
| Authority & Brand Signals | 35 |
| Technical Accessibility | 70 |

**Critical finding:** `/compare/harvey-vs-casetext` and `/compare` both **404**. The comparison guides referenced in the marketing playbook don't exist on the live site yet. This is the single biggest GEO gap — directories rarely get cited; comparison/definitive-answer pages do.

**llms.txt:** missing.
**AI crawlers:** implicitly allowed (no explicit allow-list in robots.txt).
**Brand mentions:** weak (no Wikipedia entity, minimal Reddit/YouTube footprint).

**Critical**
1. Build the comparison guides. `/compare/[a]-vs-[b]` with TL;DR verdict in first 60 words, comparison + pricing tables, "Best for…" definitive-answer blocks, FAQPage schema.
2. Publish `llms.txt`.

**High**
3. Expand tool cards into 400–800 word profiles with definitive answers and pros/cons tables.
4. Explicit robots.txt allow-list for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, CCBot.
5. Add author bylines, dates, and `Organization` schema with `sameAs`.

**Medium**
6. Convert H2s to question format.
7. Add a methodology / "How we test" page.
8. Build YouTube presence (~0.737 correlation with AI citations — strongest known signal).

---

## 7. Images — 30/100

- **All 6 preloaded `/images/tools/*.png` return 404.** Critical fix.
- No `width`/`height` on tool logos → CLS risk.
- No `next/image` migration → no AVIF/WebP, no automatic sizing.
- AdSense reserves no slot dimensions → CLS on ad insertion.
- Once images are fixed: add `Cache-Control: immutable, max-age=31536000`.

---

## 8. Visual / Mobile UX

Strong above-the-fold execution. Clear value prop, visible H1, dual CTAs above the fold on desktop (1280) and mobile (375). No horizontal scroll on mobile. 16 px base font. Two sub-44 px header tap targets need padding fixes. Screenshots saved at `D:/new 1/screenshots/desktop_1280.png` and `mobile_375.png`.

---

## Sitemap Structure (Recommended)

Split into `sitemap_index.xml` referencing:
1. `sitemap-tools.xml` — 98 tool pages
2. `sitemap-comparisons.xml` — comparison guides (after they exist)
3. `sitemap-attorneys.xml` — only verified, unique profiles
4. `sitemap-cities.xml` — only if uniqueness gate passes (otherwise omit)
5. `sitemap-static.xml` — homepage, about, legal

Add `Sitemap: https://attorneyaitools.org/sitemap_index.xml` to robots.txt.

---

## Bottom Line

The site is technically well-built but currently has almost nothing worth citing. AI engines and Google will surface law.com, ABA Journal, and Above the Law instead — until you (a) ship the comparison guides, (b) prune or rewrite the 28K programmatic pages, and (c) fix the broken hero images and the 19.5 MB attorneys page. Doing those three things alone would push the health score from 55 to ~75.

See `ACTION-PLAN.md` for the prioritized punch list.
