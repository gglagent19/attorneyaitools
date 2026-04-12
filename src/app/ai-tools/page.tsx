import type { Metadata } from "next";
import { getAllTools, getToolCategories } from "@/lib/vault";
import ToolsDirectory from "./ToolsDirectory";

export const metadata: Metadata = {
  title: "AI Tools for Lawyers - Compare Legal AI Software",
  description:
    "Browse and compare the best AI tools for lawyers. Filter by category, pricing, and rating to find the perfect legal technology solution for your practice.",
};

export default function AIToolsPage() {
  const tools = getAllTools();
  const categories = getToolCategories();

  return (
    <div className="bg-white min-h-screen font-[Inter] pt-32 pb-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <header className="mb-16 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-5">
            Professional Directory
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6">
            Elite AI Solutions for the{" "}
            <span className="text-emerald-600">Legal Mind</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
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
