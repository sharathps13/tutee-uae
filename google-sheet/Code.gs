/**
 * Tutee Connect — website leads into this Google Sheet.
 *
 * The website's enquiry function (netlify/functions/enquiry.mjs) posts each new
 * lead here as JSON. This script checks the shared secret and adds one row in the
 * sheet's column order:
 *   Date | Time | Full Name | Phone Number | Email | State |
 *   Shortlisted Universities | Course | Lead Source | Preferred Call Time
 *
 * Setup: see SETUP.md next to this file.
 */

// Must match GOOGLE_SHEET_TOKEN in Netlify. Use a long random string of your own.
var TOKEN = 'PASTE-THE-SAME-SECRET-AS-IN-NETLIFY';

// The tab the leads go to. Leave '' to use the first tab of the spreadsheet.
var SHEET_NAME = '';

var COLUMNS = ['date', 'time', 'full_name', 'phone', 'email', 'state',
  'shortlisted_universities', 'course', 'lead_source', 'preferred_call_time'];

function doPost(e) {
  var out = function (obj) {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  };
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!TOKEN || body.token !== TOKEN) return out({ ok: false, error: 'unauthorised' });
    var row = body.row || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (!sheet) return out({ ok: false, error: 'sheet not found' });

    var values = COLUMNS.map(function (k) {
      var v = row[k] == null ? '' : String(row[k]).slice(0, 300);
      // keep phone numbers like +91 98765 43210 as text, and stop any value being read as a formula
      if (k === 'phone' || /^[=+\-@]/.test(v)) v = "'" + v;
      return v;
    });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try { sheet.appendRow(values); } finally { lock.releaseLock(); }

    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

// Opening the web-app URL in a browser just confirms it is live.
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'tutee-connect-leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}
