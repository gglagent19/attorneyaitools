import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

const columns = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "AI Tools",
    links: [
      { label: "Browse All Tools", href: "/ai-tools" },
      { label: "Top Rated", href: "/ai-tools?sort=rating" },
      { label: "Free Tools", href: "/ai-tools?pricing=free" },
      { label: "Compare Tools", href: "/compare" },
    ],
  },
  {
    title: "Attorneys",
    links: [
      { label: "Find an Attorney", href: "/attorneys" },
      { label: "By State", href: "/attorneys/states" },
      { label: "By Practice Area", href: "/practice-areas" },
      { label: "Featured Attorneys", href: "/attorneys?featured=true" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Submit a Tool", href: "/submit?type=tool" },
      { label: "Submit a Listing", href: "/submit?type=attorney" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{"\u2696\uFE0F"}</span>
            <span className="text-white font-bold">
              Attorney<span className="text-blue-400">AI</span>Tools
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AttorneyAITools.org. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
