const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const revealItems = document.querySelectorAll('.reveal');
const header = document.querySelector('.site-header');

const fallbackSvg = (altText) => {
  const safe = (altText || 'Moandemah Foundation').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${safe}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#dcefe1"/>
          <stop offset="100%" stop-color="#8abf9b"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)"/>
      <circle cx="860" cy="220" r="110" fill="#f7fbf7" opacity="0.75"/>
      <path d="M0 690 C240 600 360 740 580 660 S940 560 1200 700 V900 H0 Z" fill="#5d956f" opacity="0.5"/>
      <rect x="90" y="170" width="320" height="220" rx="26" fill="#ffffff" opacity="0.55"/>
      <text x="80" y="560" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700" fill="#1f4d30">${safe}</text>
      <text x="80" y="625" font-family="Inter, Arial, sans-serif" font-size="30" fill="#335f40">Image placeholder</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = 'true';
      img.src = fallbackSvg(img.alt);
    }
  });
});

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 10;
  header.style.boxShadow = scrolled ? '0 10px 26px rgba(21, 48, 31, 0.08)' : 'none';
});

const year = new Date().getFullYear();
const footer = document.querySelector('.site-footer p:first-child');
if (footer) {
  footer.textContent = `Moandemah Foundation • ${year}`;
}
