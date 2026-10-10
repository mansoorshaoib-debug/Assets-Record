/* Home: totals and the folder tiles. */
(function (AR) {
  const U = AR.util;
  const S = AR.state;
  const { icons, art } = AR;

  AR.views = AR.views || {};

  const STATUS_COLOR = { inuse: 'var(--s-inuse)', instock: 'var(--s-instock)', damaged: 'var(--s-damaged)', broken: 'var(--s-broken)' };

  const total = (label, value, note, color) => `
    <div class="panel total" style="--c:${color}">
      <div class="l">${label}</div>
      <div class="v">${value}</div>
      <div class="n">${note}</div>
    </div>`;

  const tileStat = (label, value, color) =>
    `<div class="tile-stat"><div class="l" style="color:${color}"><i></i><span style="color:var(--muted)">${label}</span></div><div class="v">${value}</div></div>`;

  const bar = parts => `<div class="tile-bar">${parts.filter(([n]) => n > 0)
    .map(([n, color]) => `<span style="flex:${n};background:${color}"></span>`).join('')}</div>`;

  function itemsTile(f) {
    const s = U.summarize(f.rows);
    return `
      <a class="folder" href="#/f/${f.slug}" title="${U.esc(f.name)}" aria-label="${U.esc(f.name)}, ${s.total} units">
        <div class="folder-face">
          <div class="stage">${art.pic(f.name)}${AR.CONFIG.SHOW_FOLDER_NAMES ? `<span class="folder-name">${U.esc(f.name)}</span>` : ''}</div>
          <div class="tile-body">
            <div class="tile-stats">
              ${tileStat('In use', s.by['In Use'], STATUS_COLOR.inuse)}
              ${tileStat('In stock', s.by['In Stock'], STATUS_COLOR.instock)}
              ${tileStat('Faulty', s.faulty, STATUS_COLOR.damaged)}
            </div>
            ${bar([[s.by['In Use'], STATUS_COLOR.inuse], [s.by['In Stock'], STATUS_COLOR.instock],
                   [s.by['Damaged'], STATUS_COLOR.damaged], [s.by['Broken'], STATUS_COLOR.broken]])}
            <div class="tile-open"><span>Open records</span>${icons.arrow}</div>
          </div>
        </div>
      </a>`;
  }

  function purchasesTile(f) {
    const p = AR.views.purchaseFigures(f);
    return `
      <a class="folder" href="#/f/${f.slug}" title="${U.esc(f.name)}" aria-label="${U.esc(f.name)}, ${f.rows.length} entries">
        <div class="folder-face">
          <div class="stage">${art.pic(f.name)}${AR.CONFIG.SHOW_FOLDER_NAMES ? `<span class="folder-name">${U.esc(f.name)}</span>` : ''}</div>
          <div class="tile-body">
            <div class="tile-stats">
              ${tileStat('Entries', f.rows.length, 'var(--accent)')}
              ${tileStat('Units', p.units, 'var(--s-instock)')}
              ${tileStat('This year', U.compact(p.year), 'var(--s-inuse)')}
            </div>
            <div class="tile-open"><span>Open records</span>${icons.arrow}</div>
          </div>
        </div>
      </a>`;
  }

  AR.views.home = function () {
    const items = S.folders.filter(f => f.kind === 'items');
    const all = U.summarize(items.flatMap(f => f.rows));

    return `
      <div class="totals">
        ${total('Total units', all.total.toLocaleString(), `across ${items.length} folders`, 'var(--accent)')}
        ${total('In use', all.by['In Use'].toLocaleString(), `${U.pct(all.by['In Use'], all.total)}% of all units`, 'var(--s-inuse)')}
        ${total('In stock', all.by['In Stock'].toLocaleString(), 'ready to be issued', 'var(--s-instock)')}
        ${total('Damaged or broken', all.faulty.toLocaleString(), 'needs attention', 'var(--s-damaged)')}
      </div>
      <div class="section-head">
        <h2>Asset folders</h2>
        <p>Choose a folder to see what is in use, in stock and faulty.</p>
      </div>
      ${S.folders.length
        ? `<div class="folders">${S.folders.map(f => (f.kind === 'purchases' ? purchasesTile(f) : itemsTile(f))).join('')}</div>`
        : '<div class="state">No folders found. Add tabs to the Google Sheet.</div>'}`;
  };
})(window.AR);
