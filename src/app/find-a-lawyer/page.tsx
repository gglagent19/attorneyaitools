import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Find an Insurance Claim Lawyer — Free Attorney Match",
  description:
    "Denied or underpaid insurance claim? Get matched free with an attorney in your state who handles insurance and property claims. No obligation.",
  alternates: { canonical: "/find-a-lawyer" },
};

export default function FindALawyerPage() {
  return (
    <div className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Find a Lawyer" }]} />

        <div className="mb-10 mt-6 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
            Get matched with an insurance claim attorney
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Tell us about your denied or underpaid claim and we&apos;ll connect you,
            free, with an attorney in your state who handles cases like yours.
          </p>
        </div>

        <LeadCaptureForm />

        <div className="mt-10 rounded-2xl bg-slate-50 p-8 text-center">
          <p className="text-slate-700">
            Not ready to talk to a lawyer yet? See what your insurer owes you first.
          </p>
          <Link
            href="/app.html?utm_source=find-a-lawyer&utm_medium=organic&utm_campaign=cross-sell"
            className="mt-3 inline-flex items-center font-semibold text-emerald-600 hover:underline"
          >
            Run a free 90-second claim analysis →
          </Link>
        </div>
      </div>
    </div>
  );
}
