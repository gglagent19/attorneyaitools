import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllComparisons,
  getComparisonWithHtml,
} from "@/lib/vault";
import {
  generateComparisonArticleSchema,
  generateComparisonMeta,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from "@/lib/seo";

export async function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparisons = getAllComparisons();
  const c = comparisons.find((x) => x.slug === slug);
  if (!c) return { title: "Comparison Not Found" };
  return generateComparisonMeta(c);
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getComparisonWithHtml(slug);
  if (!c) notFound();

  const articleSchema = generateComparisonArticleSchema(c);
  const faqSchema = generateFAQPageSchema(c.content);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: c.title, url: `/compare/${c.slug}` },
  ]);

  const related = getAllComparisons()
    .filter((x) => x.slug !== c.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="hover:text-emerald-600">Compare</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{c.title}</span>
        </nav>

        <header className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
            Head-to-Head Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            {c.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {c.description}
          </p>
          {c.date && (
            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime={c.date}>{c.date}</time> · Reviewed by AttorneyAITools editorial
            </p>
          )}
        </header>

        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-a:text-emerald-600 prose-table:text-sm prose-th:bg-slate-50"
          dangerouslySetInnerHTML={{ __html: c.htmlContent }}
        />

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href={`/ai-tools/${c.tool_a}`}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-emerald-600 transition-colors"
          >
            View {c.tool_a}
          </Link>
          <Link
            href={`/ai-tools/${c.tool_b}`}
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-900 font-bold hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          >
            View {c.tool_b}
          </Link>
        </div>

        {related.length > 0 && (
          <aside className="mt-20 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-black text-slate-900 mb-6">More Comparisons</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/compare/${r.slug}`}
                    className="block p-5 rounded-xl border border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/40 transition-all"
                  >
                    <p className="font-bold text-slate-900">{r.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </>
  );
}
