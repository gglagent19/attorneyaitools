import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Submit an AI Tool",
  description:
    "Submit your AI tool to our directory. Get listed among the top AI tools for legal professionals.",
};

const steps = [
  {
    n: 1,
    title: "Select Category",
    desc: "Choose whether you're submitting an AI software tool or an attorney profile.",
  },
  {
    n: 2,
    title: "Detail Metadata",
    desc: "Provide the core identity, specifications, and descriptive content.",
  },
  {
    n: 3,
    title: "Review Phase",
    desc: "Our editorial team verifies your submission before publication.",
  },
];

export default function SubmitToolPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Submit AI Tool" },
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 mt-6">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 rounded-full mb-4">
            Contribution Portal
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 mb-4">
            Expand the Legal Intelligence Network
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Submit an AI tool or attorney profile to join the most trusted directory for
            legal technology and practitioners. Featured listings available for $49/month.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
                Submission Guide
              </h3>
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-emerald-500/30">
                      {s.n}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.293z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Pro Tip
                </span>
              </div>
              <p className="text-sm text-emerald-900 leading-relaxed">
                Submissions with a complete description and a clear value proposition
                are approved 3x faster. Take the time to showcase what makes your
                listing unique.
              </p>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <SubmitForm type="tool" allowTypeToggle />
          </main>
        </div>
      </div>
    </div>
  );
}
