"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const CLAIM_TYPES = [
  "Homeowners / property",
  "Roof damage",
  "Water damage",
  "Fire damage",
  "Storm / hurricane",
  "Auto",
  "Business interruption",
  "Other",
];

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f7d6c] focus:border-[#0f7d6c] transition";
const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

/**
 * Consumer → attorney lead capture. Posts to /api/lead and fires a GA4
 * `lead_submitted` event so every lead is recorded for funnel analysis.
 */
export default function LeadCaptureForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function set(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!values.name?.trim() || (!values.email?.trim() && !values.phone?.trim())) {
      setError("Please add your name and a phone or email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "consumer_lead",
          ...values,
          source_path:
            typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });
      if (res.ok) {
        setStatus("success");
        trackEvent("lead_submitted", {
          lead_type: "consumer_attorney_match",
          claim_state: values.state || "unknown",
          claim_type: values.claim_type || "unknown",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#d9ece7] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#d9ece7]">
          <svg className="h-8 w-8 text-[#0f7d6c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
          Request received
        </h3>
        <p className="mx-auto max-w-md text-slate-600">
          We&apos;ll match you with an attorney in your area who handles your type of
          claim. In the meantime, you can{" "}
          <a href="/app?utm_source=lead&utm_medium=organic&utm_campaign=find-a-lawyer" className="font-semibold text-[#0f7d6c] hover:underline">
            run a free claim analysis
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <label htmlFor="name" className={labelClass}>Full name *</label>
        <input id="name" className={inputClass} value={values.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" className={inputClass} value={values.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" type="tel" className={inputClass} value={values.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 123-4567" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="state" className={labelClass}>State</label>
          <input id="state" className={inputClass} value={values.state || ""} onChange={(e) => set("state", e.target.value)} placeholder="Florida" />
        </div>
        <div>
          <label htmlFor="claim_type" className={labelClass}>Claim type</label>
          <select id="claim_type" className={inputClass} value={values.claim_type || ""} onChange={(e) => set("claim_type", e.target.value)}>
            <option value="">Select...</option>
            {CLAIM_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="details" className={labelClass}>Briefly, what happened?</label>
        <textarea id="details" rows={4} className={inputClass} value={values.details || ""} onChange={(e) => set("details", e.target.value)} placeholder="My claim was denied / underpaid because..." />
      </div>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">Something went wrong. Please try again.</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-[#1a2a4a] py-4 font-bold text-white shadow-[0_8px_32px_rgba(20,24,31,0.12)] transition-all hover:bg-[#12203d] disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Match me with an attorney"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Free, no obligation. Submitting connects you with an independent attorney; we are not a law firm.
      </p>
    </form>
  );
}
