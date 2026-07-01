/* =========================================================
   TYPING.JS — Typed.js animated role text
========================================================= */

(function () {
  const el = document.getElementById('typed-role');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed-role', {
    strings: [
      'Full Stack Developer',
      'React Developer',
      'Node.js Developer',
      'Problem Solver',
      'Technology Enthusiast',
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 300,
    loop: true,
    smartBackspace: true,
    cursorChar: '',
  });
})();
