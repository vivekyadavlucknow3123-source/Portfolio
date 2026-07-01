/* =========================================================
   PARTICLES.JS — particles.js background configuration
========================================================= */

(function () {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 900 },
      },
      color: { value: ['#a855f7', '#9333ea', '#d8b4fe'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.4,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#a855f7',
        opacity: 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.7,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
      },
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 3 },
      },
    },
    retina_detect: true,
  });
})();
