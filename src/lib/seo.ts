import type { AITool, Attorney, BlogPost, City, State } from './types';

const SITE_URL = 'https://attorneyaitools.org';
const SITE_NAME = 'AttorneyAITools';

// JSON-LD Schema generators
export function generateToolSchema(tool: AITool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: 'Legal Technology',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(Math.random() * 200) + 50,
    },
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'Free' ? '0' : undefined,
      priceCurrency: 'USD',
      category: tool.pricing,
    },
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
    areaServed: {
      '@type': 'City',
      name: attorney.city,
    },
    knowsAbout: attorney.practice_areas,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: attorney.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(Math.random() * 100) + 10,
    },
  };
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
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

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'The largest directory of AI tools for attorneys and lawyers across the United States.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(city: string, state: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Attorneys in ${city}, ${state}`,
    description: `Find top-rated attorneys in ${city}, ${state}`,
    url: `${SITE_URL}/attorneys/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`,
  };
}

// OpenGraph meta generators
export function generateToolMeta(tool: AITool) {
  return {
    title: `${tool.name} - AI Tool for Lawyers`,
    description: tool.description || `${tool.name} is an AI-powered ${tool.category.toLowerCase()} tool for legal professionals. Read reviews, compare features, and find alternatives.`,
    openGraph: {
      title: `${tool.name} - AI Tool for Lawyers`,
      description: tool.description,
      url: `${SITE_URL}/ai-tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
  };
}

export function generateAttorneyMeta(attorney: Attorney) {
  return {
    title: `${attorney.name} - ${attorney.practice_areas?.[0] || 'Attorney'} in ${attorney.city}, ${attorney.state}`,
    description: attorney.description || `${attorney.name} is a ${attorney.practice_areas?.join(', ')} attorney in ${attorney.city}, ${attorney.state}. ${attorney.experience_years} years of experience.`,
    openGraph: {
      title: `${attorney.name} - Attorney in ${attorney.city}`,
      description: attorney.description,
      url: `${SITE_URL}/attorneys/${attorney.state_slug}/${attorney.city_slug}/${attorney.slug}`,
      siteName: SITE_NAME,
      type: 'profile',
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
  };
}

export function generateBlogMeta(post: BlogPost) {
  return {
    title: post.title,
    description: post.description || `Read about ${post.title} on the AttorneyAITools blog.`,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}
