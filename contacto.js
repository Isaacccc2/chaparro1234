// Altura móvil correcta (evita franja negra)
(function setVH(){
  function apply(){ document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px'); }
  apply(); window.addEventListener('resize', apply);
})();

// Menú móvil
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
