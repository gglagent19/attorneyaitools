/**
 * Fetch ALL US incorporated places from Census Bureau and generate city markdown files.
 * Uses 2020 Census FIPS place codes - the authoritative source.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const VAULT_PATH = path.join(__dirname, '..', 'vault', 'Cities');

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// State FIPS codes -> state names
const stateFips = {
  "01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas",
  "06": "California", "08": "Colorado", "09": "Connecticut", "10": "Delaware",
  "11": "District of Columbia", "12": "Florida", "13": "Georgia", "15": "Hawaii",
  "16": "Idaho", "17": "Illinois", "18": "Indiana", "19": "Iowa",
  "20": "Kansas", "21": "Kentucky", "22": "Louisiana", "23": "Maine",
  "24": "Maryland", "25": "Massachusetts", "26": "Michigan", "27": "Minnesota",
  "28": "Mississippi", "29": "Missouri", "30": "Montana", "31": "Nebraska",
  "32": "Nevada", "33": "New Hampshire", "34": "New Jersey", "35": "New Mexico",
  "36": "New York", "37": "North Carolina", "38": "North Dakota", "39": "Ohio",
  "40": "Oklahoma", "41": "Oregon", "42": "Pennsylvania", "44": "Rhode Island",
  "45": "South Carolina", "46": "South Dakota", "47": "Tennessee", "48": "Texas",
  "49": "Utah", "50": "Vermont", "51": "Virginia", "53": "Washington",
  "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming"
};

const stateAbbrs = {
  "01": "al", "02": "ak", "04": "az", "05": "ar", "06": "ca", "08": "co",
  "09": "ct", "10": "de", "11": "dc", "12": "fl", "13": "ga", "15": "hi",
  "16": "id", "17": "il", "18": "in", "19": "ia", "20": "ks", "21": "ky",
  "22": "la", "23": "me", "24": "md", "25": "ma", "26": "mi", "27": "mn",
  "28": "ms", "29": "mo", "30": "mt", "31": "ne", "32": "nv", "33": "nh",
  "34": "nj", "35": "nm", "36": "ny", "37": "nc", "38": "nd", "39": "oh",
  "40": "ok", "41": "or", "42": "pa", "44": "ri", "45": "sc", "46": "sd",
  "47": "tn", "48": "tx", "49": "ut", "50": "vt", "51": "va", "53": "wa",
  "54": "wv", "55": "wi", "56": "wy"
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function cleanCityName(name) {
  // Remove suffixes like "city", "town", "village", "borough", "CDP"
  return name
    .replace(/\s+(city|town|village|borough|CDP|municipality)$/i, '')
    .replace(/\s+\(balance\)$/i, '')
    .replace(/[\/\\]/g, '-')  // sanitize path separators
    .trim();
}

function sanitizeFilename(name) {
  return name.replace(/[\/\\:*?"<>|]/g, '-');
}

async function main() {
  if (!fs.existsSync(VAULT_PATH)) {
    fs.mkdirSync(VAULT_PATH, { recursive: true });
  }

  // Track existing files
  const existing = new Set();
  fs.readdirSync(VAULT_PATH).forEach(f => {
    if (f.endsWith('.md')) {
      const content = fs.readFileSync(path.join(VAULT_PATH, f), 'utf8');
      const nameMatch = content.match(/^name:\s*"?([^"\n]+)"?/m);
      const stateMatch = content.match(/^state:\s*"?([^"\n]+)"?/m);
      if (nameMatch && stateMatch) {
        existing.add(nameMatch[1].trim() + '|' + stateMatch[1].trim());
      }
    }
  });

  console.log(`Found ${existing.size} existing city files.`);

  let totalCreated = 0;
  let totalSkipped = 0;
  const allCities = [];
  const errors = [];

  for (const [fips, stateName] of Object.entries(stateFips)) {
    const abbr = stateAbbrs[fips];
    const url = `https://www2.census.gov/geo/docs/reference/codes2020/place/st${fips}_${abbr}_place2020.txt`;

    let data;
    try {
      data = await fetch(url);
    } catch (e) {
      console.error(`Failed to fetch ${stateName}: ${e.message}`);
      errors.push(stateName);
      continue;
    }

    const lines = data.split('\n').slice(1); // skip header
    let stateCreated = 0;

    for (const line of lines) {
      if (!line.trim()) continue;
      const parts = line.split('|');
      if (parts.length < 7) continue;

      const placeName = parts[4];
      const placeType = parts[5];
      const funcStat = parts[7];

      // Only include INCORPORATED PLACES that are active (A = Active)
      if (placeType !== 'INCORPORATED PLACE') continue;
      if (funcStat !== 'A') continue;

      const cityName = cleanCityName(placeName);
      if (!cityName) continue;

      const key = cityName + '|' + stateName;
      if (existing.has(key)) {
        totalSkipped++;
        allCities.push({ name: cityName, state: stateName, slug: slugify(cityName), state_slug: slugify(stateName) });
        continue;
      }
      existing.add(key);

      const citySlug = slugify(cityName);
      const stateSlug = slugify(stateName);

      // Handle name collisions in filenames
      let filename = sanitizeFilename(cityName);
      const filePath1 = path.join(VAULT_PATH, filename + '.md');
      if (fs.existsSync(filePath1)) {
        // Check if it's same state
        const content = fs.readFileSync(filePath1, 'utf8');
        if (content.includes(`state: "${stateName}"`)) {
          totalSkipped++;
          allCities.push({ name: cityName, state: stateName, slug: citySlug, state_slug: stateSlug });
          continue;
        }
        // Different state - add state abbreviation
        const stateAbbrUpper = abbr.toUpperCase();
        filename = sanitizeFilename(`${cityName} (${stateAbbrUpper})`);
      }

      const filePath = path.join(VAULT_PATH, filename + '.md');
      if (fs.existsSync(filePath)) {
        totalSkipped++;
        allCities.push({ name: cityName, state: stateName, slug: citySlug, state_slug: stateSlug });
        continue;
      }

      const county = parts[8] ? parts[8].split('~~~')[0].trim() : '';

      const md = `---
type: city
name: "${cityName}"
slug: "${citySlug}"
state: "${stateName}"
state_slug: "${stateSlug}"
county: "${county}"
---

# ${cityName} Attorneys

Find experienced attorneys in ${cityName}, ${stateName}. Browse by practice area to find the right lawyer for your needs.

## Practice Areas
- [[Personal Injury]]
- [[Criminal Defense]]
- [[Divorce Law]]
- [[Business Law]]
- [[Real Estate Law]]
- [[Estate Planning]]
- [[Bankruptcy]]
`;

      fs.writeFileSync(filePath, md);
      stateCreated++;
      totalCreated++;
      allCities.push({ name: cityName, state: stateName, slug: citySlug, state_slug: stateSlug });
    }

    if (stateCreated > 0) {
      process.stdout.write(`${stateName}: +${stateCreated} | `);
    }
  }

  console.log('\n');
  console.log(`Created: ${totalCreated} new city files`);
  console.log(`Skipped: ${totalSkipped} (already existed)`);
  console.log(`Total city files: ${fs.readdirSync(VAULT_PATH).filter(f => f.endsWith('.md')).length}`);
  console.log(`Total cities in dataset: ${allCities.length}`);

  if (errors.length > 0) {
    console.log(`Errors for states: ${errors.join(', ')}`);
  }

  // Save complete dataset
  const datasetPath = path.join(__dirname, '..', 'vault', 'Datasets', 'cities.json');
  fs.writeFileSync(datasetPath, JSON.stringify(allCities, null, 2));
  console.log(`Saved cities dataset JSON (${allCities.length} entries)`);
}

main().catch(console.error);
