// Lightweight GA4 event helper. Safe to call from any client component —
// no-ops on the server and queues into dataLayer if the gtag library hasn't
// finished loading yet (it loads lazily; the shim is defined afterInteractive).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GAParams = Record<string, string | number | boolean | undefined>;

/**
 * Fire a GA4 custom event. Uses sendBeacon under the hood (gtag default), so
 * events survive same-tab navigation (e.g. clicking through to /app.html).
 */
export function trackEvent(name: string, params: GAParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else {
    // Library not ready yet — queue so it flushes on load.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", name, params]);
  }
}

// ─── Named funnel events (keep names stable — they become GA4 dimensions) ─────

/** Top of the Shielded funnel: user clicks through to the free analysis. */
export function trackFreeAnalysisClick(params: GAParams = {}): void {
  trackEvent("shielded_cta_click", {
    funnel_step: "free_analysis_click",
    destination: "app.html",
    ...params,
  });
}
