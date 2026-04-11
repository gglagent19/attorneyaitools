"use client";

import { useState, useMemo, useCallback } from "react";
import ToolCard from "@/components/ToolCard";
import FilterSidebar from "@/components/FilterSidebar";
import SearchBar from "@/components/SearchBar";
import type { AITool } from "@/lib/types";

interface ToolsDirectoryProps {
  tools: AITool[];
  categories: string[];
}

const ITEMS_PER_PAGE = 12;
const pricingOptions = ["Free", "Freemium", "Paid", "Free Trial"];
const ratingOptions = ["4+ Stars", "3+ Stars", "2+ Stars"];

export default function ToolsDirectory({ tools, categories }: ToolsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    category: "",
    pricing: "",
    rating: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearch(query);
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
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
        const min = parseInt(activeFilters.rating);
        if (tool.rating < min) return false;
      }
      return true;
    });
  }, [tools, search, activeFilters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filterGroups = [
    { label: "Category", key: "category", options: categories },
    { label: "Pricing", key: "pricing", options: pricingOptions },
    { label: "Rating", key: "rating", options: ratingOptions },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <FilterSidebar
        filters={filterGroups}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <SearchBar placeholder="Search AI tools..." onSearch={handleSearch} />
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
        </p>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginated.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">No tools found matching your criteria.</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Client-side pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-2 py-2 text-sm text-slate-400">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p as number)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                      p === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 bg-white border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
