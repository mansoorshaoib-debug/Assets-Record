/* =====================================================================
   The one file you may edit.
   SCRIPT_URL : Google Apps Script "Web app URL" (see README.md).
                Leave empty to show the built-in sample data.
   ===================================================================== */
window.AR = {
  CONFIG: {
    SCRIPT_URL:'https://script.google.com/macros/s/AKfycbzfCX4xPqLRinlfoTCp44IIU7rWxfo4YWSf0kFPJvbZVlZDAAClSE1fCLvAcbxhQFXI/exec',
    READ_KEY: '',                    // only if you set READ_KEY in Code.gs
    SHEET_URL: '',                   // link for the "Open Google Sheet" button (optional)
    REFRESH_SECONDS: 1,             // how often the page re-reads the sheet
    SHOW_FOLDER_NAMES:true,        // true = also write the folder name on each picture
    PHOTO_EXTS: ['jpg', 'png', 'webp'],   // assets/images/<folder-name>.jpg replaces the drawing
    WALLPAPER_URL: '',               // optional still image for the background
    VIDEO_SRC: 'assets/video/office-bg.mp4',
    DEFAULT_THEME: 'tech'
  },

  /* Status names used in the "Status" column of every sheet tab. */
  STATUSES: ['In Use', 'In Stock', 'Damaged', 'Broken'],
  STATUS_NOTE: {
    'In Use': 'Assigned and working',
    'In Stock': 'Ready to be issued',
    'Damaged': 'Faulty, needs repair',
    'Broken': 'Broken, out of service'
  },

  THEMES: [
    { id: 'tech', name: 'Tech' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'navy', name: 'Navy' }
  ]
};
