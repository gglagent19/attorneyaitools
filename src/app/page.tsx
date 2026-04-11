import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AttorneyCard from "@/components/AttorneyCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdBlock from "@/components/AdBlock";
import { getAllTools, getAllAttorneys, getAllStates, getAllPracticeAreas, getStats } from "@/lib/vault";
import { generateWebsiteSchema } from "@/lib/seo";

export default function HomePage() {
  const tools = getAllTools();
  const attorneys = getAllAttorneys();
  const states = getAllStates();
  const practiceAreas = getAllPracticeAreas();
  const stats = getStats();
  const websiteSchema = generateWebsiteSchema();

  const featuredTools = tools.filter((t) => t.featured).slice(0, 6);
  const featuredAttorneys = attorneys.filter((a) => a.featured).slice(0, 6);

  // Fallback if fewer than 6 featured
  const displayTools = featuredTools.length >= 6 ? featuredTools : tools.slice(0, 6);
  const displayAttorneys = featuredAttorneys.length >= 6 ? featuredAttorneys : attorneys.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The Largest Directory of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              AI Tools for Attorneys
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Compare AI-powered legal tools, find top-rated attorneys in your city, and stay ahead with the latest in legal technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-tools"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Browse AI Tools
            </Link>
            <Link
              href="/attorneys"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-700/50 text-white font-semibold rounded-xl border border-blue-500/50 hover:bg-blue-700/70 transition-colors"
            >
              Find an Attorney
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stats.totalTools}+</p>
              <p className="text-sm text-slate-600 mt-1">AI Tools</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stats.totalAttorneys}+</p>
              <p className="text-sm text-slate-600 mt-1">Attorneys</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stats.totalStates}</p>
              <p className="text-sm text-slate-600 mt-1">States</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stats.totalPracticeAreas}+</p>
              <p className="text-sm text-slate-600 mt-1">Practice Areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured AI Tools</h2>
              <p className="text-slate-600 mt-1">Top-rated AI tools trusted by legal professionals</p>
            </div>
            <Link
              href="/ai-tools"
              className="hidden sm:inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all tools
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/ai-tools" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all tools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Attorneys */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Attorneys</h2>
              <p className="text-slate-600 mt-1">Top-rated lawyers across the United States</p>
            </div>
            <Link
              href="/attorneys"
              className="hidden sm:inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Find an attorney
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAttorneys.map((attorney) => (
              <AttorneyCard key={attorney.slug} attorney={attorney} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBlock format="horizontal" slot="homepage-mid" />
      </div>

      {/* Browse by Practice Area */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Browse by Practice Area</h2>
          <p className="text-slate-600 mb-8">Find attorneys specializing in your area of need</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {practiceAreas.map((pa) => (
              <Link
                key={pa.slug}
                href={`/practice-areas/${pa.slug}`}
                className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all text-center"
              >
                {pa.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Browse by State</h2>
          <p className="text-slate-600 mb-8">Find attorneys in your state</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/attorneys/${state.slug}`}
                className="px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all text-center"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
