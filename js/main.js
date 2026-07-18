/* ═══════════════════════════════════════════════
   José P. Barrantes - Portfolio Scripts
   ═══════════════════════════════════════════════ */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* ── Scroll reveal (cards, headers, skills, stats) ── */
const revealTargets = document.querySelectorAll(
  '.project-card, .section-header, .skills-group, .stat-card, .filter-bar'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((el, i) => {
  // Small stagger between siblings inside the same parent
  const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  el.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 0.07}s`);
  revealObserver.observe(el);
});

/* ── Animated stat counters ── */
(function () {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  function animate(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    if (reducedMotion) { el.textContent = target + suffix; return; }

    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  stats.forEach(el => statObserver.observe(el));
})();

/* ── Project filter buttons ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#projectsGrid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    let shown = 0;

    cards.forEach(card => {
      const labels = card.dataset.labels ? card.dataset.labels.split(',') : [];
      const show = filter === 'all' || labels.includes(filter);
      if (show) {
        card.classList.remove('hidden');
        // Retrigger the entrance animation with a stagger
        card.classList.remove('visible');
        card.style.setProperty('--reveal-delay', `${shown * 0.06}s`);
        void card.offsetHeight;
        card.classList.add('visible');
        shown++;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── Cursor spotlight on cards (pointer devices only) ── */
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

/* ── Mobile navigation ── */
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function closeMobileNav() {
  if (nav.classList.contains('nav-open')) {
    nav.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMobileNav();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ── Scrollspy: highlight the section in view ── */
(function () {
  const sections = document.querySelectorAll('.hero[id], section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navAnchors.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => spyObserver.observe(s));
})();

/* ── Scroll progress bar & back-to-top ── */
(function () {
  const bar = document.querySelector('.scroll-progress');
  const topBtn = document.querySelector('.back-to-top');

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (bar && max > 0) bar.style.width = `${(doc.scrollTop / max) * 100}%`;
    if (topBtn) topBtn.classList.toggle('show', doc.scrollTop > 600);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }
})();

/* ── Footer year ── */
(function () {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
