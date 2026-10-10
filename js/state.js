/* Shared state. Only the theme and video choice are saved in the browser. */
(function (AR) {
  const stored = AR.util.safeJSON(localStorage.getItem('oth_cfg')) || {};

  AR.state = {
    cfg: Object.assign({ theme: AR.CONFIG.DEFAULT_THEME, video: true }, stored),

    // data
    folders: [],          // [{ name, slug, kind: 'items' | 'purchases', columns, rows }]
    fetchedAt: 0,
    live: false,
    loading: true,
    error: '',

    // ui
    route: { name: 'home', slug: '' },
    tab: 'all',
    q: '',
    sort: { k: '', d: 1 },
    visibleRows: []       // rows on screen, used by CSV export
  };

  AR.saveCfg = function () {
    try { localStorage.setItem('oth_cfg', JSON.stringify(AR.state.cfg)); } catch (e) { /* storage blocked */ }
  };

  AR.resetView = function () {
    Object.assign(AR.state, { tab: 'all', q: '', sort: { k: '', d: 1 } });
  };
})(window.AR);
