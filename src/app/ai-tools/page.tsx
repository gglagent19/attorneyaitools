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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">AI Tools for Lawyers</h1>
        <p className="text-lg text-slate-600">
          Discover and compare AI-powered tools designed for legal professionals.
        </p>
      </div>
      <ToolsDirectory tools={tools} categories={categories} />
    </div>
  );
}
