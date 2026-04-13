import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How We Test Legal AI Tools",
  description:
    "AttorneyAITools editorial methodology: how we evaluate, score, and compare AI tools built for attorneys. Vendor-neutral, hands-on, transparent.",
  alternates: { canonical: "/methodology" },
};

const SITE_URL = "https://attorneyaitools.org";

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "AttorneyAITools Editorial Methodology",
  description:
    "How we evaluate, score, and compare AI tools for attorneys.",
  url: `${SITE_URL}/methodology`,
  datePublished: "2026-04-12",
  dateModified: "2026-04-12",
  author: { "@type": "Organization", name: "AttorneyAITools", url: SITE_URL },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function MethodologyPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Methodology", url: "/methodology" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-20 prose prose-slate prose-lg prose-headings:font-black prose-headings:tracking-tight">
        <span className="not-prose inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
          Editorial Standards
        </span>
        <h1>How We Test Legal AI Tools</h1>

        <p className="lead">
          This page documents the criteria and process AttorneyAITools uses to
          evaluate AI software for legal professionals. It applies to every
          tool listing, comparison guide, and category roundup on the site.
        </p>

        <h2>What we evaluate</h2>
        <p>Every tool is scored on six dimensions, each weighted equally:</p>
        <ol>
          <li>
            <strong>Accuracy &amp; hallucination resistance.</strong> Does the
            tool ground its outputs in verifiable sources? Does it pass
            standardized prompts without inventing case law or statutes?
          </li>
          <li>
            <strong>Workflow fit.</strong> How cleanly does it integrate with
            Word, Outlook, Westlaw, Lexis, Clio, iManage, NetDocuments, and
            other common legal tooling?
          </li>
          <li>
            <strong>Security &amp; compliance.</strong> SOC 2 Type II,
            attorney-client privilege handling, data residency, retention
            controls, and zero-retention training options.
          </li>
          <li>
            <strong>Pricing transparency.</strong> Is pricing public? Are
            seat-based, usage-based, and enterprise tiers clearly disclosed?
          </li>
          <li>
            <strong>Support &amp; onboarding.</strong> How quickly can a
            non-technical user become productive? What training is provided?
          </li>
          <li>
            <strong>Vendor stability.</strong> Funding, customer base,
            independent reviews, and product velocity over the past 12 months.
          </li>
        </ol>

        <h2>How we test</h2>
        <ul>
          <li>
            We sign up for free tiers, free trials, and where available
            demo accounts. For enterprise-only tools, we rely on vendor demos
            plus published documentation, case studies, and verified user
            reviews on G2, Capterra, and TrustRadius.
          </li>
          <li>
            We run a standard prompt set through every research-and-drafting
            tool: a fact-pattern memo, a contract redline, a brief draft, and
            a citation-check task. Outputs are graded on accuracy, citation
            correctness, and readability.
          </li>
          <li>
            We verify pricing against the vendor&apos;s public pricing page on
            the day of publication and re-verify at least every 90 days. The
            &ldquo;last verified&rdquo; date is visible on every tool page.
          </li>
          <li>
            We do not accept payment for placement, ranking, or coverage.
          </li>
        </ul>

        <h2>How we score</h2>
        <p>
          Each tool receives a 1.0&ndash;5.0 editorial rating. Ratings are
          assigned by a human editor based on the six dimensions above, not by
          a survey or aggregated user reviews. Ratings can change after
          re-evaluation; tools that ship significant new features are
          re-reviewed within 30 days.
        </p>

        <h2>How we write comparisons</h2>
        <p>
          Every comparison guide must include:
        </p>
        <ul>
          <li>A one-sentence verdict in the first 60 words.</li>
          <li>A side-by-side feature table.</li>
          <li>A pricing table verified within the last 90 days.</li>
          <li>
            Explicit &ldquo;Best for...&rdquo; recommendations for at least
            two distinct firm sizes or use cases.
          </li>
          <li>An honest list of trade-offs for both tools.</li>
        </ul>
        <p>
          We never publish &ldquo;X vs Y&rdquo; pieces where one tool is
          obviously better in every dimension; if a comparison would be
          one-sided we publish it as a single review instead.
        </p>

        <h2>Conflicts of interest</h2>
        <p>
          AttorneyAITools may earn affiliate commissions from some vendors
          when readers sign up via our links. Affiliate relationships do not
          influence ranking, scoring, or coverage. We disclose affiliate
          links in-page wherever they appear.
        </p>

        <h2>Corrections policy</h2>
        <p>
          We correct errors as soon as we are aware of them. Material
          corrections are noted with a dated correction notice at the top of
          the affected page. Pricing changes are corrected silently within 48
          hours of vendor notification.
        </p>
      </article>
    </>
  );
}
