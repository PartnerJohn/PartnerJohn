// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) {
          a.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== ANIMATED COUNTERS =====
function formatNumber(num) {
  if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter-value');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const isLast = !counter.closest('.counter-item').querySelector('.counter-label').textContent.includes('$');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * ease);

      if (target >= 1000000) {
        counter.textContent = (current / 1000000).toFixed(1) + 'M';
      } else if (target >= 1000) {
        counter.textContent = (current / 1000).toFixed(0) + 'K';
      } else {
        counter.textContent = current.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.dataset.animated = 'true';
      }
    }
    requestAnimationFrame(update);
  });
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(
  '.section-title, .section-subtitle, .video-card, .lb-row, .community-card, .contact-item, .contact-form, .live-container'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

// Trigger counter animation when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.3 });

heroObserver.observe(document.querySelector('.hero'));

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');

function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';

    const colors = ['var(--neon-green)', 'var(--neon-purple)', 'var(--neon-blue)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ===== SOUND TOGGLE =====
const soundToggle = document.getElementById('soundToggle');
const soundOn = soundToggle.querySelector('.sound-on');
const soundOff = soundToggle.querySelector('.sound-off');
let soundEnabled = false;

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundOn.style.display = soundEnabled ? 'block' : 'none';
  soundOff.style.display = soundEnabled ? 'none' : 'block';

  if (!soundEnabled) {
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
  } else {
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
  }
});

// Initialize sound icons
soundOn.style.display = 'none';
soundOff.style.display = 'block';

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn');
  const originalText = btn.textContent;
  btn.textContent = 'Message Sent!';
  btn.style.background = 'linear-gradient(135deg, var(--neon-purple), #7c3aed)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 2500);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
