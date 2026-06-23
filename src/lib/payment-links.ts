// Hosted checkout links (PayU Payment Links, Stripe, etc.).
//
// Two groups:
//  - APP_PLAN_LINKS: Shielded subscription plans, used on the homepage pricing.
//  - LISTING_PAYMENT_LINKS: paid attorney directory listings, used on
//    /submit-attorney.
//
// When a link is set, the button goes straight to checkout (new tab). When it's
// empty, the button falls back to the app (plans) or the listing form (listings).

export const APP_PLAN_LINKS: Record<string, string> = {
  Free: "", // free — uses the app's free analysis
  Basic: "https://u.payu.in/Grb2npNXa90Z", // $50/mo
  Premium: "https://u.payu.in/Vrp2MpWXN9yW", // $150/mo
  Enterprise: "", // custom — uses "Talk to us"
};

export function getPlanPaymentLink(plan: string): string {
  return APP_PLAN_LINKS[plan] || "";
}

export const LISTING_PAYMENT_LINKS: Record<string, string> = {
  "Free Listing": "", // free — always uses the form
  Featured: "", // $49/mo — paste payment link here
  Spotlight: "", // $99/mo — paste payment link here
};

export function getListingPaymentLink(tier: string): string {
  return LISTING_PAYMENT_LINKS[tier] || "#listing-form";
}
