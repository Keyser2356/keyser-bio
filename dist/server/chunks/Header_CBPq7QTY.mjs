import { f as createAstro, g as createComponent, r as renderTemplate, k as defineScriptVars, l as renderSlot, n as renderHead, i as addAttribute, m as maybeRenderHead } from './astro/server_B70yDx1c.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro = createAstro("https://keyser2356.github.io");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    title = "★ keyser.",
    description = "keyser's personal website"
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="en" class="overscroll-none overflow-y-scroll" data-astro-cid-5hce7sga> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#000000"><meta name="description"', '><meta name="keywords" content="keyser, jsop, жсоп, жсопн"><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:author" content="keyser"><meta property="og:locale" content="en_US"><meta property="og:image" content="/images/avatar.png"><meta property="og:image:type" content="image/png"><title>', '</title><link rel="icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link rel="stylesheet" href="/css/main.css"><link rel="stylesheet" href="/css/scrobbles.css">', '</head> <body class="text-foreground bg-background" data-astro-cid-5hce7sga> ', " <script>(function(){", '\n    window.__config = { discordUserId };\n    function getConfig() { return Promise.resolve(window.__config); }\n  })();</script> <script src="/js/codeProtection.js"></script> <script src="/js/discord-status.js"></script> <script src="/js/scrobbles.js"></script> <script src="/js/scrobbles-hover.js"></script> <script src="/js/favorite-tracks.js"></script> <script src="/js/game-history.js"></script> <script src="/js/alive.js"></script> <script src="/js/pageAnimations.js"></script> <script src="/js/scroll.js"></script> <script src="/js/links-hover.js"></script> </body> </html>'])), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), defineScriptVars({ discordUserId: "640170306429911060" }));
}, "E:/Code/Website/astro8/src/layouts/Base.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<header class="p-8 border-b border-b-background-100 flex items-center justify-between"> <a href="/"> <h1 class="text-3xl font-bold md:text-4xl"> <span class="text-foreground-700">#</span> keyser\n</h1> <p class="text-xs text-foreground-700 font-bold md:text-xl"> <span class="text-foreground-900 mr-1">##</span> sleep deprived developer\n</p> </a> <a href="/"> <img id="rusk" src="/images/avatar.png" alt="cute rusk gif by siromu466, pls buy their cursor set :3" class="h-12 w-12 [image-rendering:pixelated] md:h-24 md:w-24 rounded-lg"> </a> </header> <script type="module">\n  (() => {\n    if (new URLSearchParams(window.location.search).has("glunging")) {\n      const el = document.getElementById("rusk");\n      if (!el) return;\n      const originalSrc = el.getAttribute("src");\n      if (!originalSrc) return;\n      const parent = el.parentElement;\n      el.setAttribute("src", "/images/glungus.jpg");\n      el.classList.add("animate-bounce");\n      if (parent) {\n        parent.setAttribute("href", "https://glungus.cat/");\n        parent.setAttribute("target", "_blank");\n      }\n      console.log("meow ".repeat(500).trimEnd());\n      setTimeout(() => {\n        el.setAttribute("src", originalSrc);\n        el.classList.remove("animate-bounce");\n        if (parent) {\n          parent.setAttribute("href", "/");\n          parent.removeAttribute("target");\n        }\n        const url = new URL(window.location.href);\n        url.searchParams.delete("glunging");\n        window.history.replaceState({}, "", url);\n        console.clear();\n        console.log("muehehehe");\n      }, 5000);\n    }\n  })();\n<\/script>'])), maybeRenderHead());
}, "E:/Code/Website/astro8/src/components/Header.astro", void 0);

export { $$Base as $, $$Header as a };
