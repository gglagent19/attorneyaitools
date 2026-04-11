import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates, getAllAttorneys } from "@/lib/vault";
import SearchBar from "@/components/SearchBar";
import AttorneyDirectoryClient from "./AttorneyDirectoryClient";

export const metadata: Metadata = {
  title: "Find Attorneys Across the United States",
  description:
    "Browse our directory of top-rated attorneys across all 50 states. Find lawyers by state, city, and practice area.",
};

export default function AttorneysPage() {
  const states = getAllStates();
  const attorneys = getAllAttorneys();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Find an Attorney
        </h1>
        <p className="text-lg text-slate-600">
          Browse {attorneys.length}+ attorneys across all 50 states. Select a
          state to get started.
        </p>
      </div>

      <AttorneyDirectoryClient states={states} attorneys={attorneys} />
    </div>
  );
}
