import Link from "next/link";
import StarRating from "./StarRating";

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

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/ai-tools/${tool.slug}`}
      className="group relative block bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden"
    >
      {/* Featured Ribbon */}
      {tool.featured && (
        <div className="absolute top-3 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-l-full shadow-sm z-10">
          Featured
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {tool.logo ? (
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-12 h-12 rounded-lg object-cover border border-slate-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {tool.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {tool.name}
            </h3>
            <StarRating rating={tool.rating} />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">{tool.description}</p>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {tool.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {tool.pricing}
          </span>
        </div>
      </div>
    </Link>
  );
}
