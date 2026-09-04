(function(){
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('primaryNav');
  if(!toggle || !nav) return;

  function closeNav(){
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
  }
  function openNav(){
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close menu');
  }

  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function(e){
    if(nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle){
      closeNav();
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth > 980) closeNav();
  });
})();
