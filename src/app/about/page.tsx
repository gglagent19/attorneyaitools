import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About AttorneyAITools",
  description:
    "AttorneyAITools is an independent directory and comparison guide for AI tools built for attorneys. Learn who runs the site, our editorial standards, and how we evaluate legal AI software.",
  alternates: { canonical: "/about" },
};

const SITE_URL = "https://attorneyaitools.org";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "AttorneyAITools Editorial Team",
  url: `${SITE_URL}/about`,
  description:
    "Independent technology researchers covering AI tools for the legal profession.",
  knowsAbout: [
    "Legal Technology",
    "Generative AI",
    "Contract Review Software",
    "Legal Research Software",
    "Practice Management Software",
  ],
  worksFor: { "@id": `${SITE_URL}/#organization` },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  name: "About AttorneyAITools",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/about#person` },
};

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-20 prose prose-slate prose-lg prose-headings:font-black prose-headings:tracking-tight">
        <span className="not-prose inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
          About
        </span>
        <h1>About AttorneyAITools</h1>

        <p className="lead">
          AttorneyAITools is an independent directory and comparison guide for
          AI software built specifically for attorneys and legal teams. We are
          not a law firm, we do not provide legal advice, and we are not
          affiliated with any of the vendors we cover.
        </p>

        <h2>Who runs this site</h2>
        <p>
          AttorneyAITools is operated by an independent team of technology
          researchers and writers. None of our editorial team are licensed
          attorneys. Our background is in software, product, and technical
          writing — we cover legal AI the way independent reviewers cover
          consumer hardware: hands-on, honest, and explicitly disclosing
          limitations.
        </p>

        <h2>Why we exist</h2>
        <p>
          The legal AI market grew from a handful of tools in 2022 to over 100
          purpose-built products by 2026. There was no single, vendor-neutral
          place to compare them on features, pricing, and real-world fit. We
          built AttorneyAITools to be that place. Our promise is simple: every
          tool is listed for free, every comparison reflects our honest
          editorial assessment, and every affiliate link is disclosed.
        </p>

        <h2>What we are not</h2>
        <ul>
          <li>
            <strong>We are not lawyers.</strong> Nothing on this site is legal
            advice. If you are evaluating tools for use in client matters,
            verify accuracy and confidentiality requirements with qualified
            counsel in your jurisdiction.
          </li>
          <li>
            <strong>We are not a vendor.</strong> We do not build, sell, or
            integrate the tools we cover. We have no equity in any vendor.
          </li>
          <li>
            <strong>We are not pay-to-play.</strong> Tool ranking, featured
            placement, and editorial coverage are decided by our team based on
            our published methodology — never by payment.
          </li>
        </ul>

        <h2>Editorial standards</h2>
        <ul>
          <li>
            All tool listings are reviewed by a human editor before publication.
          </li>
          <li>
            Pricing is verified against the vendor&apos;s public pricing page or
            sales-confirmed quote, with a visible &ldquo;last verified&rdquo;
            date on every tool page.
          </li>
          <li>
            Comparisons disclose our verdict in the first 60 words and present
            both tools fairly, not as vendor sales copy.
          </li>
          <li>
            We do not publish AI-generated content as if it were human-written.
            AI assists drafting; a human editor reviews and rewrites every
            page.
          </li>
          <li>
            Errors are corrected publicly with a visible correction notice.
          </li>
        </ul>

        <h2>Our methodology</h2>
        <p>
          For details on how we evaluate, score, and compare legal AI tools,
          see our{" "}
          <Link href="/methodology">methodology page</Link>.
        </p>

        <h2>Affiliate disclosure</h2>
        <p>
          Some links on this site may be affiliate links, meaning we earn a
          small commission if you sign up after clicking. Affiliate
          relationships do not influence editorial coverage or ranking.
          Affiliate links are disclosed on the pages where they appear.
        </p>

        <h2>Contact &amp; corrections</h2>
        <p>
          Spotted an inaccuracy, outdated pricing, or a missing tool? Use our{" "}
          <Link href="/submit-tool">tool submission form</Link> or email us at{" "}
          <a href="mailto:editorial@attorneyaitools.org">
            editorial@attorneyaitools.org
          </a>
          . Corrections are typically published within 48 hours.
        </p>
      </article>
    </>
  );
}
