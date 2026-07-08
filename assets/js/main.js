/* =========================================================
   Para Susan Abigail — interacciones
   ========================================================= */

/* --- Pétalos que caen (colores pastel, sin emojis) --- */
(function petals() {
  const layer = document.getElementById('petals');
  if (!layer) return;
  const colors = ['#ffd6e0', '#c3e8d0', '#c6dcf2', '#f0a7bd', '#e6d5f2'];
  const total = window.matchMedia('(max-width: 640px)').matches ? 16 : 30;

  for (let i = 0; i < total; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + 'vw';
    const size = 8 + Math.random() * 12;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    const dur = 12 + Math.random() * 14;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = -(Math.random() * dur) + 's';
    p.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);
    layer.appendChild(p);
  }
})();

/* --- Reveal al hacer scroll (líneas de la carta con stagger) --- */
(function reveal() {
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
  }, { threshold: 0.2 });

  // Stagger suave a las líneas de la carta
  const lines = document.querySelectorAll('.letter .line, .letter__close');
  lines.forEach((el, i) => { el.style.setProperty('--rd', (i * 0.12) + 's'); });

  items.forEach(el => io.observe(el));
})();

/* --- Música: Antídoto y Veneno (Eddie Santiago) --- */
(function music() {
  const song = document.getElementById('song');
  const toggle = document.getElementById('musicToggle');
  const intro = document.getElementById('intro');
  const enter = document.getElementById('enterBtn');
  if (!song || !toggle) return;

  song.volume = 0.65;

  function play() {
    song.play().then(() => {
      toggle.classList.remove('is-off');
      toggle.setAttribute('aria-label', 'Pausar música');
    }).catch(() => {
      toggle.classList.add('is-off');
    });
  }
  function pause() {
    song.pause();
    toggle.classList.add('is-off');
    toggle.setAttribute('aria-label', 'Reproducir música');
  }

  // Al entrar desde la portada: arranca la música y revela la página
  if (enter && intro) {
    enter.addEventListener('click', () => {
      intro.classList.add('is-hidden');
      document.body.style.overflow = '';
      play();
    });
    // Bloquea el scroll mientras la portada está visible
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    if (song.paused) play(); else pause();
  });
})();
