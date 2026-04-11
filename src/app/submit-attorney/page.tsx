import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Submit Attorney Listing",
  description:
    "Submit your attorney listing to our directory. Get featured among top-rated lawyers in your practice area.",
};

export default function SubmitAttorneyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Submit Attorney" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Submit Attorney Listing
        </h1>
        <p className="text-slate-600">
          List your practice in our directory. Featured listings ($49/month)
          appear at the top of search results and include a verified badge.
        </p>
      </div>

      <SubmitForm type="attorney" />
    </div>
  );
}
