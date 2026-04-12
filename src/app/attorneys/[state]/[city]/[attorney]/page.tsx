import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllAttorneys,
  getAttorneyWithHtml,
  getStateBySlug,
  getCityBySlug,
} from "@/lib/vault";
import { generateAttorneySchema, generateAttorneyMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
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

  const initial = attorney.name?.charAt(0)?.toUpperCase() || "A";
  const practiceSubtitle =
    attorney.practice_areas && attorney.practice_areas.length > 0
      ? attorney.practice_areas.slice(0, 3).join(" / ")
      : "Legal Counsel";

  // Optional fields that may exist via serpapi enrichment
  const address = (attorney as unknown as { address?: string }).address;
  const reviewCount = (attorney as unknown as { review_count?: number }).review_count;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* ===== Section 1: Header Hero ===== */}
        <section className="grid lg:grid-cols-12 gap-10 pt-32">
          {/* Left: Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12rem] font-black text-white/90 leading-none tracking-tighter select-none">
                  {initial}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
              {attorney.featured && (
                <div className="absolute bottom-5 right-5">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-400 text-emerald-950 shadow-lg ring-2 ring-white/30">
                    Featured Partner
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Name + stats */}
          <div className="lg:col-span-7 lg:pt-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {attorney.name}
            </h1>
            <p className="mt-4 text-xl text-emerald-600 font-semibold">
              {practiceSubtitle}
            </p>
            <div className="mt-6 h-1.5 w-24 bg-emerald-500 rounded-full" />

            {attorney.law_firm && (
              <p className="mt-6 text-lg text-slate-600 font-medium">
                {attorney.law_firm}
              </p>
            )}

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Experience
                </p>
                <p className="mt-3 text-4xl font-black tracking-tighter text-slate-900">
                  {attorney.experience_years}
                  <span className="text-xl text-slate-500 font-semibold ml-1">
                    yrs
                  </span>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Practicing in {attorney.city}, {attorney.state}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Credentials
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900 leading-tight">
                  Juris Doctor (J.D.)
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Admitted to {attorney.state} State Bar
                </p>
                {typeof attorney.rating === "number" && (
                  <p className="mt-2 text-sm text-slate-600 font-semibold">
                    Rating: {attorney.rating.toFixed(1)} / 5.0
                    {reviewCount ? (
                      <span className="text-slate-400 font-normal">
                        {" "}
                        ({reviewCount} reviews)
                      </span>
                    ) : null}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 2: Biography + Practice Areas ===== */}
        <section className="grid lg:grid-cols-3 gap-8 mt-24">
          {/* Bio */}
          <div className="lg:col-span-2 bg-slate-100 p-10 rounded-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              01 — About
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Professional Biography
            </h2>
            <div className="mt-6 h-1 w-16 bg-emerald-500 rounded-full" />

            <div className="mt-8 space-y-5 text-slate-700 text-lg leading-relaxed">
              <p>{attorney.description}</p>
              <p>
                With over {attorney.experience_years} years of dedicated legal
                practice, {attorney.name.split(" ")[0]} has built a reputation
                for meticulous case preparation, strategic counsel, and
                unwavering advocacy on behalf of clients throughout{" "}
                {attorney.city} and the greater {attorney.state} region.
              </p>
              <p>
                Known for a client-first philosophy, the practice combines
                deep courtroom experience with modern negotiation techniques —
                delivering results on matters ranging from routine consultations
                to complex, high-stakes litigation.
              </p>
            </div>

            {attorney.htmlContent && (
              <div
                className="prose prose-slate max-w-none mt-8 prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-emerald-600"
                dangerouslySetInnerHTML={{ __html: attorney.htmlContent }}
              />
            )}
          </div>

          {/* Practice Areas */}
          <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              02 — Focus
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Practice Areas
            </h2>
            <div className="mt-6 h-1 w-16 bg-emerald-500 rounded-full" />

            {attorney.practice_areas && attorney.practice_areas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {attorney.practice_areas.map((pa) => (
                  <span
                    key={pa}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    {pa}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-slate-500 italic">
                General legal practice.
              </p>
            )}

            <blockquote className="mt-10 pt-8 border-t border-slate-200">
              <p className="italic text-slate-600 text-lg leading-relaxed">
                &ldquo;Every client deserves clarity, candor, and relentless
                advocacy. That is the standard we hold ourselves to — on every
                case, every day.&rdquo;
              </p>
              <footer className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-900">
                — {attorney.name}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ===== Ad Break ===== */}
        <div className="mt-20">
          <AdBlock format="horizontal" slot="attorney-detail-mid" />
        </div>

        {/* ===== Section 3: Office + Inquiry ===== */}
        <section className="grid lg:grid-cols-2 gap-8 mt-20">
          {/* Location */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              03 — Visit
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Office Location
            </h2>
            <div className="mt-6 h-1.5 w-24 bg-emerald-500 rounded-full" />

            {/* Map placeholder */}
            <div className="mt-8 aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-emerald-50 border border-slate-200 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 ring-8 ring-emerald-500/20 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">
                    {attorney.city}, {attorney.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Address
                  </p>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">
                  {address || `${attorney.city}, ${attorney.state}`}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Phone
                  </p>
                </div>
                {attorney.phone ? (
                  <a
                    href={`tel:${attorney.phone}`}
                    className="mt-2 block text-sm font-semibold text-slate-900 hover:text-emerald-600"
                  >
                    {attorney.phone}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">On request</p>
                )}
              </div>

              {attorney.email && (
                <div className="p-5 rounded-xl bg-white border border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Email
                  </p>
                  <a
                    href={`mailto:${attorney.email}`}
                    className="mt-2 block text-sm font-semibold text-slate-900 hover:text-emerald-600 truncate"
                  >
                    {attorney.email}
                  </a>
                </div>
              )}

              {attorney.website && (
                <div className="p-5 rounded-xl bg-white border border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Website
                  </p>
                  <a
                    href={attorney.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-semibold text-slate-900 hover:text-emerald-600 truncate"
                  >
                    {attorney.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-slate-100 p-10 rounded-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              04 — Request
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Schedule a Consultation
            </h2>
            <div className="mt-6 h-1.5 w-24 bg-emerald-500 rounded-full" />

            <p className="mt-6 text-slate-600">
              Submit the form below and {attorney.name.split(" ")[0]}&rsquo;s
              team will follow up within one business day.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Case Type
                </label>
                <select
                  name="caseType"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select a practice area</option>
                  {(attorney.practice_areas || []).map((pa) => (
                    <option key={pa} value={pa}>
                      {pa}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Brief Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Tell us briefly about your situation..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-lg"
              >
                Send Inquiry
              </button>

              <p className="text-xs text-slate-500 text-center">
                Submitting does not create an attorney-client relationship.
              </p>
            </form>
          </div>
        </section>

        <div className="mt-20">
          <AdBlock format="horizontal" slot="attorney-detail-bottom" />
        </div>
      </div>
    </>
  );
}
