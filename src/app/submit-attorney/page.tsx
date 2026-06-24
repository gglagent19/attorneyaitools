import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedListingCTA from "@/components/FeaturedListingCTA";
import { getListingPaymentLink } from "@/lib/payment-links";

const listingTiers = [
  {
    name: "Free Listing",
    price: "$0",
    unit: "",
    features: ["Standard directory profile", "Practice areas & jurisdiction", "Editorial review"],
    cta: "List for free",
    highlight: false,
  },
  {
    name: "Featured",
    price: "$49",
    unit: "/ month",
    features: ["Top of search results", "Verified badge", "Priority placement on city & practice pages", "4x more client inquiries"],
    cta: "Get Featured",
    highlight: true,
  },
  {
    name: "Spotlight",
    price: "$99",
    unit: "/ month",
    features: ["Everything in Featured", "Homepage & state-hub placement", "Lead routing from claim pages", "Performance reporting"],
    cta: "Get Spotlight",
    highlight: false,
  },
];

export const metadata: Metadata = {
  title: "Submit Attorney Listing",
  description:
    "Submit your attorney listing to our directory. Get featured among top-rated lawyers in your practice area.",
  alternates: { canonical: "/submit-attorney" },
  robots: { index: false, follow: true },
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
    <div className="bg-[#f6f3ee] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 mt-6">
          <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
            Contribution Portal
          </span>
          <h1 className="serif-ed text-5xl text-[#14181f] mb-4">
            Expand the Legal Intelligence Network
          </h1>
          <p className="text-lg text-[#5b6472] max-w-2xl">
            List your practice in the directory trusted by clients nationwide.
            Get matched with policyholders who need an attorney for a denied or
            underpaid insurance claim.
          </p>
        </div>

        {/* Listing tiers */}
        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {listingTiers.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.highlight
                  ? "flex flex-col rounded-3xl border-2 border-[#0f7d6c] bg-[#d9ece7] p-7"
                  : "flex flex-col rounded-3xl border border-[#e2ddd3] bg-white p-7 shadow-sm"
              }
            >
              {tier.highlight && (
                <span className="mb-3 inline-block w-fit rounded-full bg-[#0f7d6c] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <p className="text-lg font-bold text-[#14181f]">{tier.name}</p>
              <p className="mb-6 mt-1">
                <span className="text-3xl font-black text-[#14181f]">{tier.price}</span>{" "}
                <span className="text-sm font-medium text-[#8a93a1]">{tier.unit}</span>
              </p>
              <ul className="mb-8 flex-1 space-y-2.5 text-sm text-[#5b6472]">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#0f7d6c]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <FeaturedListingCTA
                tier={tier.name}
                label={tier.cta}
                href={getListingPaymentLink(tier.name)}
                className={
                  tier.highlight
                    ? "inline-flex w-full items-center justify-center rounded-lg bg-[#1a2a4a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12203d]"
                    : "inline-flex w-full items-center justify-center rounded-lg border border-[#d4cebf] bg-transparent px-6 py-3 text-sm font-semibold text-[#2a3140] transition-colors hover:bg-[#eeeae2]"
                }
              />
            </div>
          ))}
        </div>

        <div id="listing-form" className="grid lg:grid-cols-12 gap-6 scroll-mt-24">
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#e2ddd3] rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a93a1] mb-5">
                Submission Guide
              </h3>
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0f7d6c] text-white font-bold text-sm flex items-center justify-center">
                      {s.n}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#14181f] text-sm mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-[#5b6472] leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-[#d9ece7] border border-[#e2ddd3] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-[#0f7d6c]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.293z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0f7d6c]">
                  Pro Tip
                </span>
              </div>
              <p className="text-sm text-[#14181f] leading-relaxed">
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
