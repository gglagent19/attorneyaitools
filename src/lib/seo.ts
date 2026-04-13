import type { AITool, Attorney, BlogPost, City, State, Comparison } from './types';

const SITE_URL = 'https://attorneyaitools.org';
const SITE_NAME = 'AttorneyAITools';

// ─── Schema generators ──────────────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Attorney AI Tools',
    url: SITE_URL,
    logo: `${SITE_URL}/og-logo.png`,
    description:
      'Independent directory and comparison guide for AI tools built for attorneys and legal professionals.',
    sameAs: [] as string[],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'The largest independent directory of AI tools for attorneys, with side-by-side comparison guides and pricing breakdowns.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/ai-tools?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateToolSchema(tool: AITool) {
  // Note: aggregateRating intentionally omitted unless backed by genuine
  // first-party reviews on-page (Google policy: fabricated ratings are a
  // structured-data violation that can cause manual actions).
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/ai-tools/${tool.slug}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: tool.category || 'Legal Technology',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: tool.pricing === 'Free' ? '0' : undefined,
      category: tool.pricing,
      url: tool.website,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function generateAttorneySchema(attorney: Attorney) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: attorney.name,
    description: attorney.description,
    telephone: attorney.phone,
    email: attorney.email,
    url: attorney.website,
    address: {
      '@type': 'PostalAddress',
      addressLocality: attorney.city,
      addressRegion: attorney.state,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: attorney.city },
    knowsAbout: attorney.practice_areas,
  };
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function generateComparisonArticleSchema(c: Comparison) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    datePublished: c.date,
    dateModified: c.date,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/compare/${c.slug}`,
    about: [
      { '@type': 'SoftwareApplication', name: c.tool_a },
      { '@type': 'SoftwareApplication', name: c.tool_b },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// Parses **Question?** + answer paragraph pairs out of a markdown FAQ section.
// Returns FAQPage JSON-LD if at least 2 Q&A pairs are found, otherwise null.
export function generateFAQPageSchema(markdown: string) {
  if (!markdown) return null;
  // Isolate the FAQ section if present so we don't pick up bold text from elsewhere.
  const faqIdx = markdown.search(/^##\s+(Frequently Asked Questions|FAQ|Common Questions)/im);
  const region = faqIdx >= 0 ? markdown.slice(faqIdx) : markdown;

  const faqs: { question: string; answer: string }[] = [];
  const lines = region.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*\*(.+?\?)\*\*\s*$/);
    if (!m) continue;
    const question = m[1].trim();
    // Collect answer lines until the next bold-question, blank-then-bold, or heading.
    const answerLines: string[] = [];
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      if (/^\*\*.+?\?\*\*\s*$/.test(line)) break;
      if (/^#{1,6}\s/.test(line)) break;
      if (line.trim() === '' && answerLines.length > 0) {
        // Allow one blank line, then check the line after — if it's a new question, stop.
        const next = lines[j + 1];
        if (!next || /^\*\*.+?\?\*\*\s*$/.test(next) || /^#{1,6}\s/.test(next)) break;
      }
      if (line.trim() !== '') answerLines.push(line.trim());
    }
    const answer = answerLines.join(' ').trim();
    if (answer) faqs.push({ question, answer });
  }

  if (faqs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function generateItemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── Meta generators ────────────────────────────────────────────────────────

export function generateToolMeta(tool: AITool) {
  return {
    title: `${tool.name} - AI Tool for Lawyers`,
    description:
      tool.description ||
      `${tool.name} is an AI-powered ${tool.category?.toLowerCase() || 'legal'} tool for legal professionals. Read reviews, compare features, and find alternatives.`,
    alternates: { canonical: `/ai-tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} - AI Tool for Lawyers`,
      description: tool.description,
      url: `${SITE_URL}/ai-tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: 'website' as const,
    },
  };
}

export function generateAttorneyMeta(attorney: Attorney) {
  return {
    title: `${attorney.name} - ${attorney.practice_areas?.[0] || 'Attorney'} in ${attorney.city}, ${attorney.state}`,
    description:
      attorney.description ||
      `${attorney.name} is a ${attorney.practice_areas?.join(', ')} attorney in ${attorney.city}, ${attorney.state}. ${attorney.experience_years} years of experience.`,
    openGraph: {
      title: `${attorney.name} - Attorney in ${attorney.city}`,
      description: attorney.description,
      url: `${SITE_URL}/attorneys/${attorney.state_slug}/${attorney.city_slug}/${attorney.slug}`,
      siteName: SITE_NAME,
      type: 'profile' as const,
    },
  };
}

export function generateCityMeta(city: City) {
  return {
    title: `Best Attorneys in ${city.name}, ${city.state}`,
    description: `Find top-rated attorneys in ${city.name}, ${city.state}. Browse by practice area, read reviews, and connect with experienced lawyers near you.`,
  };
}

export function generateStateMeta(state: State) {
  return {
    title: `Best Attorneys in ${state.name}`,
    description: `Find top-rated attorneys across ${state.name}. Browse by city and practice area to connect with experienced lawyers.`,
    alternates: { canonical: `/attorneys/${state.slug}` },
  };
}

export function generateBlogMeta(post: BlogPost) {
  return {
    title: post.title,
    description: post.description || `Read about ${post.title} on the AttorneyAITools blog.`,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article' as const,
      publishedTime: post.date,
    },
  };
}

export function generateComparisonMeta(c: Comparison) {
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.description,
      type: 'article' as const,
      publishedTime: c.date,
    },
  };
}
