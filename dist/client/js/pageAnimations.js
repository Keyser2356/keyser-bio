(function () {
  const STAGGER_DELAY = 120;
  const FADE_DURATION = 800;

  function animateElements() {
    const sections = document.querySelectorAll('.p-5');
    const socialLinks = document.querySelectorAll('a[href*="t.me"], a[href*="github"], a[href*="steam"], a[href*="spotify"], a[href*="twitch"], a[href*="discord"]');
    const header = document.querySelector('header');
    const mainContainer = document.querySelector('[style*="--bg-link"]');

    
    function animateFadeIn(element, delay = 0) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      element.style.transition = 'none';

      setTimeout(() => {
        element.style.transition = `opacity ${FADE_DURATION}ms ease-out, transform ${FADE_DURATION}ms ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
    }

    
    if (mainContainer) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes bgFadeIn {
          0% { opacity: 0; }
          100% { opacity: 0.45; }
        }
        [style*="--bg-link"]::before {
          animation: bgFadeIn ${FADE_DURATION}ms ease-out forwards !important;
        }
      `;
      document.head.appendChild(style);
    }

    
    if (header) {
      animateFadeIn(header, 0);
    }

    
    sections.forEach((section, index) => {
      animateFadeIn(section, (index + 1) * STAGGER_DELAY);
    });

    socialLinks.forEach((link, index) => {
      animateFadeIn(link, sections.length * STAGGER_DELAY + (index + 1) * STAGGER_DELAY);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateElements);
  } else {
    animateElements();
  }
})();
