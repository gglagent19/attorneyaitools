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
      <section className="relative overflow-hidden bg-[#f6f3ee]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#1a2a4a] flex items-center justify-center text-white font-black text-2xl" aria-hidden="true">
                  {tool.name.charAt(0)}
                </div>
                <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c]">
                  {tool.category}
                </span>
              </div>

              <h1 className="serif-ed text-5xl lg:text-6xl text-[#14181f] mb-6 leading-[0.95]">
                {tool.name}
              </h1>

              <p className="text-2xl text-[#5b6472] font-light leading-relaxed mb-10 max-w-2xl">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a2a4a] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#12203d]"
                >
                  Try {tool.name}
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  href="/ai-tools"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d4cebf] bg-transparent px-6 py-3 font-semibold text-[#2a3140] hover:bg-[#eeeae2]"
                >
                  Explore Alternatives
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-[#1a2a4a]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12rem] font-black text-white/20 tracking-tighter">
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 bg-white border border-[#e2ddd3] rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0f7d6c] text-3xl">
                      star
                    </span>
                    <div>
                      <div className="text-2xl font-black text-[#14181f] tracking-tight">
                        {tool.rating}/5
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#8a93a1]">
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
      <section className="bg-[#eeeae2] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
                Deep Dive
              </span>
              <h3 className="serif-ed text-4xl lg:text-5xl text-[#14181f] mb-8 leading-tight">
                The Future of {tool.category}
              </h3>
              <div className="space-y-5 text-lg text-[#5b6472] font-light leading-relaxed">
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
              <p className="mt-6 text-xs uppercase tracking-widest text-[#8a93a1] font-bold">
                Last verified: <time dateTime={lastVerified}>{lastVerified}</time> · Editorial review by AttorneyAITools
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {deepDiveFeatures.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-8 border border-[#e2ddd3] hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#d9ece7] flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-[#0f7d6c] text-2xl">
                      {f.icon}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-[#14181f] tracking-tight mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-[#5b6472] leading-relaxed">
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
        <section className="bg-[#f6f3ee] py-24 border-b border-[#e2ddd3]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Editorial Review
            </span>
            <h2 className="serif-ed text-4xl lg:text-5xl text-[#14181f] mb-10 leading-tight">
              In-Depth: {tool.name}
            </h2>
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-a:text-[#0f7d6c] prose-table:text-sm prose-th:bg-[#eeeae2]"
              dangerouslySetInnerHTML={{ __html: tool.htmlContent }}
            />
          </div>
        </section>
      )}

      {/* Section 3 - Use Cases */}
      <section className="py-24 bg-[#eeeae2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Applied Intelligence
            </span>
            <h3 className="serif-ed text-4xl lg:text-5xl text-[#14181f] leading-tight">
              Practical Use Cases
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-10 border border-[#e2ddd3] hover:-translate-y-1 transition-transform"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1a2a4a] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white text-2xl">
                    {useCaseIcons[i % useCaseIcons.length]}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-[#14181f] tracking-tight mb-3">
                  {uc}
                </h4>
                <p className="text-[#5b6472] leading-relaxed">
                  Purpose-built workflows that measurably reduce friction and
                  elevate the quality of legal output across your practice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Pros & Cons */}
      <section className="py-24 bg-[#f6f3ee]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Balanced Assessment
            </span>
            <h3 className="serif-ed text-4xl lg:text-5xl text-[#14181f] leading-tight">
              Pros and Trade-offs
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 border border-[#e2ddd3]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#d9ece7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0f7d6c] text-2xl">
                    check_circle
                  </span>
                </div>
                <h4 className="text-2xl font-semibold text-[#14181f] tracking-tight">
                  Advantages
                </h4>
              </div>
              <ul className="space-y-4">
                {pros.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0f7d6c] text-xl mt-0.5">
                      check
                    </span>
                    <span className="text-[#5b6472] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-[#e2ddd3]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#eeeae2] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#8a93a1] text-2xl">
                    cancel
                  </span>
                </div>
                <h4 className="text-2xl font-semibold text-[#14181f] tracking-tight">
                  Trade-offs
                </h4>
              </div>
              <ul className="space-y-4">
                {cons.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#8a93a1] text-xl mt-0.5">
                      remove
                    </span>
                    <span className="text-[#5b6472] leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Pricing */}
      <section className="py-24 bg-[#eeeae2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Investment
            </span>
            <h3 className="serif-ed text-4xl lg:text-5xl text-[#14181f] leading-tight">
              Pricing Tiers
            </h3>
            <p className="text-lg text-[#8a93a1] mt-4">
              Current plan: <span className="font-semibold text-[#14181f]">{tool.pricing}</span>
            </p>
          </div>

          <div className="border border-[#d4cebf] rounded-[2.5rem] p-6 bg-[#f6f3ee]">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-10 border border-[#e2ddd3]">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a93a1] mb-3">
                  Professional
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter text-[#14181f]">
                    $199
                  </span>
                  <span className="text-[#8a93a1] font-medium">/mo</span>
                </div>
                <p className="text-sm text-[#5b6472] mb-6">
                  For solo attorneys and boutique practices getting started.
                </p>
                <ul className="space-y-3 text-sm text-[#5b6472]">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Core features</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Single user</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Email support</li>
                </ul>
              </div>

              <div className="bg-[#1a2a4a] rounded-2xl p-10 text-white relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f7d6c] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9ece7] mb-3">
                  Growth
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter">$499</span>
                  <span className="text-white/70 font-medium">/mo</span>
                </div>
                <p className="text-sm text-white/70 mb-6">
                  For growing firms that need collaboration and scale.
                </p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#d9ece7] text-base">check</span>Everything in Professional</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#d9ece7] text-base">check</span>Up to 10 seats</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#d9ece7] text-base">check</span>Priority support</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#d9ece7] text-base">check</span>Advanced integrations</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-10 border border-[#e2ddd3]">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a93a1] mb-3">
                  Enterprise
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black tracking-tighter text-[#14181f]">
                    Custom
                  </span>
                </div>
                <p className="text-sm text-[#5b6472] mb-6">
                  For AmLaw firms and legal departments with bespoke needs.
                </p>
                <ul className="space-y-3 text-sm text-[#5b6472]">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Unlimited seats</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Dedicated CSM</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>Custom SLAs</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-[#0f7d6c] text-base">check</span>On-prem options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Alternatives */}
      <section className="bg-[#f6f3ee] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Compare
            </span>
            <h2 className="serif-ed text-4xl lg:text-5xl text-[#14181f] leading-tight">
              Similar Tools
            </h2>
          </div>

          {similarTools.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {similarTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/ai-tools/${t.slug}`}
                  className="group bg-white rounded-2xl p-8 border border-[#e2ddd3] hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1a2a4a] flex items-center justify-center text-white font-black" aria-hidden="true">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#14181f] tracking-tight group-hover:text-[#0f7d6c] transition-colors">
                        {t.name}
                      </h4>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#8a93a1]">
                        {t.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#5b6472] leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#8a93a1]">No similar tools available.</p>
          )}
        </div>
      </section>

      {/* Section 7 - Affiliate CTA */}
      <section className="py-20 bg-[#eeeae2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#1a2a4a] rounded-[3rem] px-8 py-20 lg:py-24 text-center relative overflow-hidden">
            <div className="relative">
              <h2 className="serif-ed text-4xl lg:text-6xl text-white mb-6 leading-[0.95] max-w-3xl mx-auto">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-white/70 font-light mb-10 max-w-2xl mx-auto">
                Join thousands of attorneys using {tool.name} to reclaim their
                time and elevate their work.
              </p>
              <Link
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg bg-[#0f7d6c] hover:bg-[#0c6657] px-8 py-4 text-white font-semibold text-lg transition-colors"
              >
                Get {tool.name}
                <span className="material-symbols-outlined">arrow_outward</span>
              </Link>
              <p className="text-sm text-white/60 mt-6">
                Exclusive partner discount available through AttorneyAI Tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
