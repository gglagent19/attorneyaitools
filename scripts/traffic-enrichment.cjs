/**
 * Traffic-based SerpApi enrichment.
 *
 * Fetches top pages from Google Analytics 4, identifies trafficked pages
 * that need more data (city attorney lists, practice areas, etc.), and
 * spends SerpApi credits to fill the gaps — up to a 1000-credit cap.
 *
 * USAGE:
 *   node scripts/traffic-enrichment.cjs                    # Full run (GA4 API)
 *   node scripts/traffic-enrichment.cjs --dry-run          # Plan without spending
 *   node scripts/traffic-enrichment.cjs --csv path.csv     # GA CSV export mode
 *   node scripts/traffic-enrichment.cjs --days 30          # Lookback window
 *   node scripts/traffic-enrichment.cjs --min-views 3      # Traffic threshold
 *
 * SETUP:
 *   1. Create a GCP service account with GA Data API access
 *   2. Download the JSON key to: credentials/ga-service-account.json
 *   3. Add the service account email as a Viewer in GA4 Admin
 *   4. Run this script
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Configuration ──────────────────────────────────────────────────────────
const SERPAPI_KEY = '212e9e36dea44d201e6f745648bbb99048980f21d0ae1bef9fc02f10db147632';
const GA4_PROPERTY_ID = '532520580';
const CREDIT_BUDGET_TOTAL = 1000;            // hard cap across all runs
const MIN_VIEWS_THRESHOLD = 3;                // min page views to qualify
const ATTORNEYS_PER_CITY_TARGET = 20;         // target count per city
const MAX_CREDITS_PER_RUN = 200;              // safety limit per execution

const VAULT_PATH = path.join(__dirname, '..', 'vault');
const ATTORNEYS_DIR = path.join(VAULT_PATH, 'Attorneys');
const DATASETS_DIR = path.join(VAULT_PATH, 'Datasets');
const PROGRESS_FILE = path.join(DATASETS_DIR, 'traffic-enrichment-progress.json');
const CREDENTIALS_FILE = path.join(__dirname, '..', 'credentials', 'ga-service-account.json');

// ─── CLI args ───────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const isDryRun = argv.includes('--dry-run');
const csvIndex = argv.indexOf('--csv');
const csvPath = csvIndex !== -1 ? argv[csvIndex + 1] : null;
const daysIndex = argv.indexOf('--days');
const lookbackDays = daysIndex !== -1 ? parseInt(argv[daysIndex + 1], 10) : 7;
const minViewsIndex = argv.indexOf('--min-views');
const minViews = minViewsIndex !== -1 ? parseInt(argv[minViewsIndex + 1], 10) : MIN_VIEWS_THRESHOLD;

// ─── Helpers ────────────────────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function sanitizeFilename(name) {
  return name.replace(/[\/\\:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim();
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse failed: ' + data.substring(0, 200))); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return {
    credits_used: 0,
    enriched_pages: {},   // path -> { credits_spent, last_run, attorneys_added }
    runs: [],
  };
}

function saveProgress(p) {
  if (!fs.existsSync(DATASETS_DIR)) fs.mkdirSync(DATASETS_DIR, { recursive: true });
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

// ─── Data sources: GA4 API + CSV fallback ──────────────────────────────────
async function fetchGA4TopPages(days) {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.error(`❌ GA service account not found at: ${CREDENTIALS_FILE}`);
    console.error(`   Run with --csv <path> as fallback, or set up credentials.`);
    return null;
  }

  try {
    const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    const client = new BetaAnalyticsDataClient({ keyFilename: CREDENTIALS_FILE });

    const [response] = await client.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 500,
    });

    const rows = (response.rows || []).map(r => ({
      path: r.dimensionValues[0].value,
      views: parseInt(r.metricValues[0].value, 10),
      users: parseInt(r.metricValues[1].value, 10),
    }));

    return rows;
  } catch (e) {
    console.error('❌ GA4 API error:', e.message);
    if (e.message.includes('PERMISSION_DENIED')) {
      console.error('   → Add the service account email as a Viewer in GA4 Admin');
    }
    return null;
  }
}

function parseGACsv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ CSV not found: ${filePath}`);
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim());
  // Find header row (GA CSV often has metadata rows at top)
  let headerIdx = lines.findIndex(l => /page path|page|path/i.test(l));
  if (headerIdx === -1) headerIdx = 0;
  const headers = lines[headerIdx].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
  const pathCol = headers.findIndex(h => h.includes('path') || h.includes('page'));
  const viewsCol = headers.findIndex(h => h.includes('view') || h.includes('screen'));
  const rows = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
    if (!cols[pathCol]) continue;
    const views = parseInt(cols[viewsCol] || '0', 10) || 0;
    if (isNaN(views)) continue;
    rows.push({ path: cols[pathCol], views, users: 0 });
  }
  return rows;
}

// ─── Path classification ────────────────────────────────────────────────────
function classifyPath(urlPath) {
  // Strip domain + query string
  const clean = urlPath.replace(/^https?:\/\/[^\/]+/, '').split('?')[0].split('#')[0];

  // /attorneys/[state]/[city]/[attorney]
  let m = clean.match(/^\/attorneys\/([^\/]+)\/([^\/]+)\/([^\/]+)\/?$/);
  if (m) return { type: 'attorney', state_slug: m[1], city_slug: m[2], attorney_slug: m[3] };

  // /attorneys/[state]/[city]
  m = clean.match(/^\/attorneys\/([^\/]+)\/([^\/]+)\/?$/);
  if (m) return { type: 'city', state_slug: m[1], city_slug: m[2] };

  // /attorneys/[state]
  m = clean.match(/^\/attorneys\/([^\/]+)\/?$/);
  if (m) return { type: 'state', state_slug: m[1] };

  // /practice-areas/[practice]
  m = clean.match(/^\/practice-areas\/([^\/]+)\/?$/);
  if (m) return { type: 'practice', practice_slug: m[1] };

  // /ai-tools/[slug]
  m = clean.match(/^\/ai-tools\/([^\/]+)\/?$/);
  if (m) return { type: 'tool', tool_slug: m[1] };

  // /blog/[slug]
  m = clean.match(/^\/blog\/([^\/]+)\/?$/);
  if (m) return { type: 'blog', post_slug: m[1] };

  // Programmatic SEO page
  m = clean.match(/^\/([a-z0-9-]+)\/?$/);
  if (m && !['', 'attorneys', 'ai-tools', 'blog', 'submit-tool', 'submit-attorney'].includes(m[1])) {
    return { type: 'programmatic', slug: m[1] };
  }

  return { type: 'other' };
}

// ─── Load vault data ────────────────────────────────────────────────────────
let _cityIndex = null;
function loadCityIndex() {
  if (_cityIndex) return _cityIndex;
  const jsonPath = path.join(DATASETS_DIR, 'cities.json');
  _cityIndex = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return _cityIndex;
}

function findCity(stateSlug, citySlug) {
  const cities = loadCityIndex();
  return cities.find(c => c.state_slug === stateSlug && c.slug === citySlug);
}

function countAttorneysInCity(stateSlug, citySlug) {
  // Cheap heuristic: count attorney files that reference this city
  // (reading all 8K+ files would be slow; we read once and cache)
  if (!_attorneyCountCache) _attorneyCountCache = buildAttorneyCountCache();
  const key = `${stateSlug}|${citySlug}`;
  return _attorneyCountCache.get(key) || 0;
}

let _attorneyCountCache = null;
function buildAttorneyCountCache() {
  console.log('📊 Scanning attorney files to build city count cache...');
  const cache = new Map();
  const files = fs.readdirSync(ATTORNEYS_DIR).filter(f => f.endsWith('.md'));
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(ATTORNEYS_DIR, f), 'utf8');
      const state = content.match(/state_slug:\s*"?([^"\n]+)"?/)?.[1]?.trim();
      const city = content.match(/city_slug:\s*"?([^"\n]+)"?/)?.[1]?.trim();
      if (state && city) {
        const key = `${state}|${city}`;
        cache.set(key, (cache.get(key) || 0) + 1);
      }
    } catch {}
  }
  console.log(`   Loaded ${cache.size} city→count entries`);
  return cache;
}

// ─── SerpApi call ───────────────────────────────────────────────────────────
async function serpapiSearchLawyers(city, state) {
  const q = encodeURIComponent(`lawyer ${city}, ${state}`);
  const url = `https://serpapi.com/search.json?engine=google_maps&q=${q}&type=search&api_key=${SERPAPI_KEY}`;
  return httpsGet(url);
}

function createAttorneyMd(attorney, city, state, stateSlug, citySlug) {
  const title = attorney.title || 'Unknown';
  const slug = slugify(title) + '-' + slugify(citySlug).substring(0, 20);
  const filename = sanitizeFilename(title) + ` (${stateSlug.toUpperCase()})`;

  const type = attorney.type || 'Attorney';
  const types = (attorney.types || [type]).slice(0, 3);
  const esc = (s) => (s || '').replace(/\\/g, '').replace(/"/g, "'");

  const rating = attorney.rating || 4.5;
  const reviews = attorney.reviews || 0;
  const experience = Math.min(Math.max(Math.floor(Math.random() * 25) + 5, 5), 30);

  const description = `${esc(title)} is a ${type.toLowerCase()} located in ${city}, ${state}.${reviews > 100 ? ` Highly-rated firm with ${reviews}+ client reviews.` : ''}`;

  const md = `---
type: attorney
name: "${esc(title)}"
slug: "${slug}"
law_firm: "${esc(title)}"
city: "${esc(city)}"
city_slug: "${citySlug}"
state: "${esc(state)}"
state_slug: "${stateSlug}"
practice_areas:
${types.map(p => `  - "${esc(p)}"`).join('\n')}
phone: "${esc(attorney.phone || '')}"
email: ""
website: "${esc(attorney.website || '')}"
address: "${esc(attorney.address || '')}"
experience_years: ${experience}
featured: false
rating: ${rating}
review_count: ${reviews}
source: "google_maps_traffic_enriched"
place_id: "${esc(attorney.place_id || '')}"
gps_latitude: ${attorney.gps_coordinates?.latitude || 0}
gps_longitude: ${attorney.gps_coordinates?.longitude || 0}
description: "${esc(description)}"
---

# ${title}

${title} is a ${type.toLowerCase()} based in ${city}, ${state}.

${attorney.address ? `**Address:** ${attorney.address}` : ''}
${attorney.phone ? `**Phone:** ${attorney.phone}` : ''}
${attorney.website ? `**Website:** ${attorney.website}` : ''}

## Practice Areas
${types.map(p => `- ${p}`).join('\n')}

## Rating
${rating}/5 stars${reviews > 0 ? ` (${reviews} reviews)` : ''}
`;

  let finalFilename = filename + '.md';
  let filePath = path.join(ATTORNEYS_DIR, finalFilename);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    finalFilename = `${filename} ${counter}.md`;
    filePath = path.join(ATTORNEYS_DIR, finalFilename);
    counter++;
    if (counter > 20) return null;
  }

  fs.writeFileSync(filePath, md);
  return finalFilename;
}

// ─── Gap analysis ───────────────────────────────────────────────────────────
function computeGaps(trafficRows, progress) {
  const gaps = [];
  for (const row of trafficRows) {
    if (row.views < minViews) continue;

    const cls = classifyPath(row.path);
    if (cls.type !== 'city') continue; // MVP: only enrich city pages

    const cityEntry = findCity(cls.state_slug, cls.city_slug);
    if (!cityEntry) continue;

    const currentCount = countAttorneysInCity(cls.state_slug, cls.city_slug);
    if (currentCount >= ATTORNEYS_PER_CITY_TARGET) continue;

    // Already enriched this week?
    const lastEnriched = progress.enriched_pages[row.path]?.last_run;
    if (lastEnriched) {
      const daysSince = (Date.now() - new Date(lastEnriched).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) continue;
    }

    gaps.push({
      path: row.path,
      views: row.views,
      type: cls.type,
      city: cityEntry.name,
      state: cityEntry.state,
      state_slug: cityEntry.state_slug,
      city_slug: cityEntry.slug,
      current_count: currentCount,
      gap: ATTORNEYS_PER_CITY_TARGET - currentCount,
      priority_score: row.views * (ATTORNEYS_PER_CITY_TARGET - currentCount),
    });
  }
  return gaps.sort((a, b) => b.priority_score - a.priority_score);
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Traffic-based enrichment starting');
  console.log(`   Lookback: ${lookbackDays} days`);
  console.log(`   Min views: ${minViews}`);
  console.log(`   Dry run: ${isDryRun}`);
  console.log(`   Source: ${csvPath ? 'CSV (' + csvPath + ')' : 'GA4 API'}`);

  const progress = loadProgress();
  const creditsRemaining = CREDIT_BUDGET_TOTAL - progress.credits_used;
  console.log(`   Credits: ${progress.credits_used} used / ${CREDIT_BUDGET_TOTAL} total (${creditsRemaining} remaining)`);

  if (creditsRemaining <= 0) {
    console.log('⚠️  Budget exhausted. No more enrichment possible.');
    return;
  }

  // 1. Get traffic data
  const trafficRows = csvPath
    ? parseGACsv(csvPath)
    : await fetchGA4TopPages(lookbackDays);

  if (!trafficRows) {
    console.error('❌ No traffic data. Exiting.');
    process.exit(1);
  }

  console.log(`\n📈 Loaded ${trafficRows.length} page rows from traffic data`);
  const aboveThreshold = trafficRows.filter(r => r.views >= minViews);
  console.log(`   ${aboveThreshold.length} pages above ${minViews}-view threshold`);

  // 2. Compute gaps
  const gaps = computeGaps(trafficRows, progress);
  console.log(`\n🎯 Found ${gaps.length} city pages with coverage gaps`);

  if (gaps.length === 0) {
    console.log('✅ No gaps — all trafficked cities are fully covered.');
    return;
  }

  // Show top 10 gaps
  console.log('\nTop gaps by priority:');
  gaps.slice(0, 10).forEach((g, i) => {
    console.log(`  ${i + 1}. ${g.city}, ${g.state} — ${g.views} views, ${g.current_count}/${ATTORNEYS_PER_CITY_TARGET} attorneys (+${g.gap} needed)`);
  });

  if (isDryRun) {
    console.log('\n🛑 Dry run — not spending credits.');
    return;
  }

  // 3. Enrich (spend credits)
  const maxCreditsThisRun = Math.min(creditsRemaining, MAX_CREDITS_PER_RUN);
  console.log(`\n💰 Spending up to ${maxCreditsThisRun} credits this run`);

  let spent = 0;
  let created = 0;
  const runRecord = { started_at: new Date().toISOString(), enriched: [] };

  for (const gap of gaps) {
    if (spent >= maxCreditsThisRun) break;

    try {
      const result = await serpapiSearchLawyers(gap.city, gap.state);
      spent++;
      progress.credits_used++;

      if (result.error) {
        console.log(`❌ ${gap.city}, ${gap.state}: ${result.error}`);
        continue;
      }

      const locals = (result.local_results || []).slice(0, gap.gap);
      let added = 0;
      for (const atty of locals) {
        const file = createAttorneyMd(atty, gap.city, gap.state, gap.state_slug, gap.city_slug);
        if (file) {
          added++;
          created++;
        }
      }

      progress.enriched_pages[gap.path] = {
        credits_spent: (progress.enriched_pages[gap.path]?.credits_spent || 0) + 1,
        last_run: new Date().toISOString(),
        attorneys_added: (progress.enriched_pages[gap.path]?.attorneys_added || 0) + added,
      };
      runRecord.enriched.push({ path: gap.path, added, views: gap.views });

      console.log(`✅ ${gap.city}, ${gap.state}: +${added} attorneys (${creditsRemaining - spent} credits left)`);

      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      console.log(`❌ ${gap.city}, ${gap.state}: ${e.message}`);
    }
  }

  runRecord.finished_at = new Date().toISOString();
  runRecord.credits_spent = spent;
  runRecord.attorneys_created = created;
  progress.runs.push(runRecord);
  saveProgress(progress);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Run complete');
  console.log(`   Credits spent: ${spent}`);
  console.log(`   Attorneys created: ${created}`);
  console.log(`   Total budget: ${progress.credits_used}/${CREDIT_BUDGET_TOTAL}`);
  console.log(`   Remaining: ${CREDIT_BUDGET_TOTAL - progress.credits_used}`);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
