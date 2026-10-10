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

  const CACHE_KEY = 'oth_data_v1';

  AR.api = {
    /** Last good copy of the sheet, so the page can draw instantly while the fresh data loads. */
    loadCached() {
      if (!AR.CONFIG.SCRIPT_URL) return false;
      try {
        const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (!c || !Array.isArray(c.folders) || !c.folders.length) return false;
        S.live = true;
        S.folders = normalize(c.folders);
        S.fetchedAt = c.at || Date.now();
        S.error = '';
        return true;
      } catch (e) { return false; }
    },

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

      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), folders: data.folders })); } catch (e) { /* storage full or blocked */ }
      S.live = true;
      S.folders = normalize(data.folders);
      S.fetchedAt = Date.now();
      S.error = '';
    }
  };
})(window.AR);