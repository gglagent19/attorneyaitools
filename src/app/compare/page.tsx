import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparisons } from "@/lib/vault";
import { generateItemListSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Tool Comparisons for Lawyers",
  description:
    "Side-by-side comparisons of the top AI tools for attorneys: Harvey AI vs Casetext, Lexis+ vs Westlaw, Spellbook vs LegalOn, and more. Pricing, features, and verdicts.",
  alternates: { canonical: "/compare" },
};

export default function CompareIndexPage() {
  const comparisons = getAllComparisons();

  const itemList = generateItemListSchema(
    "AI Legal Tool Comparisons",
    comparisons.map((c) => ({ name: c.title, url: `/compare/${c.slug}` }))
  );

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[#f6f3ee] max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-16">
          <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-6">
            Head-to-Head
          </span>
          <h1 className="serif-ed text-5xl md:text-6xl text-[#14181f] leading-[1.05] mb-6">
            AI Tool Comparisons for Lawyers
          </h1>
          <p className="text-xl text-[#5b6472] leading-relaxed">
            Honest, side-by-side comparisons of the top legal AI platforms.
            Verdicts, pricing, features, and which tool fits your firm size and
            workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group bg-white p-8 rounded-2xl border border-[#e2ddd3] hover:border-[#d4cebf] hover:shadow-xl transition-all flex flex-col"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f7d6c] mb-4">
                Comparison
              </span>
              <h2 className="serif-ed text-xl text-[#14181f] leading-snug mb-4 group-hover:text-[#0f7d6c] transition-colors">
                {c.title}
              </h2>
              <p className="text-sm text-[#5b6472] leading-relaxed flex-grow line-clamp-3">
                {c.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0f7d6c]">
                Read comparison
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
