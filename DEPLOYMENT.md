# AttorneyAITools.org — Deployment & Operations Guide

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Obsidian Vault Setup

1. Open Obsidian and create a new vault pointing to the `vault/` directory.
2. Enable community plugins: Dataview, Templater, Git (optional).
3. Use templates in `vault/Templates/` for creating new content.
4. Content changes in Obsidian are automatically reflected on the next build.

## Build & Deploy

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Vercel settings:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Option 2: Self-hosted (Docker)

```bash
# Build
docker build -t attorneyaitools .

# Run
docker run -p 3000:3000 attorneyaitools
```

### Option 3: Static Export

```bash
# Set output: 'export' in next.config.ts
npm run build

# Serve the `out/` directory with any static host (Netlify, Cloudflare Pages, etc.)
```

## Scripts

### Import AI Tools from JSON
```bash
npx ts-node scripts/import-tools.ts vault/Datasets/tools.json
```

### Import Attorneys from JSON
```bash
npx ts-node scripts/import-attorneys.ts vault/Datasets/attorneys.json
```

### Generate Programmatic SEO Pages
```bash
npx ts-node scripts/generate-programmatic-pages.ts
```

### Sync Vault & Validate
```bash
npx ts-node scripts/sync-vault.ts
```

## Content Workflow

1. **Add content in Obsidian** — Create new AI tool, attorney, or blog post using templates.
2. **Validate** — Run `npx ts-node scripts/sync-vault.ts` to check for broken links and missing frontmatter.
3. **Build** — Run `npm run build` to generate static pages.
4. **Deploy** — Push to git (auto-deploys on Vercel) or manually deploy.

## Environment Variables

Create a `.env.local` file:

```env
# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXX

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Newsletter API (optional — Mailchimp, ConvertKit, etc.)
NEWSLETTER_API_KEY=
NEWSLETTER_LIST_ID=
```

## SEO Checklist

- [x] Schema markup on all pages (JSON-LD)
- [x] Dynamic sitemap at /sitemap.xml
- [x] robots.txt at /robots.txt
- [x] OpenGraph meta tags
- [x] Breadcrumb navigation with schema
- [x] Canonical URLs
- [x] Meta descriptions on all pages
- [x] Alt text for images
- [x] Responsive design
- [x] Fast page loads (static generation)

## Monetization Setup

### Google AdSense
1. Sign up at adsense.google.com
2. Add your publisher ID to `NEXT_PUBLIC_ADSENSE_ID` in `.env.local`
3. AdBlock components throughout the site display ads

### Affiliate Links
1. Add affiliate links to AI tool frontmatter: `affiliate_link: "https://..."`
2. CTA buttons on tool pages automatically use affiliate links when available

### Featured Listings
1. Set `featured: true` in attorney/tool frontmatter
2. Featured items appear first in listings and get highlighted cards
3. Charge $49/month for featured attorney placements
4. Charge $99/month for featured tool placements

## Scaling the Vault

### Adding More AI Tools
- Use the import script with a JSON dataset
- Or manually create notes in Obsidian using the AI Tool Template
- Each new tool automatically gets a page at `/ai-tools/[slug]`

### Adding More Attorneys
- Use the import script with a JSON dataset
- Each attorney automatically gets pages at the correct state/city/attorney URL
- New cities and states are created as needed

### Adding Programmatic SEO Pages
- Run `npx ts-node scripts/generate-programmatic-pages.ts` to auto-generate combinations
- Creates "[Practice Area] Lawyers in [City]" pages for every combination
- Creates "Best AI Tools for [Practice Area] Lawyers" pages
