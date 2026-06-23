# Lead Capture → Google Sheet (5-minute setup)

Leads from `/find-a-lawyer` (consumer→attorney matches) and `/submit-attorney`
(featured-listing intents) POST to `/api/lead`, which forwards them to whatever
URL is in the `LEAD_WEBHOOK_URL` env var. Point that at a Google Sheet and every
lead lands in a row automatically. No database needed.

## Steps

1. **Create the sheet.** Go to [sheets.new](https://sheets.new) and name it
   e.g. "Shielded Leads".

2. **Add the script.** In the sheet: **Extensions → Apps Script**. Delete the
   placeholder code, paste the entire contents of
   `scripts/lead-capture-apps-script.gs`, and click **Save** (disk icon).

3. **Deploy as a web app.** Click **Deploy → New deployment**. Click the gear →
   **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**
   Click **Deploy**, authorize when prompted, and **copy the Web app URL**
   (looks like `https://script.google.com/macros/s/AKfy.../exec`).

4. **Wire it up in Vercel.** Project → Settings → Environment Variables →
   add `LEAD_WEBHOOK_URL` = the URL from step 3 (Production + Preview). Redeploy.

## Verify

Submit a test lead on `/find-a-lawyer` after deploy → a new row should appear in
the sheet's **Leads** tab within a second. The `kind` column distinguishes
`consumer_lead` from `featured_listing` (attorney upgrade intents).

## Columns captured

`received_at · kind · name · email · phone · state · claim_type · details ·
source_path · tier · raw_json`

`source_path` tells you **which page** produced the lead (e.g. a specific claim
page) — use it the same way as the GA `page_path` dimension to see what converts.

## Notes

- The same `LEAD_WEBHOOK_URL` can later point to Zapier/Make/a CRM instead — no
  code change. The payload is JSON.
- This is a "for now" pipeline. When volume grows, swap to a real DB + email
  alerts on new high-value leads.
