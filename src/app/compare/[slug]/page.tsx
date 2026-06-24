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

      <article className="bg-[#f6f3ee] max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#8a93a1]">
          <Link href="/" className="hover:text-[#0f7d6c]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="hover:text-[#0f7d6c]">Compare</Link>
          <span className="mx-2">/</span>
          <span className="text-[#5b6472]">{c.title}</span>
        </nav>

        <header className="mb-10">
          <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-6">
            Head-to-Head Comparison
          </span>
          <h1 className="serif-ed text-4xl md:text-5xl text-[#14181f] leading-[1.1] mb-6">
            {c.title}
          </h1>
          <p className="text-xl text-[#5b6472] leading-relaxed">
            {c.description}
          </p>
          {c.date && (
            <p className="mt-6 text-sm text-[#8a93a1]">
              Published <time dateTime={c.date}>{c.date}</time> · Reviewed by AttorneyAITools editorial
            </p>
          )}
        </header>

        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:text-[#14181f] prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-a:text-[#0f7d6c] prose-table:text-sm prose-th:bg-[#eeeae2]"
          dangerouslySetInnerHTML={{ __html: c.htmlContent }}
        />

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href={`/ai-tools/${c.tool_a}`}
            className="inline-flex items-center justify-center rounded-lg bg-[#1a2a4a] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#12203d]"
          >
            View {c.tool_a}
          </Link>
          <Link
            href={`/ai-tools/${c.tool_b}`}
            className="inline-flex items-center justify-center rounded-lg border border-[#d4cebf] bg-transparent px-6 py-3 font-semibold text-[#2a3140] hover:bg-[#eeeae2] transition-colors"
          >
            View {c.tool_b}
          </Link>
        </div>

        {related.length > 0 && (
          <aside className="mt-20 border-t border-[#e2ddd3] pt-12">
            <h2 className="serif-ed text-2xl text-[#14181f] mb-6">More Comparisons</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/compare/${r.slug}`}
                    className="block p-5 rounded-xl border border-[#e2ddd3] bg-white hover:border-[#d4cebf] hover:bg-[#eeeae2] transition-all"
                  >
                    <p className="font-bold text-[#14181f]">{r.title}</p>
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
