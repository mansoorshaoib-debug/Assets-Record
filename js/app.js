/* Routing, rendering, auto-refresh and CSV export. */
(function (AR) {
  const U = AR.util;
  const S = AR.state;

  /* ---------- header ---------- */
  function renderSync() {
    const el = U.$('#sync');
    let cls = 'sync', text;
    if (S.error) { cls += ' err'; text = 'Could not refresh, showing last data'; }
    else if (!S.live) { cls += ' demo'; text = 'Demo data, sheet not linked'; }
    else { text = `Synced with Google Sheets · ${U.timeAgo(S.fetchedAt)}`; }
    el.className = cls;
    U.$('#syncText').textContent = text;
  }

  /* ---------- pages ---------- */
  function parseRoute() {
    const m = location.hash.match(/^#\/f\/([^/?]+)/);
    S.route = m ? { name: 'folder', slug: decodeURIComponent(m[1]) } : { name: 'home', slug: '' };
  }

  AR.render = function () {
    const main = U.$('#main');
    renderSync();

    if (S.loading) { main.innerHTML = '<div class="loading">Loading records…</div>'; return; }
    if (S.error && !S.folders.length) {
      main.innerHTML = `<div class="state"><div><b>Could not read the Google Sheet.</b><p>${U.esc(S.error)}</p>
        <p>Check the web app URL in js/config.js and that access is set to Anyone.</p></div></div>`;
      return;
    }

    const folder = S.route.name === 'folder' ? S.folders.find(f => f.slug === S.route.slug) : null;
    const demo = !S.live ? '<div class="banner">Showing sample data. Link your Google Sheet in <b>js/config.js</b> to see real records.</div>' : '';

    if (folder) main.innerHTML = folder.kind === 'purchases' ? AR.views.purchases(folder) : AR.views.folder(folder);
    else main.innerHTML = demo + AR.views.home();

    AR.art.hydrate(main);
    const q = U.$('#q');
    if (q && S.refocusSearch) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
    S.refocusSearch = false;
  };

  AR.onRoute = function () {
    parseRoute();
    AR.resetView();
    AR.render();
    window.scrollTo(0, 0);
  };

  /* ---------- data ---------- */
  AR.refresh = async function (manual) {
    const btn = U.$('#refresh');
    btn.classList.add('spin');
    try {
      await AR.api.load();
    } catch (err) {
      S.error = err.message || String(err);
    }
    S.loading = false;
    btn.classList.remove('spin');
    AR.render();
  };

  function startAutoRefresh() {
    const seconds = AR.CONFIG.REFRESH_SECONDS;
    if (!seconds || !AR.CONFIG.SCRIPT_URL) return;
    setInterval(() => { if (document.visibilityState === 'visible') AR.refresh(); }, seconds * 1000);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Date.now() - S.fetchedAt > 15000) AR.refresh();
    });
  }

  /* ---------- CSV ---------- */
  AR.exportCsv = function () {
    const folder = S.folders.find(f => f.slug === S.route.slug);
    const rows = S.visibleRows;
    if (!folder || !rows.length) return;
    const cols = AR.table.visibleColumns(folder);
    const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.map(cell).join(',')].concat(rows.map(r => cols.map(c => cell(r[c])).join(','))).join('\r\n');

    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }));
    link.download = `${folder.slug}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  AR.start = async function () {
    parseRoute();
    AR.render();
    await AR.refresh();
    startAutoRefresh();
    setInterval(renderSync, 15000);
  };
})(window.AR);
