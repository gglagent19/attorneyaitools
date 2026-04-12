import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllAttorneys,
  getAttorneyWithHtml,
  getStateBySlug,
  getCityBySlug,
} from "@/lib/vault";
import { generateAttorneySchema, generateAttorneyMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import StarRating from "@/components/StarRating";
import AdBlock from "@/components/AdBlock";

// Pre-generate top 500 featured/highly-rated attorneys; the rest use ISR
export async function generateStaticParams() {
  const attorneys = getAllAttorneys();
  return attorneys.slice(0, 500).map((a) => ({
    state: a.state_slug,
    city: a.city_slug,
    attorney: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; attorney: string }>;
}): Promise<Metadata> {
  const { attorney: slug } = await params;
  const attorneys = getAllAttorneys();
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) return { title: "Attorney Not Found" };
  return generateAttorneyMeta(attorney);
}

export default async function AttorneyDetailPage({
  params,
}: {
  params: Promise<{ state: string; city: string; attorney: string }>;
}) {
  const { state: stateSlug, city: citySlug, attorney: attorneySlug } = await params;
  const attorney = await getAttorneyWithHtml(attorneySlug);
  if (!attorney) notFound();

  const state = getStateBySlug(stateSlug);
  const city = getCityBySlug(citySlug);
  if (!state || !city) notFound();

  const schema = generateAttorneySchema(attorney);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: state.name, href: `/attorneys/${stateSlug}` },
    { label: city.name, href: `/attorneys/${stateSlug}/${citySlug}` },
    { label: attorney.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                  {attorney.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {attorney.name}
                  </h1>
                  <p className="text-slate-600 mb-2">{attorney.law_firm}</p>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <StarRating rating={attorney.rating} />
                    <span className="text-sm text-slate-500">
                      {attorney.experience_years} years experience
                    </span>
                    {attorney.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600">{attorney.description}</p>
                </div>
              </div>

              {/* Practice Areas */}
              {attorney.practice_areas && attorney.practice_areas.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">
                    Practice Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {attorney.practice_areas.map((pa) => (
                      <Link
                        key={pa}
                        href={`/practice-areas/${pa.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                      >
                        {pa}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: attorney.htmlContent }}
              />
            </div>

            <div className="mt-8">
              <AdBlock format="horizontal" slot="attorney-detail-bottom" />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                Contact Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-slate-500">Location</dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {attorney.city}, {attorney.state}
                  </dd>
                </div>
                {attorney.phone && (
                  <div>
                    <dt className="text-sm text-slate-500">Phone</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      <a
                        href={`tel:${attorney.phone}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {attorney.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {attorney.email && (
                  <div>
                    <dt className="text-sm text-slate-500">Email</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      <a
                        href={`mailto:${attorney.email}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {attorney.email}
                      </a>
                    </dd>
                  </div>
                )}
                {attorney.website && (
                  <div>
                    <dt className="text-sm text-slate-500">Website</dt>
                    <dd className="text-sm font-medium truncate">
                      <a
                        href={attorney.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {attorney.website.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-slate-500">Experience</dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {attorney.experience_years} years
                  </dd>
                </div>
              </dl>
            </div>

            <AdBlock format="rectangle" slot="attorney-detail-sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
