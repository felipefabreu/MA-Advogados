import './style.css';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    const requiredFields = form.querySelectorAll('[required]');
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const container = field.closest('.field') || field.closest('.field-check');
      const valid =
        field.type === 'checkbox' ? field.checked : field.value.trim().length > 0;

      if (!valid) {
        container?.classList.add('invalid');
        if (!firstInvalid) firstInvalid = field;
      } else {
        container?.classList.remove('invalid');
      }
    });

    const emailField = form.querySelector('#email');
    if (emailField && emailField.value) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
      if (!emailOk) {
        emailField.closest('.field')?.classList.add('invalid');
        if (!firstInvalid) firstInvalid = emailField;
      }
    }

    if (firstInvalid) {
      feedback.classList.add('error');
      feedback.textContent =
        'Por favor, revise os campos destacados antes de enviar.';
      firstInvalid.focus();
      return;
    }

    feedback.classList.add('success');
    feedback.textContent =
      'Mensagem registrada. Nossa equipe retornará em até um dia útil.';
    form.reset();
  });

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.closest('.field')?.classList.remove('invalid');
      field.closest('.field-check')?.classList.remove('invalid');
    });
  });
}
