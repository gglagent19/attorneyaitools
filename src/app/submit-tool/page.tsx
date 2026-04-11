import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Submit an AI Tool",
  description:
    "Submit your AI tool to our directory. Get listed among the top AI tools for legal professionals.",
};

export default function SubmitToolPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Submit AI Tool" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Submit an AI Tool
        </h1>
        <p className="text-slate-600">
          Have an AI tool for legal professionals? Submit it to our directory for
          review. Featured listings are available for $49/month.
        </p>
      </div>

      <SubmitForm type="tool" />
    </div>
  );
}
