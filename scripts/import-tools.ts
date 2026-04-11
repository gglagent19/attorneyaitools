/**
 * Import AI tools from a CSV or JSON dataset into the Obsidian vault.
 *
 * Usage: npx ts-node scripts/import-tools.ts <input-file.json>
 *
 * Expected JSON format:
 * [
 *   {
 *     "name": "Tool Name",
 *     "category": "Category",
 *     "pricing": "Free|Paid|Freemium",
 *     "website": "https://...",
 *     "description": "Description",
 *     "features": ["feature1", "feature2"],
 *     "use_cases": ["use case 1"],
 *     "rating": 4.5
 *   }
 * ]
 */

import fs from 'fs';
import path from 'path';

const VAULT_PATH = path.join(__dirname, '..', 'vault', 'AI Tools');

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface ToolInput {
  name: string;
  category: string;
  pricing: string;
  website: string;
  description: string;
  features?: string[];
  use_cases?: string[];
  rating?: number;
  affiliate_link?: string;
}

function generateToolMarkdown(tool: ToolInput): string {
  const slug = slugify(tool.name);
  const rating = tool.rating || (3.5 + Math.random() * 1.5).toFixed(1);
  const date = new Date().toISOString().split('T')[0];

  const useCases = tool.use_cases || [tool.category.toLowerCase()];
  const features = tool.features || [`${tool.category} capabilities`, 'AI-powered analysis', 'Cloud-based platform'];

  return `---
type: ai-tool
name: "${tool.name}"
slug: "${slug}"
category: "${tool.category}"
pricing: "${tool.pricing}"
website: "${tool.website}"
affiliate_link: "${tool.affiliate_link || ''}"
logo: "/images/tools/${slug}.png"
tags:
  - ai-tool
  - ${slugify(tool.category)}
use_cases:
${useCases.map(u => `  - "${u}"`).join('\n')}
rating: ${rating}
featured: false
description: "${tool.description.replace(/"/g, '\\"')}"
date_added: "${date}"
---

# ${tool.name}

${tool.description}

## Features
${features.map(f => `- ${f}`).join('\n')}

## Best For
- ${tool.category} professionals in the legal industry

## Pricing
${tool.pricing} - Visit [${tool.name}](${tool.website}) for current pricing details.
`;
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.log('Usage: npx ts-node scripts/import-tools.ts <input-file.json>');
  console.log('');
  console.log('If no file is provided, generates a sample dataset.');

  // Generate sample dataset
  const samplePath = path.join(__dirname, '..', 'vault', 'Datasets', 'sample-tools.json');
  const sampleTools: ToolInput[] = [
    { name: 'Sample Legal AI', category: 'Legal Research', pricing: 'Paid', website: 'https://example.com', description: 'A sample AI tool for legal research' },
  ];
  fs.writeFileSync(samplePath, JSON.stringify(sampleTools, null, 2));
  console.log(`Sample dataset written to: ${samplePath}`);
  process.exit(0);
}

const rawData = fs.readFileSync(inputFile, 'utf8');
const tools: ToolInput[] = JSON.parse(rawData);

if (!fs.existsSync(VAULT_PATH)) {
  fs.mkdirSync(VAULT_PATH, { recursive: true });
}

let imported = 0;
let skipped = 0;

for (const tool of tools) {
  const filename = `${tool.name}.md`;
  const filePath = path.join(VAULT_PATH, filename);

  if (fs.existsSync(filePath)) {
    console.log(`Skipping existing: ${tool.name}`);
    skipped++;
    continue;
  }

  const markdown = generateToolMarkdown(tool);
  fs.writeFileSync(filePath, markdown);
  console.log(`Imported: ${tool.name}`);
  imported++;
}

console.log(`\nDone. Imported: ${imported}, Skipped: ${skipped}, Total: ${imported + skipped}`);
