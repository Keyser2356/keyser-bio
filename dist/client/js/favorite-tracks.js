(function () {

  
  
  const TRACKS = [
    'https://open.spotify.com/track/0PZF1tl32cgYqlaHX24tT3',
    'https://open.spotify.com/track/04bZpa2XjS3fc6ZnUwCgGu',
    'https://open.spotify.com/track/1cdYOCmpgVLzqI8GV1pjQZ',
    'https://open.spotify.com/track/2yLb9W6vFKlJdMmvHmFtpT',
    'https://open.spotify.com/track/6vTO3s6hmImIPPfFcaqz0O',
    'https://open.spotify.com/track/6MmHn5scewEy8AQYb7rYhS',
    'https://open.spotify.com/track/5piOX8k4dUByqYaiXEdM7n',
  ];
  

  const OEMBED = 'https://open.spotify.com/oembed?url=';

  async function fetchTrack(url) {
    try {
      const res = await fetch(OEMBED + encodeURIComponent(url));
      if (!res.ok) return null;
      const data = await res.json();
      const parts = data.title.split(' · ');
      const song = parts[0]?.trim() || data.title;
      const artist = parts[1]?.trim() || '';
      const art = data.thumbnail_url || '';

      return { song, artist, art, url };
    } catch {
      return null;
    }
  }

  function getWidth(measurer, song, artist) {
    measurer.textContent = song.length > artist.length ? song : artist;
    return Math.min(measurer.offsetWidth + 75, 300);
  }

  function renderSkeleton(row, count) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="spotify-card skeleton" style="width:220px">
          <div class="icon-box"></div>
          <div class="text-info">
            <div class="track-title"></div>
            <div class="track-artist"></div>
          </div>
        </div>`;
    }
    row.innerHTML = html;
  }
  const FAVORITE_ICON = `<img src="https://api.iconify.design/uim/favorite.svg?color=%23FFC64A" width="13" height="13" style="display:block;pointer-events:none;" alt="">`;

  function renderTracks(row, measurer, tracks) {
    let html = '';
    for (const t of tracks) {
      if (!t) continue;
      const w = getWidth(measurer, t.song, t.artist);
      html += `
        <a href="${t.url}" target="_blank" rel="noopener" style="text-decoration:none">
          <div class="spotify-card" style="width:${w}px">
            <div class="icon-box">
              <img src="${t.art}" class="art">
            </div>
            <div class="text-info">
              <div class="track-title">${t.song}</div>
              <div class="track-artist">${t.artist}</div>
            </div>
            <div style="
              position: absolute;
              bottom: -7px;
              right: -7px;
              width: 21px;
              height: 21px;
              background: #202020;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
            ">${FAVORITE_ICON}</div>
          </div>
        </a>`;
    }
    row.innerHTML = html || '<div class="spotify-card" style="width:260px"><div class="text-info"><div class="track-title">no tracks found</div></div></div>';
  }

  async function init() {
    const container = document.getElementById('favorite-scroll-container');
    const row = document.getElementById('favorite-track-row');
    const measurer = document.getElementById('spotify-measurer');
    if (!container || !row || !measurer) return;
    renderSkeleton(row, TRACKS.length);
    const results = await Promise.all(TRACKS.map(fetchTrack));
    renderTracks(row, measurer, results);
    const FADE_DURATION   = 150;
    const LIFT_DISTANCE   = 3;
    const INITIAL_OPACITY = 0.4;
    const FULL_OPACITY    = 1;
    const HOVER_BORDER    = '#404040';
    const DEFAULT_BORDER  = '#1a1a1a';
    const DEFAULT_BG      = '#101010';

    let isHovered  = false;
    let isDraggingHover = false;
    const opacityRafs    = new WeakMap();
    const transformRafs  = new WeakMap();

    function animateOpacity(el, target) {
      cancelAnimationFrame(opacityRafs.get(el));
      const start = parseFloat(el.style.opacity) || 1;
      const t0 = performance.now();
      function loop(now) {
        const p = Math.min((now - t0) / FADE_DURATION, 1);
        el.style.opacity = start + (target - start) * p;
        if (p < 1) opacityRafs.set(el, requestAnimationFrame(loop));
      }
      opacityRafs.set(el, requestAnimationFrame(loop));
    }

    function animateTransform(el, targetY) {
      cancelAnimationFrame(transformRafs.get(el));
      const cur = el.style.transform;
      const startY = cur.includes('translateY')
        ? parseFloat(cur.match(/translateY\((-?\d+(?:\.\d+)?)px\)/)?.[1] || 0) : 0;
      const t0 = performance.now();
      el.style.transition = 'none';
      function loop(now) {
        const p = Math.min((now - t0) / FADE_DURATION, 1);
        el.style.setProperty('transform', `translateY(${startY + (targetY - startY) * p}px)`, 'important');
        if (p < 1) transformRafs.set(el, requestAnimationFrame(loop));
      }
      transformRafs.set(el, requestAnimationFrame(loop));
    }

    function getCards() {
      return Array.from(row.querySelectorAll('.spotify-card'));
    }

    function onContainerEnter() {
      isHovered = true;
      getCards().forEach(c => animateOpacity(c, INITIAL_OPACITY));
    }

    function onContainerLeave() {
      if (isDraggingHover) return;
      isHovered = false;
      getCards().forEach(c => {
        animateOpacity(c, FULL_OPACITY);
        animateTransform(c, 0);
        c.style.borderColor = DEFAULT_BORDER;
        c.style.backgroundColor = DEFAULT_BG;
      });
    }

    function onCardEnter(card) {
      animateOpacity(card, FULL_OPACITY);
      animateTransform(card, -LIFT_DISTANCE);
      card.style.borderColor = HOVER_BORDER;
    }

    function onCardLeave(card) {
      animateOpacity(card, isHovered ? INITIAL_OPACITY : FULL_OPACITY);
      animateTransform(card, 0);
      card.style.borderColor = DEFAULT_BORDER;
      card.style.backgroundColor = DEFAULT_BG;
    }

    container.addEventListener('mouseenter', onContainerEnter);
    container.addEventListener('mouseleave', onContainerLeave);
    container.addEventListener('mousedown', () => { isDraggingHover = true; });
    window.addEventListener('mouseup', () => {
      if (!isDraggingHover) return;
      isDraggingHover = false;
      const rect = container.getBoundingClientRect();
      const inside = window.mouseX >= rect.left && window.mouseX <= rect.right
                  && window.mouseY >= rect.top  && window.mouseY <= rect.bottom;
      if (!inside) onContainerLeave();
    });
    getCards().forEach(card => {
      card.addEventListener('animationend', () => { card.style.animation = 'none'; }, { once: true });
      card.addEventListener('mouseenter', () => onCardEnter(card));
      card.addEventListener('mouseleave', () => onCardLeave(card));
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
