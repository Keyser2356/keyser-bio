(function () {
  let USER_ID = '640170306429911060';
  let API     = `https://api.lanyard.rest/v1/users/${USER_ID}`;
  const INTERVAL = 2000;

  const STATUS_COLORS = {
    online:  '#23a55a',
    idle:    '#f0b232',
    dnd:     '#f23f43',
    offline: '#80848e',
  };

  const STATUS_LABELS = {
    online:  'online',
    idle:    'idle',
    dnd:     'do not disturb',
    offline: 'offline',
  };

  let badge   = null;
  let tooltip = null;

  function createBadge() {
    const b = document.createElement('div');
    b.id = 'discord-status-badge';
    b.style.cssText = `
      position: absolute;
      bottom: -4px;
      left: -4px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #80848e;
      border: 2px solid #000;
      transition: background 0.4s ease;
      cursor: default;
      z-index: 10;
    `;
    const pulse = document.createElement('div');
    pulse.id = 'discord-pulse';
    pulse.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #23a55a;
      opacity: 0;
      pointer-events: none;
      animation: none;
    `;
    b.appendChild(pulse);
    if (!document.getElementById('discord-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'discord-pulse-style';
      style.textContent = `
        @keyframes discordPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const t = document.createElement('div');
    t.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #101010;
      border: 1px solid #202020;
      color: #888;
      font-size: 9px;
      font-family: var(--font-mono, monospace);
      padding: 3px 7px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease;
    `;
    b.appendChild(t);

    b.addEventListener('mouseenter', () => { t.style.opacity = '1'; });
    b.addEventListener('mouseleave', () => { t.style.opacity = '0'; });

    badge   = b;
    tooltip = t;
    return b;
  }

  function updateBadge(data) {
    if (!badge) return;

    const status = data.discord_status || 'offline';
    badge.style.background = STATUS_COLORS[status] || STATUS_COLORS.offline;
    const pulse = document.getElementById('discord-pulse');
    if (pulse) {
      if (status === 'online') {
        pulse.style.background = '#23a55a';
        pulse.style.animation = 'discordPulse 1.8s ease-out infinite';
      } else if (status === 'idle') {
        pulse.style.background = '#f0b232';
        pulse.style.animation = 'discordPulse 2.5s ease-out infinite';
      } else {
        pulse.style.animation = 'none';
        pulse.style.opacity = '0';
      }
    }

    let label = STATUS_LABELS[status] || 'offline';

    if (data.activities) {
      const game = data.activities.find(a => a.type === 0);
      if (game) label = `playing ${game.name.toLowerCase()}`;
    }

    tooltip.textContent = label;
  }

  async function poll() {
    try {
      const res = await fetch(`${API}?t=${Date.now()}`);
      const { data } = await res.json();
      updateBadge(data);
    } catch {}
  }

  function init() {
    const avatar = document.getElementById('rusk');
    if (!avatar) return;

    const parent = avatar.parentElement;
    parent.style.position = 'relative';
    parent.style.display  = 'inline-block';

    parent.appendChild(createBadge());

    poll();
    setInterval(poll, INTERVAL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
