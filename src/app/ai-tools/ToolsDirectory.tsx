"use client";

import { useState, useMemo, useCallback } from "react";
import ToolCard from "@/components/ToolCard";
import type { AITool } from "@/lib/types";

interface ToolsDirectoryProps {
  tools: AITool[];
  categories: string[];
}

const ITEMS_PER_PAGE = 12;
const pricingOptions = ["Free", "Freemium", "Paid", "Free Trial"];

export default function ToolsDirectory({ tools, categories }: ToolsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    category: "",
    pricing: "",
    rating: "",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryToggle = useCallback((category: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }));
    setCurrentPage(1);
  }, []);

  const handlePricingChange = useCallback((pricing: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      pricing: prev.pricing === pricing ? "" : pricing,
    }));
    setCurrentPage(1);
  }, []);

  const handleRatingChange = useCallback((value: string) => {
    setActiveFilters((prev) => ({ ...prev, rating: value }));
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    const result = tools.filter((tool) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.tags?.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (activeFilters.category && tool.category !== activeFilters.category) return false;
      if (activeFilters.pricing && tool.pricing !== activeFilters.pricing) return false;
      if (activeFilters.rating) {
        const min = parseFloat(activeFilters.rating);
        if (tool.rating < min) return false;
      }
      return true;
    });

    const sorted = [...result];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [tools, search, activeFilters, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const minRating = activeFilters.rating ? parseFloat(activeFilters.rating) : 0;

  return (
    <div className="max-w-screen-2xl mx-auto font-[Inter]">
      {/* Search bar */}
      <div className="mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search AI tools by name, category, or capability..."
          className="w-full px-5 py-4 text-base bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32 space-y-10">
            {/* Category */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
                Category
              </h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.category === cat}
                      onChange={() => handleCategoryToggle(cat)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 accent-emerald-600"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pricing Model */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
                Pricing Model
              </h3>
              <div className="flex flex-wrap gap-2">
                {pricingOptions.map((opt) => {
                  const active = activeFilters.pricing === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePricingChange(opt)}
                      className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors ${
                        active
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
                Minimum Rating
              </h3>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={minRating}
                onChange={(e) => handleRatingChange(e.target.value === "0" ? "" : e.target.value)}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-500">Any</span>
                <span className="text-sm font-semibold text-emerald-700">
                  {minRating > 0 ? `${minRating}+ stars` : "All ratings"}
                </span>
                <span className="text-xs text-slate-500">5.0</span>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-slate-900 text-white rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                Pro Tip
              </h4>
              <p className="text-sm leading-relaxed text-slate-200">
                Combine category and pricing filters to pinpoint the exact AI
                solution for your firm&apos;s workflow. Top-rated tools often
                deliver the strongest ROI.
              </p>
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <main className="lg:col-span-9">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-bold text-slate-900">{paginated.length}</span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
              tools
            </p>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>
          </div>

          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginated.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-700 text-lg font-semibold">
                No tools found matching your criteria.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-center gap-1 mt-12"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                    acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`dots-${i}`}
                      className="px-2 py-2 text-sm text-slate-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-10 h-10 text-sm font-semibold rounded-lg transition-colors ${
                        p === currentPage
                          ? "bg-emerald-600 text-white"
                          : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}
