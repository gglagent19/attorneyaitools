import type { Metadata } from "next";
import Link from "next/link";
import { getAllFAQs } from "@/lib/vault";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = {
  title: "Legal AI FAQ - Answers to Questions Attorneys Actually Ask",
  description:
    "Practical, authoritative answers to the most common questions about AI for lawyers: ethics, pricing, tools, confidentiality, hallucinations, and more.",
  alternates: { canonical: "/faq" },
};

const CATEGORY_ORDER: Array<{ key: string; label: string; blurb: string }> = [
  {
    key: "ai-ethics",
    label: "AI Ethics & Confidentiality",
    blurb:
      "Professional responsibility, confidentiality, privilege, and the Model Rules as applied to generative AI.",
  },
  {
    key: "tools",
    label: "Tools & Selection",
    blurb:
      "Which AI tools actually work for which tasks, and how to pick the right one for your practice.",
  },
  {
    key: "pricing",
    label: "Pricing",
    blurb:
      "What legal AI actually costs, from free tiers to six-figure enterprise contracts.",
  },
  {
    key: "practice",
    label: "Practice & Business",
    blurb:
      "How AI is reshaping law firm workflows, headcount, billing, and the future of practice.",
  },
  {
    key: "legal",
    label: "Legal & Doctrinal",
    blurb:
      "Citation rules, case outcomes, bar exams, and the legal questions AI raises for the profession itself.",
  },
];

export default function FAQIndexPage() {
  const faqs = getAllFAQs();

  const grouped = new Map<string, FAQ[]>();
  for (const f of faqs) {
    const key = f.category || "legal";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(f);
  }

  // Build top-level FAQPage schema covering every question.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.description,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Legal AI FAQ
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Straightforward, authoritative answers to the questions attorneys
            actually ask about AI. Written for US lawyers, covering ethics,
            tools, pricing, and practice.
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORY_ORDER.map((cat) => {
            const items = grouped.get(cat.key) || [];
            if (items.length === 0) return null;
            return (
              <section key={cat.key}>
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100 uppercase tracking-wide">
                      {cat.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      {items.length} {items.length === 1 ? "question" : "questions"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{cat.blurb}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((f) => (
                    <Link
                      key={f.slug}
                      href={`/faq/${f.slug}`}
                      className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition"
                    >
                      <h2 className="font-semibold text-slate-900 mb-1.5 leading-snug">
                        {f.question}
                      </h2>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {f.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">No FAQs yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
