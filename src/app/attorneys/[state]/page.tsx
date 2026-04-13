import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates, getStateBySlug } from "@/lib/vault";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateFAQPageSchema,
} from "@/lib/seo";
import { getStateFacts, getAllQualifiedCityKeys } from "@/lib/city-facts";
import { getStateData } from "@/lib/state-data";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  return getAllStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return { title: "State Not Found" };
  const facts = getStateFacts(stateSlug);
  return {
    title: `${facts.attorneyCount}+ Attorneys in ${state.name}`,
    description: `Browse ${facts.attorneyCount}+ attorneys across ${facts.qualifiedCityCount} ${state.name} cities. Find lawyers by practice area, average rating, and years of experience.`,
    alternates: { canonical: `/attorneys/${stateSlug}` },
    openGraph: {
      title: `${facts.attorneyCount}+ Attorneys in ${state.name}`,
      description: `Browse top-rated lawyers across ${state.name}.`,
      url: `https://attorneyaitools.org/attorneys/${stateSlug}`,
      type: "website",
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const facts = getStateFacts(stateSlug);
  const stateData = getStateData(stateSlug);

  const qualifiedCities = getAllQualifiedCityKeys()
    .filter((k) => k.state === stateSlug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: state.name },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Attorneys", url: "/attorneys" },
    { name: state.name, url: `/attorneys/${stateSlug}` },
  ]);

  const cityListSchema = generateItemListSchema(
    `Cities with attorneys in ${state.name}`,
    facts.topCities.slice(0, 24).map((c) => ({
      name: c.cityName,
      url: `/attorneys/${stateSlug}/${c.citySlug}`,
    }))
  );

  const sol = stateData?.injurySolYears ?? 2;

  const faqMarkdown = `## Frequently Asked Questions

**How many attorneys are listed in ${state.name}?**
Our directory currently lists ${facts.attorneyCount} attorneys across ${facts.qualifiedCityCount} ${state.name} cities, covering ${facts.topPracticeAreas.length} practice areas. The most represented practice area is ${facts.topPracticeAreas[0]?.name || "personal injury"}.

**What is the personal injury statute of limitations in ${state.name}?**
${state.name} generally allows ${sol} year${sol === 1 ? "" : "s"} from the date of injury to file a personal injury lawsuit. Exceptions exist for minors, government claims, and discovery-rule cases — consult a ${state.name} attorney early in your case.

**How do I verify a ${state.name} attorney's license?**
You can check any ${state.name} attorney's bar status, disciplinary history, and contact information through the ${stateData?.bar.name || `${state.name} state bar`}. We recommend verifying every lawyer before retaining them.

**What is the average rating and experience of ${state.name} attorneys in this directory?**
Attorneys featured for ${state.name} have an average client rating of ${facts.avgRating.toFixed(1)} out of 5 and an average of ${Math.round(facts.avgExperienceYears)} years of legal practice.

**Which ${state.name} cities have the most attorneys in our directory?**
The top cities by listed attorney count are ${facts.topCities.slice(0, 5).map((c) => c.cityName).join(", ")}. Each city has its own page with practice-area breakdowns and top-rated attorneys.

**Does ${state.name} have any unique legal rules I should know about?**
${stateData?.notableLegalContext || `${state.name} follows standard U.S. legal procedures.`}`;

  const faqSchema = generateFAQPageSchema(faqMarkdown);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-4 mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
            State Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
            Attorneys in {state.name}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Browse {facts.attorneyCount.toLocaleString()} attorneys across{" "}
            {facts.qualifiedCityCount} {state.name} cities. Filter by practice
            area, find the closest city to you, and read profiles for licensed
            {" "}{stateData?.bar.name || `${state.name} bar`} members.
          </p>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{facts.attorneyCount}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Listed Attorneys</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{facts.qualifiedCityCount}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Cities Covered</p>
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
        </section>

        {/* State legal context */}
        {stateData && (
          <section className="mb-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Legal context in {state.name}
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">{stateData.notableLegalContext}</p>
            <p className="text-slate-700 leading-relaxed mb-6">
              The personal-injury statute of limitations in {state.name} is{" "}
              <strong>
                {sol} year{sol === 1 ? "" : "s"}
              </strong>{" "}
              from the date of injury, which is one of the most important
              deadlines for residents to know.
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
              <li>
                <strong className="text-slate-900">Largest counties:</strong>{" "}
                {stateData.largestCounties.join(", ")}
              </li>
            </ul>
          </section>
        )}

        {/* Practice area breakdown */}
        {facts.topPracticeAreas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Practice areas in {state.name}
            </h2>
            <p className="text-slate-600 mb-6 max-w-3xl">
              Of the {facts.attorneyCount} attorneys featured in {state.name},
              the most represented practice areas are:
            </p>
            <div className="flex flex-wrap gap-3">
              {facts.topPracticeAreas.map((pa) => (
                <span
                  key={pa.name}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-sm font-medium border border-slate-200"
                >
                  {pa.name} <span className="text-slate-500">· {pa.count}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Cities */}
        {qualifiedCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Browse {state.name} cities ({qualifiedCities.length})
            </h2>
            <p className="text-slate-600 mb-6 max-w-3xl">
              Each city page lists the attorneys serving that area, the most
              common practice areas locally, and city-specific FAQs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {facts.topCities.map((c) => (
                <Link
                  key={c.citySlug}
                  href={`/attorneys/${stateSlug}/${c.citySlug}`}
                  className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-emerald-500/40 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <div className="font-bold">{c.cityName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.count} attorneys</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">How many attorneys are listed in {state.name}?</h3>
              <p className="text-slate-600 leading-relaxed">
                Our directory currently lists {facts.attorneyCount} attorneys across {facts.qualifiedCityCount}{" "}
                {state.name} cities, covering {facts.topPracticeAreas.length} practice areas. The most represented
                practice area is {(facts.topPracticeAreas[0]?.name || "personal injury").toLowerCase()}.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                What is the personal injury statute of limitations in {state.name}?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {state.name} generally allows {sol} year{sol === 1 ? "" : "s"} from the date of injury to file a
                personal injury lawsuit. Exceptions exist for minors, government claims, and discovery-rule cases.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">How do I verify a {state.name} attorney&apos;s license?</h3>
              <p className="text-slate-600 leading-relaxed">
                Check any {state.name} attorney&apos;s bar status, disciplinary history, and contact information through
                the {stateData?.bar.name || `${state.name} state bar`}. We recommend verifying every lawyer before
                retaining them.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                Does {state.name} have unique legal rules I should know about?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {stateData?.notableLegalContext || `${state.name} follows standard U.S. legal procedures.`}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
