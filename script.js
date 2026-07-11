document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const progress = document.querySelector('.page-progress span');
const year = document.querySelector('[data-year]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');
const brand = document.querySelector('.brand');

if (year) year.textContent = String(new Date().getFullYear());

function setMenu(open) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  navLinks.classList.toggle('is-open', open);
  document.body.classList.toggle('nav-open', open);
  [mainContent, footer].filter(Boolean).forEach((element) => {
    if (open) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    setMenu(opening);
    if (opening) {
      const firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  if (brand) brand.addEventListener('click', () => setMenu(false));

  document.addEventListener('keydown', (event) => {
    const menuOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (event.key === 'Escape' && menuOpen) {
      setMenu(false);
      menuToggle.focus();
    }

    if (event.key === 'Tab' && menuOpen) {
      const focusable = [
        brand,
        menuToggle,
        ...navLinks.querySelectorAll('a'),
      ].filter((element) => element && !element.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });
}

let ticking = false;

function updateScrollUI() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

  if (header) header.classList.toggle('is-scrolled', scrollTop > 16);
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });

updateScrollUI();

const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .1, .5] });

  observedSections.forEach((section) => sectionObserver.observe(section));
}
