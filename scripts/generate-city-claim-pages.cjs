/**
 * Generate city-level insurance-claim-help pages (one strong page per city).
 *
 * Phased by population to avoid mass doorway/thin-content penalties:
 *   node scripts/generate-city-claim-pages.cjs            # Tier 1: pop >= 100k (~313)
 *   node scripts/generate-city-claim-pages.cjs --min 50000   # Tier 2: ~785
 *   node scripts/generate-city-claim-pages.cjs --min 25000   # Tier 3: ~1542
 *   node scripts/generate-city-claim-pages.cjs --force        # overwrite existing
 *
 * Output: vault/Programmatic SEO/*.md  (template "claim-by-state", so the
 * existing [slug] renderer shows the Shielded CTA). Each page targets local
 * intent ("[city] insurance claim help / denied claim lawyer") and links to the
 * state claim pages + find-a-lawyer.
 */

const fs = require("fs");
const path = require("path");
const { seedFrom, pick, disputeSteps, deadlineNote, faqBlock } = require("./claim-content-lib.cjs");

const VAULT_OUT = path.join(__dirname, "..", "vault", "Programmatic SEO");
const CITIES = path.join(__dirname, "..", "vault", "Datasets", "cities-enriched.json");
const NAIC = "https://content.naic.org/state-insurance-departments";
const APP_CTA = "/app.html?utm_source=seo&utm_medium=organic&utm_campaign=city-claim-pages";

const argMin = process.argv.indexOf("--min");
const MIN_POP = argMin > -1 ? Number(process.argv[argMin + 1]) : 100000;
const FORCE = process.argv.includes("--force");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// State → common perils (factual framing for local relevance).
const STATE_PERILS = {
  Alabama: "hurricanes and tornadoes", Alaska: "earthquakes and winter storms",
  Arizona: "monsoon storms and flooding", Arkansas: "tornadoes and flooding",
  California: "wildfires, earthquakes, and mudslides", Colorado: "hail, wildfires, and snow load",
  Connecticut: "coastal storms and flooding", Delaware: "coastal storms and flooding",
  Florida: "hurricanes, tropical storms, and flooding", Georgia: "severe storms and tornadoes",
  Hawaii: "hurricanes and flooding", Idaho: "wildfires and winter storms",
  Illinois: "severe storms, hail, and flooding", Indiana: "tornadoes and severe storms",
  Iowa: "derechos, tornadoes, and hail", Kansas: "tornadoes and hail",
  Kentucky: "tornadoes and flooding", Louisiana: "hurricanes and flooding",
  Maine: "nor'easters and winter storms", Maryland: "coastal storms and flooding",
  Massachusetts: "nor'easters and coastal storms", Michigan: "severe storms and winter weather",
  Minnesota: "hail, severe storms, and winter weather", Mississippi: "hurricanes and flooding",
  Missouri: "tornadoes, hail, and flooding", Montana: "wildfires, hail, and winter storms",
  Nebraska: "tornadoes, hail, and flooding", Nevada: "flash flooding and wind",
  "New Hampshire": "winter storms and flooding", "New Jersey": "coastal storms and flooding",
  "New Mexico": "wildfires and flash flooding", "New York": "winter storms, flooding, and wind",
  "North Carolina": "hurricanes and severe storms", "North Dakota": "flooding, hail, and blizzards",
  Ohio: "severe storms and winter weather", Oklahoma: "tornadoes and hailstorms",
  Oregon: "wildfires and windstorms", Pennsylvania: "flooding and winter storms",
  "Rhode Island": "coastal storms and flooding", "South Carolina": "hurricanes and coastal flooding",
  "South Dakota": "hail, tornadoes, and blizzards", Tennessee: "tornadoes and flooding",
  Texas: "hailstorms, hurricanes, and freeze events", Utah: "wildfires and winter storms",
  Vermont: "flooding and winter storms", Virginia: "hurricanes and coastal flooding",
  Washington: "windstorms and flooding", "West Virginia": "flooding and winter storms",
  Wisconsin: "severe storms and winter weather", Wyoming: "hail, wind, and blizzards",
};

function introVariant(city, state, county, i) {
  const countyName = county
    ? /county$/i.test(county) ? county : `${county} County`
    : null;
  const where = countyName || `the ${city} area`;
  const variants = [
    `If your insurance claim in ${city}, ${state} was denied or came back far below your repair costs, you are not stuck with that first number. Homeowners and policyholders across ${where} dispute lowball offers every day — and many recover thousands more than they were first offered.`,
    `A denied or underpaid insurance claim in ${city}, ${state} doesn't mean your case is closed. Residents across ${where} have the right to question the adjuster's estimate, request a re-inspection, and appeal.`,
    `Insurers in ${city}, ${state} routinely issue low initial offers. The gap between what they pay and what your policy actually owes is often large — and entirely disputable. Here's how ${city} policyholders fight back.`,
  ];
  return variants[i % variants.length];
}

function buildContent(city, state, county, population, idx) {
  const loc = `${city}, ${state}`;
  const seed = seedFrom(loc);
  const perils = STATE_PERILS[state] || "severe weather";
  const popLine = population
    ? `With a population of about ${Number(population).toLocaleString("en-US")}, ${city} sees a steady volume of property and casualty claims`
    : `${city} sees a steady volume of property and casualty claims`;
  const countyLine = county
    ? ` Adjusters working ${/county$/i.test(county) ? county : county + " County"} handle everything from storm losses to water and fire damage.`
    : "";

  const whyLead = pick([
    `${popLine}, and across ${state} a large share are driven by ${perils}.`,
    `${popLine}. In ${state}, ${perils} account for many of the losses behind these claims.`,
    `${popLine}, with ${perils} a frequent cause of ${state} property losses.`,
  ], seed, 5);

  return `## Insurance Claim Denied or Underpaid in ${loc}?

${introVariant(city, state, county, idx)}

[**▶ Run a free 90-second analysis of your claim**](${APP_CTA}) — upload your policy and the adjuster's estimate and see whether you're being offered what your policy actually owes in ${city}.

## Why ${city} Insurance Claims Get Denied

${whyLead}${countyLine} Common reasons a ${loc} claim is denied or underpaid:

- Damage is reclassified as "wear and tear" or an excluded cause to cut the ${city} payout
- The repair scope is written narrowly — patching instead of replacing, or excluding matching materials
- Depreciation is applied aggressively, holding back recoverable depreciation you're owed once repairs are done
- The insurer relies on a desk review instead of a full, documented ${city} inspection

${disputeSteps(loc, state, "insurance claim", seed)}

${deadlineNote(loc, state, seed)}

## Get Help With Your ${city} Claim

Shielded reads your policy and the adjuster's estimate and shows — in about 90 seconds — where the offer falls short of what your policy owes in ${loc}, then drafts the rebuttal letter and tracks your deadlines.

[**Start your free claim analysis →**](${APP_CTA})

Prefer to work with an attorney? [Get matched free with an insurance claim lawyer near ${city}](/find-a-lawyer).

${faqBlock(loc, state, "insurance claim", seed)}

*Shielded is a self-help analysis and document tool. It is not a law firm or a licensed public adjuster, and it does not provide legal advice.*
`;
}

// ── Generate ─────────────────────────────────────────────────────────────────
const cities = JSON.parse(fs.readFileSync(CITIES, "utf8"))
  .filter((c) => (c.population || 0) >= MIN_POP)
  .sort((a, b) => (b.population || 0) - (a.population || 0));

if (!fs.existsSync(VAULT_OUT)) fs.mkdirSync(VAULT_OUT, { recursive: true });

let generated = 0, skipped = 0, idx = 0;
for (const c of cities) {
  idx++;
  const slug = `insurance-claim-help-${slugify(c.name)}-${c.state_slug || slugify(c.state)}`;
  const title = `Insurance Claim Denied in ${c.name}, ${c.state}?`;
  const description = `Denied or underpaid insurance claim in ${c.name}, ${c.state}? Learn how to dispute the adjuster, appeal a denial, and recover what your policy owes. Free 90-second claim analysis.`;
  // Slug-based filename guarantees uniqueness (same city name across states).
  const filename = `${slug}.md`;
  const filePath = path.join(VAULT_OUT, filename);
  if (fs.existsSync(filePath) && !FORCE) { skipped++; continue; }

  const fm = `---
type: programmatic
title: "${title}"
slug: "${slug}"
template: "claim-by-state"
practice_area: ""
city: "${c.name}"
state: "${c.state}"
description: "${description}"
---

`;
  fs.writeFileSync(filePath, fm + buildContent(c.name, c.state, c.county, c.population, idx));
  generated++;
}

console.log(`City claim pages — generated: ${generated}, skipped: ${skipped} (min pop ${MIN_POP.toLocaleString()}, ${cities.length} cities matched)`);
console.log(`Total in Programmatic SEO: ${fs.readdirSync(VAULT_OUT).filter((f) => f.endsWith(".md")).length}`);
