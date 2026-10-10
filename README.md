# OTH TECH Asset Record

A read-only website. The home page shows one folder per kind of equipment, drawn as a
picture. Click a folder to see how many units are in use, in stock, damaged or broken,
with every record listed. The data comes from a Google Sheet; the website cannot change it.

## Folder layout

    index.html                 open this
    css/
      tokens.css               sizes and fonts
      themes/                  tech.css (default), corporate.css, navy.css  <- all colours
      base.css layout.css components.css art.css folders.css detail.css responsive.css print.css
    js/
      config.js                the only file you edit
      utils.js icons.js art.js state.js api.js theme.js table.js
      views/                   home.js folder.js purchases.js
      app.js events.js main.js theme-boot.js
      demo-data.js             sample data, used until the sheet is linked
    assets/
      images/                  your own photos for the folders (optional)
      video/                   office-bg.mp4 for a looping background (optional)
    apps-script/Code.gs        read-only backend for the Google Sheet
    data/OTH_TECH_Asset_Record.xlsx   the sheet to upload

## How the Google Sheet maps to the website

- Every tab is a folder. The tab name is the folder name (Screens, Mobiles, Cables ...).
  Add a tab and a new folder appears. Drag tabs to change the order.
- Every folder tab uses the same columns in row 1:
  Asset ID, Item, Brand, Model, Serial No, Qty, Status, Assigned To, Location, Purchase Date, Remarks
- Status is one of: In Use, In Stock, Damaged, Broken (a dropdown is set in the sample sheet).
- Phones, screens, laptops: one row per item, Qty 1.
  Cables, connectors, stands: one row per status, for example
  "Type-C Cable, Qty 20, In Use", then "Type-C Cable, Qty 6, In Stock", then "Type-C Cable, Qty 2, Damaged".
- A tab called Purchases becomes the purchases folder (spending totals and list).
- Tabs named Summary, Read Me or Lists, or starting with _, are not shown.
- An empty Qty counts as 1.

## Set it up (once)

1. Upload `data/OTH_TECH_Asset_Record.xlsx` to Google Drive, open it with Google Sheets,
   then File > Save as Google Sheets. Replace the sample rows with your own.
2. In that sheet: Extensions > Apps Script. Delete the old code, paste `apps-script/Code.gs`.
3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy,
   allow permissions, copy the Web app URL.
4. Open `js/config.js`, paste the URL into `SCRIPT_URL`. Optionally paste the sheet's normal
   link into `SHEET_URL` to show an "Open Google Sheet" button.
5. Open `index.html`. Changes in the sheet appear within a minute (or press the refresh button).

`Code.gs` has only a read function, so nobody can change the sheet through the website.
Anyone who has the web app URL can read the data; to require a passcode, set `READ_KEY`
in `Code.gs` and the same value in `js/config.js`.

## Pictures

Each folder gets a drawing chosen from its tab name (screen, phone, cable, connector,
laptop, stand, printer and so on). To use a real photo instead, save it as
`assets/images/<tab name>.jpg`, lower case with dashes: `screens.jpg`, `laptop-stands.jpg`,
`keyboard-and-mouse.jpg`. PNG and WebP also work. Landscape photos around 1200 x 750 look best.

Folder names are printed on each picture (SHOW_FOLDER_NAMES in js/config.js). Folders with no photo, such as Chargers, keep the drawing.

## Themes and background

Three themes (Tech, Corporate, Navy) switch from the dots in the top bar. To add one, copy a
file in `css/themes/`, change the selector and colours, link it in `index.html` and list it in
`THEMES` in `js/config.js`. For a looping background video see `assets/video/README.md`.
