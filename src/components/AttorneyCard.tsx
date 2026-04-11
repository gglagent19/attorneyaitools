import Link from "next/link";

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
    <div className="group bg-white p-6 rounded-xl transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.1)] border border-slate-200 hover:border-emerald-500/30">
      {/* Top: Avatar + Name/Firm */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            {attorney.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            {attorney.name}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{attorney.law_firm}</p>
          {attorney.featured && (
            <span className="text-emerald-600 text-xs font-bold tracking-wider uppercase">
              Featured Partner
            </span>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-2">
        <svg
          className="w-4 h-4 text-slate-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-sm text-slate-500">
          {attorney.city}, {attorney.state}
        </span>
      </div>

      {/* Experience */}
      <p className="text-sm text-slate-500 mb-4">
        {attorney.experience_years}+ years of experience
      </p>

      {/* Practice Area Tags */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {attorney.practice_areas.slice(0, 3).map((area) => (
          <span
            key={area}
            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold tracking-wider uppercase"
          >
            {area}
          </span>
        ))}
        {attorney.practice_areas.length > 3 && (
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold tracking-wider uppercase">
            +{attorney.practice_areas.length - 3} more
          </span>
        )}
      </div>

      {/* Bottom Button */}
      <Link
        href={`/attorneys/${attorney.state_slug}/${attorney.city_slug}/${attorney.slug}`}
        className="block w-full bg-slate-100 text-slate-900 py-3 rounded-lg font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition-all text-center"
      >
        View Profile
      </Link>
    </div>
  );
}
