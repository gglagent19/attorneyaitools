import Link from "next/link";

interface FeaturedBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function FeaturedBanner({ title, description, ctaText, ctaLink }: FeaturedBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

      <div className="relative px-6 py-10 sm:px-10 sm:py-14 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h2>
        <p className="text-blue-100 text-base sm:text-lg mb-6 max-w-2xl">{description}</p>
        <Link
          href={ctaLink}
          className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
        >
          {ctaText}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
