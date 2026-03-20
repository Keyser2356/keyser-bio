window.__config = null;

async function getConfig() {
  if (window.__config) return window.__config;
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      window.__config = await res.json();
      return window.__config;
    }
  } catch {}
  window.__config = {
    discordUserId: '640170306429911060',
    favoriteTracks: [],
  };
  return window.__config;
}
