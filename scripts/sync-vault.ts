/**
 * Sync Obsidian vault with Next.js build.
 *
 * This script:
 * 1. Validates all markdown frontmatter
 * 2. Checks for broken wikilinks
 * 3. Generates a JSON index of all content for fast lookups
 * 4. Reports stats
 *
 * Usage: npx ts-node scripts/sync-vault.ts
 */

import fs from 'fs';
import path from 'path';

const VAULT_PATH = path.join(__dirname, '..', 'vault');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data');

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)/);
  if (!match) return { data: {}, body: content };

  const data: Record<string, unknown> = {};
  let currentKey = '';
  let currentArray: string[] | null = null;

  for (const line of match[1].split('\n')) {
    const arrayMatch = line.match(/^\s+-\s+"?([^"]*)"?$/);
    if (arrayMatch && currentKey) {
      if (!currentArray) currentArray = [];
      currentArray.push(arrayMatch[1]);
      data[currentKey] = currentArray;
      continue;
    }

    if (currentArray) {
      currentArray = null;
    }

    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].replace(/^["']|["']$/g, '').trim();
      if (value === '') {
        // Might be start of array
      } else if (value === 'true') {
        data[currentKey] = true;
      } else if (value === 'false') {
        data[currentKey] = false;
      } else if (!isNaN(Number(value)) && value !== '') {
        data[currentKey] = Number(value);
      } else {
        data[currentKey] = value;
      }
    }
  }

  return { data, body: match[2] };
}

function getFiles(dir: string): string[] {
  const fullPath = path.join(VAULT_PATH, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
}

function findWikilinks(content: string): string[] {
  const matches = content.match(/\[\[([^\]]+)\]\]/g) || [];
  return matches.map(m => m.replace(/\[\[|\]\]/g, ''));
}

// Build index
interface IndexEntry {
  slug: string;
  name: string;
  type: string;
  [key: string]: unknown;
}

const index: Record<string, IndexEntry[]> = {
  tools: [],
  attorneys: [],
  states: [],
  cities: [],
  practiceAreas: [],
  blog: [],
  programmatic: [],
};

const allNames = new Set<string>();
const brokenLinks: { file: string; link: string }[] = [];
const errors: { file: string; error: string }[] = [];

const dirs: [string, string][] = [
  ['AI Tools', 'tools'],
  ['Attorneys', 'attorneys'],
  ['States', 'states'],
  ['Cities', 'cities'],
  ['Practice Areas', 'practiceAreas'],
  ['Blog', 'blog'],
  ['Programmatic SEO', 'programmatic'],
];

for (const [dir, key] of dirs) {
  const files = getFiles(dir);
  for (const file of files) {
    const filePath = path.join(VAULT_PATH, dir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = parseFrontmatter(content);
      const name = (data.name as string) || (data.title as string) || file.replace('.md', '');
      const slug = (data.slug as string) || slugify(name);

      allNames.add(name);

      index[key].push({
        slug,
        name,
        type: (data.type as string) || key,
        ...data,
      });

      // Check for required fields
      if (!data.type) {
        errors.push({ file: `${dir}/${file}`, error: 'Missing type in frontmatter' });
      }
    } catch (err) {
      errors.push({ file: `${dir}/${file}`, error: String(err) });
    }
  }
}

// Check wikilinks
for (const [dir] of dirs) {
  const files = getFiles(dir);
  for (const file of files) {
    const filePath = path.join(VAULT_PATH, dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const links = findWikilinks(content);
    for (const link of links) {
      if (!allNames.has(link)) {
        brokenLinks.push({ file: `${dir}/${file}`, link });
      }
    }
  }
}

// Write JSON index
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

fs.writeFileSync(path.join(OUTPUT_PATH, 'index.json'), JSON.stringify(index, null, 2));

// Report
console.log('=== Vault Sync Report ===\n');
console.log('Content counts:');
for (const [key, items] of Object.entries(index)) {
  console.log(`  ${key}: ${items.length}`);
}
console.log(`\nTotal files: ${Object.values(index).reduce((sum, arr) => sum + arr.length, 0)}`);

if (errors.length > 0) {
  console.log(`\n⚠ Errors (${errors.length}):`);
  errors.forEach(e => console.log(`  ${e.file}: ${e.error}`));
}

if (brokenLinks.length > 0) {
  console.log(`\n⚠ Broken wikilinks (${brokenLinks.length}):`);
  brokenLinks.slice(0, 20).forEach(b => console.log(`  ${b.file} → [[${b.link}]]`));
  if (brokenLinks.length > 20) {
    console.log(`  ... and ${brokenLinks.length - 20} more`);
  }
}

console.log('\n✓ Index written to public/data/index.json');
