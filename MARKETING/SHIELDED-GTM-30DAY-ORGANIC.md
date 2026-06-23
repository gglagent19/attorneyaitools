# Shielded — 30-Day Organic GTM (No Paid Ads)

**Product:** Shielded — AI insurance-claim recovery assistant. **Premium $150/mo.**
**Funnel:** Organic traffic → **free 90-second policy/claim analysis** → "you're owed $X more" → **paid Premium** (drafts, negotiation letters, benchmarking, deadlines).
**Window:** 2026-06-22 → 2026-07-21
**Channels:** SEO · Reddit/forums · Facebook groups · short-form video · Quora · YouTube · partnerships · PR/HARO. **Zero ad spend.**

> Buyer = a policyholder with a **denied or lowballed claim** (home, auto, property, storm). NOT attorneys. Every channel below targets *that* person at the moment of frustration.

---

## North Star

**Paying Premium customers added/month.** Supporting metrics: free analyses started, free→paid %, organic clicks/day.

| Metric | Day 30 target |
|---|---|
| Free analyses started | 1,500 |
| Free → paid conversion | 6–10% |
| New paying customers | 90–150 |
| Claimant-intent pages indexed | 200+ |
| Organic clicks/day | 250+ |
| Email list | 800 |

At $150/mo, **100 customers = $15K MRR** with $0 ad spend.

---

## GATE — Day 0 (the funnel must convert before you drive traffic)

Organic traffic is too hard-won to waste on a broken funnel.

- [ ] **Free analysis actually works end-to-end** — upload policy + adjuster estimate → returns a credible "$X gap" result. This is the entire hook.
- [ ] **The "aha → paywall" moment is sharp** — free shows the *gap*; paying unlocks the *letters/drafts/benchmarks*. Make the locked value obvious.
- [ ] **Pricing page live & clear** ($150/mo Premium, what's included, cancel anytime, "keep it only while your claim is open").
- [ ] **Conversion tracking** — GA4 events: `analysis_started`, `gap_revealed`, `paywall_viewed`, `subscribe`. You can't optimize a funnel you can't see.
- [ ] **Claimant landing pages live** — at least 10 (see SEO below). Stop sending claimants to legal-AI-tools pages — wrong audience.
- [ ] **Shareable result** — let users share/screenshot "Shielded found I'm owed $14,200 more" (anonymized). This is your viral loop.
- [ ] **⚠️ Compliance check** — confirm Shielded is positioned as a *self-help document/analysis tool*, NOT "we negotiate for you" / "we represent you." Public-adjusting and law are licensed in most states. Wording matters; get this right before PR. (Flag for a lawyer; don't let it block content, but fix copy now.)

---

## The growth loop (this is the strategy, everything else feeds it)

```
Frustrated claimant Googles "insurance claim denied"
        → lands on a Shielded claimant page (SEO)
        → runs FREE 90-sec analysis
        → sees "you're owed $X more"  ← the dopamine hit
        → shares the result / tells their group  ← loop back to top
        → subscribes $150/mo to get the letters  ← revenue
```

Optimize two numbers relentlessly: **(1) traffic→free-analysis** and **(2) free→paid**. Aggressive organic growth = more loop spins, not more ad budget.

---

## WEEK 1 (Day 1–7) — Retool SEO for the claimant + seed communities

Your existing programmatic machinery targets *lawyers*. Repoint it at *claimants*.

- **Day 1 — Keyword pivot.** Build the claimant keyword map. High-volume, high-intent, low-competition:
  - "insurance claim denied what to do", "how to appeal a [home/auto/health] insurance claim", "adjuster lowballed me", "insurance company not paying enough", "public adjuster vs doing it yourself", "how to write an insurance claim appeal letter", "[State] insurance claim dispute".
- **Day 2 — Programmatic v2.** Reuse `scripts/generate-programmatic-pages.ts` to spin **State × Claim-type** pages (50 states × {home, auto, storm/hurricane, water damage, fire, denial appeal}). Each: the problem, the law/deadline for that state, "how Shielded helps", free-analysis CTA. Quality-gate them (don't repeat the 28K-thin-page mistake — keep each genuinely useful).
- **Day 3 — 5 flagship guides** (the GEO/AI-citation assets): "How to Fight a Denied Insurance Claim (2026)", "What to Do When the Adjuster Lowballs You", "Public Adjuster vs DIY vs Lawyer: Which Do You Need?", "How to Write a Claim Appeal Letter (with template)", "How Much Is My Claim Actually Worth?". Each ends in the free analysis.
- **Day 4 — robots/IndexNow/llms.txt** updated for the new claimant URLs. `node scripts/submit-indexnow.cjs`.
- **Day 5 — Reddit recon + first value posts.** Subs: **r/Insurance, r/InsuranceClaims, r/HomeownersInsurance, r/legaladvice, r/personalfinance, r/HomeImprovement (storm damage)**. ⚠️ These subs HATE promo. Strategy: answer questions genuinely, build comment karma, mention the free tool only where it truly helps. No link-dropping.
- **Day 6 — Facebook/forum recon.** Join: homeowner claim-denial groups, hurricane/disaster recovery groups (FL, TX, LA, NC), "insurance claim help" groups. Read the rules; start by answering, not posting.
- **Day 7 — Quora.** Find top "insurance claim denied / appeal" questions (they rank in Google for years). Write 5 genuinely helpful answers, soft-mention the free analysis.

**Week 1 out:** ~50 programmatic pages, 5 flagship guides, Reddit/FB presence seeded, 5 Quora answers.

---

## WEEK 2 (Day 8–14) — Short-form video + the storytelling engine

Insurance-claim pain is emotional and visual — perfect for Reels/Shorts/TikTok. Your reel assets already exist; refocus them on the claimant story.

- **Day 8 — Repurpose reels for the claimant.** The Shielded story isn't "lawyers save time" — it's "**homeowner gets $17,800 more than the adjuster offered.**" Re-script REELS-CAMPAIGN around the recovery moment. (Finish the `generate-voiceovers.mjs` msedge-tts pivot to unblock rendering.)
- **Day 9 — Launch video channels.** Post to TikTok + IG Reels + YouTube Shorts. Format that works: "Insurance denied your claim? Do THIS." / "3 words that make adjusters reopen your claim." / screen-record the free analysis finding a $14K gap.
- **Day 10 — YouTube long-form.** One real walkthrough: "I uploaded a denied claim to AI — here's the $14,200 it found." YouTube has the strongest correlation with AI citations and ranks in Google.
- **Day 11 — Reddit round 2** (different subs, value-first), + answer fresh claim-denial threads daily (set up alerts for "denied", "lowball", "adjuster" in target subs).
- **Day 12 — Facebook group value posts** — share a genuinely useful "5 things to check before accepting an adjuster's offer" carousel; the tool is the soft CTA.
- **Day 13 — TikTok/Shorts cadence locked** — 1–2 short videos/day from a content bank. Reply to every comment (algorithm + trust).
- **Day 14 — Week review:** which video hook drove the most free analyses? Double down on that format.

**Week 2 out:** 3–5 platforms live on video, daily short-form cadence, 1 YouTube walkthrough, Reddit/FB round 2.

---

## WEEK 3 (Day 15–21) — Partnerships + PR (organic authority)

The people who meet your customer *before* you do: contractors, restoration companies, public adjusters, consumer advocates.

- **Day 15 — Referral partnerships.** Roofers/restoration/water-damage contractors constantly see denied claims. Offer them a way to send homeowners to Shielded (co-branded free analysis). They look helpful; you get warm traffic. Zero ad spend.
- **Day 16 — Public adjuster angle.** Some PAs will refer claims too small for them. Others compete — position Shielded as the DIY tier *below* a PA. Reach out to a few.
- **Day 17 — HARO / journalist outreach.** Consumer-advocacy hook: "AI is helping homeowners fight insurers after [storm season]." Storm season + insurance disputes = press-friendly. Answer queries as founder. High-authority backlinks.
- **Day 18 — Newsletter launch.** "Claim Smart" — weekly: one denial story + how it was overturned + one tip. Capture emails from the free-analysis flow (nurture the people not ready to pay yet).
- **Day 19 — Comparison/SEO content** — "Shielded vs hiring a public adjuster", "Shielded vs hiring a lawyer", "Is Shielded worth $150/mo?" (own your branded + objection queries).
- **Day 20 — Local/seasonal play.** Target current/recent disaster zones (whatever's in the news) with state-specific pages + posts in those regional FB groups. Disaster = surge of denied claims = surge of intent.
- **Day 21 — Mid-campaign audit.** Re-run `/seo audit`. Check free→paid % by traffic source — pour effort into the source converting best.

**Week 3 out:** partnership outreach, HARO answers, newsletter #1, objection-handling content, disaster-zone targeting.

---

## WEEK 4 (Day 22–30) — Optimize the funnel + scale winners

You now have data. Stop guessing.

- **Day 22–23 — Conversion optimization.** Where do people drop? If many run the free analysis but don't pay → sharpen the paywall value / add urgency (claim deadlines). If few start the analysis → fix the landing hook. This beats more traffic.
- **Day 24 — Scale the winning channel.** If Reddit converts → go deeper. If Shorts → 3/day. If a state page ranks → build 10 more in that cluster. Cut anything <5% of signups.
- **Day 25 — Social proof loop.** Turn real wins into shareable case studies ("$17,800 recovered") → feed back into video + landing pages. Ask happy users to share their (anonymized) result.
- **Day 26 — Newsletter #2** + re-engage non-converters with a "still fighting your claim?" sequence.
- **Day 27 — Backlink follow-ups** — bump every silent partnership/HARO/journalist thread.
- **Day 28 — "30 days of denied-claim data" post** — data content earns links + works on Reddit/LinkedIn/HN.
- **Day 29 — Founder story content** — "Why I built an AI to fight insurance companies." Authentic founder narrative converts on a trust-driven product.
- **Day 30 — Retro vs targets.** Lock the Month-2 plan from what actually moved free→paid.

---

## Always-on daily cadence (~60–90 min, no spend)

1. **Answer 3–5 claim-denial threads** (Reddit + FB + Quora) genuinely. This is the #1 organic lever for this product.
2. **Post 1–2 short videos** from the bank.
3. **Reply to every comment/DM** within hours.
4. **Watch the funnel** — free analyses started + free→paid in GA4. Note one fix for tomorrow.
5. **Ship/refresh 1 SEO page**, IndexNow it.

---

## Channel priority (no-paid, for THIS buyer)

| Channel | Why it fits the denied-claim buyer | Effort |
|---|---|---|
| **SEO (claimant keywords)** | They literally Google "claim denied" — compounding, free | High, top ROI |
| **Free analysis = PLG loop** | Self-serve aha → shareable → built-in virality | Build once |
| **Reddit / FB claim groups** | Where frustrated claimants vent and ask | Med, daily |
| **Short-form video** | Emotional, visual pain; assets half-built | Med |
| **YouTube + Quora** | Rank in Google for years; AI-citation friendly | Med |
| **Partnerships (contractors/PAs)** | Warm referrals, they meet the customer first | Med, durable |
| **PR/HARO** | Consumer-advocacy + storm-season angle = links | Low-Med |
| **Newsletter** | Nurtures the not-yet-ready (long claim cycles) | Low |

---

## Risks to watch

1. **Reddit/FB backlash** — these communities punish promotion. Value-first or get banned. This is the biggest execution risk.
2. **Regulatory** — don't let copy imply unlicensed public adjusting or legal representation. Position as a self-help analysis/drafting tool. Fix wording Day 0.
3. **Churn (one-claim lifetime)** — revenue depends on a *constant inflow* of new claimants. SEO + video must never stop. (Mitigate later: annual "policy checkup," multi-claim households, B2B2C via contractors.)
4. **Free-analysis credibility** — if the "$X gap" looks made up, trust dies. The output must be defensible.

---

## What "no paid ads" buys you

Trade-off vs paid: **slower month 1, far better economics.** CAC ≈ $0, so at $150/mo even a 2–3 month customer lifetime is pure margin. The organic flywheel (SEO + PLG loop + community) compounds — paid stops the day you stop spending. This plan is built to still be generating customers in month 12 from work done in month 1.
