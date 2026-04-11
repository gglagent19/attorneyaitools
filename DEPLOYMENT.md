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

### Option 1: Vercel (Recommended — Currently Deployed)

**Live URLs:**
- Production: https://attorneyaitools.vercel.app
- Custom domain: https://attorneyaitools.org (requires DNS setup below)
- GitHub: https://github.com/gglagent19/attorneyaitools

```bash
# Deploy (use --archive=tgz for 20K+ files)
vercel --prod --yes --archive=tgz
```

**DNS Setup for attorneyaitools.org:**
Set these DNS records at your domain registrar:
```
A     @     76.76.21.21
A     www   76.76.21.21
```
Or change nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
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

## Google Analytics & Search Console

### Google Analytics Setup
1. Go to https://analytics.google.com and create a property for attorneyaitools.org
2. Get your Measurement ID (starts with `G-`)
3. Replace `G-XXXXXXXXXX` in `src/app/layout.tsx` (lines 47 and 55)
4. Commit and push — Vercel auto-deploys

### Google Search Console Setup
1. Go to https://search.google.com/search-console
2. Add property: `https://attorneyaitools.org`
3. Verify via DNS TXT record or HTML meta tag
4. Submit sitemap: `https://attorneyaitools.org/sitemap.xml`
5. The sitemap contains 20,000+ URLs covering all cities, tools, and attorneys

### Google AdSense Setup
1. Go to https://adsense.google.com and apply
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `src/app/layout.tsx` (line 61)
3. AdBlock components throughout the site will display ads automatically

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
- Run `node scripts/gen-census-cities.cjs` to add more cities from Census data
- Run the programmatic page generator to create new practice area + city combinations
- Creates "[Practice Area] Lawyers in [City]" pages for every combination
- Creates "Best AI Tools for [Practice Area] Lawyers" pages

## Traffic Growth Strategy ($100/day)

| Revenue Source | Monthly Target | How |
|---|---|---|
| Google AdSense | $900-1200 | 20K indexed pages driving organic traffic |
| Affiliate commissions | $600-900 | AI tool affiliate links (Harvey, Casetext, etc.) |
| Featured listings | $150-300 | 3-6 attorneys at $49/mo each |
| Featured tools | $200-300 | 2-3 tools at $99/mo each |
| Newsletter sponsors | $300-450 | Weekly newsletter to legal professionals |

### Content Calendar
- 2-3 blog posts per week targeting long-tail keywords
- Focus on "best AI tools for [practice area] lawyers" keywords
- Create comparison posts (Harvey AI vs Casetext vs Lexis+)
- Outreach to legal bloggers for backlinks
- LinkedIn content about legal AI trends
