import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTools, getToolWithHtml } from "@/lib/vault";
import { generateToolSchema, generateToolMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import StarRating from "@/components/StarRating";
import ToolCard from "@/components/ToolCard";
import AdBlock from "@/components/AdBlock";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tools = getAllTools();
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  return generateToolMeta(tool);
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolWithHtml(slug);
  if (!tool) notFound();

  const allTools = getAllTools();
  const similarTools = allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  const toolSchema = generateToolSchema(tool);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: tool.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Tool Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                    {tool.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {tool.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <StarRating rating={tool.rating} />
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {tool.category}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {tool.pricing}
                    </span>
                    {tool.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600">{tool.description}</p>
                </div>

                <a
                  href={tool.affiliate_link || tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-md border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {tool.use_cases && tool.use_cases.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Use Cases</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tool.use_cases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* HTML Content */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: tool.htmlContent }}
              />
            </div>

            <div className="mt-8">
              <AdBlock format="horizontal" slot="tool-detail-bottom" />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Info</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-slate-500">Category</dt>
                  <dd className="text-sm font-medium text-slate-900">{tool.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-slate-500">Pricing</dt>
                  <dd className="text-sm font-medium text-slate-900">{tool.pricing}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-slate-500">Rating</dt>
                  <dd className="text-sm font-medium text-slate-900">{tool.rating}/5</dd>
                </div>
                {tool.date_added && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-slate-500">Added</dt>
                    <dd className="text-sm font-medium text-slate-900">{tool.date_added}</dd>
                  </div>
                )}
              </dl>
            </div>

            <AdBlock format="rectangle" slot="tool-detail-sidebar" />

            {/* Similar Tools */}
            {similarTools.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Similar Tools</h3>
                <div className="space-y-4">
                  {similarTools.map((t) => (
                    <ToolCard key={t.slug} tool={t} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
