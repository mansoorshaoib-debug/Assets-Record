/* Purchases folder: spending figures and the purchase table. */
(function (AR) {
  const U = AR.util;
  const S = AR.state;
  const { icons } = AR;

  AR.views = AR.views || {};

  /** Money for one purchase row: Total column if present, else Qty x Unit Price. */
  const rowTotal = r => (r['Total (PKR)'] !== '' && r['Total (PKR)'] != null
    ? U.num(r['Total (PKR)']) : U.num(r['Qty']) * U.num(r['Unit Price (PKR)']));

  AR.views.purchaseFigures = function (folder) {
    const year = String(new Date().getFullYear());
    return {
      spend: folder.rows.reduce((s, r) => s + rowTotal(r), 0),
      units: folder.rows.reduce((s, r) => s + U.num(r['Qty']), 0),
      year: folder.rows.filter(r => String(r['Date']).startsWith(year)).reduce((s, r) => s + rowTotal(r), 0),
      yearLabel: year
    };
  };

  const card = (label, value, note, color) => `
    <div class="panel stat" style="--c:${color}">
      <div class="l">${label}</div>
      <div class="v" style="font-size:28px">${value}</div>
      <div class="d">${note}</div>
    </div>`;

  AR.views.purchases = function (folder) {
    const p = AR.views.purchaseFigures(folder);
    const rows = AR.table.sortRows(
      [...folder.rows].sort((a, b) => String(b['Date']).localeCompare(String(a['Date']))).filter(r => U.matches(r, S.q)));
    S.visibleRows = rows;

    return `
      ${AR.views.folderHead(folder, `${folder.rows.length} purchases recorded`)}
      <div class="stats">
        ${card('Total spent', U.pkr(p.spend), 'all recorded purchases', 'var(--accent)')}
        ${card(`Spent in ${p.yearLabel}`, U.pkr(p.year), 'this calendar year', 'var(--s-inuse)')}
        ${card('Purchases', folder.rows.length.toLocaleString(), 'entries in the sheet', 'var(--s-instock)')}
        ${card('Units bought', p.units.toLocaleString(), 'across all purchases', 'var(--s-damaged)')}
      </div>
      <section class="panel records">
        <div class="records-bar">
          <span class="count">Newest first. Click a column to sort.</span>
          <div class="search">${icons.search}<input id="q" type="search" placeholder="Search purchases" value="${U.esc(S.q)}" aria-label="Search purchases"></div>
        </div>
        ${AR.table.render(folder, rows)}
        <div class="foot">Showing ${rows.length} of ${folder.rows.length} purchases · ${U.pkr(rows.reduce((s, r) => s + rowTotal(r), 0))}</div>
      </section>`;
  };
})(window.AR);
