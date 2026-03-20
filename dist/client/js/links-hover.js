(function () {
  const FADE_DURATION   = 5;
  const LIFT_DISTANCE   = 3;
  const INITIAL_OPACITY = 0.4;
  const FULL_OPACITY    = 1;
  const DEFAULT_BORDER  = 'var(--colors-background-200, #101010)';
  const HOVER_BORDER    = 'var(--colors-accent-DEFAULT, #852BCA)';

  const SELECTOR = [
    'a[href*="t.me"]',
    'a[href*="github.com"]',
    'a[href*="steam"]',
    'a[href*="spotify.com/user"]',
    'a[href*="twitch.tv"]',
    'a[href*="discord.com/users"]',
  ].join(', ');

  let links = [];
  let isHovered = false;

  const opacityRafs   = new WeakMap();
  const transformRafs = new WeakMap();

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
    function loop(now) {
      const p = Math.min((now - t0) / FADE_DURATION, 1);
      el.style.setProperty('transform', `translateY(${startY + (targetY - startY) * p}px)`, 'important');
      if (p < 1) transformRafs.set(el, requestAnimationFrame(loop));
    }
    transformRafs.set(el, requestAnimationFrame(loop));
  }

  function onContainerEnter() {
    isHovered = true;
    links.forEach(l => animateOpacity(l, INITIAL_OPACITY));
  }

  function onContainerLeave() {
    isHovered = false;
    links.forEach(l => {
      animateOpacity(l, FULL_OPACITY);
      animateTransform(l, 0);
      l.style.borderColor = '';
    });
  }

  function onLinkEnter(link) {
    animateOpacity(link, FULL_OPACITY);
    animateTransform(link, -LIFT_DISTANCE);
    link.style.borderColor = HOVER_BORDER;
  }

  function onLinkLeave(link) {
    animateOpacity(link, isHovered ? INITIAL_OPACITY : FULL_OPACITY);
    animateTransform(link, 0);
    link.style.borderColor = '';
  }

  function init() {
    const container = document.querySelector('.p-5.flex.flex-wrap');
    if (!container) return;

    links = Array.from(container.querySelectorAll(SELECTOR));
    if (!links.length) return;
    links.forEach(link => {
      link.style.transition = 'border-color 0.1s ease';
      link.classList.remove('hover:translate-y-[-2px]');
    });

    container.addEventListener('mouseenter', onContainerEnter);
    container.addEventListener('mouseleave', onContainerLeave);

    links.forEach(link => {
      link.addEventListener('mouseenter', () => onLinkEnter(link));
      link.addEventListener('mouseleave', () => onLinkLeave(link));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
