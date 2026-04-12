"use client";

import { useState, FormEvent } from "react";

interface SubmitFormProps {
  type: "tool" | "attorney";
  allowTypeToggle?: boolean;
}

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const toolIdentityFields: FieldDef[] = [
  { name: "name", label: "Tool Name", type: "text", required: true, placeholder: "e.g. CaseText" },
  { name: "website", label: "Website URL", type: "url", required: true, placeholder: "https://..." },
  { name: "tagline", label: "Short Tagline", type: "text", required: false, placeholder: "One-line value proposition" },
  { name: "description", label: "Full Description", type: "textarea", required: true, placeholder: "Describe what this tool does..." },
];

const toolSpecFields: FieldDef[] = [
  { name: "pricing", label: "Pricing Model", type: "select", required: true, options: ["Free", "Freemium", "Paid", "Enterprise"] },
  {
    name: "category",
    label: "Primary Category",
    type: "select",
    required: true,
    options: ["Legal Research", "Document Automation", "Contract Analysis", "E-Discovery", "Practice Management", "Billing", "Other"],
  },
];

const attorneyIdentityFields: FieldDef[] = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
  { name: "firm", label: "Law Firm", type: "text", required: true, placeholder: "Firm name" },
  { name: "email", label: "Short Tagline / Email", type: "email", required: true, placeholder: "john@lawfirm.com" },
  { name: "description", label: "Full Description", type: "textarea", required: false, placeholder: "Describe your practice, experience, and specialties..." },
];

const attorneySpecFields: FieldDef[] = [
  { name: "city", label: "City", type: "text", required: true, placeholder: "New York" },
  { name: "state", label: "State", type: "text", required: true, placeholder: "NY" },
  { name: "practice_areas", label: "Practice Areas", type: "text", required: true, placeholder: "e.g. IP Law, Corporate" },
  { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "(555) 123-4567" },
];

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition";
const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

function SectionHeader({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-1">
        {step}
      </div>
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
  );
}

export default function SubmitForm({ type: initialType, allowTypeToggle = false }: SubmitFormProps) {
  const [type, setType] = useState<"tool" | "attorney">(initialType);
  const identityFields = type === "tool" ? toolIdentityFields : attorneyIdentityFields;
  const specFields = type === "tool" ? toolSpecFields : attorneySpecFields;
  const allFields = [...identityFields, ...specFields];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    allFields.forEach((f) => {
      const val = (values[f.name] || "").trim();
      if (f.required && !val) {
        newErrors[f.name] = `${f.label} is required`;
      }
      if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        newErrors[f.name] = "Invalid email address";
      }
      if (f.type === "url" && val && !/^https?:\/\/.+/.test(val)) {
        newErrors[f.name] = "Must start with http:// or https://";
      }
    });
    if (!agreed) {
      newErrors._terms = "You must accept the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...values }),
      });
      if (res.ok) {
        setStatus("success");
        setValues({});
        setAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-10 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
          Submission Received
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Thank you for contributing to the network. Our editorial team will review
          your submission and follow up within 3 business days.
        </p>
      </div>
    );
  }

  function renderField(field: FieldDef) {
    const hasError = !!errors[field.name];
    const errorClass = hasError ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500" : "";

    return (
      <div key={field.name}>
        <label htmlFor={field.name} className={labelClass}>
          {field.label}
          {field.required && <span className="text-emerald-500 ml-1">*</span>}
        </label>

        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            value={values[field.name] || ""}
            onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            placeholder={field.placeholder}
            rows={5}
            className={`${inputClass} ${errorClass}`}
          />
        ) : field.type === "select" ? (
          <select
            id={field.name}
            value={values[field.name] || ""}
            onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            className={`${inputClass} ${errorClass}`}
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            type={field.type}
            value={values[field.name] || ""}
            onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            placeholder={field.placeholder}
            className={`${inputClass} ${errorClass}`}
          />
        )}

        {hasError && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors[field.name]}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Classification */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <SectionHeader step="Step 1" title="Classification" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`p-6 rounded-xl bg-slate-50 border-2 border-transparent cursor-pointer hover:bg-slate-100 has-[:checked]:border-emerald-500 has-[:checked]:bg-white transition ${
              !allowTypeToggle && type !== "tool" ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="radio"
              name="submission_type"
              value="tool"
              checked={type === "tool"}
              onChange={() => allowTypeToggle && setType("tool")}
              disabled={!allowTypeToggle}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">AI Software Tool</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Research platforms, contract analysis, automation, e-discovery.
                </div>
              </div>
            </div>
          </label>

          <label
            className={`p-6 rounded-xl bg-slate-50 border-2 border-transparent cursor-pointer hover:bg-slate-100 has-[:checked]:border-emerald-500 has-[:checked]:bg-white transition ${
              !allowTypeToggle && type !== "attorney" ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="radio"
              name="submission_type"
              value="attorney"
              checked={type === "attorney"}
              onChange={() => allowTypeToggle && setType("attorney")}
              disabled={!allowTypeToggle}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Attorney Profile</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Individual practitioners and law firm listings with verified credentials.
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Section 2: Core Identity */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <SectionHeader step="Step 2" title="Core Identity" />
        <div className="space-y-5">{identityFields.map(renderField)}</div>
      </div>

      {/* Section 3: Specifications */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <SectionHeader step="Step 3" title="Specifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {specFields.map(renderField)}
        </div>
      </div>

      {/* Terms + Submit */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer mb-5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-slate-600">
            I confirm the information submitted is accurate and agree to the
            editorial review process and directory{" "}
            <a href="/terms" className="text-emerald-600 font-semibold hover:underline">
              terms of service
            </a>
            .
          </span>
        </label>
        {errors._terms && (
          <p className="mb-3 text-xs font-medium text-red-600">{errors._terms}</p>
        )}

        {status === "error" && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
        >
          {status === "loading" ? "Submitting..." : "Complete Submission"}
        </button>
      </div>
    </form>
  );
}
