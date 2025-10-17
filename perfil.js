// ===== Fallback de altura móvil (evita la "media pantalla" negra) =====
(function setVH(){
  function apply(){
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  apply();
  window.addEventListener('resize', apply);
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

// ===== Filtros (delegación de eventos + filtrado) =====
(function(){
  const grid = document.getElementById('profilesGrid');
  const filters = document.querySelector('.filters');
  if (!grid || !filters) return;

  // Lee el valor activo por grupo
  const getActive = (attr, def) => {
    const pressed = filters.querySelector(`[${attr}][aria-pressed="true"]`);
    return pressed ? pressed.getAttribute(attr) : def;
  };

  function applyFilters(){
    const level  = getActive('data-filter-level',  'todos');
    const career = getActive('data-filter-career', 'todas');

    const cards = grid.querySelectorAll('.profile-card');
    cards.forEach(card => {
      const lv  = card.dataset.level;   // 'tercer-ciclo' | 'bachillerato'
      const ca  = card.dataset.career;  // 'ciencias' | 'conta' | 'info' | 'tercer-ciclo'

      const okLevel  = (level  === 'todos')  || (lv === level);
      const okCareer = (career === 'todas') || (ca === career) || (career === 'tercer-ciclo' && lv === 'tercer-ciclo');

      card.style.display = (okLevel && okCareer) ? '' : 'none';
    });
  }

  // Delegación de eventos: un solo listener para todos los botones
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter-level], button[data-filter-career]');
    if (!btn) return;

    // Cambia el "pressed" solo dentro del grupo correspondiente
    if (btn.hasAttribute('data-filter-level')) {
      filters.querySelectorAll('button[data-filter-level]').forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
    }
    if (btn.hasAttribute('data-filter-career')) {
      filters.querySelectorAll('button[data-filter-career]').forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
    }

    applyFilters();
  });

  // Primera pasada
  applyFilters();
})();
