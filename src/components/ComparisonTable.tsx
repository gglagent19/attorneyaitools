"use client";

import { useState, useMemo } from "react";
import StarRating from "./StarRating";

interface ToolRow {
  name: string;
  category: string;
  pricing: string;
  rating: number;
}

interface ComparisonTableProps {
  tools: ToolRow[];
}

type SortKey = "name" | "category" | "pricing" | "rating";
type SortDir = "asc" | "desc";

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "rating" ? "desc" : "asc");
    }
  }

  const sorted = useMemo(() => {
    return [...tools].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = typeof aVal === "number" ? (aVal as number) - (bVal as number) : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [tools, sortKey, sortDir]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Tool" },
    { key: "category", label: "Category" },
    { key: "pricing", label: "Pricing" },
    { key: "rating", label: "Rating" },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">
                <button
                  onClick={() => handleSort(col.key)}
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  {col.label}
                  <span className="text-slate-400 text-xs">
                    {sortKey === col.key ? (sortDir === "asc" ? "\u25B2" : "\u25BC") : "\u25B4\u25BE"}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((tool, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900">{tool.name}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {tool.category}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{tool.pricing}</td>
              <td className="px-4 py-3">
                <StarRating rating={tool.rating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <div className="px-4 py-8 text-center text-slate-500 text-sm">No tools to compare.</div>
      )}
    </div>
  );
}
