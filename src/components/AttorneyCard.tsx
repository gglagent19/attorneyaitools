import Link from "next/link";
import StarRating from "./StarRating";

interface Attorney {
  slug: string;
  name: string;
  law_firm: string;
  city: string;
  city_slug: string;
  state: string;
  state_slug: string;
  practice_areas: string[];
  rating: number;
  featured: boolean;
  experience_years: number;
}

interface AttorneyCardProps {
  attorney: Attorney;
}

export default function AttorneyCard({ attorney }: AttorneyCardProps) {
  return (
    <Link
      href={`/attorneys/${attorney.state_slug}/${attorney.city_slug}/${attorney.slug}`}
      className="group relative block bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden"
    >
      {/* Featured Badge */}
      {attorney.featured && (
        <div className="absolute top-3 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-l-full shadow-sm z-10">
          Featured
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {attorney.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {attorney.name}
            </h3>
            <p className="text-sm text-slate-500 truncate">{attorney.law_firm}</p>
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mb-3">
          <StarRating rating={attorney.rating} />
          <span className="text-xs text-slate-500 font-medium">
            {attorney.experience_years}+ years exp.
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-3">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {attorney.city}, {attorney.state}
          </span>
        </div>

        {/* Practice Areas */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {attorney.practice_areas.slice(0, 3).map((area) => (
            <span
              key={area}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
            >
              {area}
            </span>
          ))}
          {attorney.practice_areas.length > 3 && (
            <span className="text-xs text-slate-500">
              +{attorney.practice_areas.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
