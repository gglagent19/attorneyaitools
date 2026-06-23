import Link from "next/link";
import type { Metadata } from "next";
import AppCTA from "@/components/AppCTA";

export const metadata: Metadata = {
  title: "Shielded for Attorneys & Law Firms — Handle Insurance Claims Faster",
  description:
    "Insurance and personal-injury attorneys use Shielded to analyze policies, find underpaid claims, and draft demand letters in minutes — so your firm gets better results for clients, faster.",
  alternates: { canonical: "/for-attorneys" },
};

export default function ForAttorneysPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            For attorneys & law firms
          </span>
          <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tighter text-slate-900 md:text-6xl">
            Win more for your clients,{" "}
            <span className="text-emerald-600">in a fraction of the time</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-500">
            You already have the clients. Shielded does the heavy lifting on every
            insurance claim — reading policies, finding underpayments, and drafting
            demand letters — so your team moves faster and settles higher.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AppCTA
              campaign="attorney"
              position="for-attorneys-hero"
              label="Try Shielded for your firm →"
            />
            <Link
              href="/submit-attorney"
              className="rounded-xl bg-slate-100 px-8 py-4 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-200"
            >
              List your practice
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                t: "Analyze any policy in seconds",
                d: "Upload the policy and the carrier's estimate. Shielded surfaces coverage, exclusions, and every underpaid or missing line item.",
              },
              {
                t: "Draft demand & rebuttal letters",
                d: "Generate itemized, policy-cited demand letters your team can review and send — instead of writing each from scratch.",
              },
              {
                t: "Benchmark & track every claim",
                d: "Comparable-settlement data and deadline tracking across your whole caseload, in one workspace.",
              },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{v.t}</h3>
                <p className="text-slate-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h2 className="mb-6 text-3xl font-black tracking-tight text-slate-900">
            Built for the firms that fight insurers
          </h2>
          <p className="mb-8 text-lg text-slate-500">
            Personal injury, property damage, first-party insurance, and bad-faith
            practices — Shielded turns hours of policy review and letter-drafting
            into minutes, so you can take on more cases without adding headcount.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              "Personal injury",
              "Property damage",
              "First-party insurance",
              "Bad faith",
              "Storm & catastrophe",
            ].map((p) => (
              <span
                key={p}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-5xl px-8">
          <div className="rounded-[3rem] bg-slate-900 p-16 text-center text-white">
            <h2 className="mb-6 text-4xl font-black">Put Shielded to work on a real claim</h2>
            <p className="mx-auto mb-10 max-w-xl text-xl text-white/70">
              Run one of your active claims through Shielded free and see the gap it
              finds.
            </p>
            <AppCTA
              campaign="attorney"
              position="for-attorneys-footer"
              label="Start free →"
            />
          </div>
        </div>
      </section>
    </>
  );
}
