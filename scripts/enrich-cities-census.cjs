/**
 * Enrich the cities dataset with real Census 2020 facts:
 *   - population (P1_001N from Decennial Census P.L. 94-171)
 *   - land area + water area (from the 2020 Gazetteer place file)
 *   - county (from the 2020 place codes file)
 *
 * Output: vault/Datasets/cities-enriched.json
 *   [{ name, state, slug, state_slug, fips_state, fips_place, county,
 *      population, land_sq_mi, water_sq_mi }, ...]
 *
 * Run: node scripts/enrich-cities-census.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const STATE_FIPS = {
  '01': { name: 'Alabama', abbr: 'al' },
  '02': { name: 'Alaska', abbr: 'ak' },
  '04': { name: 'Arizona', abbr: 'az' },
  '05': { name: 'Arkansas', abbr: 'ar' },
  '06': { name: 'California', abbr: 'ca' },
  '08': { name: 'Colorado', abbr: 'co' },
  '09': { name: 'Connecticut', abbr: 'ct' },
  '10': { name: 'Delaware', abbr: 'de' },
  '11': { name: 'District of Columbia', abbr: 'dc' },
  '12': { name: 'Florida', abbr: 'fl' },
  '13': { name: 'Georgia', abbr: 'ga' },
  '15': { name: 'Hawaii', abbr: 'hi' },
  '16': { name: 'Idaho', abbr: 'id' },
  '17': { name: 'Illinois', abbr: 'il' },
  '18': { name: 'Indiana', abbr: 'in' },
  '19': { name: 'Iowa', abbr: 'ia' },
  '20': { name: 'Kansas', abbr: 'ks' },
  '21': { name: 'Kentucky', abbr: 'ky' },
  '22': { name: 'Louisiana', abbr: 'la' },
  '23': { name: 'Maine', abbr: 'me' },
  '24': { name: 'Maryland', abbr: 'md' },
  '25': { name: 'Massachusetts', abbr: 'ma' },
  '26': { name: 'Michigan', abbr: 'mi' },
  '27': { name: 'Minnesota', abbr: 'mn' },
  '28': { name: 'Mississippi', abbr: 'ms' },
  '29': { name: 'Missouri', abbr: 'mo' },
  '30': { name: 'Montana', abbr: 'mt' },
  '31': { name: 'Nebraska', abbr: 'ne' },
  '32': { name: 'Nevada', abbr: 'nv' },
  '33': { name: 'New Hampshire', abbr: 'nh' },
  '34': { name: 'New Jersey', abbr: 'nj' },
  '35': { name: 'New Mexico', abbr: 'nm' },
  '36': { name: 'New York', abbr: 'ny' },
  '37': { name: 'North Carolina', abbr: 'nc' },
  '38': { name: 'North Dakota', abbr: 'nd' },
  '39': { name: 'Ohio', abbr: 'oh' },
  '40': { name: 'Oklahoma', abbr: 'ok' },
  '41': { name: 'Oregon', abbr: 'or' },
  '42': { name: 'Pennsylvania', abbr: 'pa' },
  '44': { name: 'Rhode Island', abbr: 'ri' },
  '45': { name: 'South Carolina', abbr: 'sc' },
  '46': { name: 'South Dakota', abbr: 'sd' },
  '47': { name: 'Tennessee', abbr: 'tn' },
  '48': { name: 'Texas', abbr: 'tx' },
  '49': { name: 'Utah', abbr: 'ut' },
  '50': { name: 'Vermont', abbr: 'vt' },
  '51': { name: 'Virginia', abbr: 'va' },
  '53': { name: 'Washington', abbr: 'wa' },
  '54': { name: 'West Virginia', abbr: 'wv' },
  '55': { name: 'Wisconsin', abbr: 'wi' },
  '56': { name: 'Wyoming', abbr: 'wy' },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'attorneyaitools-enrich/1.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return resolve(fetchText(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} on ${url}`));
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function cleanCityName(name) {
  return name
    .replace(/\s+(city|town|village|borough|CDP|municipality)$/i, '')
    .replace(/\s+\(balance\)$/i, '')
    .replace(/[\/\\]/g, '-')
    .trim();
}

async function fetchPlaceCodes(fips, abbr) {
  // Place codes 2020: STATE|STATEFP|PLACEFP|PLACENS|PLACENAME|TYPE|CLASSFP|FUNCSTAT|COUNTIES
  const url = `https://www2.census.gov/geo/docs/reference/codes2020/place/st${fips}_${abbr}_place2020.txt`;
  const data = await fetchText(url);
  const out = new Map(); // place_fips -> { name, county }
  const lines = data.split('\n').slice(1);
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('|');
    if (parts.length < 9) continue;
    const stateFips = parts[1];
    const placeFips = parts[2];
    const placeName = parts[4];
    const placeType = parts[5];
    const funcStat = parts[7];
    if (placeType !== 'INCORPORATED PLACE') continue;
    if (funcStat !== 'A') continue;
    const cityName = cleanCityName(placeName);
    if (!cityName) continue;
    const county = parts[8] ? parts[8].split('~~~')[0].trim() : '';
    out.set(placeFips, { name: cityName, county, fips_state: stateFips, fips_place: placeFips });
  }
  return out;
}

async function fetchPopulation(fips) {
  // Decennial Census 2020 P.L. 94-171 — total population
  const url = `https://api.census.gov/data/2020/dec/pl?get=NAME,P1_001N&for=place:*&in=state:${fips}`;
  const data = await fetchText(url);
  const json = JSON.parse(data);
  // header row, then data
  const out = new Map(); // place_fips -> population
  for (let i = 1; i < json.length; i++) {
    const [, pop, , placeFips] = json[i];
    out.set(placeFips, parseInt(pop, 10) || 0);
  }
  return out;
}

async function fetchGazetteer(fips, abbr) {
  // 2020 Gazetteer place file — land/water area
  const url = `https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2020_Gazetteer/2020_gaz_place_${abbr}.txt`;
  let data;
  try {
    data = await fetchText(url);
  } catch (e) {
    // Some states don't have this file under exact case; skip silently
    return new Map();
  }
  const out = new Map(); // place_fips -> { land_sq_mi, water_sq_mi }
  const lines = data.split('\n').slice(1);
  for (const line of lines) {
    if (!line.trim()) continue;
    // tab-separated
    const parts = line.split('\t').map((p) => p.trim());
    if (parts.length < 10) continue;
    // Columns vary slightly. Find by header in production; here we use known 2020 layout:
    // USPS, GEOID, ANSICODE, NAME, LSAD, FUNCSTAT, ALAND, AWATER, ALAND_SQMI, AWATER_SQMI, INTPTLAT, INTPTLONG
    const geoid = parts[1];
    const placeFips = geoid.slice(2);
    const landSqMi = parseFloat(parts[8]);
    const waterSqMi = parseFloat(parts[9]);
    out.set(placeFips, {
      land_sq_mi: isFinite(landSqMi) ? landSqMi : null,
      water_sq_mi: isFinite(waterSqMi) ? waterSqMi : null,
    });
  }
  return out;
}

async function main() {
  const all = [];
  for (const [fips, { name: stateName, abbr }] of Object.entries(STATE_FIPS)) {
    process.stdout.write(`${stateName}... `);
    let codes = new Map();
    let pop = new Map();
    let gaz = new Map();
    try {
      codes = await fetchPlaceCodes(fips, abbr);
    } catch (e) {
      console.log(`codes fail: ${e.message}`);
      continue;
    }
    try {
      pop = await fetchPopulation(fips);
    } catch (e) {
      console.log(`pop fail: ${e.message}`);
    }
    try {
      gaz = await fetchGazetteer(fips, abbr);
    } catch (e) {
      // ignore
    }
    let count = 0;
    for (const [placeFips, info] of codes) {
      const population = pop.get(placeFips) || 0;
      const g = gaz.get(placeFips) || {};
      all.push({
        name: info.name,
        state: stateName,
        slug: slugify(info.name),
        state_slug: slugify(stateName),
        fips_state: fips,
        fips_place: placeFips,
        county: info.county,
        population,
        land_sq_mi: g.land_sq_mi ?? null,
        water_sq_mi: g.water_sq_mi ?? null,
      });
      count++;
    }
    console.log(`${count} places`);
  }

  // Deduplicate by state_slug|slug, keeping the largest population
  const dedup = new Map();
  for (const c of all) {
    const key = `${c.state_slug}|${c.slug}`;
    const prev = dedup.get(key);
    if (!prev || c.population > prev.population) dedup.set(key, c);
  }
  const final = [...dedup.values()].sort((a, b) =>
    a.state_slug === b.state_slug
      ? a.name.localeCompare(b.name)
      : a.state_slug.localeCompare(b.state_slug)
  );

  const outPath = path.join(__dirname, '..', 'vault', 'Datasets', 'cities-enriched.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(final, null, 0));

  const withPop = final.filter((c) => c.population > 0).length;
  const withArea = final.filter((c) => c.land_sq_mi != null).length;
  console.log(`\n✅ Wrote ${final.length} places to ${outPath}`);
  console.log(`   ${withPop} have population, ${withArea} have area`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
