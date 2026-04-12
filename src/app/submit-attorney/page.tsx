import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Submit Attorney Listing",
  description:
    "Submit your attorney listing to our directory. Get featured among top-rated lawyers in your practice area.",
};

const steps = [
  {
    n: 1,
    title: "Select Category",
    desc: "Confirm your submission type — this page is configured for attorney profiles.",
  },
  {
    n: 2,
    title: "Detail Metadata",
    desc: "Provide your name, firm, jurisdiction, and practice areas.",
  },
  {
    n: 3,
    title: "Review Phase",
    desc: "Our editorial team verifies credentials before publication.",
  },
];

export default function SubmitAttorneyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Submit Attorney" },
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
            List your practice in the directory trusted by clients nationwide.
            Featured listings ($49/month) appear at the top of search results and
            include a verified badge.
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
                Listings with complete practice area details and clear jurisdictions
                receive 4x more qualified client inquiries. Be specific about your
                specialties.
              </p>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <SubmitForm type="attorney" />
          </main>
        </div>
      </div>
    </div>
  );
}
