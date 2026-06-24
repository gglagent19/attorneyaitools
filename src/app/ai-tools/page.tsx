import type { Metadata } from "next";
import { getAllTools, getToolCategories } from "@/lib/vault";
import { generateItemListSchema, generateBreadcrumbSchema } from "@/lib/seo";
import ToolsDirectory from "./ToolsDirectory";

export const metadata: Metadata = {
  title: "AI Tools for Lawyers - Compare Legal AI Software",
  description:
    "Browse and compare the best AI tools for lawyers. Filter by category, pricing, and rating to find the perfect legal technology solution for your practice.",
  alternates: { canonical: "/ai-tools" },
};

export default function AIToolsPage() {
  const tools = getAllTools();
  const categories = getToolCategories();

  const itemList = generateItemListSchema(
    "AI Tools for Lawyers",
    tools.map((t) => ({ name: t.name, url: `/ai-tools/${t.slug}` }))
  );
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Tools", url: "/ai-tools" },
  ]);

  return (
    <div className="bg-[#f6f3ee] min-h-screen font-[Inter] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <header className="mb-16 max-w-4xl">
          <p className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-5">
            Professional Directory
          </p>
          <h1 className="serif-ed text-5xl sm:text-6xl text-[#14181f] leading-[1.05] mb-6">
            Elite AI Solutions for the{" "}
            <span className="text-[#0f7d6c]">Legal Mind</span>
          </h1>
          <p className="text-lg text-[#5b6472] leading-relaxed max-w-2xl">
            A meticulously curated directory of AI-powered tools built for
            modern legal professionals. Discover, compare, and adopt the
            technology transforming law firms today.
          </p>
        </header>

        <ToolsDirectory tools={tools} categories={categories} />
      </div>
    </div>
  );
}
