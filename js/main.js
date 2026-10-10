/* Entry point. */
(function (AR) {
  AR.theme.apply();
  AR.bindEvents();

  const sheet = document.getElementById('sheetLink');
  if (AR.CONFIG.SHEET_URL) {
    sheet.href = AR.CONFIG.SHEET_URL;
    sheet.insertAdjacentHTML('afterbegin', AR.icons.sheet);
    sheet.hidden = false;
  }

  // start downloading the folder photos right away, before the sheet data arrives
  try {
    const c = JSON.parse(localStorage.getItem('oth_data_v1') || 'null');
    const names = (c && c.folders ? c.folders : AR.DEMO.folders).map(f => f.name);
    names.forEach(n => { new Image().src = 'assets/images/' + AR.util.slug(n) + '.jpg'; });
  } catch (e) { /* ignore */ }

  AR.start();
})(window.AR);