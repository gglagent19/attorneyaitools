# Analytics & Tracking Plan — "Record Everything to Scale"

Goal: measure the **full Shielded funnel** end-to-end so we can see which SEO pages, states, and claim types produce paying customers — then pour effort into the winners.

```
SEO page (directory)  →  CTA click  →  free analysis  →  gap revealed  →  paywall  →  subscribe
   GA: G-20VJ6GN3C7        ✅ tracked     ────────── app.html: G-PCBWWF3T8X ──────────
```

---

## ⚠️ Critical issue: the funnel spans two GA4 properties

| Surface | GA4 Measurement ID | Owns which steps |
|---|---|---|
| Directory (this repo) | **G-20VJ6GN3C7** | page views, CTA clicks |
| Shielded app (`/app.html`, separate prototype) | **G-PCBWWF3T8X** | analysis, gap, paywall, subscribe |

**Right now you cannot see the whole funnel in one report** — the click and the conversion live in different properties, and a user can't be stitched across them. This must be fixed to scale intelligently.

### The fix (pick one)

1. **Dual-tag the app (recommended, lowest effort).** Add the directory's ID `G-20VJ6GN3C7` to `/app.html` *in addition* to its own. Then property G-20VJ6GN3C7 sees the entire journey. Since both surfaces are on the same domain (`attorneyaitools.org/app.html`), GA4 stitches the session automatically — **no cross-domain config needed** once the IDs match.
2. **Consolidate to one property.** Standardize both surfaces on a single GA4 ID. Cleanest long-term.

> ⛔ The `/app.html` prototype is **not in this repo** (it's proxied from an external host), so I can't edit it here. The snippets below are what needs to be added there. Until then, directory-side CTA tracking (already shipped) is the best available signal.

---

## What's already shipped (directory side, this repo)

- **GA loads without dropping events.** The `gtag` shim is defined `afterInteractive` (so `window.gtag` exists during interaction and queues events); the heavy library stays `lazyOnload` to protect INP. (`src/app/layout.tsx`)
- **Event helper.** `src/lib/analytics.ts` → `trackEvent(name, params)` and `trackFreeAnalysisClick(params)`. Safe everywhere; queues if the library isn't loaded yet; uses sendBeacon so events survive navigation to `/app.html`.
- **CTA tracking.** `src/components/ShieldedCTA.tsx` fires `shielded_cta_click` on every free-analysis click, with rich params.

### Event: `shielded_cta_click`
| param | example | why |
|---|---|---|
| `funnel_step` | `free_analysis_click` | groups funnel events |
| `claim_state` | `Florida` | **which states convert** |
| `cta_position` | `top` / `bottom` | which placement converts |
| `page_path` | `/roof-damage-insurance-claim-denied-texas` | **which pages/claim-types convert** |
| `destination` | `app.html` | outbound target |

This alone answers the scaling question: *which claim pages drive the most free-analysis clicks?* → build more like those.

---

## What to add on `/app.html` (Shielded prototype)

Add the directory GA ID, then fire these events at each funnel step. Keep the names **exactly** as below so reports line up.

```html
<!-- 1. Dual-tag: add the directory property alongside the app's own -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-20VJ6GN3C7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-PCBWWF3T8X');   // app's existing property
  gtag('config', 'G-20VJ6GN3C7');   // directory property — now sees the full funnel
</script>
```

```js
// 2. Fire at each step (call from the app's React handlers):
gtag('event', 'analysis_started',  { claim_type, claim_state });          // upload submitted
gtag('event', 'gap_revealed',      { estimated_gap, claim_type });        // result shown — the aha
gtag('event', 'paywall_viewed',    { estimated_gap });                    // hit the Premium wall
gtag('event', 'subscribe_clicked', { plan: 'premium', price: 150 });      // clicked subscribe
gtag('event', 'subscribe',         { plan: 'premium', value: 150, currency: 'USD' }); // PAID — the conversion
```

---

## GA4 UI setup (do this in the GA4 dashboard — 20 min, can't be coded)

1. **Mark conversions (Admin → Events → toggle "Mark as key event"):**
   - `shielded_cta_click` (micro-conversion)
   - `gap_revealed` (activation)
   - `subscribe` (the money event)
2. **Register custom dimensions (Admin → Custom definitions → Create):** `claim_state`, `claim_type`, `cta_position`, `page_path`, `estimated_gap`. Without this, the params won't be usable in reports.
3. **Build a Funnel exploration (Explore → Funnel):**
   `page_view → shielded_cta_click → analysis_started → gap_revealed → paywall_viewed → subscribe`
   Break down by `claim_state` and `page_path` to see which states/pages convert best.
4. **Link Google Search Console** (Admin → SC links) so organic query → landing page → conversion is one view.
5. **Mark `/app.html` as internal traffic / not a referral** so the session isn't split (Admin → Data Streams → Configure tag → List unwanted referrals: `attorneyaitools.org`).
6. **Set up a weekly email report / Looker Studio dashboard** with: free analyses, free→paid %, new subscribers, top converting pages, top converting states.

---

## The scaling loop this enables

1. Ship claim pages (50 states × 8 types — **done, 400 live**).
2. Watch `shielded_cta_click` by `page_path` + `claim_state`.
3. Watch `subscribe` by the same dimensions (once app is dual-tagged).
4. **Double down** on the state/claim-type combos with the best free→paid %; cut or rewrite the rest.
5. Expand the winners into flagship guides, video, and community posts.

Everything is measured, so scaling is a data decision — not a guess.

---

## Post-deploy checklist

- [ ] Deploy the directory (400 claim pages + 5 guides go live).
- [ ] Run `node scripts/submit-indexnow.cjs` to ping Bing/Yandex/etc. **(only after deploy — IndexNow needs live URLs).**
- [ ] Submit the updated sitemap in Google Search Console.
- [ ] Dual-tag `/app.html` with `G-20VJ6GN3C7` and add the 5 funnel events.
- [ ] Complete the GA4 UI setup above.
- [ ] Verify in GA4 Realtime: load a claim page, click the CTA, confirm `shielded_cta_click` fires with params.
