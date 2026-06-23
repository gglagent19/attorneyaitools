/**
 * Google Apps Script — Lead capture endpoint for AttorneyAITools / Shielded.
 *
 * Receives leads from /api/lead (consumer attorney-match requests and attorney
 * featured-listing intents) and appends each as a row in this spreadsheet.
 *
 * SETUP (see MARKETING/LEAD-CAPTURE-SETUP.md):
 *   1. Create a Google Sheet.
 *   2. Extensions → Apps Script → paste this file → Save.
 *   3. Deploy → New deployment → type "Web app" → Execute as: Me →
 *      Who has access: "Anyone" → Deploy → copy the Web app URL.
 *   4. In Vercel, set env var LEAD_WEBHOOK_URL = that URL. Redeploy.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'received_at', 'kind', 'name', 'email', 'phone',
        'state', 'claim_type', 'details', 'source_path', 'tier', 'raw_json'
      ]);
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.received_at || new Date().toISOString(),
      d.kind || '',
      d.name || '',
      d.email || '',
      d.phone || '',
      d.state || '',
      d.claim_type || '',
      d.details || '',
      d.source_path || '',
      d.tier || '',
      JSON.stringify(d)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you confirm the endpoint is live by visiting the URL.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'lead-capture' }))
    .setMimeType(ContentService.MimeType.JSON);
}
