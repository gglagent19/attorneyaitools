import Link from "next/link";

interface Tool {
  slug: string;
  name: string;
  category: string;
  pricing: string;
  rating: number;
  description: string;
  featured: boolean;
  logo?: string;
}

interface ToolCardProps {
  tool: Tool;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-amber-400" : "text-slate-300"} fill-current`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function ToolCard({ tool }: ToolCardProps) {
  const reviewCount = Math.floor(tool.rating * 12 + 7);

  return (
    <div className="group bg-white p-8 rounded-xl border border-slate-200 hover:shadow-xl hover:border-emerald-500/20 transition-all duration-500 flex flex-col">
      {/* Top area: logo + bookmark */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span className="text-2xl font-bold text-emerald-700">
            {tool.name.charAt(0)}
          </span>
        </div>
        <button
          type="button"
          aria-label="Bookmark"
          className="text-slate-300 hover:text-emerald-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      </div>

      {/* Star rating row */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} filled={i <= Math.round(tool.rating)} />
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {tool.rating.toFixed(1)} ({reviewCount})
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
        <Link href={`/ai-tools/${tool.slug}`}>{tool.name}</Link>
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {tool.category}
        </span>
        {tool.featured && (
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
            FEATURED
          </span>
        )}
      </div>

      {/* Bottom: pricing + Learn More */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-emerald-600">{tool.pricing}</span>
        <Link
          href={`/ai-tools/${tool.slug}`}
          className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          Learn More &rarr;
        </Link>
      </div>

      {/* Bottom buttons */}
      <div className="flex items-center gap-3">
        <Link
          href={`/ai-tools/${tool.slug}`}
          className="flex-1 text-center py-2.5 px-4 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Visit Website
        </Link>
        <Link
          href={`/ai-tools/${tool.slug}`}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          aria-label={`Go to ${tool.name}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
