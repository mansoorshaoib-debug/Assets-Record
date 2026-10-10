/* Theme, wallpaper and background video. */
(function (AR) {
  const root = document.documentElement;
  let videoMissing = false;

  function applyWallpaper() {
    const wall = AR.CONFIG.WALLPAPER_URL;
    const body = document.body;
    if (wall) {
      body.classList.add('custom-wall');
      body.style.backgroundImage = `linear-gradient(var(--wall-tint), var(--wall-tint)), url("${wall.replace(/"/g, '%22')}")`;
    } else {
      body.classList.remove('custom-wall');
      body.style.backgroundImage = '';
    }
  }

  function videoAllowed() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    return AR.state.cfg.video && !reduced && !saveData;
  }

  /** Adds the looping video if the file exists; otherwise the gradient wallpaper stays. */
  function applyVideo() {
    let video = document.querySelector('.bg-video');
    if (!videoAllowed() || videoMissing) {
      if (video) video.remove();
      root.classList.remove('has-video');
      return;
    }
    if (video) return;

    video = document.createElement('video');
    video.className = 'bg-video';
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.tabIndex = -1;
    video.setAttribute('aria-hidden', 'true');
    video.addEventListener('playing', () => root.classList.add('has-video'));
    video.addEventListener('error', () => {
      videoMissing = true;   // do not retry on every theme change
      video.remove();
      root.classList.remove('has-video');
    });
    video.src = AR.CONFIG.VIDEO_SRC;
    document.body.prepend(video);

    const started = video.play();
    if (started && started.catch) started.catch(() => { /* autoplay blocked: wallpaper stays */ });
  }

  AR.theme = {
    apply() {
      root.setAttribute('data-theme', AR.state.cfg.theme);
      applyWallpaper();
      applyVideo();
      document.querySelectorAll('.swatch').forEach(btn =>
        btn.setAttribute('aria-pressed', String(btn.dataset.themeSet === AR.state.cfg.theme)));
    },
    set(id) {
      AR.state.cfg.theme = id;
      AR.saveCfg();
      AR.theme.apply();
    }
  };
})(window.AR);
