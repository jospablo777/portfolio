/* ═══════════════════════════════════════════════
   José P. Barrantes - Portfolio Scripts
   ═══════════════════════════════════════════════ */

/* ── Email obfuscation (anti-scraper) ── */
(function () {
  var u = 'jospablo777';
  var d = 'gmail.com';
  var addr = u + '@' + d;
  var cta = document.getElementById('emailCta');
  var ft = document.getElementById('emailFooter');
  if (cta) cta.href = 'mail' + 'to:' + addr;
  if (ft) { ft.href = 'mail' + 'to:' + addr; ft.textContent = addr; }
})();

/* ── Project filter buttons ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#projectsGrid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach((card, i) => {
      const labels = card.dataset.labels ? card.dataset.labels.split(',') : [];
      const show = filter === 'all' || labels.includes(filter);
      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = `cardIn 0.45s ${i * 0.06}s ease-out both`;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Skill tiles scroll-reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-tile').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `all 0.5s ${i * 0.03}s ease-out`;
  observer.observe(el);
});
