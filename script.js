// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Email validation
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

// Contact form — EmailJS
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const emailInput = this.querySelector('input[name="from_email"]');
  let errorEl = this.querySelector('.email-error');

  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'email-error';
    emailInput.insertAdjacentElement('afterend', errorEl);
  }

  if (!isValidEmail(emailInput.value)) {
    emailInput.style.borderColor = '#ef4444';
    errorEl.textContent = 'Please enter a valid email address (e.g. name@example.com)';
    return;
  }

  emailInput.style.borderColor = '';
  errorEl.textContent = '';

  const btn = this.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  emailjs.sendForm('service_61gtq0r', 'template_8c8n9jf', this)
    .then(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      this.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(() => {
      btn.textContent = 'Failed. Try Again.';
      btn.style.background = '#ef4444';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
      link.style.color = '#6c63ff';
    }
  });
});
