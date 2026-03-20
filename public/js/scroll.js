(function () {
  const CONTAINERS = [
    '#spotify-scroll-container',
    '#favorite-scroll-container',
    '#game-history-container',
  ];

  const FRICTION   = 0.95;
  const MULTIPLIER = 0.05;

  function initScroll(container) {
    if (!container) return;

    let velocity = 0;
    let rafId    = null;

    container.style.cursor = 'default';

    function applyInertia() {
      if (Math.abs(velocity) > 0.3) {
        container.scrollLeft += velocity;
        velocity *= FRICTION;
        rafId = requestAnimationFrame(applyInertia);
      } else {
        velocity = 0;
      }
    }

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
      velocity += e.deltaY * MULTIPLIER;
      rafId = requestAnimationFrame(applyInertia);
    }, { passive: false });
  }

  function init() {
    CONTAINERS.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) initScroll(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
