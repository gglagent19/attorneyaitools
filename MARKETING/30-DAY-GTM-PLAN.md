# 30-Day Aggressive GTM Plan — AttorneyAITools.org

**Window:** 2026-06-22 → 2026-07-21
**Owner:** Chandu (solo founder/dev)
**Model:** Free directory → traffic monetized via AdSense + affiliate (tool referrals) + future sponsored listings.

> This plan *orchestrates* assets you already have (MARKETING.md, OUTREACH/*, MARKETING/REELS-CAMPAIGN.md). It does not re-create them. Each day points to the file to copy from.

---

## North Star & Targets (30 days)

| Metric | Day 0 baseline | Day 30 target |
|---|---|---|
| Organic clicks/day (GSC) | ~baseline | 300+/day |
| Total sessions (month) | — | 15,000 |
| Indexed pages (quality, non-noindexed) | tools + comparisons + posts | 250+ |
| Referring domains (new) | — | 30+ |
| Email list (newsletter) | 0 | 500 |
| Social followers (LI + X combined) | — | 1,000 |
| AI citations (ChatGPT/Perplexity mentions) | 0 | tracked weekly, ≥5 |

**One number that matters:** organic clicks/day. Everything else feeds it.

---

## GATE — Day 0 (must ship before any launch traffic)

Aggressive distribution onto a leaky funnel wastes the launch. Close these from ACTION-PLAN.md first:

- [ ] Fix `/images/tools/*.png` 404s (item 1) — LCP killer, kills bounce on landing
- [ ] Paginate `/attorneys` (item 2) — 19.5 MB page
- [ ] Noindex 20K city + 8K attorney pages until unique (items 3–4) — avoids spam classification *before* you send crawlers
- [ ] Sitewide canonicals (item 5) + remove placeholder AdSense ID (item 6)
- [ ] Non-attorney disclosure sitewide (item 7) — YMYL trust
- [ ] **5–10 flagship comparison guides LIVE** (item 8) — these are the conversion + GEO assets every channel links to
- [ ] robots.txt: AI crawler allow-list + Sitemap line (item 10); IndexNow live (item 11)
- [ ] GA4 + GSC verified, events firing (you fixed GA4 prop ID already)

**Do not start Week 1 outbound until the comparison guides + image fix are live.** That's the only hard dependency.

---

## WEEK 1 (Day 1–7) — Foundation + Soft Launch ("warm the channels")

Goal: seed every channel, get first backlinks indexed, no big spikes yet.

| Day | Primary action | Asset |
|---|---|---|
| 1 | Publish/refresh About + "Why I built this" + methodology page (E-E-A-T). Submit all URLs via IndexNow. | ACTION-PLAN #18, #29 |
| 2 | LinkedIn launch post from personal account (Tue 7–9am EST). Reply to every comment within 1 hr. | MARKETING.md LinkedIn |
| 3 | Seed 3 low-risk subreddits (r/Lawyertalk, r/Legaltech). Value-first, not link-spam. Space 24h apart. | OUTREACH/REDDIT_VARIATIONS.md |
| 4 | Start Twitter/X: pin the 10-tweet thread. Begin posting 2–3x/day from the library. | OUTREACH/TWITTER_LIBRARY.md |
| 5 | Submit to free directories: Futurepedia, There's An AI For That, AI tool aggregators, legal-tech lists. (Easy backlinks.) | OUTREACH/BACKLINK_TARGETS.md |
| 6 | Cold-email batch 1: 10 legal-tech newsletters/bloggers. Personalized. | OUTREACH/GUEST_POSTS.md + MARKETING.md cold template |
| 7 | Review week: GSC coverage, which pages indexed, fix any crawl errors. Run `node scripts/submit-indexnow.cjs`. | — |

**Week 1 output:** 1 LI post, 3 Reddit posts, ~15 tweets, 8 directory submissions, 10 cold emails, 1 about/methodology page.

---

## WEEK 2 (Day 8–14) — The Launch Spike ("go loud")

Goal: one coordinated big day. Concentrate firepower.

- **Day 9 (Tue) = LAUNCH DAY.** Product Hunt (12:01am PT) + Hacker News "Show HN" + Reddit r/SideProject/r/ArtificialIntelligence + email everyone you know to upvote/comment in first 2 hrs.
  - PH assets: MARKETING.md Product Hunt section (tagline, description, first comment, screenshots).
  - HN title: "Show HN: Free directory of 98 AI tools built for lawyers (with honest pricing)". Be in the thread all day answering.
- **Day 8:** Pre-launch — line up 10–15 people to engage at launch. Schedule PH hunter. Prep screenshots/gallery video.
- **Day 10:** Press release distribution (legal-tech press, local Bangalore/India tech press, free PR wires). | OUTREACH/PRESS_RELEASE.md
- **Day 11:** Reels go live — render the 4 pending videos (REELS-CAMPAIGN.md needs Higgsfield credit top-up OR finish the msedge-tts pivot per `generate-voiceovers.mjs`). Post Reel 1 + 2 to IG Reels, TikTok, YouTube Shorts, LI video.
- **Day 12:** Influencer/affiliate outreach batch — legal-tech LinkedIn creators + tool vendors (co-marketing). | OUTREACH/INFLUENCER_LIST.md, AFFILIATE_OUTREACH.md
- **Day 13:** Capitalize on launch traffic — run `node scripts/traffic-enrichment.cjs` to enrich the pages actually earning views.
- **Day 14:** Recap post ("We launched, here's what happened") on LI + X — launches generate their own follow-up content.

**Week 2 output:** PH + HN launch, press release, 2 reels live across 4 platforms, recap content.

---

## WEEK 3 (Day 15–21) — Content & Backlink Engine ("compound")

Goal: turn the spike into a flywheel. Publish, link, repeat.

- **Daily:** 1 SEO asset shipped/day — new comparison guide OR expanded tool profile (400–800 words) OR practice-area hub. You have 50 practice areas + 98 tools = endless `/compare/[a]-vs-[b]`. Prioritize by GSC impressions (pages ranking #8–20 → push to page 1).
- **Day 15–16:** Guest post outreach round 2 — pitch 2 actual guest articles to legal-tech blogs. | OUTREACH/GUEST_POSTS.md
- **Day 17:** Reels 3, 4, 5 live. Repurpose top reel as paid test ($50–100) if any organic reel >5% engagement.
- **Day 18:** Launch the newsletter — "Legal AI Weekly": 1 tool review + 1 comparison + 1 news item. Add email capture to high-traffic pages (you removed signup friction; a soft footer opt-in is fine). | OUTREACH/EMAIL_NEWSLETTER.md
- **Day 19:** Reddit round 2 — different subs (r/LawFirm, r/smalllaw, r/personalinjury) with practice-area-specific value posts.
- **Day 20:** HARO / journalist outreach — answer queries as "founder of largest legal-AI directory" for high-authority backlinks.
- **Day 21:** Mid-campaign audit — re-run `/seo audit https://attorneyaitools.org/`. Compare health score vs Day 0. Double down on the top-3 traffic pages.

**Week 3 output:** 7 SEO assets, 2 guest posts pitched, 3 reels, newsletter #1, Reddit round 2, HARO answers.

---

## WEEK 4 (Day 22–30) — Scale Winners + Monetize ("harvest")

Goal: cut losers, pour into winners, turn on revenue.

- **Day 22–24:** Scale whatever worked. If Reddit drove traffic → more subs. If LI → post daily. If a comparison guide ranks → build 5 more in that cluster. Be ruthless: kill any channel with <5% of traffic.
- **Day 25:** Turn on monetization properly — verify AdSense placements (CLS-safe, item 22), add disclosed affiliate links on tool/comparison pages where programs exist (Clio, Smokeball, etc. via AFFILIATE_OUTREACH targets).
- **Day 26:** Newsletter #2 + first re-engagement to Week-3 subscribers.
- **Day 27:** Backlink push — follow up with every cold email/guest pitch that went silent. "Bump" emails convert ~30% of non-responders.
- **Day 28:** Second launch surface — relaunch on a niche directory you missed, or post the "30 days of data" findings thread (data posts get links).
- **Day 29:** Sponsored-listing pilot — pitch 3 tool vendors a paid featured placement now that you have traffic numbers to show.
- **Day 30:** Full retrospective vs targets table. Write the Month-2 plan from the data. Run final IndexNow + traffic-enrichment sweep.

**Week 4 output:** scaled top channel, AdSense + affiliate live, newsletter #2, follow-up backlinks, monetization pilots.

---

## Always-On Daily Cadence (every day, ~60–90 min)

1. **Engage** — reply to every comment/DM/Reddit reply within hours (algorithms reward speed; this is the #1 lever for a solo founder).
2. **Post** — 2–3 tweets + 1 LI comment/post from the library.
3. **Watch** — GSC top movers + GA4 realtime. Note 1 page to improve tomorrow.
4. **Submit** — any new/updated page → `node scripts/submit-indexnow.cjs`.

---

## Channel Priority (effort × payoff for THIS site)

| Channel | Why it fits | Effort |
|---|---|---|
| **SEO / comparison guides** | Directory's core moat; compounding; GEO-citable | High, highest ROI |
| **Reddit** | Lawyers + AI crowds are active and link-friendly | Med |
| **LinkedIn** | B2B legal-tech buyers live here | Med |
| **Product Hunt + HN** | One-time spike + DR-90 backlinks | High, one-time |
| **Reels/Shorts** | Assets already half-built; awareness | Med (finish voiceovers) |
| **Newsletter** | Owned audience, retention, repeat traffic | Low-Med |
| **Cold/guest outreach** | Referring domains = the ranking unlock | High, durable |

Paid ads: only a $50–100 reel-boost test in Week 3. This is an organic-first GTM until unit economics are proven.

---

## Tracking (review every Friday)

- GSC: clicks, impressions, avg position, top pages, new queries
- GA4: sessions, source/medium, top landing pages, bounce/engagement
- Backlinks: new referring domains (Search Console links report / Ahrefs free)
- AI visibility: weekly manual check — ask ChatGPT/Perplexity "best AI tools for lawyers" and "Harvey vs Casetext", note if you're cited
- Newsletter: subscribers, open rate

**Weekly ritual:** every Friday, fill the targets table with actuals, then move next week's budget of effort to whatever channel over-indexed.

---

## Critical-path dependencies (don't skip)

1. **Image 404 fix + comparison guides** gate the whole launch (Week 1).
2. **Reels voiceover pivot** (`generate-voiceovers.mjs`, msedge-tts) gates Reels (Week 2 Day 11) — finish it Week 1 evenings or top up Higgsfield credits.
3. **AdSense/affiliate** can lag to Week 4 — don't let monetization setup delay distribution.
