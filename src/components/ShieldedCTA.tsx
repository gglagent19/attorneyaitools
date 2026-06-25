"use client";

import { trackFreeAnalysisClick } from "@/lib/analytics";

interface ShieldedCTAProps {
  state?: string;
  /** Where on the page this CTA sits — lets us see which placement converts. */
  position?: string;
  variant?: "banner" | "inline";
}

const APP_URL =
  "/app?utm_source=seo&utm_medium=organic&utm_campaign=claim-pages";

/**
 * Conversion CTA for claimant SEO pages — drives the free 90-second analysis,
 * the top of Shielded's funnel. Fires a GA4 event on click so we can measure
 * which pages/placements actually push traffic into the app.
 */
export default function ShieldedCTA({
  state,
  position = "body",
  variant = "banner",
}: ShieldedCTAProps) {
  function handleClick() {
    trackFreeAnalysisClick({
      claim_state: state || "unknown",
      cta_position: position,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  return (
    <section
      className="rounded-2xl border border-[#d9ece7] bg-[#d9ece7] p-6 sm:p-8"
      data-cta="shielded-free-analysis"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#0f7d6c]">
        Free claim analysis
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        See what your insurer actually owes you
        {state ? ` in ${state}` : ""}
      </h2>
      <p className="mt-2 max-w-2xl text-slate-700">
        Upload your policy and the adjuster&apos;s estimate. In about 90 seconds,
        Shielded shows where the offer falls short of what your policy owes — then
        drafts the rebuttal letter and tracks your deadlines.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={APP_URL}
          onClick={handleClick}
          className="inline-flex items-center rounded-lg bg-[#1a2a4a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12203d]"
        >
          Run my free 90-second analysis →
        </a>
        <span className="text-xs text-slate-500">
          No signup to see your result · Cancel anytime
        </span>
      </div>
      {variant === "inline" && (
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
          Shielded is a self-help analysis and document tool — not a law firm or a
          licensed public adjuster. It does not provide legal advice.
        </p>
      )}
    </section>
  );
}
