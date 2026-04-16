import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCityBySlugAndState,
  getStateBySlug,
  getAllCities,
} from "@/lib/vault";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateFAQPageSchema,
  generateCityDescription,
} from "@/lib/seo";
import {
  getCityFacts,
  isQualifiedCity,
  hashIndex,
  MIN_ATTORNEYS_FOR_INDEX,
} from "@/lib/city-facts";
import { getStateData } from "@/lib/state-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";

// Pre-render the highest-population cities at build time. The rest use
// on-demand ISR so build time stays manageable for ~19K pages.
export async function generateStaticParams() {
  const cities = getAllCities();
  const sorted = [...cities].sort((a, b) => (b.population || 0) - (a.population || 0));
  return sorted.slice(0, 600).map((c) => ({ state: c.state_slug, city: c.slug }));
}

export const dynamicParams = true;
export const revalidate = 86400; // 24h

const INTRO_VARIANTS_QUALIFIED = [
  (city: string, state: string, n: number) =>
    `Looking for a lawyer in ${city}, ${state}? Our editorial team has reviewed ${n} attorneys serving the ${city} area, organized by practice area, average client rating, and years of experience.`,
  (city: string, state: string, n: number) =>
    `${city} is home to ${n} attorneys featured in our ${state} directory. Compare lawyers by practice area, client ratings, and years of experience to find the right legal fit.`,
  (city: string, state: string, n: number) =>
    `If you need legal help in ${city}, ${state}, this guide profiles ${n} attorneys vetted by our editorial team and grouped by the practice areas most in demand locally.`,
  (city: string, state: string, n: number) =>
    `${n} attorneys practice in ${city}, ${state} according to our directory. Read profiles, compare practice areas, and connect with the lawyer best suited to your matter.`,
  (city: string, state: string, n: number) =>
    `Our ${city}, ${state} attorney guide covers ${n} licensed lawyers across the practice areas residents most commonly need — from personal injury and family law to estate planning and business litigation.`,
];

const INTRO_VARIANTS_UNQUALIFIED = [
  (city: string, state: string, pop: number) =>
    `${city}, ${state} is home to roughly ${pop.toLocaleString()} residents. While our editorial team is still building out our list of ${city} attorneys, this page summarizes the legal context that matters most to ${city} residents and points to nearby cities where we have a verified roster of lawyers.`,
  (city: string, state: string, pop: number) =>
    `With a population of about ${pop.toLocaleString()}, ${city}, ${state} residents share most of the same legal needs as the rest of the state. Below: the ${state} legal context that affects you locally, plus the closest cities where we list verified attorneys.`,
  (city: string, state: string, pop: number) =>
    `${city}, ${state} (population ~${pop.toLocaleString()}) is part of our nationwide attorney directory. We have not yet verified any attorneys with offices in ${city} itself; for now, the practical move is to consult the legal context for ${state} below and look at nearby cities with confirmed attorney listings.`,
  (city: string, state: string, pop: number) =>
    `Our ${city}, ${state} guide currently focuses on the ${state} legal context applicable to ${city}'s ${pop.toLocaleString()} residents and the closest cities with verified attorney rosters in our directory.`,
  (city: string, state: string, pop: number) =>
    `${city} is one of more than ${Math.round(pop / 1000) * 1000} ${state} cities our directory tracks. Until we have verified attorneys with ${city} offices, this page summarizes the ${state} legal information most relevant to local residents and links to the nearest cities where we list attorneys.`,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlugAndState(citySlug, stateSlug);
  const state = getStateBySlug(stateSlug);
  if (!city || !state) return { title: "Not Found" };
  const facts = getCityFacts(stateSlug, citySlug);
  const qualified = !!facts && facts.attorneyCount >= MIN_ATTORNEYS_FOR_INDEX;
  const stateData = getStateData(stateSlug);

  const baseTitle = qualified
    ? `${facts!.attorneyCount} Attorneys in ${city.name}, ${state.name}`
    : `Attorneys in ${city.name}, ${state.name} (Pop ${(city.population || 0).toLocaleString()})`;
  const description = generateCityDescription({
    cityName: city.name,
    stateName: state.name,
    stateSlug,
    citySlug,
    population: city.population || 0,
    county: city.county,
    attorneyCount: facts?.attorneyCount || 0,
    topPracticeArea: facts?.topPracticeAreas[0]?.name,
    avgRating: facts?.avgRating,
    avgYears: facts?.avgExperienceYears,
    solYears: stateData?.injurySolYears ?? 2,
    qualified,
  });

  return {
    title: baseTitle,
    description,
    alternates: { canonical: `/attorneys/${stateSlug}/${citySlug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: baseTitle,
      description,
      url: `https://attorneyaitools.org/attorneys/${stateSlug}/${citySlug}`,
      type: "website",
    },
  };
}

// Find the N nearest cities (by population proxy) within the same state that
// have verified attorneys. Used as the "search-help" block on unqualified pages.
function getNearbyQualifiedCities(stateSlug: string, citySlug: string, limit = 6) {
  const cities = getAllCities();
  const me = cities.find((c) => c.state_slug === stateSlug && c.slug === citySlug);
  if (!me) return [];
  const inState = cities
    .filter((c) => c.state_slug === stateSlug && c.slug !== citySlug)
    .filter((c) => isQualifiedCity(stateSlug, c.slug));
  // Sort by absolute population distance to "me" — proxies for similarity.
  return inState
    .sort((a, b) => Math.abs((a.population || 0) - (me.population || 0)) - Math.abs((b.population || 0) - (me.population || 0)))
    .slice(0, limit);
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

  const facts = getCityFacts(stateSlug, citySlug);
  const qualified = !!facts && facts.attorneyCount >= MIN_ATTORNEYS_FOR_INDEX;
  const stateData = getStateData(stateSlug);
  const sol = stateData?.injurySolYears ?? 2;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: state.name, href: `/attorneys/${stateSlug}` },
    { label: city.name },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Attorneys", url: "/attorneys" },
    { name: state.name, url: `/attorneys/${stateSlug}` },
    { name: city.name, url: `/attorneys/${stateSlug}/${citySlug}` },
  ]);

  // ────────────────────────────────────────────────────────────────────────
  // Branch A: city has 3+ verified attorneys → rich attorney-driven template
  // ────────────────────────────────────────────────────────────────────────
  if (qualified && facts) {
    const introIdx = hashIndex(`${stateSlug}-${citySlug}`, INTRO_VARIANTS_QUALIFIED.length);
    const intro = INTRO_VARIANTS_QUALIFIED[introIdx](city.name, state.name, facts.attorneyCount);

    const itemListSchema = generateItemListSchema(
      `Attorneys in ${city.name}, ${state.name}`,
      facts.topAttorneysByRating.map((a) => ({
        name: a.name,
        url: `/attorneys/${stateSlug}/${citySlug}/${a.slug}`,
      }))
    );

    const topPa = facts.topPracticeAreas[0]?.name || "personal injury";
    const faqMarkdown = `## Frequently Asked Questions

**How many attorneys serve ${city.name}, ${state.name}?**
Our directory currently lists ${facts.attorneyCount} attorneys with offices in or near ${city.name}, ${state.name}. The most common practice area among local lawyers is ${topPa.toLowerCase()}.

**What is the personal injury statute of limitations in ${state.name}?**
${state.name} generally allows ${sol} year${sol === 1 ? "" : "s"} from the date of injury to file a personal injury lawsuit. Exceptions exist for minors, government claims, and discovery-rule cases — consult a ${city.name} attorney early.

**How do I verify an attorney's license in ${state.name}?**
You can check any attorney's bar status, disciplinary history, and contact information through the ${stateData?.bar.name || `${state.name} state bar`}. We recommend verifying every lawyer before retaining them.

**What is the population of ${city.name}, ${state.name}?**
${city.name} has a 2020 Census population of approximately ${city.population?.toLocaleString() || "—"}, located in ${city.county || `${state.name}`}.

**What is the average years of experience for attorneys in ${city.name}?**
Attorneys featured in our ${city.name} directory have an average of ${Math.round(facts.avgExperienceYears)} years of legal practice. Average client rating is ${facts.avgRating.toFixed(1)} out of 5 across the ${facts.attorneyCount} listed lawyers.

**Are these attorneys licensed in ${state.name}?**
Yes — all attorneys featured for ${city.name} are licensed members of the ${state.name} bar. ${stateData?.notableLegalContext || ""}`;

    const faqSchema = generateFAQPageSchema(faqMarkdown);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-10 mt-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
              {state.name} Attorney Directory
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
              Attorneys in {city.name}, {state.name}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{intro}</p>
            {city.county && (
              <p className="mt-3 text-sm text-slate-500">
                {city.county} · 2020 population: {city.population?.toLocaleString() || "—"}
              </p>
            )}
          </header>

          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-3xl font-black text-slate-900">{facts.attorneyCount}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Listed Attorneys</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-3xl font-black text-slate-900">
                {facts.avgRating.toFixed(1)}<span className="text-sm text-slate-500">/5</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Average Rating</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-3xl font-black text-slate-900">{Math.round(facts.avgExperienceYears)}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Avg Years Experience</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-xl font-black text-slate-900 truncate">{facts.topPracticeAreas[0]?.name || "—"}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Top Practice Area</p>
            </div>
          </section>

          {facts.topPracticeAreas.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Practice areas in {city.name}</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Of the {facts.attorneyCount} attorneys featured in {city.name}, {state.name}, the most represented practice areas are:
              </p>
              <div className="flex flex-wrap gap-3">
                {facts.topPracticeAreas.map((pa) => (
                  <span key={pa.name} className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-sm font-medium border border-slate-200">
                    {pa.name} <span className="text-slate-500">· {pa.count}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Top-rated attorneys in {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facts.topAttorneysByRating.map((attorney) => (
                <AttorneyCard key={attorney.slug} attorney={attorney} />
              ))}
            </div>
          </section>

          {stateData && (
            <section className="mb-16 bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Legal context for {city.name} clients</h2>
              <p className="text-slate-700 leading-relaxed mb-4">{stateData.notableLegalContext}</p>
              <p className="text-slate-700 leading-relaxed mb-6">
                The personal-injury statute of limitations in {state.name} is{" "}
                <strong>{sol} year{sol === 1 ? "" : "s"}</strong> from the date of injury, so {city.name} residents should consult an attorney as soon as possible after an accident.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>
                  <strong className="text-slate-900">Bar association:</strong>{" "}
                  <a href={stateData.bar.url} rel="noopener noreferrer nofollow" target="_blank" className="text-emerald-600 hover:underline">
                    {stateData.bar.name}
                  </a>
                </li>
                <li>
                  <strong className="text-slate-900">Court system:</strong>{" "}
                  <a href={stateData.courts.url} rel="noopener noreferrer nofollow" target="_blank" className="text-emerald-600 hover:underline">
                    {stateData.courts.name}
                  </a>
                </li>
                {city.county && (
                  <li>
                    <strong className="text-slate-900">County:</strong> {city.county}
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>
      </>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // Branch B: city has Census data but no verified attorneys → unique-facts
  // template that uses population, county, state legal context, nearest
  // qualified cities, and a per-city FAQ. Still indexable, still defensible.
  // ────────────────────────────────────────────────────────────────────────
  const introIdx = hashIndex(`${stateSlug}-${citySlug}`, INTRO_VARIANTS_UNQUALIFIED.length);
  const pop = city.population || 0;
  const intro = INTRO_VARIANTS_UNQUALIFIED[introIdx](city.name, state.name, pop);
  const nearby = getNearbyQualifiedCities(stateSlug, citySlug, 8);

  // Population context band
  const popBand =
    pop >= 250000 ? "major metropolitan area" :
    pop >= 50000 ? "mid-size city" :
    pop >= 10000 ? "small city" :
    pop >= 2500 ? "town" : "village";

  const faqMarkdown = `## Frequently Asked Questions

**What is the population of ${city.name}, ${state.name}?**
According to the 2020 U.S. Census, ${city.name} has a population of approximately ${pop.toLocaleString()}, classifying it as a ${popBand}${city.county ? ` in ${city.county}` : ""}.

**Are there attorneys in ${city.name}, ${state.name}?**
${city.name} has not yet been added to our verified attorney roster. ${nearby.length > 0 ? `The closest ${state.name} cities where we list verified attorneys include ${nearby.slice(0, 3).map((c) => c.name).join(", ")}.` : `We are actively adding attorneys across ${state.name}.`} You can also use the ${stateData?.bar.name || `${state.name} state bar`} attorney lookup directly.

**What is the personal injury statute of limitations in ${state.name}?**
${state.name} generally allows ${sol} year${sol === 1 ? "" : "s"} from the date of injury to file a personal injury lawsuit. Exceptions exist for minors, government claims, and discovery-rule cases.

**How do I verify a ${state.name} attorney's license?**
You can check any attorney's bar status, disciplinary history, and contact information through the ${stateData?.bar.name || `${state.name} state bar`}. ${stateData?.notableLegalContext || ""}

**Which county is ${city.name} in?**
${city.county ? `${city.name} is located in ${city.county}, ${state.name}.` : `${city.name} is in ${state.name}.`}`;

  const faqSchema = generateFAQPageSchema(faqMarkdown);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 mt-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase mb-4">
            {state.name} Legal Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
            Attorneys in {city.name}, {state.name}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{intro}</p>
        </header>

        {/* By the numbers — unique data per city from real Census data */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{pop.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">2020 Population</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-xl font-black text-slate-900 truncate">{city.county || state.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">County</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-xl font-black text-slate-900 capitalize">{popBand}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Place Type</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{sol}<span className="text-sm text-slate-500"> yr</span></p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Injury SOL</p>
          </div>
        </section>

        {/* State legal context */}
        {stateData && (
          <section className="mb-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              {state.name} legal context for {city.name} residents
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">{stateData.notableLegalContext}</p>
            <p className="text-slate-700 leading-relaxed mb-6">
              The personal-injury statute of limitations in {state.name} is{" "}
              <strong>{sol} year{sol === 1 ? "" : "s"}</strong> from the date of injury — one of the most important deadlines for {city.name} residents to be aware of.
            </p>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>
                <strong className="text-slate-900">Bar association:</strong>{" "}
                <a href={stateData.bar.url} rel="noopener noreferrer nofollow" target="_blank" className="text-emerald-600 hover:underline">
                  {stateData.bar.name}
                </a>
              </li>
              <li>
                <strong className="text-slate-900">Court system:</strong>{" "}
                <a href={stateData.courts.url} rel="noopener noreferrer nofollow" target="_blank" className="text-emerald-600 hover:underline">
                  {stateData.courts.name}
                </a>
              </li>
              {city.county && (
                <li>
                  <strong className="text-slate-900">County:</strong> {city.county}
                </li>
              )}
              <li>
                <strong className="text-slate-900">Largest counties in {state.name}:</strong>{" "}
                {stateData.largestCounties.join(", ")}
              </li>
            </ul>
          </section>
        )}

        {/* Nearby cities with verified attorneys */}
        {nearby.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Closest {state.name} cities with verified attorneys
            </h2>
            <p className="text-slate-600 mb-6 max-w-3xl">
              While we build out our {city.name} attorney roster, these nearby {state.name} cities have verified
              attorney listings ranked by client rating and years of experience.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/attorneys/${stateSlug}/${c.slug}`}
                  className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm hover:border-emerald-500/40 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Pop {(c.population || 0).toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ — unique per city */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">What is the population of {city.name}, {state.name}?</h3>
              <p className="text-slate-600 leading-relaxed">
                According to the 2020 U.S. Census, {city.name} has a population of approximately {pop.toLocaleString()},
                classifying it as a {popBand}{city.county ? ` in ${city.county}` : ""}.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Are there attorneys in {city.name}, {state.name}?</h3>
              <p className="text-slate-600 leading-relaxed">
                {city.name} has not yet been added to our verified attorney roster.{" "}
                {nearby.length > 0
                  ? `The closest ${state.name} cities where we list verified attorneys include ${nearby
                      .slice(0, 3)
                      .map((c) => c.name)
                      .join(", ")}.`
                  : `We are actively adding attorneys across ${state.name}.`}{" "}
                You can also use the {stateData?.bar.name || `${state.name} state bar`} attorney lookup directly.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                What is the personal injury statute of limitations in {state.name}?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {state.name} generally allows {sol} year{sol === 1 ? "" : "s"} from the date of injury to file a personal
                injury lawsuit. Exceptions exist for minors, government claims, and discovery-rule cases.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Which county is {city.name} in?</h3>
              <p className="text-slate-600 leading-relaxed">
                {city.county
                  ? `${city.name} is located in ${city.county}, ${state.name}.`
                  : `${city.name} is in ${state.name}.`}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">How do I verify a {state.name} attorney&apos;s license?</h3>
              <p className="text-slate-600 leading-relaxed">
                Check any attorney&apos;s bar status, disciplinary history, and contact information through the{" "}
                {stateData?.bar.name || `${state.name} state bar`}.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
