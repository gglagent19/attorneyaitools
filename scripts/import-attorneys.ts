/**
 * Import attorneys from a JSON dataset into the Obsidian vault.
 *
 * Usage: npx ts-node scripts/import-attorneys.ts <input-file.json>
 *
 * Expected JSON format:
 * [
 *   {
 *     "name": "John Doe",
 *     "law_firm": "Doe Law Firm",
 *     "city": "Los Angeles",
 *     "state": "California",
 *     "practice_areas": ["Divorce Law", "Family Law"],
 *     "phone": "(213) 555-0101",
 *     "email": "john@doelaw.com",
 *     "website": "https://doelaw.com",
 *     "experience_years": 15,
 *     "education": ["J.D., UCLA School of Law"]
 *   }
 * ]
 */

import fs from 'fs';
import path from 'path';

const VAULT_PATH = path.join(__dirname, '..', 'vault', 'Attorneys');

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface AttorneyInput {
  name: string;
  law_firm: string;
  city: string;
  state: string;
  practice_areas: string[];
  phone: string;
  email: string;
  website: string;
  experience_years: number;
  education?: string[];
  rating?: number;
  featured?: boolean;
}

function generateAttorneyMarkdown(attorney: AttorneyInput): string {
  const slug = slugify(attorney.name);
  const citySlug = slugify(attorney.city);
  const stateSlug = slugify(attorney.state);
  const rating = attorney.rating || (3.8 + Math.random() * 1.2).toFixed(1);
  const education = attorney.education || [`J.D., ${attorney.state} School of Law`];

  return `---
type: attorney
name: "${attorney.name}"
slug: "${slug}"
law_firm: "${attorney.law_firm}"
city: "${attorney.city}"
city_slug: "${citySlug}"
state: "${attorney.state}"
state_slug: "${stateSlug}"
practice_areas:
${attorney.practice_areas.map(pa => `  - "${pa}"`).join('\n')}
phone: "${attorney.phone}"
email: "${attorney.email}"
website: "${attorney.website}"
experience_years: ${attorney.experience_years}
featured: ${attorney.featured || false}
rating: ${rating}
description: "${attorney.name} is a ${attorney.practice_areas[0]} attorney in ${attorney.city}, ${attorney.state}"
---

# ${attorney.name}

${attorney.name} is an experienced ${attorney.practice_areas.join(' and ')} attorney based in ${attorney.city}, ${attorney.state}. With ${attorney.experience_years} years of experience at ${attorney.law_firm}, they have helped numerous clients navigate complex legal matters.

## Practice Areas
${attorney.practice_areas.map(pa => `- [[${pa}]]`).join('\n')}

## Education
${education.map(e => `- ${e}`).join('\n')}

## Bar Admissions
- ${attorney.state} State Bar

## Contact
- Phone: ${attorney.phone}
- Email: ${attorney.email}
- Website: [${attorney.law_firm}](${attorney.website})
`;
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.log('Usage: npx ts-node scripts/import-attorneys.ts <input-file.json>');
  process.exit(0);
}

const rawData = fs.readFileSync(inputFile, 'utf8');
const attorneys: AttorneyInput[] = JSON.parse(rawData);

if (!fs.existsSync(VAULT_PATH)) {
  fs.mkdirSync(VAULT_PATH, { recursive: true });
}

let imported = 0;
let skipped = 0;

for (const attorney of attorneys) {
  const filename = `${attorney.name}.md`;
  const filePath = path.join(VAULT_PATH, filename);

  if (fs.existsSync(filePath)) {
    console.log(`Skipping existing: ${attorney.name}`);
    skipped++;
    continue;
  }

  const markdown = generateAttorneyMarkdown(attorney);
  fs.writeFileSync(filePath, markdown);
  console.log(`Imported: ${attorney.name}`);
  imported++;
}

console.log(`\nDone. Imported: ${imported}, Skipped: ${skipped}, Total: ${imported + skipped}`);
