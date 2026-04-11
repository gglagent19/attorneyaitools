/**
 * Generate programmatic SEO pages by combining practice areas with cities.
 *
 * Usage: npx ts-node scripts/generate-programmatic-pages.ts
 */

import fs from 'fs';
import path from 'path';

const VAULT_PATH = path.join(__dirname, '..', 'vault');

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface CityData {
  name: string;
  state: string;
}

interface PracticeAreaData {
  name: string;
}

function getFrontmatter(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return data;
}

function getCities(): CityData[] {
  const dir = path.join(VAULT_PATH, 'Cities');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const data = getFrontmatter(path.join(dir, f));
      return { name: data.name || f.replace('.md', ''), state: data.state || '' };
    });
}

function getPracticeAreas(): PracticeAreaData[] {
  const dir = path.join(VAULT_PATH, 'Practice Areas');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const data = getFrontmatter(path.join(dir, f));
      return { name: data.name || f.replace('.md', '') };
    });
}

function generateToolsByPractice(practiceArea: string): string {
  const slug = `best-ai-tools-for-${slugify(practiceArea)}-lawyers`;
  return `---
type: programmatic
title: "Best AI Tools for ${practiceArea} Lawyers"
slug: "${slug}"
template: "tools-by-practice"
practice_area: "${practiceArea}"
city: ""
state: ""
description: "Discover the best AI tools for ${practiceArea} lawyers. Compare features, pricing, and reviews of top legal AI software."
---

# Best AI Tools for ${practiceArea} Lawyers

Finding the right AI tools can transform how ${practiceArea} attorneys handle their caseload. Here are the top AI-powered solutions designed for ${practiceArea} practice.

## How AI Helps ${practiceArea} Attorneys

AI technology is revolutionizing ${practiceArea} law practice by automating routine tasks, improving research accuracy, and helping attorneys serve their clients more effectively.

## Choosing the Right Tool

When selecting an AI tool for your ${practiceArea} practice, consider factors like ease of use, integration with existing systems, pricing, and specific features relevant to your practice area.
`;
}

function generateLawyersByCity(practiceArea: string, city: string, state: string): string {
  const slug = `${slugify(practiceArea)}-lawyers-in-${slugify(city)}`;
  return `---
type: programmatic
title: "${practiceArea} Lawyers in ${city}"
slug: "${slug}"
template: "lawyers-by-city"
practice_area: "${practiceArea}"
city: "${city}"
state: "${state}"
description: "Find top-rated ${practiceArea} lawyers in ${city}, ${state}. Compare ratings, experience, and reviews."
---

# ${practiceArea} Lawyers in ${city}

Looking for an experienced ${practiceArea} attorney in ${city}, ${state}? Browse our directory of top-rated lawyers specializing in ${practiceArea}.

## Why You Need a ${practiceArea} Lawyer in ${city}

Navigating ${practiceArea.toLowerCase()} matters requires an attorney who understands both the legal landscape and local ${city} courts. An experienced local attorney can provide personalized guidance tailored to ${state} law.

## How to Choose the Right Attorney

When selecting a ${practiceArea.toLowerCase()} lawyer in ${city}, consider their experience, client reviews, practice focus, and familiarity with local courts and procedures.
`;
}

// Main execution
const outDir = path.join(VAULT_PATH, 'Programmatic SEO');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const cities = getCities();
const practiceAreas = getPracticeAreas();

let generated = 0;

// Generate "Best AI Tools for X Lawyers" pages
for (const pa of practiceAreas) {
  const filename = `Best AI Tools for ${pa.name} Lawyers.md`;
  const filePath = path.join(outDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateToolsByPractice(pa.name));
    generated++;
  }
}

// Generate "[Practice] Lawyers in [City]" pages
// Select top practice areas to combine with cities
const topPracticeAreas = practiceAreas.slice(0, 10);
for (const pa of topPracticeAreas) {
  for (const city of cities) {
    const filename = `${pa.name} Lawyers in ${city.name}.md`;
    const filePath = path.join(outDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, generateLawyersByCity(pa.name, city.name, city.state));
      generated++;
    }
  }
}

console.log(`Generated ${generated} programmatic SEO pages.`);
console.log(`Total programmatic pages: ${fs.readdirSync(outDir).filter(f => f.endsWith('.md')).length}`);
