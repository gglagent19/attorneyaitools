"use client";

import { trackFreeAnalysisClick } from "@/lib/analytics";

interface AppCTAProps {
  /** Marketing campaign tag for the UTM + GA event. */
  campaign?: string;
  /** Where on the page this CTA sits — lets us compare placements. */
  position?: string;
  label?: string;
  className?: string;
}

/**
 * Tracked link into the Shielded app (the free analysis). Fires a GA4 event on
 * click so every entry into the funnel is recorded, then navigates.
 */
export default function AppCTA({
  campaign = "homepage",
  position = "hero",
  label = "Run my free claim analysis →",
  className,
}: AppCTAProps) {
  const href = `/app.html?utm_source=site&utm_medium=organic&utm_campaign=${encodeURIComponent(
    campaign
  )}`;

  function handleClick() {
    trackFreeAnalysisClick({
      cta_position: position,
      campaign,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={
        className ??
        "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-105"
      }
    >
      {label}
    </a>
  );
}
