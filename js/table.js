/* Generic read-only table: shows whatever columns the Google Sheet tab has. */
(function (AR) {
  const U = AR.util;
  const S = AR.state;

  const isId = c => /^asset id$|invoice/i.test(c);
  const isQty = c => /^qty$/i.test(c);
  const isStatus = c => /status/i.test(c);
  const isMoney = c => /pkr|price|cost|total/i.test(c);
  const isDate = c => /date/i.test(c);
  const isEmpty = v => v === '' || v == null;

  /** Columns that have at least one value. */
  function visibleColumns(folder) {
    return folder.columns.filter(c => folder.rows.some(r => !isEmpty(r[c])));
  }

  function sortRows(rows) {
    const { k, d } = S.sort;
    if (!k) return rows;
    return [...rows].sort((a, b) => {
      const x = a[k], y = b[k];
      if (typeof x === 'number' && typeof y === 'number') return (x - y) * d;
      return String(x ?? '').localeCompare(String(y ?? ''), undefined, { numeric: true }) * d;
    });
  }

  function cell(col, value, isFirstText) {
    if (isEmpty(value)) return `<td class="${isQty(col) || isMoney(col) ? 'num' : ''}"><span class="dash">–</span></td>`;
    if (isStatus(col)) {
      const s = U.normStatus(value);
      return `<td><span class="badge ${U.statusClass(s)}"><span>${U.esc(s)}</span></span></td>`;
    }
    if (isQty(col)) return `<td class="num">${U.num(value).toLocaleString('en-PK')}</td>`;
    if (isMoney(col) && !isNaN(Number(value))) return `<td class="num">${U.num(value).toLocaleString('en-PK')}</td>`;
    if (isDate(col)) return `<td class="nowrap">${U.esc(U.fmtDate(value))}</td>`;
    if (isId(col)) return `<td class="id">${U.esc(value)}</td>`;
    return `<td class="${isFirstText ? 'strong' : ''}">${U.esc(value)}</td>`;
  }

  function header(col) {
    const active = S.sort.k === col;
    const arrow = active ? `<span class="arr">${S.sort.d > 0 ? '▲' : '▼'}</span>` : '';
    const aria = active ? (S.sort.d > 0 ? 'ascending' : 'descending') : 'none';
    const num = isQty(col) || isMoney(col) ? 'num' : '';
    return `<th class="${num}" aria-sort="${aria}"><button data-sort="${U.esc(col)}">${U.esc(col)}${arrow}</button></th>`;
  }

  AR.table = {
    sortRows,

    render(folder, rows) {
      const cols = visibleColumns(folder);
      const firstText = cols.find(c => !isId(c) && !isStatus(c) && !isQty(c) && !isDate(c) && !isMoney(c));
      const body = rows.map(r =>
        `<tr>${cols.map(c => cell(c, r[c], c === firstText)).join('')}</tr>`).join('');
      return `
        <div class="tablewrap"><table>
          <thead><tr>${cols.map(header).join('')}</tr></thead>
          <tbody>${body || `<tr><td colspan="${cols.length || 1}"><div class="empty">No records match. Clear the search or pick another tab.</div></td></tr>`}</tbody>
        </table></div>`;
    },

    visibleColumns
  };
})(window.AR);
