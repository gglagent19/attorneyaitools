import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPracticeAreas, getPracticeAreaBySlug } from "@/lib/vault";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateFAQPageSchema,
  generatePracticeAreaDescription,
} from "@/lib/seo";
import { getPracticeAreaFacts } from "@/lib/city-facts";
import { getPracticeAreaData } from "@/lib/practice-area-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";

export async function generateStaticParams() {
  return getAllPracticeAreas().map((a) => ({ practice: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ practice: string }>;
}): Promise<Metadata> {
  const { practice } = await params;
  const area = getPracticeAreaBySlug(practice);
  if (!area) return { title: "Practice Area Not Found" };
  const facts = getPracticeAreaFacts(practice);
  const data = getPracticeAreaData(practice);
  const description = generatePracticeAreaDescription({
    areaName: area.name,
    practiceSlug: practice,
    attorneyCount: facts.attorneyCount,
    topStateName: facts.topStates[0]?.stateName,
    topCityName: facts.topCities[0]?.cityName,
    avgYears: facts.avgExperienceYears,
    shortDef: data.shortDef,
  });
  return {
    title: `${area.name} Lawyers - ${facts.attorneyCount}+ Attorneys`,
    description,
    alternates: { canonical: `/practice-areas/${practice}` },
    openGraph: {
      title: `${area.name} Lawyers - ${facts.attorneyCount}+ Attorneys`,
      description,
      url: `https://attorneyaitools.org/practice-areas/${practice}`,
      type: "website",
    },
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ practice: string }>;
}) {
  const { practice } = await params;
  const area = getPracticeAreaBySlug(practice);
  if (!area) notFound();

  const facts = getPracticeAreaFacts(practice);
  const data = getPracticeAreaData(practice);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: area.name },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Attorneys", url: "/attorneys" },
    { name: area.name, url: `/practice-areas/${practice}` },
  ]);

  const cityListSchema = generateItemListSchema(
    `Top cities for ${area.name} lawyers`,
    facts.topCities.map((c) => ({
      name: `${c.cityName}, ${c.stateName}`,
      url: `/attorneys/${c.stateSlug}/${c.citySlug}`,
    }))
  );

  const faqMarkdown = `## Frequently Asked Questions

**What does a ${area.name.toLowerCase()} lawyer do?**
${data.shortDef}

**When should I hire a ${area.name.toLowerCase()} lawyer?**
${data.whenToHire}

**How much does a ${area.name.toLowerCase()} lawyer cost?**
${data.typicalFees}

${data.faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}

**How many ${area.name.toLowerCase()} attorneys are in this directory?**
Our directory features ${facts.attorneyCount} attorneys who include ${area.name.toLowerCase()} as a practice area, with an average client rating of ${facts.avgRating.toFixed(1)} out of 5 and an average ${Math.round(facts.avgExperienceYears)} years of legal experience.`;

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
            Practice Area
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
            {area.name} Lawyers
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {data.shortDef}
          </p>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{facts.attorneyCount}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">
              {area.name} Attorneys
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{facts.topStates.length}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">States Covered</p>
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

        {/* What they handle */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
            What {area.name.toLowerCase()} lawyers handle
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {data.whatTheyHandle.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-emerald-600 font-black mt-0.5">→</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* When to hire + fees */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-black text-slate-900 mb-3 tracking-tight">When to hire</h2>
            <p className="text-slate-700 leading-relaxed">{data.whenToHire}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Typical fees</h2>
            <p className="text-slate-700 leading-relaxed">{data.typicalFees}</p>
          </div>
        </section>

        {/* Top cities */}
        {facts.topCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Top cities for {area.name.toLowerCase()} lawyers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {facts.topCities.map((c) => (
                <Link
                  key={`${c.stateSlug}-${c.citySlug}`}
                  href={`/attorneys/${c.stateSlug}/${c.citySlug}`}
                  className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm hover:border-emerald-500/40 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <div className="font-bold text-slate-900">{c.cityName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {c.stateName} · {c.count} attorneys
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Top states */}
        {facts.topStates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              {area.name} attorneys by state
            </h2>
            <div className="flex flex-wrap gap-3">
              {facts.topStates.map((s) => (
                <Link
                  key={s.stateSlug}
                  href={`/attorneys/${s.stateSlug}`}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-emerald-500/40 hover:text-emerald-600 transition-all"
                >
                  {s.stateName} <span className="text-slate-500">· {s.count}</span>
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
              <h3 className="font-bold text-slate-900 mb-1">
                What does a {area.name.toLowerCase()} lawyer do?
              </h3>
              <p className="text-slate-600 leading-relaxed">{data.shortDef}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                When should I hire a {area.name.toLowerCase()} lawyer?
              </h3>
              <p className="text-slate-600 leading-relaxed">{data.whenToHire}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                How much does a {area.name.toLowerCase()} lawyer cost?
              </h3>
              <p className="text-slate-600 leading-relaxed">{data.typicalFees}</p>
            </div>
            {data.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-slate-900 mb-1">{f.q}</h3>
                <p className="text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
