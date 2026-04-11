import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllPracticeAreas,
  getPracticeAreaBySlug,
  getAttorneysByPracticeArea,
} from "@/lib/vault";
import Breadcrumbs from "@/components/Breadcrumbs";
import AttorneyCard from "@/components/AttorneyCard";
import AdBlock from "@/components/AdBlock";

export async function generateStaticParams() {
  const areas = getAllPracticeAreas();
  return areas.map((a) => ({ practice: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ practice: string }>;
}): Promise<Metadata> {
  const { practice } = await params;
  const area = getPracticeAreaBySlug(practice);
  if (!area) return { title: "Practice Area Not Found" };
  return {
    title: `${area.name} Lawyers - Find Top Attorneys`,
    description: `Find top-rated ${area.name} lawyers near you. Browse our directory of experienced ${area.name} attorneys across the United States.`,
    openGraph: {
      title: `${area.name} Lawyers | AttorneyAITools`,
      description: `Find top-rated ${area.name} lawyers near you.`,
    },
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ practice: string }>;
}) {
  const { practice } = await params;
  const area = getPracticeAreaBySlug(practice);
  if (!area) notFound();

  const attorneys = getAttorneysByPracticeArea(practice);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Practice Areas", href: "/attorneys" },
    { label: area.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          {area.name} Lawyers
        </h1>
        <p className="text-lg text-slate-600">
          Find experienced {area.name} attorneys across the United States.
          Browse {attorneys.length} lawyers specializing in {area.name}.
        </p>
      </div>

      <AdBlock format="horizontal" slot="practice-area-top" />

      {attorneys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {attorneys.map((attorney) => (
            <AttorneyCard key={attorney.slug} attorney={attorney} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 mt-8">
          <p className="text-slate-500 text-lg">
            No {area.name} attorneys listed yet.
          </p>
          <Link
            href="/submit-attorney"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit a listing
          </Link>
        </div>
      )}
    </div>
  );
}
