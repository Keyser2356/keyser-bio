<p align="center">
  <h1 align="center">bio</h1>
  <p align="center">
    <b>"sleep deprived developer"</b><br>
    Personal bio site with real-time Spotify scrobbles, Discord status, and game history tracking.
  </p>
  <p align="center">
    <a href="https://astro.build/"><img src="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"></a>
    <a href="https://bun.sh/"><img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"></a>
    <a href="https://github.com/Keyser2356/bio/stargazers"><img src="https://img.shields.io/github/stars/Keyser2356/bio?style=for-the-badge&color=yellow" alt="Stars"></a>
  </p>
</p>

---

### ✨ What's on the site?

- **Scrobbles history** — fetched from Spotify via [Lanyard](https://github.com/Phineas/lanyard), almost in real-time
- **Favorite tracks** — handpicked playlist with Spotify artwork
- **Discord status** — live online/idle/dnd indicator on the avatar
- **Game history** — tracked from Discord activity, saved locally in localStorage
- **Personal metadata** — name, age counter, location, languages

---

### 📋 Features

- Real-time Spotify & Discord presence via Lanyard
- Game session tracking with duration and timestamps
- Smooth horizontal scroll with inertia on all track rows
- Hover animations on cards and social links
- Pixel-art aesthetic with custom background and avatar
- Easter egg: `?glunging`

---

### 🚀 Quick Start

```bash
git clone https://github.com/Keyser2356/bio.git
cd bio
bun install
bun run dev
```

### ⚙️ Config

```env
PUBLIC_DISCORD_USER_ID=your_discord_id
```

---

### 📁 Structure

```
src/
  components/   — Header, Metadata, Hobbies, Scrobbles,
                  FavoriteTracks, GameHistory, SocialLinks
  layouts/      — Base.astro
  pages/        — index.astro, 404.astro

public/
  css/          — styles
  js/           — client scripts
  images/       — avatar, background
```

---

### 🛠 Editing

| What | Where |
|------|-------|
| Name, age, location | `src/components/Metadata.astro` |
| Hobbies text | `src/components/Hobbies.astro` |
| Social links | `src/components/SocialLinks.astro` |
| Favorite tracks | `public/js/favorite-tracks.js` → `TRACKS` |
| Discord ID | `.env` → `PUBLIC_DISCORD_USER_ID` |
| Scroll feel | `public/js/scroll.js` → `FRICTION`, `MULTIPLIER` |
