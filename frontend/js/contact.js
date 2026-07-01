/* =========================================================
   CONTACT.JS — Contact form validation & submission
========================================================= */

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.form-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  // Same-origin API base. When the frontend is served by the Express
  // backend (via `npm start` in /backend), this resolves correctly.
  // If you're serving the frontend separately (e.g. Live Server on
  // another port), change API_BASE to your backend URL, e.g.
  // 'http://localhost:5000/api/contact'.
  const API_BASE = '/api/contact';

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('error-name') },
    email: { el: document.getElementById('email'), error: document.getElementById('error-email') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('error-subject') },
    message: { el: document.getElementById('message'), error: document.getElementById('error-message') },
  };

  const validators = {
    name: (v) => {
      if (!v.trim()) return 'Name is required.';
      if (v.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    },
    email: (v) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!v.trim()) return 'Email is required.';
      if (!re.test(v.trim())) return 'Please enter a valid email address.';
      return '';
    },
    subject: (v) => {
      if (!v.trim()) return 'Subject is required.';
      if (v.trim().length < 3) return 'Subject must be at least 3 characters.';
      return '';
    },
    message: (v) => {
      if (!v.trim()) return 'Message is required.';
      if (v.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    },
  };

  function validateField(key) {
    const { el, error } = fields[key];
    const msg = validators[key](el.value);
    error.textContent = msg;
    el.classList.toggle('invalid', Boolean(msg));
    return !msg;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('invalid')) validateField(key);
    });
  });

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.textContent = isLoading ? 'Sending...' : 'Send Message';
    btnSpinner.hidden = !isLoading;
  }

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showStatus('', '');

    const allValid = Object.keys(fields)
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      showStatus('Please fix the errors above before submitting.', 'error');
      return;
    }

    const payload = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      subject: fields.subject.el.value.trim(),
      message: fields.message.el.value.trim(),
    };

    setLoading(true);

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const serverMsg =
          data?.errors?.map((e) => e.message).join(' ') ||
          data?.message ||
          'Something went wrong. Please try again.';
        throw new Error(serverMsg);
      }

      showStatus(data.message || 'Message sent successfully!', 'success');
      form.reset();
    } catch (err) {
      showStatus(
        err.message || 'Unable to send your message right now. Please try again later.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  });
})();
