import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProgrammaticPages,
  getProgrammaticPageWithHtml,
  getAttorneysByPracticeArea,
  getAttorneysByCity,
  getAllTools,
} from "@/lib/vault";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";
import ToolCard from "@/components/ToolCard";
import AdBlock from "@/components/AdBlock";
import ShieldedCTA from "@/components/ShieldedCTA";

export async function generateStaticParams() {
  const pages = getAllProgrammaticPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pages = getAllProgrammaticPages();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.title,
    description:
      (page as { description?: string }).description ||
      `${page.title}. Find the best AI tools and attorneys for your legal needs.`,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function ProgrammaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getProgrammaticPageWithHtml(slug);
  if (!page) notFound();

  const practiceSlug = page.practice_area
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const attorneys =
    page.template === "lawyers-by-city"
      ? getAttorneysByPracticeArea(practiceSlug || "")
      : [];

  const tools =
    page.template === "tools-by-practice" ? getAllTools().slice(0, 6) : [];

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: page.title }];

  const isClaimPage = page.template === "claim-by-state";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {isClaimPage && (
        <div className="mb-8">
          <ShieldedCTA state={page.state} position="top" variant="banner" />
        </div>
      )}

      <article className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          {page.title}
        </h1>
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.htmlContent }}
          />
        </div>
      </article>

      <AdBlock format="horizontal" slot="programmatic-mid" />

      {/* Show relevant attorneys */}
      {attorneys.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            {page.practice_area} Attorneys
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attorneys.slice(0, 6).map((a) => (
              <AttorneyCard key={a.slug} attorney={a} />
            ))}
          </div>
        </section>
      )}

      {/* Show relevant tools */}
      {tools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Recommended AI Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}

      {isClaimPage && (
        <div className="mt-10">
          <ShieldedCTA state={page.state} position="bottom" variant="inline" />
          <p className="mt-4 text-center text-sm text-slate-500">
            Prefer to work with an attorney?{" "}
            <a
              href="/find-a-lawyer"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Get matched with an insurance claim lawyer free →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
