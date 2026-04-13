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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
            Head-to-Head
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-6">
            AI Tool Comparisons for Lawyers
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
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
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/40 hover:shadow-xl transition-all flex flex-col"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
                Comparison
              </span>
              <h2 className="text-xl font-black text-slate-900 leading-snug mb-4 group-hover:text-emerald-600 transition-colors">
                {c.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-grow line-clamp-3">
                {c.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-600">
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
