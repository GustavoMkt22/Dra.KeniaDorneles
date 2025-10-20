/* menu mobile */
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
hamb?.addEventListener('click', () => menu.classList.toggle('show'));

/* carrossel depoimentos auto */
const track = document.getElementById('testiTrack');
const dotsWrap = document.getElementById('testiDots');

if (track) {
  const cards = [...track.children];

  // cria dots
  cards.forEach((_, i) => {
    const b = document.createElement('button');
    b.onclick = () => set(i);
    dotsWrap.appendChild(b);
  });

  const dots = [...dotsWrap.children];
  let i = 0;

  function set(n) {
    i = (n + cards.length) % cards.length;
    track.style.transform = `translateX(-${i * track.clientWidth}px)`;
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i));
  }

  set(0);
  setInterval(() => set(i + 1), 3500);
}
/* ===== Carrossel genérico (reutilizável) ===== */
function initCarousel(rootSel, trackSel, dotsSel, interval = 3500){
  const root  = document.querySelector(rootSel);
  const track = root?.querySelector(trackSel);
  const dotsWrap = root?.querySelector(dotsSel);
  if(!root || !track || !dotsWrap) return;

  const slides = [...track.children];
  // cria dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  let i = 0, timer;
  function size(){ // corrige largura ao redimensionar
    track.style.transform = `translateX(-${i * root.clientWidth}px)`;
  }
  function go(n){
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * root.clientWidth}px)`;
    dots.forEach((d,k)=> d.setAttribute('aria-current', k===i));
  }
  function start(){ stop(); timer = setInterval(()=>go(i+1), interval); }
  function stop(){ if(timer) clearInterval(timer); }

  // interações
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  window.addEventListener('resize', size, {passive:true});

  // inicia
  go(0); size(); start();
}

/* Inicializa o carrossel da seção “Quem sou” */
initCarousel('.about-gallery', '.about-track', '.about-dots', 3200);
// Botão flutuante 2-cliques (expandir -> abrir link)
(function(){
  const btn = document.getElementById('waFloat');
  if(!btn) return;

  btn.addEventListener('click', function(e){
    const expanded = btn.classList.contains('expanded');
    if(!expanded){
      e.preventDefault();              // 1º clique: não abre o link
      btn.classList.add('expanded');   // só expande e mostra o texto
      // (opcional) recolher depois de alguns segundos se não clicarem:
      clearTimeout(btn._collapseTimer);
      btn._collapseTimer = setTimeout(()=>btn.classList.remove('expanded'), 5000);
    } else {
      // 2º clique: deixa seguir o href (abre o WhatsApp)
      // nada a fazer — o link navega normalmente
    }
  }, false);
})();
