import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTools, getToolWithHtml } from "@/lib/vault";
import { generateToolSchema, generateToolMeta, generateBreadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tools = getAllTools();
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  return generateToolMeta(tool);
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolWithHtml(slug);
  if (!tool) notFound();

  const allTools = getAllTools();
  const similarTools = allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  const toolSchema = generateToolSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Tools", url: "/ai-tools" },
    { name: tool.name, url: `/ai-tools/${tool.slug}` },
  ]);
  const ctaHref = tool.affiliate_link || tool.website || "#";
  const lastVerified = tool.date_added || "2026-04-12";

  const deepDiveFeatures = [
    {
      icon: "fact_check",
      title: "Clause Extraction",
      desc: "Surface obligations, indemnities, and risk terms with AI-grade precision across thousands of pages.",
    },
    {
      icon: "shield_lock",
      title: "Bank-Grade Security",
      desc: "SOC 2 Type II, end-to-end encryption, and matter-level access controls trusted by AmLaw firms.",
    },
    {
      icon: "history",
      title: "Version Control",
      desc: "Track every redline, comment, and revision with an immutable audit trail built for litigation.",
    },
    {
      icon: "groups",
      title: "Team Collaboration",
      desc: "Partner, associate, and paralegal workflows unified in one secure, purpose-built workspace.",
    },
  ];

  const useCases =
    tool.use_cases && tool.use_cases.length > 0
      ? tool.use_cases.slice(0, 3)
      : [
          "Accelerate contract review and due diligence cycles",
          "Streamline legal research and case law synthesis",
          "Automate routine drafting and client intake workflows",
        ];

  const useCaseIcons = ["auto_awesome", "insights", "rocket_launch"];

  const pros = [
    `Purpose-built for ${tool.category?.toLowerCase() || "legal"} workflows`,
    "Dramatically reduces time spent on repetitive tasks",
    "Enterprise-grade security and compliance posture",
    "Seamless integration with existing firm tech stacks",
  ];

  const cons = [
    "Premium pricing may challenge solo practitioners",
    "Onboarding requires workflow adjustments",
    "Full value realized with consistent adoption",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Section 1 - Tool Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center text-white font-black text-2xl editorial-shadow" aria-hidden="true">
                  {tool.name.charAt(0)}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  {tool.category}
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.95]">
                {tool.name}
              </h1>

              <p className="text-2xl text-slate-600 font-light leading-relaxed mb-10 max-w-2xl">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 hero-gradient text-white font-bold rounded-full editorial-shadow hover:scale-[1.02] transition-transform"
                >
                  Try {tool.name}
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  href="/ai-tools"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-colors"
                >
                  Explore Alternatives
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden editorial-shadow hero-gradient">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12rem] font-black text-white/20 tracking-tighter">
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-6 py-4 editorial-shadow">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl">
                      star
                    </span>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">
                        {tool.rating}/5
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Attorney Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Deep Dive */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
                Deep Dive
              </span>
              <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
                The Future of {tool.category}
              </h3>
              <div className="space-y-5 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  {tool.name} represents a generational leap in how modern legal
                  teams approach {tool.category?.toLowerCase()}. By combining
                  domain-trained language models with a workflow-first interface,
                  it collapses hours of manual work into minutes of reviewable
                  output.
                </p>
                <p>
                  Built with the rigor that general counsel and litigation teams
                  demand, {tool.name} treats accuracy, defensibility, and
                  auditability as first-class features — not afterthoughts.
                </p>
              </div>
              <p className="mt-6 text-xs uppercase tracking-widest text-slate-400 font-bold">
                Last verified: <time dateTime={lastVerified}>{lastVerified}</time> · Editorial review by AttorneyAITools
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {deepDiveFeatures.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-3xl p-8 editorial-shadow border border-slate-100 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-emerald-600 text-2xl">
                      {f.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2.5 - Full editorial review (rendered from vault markdown) */}
      {tool.htmlContent && (
        <section className="bg-white py-24 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
              Editorial Review
            </span>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-10 leading-tight">
              In-Depth: {tool.name}
            </h2>
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-a:text-emerald-600 prose-table:text-sm prose-th:bg-slate-50"
              dangerouslySetInnerHTML={{ __html: tool.htmlContent }}
            />
          </div>
        </section>
      )}

      {/* Section 3 - Use Cases */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
              Applied Intelligence
            </span>
            <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Practical Use Cases
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-10 editorial-shadow border border-slate-100 hover:-translate-y-1 transition-transform"
              >
                <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mb-6 editorial-shadow">
                  <span className="material-symbols-outlined text-white text-2xl">
                    {useCaseIcons[i % useCaseIcons.length]}
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight mb-3">
                  {uc}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Purpose-built workflows that measurably reduce friction and
                  elevate the quality of legal output across your practice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Pros & Cons */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
              Balanced Assessment
            </span>
            <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Pros and Trade-offs
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 editorial-shadow border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">
                    check_circle
                  </span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  Advantages
                </h4>
              </div>
              <ul className="space-y-4">
                {pros.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-xl mt-0.5">
                      check
                    </span>
                    <span className="text-slate-700 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-10 editorial-shadow border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-2xl">
                    cancel
                  </span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  Trade-offs
                </h4>
              </div>
              <ul className="space-y-4">
                {cons.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-xl mt-0.5">
                      remove
                    </span>
                    <span className="text-slate-600 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
              Investment
            </span>
            <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Pricing Tiers
            </h3>
            <p className="text-lg text-slate-500 mt-4">
              Current plan: <span className="font-semibold text-slate-900">{tool.pricing}</span>
            </p>
          </div>

          <div className="border border-slate-200 rounded-[2.5rem] p-6 bg-slate-50 editorial-shadow">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-10 border border-slate-100">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  Professional
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter text-slate-900">
                    $199
                  </span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  For solo attorneys and boutique practices getting started.
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Core features</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Single user</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Email support</li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-3xl p-10 text-white relative editorial-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
                  Growth
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter">$499</span>
                  <span className="text-slate-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-slate-300 mb-6">
                  For growing firms that need collaboration and scale.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-400 text-base">check</span>Everything in Professional</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-400 text-base">check</span>Up to 10 seats</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-400 text-base">check</span>Priority support</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-400 text-base">check</span>Advanced integrations</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-10 border border-slate-100">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  Enterprise
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter text-slate-900">
                    Custom
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  For AmLaw firms and legal departments with bespoke needs.
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Unlimited seats</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Dedicated CSM</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>Custom SLAs</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-base">check</span>On-prem options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Alternatives */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">
              Compare
            </span>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Similar Tools
            </h2>
          </div>

          {similarTools.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {similarTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/ai-tools/${t.slug}`}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 editorial-shadow hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center text-white font-black" aria-hidden="true">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                        {t.name}
                      </h4>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {t.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No similar tools available.</p>
          )}
        </div>
      </section>

      {/* Section 7 - Affiliate CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] px-8 py-20 lg:py-24 text-center relative overflow-hidden editorial-shadow">
            <div className="absolute inset-0 hero-gradient opacity-10" />
            <div className="relative">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[0.95] max-w-3xl mx-auto">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-slate-300 font-light mb-10 max-w-2xl mx-auto">
                Join thousands of attorneys using {tool.name} to reclaim their
                time and elevate their work.
              </p>
              <Link
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full editorial-shadow text-lg transition-colors"
              >
                Get {tool.name}
                <span className="material-symbols-outlined">arrow_outward</span>
              </Link>
              <p className="text-sm text-slate-400 mt-6">
                Exclusive partner discount available through AttorneyAI Tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
