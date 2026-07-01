/* =========================================================
   MAIN.JS — App bootstrap: AOS init, current year, misc UI
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------- AOS Init ---------------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ---------------------- Footer year ---------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------- Lazy-load fallback for images ---------------------- */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'lazy';
    });
  }
});
