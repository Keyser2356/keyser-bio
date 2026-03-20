(function () {
  const FADE_DURATION = 100;
  const LIFT_DISTANCE = 3;
  const INITIAL_OPACITY = 0.4;
  const FULL_OPACITY = 1;
  const HOVER_BG_COLOR = '#101010';
  const DEFAULT_BG_COLOR = '#101010';
  const HOVER_BORDER = '#404040';
  const DEFAULT_BORDER = '#1a1a1a';

  let container = null;
  let row = null;
  let cards = [];
  let isContainersHovered = false;

  function animateOpacity(card, targetOpacity, duration) {
    const startOpacity = parseFloat(card.style.opacity) || 1;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const opacity = startOpacity + (targetOpacity - startOpacity) * progress;
      card.style.opacity = opacity;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  function animateTransform(card, targetY, duration) {
    const currentTransform = card.style.transform;
    const startY = currentTransform.includes('translateY') 
      ? parseFloat(currentTransform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/)?.[1] || 0)
      : 0;
    const startTime = performance.now();

    const originalTransition = card.style.transition;
    card.style.transition = 'none !important';

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const y = startY + (targetY - startY) * progress;
      card.style.setProperty('transform', `translateY(${y}px)`, 'important');

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        card.style.transition = originalTransition;
      }
    }

    requestAnimationFrame(animate);
  }

  function animateBgColor(card, targetColor, duration) {
    const startTime = performance.now();
    const startColor = getComputedStyle(card).backgroundColor;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress === 1) {
        card.style.backgroundColor = targetColor;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        card.style.backgroundColor = targetColor;
      }
    }

    requestAnimationFrame(animate);
  }

  function onContainerEnter() {
    isContainersHovered = true;
    cards.forEach((card) => {
      animateOpacity(card, INITIAL_OPACITY, FADE_DURATION);
    });
  }

  function onContainerLeave() {
    
    isContainersHovered = false;
    cards.forEach((card) => {
      animateOpacity(card, FULL_OPACITY, FADE_DURATION);
      animateTransform(card, 0, FADE_DURATION);
      
      if (card.classList.contains('is-playing')) {
        card.style.setProperty('border-color', 'var(--colors-accent-DEFAULT)', 'important');
      } else {
        card.style.borderColor = DEFAULT_BORDER;
      }
      
      card.style.backgroundColor = DEFAULT_BG_COLOR;
    });
  }

  function onCardEnter(card) {
    animateOpacity(card, FULL_OPACITY, FADE_DURATION);
    animateTransform(card, -LIFT_DISTANCE, FADE_DURATION);
    
    if (card.classList.contains('is-playing')) {
      card.style.setProperty('border-color', '#BB63FF', 'important');
    } else {
      card.style.borderColor = HOVER_BORDER;
    }
    
    animateBgColor(card, HOVER_BG_COLOR, FADE_DURATION);
  }

  function onCardLeave(card) {
    if (isContainersHovered) {
      animateOpacity(card, INITIAL_OPACITY, FADE_DURATION);
    } else {
      animateOpacity(card, FULL_OPACITY, FADE_DURATION);
    }
    animateTransform(card, 0, FADE_DURATION);
    
    if (card.classList.contains('is-playing')) {
      card.style.setProperty('border-color', 'var(--colors-accent-DEFAULT)', 'important');
    } else {
      card.style.borderColor = DEFAULT_BORDER;
    }
    
    card.style.backgroundColor = DEFAULT_BG_COLOR;
  }

  function init() {
    container = document.getElementById('spotify-scroll-container');
    row = document.getElementById('spotify-track-row');
    
    if (!container || !row) {
      setTimeout(init, 100);
      return;
    }

    container.addEventListener('mouseenter', onContainerEnter);
    container.addEventListener('mouseleave', onContainerLeave);

    
    window.addEventListener('mousemove', (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    });

    function attachCard(card) {
      card.addEventListener('animationend', () => {
        card.style.animation = 'none';
      }, { once: true });

      card.addEventListener('mouseenter', () => onCardEnter(card));
      card.addEventListener('mouseleave', () => onCardLeave(card));
    }

    const observer = new MutationObserver(() => {
      const newCards = row.querySelectorAll('.spotify-card');
      cards = Array.from(newCards);
      cards.forEach(attachCard);
    });

    observer.observe(row, {
      childList: true,
      subtree: false,
    });

    const initialCards = row.querySelectorAll('.spotify-card');
    cards = Array.from(initialCards);
    cards.forEach(attachCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
