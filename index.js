// ===== Fallback de altura móvil (ya lo tenías) =====
(function setVH(){
  function apply(){ document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px'); }
  apply(); window.addEventListener('resize', apply);
})();

// ===== Menú móvil (ya lo tenías) =====
(function(){
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  if (!menuBtn || !menu) return;

  const toggle = () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-hidden', String(open));
    document.body.classList.toggle('no-scroll', !open);
  };
  menuBtn.addEventListener('click', toggle);

  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A'){
      menuBtn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      menuBtn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ===== Slideshow de 4 imágenes en el héroe =====
// Pon aquí los nombres EXACTOS de tus 4 imágenes (mismo folder que index.html)
(function(){
  const IMAGES = [
    'fondo1.jpg',
    'fondo2.jpg',
    'fondo3.jpg',
    'fondo4.jpg'
  ];
  // Si tus archivos tienen otros nombres, cámbialos arriba (mantén comillas y comas)

  const a = document.querySelector('.hero-bg-a');
  const b = document.querySelector('.hero-bg-b');
  if (!a || !b || IMAGES.length === 0) return;

  // Pre-carga ligera
  IMAGES.forEach(src => { const img = new Image(); img.src = src; });

  let i = 0;             // índice actual
  let showA = true;      // qué capa está visible

  // fondo inicial
  a.style.backgroundImage = `url('${IMAGES[0]}')`;
  if (IMAGES.length > 1) b.style.backgroundImage = `url('${IMAGES[1]}')`;

  function nextSlide(){
    const nextIndex = (i + 1) % IMAGES.length;

    if (showA){
      // b entra, a sale
      b.style.backgroundImage = `url('${IMAGES[nextIndex]}')`;
      b.classList.add('show'); b.classList.remove('hide');
      a.classList.add('hide'); a.classList.remove('show');
    } else {
      // a entra, b sale
      a.style.backgroundImage = `url('${IMAGES[nextIndex]}')`;
      a.classList.add('show'); a.classList.remove('hide');
      b.classList.add('hide'); b.classList.remove('show');
    }

    showA = !showA;
    i = nextIndex;
  }

  // cambia cada 6 segundos (ajusta a tu gusto: 4000, 7000, etc.)
  let timer = setInterval(nextSlide, 6000);

  // pausa si la pestaña no está visible (ahorra batería)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){ clearInterval(timer); }
    else { timer = setInterval(nextSlide, 6000); }
  });
})();

// ===== Noticias: marcar "Nuevo" (últimos 10 días) y ordenar por fecha =====
(function(){
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.news-card'));
  // Ordenar por data-date (desc)
  cards.sort((a,b) => new Date(b.dataset.date) - new Date(a.dataset.date));
  cards.forEach(c => grid.appendChild(c));

  // Marcar "Nuevo" si la fecha es reciente
  const now = new Date();
  cards.forEach(card => {
    const d = new Date(card.dataset.date);
    const diffDays = (now - d) / (1000*60*60*24);
    if (diffDays <= 10) card.classList.add('is-new');
  });
})();

