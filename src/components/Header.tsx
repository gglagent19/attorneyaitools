"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppCTA from "@/components/AppCTA";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "For Attorneys", href: "/for-attorneys" },
  { label: "Find a Lawyer", href: "/find-a-lawyer" },
  { label: "Guides", href: "/blog" },
];

const headerCtaClass =
  "bg-[#1a2a4a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#12203d] transition-colors duration-200 inline-flex items-center";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e2ddd3] bg-[#f6f3ee]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-black tracking-tighter text-[#1a2a4a]">
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
                      ? "text-[#0f7d6c] font-semibold border-b-2 border-[#0f7d6c] pb-0.5 transition-colors duration-200"
                      : "text-[#2a3140] hover:text-[#0f7d6c] font-medium transition-colors duration-200"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center">
            <AppCTA
              campaign="header"
              position="header"
              label="Free Claim Analysis"
              className={headerCtaClass}
            />
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
        <nav className="md:hidden border-t border-[#e2ddd3] bg-[#f6f3ee]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "block px-3 py-2 text-base text-[#0f7d6c] font-semibold rounded-lg transition-colors duration-200"
                      : "block px-3 py-2 text-base text-[#2a3140] font-medium rounded-lg hover:text-[#0f7d6c] transition-colors duration-200"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2" onClick={() => setMobileOpen(false)}>
              <AppCTA
                campaign="header"
                position="header-mobile"
                label="Free Claim Analysis"
                className="block w-full text-center bg-[#1a2a4a] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#12203d] transition-colors duration-200"
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
