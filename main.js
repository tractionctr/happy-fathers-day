// ── STARS ──
(function() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;
  const count = 120;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const r = Math.random();
    if (r < 0.08) s.classList.add('red');
    else if (r < 0.14) s.classList.add('amber');
    const size = 1 + Math.random() * 2.2;
    const dur  = 2 + Math.random() * 4;
    const delay = -(Math.random() * dur);
    const minOp = 0.04 + Math.random() * 0.08;
    const maxOp = 0.3  + Math.random() * 0.4;
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${dur.toFixed(2)}s;--delay:${delay.toFixed(2)}s;--min-op:${minOp.toFixed(2)};--max-op:${maxOp.toFixed(2)};`;
    layer.appendChild(s);
  }
})();

// ── SPARKS ──
const sparksEl = document.getElementById('sparks');
if (sparksEl) {
  const colors = ['#C0392B','#E74C3C','#E8970A','#7B1F17','#922B21'];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = Math.random()*100+'%';
    s.style.top  = Math.random()*85+'%';
    s.style.background = colors[Math.floor(Math.random()*colors.length)];
    s.style.animationDelay    = (Math.random()*4)+'s';
    s.style.animationDuration = (3+Math.random()*4)+'s';
    const sz = (4+Math.random()*8)+'px';
    s.style.width = s.style.height = sz;
    sparksEl.appendChild(s);
  }
}

// ── LIGHTBOX ──
const galleryImgs = [...document.querySelectorAll('.gallery-item img')];
let currentLightbox = 0;
function openLightbox(id) {
  const idx = galleryImgs.findIndex(img => img.closest('.gallery-item').getAttribute('onclick').includes(id));
  currentLightbox = idx >= 0 ? idx : 0;
  document.getElementById('lightboxImg').src = galleryImgs[currentLightbox].src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(e) {
  if (!e || e.target !== document.getElementById('lightboxImg'))
    document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') lb.classList.remove('open');
  if (e.key === 'ArrowRight') { currentLightbox=(currentLightbox+1)%galleryImgs.length; document.getElementById('lightboxImg').src=galleryImgs[currentLightbox].src; }
  if (e.key === 'ArrowLeft')  { currentLightbox=(currentLightbox+galleryImgs.length-1)%galleryImgs.length; document.getElementById('lightboxImg').src=galleryImgs[currentLightbox].src; }
});

// ── REV BARS ──
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.rev-bar-fill').forEach(b => b.style.width = b.dataset.target+'%');
      revObs.unobserve(e.target);
    }
  });
}, {threshold: 0.3});
const revSec = document.getElementById('revSection');
if (revSec) revObs.observe(revSec);