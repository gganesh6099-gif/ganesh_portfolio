/* =============================================================
   A. GANESH PORTFOLIO — script.js
   ============================================================= */

/* ── 1. Navbar: add scrolled class + active link highlight ── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
  }, { passive: true });

  // Highlight nav link matching current section
  function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Mobile hamburger toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ── 2. Scroll Reveal Animation ── */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .about-card, .highlight-item, ' +
    '.timeline-content, .contact-card, .section-header'
  );

  // Add reveal class to each element
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    // Add staggered delay for grid items
    const parent = el.parentElement;
    if (parent) {
      const siblings = [...parent.children].filter(c => c === el || c.classList.contains(el.classList[0]));
      const idx = siblings.indexOf(el);
      if (idx === 1) el.classList.add('reveal-delay-1');
      if (idx === 2) el.classList.add('reveal-delay-2');
      if (idx === 3) el.classList.add('reveal-delay-3');
    }
  });

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
})();


/* ── 3. Footer year ── */
(function setFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ── 4. Smooth scroll polyfill for older browsers ── */
(function smoothScrollPolyfill() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ── 5. Skill card tilt effect (subtle 3D on hover) ── */
(function initTilt() {
  const cards = document.querySelectorAll('.skill-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -6; // max 6deg
      const rotY  = ((x - cx) / cx) *  6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
