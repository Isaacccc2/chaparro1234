// ===== Altura móvil correcta (evita franja negra) =====
(function setVH(){
  function apply(){ document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px'); }
  apply(); window.addEventListener('resize', apply);
})();

// ===== Menú móvil =====
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

// ===== Slideshow del héroe: dionisio1–dionisio4 =====
(function(){
  // Cambia extensiones si tus archivos no son .jpg
  const IMAGES = ['dionisio1.jpg', 'dionisio2.jpg', 'dionisio3.jpg', 'dionisio4.jpg'];

  const a = document.querySelector('.hero-bg-a');
  const b = document.querySelector('.hero-bg-b');
  if (!a || !b || IMAGES.length === 0) return;

  // Precarga ligera
  IMAGES.forEach(src => { const img = new Image(); img.src = src; });

  let i = 0;
  let showA = true;

  // Fondo inicial
  a.style.backgroundImage = `url('${IMAGES[0]}')`;
  if (IMAGES.length > 1) b.style.backgroundImage = `url('${IMAGES[1]}')`;

  function nextSlide(){
    const nextIndex = (i + 1) % IMAGES.length;

    if (showA){
      b.style.backgroundImage = `url('${IMAGES[nextIndex]}')`;
      b.classList.add('show'); b.classList.remove('hide');
      a.classList.add('hide'); a.classList.remove('show');
    } else {
      a.style.backgroundImage = `url('${IMAGES[nextIndex]}')`;
      a.classList.add('show'); a.classList.remove('hide');
      b.classList.add('hide'); b.classList.remove('show');
    }

    showA = !showA;
    i = nextIndex;
  }

  // Cambia cada 6s; ajusta a tu gusto
  let timer = setInterval(nextSlide, 6000);

  // Pausa cuando la pestaña no está visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){ clearInterval(timer); }
    else { timer = setInterval(nextSlide, 6000); }
  });
})();
