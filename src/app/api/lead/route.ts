import { NextRequest, NextResponse } from "next/server";

// Default lead destination — the Google Apps Script web app bound to the
// "Shielded Leads" sheet. Override with the LEAD_WEBHOOK_URL env var if needed.
const DEFAULT_LEAD_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbw8GKNMii1DKZV4JhZSWzSlT_6ry0PzazdyNT6waW2pZAaypugbvFALf5-fCL6anWzy4Q/exec";

/**
 * Lead capture endpoint — consumer "match me with a lawyer" requests and
 * attorney "feature my listing" intents.
 *
 * Persistence: the serverless filesystem is ephemeral, so leads are (a) logged
 * and (b) forwarded to LEAD_WEBHOOK_URL if set (wire this to a Google Sheet,
 * Zapier, Make, or a CRM/email service). Set the env var in Vercel to start
 * capturing for real — no code change needed.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Minimal validation — a lead needs a way to reach the person.
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    if (!email && !phone) {
      return NextResponse.json(
        { success: false, message: "A phone or email is required." },
        { status: 400 }
      );
    }

    const lead = {
      kind: data.kind || "consumer_lead", // "consumer_lead" | "featured_listing"
      ...data,
      received_at: new Date().toISOString(),
      source_path: data.source_path || null,
    };

    console.log("Lead received:", lead);

    const webhook = process.env.LEAD_WEBHOOK_URL || DEFAULT_LEAD_WEBHOOK;
    if (webhook) {
      // Fire-and-forward; don't fail the user's submission if the webhook is down.
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (err) {
        console.error("Lead webhook failed:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Received. We'll be in touch shortly." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid submission." },
      { status: 400 }
    );
  }
}
