import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCities,
  getAllStates,
  getCityBySlugAndState,
  getStateBySlug,
  getAttorneysByCity,
} from "@/lib/vault";
import { generateCityMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";
import AdBlock from "@/components/AdBlock";

// Only pre-generate the top 200 cities at build time.
// The rest use ISR (dynamicParams = true by default).
export async function generateStaticParams() {
  const states = getAllStates();
  const topCities: { state: string; city: string }[] = [];
  for (const s of states) {
    const cities = getAllCities().filter(c => c.state_slug === s.slug);
    // Take first 4 cities per state for pre-generation
    for (const c of cities.slice(0, 4)) {
      topCities.push({ state: s.slug, city: c.slug });
    }
  }
  return topCities;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlugAndState(citySlug, stateSlug);
  if (!city) return { title: "City Not Found" };
  return generateCityMeta(city);
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);
  const city = getCityBySlugAndState(citySlug, stateSlug);
  if (!state || !city) notFound();

  const attorneys = getAttorneysByCity(citySlug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: state.name, href: `/attorneys/${stateSlug}` },
    { label: city.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Attorneys in {city.name}, {state.name}
        </h1>
        <p className="text-lg text-slate-600">
          Find top-rated lawyers in {city.name}. Browse {attorneys.length}{" "}
          attorneys by practice area.
        </p>
      </div>

      <AdBlock format="horizontal" slot="city-page-top" />

      {/* Attorneys Grid */}
      {attorneys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {attorneys.map((attorney) => (
            <AttorneyCard key={attorney.slug} attorney={attorney} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 mt-8">
          <p className="text-slate-500 text-lg">
            No attorneys listed in {city.name} yet.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Are you an attorney in {city.name}? Get listed in our directory.
          </p>
          <Link
            href="/submit-attorney"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit a listing
          </Link>
        </div>
      )}

      {/* SEO content */}
      <section className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Finding a Lawyer in {city.name}, {state.name}
        </h2>
        <div className="prose max-w-none text-slate-600">
          <p>
            Whether you need a personal injury attorney, criminal defense lawyer, family law
            specialist, or business attorney in {city.name}, our directory helps you find the
            right legal representation. All attorneys listed are licensed to practice in {state.name}.
          </p>
          <p>
            Browse attorneys by practice area or use our search to find lawyers specializing
            in your specific legal needs in {city.name}.
          </p>
        </div>
      </section>
    </div>
  );
}
