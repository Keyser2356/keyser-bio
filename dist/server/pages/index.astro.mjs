import { g as createComponent, m as maybeRenderHead, r as renderTemplate, i as addAttribute, u as unescapeHTML, j as renderComponent } from '../chunks/astro/server_B70yDx1c.mjs';
import 'kleur/colors';
import { $ as $$Base, a as $$Header } from '../chunks/Header_CBPq7QTY.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Metadata = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="p-5"> <div class="mb-2"> <h1 class="text-xl font-bold"> <span class="text-foreground-700">#</span> personal metadata
</h1> </div> <ul class="pl-0 md:pl-6"> <li class="text-xs flex gap-2 items-center md:text-base"> <span class="text-foreground-700">-</span> <p>name:</p> <p>keyser</p> </li> <li class="text-xs flex gap-2 items-center md:text-base"> <span class="text-foreground-700">-</span> <p>alive for:</p> <p><span id="alive-count">calculating...</span></p> </li> <li class="text-xs flex gap-2 items-center md:text-base"> <span class="text-foreground-700">-</span> <p>languages:</p> <p>EN, RU</p> </li> <li class="text-xs flex gap-2 items-center md:text-base"> <span class="text-foreground-700">-</span> <p>location:</p> <p>RU-KRY</p> </li> </ul> </div>`;
}, "E:/Code/Website/astro8/src/components/Metadata.astro", void 0);

const $$Hobbies = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="p-5"> <div class="mb-2"> <h1 class="text-xl font-bold"> <span class="text-foreground-700">#</span> hobbies and interests
</h1> </div> <ul class="text-xs pl-0 flex flex-col gap-2 md:text-base md:pl-6"> <li> <p>design</p> <p class="text-xs text-foreground-600">
it all started in 2022 when i discovered behance. things just started clicking
        from there, and i found myself genuinely enjoying the process of creating "stuff" :)
        i don't really stick to one specific style yet — just exploring what looks good.
        tools: figma & photoshop 2026.
</p> </li> <li> <p>programming</p> <p class="text-xs text-foreground-600">
my tech stack is a bit of a mix, but it gets the job done. i'm comfortable working
        with react, html, css, python, js, and java. whether it's building a clean UI or
        handling some logic in the back, i'm always up for a challenge.
</p> </li> <li> <p>personality & vibe</p> <p class="text-xs text-foreground-600">
i try to keep things transparent and honest — no toxicity, just straight talk.
        living in yalta (RU-KRY), enjoying the coastal vibes while building things in
        the digital world.
</p> </li> </ul> </div>`;
}, "E:/Code/Website/astro8/src/components/Hobbies.astro", void 0);

const $$Scrobbles = createComponent(async ($$result, $$props, $$slots) => {
  const USER_ID = "640170306429911060";
  let currentTrack = null;
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const { data } = await res.json();
    if (data?.listening_to_spotify && data?.spotify) {
      currentTrack = data.spotify;
    }
  } catch {
  }
  return renderTemplate`${maybeRenderHead()}<div class="p-5"> <div class="mb-2"> <h1 class="text-xl font-bold"> <span class="text-foreground-700">#</span> scrobbles history
</h1> <p class="text-xs text-foreground-700"> <span class="text-foreground-900 mr-0.5">##</span>
fetched from my spotify profile, almost in real-time! wow much music
</p> </div> <div id="spotify-scroll-container"> <div class="spotify-track-row" id="spotify-track-row"> ${currentTrack && renderTemplate`<div class="spotify-card is-playing" style="width:220px"> <div class="icon-box"> <img${addAttribute(currentTrack.album_art_url, "src")} class="art"${addAttribute(currentTrack.song, "alt")}> <img class="gif-overlay" src="/play_animation.gif" alt=""> </div> <div class="text-info"> <div class="track-title">${currentTrack.song}</div> <div class="track-artist">${currentTrack.artist}</div> </div> </div>`} </div> </div> <div id="spotify-measurer"></div> <div id="spotify-scroll-hint">← [ scroll to navigate ] →</div> </div>`;
}, "E:/Code/Website/astro8/src/components/Scrobbles.astro", void 0);

const $$FavoriteTracks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="p-5"> <div class="mb-2"> <h1 class="text-xl font-bold"> <span class="text-foreground-700">#</span> favorite tracks
</h1> <p class="text-xs text-foreground-700"> <span class="text-foreground-900 mr-0.5">##</span>
songs i keep coming back to
</p> </div> <div id="favorite-scroll-container" style="width:100%;overflow:hidden;cursor:default;touch-action:pan-y;-webkit-user-select:none;user-select:none;"> <div class="spotify-track-row" id="favorite-track-row"></div> </div> <div id="favorite-scroll-hint" style="margin-top:9px;text-align:center;font-size:9px;color:#707070;">
← [ scroll to navigate ] →
</div> </div>`;
}, "E:/Code/Website/astro8/src/components/FavoriteTracks.astro", void 0);

const $$GameHistory = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="p-5"> <div class="mb-2"> <h1 class="text-xl font-bold"> <span class="text-foreground-700">#</span> game history
</h1> <p class="text-xs text-foreground-700"> <span class="text-foreground-900 mr-0.5">##</span>
tracked from discord, saved locally
</p> </div> <div id="game-history-container" style="width:100%;overflow:hidden;cursor:default;touch-action:pan-y;-webkit-user-select:none;user-select:none;"> <div class="spotify-track-row" id="game-history-row"></div> </div> <div style="margin-top:9px;text-align:center;font-size:9px;color:#707070;">
← [ scroll to navigate ] →
</div> </div>`;
}, "E:/Code/Website/astro8/src/components/GameHistory.astro", void 0);

const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const links = [
    {
      href: "https://t.me/keyser_twink",
      label: "@keyser_twink",
      icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`
    },
    {
      href: "https://github.com/keyser2356",
      label: "/keyser2356",
      icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`
    },
    {
      href: "https://steamcommunity.com/id/keyser2356",
      label: "/keyser2356",
      icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Steam</title><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/></svg>`
    },
    {
      href: "https://open.spotify.com/user/keyser",
      label: "keyser",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>`
    },
    {
      href: "https://twitch.tv/timeremsi",
      label: "timeremsi",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.899 6.926h-1.455v4.21H16.9zm-3.795 0H11.65v4.21h1.454z"/><path fill="currentColor" d="M20.398 3H7.156L3.547 6.543v12.674h4.167V23l3.695-3.74h2.778l6.266-6.276zM8.053 14.733V4.771H18.79v7.316l-2.68 2.679h-2.733l-2.187 2.11V14.69z"/></svg>`
    },
    {
      href: "https://discord.com/users/keyser3071",
      label: "keyser3071",
      icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.009-.119c.125-.093.25-.19.371-.287a.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.195.371.288a.072.072 0 0 1-.01.119a12.982 12.982 0 0 1-1.873.892a.077.077 0 0 0-.037.098c.36.698.772 1.362 1.294 2.1a.076.076 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.057c.5-4.506-.838-8.962-3.543-12.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.93 2.155-2.157 2.155zm7.975 0c-1.183 0-2.157-.965-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.931 2.155-2.157 2.155z"/></svg>`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="p-5 flex flex-wrap gap-2 items-center justify-center"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer" class="text-foreground px-2.5 py-1.25 border border-background-200 rounded-[10px] bg-background-100 inline-flex gap-2.5 transition-colors duration-200 ease-in-out items-center focus-visible:outline-none hover:border-accent"> <div class="[&_svg]:h-[17px] [&_svg]:w-[17px] [&_svg]:fill-white">${unescapeHTML(link.icon)}</div> <span>${link.label}</span> </a>`)} </div>`;
}, "E:/Code/Website/astro8/src/components/SocialLinks.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div style="--bg-link: url(/images/gif/bg.gif)" class="border-l border-r border-l-background-100 border-r-background-100 flex flex-col min-h-screen [image-rendering:pixelated] md:max-w-[750px] before:content-[''] before:left-0 before:top-0 before:fixed before:z-[-1] before:bg-fixed before:bg-center before:bg-no-repeat before:bg-[image:var(--bg-link)] before:opacity-45 before:h-full before:w-full mx-auto bg-background before:bg-[length:cover]"> `, ' <noscript> <div class="border-b border-background-100 w-full bg-striped-accent"> <div class="text-xs text-accent p-2 text-center rounded">\n[ some features require javascript to be enabled, please turn it on for the best experience! ]\n</div> </div> </noscript> <div class="*:border-b-1 *:border-b-background-100"> ', " ", " ", " ", " ", " ", ' </div> </div> <script type="module">\n    document.addEventListener("DOMContentLoaded", () => {\n      const el = document.querySelector("li.hidden");\n      if (el) el.classList.remove("hidden");\n    });\n  <\/script> '])), maybeRenderHead(), renderComponent($$result2, "Header", $$Header, {}), renderComponent($$result2, "Metadata", $$Metadata, {}), renderComponent($$result2, "Hobbies", $$Hobbies, {}), renderComponent($$result2, "Scrobbles", $$Scrobbles, {}), renderComponent($$result2, "FavoriteTracks", $$FavoriteTracks, {}), renderComponent($$result2, "GameHistory", $$GameHistory, {}), renderComponent($$result2, "SocialLinks", $$SocialLinks, {})) })}`;
}, "E:/Code/Website/astro8/src/pages/index.astro", void 0);

const $$file = "E:/Code/Website/astro8/src/pages/index.astro";
const $$url = "/keyser-webbio.github.io";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
