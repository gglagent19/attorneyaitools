import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AttorneyCard from "@/components/AttorneyCard";
import { getAllTools, getAllAttorneys, getAllStates, getAllPracticeAreas, getStats } from "@/lib/vault";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo";

export default function HomePage() {
  const tools = getAllTools();
  const attorneys = getAllAttorneys();
  const states = getAllStates();
  const practiceAreas = getAllPracticeAreas();
  const stats = getStats();
  const websiteSchema = generateWebsiteSchema();
  const orgSchema = generateOrganizationSchema();

  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);
  const featuredAttorneys = attorneys.filter((a) => a.featured).slice(0, 6);

  const displayTools = featuredTools.length >= 3 ? featuredTools : tools.slice(0, 6);
  const displayAttorneys = featuredAttorneys.length >= 3 ? featuredAttorneys : attorneys.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
              The Future of Legal Technology
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8">
              Discover the Best AI Tools for{" "}
              <span className="text-emerald-600">Attorneys</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed">
              Find AI software that helps lawyers research faster, draft smarter, and win cases. Precision-curated directory for the modern legal professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ai-tools"
                className="hero-gradient px-8 py-4 rounded-xl text-white font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-transform text-center"
              >
                Explore AI Tools
              </Link>
              <Link
                href="/attorneys"
                className="px-8 py-4 rounded-xl bg-slate-100 text-slate-900 font-bold text-lg hover:bg-slate-200 transition-colors text-center"
              >
                Find Attorneys
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-[0_32px_64px_-12px_rgba(15,23,42,0.1)] border border-slate-100 floating-card">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="font-bold mb-1 text-slate-900">Contract Analysis</h3>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-[0_32px_64px_-12px_rgba(15,23,42,0.1)] border border-slate-100 floating-card">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="font-bold mb-1 text-slate-900">Legal Research</h3>
                  <p className="text-xs text-slate-500">AI-powered case discovery...</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-[0_32px_64px_-12px_rgba(15,23,42,0.1)] border border-slate-100 floating-card">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  </div>
                  <h3 className="font-bold mb-1 text-slate-900">Case Strategy</h3>
                  <div className="flex gap-1 mt-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-[0_32px_64px_-12px_rgba(15,23,42,0.1)] border border-slate-100 floating-card">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <h3 className="font-bold mb-1 text-slate-900">Document Drafting</h3>
                  <p className="text-xs text-slate-500">Automated brief generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-slate-900">{stats.totalTools}+</p>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-medium">AI Tools</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900">{stats.totalAttorneys}+</p>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-medium">Attorneys</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900">{stats.totalCities.toLocaleString()}+</p>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-medium">Cities</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900">{stats.totalPracticeAreas}+</p>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-medium">Practice Areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900">Featured AI Tools</h2>
            <p className="text-slate-500 text-lg">The highest-rated solutions for legal excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/ai-tools"
              className="text-emerald-600 font-bold flex items-center gap-2 justify-center hover:gap-3 transition-all"
            >
              View All Tools
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Attorneys Search */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-white rounded-2xl p-12 shadow-[0_48px_80px_-16px_rgba(15,23,42,0.08)] border border-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">Find an AI-Enhanced Attorney</h2>
              <p className="text-lg text-slate-500 mb-10">
                Connect with legal professionals who leverage cutting-edge technology to deliver faster, more cost-effective results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/attorneys"
                  className="flex-1 text-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Browse All Attorneys
                </Link>
                <Link
                  href="/submit-attorney"
                  className="flex-1 text-center px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  List Your Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Attorneys */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900">Featured Attorneys</h2>
            <p className="text-slate-500 text-lg">Top-rated lawyers across the United States.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayAttorneys.map((attorney) => (
              <AttorneyCard key={attorney.slug} attorney={attorney} />
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900">Popular Practice Areas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {practiceAreas.slice(0, 12).map((pa) => (
              <Link
                key={pa.slug}
                href={`/practice-areas/${pa.slug}`}
                className="p-6 text-center rounded-xl bg-white border border-slate-200/50 hover:border-emerald-500/40 transition-all hover:bg-emerald-50 group"
              >
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">{pa.name}</h4>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/attorneys" className="text-emerald-600 font-bold text-sm hover:underline">
              View all {practiceAreas.length} practice areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 text-center">Browse by State</h2>
          <p className="text-slate-500 mb-12 text-center">Find attorneys in your state.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/attorneys/${state.slug}`}
                className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-emerald-500/40 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-center"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-slate-900 p-16 rounded-[3rem] text-white editorial-shadow relative overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Stay Ahead of Legal Tech</h2>
              <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto">
                Get weekly updates on the latest AI tools for attorneys delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@lawfirm.com"
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
