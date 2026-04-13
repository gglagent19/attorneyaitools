import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AttorneyAITools - AI Tools for Lawyers & Attorney Directory",
    template: "%s | AttorneyAITools",
  },
  description:
    "The largest directory of AI tools for attorneys and a comprehensive lawyer directory across the United States. Compare legal AI tools, find attorneys by city and practice area.",
  metadataBase: new URL("https://attorneyaitools.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "AttorneyAITools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-20VJ6GN3C7"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-20VJ6GN3C7');`}
        </Script>
      </body>
    </html>
  );
}
