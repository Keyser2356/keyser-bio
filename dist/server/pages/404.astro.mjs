import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B70yDx1c.mjs';
import 'kleur/colors';
import { $ as $$Base, a as $$Header } from '../chunks/Header_CBPq7QTY.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "404 \u2014 keyser.", "description": "404 \u2014 page not found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", `<div data-bg-ready style="--bg-link: url(/images/gif/bg.gif)" class="border-l border-r border-l-background-100 border-r-background-100 flex flex-col min-h-screen [image-rendering:pixelated] md:max-w-[750px] before:content-[''] before:left-0 before:top-0 before:fixed before:z-[-1] before:bg-fixed before:bg-center before:bg-no-repeat before:bg-[image:var(--bg-link)] before:opacity-45 before:h-full before:w-full mx-auto bg-background before:bg-[length:cover]" data-astro-cid-zetdm5md> `, ` <div class="*:border-b-1 *:border-b-background-100" data-astro-cid-zetdm5md> <div class="p-5" data-astro-cid-zetdm5md> <div class="mb-2" data-astro-cid-zetdm5md> <h1 class="text-xl font-bold" data-astro-cid-zetdm5md> <span class="text-foreground-700" data-astro-cid-zetdm5md>#</span> 404 \u2014 not found
</h1> <p class="text-xs text-foreground-700" data-astro-cid-zetdm5md> <span class="text-foreground-900 mr-0.5" data-astro-cid-zetdm5md>##</span>
the page you are looking for does not exist
</p> </div> <ul class="pl-0 md:pl-6 mt-2" data-astro-cid-zetdm5md> <li class="text-xs flex gap-2 items-center md:text-base" data-astro-cid-zetdm5md> <span class="text-foreground-700" data-astro-cid-zetdm5md>-</span> <p data-astro-cid-zetdm5md>error:</p> <p class="text-foreground-700" data-astro-cid-zetdm5md>HTTP 404</p> </li> <li class="text-xs flex gap-2 items-center md:text-base" data-astro-cid-zetdm5md> <span class="text-foreground-700" data-astro-cid-zetdm5md>-</span> <p data-astro-cid-zetdm5md>path:</p> <p class="text-foreground-700" data-astro-cid-zetdm5md><span id="not-found-path" data-astro-cid-zetdm5md>unknown</span></p> </li> <li class="text-xs flex gap-2 items-center md:text-base" data-astro-cid-zetdm5md> <span class="text-foreground-700" data-astro-cid-zetdm5md>-</span> <p data-astro-cid-zetdm5md>suggestion:</p> <p data-astro-cid-zetdm5md> <a href="/" class="text-foreground-700 hover:text-foreground transition-colors duration-200" data-astro-cid-zetdm5md>
go back home \u2192
</a> </p> </li> </ul> </div> </div> </div> <script>
    const el = document.getElementById('not-found-path');
    if (el) el.textContent = window.location.pathname;
  <\/script> `])), maybeRenderHead(), renderComponent($$result2, "Header", $$Header, { "data-astro-cid-zetdm5md": true })) })}`;
}, "E:/Code/Website/astro8/src/pages/404.astro", void 0);

const $$file = "E:/Code/Website/astro8/src/pages/404.astro";
const $$url = "/keyser-webbio.github.io/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
