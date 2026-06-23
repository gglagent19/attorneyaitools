"use client";

import { trackEvent } from "@/lib/analytics";

interface CheckoutCTAProps {
  plan: string;
  price: number;
  href: string;
  label: string;
  className?: string;
}

/**
 * Sends a user to hosted checkout for a Shielded plan and records a GA4
 * `plan_checkout_click` event (plan + price) so paid-intent is measured.
 */
export default function CheckoutCTA({
  plan,
  price,
  href,
  label,
  className,
}: CheckoutCTAProps) {
  function handleClick() {
    trackEvent("plan_checkout_click", { plan, value: price, currency: "USD" });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
