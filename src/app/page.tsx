import Link from "next/link";
import type { Metadata } from "next";
import AppCTA from "@/components/AppCTA";
import CheckoutCTA from "@/components/CheckoutCTA";
import { getPlanPaymentLink } from "@/lib/payment-links";

export const metadata: Metadata = {
  title:
    "Shielded — Recover What Your Insurance Actually Owes You | Free Claim Analysis",
  description:
    "Denied or underpaid insurance claim? Shielded's AI reads your policy and the adjuster's estimate, shows what you're really owed, and drafts the rebuttal — in 90 seconds. Free analysis.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Recover What Your Insurance Actually Owes You",
    description:
      "AI that finds the gap between the adjuster's offer and what your policy owes — then drafts the rebuttal. Free 90-second analysis.",
    type: "website",
  },
};

const CLAIM_TYPES = [
  { label: "Homeowners", slug: "homeowners-insurance-claim-denied-florida" },
  { label: "Roof damage", slug: "roof-damage-insurance-claim-denied-texas" },
  { label: "Water damage", slug: "water-damage-insurance-claim-denied-california" },
  { label: "Fire damage", slug: "fire-damage-insurance-claim-denied-colorado" },
  { label: "Storm & hurricane", slug: "storm-hurricane-insurance-claim-denied-louisiana" },
  { label: "Auto", slug: "auto-insurance-claim-denied-georgia" },
];

const FAQS = [
  {
    q: "How does the free analysis work?",
    a: "Upload your insurance policy and the adjuster's estimate. Shielded reads both, identifies your coverage type, flags missing or underpriced line items, and shows the estimated gap between the offer and what your policy owes — in about 90 seconds.",
  },
  {
    q: "Is Shielded a lawyer or public adjuster?",
    a: "No. Shielded is a self-help analysis and document tool. It does not provide legal advice, is not a law firm, and is not a licensed public adjuster. It helps you understand and document your own claim.",
  },
  {
    q: "How much does it cost?",
    a: "Your first policy analysis is free — no credit card required. Basic ($50/month) adds ongoing claim readiness — unlimited re-analysis, checklists, a documentation vault, and deadline tracking. Premium ($150/month) is the full advocacy toolkit for active claims — settlement benchmarking, unlimited AI negotiation drafts, and the clause-level rebuttal generator. Enterprise (custom) is for brokers managing multiple clients.",
  },
  {
    q: "What kinds of claims does it handle?",
    a: "Property and casualty claims — homeowners, roof, water, fire, storm and hurricane, auto, and business interruption — whether denied outright or underpaid.",
  },
];

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Free 90-second claim analysis
          </span>
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-7xl">
            Recover What Your Insurance{" "}
            <span className="text-emerald-600">Actually Owes You</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-500">
            Your insurer knows your policy better than you do. Shielded fixes that.
            Upload your policy and the adjuster&apos;s estimate — our AI shows where
            the offer falls short and drafts the rebuttal.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AppCTA campaign="homepage" position="hero" />
            <Link
              href="#how-it-works"
              className="rounded-xl bg-slate-100 px-8 py-4 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-200"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            No signup to see your result · Cancel anytime
          </p>
        </div>
      </section>

      {/* Proof / example results */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <p className="text-4xl font-black text-emerald-600">$17,800</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Example: settled above the adjuster&apos;s first offer
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-600">$14,500</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Example: gap the AI caught in an adjuster&apos;s scope
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-600">~90s</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                To see what your policy actually owes
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            Figures are illustrative examples, not a guarantee of recovery. Results
            vary by policy and claim.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="mb-16 text-center text-4xl font-black tracking-tight text-slate-900">
            How Shielded works
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Upload your documents",
                d: "Your insurance policy and the adjuster's estimate. That's all the AI needs to start.",
              },
              {
                n: "2",
                t: "See your gap",
                d: "Shielded reads both, flags underpaid and missing line items, and shows what your policy actually owes.",
              },
              {
                n: "3",
                t: "Get your rebuttal",
                d: "Premium drafts the negotiation letter, benchmarks comparable settlements, and tracks your deadlines.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-black text-emerald-600">
                  {s.n}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{s.t}</h3>
                <p className="text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <AppCTA campaign="homepage" position="how-it-works" />
          </div>
        </div>
      </section>

      {/* Claim types — internal links to programmatic claim pages */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="mb-4 text-center text-4xl font-black tracking-tight text-slate-900">
            Denied or underpaid? Start with your claim type
          </h2>
          <p className="mb-12 text-center text-lg text-slate-500">
            Every state, every major property and casualty claim.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {CLAIM_TYPES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-emerald-500/40 hover:bg-emerald-50"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600">
                  {c.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">claim help →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — Free / Basic / Premium / Enterprise (mirrors the app) */}
      <section id="pricing" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="mb-4 text-center text-4xl font-black tracking-tight text-slate-900">
            Start free. Upgrade when a claim hits.
          </h2>
          <p className="mb-12 text-center text-lg text-slate-500">
            Your first policy analysis is always free — no credit card required.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Free",
                badge: "Start here",
                price: "$0",
                unit: "forever",
                tagline: "Get your full policy analysis at no cost.",
                features: [
                  "AI policy analysis (1 policy)",
                  "Coverage score + risk flags",
                  "Plain-English summary",
                  "Downloadable risk report",
                ],
                cta: "Analyze my policy · free",
                highlight: false,
              },
              {
                name: "Basic",
                price: "$50",
                unit: "/ month",
                tagline: "For businesses who want ongoing claim readiness.",
                features: [
                  "Unlimited policy re-analysis",
                  "Claims guidance + checklists",
                  "Documentation vault",
                  "Deadline tracker + reminders",
                  "Email support",
                ],
                cta: "Start Basic",
                highlight: false,
              },
              {
                name: "Premium",
                badge: "Most popular",
                price: "$150",
                unit: "/ month",
                tagline: "For active claims — the full advocacy toolkit.",
                features: [
                  "Everything in Basic",
                  "Settlement benchmarking",
                  "AI negotiation drafts (unlimited)",
                  "Clause-level rebuttal generator",
                  "Priority support",
                ],
                cta: "Start Premium",
                highlight: true,
              },
              {
                name: "Enterprise",
                badge: "For brokers",
                price: "Custom",
                unit: "",
                tagline: "Multi-client dashboards for brokerages.",
                features: [
                  "Multi-business dashboard",
                  "White-labeled reports",
                  "Broker referral program",
                  "API + data export",
                  "Dedicated success manager",
                ],
                cta: "Talk to us",
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.highlight
                    ? "flex flex-col rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-7"
                    : "flex flex-col rounded-3xl border border-slate-200 bg-white p-7"
                }
              >
                {tier.badge && (
                  <span
                    className={
                      tier.highlight
                        ? "mb-3 inline-block w-fit rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                        : "mb-3 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    }
                  >
                    {tier.badge}
                  </span>
                )}
                <p className="text-lg font-bold text-slate-900">{tier.name}</p>
                <p className="mb-4 mt-1 text-sm text-slate-500">{tier.tagline}</p>
                <p className="mb-6">
                  <span className="text-4xl font-black text-slate-900">
                    {tier.price}
                  </span>{" "}
                  <span className="text-sm font-medium text-slate-500">
                    {tier.unit}
                  </span>
                </p>
                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-slate-700">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {getPlanPaymentLink(tier.name) ? (
                  <CheckoutCTA
                    plan={tier.name}
                    price={Number(tier.price.replace(/[^0-9]/g, "")) || 0}
                    href={getPlanPaymentLink(tier.name)}
                    label={tier.cta}
                    className={
                      tier.highlight
                        ? "inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                        : "inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
                    }
                  />
                ) : (
                  <AppCTA
                    campaign="homepage"
                    position={`pricing-${tier.name.toLowerCase()}`}
                    label={tier.cta}
                    className={
                      tier.highlight
                        ? "inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                        : "inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Your first policy analysis is free. No credit card. No account needed to
            see results — upgrade only if you want to fight a claim.
          </p>
        </div>
      </section>

      {/* Attorney band — the B2B track */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-black text-white">
              Are you an attorney?
            </h2>
            <p className="mt-1 max-w-xl text-white/70">
              Use Shielded to analyze policies, find underpayments, and draft demand
              letters for your clients — in minutes, not hours.
            </p>
          </div>
          <Link
            href="/for-attorneys"
            className="shrink-0 rounded-xl bg-white px-7 py-4 font-bold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Shielded for law firms →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900">{f.q}</h3>
                <p className="text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center text-sm text-slate-500">
            Learn more in our{" "}
            <Link href="/blog" className="font-semibold text-emerald-600 hover:underline">
              claim guides
            </Link>
            .
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-16 text-center text-white">
            <h2 className="mb-6 text-4xl font-black">
              Don&apos;t accept the first number
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-xl text-white/70">
              See what your insurer actually owes you in 90 seconds. Free.
            </p>
            <AppCTA campaign="homepage" position="footer-cta" />
            <p className="mt-6 text-xs text-white/40">
              Shielded is a self-help analysis and document tool — not a law firm or
              licensed public adjuster, and it does not provide legal advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
