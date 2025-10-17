// Altura móvil correcta (evita franja negra)
(function(){ function apply(){ document.documentElement.style.setProperty('--vh',(window.innerHeight*0.01)+'px'); }
apply(); window.addEventListener('resize', apply); })();

// Menú móvil
(function(){
  const btn=document.getElementById('menuBtn'), menu=document.getElementById('menu');
  if(!btn||!menu) return;
  const toggle=()=>{ const open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-hidden', String(open));
    document.body.classList.toggle('no-scroll', !open);
  };
  btn.addEventListener('click', toggle);
  menu.addEventListener('click', e=>{ if(e.target.tagName==='A'){ btn.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }});
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ btn.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }});
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();

// Flip 3D + Lightbox
(function(){
  const cards=document.querySelectorAll('.flip-card');
  const lightbox=document.getElementById('lightbox');
  const lightImg=document.getElementById('lightboxImg');
  const btnClose=document.querySelector('.lightbox-close');

  const toggleCard=(c)=>c.classList.toggle('is-flipped');
  const openLight=(src,alt='')=>{ lightImg.src=src; lightImg.alt=alt; lightbox.classList.add('open'); document.body.classList.add('no-scroll'); };
  const closeLight=()=>{ lightbox.classList.remove('open'); lightImg.src=''; lightImg.alt=''; document.body.classList.remove('no-scroll'); };

  cards.forEach(card=>{
    card.addEventListener('click', e=>{
      const img=e.target.closest('.flip-back img');
      if(img){ openLight(img.src, img.alt); return; }
      toggleCard(card);
    });
    card.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggleCard(card); }
    });
  });

  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLight(); });
  if(btnClose) btnClose.addEventListener('click', closeLight);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLight(); });
})();
