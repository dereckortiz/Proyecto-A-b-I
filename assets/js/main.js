/* =========================================================
   Una carta para Abi — interacciones
   ========================================================= */

/* --- Brasas / chispas de fuego que suben --- */
(function embers() {
  const layer = document.getElementById('embers');
  if (!layer) return;
  const total = window.matchMedia('(max-width: 640px)').matches ? 22 : 40;

  for (let i = 0; i < total; i++) {
    const e = document.createElement('i');
    e.style.left = Math.random() * 100 + 'vw';
    const size = 2 + Math.random() * 4;
    e.style.width = size + 'px';
    e.style.height = size + 'px';
    e.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
    const dur = 9 + Math.random() * 11;
    e.style.animationDuration = dur + 's';
    e.style.animationDelay = -(Math.random() * dur) + 's';
    layer.appendChild(e);
  }
})();

/* --- Aparición de la carta al hacer scroll ---
   Scroll + comprobación inicial (fiable en todos los navegadores),
   con una red de seguridad que revela todo pase lo que pase. --- */
(function reveal() {
  const items = [...document.querySelectorAll('.reveal')];

  document.querySelectorAll('.parchment .reveal').forEach((el, i) => {
    el.style.setProperty('--rd', Math.min(i * 0.08, 0.6) + 's');
  });

  function check() {
    const trigger = window.innerHeight * 0.9;
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].getBoundingClientRect().top < trigger) {
        items[i].classList.add('is-visible');
        items.splice(i, 1);
      }
    }
  }

  check();
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')), 4500);
  window.__revealCheck = check;
})();

/* --- Apertura: romper el lacre, chispas y consumir la hoja --- */
(function openLetter() {
  const scene  = document.getElementById('scene');
  const closed = document.getElementById('closed');
  const seal   = document.getElementById('seal');
  const page   = document.getElementById('page');
  if (!scene || !closed || !seal) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.style.overflow = 'hidden';

  function sparks() {
    const r = seal.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    for (let i = 0; i < 26; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.style.left = cx + 'px';
      s.style.top = cy + 'px';
      const ang = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 150;
      s.style.setProperty('--sx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--sy', (Math.sin(ang) * dist - 40) + 'px');
      s.style.animationDelay = (Math.random() * 0.15) + 's';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }
  }

  let opened = false;
  function open() {
    if (opened) return;
    opened = true;

    if (reduce) {
      scene.classList.add('is-hidden');
      document.body.style.overflow = '';
      if (typeof window.__revealCheck === 'function') window.__revealCheck();
      return;
    }

    closed.classList.add('is-opening');   // lacre se rompe + hoja se consume
    sparks();                             // chispas de fuego

    setTimeout(() => {
      scene.classList.add('is-hidden');
      document.body.style.overflow = '';
      if (page) page.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window.__revealCheck === 'function') window.__revealCheck();
    }, 1150);
  }

  seal.addEventListener('click', open);
})();
