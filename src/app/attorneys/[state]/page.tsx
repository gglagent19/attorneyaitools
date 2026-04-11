import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates, getStateBySlug, getCitiesByState, getAttorneysByState } from "@/lib/vault";
import { generateStateMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";
import AdBlock from "@/components/AdBlock";

export async function generateStaticParams() {
  const states = getAllStates();
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return { title: "State Not Found" };
  return generateStateMeta(state);
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const cities = getCitiesByState(stateSlug);
  const attorneys = getAttorneysByState(stateSlug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: state.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Attorneys in {state.name}
        </h1>
        <p className="text-lg text-slate-600">
          Browse {attorneys.length} attorneys across {cities.length} cities in{" "}
          {state.name}.
        </p>
      </div>

      {/* Cities Grid */}
      {cities.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Browse by City ({cities.length} cities)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[600px] overflow-y-auto pr-2">
            {cities.map((city) => (
              <Link
                key={`${city.slug}-${city.state_slug}`}
                href={`/attorneys/${stateSlug}/${city.slug}`}
                className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all text-center"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdBlock format="horizontal" slot="state-page-mid" />

      {/* Attorneys List - show first 30 */}
      {attorneys.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Featured Attorneys in {state.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attorneys.slice(0, 30).map((attorney) => (
              <AttorneyCard key={attorney.slug} attorney={attorney} />
            ))}
          </div>
          {attorneys.length > 30 && (
            <p className="text-center text-slate-500 mt-6">
              And {attorneys.length - 30} more attorneys in {state.name}. Browse by city above.
            </p>
          )}
        </section>
      )}

      {attorneys.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-500 text-lg">
            No attorneys listed in {state.name} yet.
          </p>
          <Link
            href="/submit-attorney"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit a listing
          </Link>
        </div>
      )}
    </div>
  );
}
