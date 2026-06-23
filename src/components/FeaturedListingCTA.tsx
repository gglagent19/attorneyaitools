"use client";

import { trackEvent } from "@/lib/analytics";

interface FeaturedListingCTAProps {
  tier: string;
  label: string;
  href?: string;
  className?: string;
}

/**
 * CTA for paid attorney listing tiers. Records a GA4 `featured_listing_intent`
 * event (with the tier) so we can measure demand for paid placements, then
 * sends the attorney to the listing form.
 */
export default function FeaturedListingCTA({
  tier,
  label,
  href = "#listing-form",
  className,
}: FeaturedListingCTAProps) {
  const isExternal = /^https?:\/\//.test(href);

  function handleClick() {
    trackEvent("featured_listing_intent", {
      tier,
      has_payment_link: isExternal,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}
