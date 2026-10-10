/* User interaction (event delegation). Nothing here can change the data. */
(function (AR) {
  const S = AR.state;

  function onClick(e) {
    const t = e.target.closest('[data-tab],[data-sort],[data-act]');
    if (!t) return;

    if (t.dataset.tab) { S.tab = t.dataset.tab; return AR.render(); }
    if (t.dataset.sort) {
      if (S.sort.k === t.dataset.sort) S.sort.d *= -1; else S.sort = { k: t.dataset.sort, d: 1 };
      return AR.render();
    }
    if (t.dataset.act === 'csv') AR.exportCsv();
  }

  function onInput(e) {
    if (e.target.id !== 'q') return;
    S.q = e.target.value;
    S.refocusSearch = true;
    AR.render();
  }

  AR.bindEvents = function () {
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    window.addEventListener('hashchange', AR.onRoute);
  };
})(window.AR);