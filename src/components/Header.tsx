"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Tools", href: "/ai-tools" },
  { label: "Attorneys", href: "/attorneys" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-black tracking-tighter text-emerald-600">
              AttorneyAITools
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "text-emerald-600 font-bold border-b-2 border-emerald-600 pb-0.5 transition-all duration-300"
                      : "text-slate-600 hover:text-emerald-500 font-medium transition-all duration-300"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center">
            <Link
              href="/submit-tool"
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all duration-300"
            >
              Submit Tool
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "block px-3 py-2 text-base text-emerald-600 font-bold rounded-lg transition-all duration-300"
                      : "block px-3 py-2 text-base text-slate-600 font-medium rounded-lg hover:text-emerald-500 transition-all duration-300"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/submit-tool"
              className="block mt-2 text-center bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              Submit Tool
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
