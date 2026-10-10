/* Reads the Google Sheet through the read-only Apps Script, or the demo data. */
(function (AR) {
  const { slug } = AR.util;
  const S = AR.state;

  const isPurchases = name => /purchase/i.test(name);

  function normalize(rawFolders) {
    return rawFolders.map(f => ({
      name: f.name,
      slug: slug(f.name),
      kind: isPurchases(f.name) ? 'purchases' : 'items',
      columns: f.columns || [],
      rows: f.rows || []
    }));
  }

  AR.api = {
    async load() {
      const { SCRIPT_URL, READ_KEY } = AR.CONFIG;

      if (!SCRIPT_URL) {
        S.live = false;
        S.folders = normalize(AR.DEMO.folders);
        S.fetchedAt = Date.now();
        S.error = '';
        return;
      }

      const url = SCRIPT_URL + (SCRIPT_URL.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(READ_KEY);
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Could not read the sheet');

      S.live = true;
      S.folders = normalize(data.folders);
      S.fetchedAt = Date.now();
      S.error = '';
    }
  };
})(window.AR);
