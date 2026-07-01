/* =========================================================
   ANIMATION.JS — GSAP: loader, reveals, scroll triggers,
   counters, tilt cards, parallax, skills tabs
========================================================= */

(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ================= LOADING SCREEN ================= */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('.loader-bar-fill');
  const loaderPercent = document.querySelector('.loader-percent');

  const loadTl = gsap.timeline({
    onComplete: () => {
      document.body.classList.add('loaded');
      runHeroReveal();
    },
  });

  const progressObj = { value: 0 };
  loadTl.to(progressObj, {
    value: 100,
    duration: 1.6,
    ease: 'power2.inOut',
    onUpdate: () => {
      const val = Math.round(progressObj.value);
      if (loaderFill) loaderFill.style.width = `${val}%`;
      if (loaderPercent) loaderPercent.textContent = `${val}%`;
    },
  });

  loadTl.to(
    loader,
    {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    },
    '+=0.15'
  );

  loadTl.set(loader, { display: 'none' });

  /* ================= HERO REVEAL SEQUENCE ================= */
  function runHeroReveal() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.hero-hello.reveal-text span, .hero-name .reveal-text span', {
      yPercent: 0,
      duration: 1,
      stagger: 0.12,
    })
      .to(
        '.hero-role',
        { opacity: 1, duration: 0.6 },
        '-=0.5'
      )
      .to(
        '.hero-desc, .hero-buttons, .hero-stats',
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.3'
      )
      .fromTo(
        '.hero-image-wrap',
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=1.2'
      )
      .fromTo(
        '.hero-socials',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.6'
      )
      .fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      );
  }

  /* ================= COUNTERS ================= */
  function animateCounters() {
    document.querySelectorAll('.counter').forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10) || 0;
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.8,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate: function () {
                counter.textContent = Math.round(counter.innerText);
              },
            }
          );
        },
      });
    });
  }
  animateCounters();

  /* ================= SECTION HEAD + GENERIC SCROLL REVEALS ================= */
  gsap.utils.toArray('.about-image-frame, .about-exp-card').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  });

  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: (i % 10) * 0.05,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: card, start: 'top 92%' },
      }
    );
  });

  gsap.utils.toArray('.contact-info-item').forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 90%' },
      }
    );
  });

  /* ================= PROJECT CARD TILT ================= */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const inner = card.querySelector('.project-card-inner');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;

        gsap.to(inner, {
          rotateX,
          rotateY,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      });
    });

    /* ================= SKILL CARD 3D TILT ================= */
    document.querySelectorAll('.skill-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -14;
        const rotateY = ((x - rect.width / 2) / rect.width) * 14;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.35,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
      });
    });
  }

  /* ================= PARALLAX ON HERO GLOWS ================= */
  if (!prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to('.hero-glow-1', { x: x * 24, y: y * 24, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hero-glow-2', { x: -x * 18, y: -y * 18, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hero-orbit-ring', { x: x * 10, y: y * 10, duration: 1, ease: 'power2.out' });
    });
  }

  /* ================= SKILLS TABS ================= */
  const tabs = document.querySelectorAll('.skills-tab');
  const panels = document.querySelectorAll('.skills-grid');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.toggle('active', t === tab));

      panels.forEach((panel) => {
        if (panel.dataset.panel === target) {
          panel.hidden = false;
          gsap.fromTo(
            panel.children,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
          );
        } else {
          panel.hidden = true;
        }
      });

      ScrollTrigger.refresh();
    });
  });

  /* ================= CERTIFICATE CARD REVEAL ================= */
  gsap.fromTo(
    '.cert-empty-card',
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cert-timeline', start: 'top 85%' },
    }
  );

  /* Refresh ScrollTrigger after everything is set up */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
