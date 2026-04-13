import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllFAQs, getFAQWithHtml, getToolBySlug } from "@/lib/vault";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = "https://attorneyaitools.org";

export async function generateStaticParams() {
  const faqs = getAllFAQs();
  return faqs.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const faq = getAllFAQs().find((f) => f.slug === slug);
  if (!faq) return { title: "FAQ Not Found" };
  const title = `${faq.question} | AttorneyAITools`;
  const url = `${SITE_URL}/faq/${faq.slug}`;
  return {
    title,
    description: faq.description,
    alternates: { canonical: url },
    openGraph: {
      title: faq.question,
      description: faq.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: faq.question,
      description: faq.description,
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ethics": "AI Ethics",
  pricing: "Pricing",
  tools: "Tools",
  practice: "Practice",
  legal: "Legal",
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const faq = await getFAQWithHtml(slug);
  if (!faq) notFound();

  const url = `${SITE_URL}/faq/${faq.slug}`;

  // Extract a plain-text short answer for the schema, if present.
  const shortAnswerMatch = faq.content.match(
    /##\s*Short Answer\s*\n+([\s\S]*?)(?=\n##\s|$)/i
  );
  const shortAnswerText = (shortAnswerMatch?.[1] ?? faq.description)
    .replace(/\*\*/g, "")
    .trim();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: shortAnswerText,
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: faq.question,
    description: faq.description,
    datePublished: faq.date,
    dateModified: faq.date,
    author: {
      "@type": "Organization",
      name: "AttorneyAITools",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "AttorneyAITools",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "FAQ", href: "/faq" },
    { label: faq.question },
  ];

  const relatedTools = (faq.related_tools || [])
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<ReturnType<typeof getToolBySlug>> => Boolean(t));

  const categoryLabel = CATEGORY_LABELS[faq.category] ?? faq.category;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <article>
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-100">
                {categoryLabel}
              </span>
              <span className="text-xs text-slate-500">
                Updated{" "}
                {new Date(faq.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {faq.question}
            </h1>
          </header>

          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <div
              className="prose prose-slate max-w-none
                prose-headings:text-slate-900
                prose-h1:hidden
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-slate-900
                prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
                prose-p:text-slate-700 prose-p:leading-relaxed
                prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
                prose-ul:text-slate-700
                prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: faq.htmlContent }}
            />
          </div>
        </article>

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Recommended Tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/ai-tools/${tool.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {tool.pricing}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 bg-emerald-50 border border-emerald-100 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Browse more FAQs
          </h2>
          <p className="text-slate-700 mb-4">
            Explore our full library of answers to the questions attorneys
            actually ask about legal AI.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition"
          >
            All FAQs
          </Link>
        </section>
      </div>
    </>
  );
}
