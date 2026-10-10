/* Small helpers with no dependency on app state. */
(function (AR) {
  const U = {};

  U.$ = (selector, root = document) => root.querySelector(selector);

  U.esc = value => String(value ?? '').replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));

  U.num = value => Number(value) || 0;
  U.pkr = value => 'PKR ' + U.num(value).toLocaleString('en-PK');
  U.compact = value => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(U.num(value));
  U.pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);

  U.fmtDate = value => {
    if (!value) return '';
    const d = new Date(String(value).slice(0, 10) + 'T00:00:00');
    return isNaN(d) ? String(value) : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  U.timeAgo = ms => {
    const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
    if (s < 10) return 'just now';
    if (s < 60) return `${s}s ago`;
    const m = Math.round(s / 60);
    return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
  };

  U.safeJSON = text => { try { return JSON.parse(text); } catch (e) { return null; } };

  /** "Keyboard & Mouse" -> "keyboard-and-mouse" (used for image file names and URLs) */
  U.slug = name => String(name).toLowerCase().replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  /** Match a typed status to one of AR.STATUSES, ignoring case and extra spaces. */
  U.normStatus = value => {
    const v = String(value ?? '').trim();
    return AR.STATUSES.find(s => s.toLowerCase() === v.toLowerCase()) || v;
  };

  U.statusClass = status => ({
    'In Use': 's-inuse', 'In Stock': 's-instock', 'Damaged': 's-damaged', 'Broken': 's-broken'
  }[U.normStatus(status)] || 's-other');

  /** Empty Qty counts as 1 unit. */
  U.qty = row => (row['Qty'] === '' || row['Qty'] == null ? 1 : U.num(row['Qty']));

  /** Unit counts for a folder's rows. */
  U.summarize = rows => {
    const by = { 'In Use': 0, 'In Stock': 0, 'Damaged': 0, 'Broken': 0 };
    let total = 0, other = 0;
    rows.forEach(r => {
      const q = U.qty(r);
      const s = U.normStatus(r['Status']);
      total += q;
      if (s in by) by[s] += q; else other += q;
    });
    return { total, by, other, faulty: by['Damaged'] + by['Broken'] };
  };

  U.matches = (row, needle) => {
    const n = needle.trim().toLowerCase();
    return !n || Object.values(row).some(v => String(v ?? '').toLowerCase().includes(n));
  };

  AR.util = U;
})(window.AR);
