"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { State, Attorney } from "@/lib/types";

interface Props {
  states: State[];
  attorneys: Attorney[];
}

export default function AttorneyDirectoryClient({ states, attorneys }: Props) {
  const [search, setSearch] = useState("");

  const filteredStates = useMemo(() => {
    if (!search) return states;
    const q = search.toLowerCase();
    return states.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.abbr.toLowerCase().includes(q)
    );
  }, [states, search]);

  const attorneyCountByState = useMemo(() => {
    const counts: Record<string, number> = {};
    attorneys.forEach((a) => {
      counts[a.state_slug] = (counts[a.state_slug] || 0) + 1;
    });
    return counts;
  }, [attorneys]);

  return (
    <>
      <div className="mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredStates.map((state) => (
          <Link
            key={state.slug}
            href={`/attorneys/${state.slug}`}
            className="group px-4 py-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
              {state.name}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {attorneyCountByState[state.slug] || 0} attorneys
            </p>
          </Link>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-lg">No states found.</p>
        </div>
      )}
    </>
  );
}
