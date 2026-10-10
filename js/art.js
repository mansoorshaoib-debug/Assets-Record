/* Folder pictures: a drawing per kind of equipment, or your own photo if you add one.
   Photo: put assets/images/<folder-name>.jpg (for "Laptop Stands" -> laptop-stands.jpg). */
(function (AR) {
  const { slug } = AR.util;

  /* Every drawing uses the 160 x 120 box and the theme colours (css/art.css). */
  const DRAW = {
    screen: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="46" ry="5"/>
      <rect class="k-body" x="22" y="10" width="116" height="74" rx="8"/>
      <rect class="k-glass" x="29" y="17" width="102" height="58" rx="3"/>
      <path class="k-shine" d="M29 62 L72 17 H96 L29 76 Z"/>
      <rect class="k-acc" x="38" y="26" width="30" height="5" rx="2.5"/>
      <rect class="k-soft" x="38" y="36" width="52" height="4" rx="2"/>
      <rect class="k-soft" x="38" y="44" width="40" height="4" rx="2"/>
      <circle class="k-acc" cx="80" cy="80" r="1.8"/>
      <path class="k-body" d="M70 84 H90 L94 100 H66 Z"/>
      <rect class="k-body" x="46" y="98" width="68" height="8" rx="4"/>`,

    mobile: `
      <ellipse class="k-shadow" cx="80" cy="112" rx="30" ry="4"/>
      <rect class="k-body" x="52" y="6" width="56" height="106" rx="12"/>
      <rect class="k-glass" x="58" y="14" width="44" height="90" rx="7"/>
      <rect class="k-acc" x="71" y="9" width="18" height="3" rx="1.5"/>
      <path class="k-shine" d="M58 70 L96 14 H102 V30 L64 104 H58 Z"/>
      <rect class="k-acc" x="65" y="30" width="13" height="13" rx="4"/>
      <rect class="k-soft" x="82" y="30" width="13" height="13" rx="4"/>
      <rect class="k-soft" x="65" y="48" width="13" height="13" rx="4"/>
      <rect class="k-acc" x="82" y="48" width="13" height="13" rx="4"/>
      <rect class="k-soft" x="65" y="86" width="30" height="8" rx="4"/>`,

    laptop: `
      <ellipse class="k-shadow" cx="80" cy="106" rx="56" ry="5"/>
      <rect class="k-body" x="34" y="14" width="92" height="62" rx="7"/>
      <rect class="k-glass" x="40" y="20" width="80" height="50" rx="3"/>
      <path class="k-shine" d="M40 60 L72 20 H92 L40 72 Z"/>
      <rect class="k-acc" x="48" y="29" width="26" height="5" rx="2.5"/>
      <rect class="k-soft" x="48" y="39" width="44" height="4" rx="2"/>
      <path class="k-body" d="M18 80 H142 L134 98 Q133 101 129 101 H31 Q27 101 26 98 Z"/>
      <rect class="k-soft" x="64" y="86" width="32" height="6" rx="3"/>`,

    macmini: `
      <ellipse class="k-shadow" cx="80" cy="98" rx="58" ry="6"/>
      <rect class="k-body" x="24" y="42" width="112" height="48" rx="16"/>
      <rect class="k-soft" x="34" y="49" width="92" height="4" rx="2"/>
      <circle class="k-acc" cx="116" cy="74" r="3.5"/>
      <rect class="k-glass" x="38" y="68" width="14" height="7" rx="3"/>
      <rect class="k-glass" x="58" y="68" width="14" height="7" rx="3"/>
      <rect class="k-glass" x="78" y="68" width="14" height="7" rx="3"/>`,

    cpu: `
      <ellipse class="k-shadow" cx="80" cy="113" rx="34" ry="4"/>
      <rect class="k-body" x="48" y="6" width="64" height="106" rx="8"/>
      <rect class="k-glass" x="57" y="16" width="46" height="11" rx="2"/>
      <rect class="k-glass" x="57" y="33" width="46" height="11" rx="2"/>
      <rect class="k-acc" x="62" y="20" width="14" height="3" rx="1.5"/>
      <circle class="k-acc" cx="80" cy="62" r="7"/>
      <circle class="k-glass" cx="80" cy="62" r="3"/>
      <path class="k-line" d="M58 82 H102 M58 90 H102 M58 98 H102"/>`,

    cable: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="52" ry="5"/>
      <path class="k-accline" d="M40 92 C14 92 16 46 52 50 C90 54 56 100 96 92 C132 85 112 46 126 34"/>
      <path class="k-line" d="M40 92 C14 92 16 46 52 50 C90 54 56 100 96 92 C132 85 112 46 126 34" style="stroke-width:1;opacity:.35"/>
      <g transform="rotate(-8 34 92)"><rect class="k-body" x="14" y="84" width="24" height="16" rx="4"/><rect class="k-glass" x="6" y="88" width="10" height="8" rx="2"/></g>
      <g transform="rotate(32 128 30)"><rect class="k-body" x="118" y="22" width="22" height="16" rx="4"/><rect class="k-glass" x="138" y="26" width="10" height="8" rx="2"/></g>`,

    connector: `
      <ellipse class="k-shadow" cx="80" cy="100" rx="52" ry="5"/>
      <path class="k-body" d="M26 38 H108 V64 L98 78 H36 L26 64 Z"/>
      <rect class="k-glass" x="36" y="46" width="62" height="14" rx="3"/>
      <rect class="k-acc" x="42" y="50" width="6" height="6" rx="1"/>
      <rect class="k-acc" x="54" y="50" width="6" height="6" rx="1"/>
      <rect class="k-acc" x="66" y="50" width="6" height="6" rx="1"/>
      <rect class="k-acc" x="78" y="50" width="6" height="6" rx="1"/>
      <rect class="k-acc" x="90" y="50" width="4" height="6" rx="1"/>
      <rect class="k-body" x="108" y="46" width="22" height="20" rx="5"/>
      <path class="k-accline" d="M130 56 H152"/>`,

    laptopstand: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="54" ry="5"/>
      <g transform="rotate(-9 80 70)">
        <rect class="k-body" x="38" y="10" width="84" height="52" rx="6"/>
        <rect class="k-glass" x="44" y="16" width="72" height="40" rx="3"/>
        <rect class="k-body" x="30" y="62" width="100" height="10" rx="4"/>
      </g>
      <path class="k-line" d="M58 82 L48 102 M104 76 L116 102"/>
      <rect class="k-body" x="34" y="100" width="92" height="7" rx="3.5"/>`,

    mobilestand: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="40" ry="5"/>
      <g transform="rotate(-12 80 88)">
        <rect class="k-body" x="58" y="10" width="44" height="78" rx="9"/>
        <rect class="k-glass" x="63" y="17" width="34" height="62" rx="5"/>
        <rect class="k-acc" x="72" y="12" width="16" height="2.5" rx="1.2"/>
      </g>
      <path class="k-body" d="M42 104 H118 L110 90 H50 Z"/>
      <rect class="k-acc" x="58" y="84" width="46" height="6" rx="3"/>`,

    keyboard: `
      <ellipse class="k-shadow" cx="80" cy="102" rx="62" ry="5"/>
      <rect class="k-body" x="10" y="46" width="104" height="48" rx="8"/>
      <g class="k-soft">
        <rect x="17" y="53" width="10" height="8" rx="2"/><rect x="30" y="53" width="10" height="8" rx="2"/><rect x="43" y="53" width="10" height="8" rx="2"/><rect x="56" y="53" width="10" height="8" rx="2"/><rect x="69" y="53" width="10" height="8" rx="2"/><rect x="82" y="53" width="10" height="8" rx="2"/><rect x="95" y="53" width="12" height="8" rx="2"/>
        <rect x="17" y="64" width="10" height="8" rx="2"/><rect x="30" y="64" width="10" height="8" rx="2"/><rect x="43" y="64" width="10" height="8" rx="2"/><rect x="56" y="64" width="10" height="8" rx="2"/><rect x="69" y="64" width="10" height="8" rx="2"/><rect x="82" y="64" width="10" height="8" rx="2"/><rect x="95" y="64" width="12" height="8" rx="2"/>
      </g>
      <rect class="k-soft" x="26" y="76" width="62" height="9" rx="3"/>
      <rect class="k-body" x="124" y="44" width="28" height="50" rx="14"/>
      <path class="k-line" d="M124 66 H152 M138 44 V66"/>
      <rect class="k-acc" x="135" y="50" width="6" height="10" rx="3"/>`,

    printer: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="58" ry="5"/>
      <rect class="k-paper" x="48" y="8" width="64" height="34" rx="2"/>
      <path class="k-line" d="M58 18 H102 M58 26 H92" style="stroke-width:2;opacity:.5"/>
      <rect class="k-body" x="22" y="38" width="116" height="52" rx="10"/>
      <rect class="k-glass" x="32" y="48" width="34" height="10" rx="2"/>
      <circle class="k-acc" cx="122" cy="52" r="4"/>
      <rect class="k-glass" x="40" y="76" width="80" height="6" rx="3"/>
      <rect class="k-paper" x="46" y="82" width="68" height="26" rx="2"/>
      <path class="k-line" d="M56 92 H104 M56 100 H92" style="stroke-width:2;opacity:.5"/>`,

    charger: `
      <ellipse class="k-shadow" cx="80" cy="110" rx="46" ry="4"/>
      <rect class="k-body" x="50" y="28" width="60" height="54" rx="11"/>
      <rect class="k-soft" x="60" y="38" width="40" height="5" rx="2.5"/>
      <circle class="k-acc" cx="80" cy="62" r="6"/>
      <rect class="k-body" x="62" y="12" width="7" height="18" rx="2"/>
      <rect class="k-body" x="91" y="12" width="7" height="18" rx="2"/>
      <path class="k-accline" d="M80 82 C80 104 114 98 124 108"/>
      <rect class="k-body" x="118" y="104" width="22" height="10" rx="3"/>`,

    headphones: `
      <ellipse class="k-shadow" cx="80" cy="108" rx="44" ry="4"/>
      <path class="k-line" d="M36 72 V60 C36 18 124 18 124 60 V72" style="stroke-width:7"/>
      <path class="k-accline" d="M36 72 V60 C36 18 124 18 124 60 V72" style="stroke-width:3"/>
      <rect class="k-body" x="24" y="64" width="26" height="42" rx="11"/>
      <rect class="k-body" x="110" y="64" width="26" height="42" rx="11"/>
      <rect class="k-acc" x="30" y="74" width="10" height="22" rx="5"/>
      <rect class="k-acc" x="120" y="74" width="10" height="22" rx="5"/>`,

    router: `
      <ellipse class="k-shadow" cx="80" cy="106" rx="60" ry="5"/>
      <path class="k-line" d="M44 70 L32 20 M80 70 V12 M116 70 L128 20"/>
      <circle class="k-acc" cx="32" cy="20" r="4"/><circle class="k-acc" cx="80" cy="12" r="4"/><circle class="k-acc" cx="128" cy="20" r="4"/>
      <rect class="k-body" x="18" y="68" width="124" height="34" rx="10"/>
      <circle class="k-acc" cx="40" cy="85" r="3.5"/><circle class="k-acc" cx="54" cy="85" r="3.5"/><circle class="k-soft" cx="68" cy="85" r="3.5"/>
      <rect class="k-glass" x="94" y="79" width="10" height="12" rx="2"/><rect class="k-glass" x="108" y="79" width="10" height="12" rx="2"/><rect class="k-glass" x="122" y="79" width="10" height="12" rx="2"/>`,

    ups: `
      <ellipse class="k-shadow" cx="80" cy="113" rx="40" ry="4"/>
      <rect class="k-body" x="40" y="8" width="80" height="104" rx="10"/>
      <rect class="k-glass" x="50" y="18" width="60" height="24" rx="3"/>
      <rect class="k-acc" x="56" y="26" width="30" height="7" rx="3"/>
      <circle class="k-acc" cx="98" cy="30" r="3.5"/>
      <rect class="k-glass" x="50" y="54" width="26" height="18" rx="3"/><rect class="k-glass" x="84" y="54" width="26" height="18" rx="3"/>
      <rect class="k-glass" x="50" y="80" width="26" height="18" rx="3"/><rect class="k-glass" x="84" y="80" width="26" height="18" rx="3"/>`,

    purchase: `
      <ellipse class="k-shadow" cx="80" cy="113" rx="38" ry="4"/>
      <path class="k-body" d="M42 8 H118 V108 L109 101 L100 108 L91 101 L82 108 L73 101 L64 108 L55 101 L46 108 L42 104 Z"/>
      <rect class="k-soft" x="54" y="20" width="52" height="5" rx="2.5"/>
      <rect class="k-soft" x="54" y="32" width="38" height="4" rx="2"/>
      <rect class="k-soft" x="54" y="42" width="46" height="4" rx="2"/>
      <rect class="k-soft" x="54" y="52" width="30" height="4" rx="2"/>
      <path class="k-line" d="M54 66 H106" style="stroke-dasharray:2 5"/>
      <rect class="k-acc" x="54" y="76" width="52" height="14" rx="4"/>`,

    box: `
      <ellipse class="k-shadow" cx="80" cy="110" rx="48" ry="5"/>
      <path class="k-body" d="M80 10 L130 36 V84 L80 110 L30 84 V36 Z"/>
      <path class="k-line" d="M30 36 L80 62 L130 36 M80 62 V110"/>
      <rect class="k-acc" x="92" y="70" width="22" height="9" rx="2" transform="rotate(-26 103 74)"/>`
  };

  /** Pick a drawing from the folder (tab) name. Order matters: first match wins. */
  const RULES = [
    [/purchase|buy|bought|invoice/, 'purchase'],
    [/laptop.*stand|stand.*laptop/, 'laptopstand'],
    [/mobile.*stand|phone.*stand|stand/, 'mobilestand'],
    [/cable|cord|wire|lan\b/, 'cable'],
    [/connector|adapter|converter|hub|hdmi|usb|dongle/, 'connector'],
    [/screen|monitor|display|lcd|led|tv/, 'screen'],
    [/mobile|phone|tablet|ipad/, 'mobile'],
    [/laptop|notebook|macbook/, 'laptop'],
    [/mac\s?mini|\bmac\b/, 'macmini'],
    [/cpu|desktop|computer|tower|pc\b/, 'cpu'],
    [/keyboard|mouse/, 'keyboard'],
    [/printer|scanner/, 'printer'],
    [/router|network|wifi|modem|switch/, 'router'],
    [/ups|battery|power/, 'ups'],
    [/charger|adaptor/, 'charger'],
    [/headphone|headset|earphone|speaker/, 'headphones']
  ];

  const kindOf = name => {
    const n = String(name).toLowerCase();
    const hit = RULES.find(([re]) => re.test(n));
    return hit ? hit[1] : 'box';
  };

  const photoState = {};   // slug -> extension that worked, or null when none exists

  function loadPhoto(pic) {
    const s = pic.dataset.slug;
    if (photoState[s] === null) return;
    const img = new Image();
    img.alt = '';
    const queue = photoState[s] ? [photoState[s]] : AR.CONFIG.PHOTO_EXTS.slice();
    const tryNext = () => {
      const ext = queue.shift();
      if (!ext) { photoState[s] = null; img.remove(); return; }
      img.dataset.ext = ext;
      img.src = `assets/images/${s}.${ext}`;
    };
    img.onload = () => { photoState[s] = img.dataset.ext; pic.classList.add('has-photo'); };
    img.onerror = tryNext;
    pic.appendChild(img);
    tryNext();
  }

  AR.art = {
    kindOf,
    /** HTML for one picture. */
    pic(name) {
      return `<div class="pic" data-slug="${slug(name)}"><svg class="art" viewBox="0 0 160 120" aria-hidden="true">${DRAW[kindOf(name)]}</svg></div>`;
    },
    /** Call after inserting pictures into the page: swaps in photos that exist. */
    hydrate(root) {
      root.querySelectorAll('.pic[data-slug]').forEach(pic => {
        if (!pic.querySelector('img')) loadPhoto(pic);
      });
    }
  };
})(window.AR);
