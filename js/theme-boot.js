/* Runs in <head> before the page paints, so the saved theme shows with no flash. */
(function () {
  var theme = 'tech';
  try {
    var saved = JSON.parse(localStorage.getItem('oth_cfg') || '{}');
    if (saved && saved.theme) theme = saved.theme;
  } catch (e) { /* ignore broken storage */ }
  document.documentElement.setAttribute('data-theme', theme);
})();
