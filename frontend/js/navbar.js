/* =========================================================
   NAVBAR.JS — Scroll state, active link highlight, mobile menu
========================================================= */

(function () {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navUnderline = document.getElementById('navUnderline');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('main section[id]');

  /* ---------------------- Scrolled state + back to top ---------------------- */
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------- Active link on scroll (IntersectionObserver) ---------------------- */
  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active-link', link.dataset.section === id);
    });
    mobileLinks.forEach((link) => {
      link.classList.toggle('active-link', link.dataset.section === id);
    });
    moveUnderline();
  }

  function moveUnderline() {
    const active = document.querySelector('.nav-link.active-link');
    if (!active || !navUnderline) return;
    navUnderline.style.width = `${active.offsetWidth}px`;
    navUnderline.style.left = `${active.offsetLeft}px`;
  }

  let currentSection = 'home';
  function updateActiveLink() {
    let closest = currentSection;
    let closestDist = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const dist = Math.abs(rect.top - 120);
      if (rect.top <= 160 && dist < closestDist) {
        closestDist = dist;
        closest = section.id;
      }
    });

    if (window.scrollY < 100) closest = 'home';

    if (closest !== currentSection) {
      currentSection = closest;
      setActive(closest);
    }
  }

  window.addEventListener('load', () => {
    updateActiveLink();
    moveUnderline();
  });
  window.addEventListener('resize', moveUnderline);

  /* ---------------------- Mobile menu ---------------------- */
  function closeMenu() {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  /* ---------------------- Smooth scroll for all anchor links ---------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
