/**
 * Generate Shielded claimant-intent programmatic SEO pages: State × Claim-type.
 *
 * Output: vault/Programmatic SEO/*.md  (template: "claim-by-state")
 * Rendered by src/app/[slug]/page.tsx, which shows a Shielded free-analysis CTA
 * for this template.
 *
 * Usage:
 *   node scripts/generate-claim-pages.cjs            # pilot states (12)
 *   node scripts/generate-claim-pages.cjs --all      # all 50 states + DC
 *   node scripts/generate-claim-pages.cjs --force     # overwrite existing
 *
 * YMYL safety: no fabricated per-state statutes/deadlines. State specificity
 * comes from name/abbr/metros (factual). Legal/deadline questions are pointed
 * to the state's Department of Insurance via the NAIC directory.
 */

const fs = require('fs');
const path = require('path');
const { seedFrom, pick, disputeSteps, deadlineNote, faqBlock } = require('./claim-content-lib.cjs');

const VAULT_OUT = path.join(__dirname, '..', 'vault', 'Programmatic SEO');
const NAIC_DIRECTORY = 'https://content.naic.org/state-insurance-departments';
const APP_CTA = '/app?utm_source=seo&utm_medium=organic&utm_campaign=claim-pages';

const FORCE = process.argv.includes('--force');
const ALL = process.argv.includes('--all');

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── State data (factual: name, abbr, representative metros) ──────────────────
const STATES = [
  { name: 'Florida', abbr: 'FL', metros: ['Miami', 'Tampa', 'Orlando', 'Jacksonville'], pilot: true, perils: 'hurricanes, tropical storms, and flooding' },
  { name: 'Texas', abbr: 'TX', metros: ['Houston', 'Dallas', 'San Antonio', 'Austin'], pilot: true, perils: 'hailstorms, hurricanes, and freeze events' },
  { name: 'California', abbr: 'CA', metros: ['Los Angeles', 'San Diego', 'San Jose', 'Sacramento'], pilot: true, perils: 'wildfires, earthquakes, and mudslides' },
  { name: 'Louisiana', abbr: 'LA', metros: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'], pilot: true, perils: 'hurricanes and flooding' },
  { name: 'North Carolina', abbr: 'NC', metros: ['Charlotte', 'Raleigh', 'Greensboro', 'Wilmington'], pilot: true, perils: 'hurricanes and severe storms' },
  { name: 'South Carolina', abbr: 'SC', metros: ['Charleston', 'Columbia', 'Greenville', 'Myrtle Beach'], pilot: true, perils: 'hurricanes and coastal flooding' },
  { name: 'Georgia', abbr: 'GA', metros: ['Atlanta', 'Savannah', 'Augusta', 'Columbus'], pilot: true, perils: 'severe storms and tornadoes' },
  { name: 'New York', abbr: 'NY', metros: ['New York City', 'Buffalo', 'Rochester', 'Albany'], pilot: true, perils: 'winter storms, flooding, and wind' },
  { name: 'New Jersey', abbr: 'NJ', metros: ['Newark', 'Jersey City', 'Trenton', 'Atlantic City'], pilot: true, perils: 'coastal storms and flooding' },
  { name: 'Oklahoma', abbr: 'OK', metros: ['Oklahoma City', 'Tulsa', 'Norman', 'Lawton'], pilot: true, perils: 'tornadoes and hailstorms' },
  { name: 'Colorado', abbr: 'CO', metros: ['Denver', 'Colorado Springs', 'Aurora', 'Boulder'], pilot: true, perils: 'hail, wildfires, and snow load' },
  { name: 'Arizona', abbr: 'AZ', metros: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'], pilot: true, perils: 'monsoon storms, haboobs, and flooding' },
  // Remainder (used with --all)
  { name: 'Alabama', abbr: 'AL', metros: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'], perils: 'hurricanes and tornadoes' },
  { name: 'Mississippi', abbr: 'MS', metros: ['Jackson', 'Gulfport', 'Biloxi', 'Hattiesburg'], perils: 'hurricanes and flooding' },
  { name: 'Tennessee', abbr: 'TN', metros: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'], perils: 'tornadoes and flooding' },
  { name: 'Virginia', abbr: 'VA', metros: ['Virginia Beach', 'Richmond', 'Norfolk', 'Arlington'], perils: 'hurricanes and coastal flooding' },
  { name: 'Illinois', abbr: 'IL', metros: ['Chicago', 'Aurora', 'Naperville', 'Rockford'], perils: 'severe storms, hail, and flooding' },
  { name: 'Ohio', abbr: 'OH', metros: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'], perils: 'severe storms and winter weather' },
  { name: 'Pennsylvania', abbr: 'PA', metros: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'], perils: 'flooding and winter storms' },
  { name: 'Michigan', abbr: 'MI', metros: ['Detroit', 'Grand Rapids', 'Warren', 'Lansing'], perils: 'severe storms and winter weather' },
  { name: 'Missouri', abbr: 'MO', metros: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia'], perils: 'tornadoes, hail, and flooding' },
  { name: 'Washington', abbr: 'WA', metros: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver'], perils: 'windstorms and flooding' },
  { name: 'Massachusetts', abbr: 'MA', metros: ['Boston', 'Worcester', 'Springfield', 'Cambridge'], perils: "nor'easters and coastal storms" },
  { name: 'Indiana', abbr: 'IN', metros: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'], perils: 'tornadoes and severe storms' },
  { name: 'Minnesota', abbr: 'MN', metros: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth'], perils: 'hail, severe storms, and winter weather' },
  { name: 'Kentucky', abbr: 'KY', metros: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro'], perils: 'tornadoes and flooding' },
  { name: 'Maryland', abbr: 'MD', metros: ['Baltimore', 'Columbia', 'Germantown', 'Annapolis'], perils: 'coastal storms and flooding' },
  { name: 'Wisconsin', abbr: 'WI', metros: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha'], perils: 'severe storms and winter weather' },
  { name: 'Oregon', abbr: 'OR', metros: ['Portland', 'Salem', 'Eugene', 'Bend'], perils: 'wildfires and windstorms' },
  { name: 'Connecticut', abbr: 'CT', metros: ['Bridgeport', 'New Haven', 'Hartford', 'Stamford'], perils: 'coastal storms and flooding' },
  { name: 'Nevada', abbr: 'NV', metros: ['Las Vegas', 'Reno', 'Henderson', 'Sparks'], perils: 'flash flooding and wind' },
  { name: 'Arkansas', abbr: 'AR', metros: ['Little Rock', 'Fayetteville', 'Fort Smith', 'Jonesboro'], perils: 'tornadoes and flooding' },
  { name: 'Kansas', abbr: 'KS', metros: ['Wichita', 'Kansas City', 'Topeka', 'Overland Park'], perils: 'tornadoes and hail' },
  { name: 'Iowa', abbr: 'IA', metros: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City'], perils: 'derechos, tornadoes, and hail' },
  { name: 'Utah', abbr: 'UT', metros: ['Salt Lake City', 'Provo', 'West Valley City', 'Ogden'], perils: 'wildfires and winter storms' },
  { name: 'Nebraska', abbr: 'NE', metros: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'], perils: 'tornadoes, hail, and flooding' },
  { name: 'New Mexico', abbr: 'NM', metros: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe'], perils: 'wildfires and flash flooding' },
  { name: 'West Virginia', abbr: 'WV', metros: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg'], perils: 'flooding and winter storms' },
  { name: 'Idaho', abbr: 'ID', metros: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls'], perils: 'wildfires and winter storms' },
  { name: 'Hawaii', abbr: 'HI', metros: ['Honolulu', 'Hilo', 'Kailua', 'Kapolei'], perils: 'hurricanes, flooding, and volcanic activity' },
  { name: 'Maine', abbr: 'ME', metros: ['Portland', 'Lewiston', 'Bangor', 'Augusta'], perils: "nor'easters and winter storms" },
  { name: 'New Hampshire', abbr: 'NH', metros: ['Manchester', 'Nashua', 'Concord', 'Dover'], perils: 'winter storms and flooding' },
  { name: 'Montana', abbr: 'MT', metros: ['Billings', 'Missoula', 'Great Falls', 'Bozeman'], perils: 'wildfires, hail, and winter storms' },
  { name: 'Rhode Island', abbr: 'RI', metros: ['Providence', 'Warwick', 'Cranston', 'Newport'], perils: 'coastal storms and flooding' },
  { name: 'Delaware', abbr: 'DE', metros: ['Wilmington', 'Dover', 'Newark', 'Rehoboth Beach'], perils: 'coastal storms and flooding' },
  { name: 'South Dakota', abbr: 'SD', metros: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings'], perils: 'hail, tornadoes, and blizzards' },
  { name: 'North Dakota', abbr: 'ND', metros: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'], perils: 'flooding, hail, and blizzards' },
  { name: 'Alaska', abbr: 'AK', metros: ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla'], perils: 'earthquakes, flooding, and winter storms' },
  { name: 'Vermont', abbr: 'VT', metros: ['Burlington', 'Essex', 'Rutland', 'Montpelier'], perils: 'flooding and winter storms' },
  { name: 'Wyoming', abbr: 'WY', metros: ['Cheyenne', 'Casper', 'Laramie', 'Gillette'], perils: 'hail, wind, and blizzards' },
];

// ── Claim-type content (general-insurance-accurate; not legal advice) ────────
const CLAIM_TYPES = [
  {
    key: 'homeowners', label: 'Homeowners Insurance', short: 'homeowners',
    blurb: 'home',
    denialReasons: [
      'the adjuster classified the damage as "wear and tear" or "lack of maintenance" rather than a covered peril',
      'the scope of repair was written narrowly — patching instead of replacing, or excluding matching materials',
      'depreciation was applied aggressively, holding back recoverable depreciation you are entitled to once repairs are done',
      'pre-existing damage or a policy exclusion was cited without a detailed inspection',
    ],
    lowball: 'using a repair estimate well below local contractor pricing, omitting code-upgrade costs, or under-counting damaged square footage',
  },
  {
    key: 'roof-damage', label: 'Roof Damage Insurance', short: 'roof damage',
    blurb: 'roof',
    denialReasons: [
      'damage was blamed on age or "normal deterioration" instead of a covered storm event',
      'only a few shingles were approved for repair when a full replacement was warranted',
      'the insurer relied on a desk review or aerial imagery instead of a physical inspection',
      'matching shingles were excluded, leaving a patchwork repair',
    ],
    lowball: 'approving spot repairs instead of a full slope or roof replacement, and excluding underlayment, flashing, or code-required upgrades',
  },
  {
    key: 'water-damage', label: 'Water Damage Insurance', short: 'water damage',
    blurb: 'water damage',
    denialReasons: [
      'the loss was labeled "gradual" or "long-term seepage" rather than a sudden, accidental discharge',
      'mold remediation was capped or excluded despite resulting from a covered water loss',
      'the source of water (flood vs. plumbing) was disputed to shift it outside coverage',
      'hidden damage behind walls and under flooring was not investigated',
    ],
    lowball: 'paying only for visible surface drying while ignoring subfloor, drywall, cabinetry, and mold remediation costs',
  },
  {
    key: 'fire-damage', label: 'Fire Damage Insurance', short: 'fire damage',
    blurb: 'fire',
    denialReasons: [
      'smoke and soot damage to unburned areas was excluded from the scope',
      'contents (personal property) were valued at deep depreciation instead of replacement cost',
      'additional living expenses (ALE) for temporary housing were underpaid or denied',
      'the cause or origin was disputed pending investigation',
    ],
    lowball: 'settling structure and contents below replacement cost and underpaying smoke remediation and additional living expenses',
  },
  {
    key: 'storm-hurricane', label: 'Storm & Hurricane Insurance', short: 'storm and hurricane',
    blurb: 'storm',
    denialReasons: [
      'wind damage was reclassified as flood damage to push it outside the homeowners policy',
      'a separate (higher) hurricane or wind/hail deductible was applied',
      'the insurer argued damage pre-dated the named storm',
      'the scope omitted interior water intrusion that followed roof or window failure',
    ],
    lowball: 'splitting wind vs. flood causation to minimize payout and applying the highest available deductible',
  },
  {
    key: 'auto', label: 'Auto Insurance', short: 'auto',
    blurb: 'vehicle',
    denialReasons: [
      'the vehicle was declared a total loss at an actual cash value below comparable local listings',
      'diminished value after repairs was ignored',
      'OEM parts were swapped for aftermarket parts in the estimate',
      'injury or rental coverage was underpaid or delayed',
    ],
    lowball: 'using a valuation report with poorly matched comparables and ignoring options, low mileage, and recent maintenance',
  },
  {
    key: 'business-interruption', label: 'Business Interruption Insurance', short: 'business interruption',
    blurb: 'business',
    denialReasons: [
      'the period of restoration was cut short, ending lost-income payments early',
      'extra expense and payroll continuation were excluded',
      'the lost-income calculation used conservative revenue assumptions',
      'a covered physical-loss trigger was disputed',
    ],
    lowball: 'understating projected revenue, shortening the restoration period, and excluding continuing payroll and extra expenses',
  },
  {
    key: 'claim-denial-appeal', label: 'Denied Claim Appeal', short: 'denied claim',
    blurb: 'denied',
    denialReasons: [
      'a policy exclusion was cited without a full inspection or explanation',
      'the denial letter was vague about which provision applied',
      'the adjuster\'s scope missed damage you can document with photos and receipts',
      'a deadline or documentation technicality was used to close the file',
    ],
    lowball: 'closing a claim as "no coverage" or "below deductible" when a documented re-inspection would change the outcome',
  },
];

// Rotating intro variants for uniqueness across the matrix.
function introVariant(state, ct, i) {
  const variants = [
    `If your ${ct.short} insurance claim in ${state.name} came back denied — or with an offer that won't come close to covering the repairs — you are not stuck with that first number. Insurers in ${state.name} routinely issue low initial offers, and a well-documented challenge often changes the outcome.`,
    `Getting a ${ct.short} claim denied or underpaid in ${state.name} is frustrating, but the adjuster's first decision is rarely the final word. ${state.name} homeowners and policyholders dispute lowball offers every day — and many recover thousands more than they were first offered.`,
    `Across ${state.name} — from ${state.metros[0]} to ${state.metros[1]} — policyholders are told their ${ct.short} claim is denied, only to discover the loss was genuinely covered. The gap between what an insurer offers and what your policy owes is often large, and entirely disputable.`,
    `A denied or lowballed ${ct.short} claim in ${state.name} doesn't mean your case is closed. ${state.abbr} residents have the right to question the adjuster's estimate, request a re-inspection, and appeal — and the data shows persistence pays.`,
  ];
  return variants[i % variants.length];
}

function buildContent(state, ct, idx) {
  const seed = seedFrom(`${state.name}|${ct.key}`);
  const reasons = ct.denialReasons.map(r => `- ${r.charAt(0).toUpperCase() + r.slice(1)}`).join('\n');

  const whyLead = pick([
    `Most ${ct.short} disputes in ${state.name} come down to a handful of recurring tactics:`,
    `Across ${state.name}, ${ct.short} claims are denied or trimmed for a predictable set of reasons:`,
    `When a ${ct.short} claim is underpaid in ${state.name}, it usually traces back to one of these:`,
  ], seed, 5);

  const lowballLead = pick([
    `A lowball on a ${ct.short} claim in ${state.name} usually means ${ct.lowball}.`,
    `In ${state.name}, an underpaid ${ct.short} offer typically comes from ${ct.lowball}.`,
    `Most ${state.name} ${ct.short} lowballs trace to ${ct.lowball}.`,
  ], seed, 6);

  const helpLead = pick([
    `Shielded reads your ${state.name} policy and the adjuster's estimate, then shows — in about 90 seconds — where the offer falls short of what your ${ct.short} policy owes.`,
    `Upload your ${state.name} policy and the adjuster's ${ct.short} estimate, and Shielded pinpoints the gap in about 90 seconds.`,
    `For ${ct.short} claims in ${state.name}, Shielded compares your policy to the adjuster's estimate and surfaces what you're actually owed in seconds.`,
  ], seed, 8);

  return `## ${ct.label} Claim Denied or Underpaid in ${state.name}?

${introVariant(state, ct, idx)}

[**▶ Run a free 90-second analysis of your claim**](${APP_CTA}) — upload your policy and the adjuster's estimate, and see whether you're being offered what your ${ct.short} policy actually owes.

## Why ${ct.label} Claims Get Denied in ${state.name}

${whyLead}

${reasons}

In ${state.name}, where ${state.perils} drive a large share of property losses, ${ct.short} claims are especially prone to causation disputes — insurers may attribute the damage to an excluded cause to reduce or deny payment.

## What a ${ct.label} Lowball Looks Like in ${state.name}

${lowballLead} The number can look official — letterhead, line items — but the scope behind it is often incomplete. Comparing the adjuster's ${ct.short} estimate line-by-line against real ${state.name} repair costs is where most underpayments surface.

${disputeSteps(state.name, state.name, ct.short + ' claim', seed)}

${deadlineNote(state.name, state.name, seed)}

## Where Shielded Helps With Your ${state.name} ${ct.label} Claim

${helpLead} From there it drafts the rebuttal letter, organizes your documentation, benchmarks your ${ct.short} claim against comparable ${state.name} settlements, and tracks your deadlines.

[**Start your free ${ct.short} claim analysis →**](${APP_CTA})

Prefer to work with an attorney? [Get matched free with a ${state.name} insurance claim lawyer](/find-a-lawyer).

${faqBlock(state.name, state.name, ct.short + ' claim', seed)}

*Shielded is a self-help analysis and document tool. It is not a law firm or a licensed public adjuster, and it does not provide legal advice or represent you in negotiations.*
`;
}

// ── Generate ─────────────────────────────────────────────────────────────────
if (!fs.existsSync(VAULT_OUT)) fs.mkdirSync(VAULT_OUT, { recursive: true });

const states = ALL ? STATES : STATES.filter(s => s.pilot);
let generated = 0, skipped = 0, idx = 0;

for (const state of states) {
  for (const ct of CLAIM_TYPES) {
    idx++;
    const title = `${ct.label} Claim Denied in ${state.name}?`;
    const slug = `${ct.key}-insurance-claim-denied-${slugify(state.name)}`;
    const description = `Denied or underpaid ${ct.short} insurance claim in ${state.name}? Learn how to dispute the adjuster, appeal a denial, and recover what your policy owes. Free 90-second claim analysis.`;
    const filename = `${ct.label} Claim Denied in ${state.name}.md`;
    const filePath = path.join(VAULT_OUT, filename);

    if (fs.existsSync(filePath) && !FORCE) { skipped++; continue; }

    const fm = `---
type: programmatic
title: "${title}"
slug: "${slug}"
template: "claim-by-state"
practice_area: ""
city: ""
state: "${state.name}"
description: "${description}"
---

`;
    fs.writeFileSync(filePath, fm + buildContent(state, ct, idx));
    generated++;
  }
}

console.log(`Claim pages — generated: ${generated}, skipped (existing): ${skipped}`);
console.log(`States: ${states.length} (${ALL ? 'all' : 'pilot'}) × claim types: ${CLAIM_TYPES.length}`);
console.log(`Total in Programmatic SEO: ${fs.readdirSync(VAULT_OUT).filter(f => f.endsWith('.md')).length}`);
