/* Entry point. */
(function (AR) {
  AR.theme.apply();
  AR.bindEvents();
  document.getElementById('refresh').innerHTML = AR.icons.refresh;

  const sheet = document.getElementById('sheetLink');
  if (AR.CONFIG.SHEET_URL) {
    sheet.href = AR.CONFIG.SHEET_URL;
    sheet.insertAdjacentHTML('afterbegin', AR.icons.sheet);
    sheet.hidden = false;
  }

  AR.start();
})(window.AR);
