/* =========================================================
   Para Susan Abigail — interacciones y partículas
   ========================================================= */

/* --- Partículas flotantes: corazones, fresas, notas --- */
(function floatingParticles() {
  const layer = document.getElementById('particles');
  if (!layer) return;
  const emojis = ['💚', '🌸', '💙', '🍓', '♪', '♫', '✦', '🐾'];
  const total = window.matchMedia('(max-width: 640px)').matches ? 14 : 26;

  for (let i = 0; i < total; i++) {
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (0.9 + Math.random() * 1.4) + 'rem';
    s.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    const dur = 12 + Math.random() * 16;
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = -(Math.random() * dur) + 's';
    s.style.opacity = (0.4 + Math.random() * 0.4).toFixed(2);
    layer.appendChild(s);
  }
})();

/* --- Reveal al hacer scroll --- */
(function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();

/* --- Botón de amor: explosión de corazones --- */
(function heartButton() {
  const btn = document.getElementById('heartBtn');
  const burst = document.getElementById('burst');
  if (!btn || !burst) return;
  const hearts = ['💚', '🌸', '💙', '🍓', '♥', '✨'];

  btn.addEventListener('click', () => {
    const rect = btn.getBoundingClientRect();
    const parentRect = burst.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const h = document.createElement('span');
      h.className = 'pop-heart';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = (rect.left - parentRect.left + rect.width / 2) + 'px';
      h.style.top = (rect.top - parentRect.top) + 'px';
      h.style.setProperty('--x', (Math.random() * 220 - 110) + 'px');
      h.style.animationDelay = (Math.random() * 0.25) + 's';
      burst.appendChild(h);
      setTimeout(() => h.remove(), 1700);
    }
  });
})();

/* --- Saludo cariñoso en consola --- */
console.log('%c💚 Hecho con cariño para Susan Abigail Lacayo 🌸', 'color:#8fd3a8;font-size:14px;font-weight:bold;');
