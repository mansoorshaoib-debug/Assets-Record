/* Folder page for equipment: stat cards, tabs, search and the record table. */
(function (AR) {
  const U = AR.util;
  const S = AR.state;
  const { icons, art } = AR;

  AR.views = AR.views || {};

  const TABS = [
    { id: 'all', label: 'All', test: () => true, count: s => s.total },
    { id: 'inuse', label: 'In Use', test: r => U.normStatus(r['Status']) === 'In Use', count: s => s.by['In Use'] },
    { id: 'instock', label: 'In Stock', test: r => U.normStatus(r['Status']) === 'In Stock', count: s => s.by['In Stock'] },
    { id: 'faulty', label: 'Damaged / Broken', test: r => ['Damaged', 'Broken'].includes(U.normStatus(r['Status'])), count: s => s.faulty }
  ];

  const STAT_COLOR = { 'In Use': 'var(--s-inuse)', 'In Stock': 'var(--s-instock)', 'Damaged': 'var(--s-damaged)', 'Broken': 'var(--s-broken)' };

  const statCard = (status, units, total) => `
    <div class="panel stat" style="--c:${STAT_COLOR[status]}">
      <div class="l">${status}</div>
      <div class="v">${units.toLocaleString()}<small>${U.pct(units, total)}%</small></div>
      <div class="d">${AR.STATUS_NOTE[status]}</div>
    </div>`;

  /** Header block shared with the purchases page. */
  AR.views.folderHead = function (folder, subtitle) {
    const sheet = AR.CONFIG.SHEET_URL
      ? `<a class="btn" href="${U.esc(AR.CONFIG.SHEET_URL)}" target="_blank" rel="noopener">${icons.sheet}Open Google Sheet</a>` : '';
    return `
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">All folders</a>${icons.chevron}<span>${U.esc(folder.name)}</span></nav>
      <div class="detail-head">
        <div class="detail-pic">${art.pic(folder.name)}</div>
        <div><h1>${U.esc(folder.name)}</h1><div class="sub">${subtitle}</div></div>
        <div class="head-actions">${sheet}<button class="btn" data-act="csv">${icons.download}Export CSV</button></div>
      </div>
      <div class="banner">${icons.lock.replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:6px"')}This page is read-only. Records are changed in the Google Sheet and show up here within a minute.</div>`;
  };

  AR.views.folder = function (folder) {
    const sum = U.summarize(folder.rows);
    const tab = TABS.find(t => t.id === S.tab) || TABS[0];
    const rows = AR.table.sortRows(folder.rows.filter(r => tab.test(r) && U.matches(r, S.q)));
    S.visibleRows = rows;

    const tabs = TABS.map(t =>
      `<button class="tab" data-tab="${t.id}" aria-pressed="${t.id === tab.id}">${t.label}<b>${t.count(sum)}</b></button>`).join('');
    const other = sum.other ? ` · ${sum.other} units with another status` : '';

    return `
      ${AR.views.folderHead(folder, `${sum.total.toLocaleString()} units in ${folder.rows.length} records${other}`)}
      <div class="stats">
        ${['In Use', 'In Stock', 'Damaged', 'Broken'].map(s => statCard(s, sum.by[s], sum.total)).join('')}
      </div>
      <section class="panel records">
        <div class="records-bar">
          <div class="tabs" role="group" aria-label="Filter by status">${tabs}</div>
          <div class="search">${icons.search}<input id="q" type="search" placeholder="Search this folder" value="${U.esc(S.q)}" aria-label="Search this folder"></div>
        </div>
        ${AR.table.render(folder, rows)}
        <div class="foot">Showing ${rows.length} of ${folder.rows.length} records · ${U.summarize(rows).total.toLocaleString()} units</div>
      </section>`;
  };
})(window.AR);
