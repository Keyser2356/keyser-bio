(function () {
  let API = 'https://api.lanyard.rest/v1/users/640170306429911060';
  const STORAGE_KEY = 'spotify_history_v7';
  const MAX_HISTORY = 50;

  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  let currentTrack = null;

  let container;
  let row;
  let measurer;

  function getWidth(song, artist) {
    measurer.textContent = song.length > artist.length ? song : artist;
    return Math.min(measurer.offsetWidth + 75, 300);
  }

  function render() {
    let html = '';

    if (currentTrack) {
      const w = getWidth(currentTrack.song, currentTrack.artist);
      html += `
                <div class="spotify-card is-playing" style="width:${w}px">
                    <div class="icon-box">
                        <img src="${currentTrack.album_art_url}" class="art">
                        <img class="gif-overlay" src="play_animation.gif">
                    </div>
                    <div class="text-info">
                        <div class="track-title t-white">${currentTrack.song}</div>
                        <div class="track-artist t-dim">${currentTrack.artist}</div>
                    </div>
                </div>`;
    }
    const deduped = [];
    for (const t of history) {
      const last = deduped[deduped.length - 1];
      if (last && last.song === t.song && last.artist === t.artist) {
        last.count++;
      } else {
        deduped.push({ ...t, count: 1 });
      }
    }

    deduped.forEach((t) => {
      const w = getWidth(t.song, t.artist);
      const countBadge = t.count > 1 ? `
        <div style="
          position: absolute;
          bottom: -7px;
          right: -7px;
          width: 19px;
          height: 19px;
          background: #202020;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        ">
          <span style="
            color: #495363;
            font-family: var(--font-mono, monospace);
            font-size: 8.8px;
            font-weight: 450;
            line-height: 1;
          ">${t.count}x</span>
        </div>` : '';

      html += `
                <div class="spotify-card" style="width:${w}px">
                    <div class="icon-box"><img src="${t.art}" class="art"></div>
                    <div class="text-info">
                        <div class="track-title t-white">${t.song}</div>
                        <div class="track-artist t-dim">${t.artist}</div>
                    </div>
                    ${countBadge}
                </div>`;
    });

    if (!currentTrack && history.length === 0) {
      html = `
                <div class="spotify-card" style="width:260px">
                    <div class="text-info">
                        <div class="track-title t-white">no recent listening history</div>
                        <div class="track-artist t-dim">play something on Spotify to see it here</div>
                    </div>
                </div>`;
    }

    row.innerHTML = html;
  }

  function renderSkeleton() {
    let html = '';
    const skeletonCount = 4;
    
    for (let i = 0; i < skeletonCount; i++) {
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

  async function check() {
    try {
      const r = await fetch(`${API}?t=${Date.now()}`);
      const { data } = await r.json();

      if (data.listening_to_spotify && data.spotify) {
        const s = data.spotify;
        if (!currentTrack || currentTrack.track_id !== s.track_id) {
          if (currentTrack) {
            history.unshift({ song: currentTrack.song, artist: currentTrack.artist, art: currentTrack.album_art_url });
            if (history.length > MAX_HISTORY) history.pop();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
          }
          currentTrack = s;
          render();
        }
      } else if (currentTrack) {
        currentTrack = null;
        render();
      }
    } catch (e) {
    }
  }

  function init() {
    container = document.getElementById('spotify-scroll-container');
    row = document.getElementById('spotify-track-row');
    measurer = document.getElementById('spotify-measurer');
    if (!container || !row || !measurer) return;
    

    if (history.length === 0 && !currentTrack) {
      renderSkeleton();
    } else {
      render();
    }
    
    setInterval(check, 2000);
    check();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
