import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="text-xl font-black text-white">
              AttorneyAITools
            </span>
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              Discover the best AI-powered legal tools and connect with
              attorneys who embrace modern technology to serve clients better.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm text-white uppercase tracking-widest font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/ai-tools" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/attorneys" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Attorneys
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm text-white uppercase tracking-widest font-bold mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/submit-tool" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Submit a Tool
                </Link>
              </li>
              <li>
                <Link href="/submit-attorney" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Submit an Attorney
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h4 className="text-sm text-white uppercase tracking-widest font-bold mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-all text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-sm text-white font-bold mb-3">Newsletter</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  className="flex-1 min-w-0 rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-all"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Disclosure */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-slate-400 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-slate-300">Disclosure:</strong> AttorneyAITools is operated by independent technology researchers, not licensed attorneys. Information on this site is for general educational purposes only and does not constitute legal advice. Tool listings are editorial; some links may be affiliate links. Attorney profiles are aggregated from publicly available sources and listing here does not imply endorsement, partnership, or attorney-client relationship. Always consult a licensed attorney for legal matters in your jurisdiction.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} AttorneyAITools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
