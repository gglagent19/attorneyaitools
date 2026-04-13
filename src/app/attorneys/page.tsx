import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates, getAllAttorneys } from "@/lib/vault";

export const metadata: Metadata = {
  title: "Find Attorneys Across the United States",
  description:
    "Browse our directory of top-rated attorneys across all 50 states. Find lawyers by state, city, and practice area.",
  alternates: { canonical: "/attorneys" },
};

export default function AttorneysPage() {
  const states = getAllStates();
  const attorneys = getAllAttorneys();

  // Aggregate counts on the server — never send the 8K-row payload to the browser.
  const countsByState: Record<string, number> = {};
  for (const a of attorneys) {
    countsByState[a.state_slug] = (countsByState[a.state_slug] || 0) + 1;
  }
  const total = attorneys.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Find an Attorney
        </h1>
        <p className="text-lg text-slate-600">
          Browse {total.toLocaleString()}+ attorneys across all 50 states. Select a
          state to get started.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/attorneys/${state.slug}`}
            className="group px-4 py-4 bg-white rounded-lg border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <p className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">
              {state.name}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {countsByState[state.slug] || 0} attorneys
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
