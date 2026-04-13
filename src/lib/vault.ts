import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import type {
  AITool, Attorney, City, State, PracticeArea, BlogPost, ProgrammaticPage, FAQ, Comparison,
} from './types';

const VAULT_PATH = path.join(process.cwd(), 'vault');

// ─── Caching layer ──────────────────────────────────────────────────────────
// Avoid re-reading thousands of files on every function call during build.
const cache = new Map<string, unknown>();

function cached<T>(key: string, fn: () => T): T {
  if (cache.has(key)) return cache.get(key) as T;
  const result = fn();
  cache.set(key, result);
  return result;
}

// ─── Generic markdown parser ────────────────────────────────────────────────
function getMarkdownFiles(dir: string): string[] {
  const fullPath = path.join(VAULT_PATH, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
}

async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(content);
  return result.toString();
}

function parseFile<T>(dir: string, filename: string): T & { content: string; rawContent: string } {
  const fullPath = path.join(VAULT_PATH, dir, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, content, rawContent: fileContents } as T & { content: string; rawContent: string };
}

// ─── AI Tools ───────────────────────────────────────────────────────────────
export function getAllTools(): AITool[] {
  return cached('allTools', () => {
    const files = getMarkdownFiles('AI Tools');
    return files.map(f => {
      const data = parseFile<AITool>('AI Tools', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  });
}

export function getToolBySlug(slug: string): AITool | undefined {
  return getAllTools().find(t => t.slug === slug);
}

export async function getToolWithHtml(slug: string): Promise<(AITool & { htmlContent: string }) | undefined> {
  const tool = getToolBySlug(slug);
  if (!tool) return undefined;
  const htmlContent = await parseMarkdown(tool.content);
  return { ...tool, htmlContent };
}

export function getToolCategories(): string[] {
  const tools = getAllTools();
  return [...new Set(tools.map(t => t.category))].sort();
}

// ─── Attorneys ──────────────────────────────────────────────────────────────
export function getAllAttorneys(): Attorney[] {
  return cached('allAttorneys', () => {
    const files = getMarkdownFiles('Attorneys');
    const all = files.map(f => {
      const data = parseFile<Attorney>('Attorneys', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    });

    // Dedupe by (state_slug, city_slug, slug) — keeps first occurrence
    const seen = new Set<string>();
    const unique: Attorney[] = [];
    for (const a of all) {
      const key = `${a.state_slug}|${a.city_slug}|${a.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(a);
    }

    return unique.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
  });
}

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return getAllAttorneys().find(a => a.slug === slug);
}

export async function getAttorneyWithHtml(slug: string): Promise<(Attorney & { htmlContent: string }) | undefined> {
  const attorney = getAttorneyBySlug(slug);
  if (!attorney) return undefined;
  const htmlContent = await parseMarkdown(attorney.content);
  return { ...attorney, htmlContent };
}

export function getAttorneysByState(stateSlug: string): Attorney[] {
  return getAllAttorneys().filter(a => a.state_slug === stateSlug);
}

export function getAttorneysByCity(citySlug: string): Attorney[] {
  return getAllAttorneys().filter(a => a.city_slug === citySlug);
}

export function getAttorneysByPracticeArea(practiceArea: string): Attorney[] {
  return getAllAttorneys().filter(a =>
    a.practice_areas?.some(pa => pa.toLowerCase().replace(/[^a-z0-9]+/g, '-') === practiceArea)
  );
}

// ─── States ─────────────────────────────────────────────────────────────────
export function getAllStates(): State[] {
  return cached('allStates', () => {
    const files = getMarkdownFiles('States');
    return files.map(f => {
      const data = parseFile<State>('States', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => a.name.localeCompare(b.name));
  });
}

export function getStateBySlug(slug: string): State | undefined {
  return getAllStates().find(s => s.slug === slug);
}

// ─── Cities (JSON-index backed for 20K+ scale) ─────────────────────────────
interface CityIndex {
  name: string;
  state: string;
  slug: string;
  state_slug: string;
  population?: number;
  county?: string;
  fips_state?: string;
  fips_place?: string;
}

function loadCityIndex(): CityIndex[] {
  return cached('cityIndex', () => {
    // Prefer the enriched Census-derived dataset.
    const enrichedPath = path.join(VAULT_PATH, 'Datasets', 'cities-enriched.json');
    if (fs.existsSync(enrichedPath)) {
      return JSON.parse(fs.readFileSync(enrichedPath, 'utf8'));
    }
    const jsonPath = path.join(VAULT_PATH, 'Datasets', 'cities.json');
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }
    // Fallback: read from individual files (slow for 20K)
    const files = getMarkdownFiles('Cities');
    return files.map(f => {
      const data = parseFile<City>('Cities', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return { name: data.name, state: data.state, slug: data.slug, state_slug: data.state_slug };
    });
  });
}

export function getAllCities(): City[] {
  return cached('allCities', () => {
    const index = loadCityIndex();
    return index
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        state: c.state,
        state_slug: c.state_slug,
        population: c.population || 0,
        county: c.county,
        fips_state: c.fips_state,
        fips_place: c.fips_place,
        content: '',
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
}

export function getCitiesByState(stateSlug: string): City[] {
  return getAllCities().filter(c => c.state_slug === stateSlug);
}

export function getCityBySlug(slug: string): City | undefined {
  return getAllCities().find(c => c.slug === slug);
}

export function getCityBySlugAndState(slug: string, stateSlug: string): City | undefined {
  return getAllCities().find(c => c.slug === slug && c.state_slug === stateSlug);
}

// ─── Practice Areas ─────────────────────────────────────────────────────────
export function getAllPracticeAreas(): PracticeArea[] {
  return cached('allPracticeAreas', () => {
    const files = getMarkdownFiles('Practice Areas');
    return files.map(f => {
      const data = parseFile<PracticeArea>('Practice Areas', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => a.name.localeCompare(b.name));
  });
}

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return getAllPracticeAreas().find(p => p.slug === slug);
}

// ─── Blog ───────────────────────────────────────────────────────────────────
export function getAllBlogPosts(): BlogPost[] {
  return cached('allBlogPosts', () => {
    const files = getMarkdownFiles('Blog');
    return files.map(f => {
      const data = parseFile<BlogPost>('Blog', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find(p => p.slug === slug);
}

export async function getBlogPostWithHtml(slug: string): Promise<(BlogPost & { htmlContent: string }) | undefined> {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;
  const htmlContent = await parseMarkdown(post.content);
  return { ...post, htmlContent };
}

// ─── FAQs ───────────────────────────────────────────────────────────────────
export function getAllFAQs(): FAQ[] {
  return cached('allFAQs', () => {
    const files = getMarkdownFiles('FAQ');
    return files.map(f => {
      const data = parseFile<FAQ>('FAQ', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
}

export function getFAQBySlug(slug: string): FAQ | undefined {
  return getAllFAQs().find(f => f.slug === slug);
}

export async function getFAQWithHtml(slug: string): Promise<(FAQ & { htmlContent: string }) | undefined> {
  const faq = getFAQBySlug(slug);
  if (!faq) return undefined;
  const htmlContent = await parseMarkdown(faq.content);
  return { ...faq, htmlContent };
}

// ─── Programmatic SEO pages ─────────────────────────────────────────────────
export function getAllProgrammaticPages(): ProgrammaticPage[] {
  return cached('allProgrammaticPages', () => {
    const files = getMarkdownFiles('Programmatic SEO');
    return files.map(f => {
      const data = parseFile<ProgrammaticPage>('Programmatic SEO', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    });
  });
}

export function getProgrammaticPageBySlug(slug: string): ProgrammaticPage | undefined {
  return getAllProgrammaticPages().find(p => p.slug === slug);
}

export async function getProgrammaticPageWithHtml(slug: string): Promise<(ProgrammaticPage & { htmlContent: string }) | undefined> {
  const page = getProgrammaticPageBySlug(slug);
  if (!page) return undefined;
  const htmlContent = await parseMarkdown(page.content);
  return { ...page, htmlContent };
}

// ─── Comparisons ────────────────────────────────────────────────────────────
export function getAllComparisons(): Comparison[] {
  return cached('allComparisons', () => {
    const files = getMarkdownFiles('Compare');
    return files.map(f => {
      const data = parseFile<Comparison>('Compare', f);
      if (!data.slug) {
        data.slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return data;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return getAllComparisons().find(c => c.slug === slug);
}

export async function getComparisonWithHtml(slug: string): Promise<(Comparison & { htmlContent: string }) | undefined> {
  const comp = getComparisonBySlug(slug);
  if (!comp) return undefined;
  const htmlContent = await parseMarkdown(comp.content);
  return { ...comp, htmlContent };
}

// ─── Aggregation helpers ────────────────────────────────────────────────────
export function getStats() {
  return {
    totalTools: getAllTools().length,
    totalAttorneys: getAllAttorneys().length,
    totalStates: getAllStates().length,
    totalCities: getAllCities().length,
    totalPracticeAreas: getAllPracticeAreas().length,
  };
}
