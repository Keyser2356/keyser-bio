(function () {
  let USER_ID    = '640170306429911060';
  let API        = `https://api.lanyard.rest/v1/users/${USER_ID}`;
  const STORAGE_KEY = 'game_history_v1';
  const MAX_HISTORY = 20;
  const POLL_INTERVAL = 2000;

  let currentGame   = null; 
  let history = (() => {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const seen = new Set();
    return raw.filter(g => {
      if (seen.has(g.name)) return false;
      seen.add(g.name);
      return true;
    });
  })();

  let container, row, measurer;
  const iconCache = {};

  async function getGameIcon(appId) {
    if (!appId) return null;
    if (iconCache[appId] !== undefined) return iconCache[appId];

    try {
      const res = await fetch(`https://discord.com/api/v10/applications/${appId}/rpc`);
      if (!res.ok) { iconCache[appId] = null; return null; }
      const data = await res.json();
      const icon = data.icon
        ? `https://cdn.discordapp.com/app-icons/${appId}/${data.icon}.png?size=256`
        : null;
      iconCache[appId] = icon;
      return icon;
    } catch {
      iconCache[appId] = null;
      return null;
    }
  }

  function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  function formatTimeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return 'just now';
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }

  async function render() {
    if (!row) return;

    const items = currentGame
      ? [{ ...currentGame, active: true }, ...history.filter(g => g.name !== currentGame.name)]
      : history;

    if (!items.length) {
      row.innerHTML = `
        <div class="spotify-card" style="width:260px">
          <div class="text-info">
            <div class="track-title">no games tracked yet</div>
            <div class="track-artist">launch a game with discord open</div>
          </div>
        </div>`;
      return;
    }
    const icons = await Promise.all(items.map(g => getGameIcon(g.appId)));

    
row.querySelectorAll && setTimeout(() => {
  row.querySelectorAll('.spotify-card').forEach(c => { c.style.animation = 'none'; });
}, 0);
row.innerHTML = items.map((game, i) => {
      const img = icons[i];
      const duration = game.active
        ? formatDuration(Date.now() - game.start)
        : formatDuration(game.duration || 0);
      const timeLabel = game.active ? 'playing now' : formatTimeAgo(game.end || game.start);
      const nameLen = game.name.length;
      const subLen  = `${duration} · ${timeLabel}`.length;
      const w = Math.min(Math.max(nameLen, subLen) * 7 + 75, 280);

      return `
        <div class="spotify-card" style="width:${w}px;${game.active ? 'border-color:#23a55a;' : ''}; animation:none;">
          <div class="icon-box">
            ${img
              ? `<img src="${img}" class="art" style="pointer-events:none;-webkit-user-drag:none;" onerror="this.style.display='none'">`
              : `<div style="width:100%;height:100%;background:#1a1a1a;border-radius:4px;display:flex;align-items:center;justify-content:center;"><span style="font-size:8px;color:#404040;">?</span></div>`
            }
          </div>
          <div class="text-info">
            <div class="track-title">${game.name}</div>
            <div class="track-artist">${duration} · ${timeLabel}</div>
          </div>
          ${game.active ? `
            <div style="position:absolute;bottom:-5px;right:-5px;width:12px;height:12px;background:#23a55a;border-radius:50%;border:2px solid #000;"></div>
          ` : ''}
        </div>`;
    }).join('');
  }
  function startActiveTick() {
    setInterval(() => {
      if (currentGame) render();
    }, 1000);
  }

  async function poll() {
    try {
      const res  = await fetch(`${API}?t=${Date.now()}`);
      const { data } = await res.json();

      const activity = data.activities?.find(a => a.type === 0); 

      if (activity) {
        const name  = activity.name;
        const appId = activity.application_id;
        const start = activity.timestamps?.start || Date.now();

        if (!currentGame || currentGame.name !== name) {
          if (currentGame) {
            history = history.filter(g => g.name !== currentGame.name);
            history.unshift({
              name:     currentGame.name,
              appId:    currentGame.appId,
              start:    currentGame.start,
              end:      Date.now(),
              duration: Date.now() - currentGame.start,
            });
            if (history.length > MAX_HISTORY) history.pop();
            saveHistory();
          }
          currentGame = { name, appId, start };
          render();
        }
      } else {
        if (currentGame) {
          history = history.filter(g => g.name !== currentGame.name);
          history.unshift({
            name:     currentGame.name,
            appId:    currentGame.appId,
            start:    currentGame.start,
            end:      Date.now(),
            duration: Date.now() - currentGame.start,
          });
          if (history.length > MAX_HISTORY) history.pop();
          saveHistory();
          currentGame = null;
          render();
        }
      }
    } catch {}
  }

  

  function init() {
    container = document.getElementById('game-history-container');
    row       = document.getElementById('game-history-row');
    if (!container || !row) return;

    render();
    poll();
    setInterval(poll, POLL_INTERVAL);
    startActiveTick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
