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

      <div className="bg-[#f6f3ee] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-4 mb-10">
          <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
            Practice Area
          </span>
          <h1 className="serif-ed text-4xl sm:text-5xl text-[#14181f] leading-[1.05] mb-4">
            {area.name} Lawyers
          </h1>
          <p className="text-lg text-[#5b6472] leading-relaxed max-w-3xl">
            {data.shortDef}
          </p>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-xl border border-[#e2ddd3]">
            <p className="text-3xl font-black text-[#14181f]">{facts.attorneyCount}</p>
            <p className="text-xs text-[#8a93a1] mt-1 uppercase tracking-widest font-medium">
              {area.name} Attorneys
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#e2ddd3]">
            <p className="text-3xl font-black text-[#14181f]">{facts.topStates.length}</p>
            <p className="text-xs text-[#8a93a1] mt-1 uppercase tracking-widest font-medium">States Covered</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#e2ddd3]">
            <p className="text-3xl font-black text-[#14181f]">
              {facts.avgRating.toFixed(1)}<span className="text-sm text-[#8a93a1]">/5</span>
            </p>
            <p className="text-xs text-[#8a93a1] mt-1 uppercase tracking-widest font-medium">Average Rating</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#e2ddd3]">
            <p className="text-3xl font-black text-[#14181f]">{Math.round(facts.avgExperienceYears)}</p>
            <p className="text-xs text-[#8a93a1] mt-1 uppercase tracking-widest font-medium">Avg Years Experience</p>
          </div>
        </section>

        {/* What they handle */}
        <section className="mb-12">
          <h2 className="serif-ed text-2xl text-[#14181f] mb-4">
            What {area.name.toLowerCase()} lawyers handle
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {data.whatTheyHandle.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e2ddd3]">
                <span className="text-[#0f7d6c] font-black mt-0.5">→</span>
                <span className="text-[#5b6472]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* When to hire + fees */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="bg-[#eeeae2] rounded-2xl p-8 border border-[#e2ddd3]">
            <h2 className="serif-ed text-xl text-[#14181f] mb-3">When to hire</h2>
            <p className="text-[#5b6472] leading-relaxed">{data.whenToHire}</p>
          </div>
          <div className="bg-[#eeeae2] rounded-2xl p-8 border border-[#e2ddd3]">
            <h2 className="serif-ed text-xl text-[#14181f] mb-3">Typical fees</h2>
            <p className="text-[#5b6472] leading-relaxed">{data.typicalFees}</p>
          </div>
        </section>

        {/* Top cities */}
        {facts.topCities.length > 0 && (
          <section className="mb-12">
            <h2 className="serif-ed text-2xl text-[#14181f] mb-4">
              Top cities for {area.name.toLowerCase()} lawyers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {facts.topCities.map((c) => (
                <Link
                  key={`${c.stateSlug}-${c.citySlug}`}
                  href={`/attorneys/${c.stateSlug}/${c.citySlug}`}
                  className="px-4 py-3 bg-white rounded-lg border border-[#e2ddd3] text-sm hover:border-[#d4cebf] hover:text-[#0f7d6c] hover:bg-[#eeeae2] transition-all"
                >
                  <div className="font-bold text-[#14181f]">{c.cityName}</div>
                  <div className="text-xs text-[#8a93a1] mt-0.5">
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
            <h2 className="serif-ed text-2xl text-[#14181f] mb-4">
              {area.name} attorneys by state
            </h2>
            <div className="flex flex-wrap gap-3">
              {facts.topStates.map((s) => (
                <Link
                  key={s.stateSlug}
                  href={`/attorneys/${s.stateSlug}`}
                  className="px-4 py-2 rounded-full bg-white border border-[#e2ddd3] text-sm font-medium text-[#5b6472] hover:border-[#d4cebf] hover:text-[#0f7d6c] transition-all"
                >
                  {s.stateName} <span className="text-[#8a93a1]">· {s.count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="serif-ed text-2xl text-[#14181f] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-semibold text-[#14181f] mb-1">
                What does a {area.name.toLowerCase()} lawyer do?
              </h3>
              <p className="text-[#5b6472] leading-relaxed">{data.shortDef}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#14181f] mb-1">
                When should I hire a {area.name.toLowerCase()} lawyer?
              </h3>
              <p className="text-[#5b6472] leading-relaxed">{data.whenToHire}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#14181f] mb-1">
                How much does a {area.name.toLowerCase()} lawyer cost?
              </h3>
              <p className="text-[#5b6472] leading-relaxed">{data.typicalFees}</p>
            </div>
            {data.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-[#14181f] mb-1">{f.q}</h3>
                <p className="text-[#5b6472] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
