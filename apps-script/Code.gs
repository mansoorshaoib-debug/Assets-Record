/**
 * OTH TECH Asset Record - Google Apps Script (READ ONLY)
 *
 * Yeh code Google Sheet ke har tab ko web page par ek "folder" ke taur par bhejta hai.
 * Is mein likhne ya delete karne ka koi code nahi hai, isliye web page se sheet
 * badli nahi ja sakti. Sheet sirf Google Sheets mein edit hogi.
 *
 * SETUP (sirf ek baar):
 * 1. Excel file ko Google Drive mein upload karein -> Open with Google Sheets
 *    -> File > Save as Google Sheets.
 * 2. Sheet mein: Extensions > Apps Script. Purana code hata kar yeh poora code paste karein.
 * 3. (Optional) neeche READ_KEY set karein. Khali chhorne par passcode nahi maanga jata.
 * 4. Deploy > New deployment > Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    Deploy dabayein, permissions allow karein, "Web app URL" copy karein.
 * 5. Us URL ko js/config.js mein SCRIPT_URL ke saamne paste karein.
 *
 * Code badalne par: Deploy > Manage deployments > Edit > New version > Deploy.
 */

const READ_KEY = '';   // optional: same value js/config.js ke READ_KEY mein daalein

// In tabs ko web page par nahi dikhaya jata. "_" se shuru hone wale tabs bhi chhup jate hain.
const HIDDEN_TABS = ['Read Me', 'Summary', 'Lists'];

function doGet(e) {
  try {
    const p = (e && e.parameter) || {};
    if (READ_KEY && p.key !== READ_KEY) return out_({ ok: false, error: 'Wrong passcode' });

    const tz = Session.getScriptTimeZone();
    const folders = SpreadsheetApp.getActive().getSheets()
      .filter(sh => HIDDEN_TABS.indexOf(sh.getName()) < 0 && sh.getName().charAt(0) !== '_')
      .map(sh => readSheet_(sh, tz));

    return out_({ ok: true, updated: new Date().toISOString(), folders: folders });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function readSheet_(sh, tz) {
  const last = sh.getLastRow();
  const cols = sh.getLastColumn();
  if (last < 1 || cols < 1) return { name: sh.getName(), columns: [], rows: [] };

  const values = sh.getRange(1, 1, last, cols).getValues();
  const columns = values[0].map(h => String(h).trim());
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row.every(v => v === '' || v === null)) continue;     // skip empty rows
    const o = {};
    columns.forEach((h, c) => {
      if (!h) return;
      const v = row[c];
      o[h] = (v instanceof Date) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : v;
    });
    rows.push(o);
  }
  return { name: sh.getName(), columns: columns.filter(Boolean), rows: rows };
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
