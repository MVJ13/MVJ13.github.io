// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  // Close menu after clicking a link (mobile)
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
// Scroll-reveal for sections
const revealTargets = document.querySelectorAll('.section, .hero');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    // threshold 0 + bottom margin: tall sections (e.g. certificates on a phone) can never fail to reveal
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );
  revealTargets.forEach((target) => observer.observe(target));
} else {
  // Fallback: just show everything
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
// Certificate lightbox
const certDialog = document.getElementById('cert-dialog');
if (certDialog && typeof certDialog.showModal === 'function') {
  const dImg = certDialog.querySelector('.cert-dialog-img');
  const dTitle = certDialog.querySelector('.cert-dialog-title');
  const dMeta = certDialog.querySelector('.cert-dialog-meta');
  const dPdf = certDialog.querySelector('.cert-pdf');
  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      dImg.src = card.getAttribute('href');
      dImg.alt = card.dataset.title + ' certificate';
      dTitle.textContent = card.dataset.title;
      dMeta.textContent = card.dataset.meta;
      if (card.dataset.pdf) {
        dPdf.href = card.dataset.pdf;
        dPdf.hidden = false;
      } else {
        dPdf.hidden = true;
      }
      certDialog.showModal();
    });
  });
  certDialog.querySelector('.cert-close').addEventListener('click', () => certDialog.close());
  // Click on the dark backdrop closes it
  certDialog.addEventListener('click', (e) => { if (e.target === certDialog) certDialog.close(); });
}
