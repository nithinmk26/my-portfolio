/* ===== DYNAMIC EXPERIENCE YEARS ===== */
(function () {
  const start = new Date(2019, 9, 12); // Oct 12, 2019 (month is 0-indexed)
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const formatted = months === 0 ? `${years}+` : `${years}.${months}+`;
  const el = document.getElementById('exp-years');
  if (el) el.textContent = formatted;
  else window.addEventListener('load', function () {
    const el2 = document.getElementById('exp-years');
    if (el2) el2.textContent = formatted;
  });
})();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navLinksList.classList.remove('open');
});

/* ===== TYPEWRITER ===== */
const roles = [
  'Senior Software Engineer',
  'Cloud-Native Specialist',
  'AWS Serverless Expert',
  'Java & Spring Boot Dev',
];
let ri = 0, ci = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const word = roles[ri];
  if (!deleting) {
    typeEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}

type();

/* ===== FADE-IN ON SCROLL ===== */
const fadeEls = document.querySelectorAll(
  '.skill-card, .timeline-card, .edu-card, .contact-card, .section-header'
);

fadeEls.forEach((el) => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));
