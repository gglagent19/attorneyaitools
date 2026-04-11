"use client";

import { useState, FormEvent } from "react";

interface SubmitFormProps {
  type: "tool" | "attorney";
}

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const toolFields: FieldDef[] = [
  { name: "name", label: "Tool Name", type: "text", required: true, placeholder: "e.g. CaseText" },
  { name: "website", label: "Website URL", type: "url", required: true, placeholder: "https://..." },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: ["Legal Research", "Document Automation", "Contract Analysis", "E-Discovery", "Practice Management", "Billing", "Other"],
  },
  { name: "pricing", label: "Pricing", type: "select", required: true, options: ["Free", "Freemium", "Paid", "Enterprise"] },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe what this tool does..." },
];

const attorneyFields: FieldDef[] = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
  { name: "firm", label: "Law Firm", type: "text", required: true, placeholder: "Firm name" },
  { name: "city", label: "City", type: "text", required: true, placeholder: "New York" },
  { name: "state", label: "State", type: "text", required: true, placeholder: "NY" },
  { name: "practice_areas", label: "Practice Areas", type: "text", required: true, placeholder: "e.g. IP Law, Corporate, Litigation" },
  { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "(555) 123-4567" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "john@lawfirm.com" },
];

export default function SubmitForm({ type }: SubmitFormProps) {
  const fields = type === "tool" ? toolFields : attorneyFields;
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Submission Received!</h3>
        <p className="text-sm text-green-700">
          Thank you for your submission. Our team will review it and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">
        Submit {type === "tool" ? "an AI Tool" : "an Attorney Listing"}
      </h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1.5">
            {field.label}
            {field.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              value={values[field.name] || ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              placeholder={field.placeholder}
              rows={4}
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 ${
                errors[field.name] ? "border-red-300 bg-red-50" : "border-slate-300"
              }`}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              value={values[field.name] || ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors[field.name] ? "border-red-300 bg-red-50" : "border-slate-300"
              }`}
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
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 ${
                errors[field.name] ? "border-red-300 bg-red-50" : "border-slate-300"
              }`}
            />
          )}

          {errors[field.name] && (
            <p className="mt-1 text-xs text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit for Review"}
      </button>
    </form>
  );
}
