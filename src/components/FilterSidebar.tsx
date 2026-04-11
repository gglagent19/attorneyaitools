"use client";

import { useState } from "react";

interface FilterGroup {
  label: string;
  key: string;
  options: string[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export default function FilterSidebar({ filters, activeFilters, onFilterChange }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const hasActive = Object.values(activeFilters).some((v) => v !== "");

  function clearAll() {
    filters.forEach((f) => onFilterChange(f.key, ""));
  }

  function toggleCollapse(key: string) {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Filters</h3>
        {hasActive && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.key} className="border-t border-slate-200 pt-4">
          <button
            onClick={() => toggleCollapse(group.key)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-sm font-medium text-slate-800">{group.label}</span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform ${collapsed[group.key] ? "" : "rotate-180"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {!collapsed[group.key] && (
            <div className="space-y-2">
              {group.options.map((option) => {
                const isActive = activeFilters[group.key] === option;
                return (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer group/option"
                  >
                    <input
                      type="radio"
                      name={group.key}
                      checked={isActive}
                      onChange={() => onFilterChange(group.key, isActive ? "" : option)}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 group-hover/option:text-slate-900 transition-colors">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
        </svg>
        Filters
        {hasActive && (
          <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">
            {Object.values(activeFilters).filter((v) => v !== "").length}
          </span>
        )}
      </button>

      {/* Mobile Slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-white rounded-xl border border-slate-200 p-5">{content}</div>
      </aside>
    </>
  );
}
