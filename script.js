/* ============================================================
   ARYA — FRONTEND DEVELOPER PORTFOLIO
   script.js  |  All interactivity & animations
   ============================================================ */

/* ── 1. SET CURRENT YEAR IN FOOTER ── */
document.getElementById('year').textContent = new Date().getFullYear();


/* ── 2. NAVBAR — scroll effect & active state ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Add 'scrolled' class to navbar when page is scrolled down
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ── 3. MOBILE MENU TOGGLE (hamburger) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  // Prevent body scroll when menu is open
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ── 4. SCROLL-REVEAL ANIMATION (Intersection Observer) ── */
// All elements with the class 'reveal' will animate in when they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing (animation plays once)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,        // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom of viewport
  }
);

// Observe every element with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ── 5. SKILL BAR ANIMATION ── */
// Animate skill progress bars when the skills section scrolls into view
const skillsGrid = document.querySelector('.skills-grid');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Set width on each .skill-fill element to trigger CSS transition
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.style.getPropertyValue('--pct') ||
                            getComputedStyle(bar).getPropertyValue('--pct');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsGrid) skillObserver.observe(skillsGrid);


/* ── 6. PROJECT CARD TILT EFFECT (subtle 3-D on hover) ── */
document.querySelectorAll('.project-card').forEach(card => {

  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 to +1
    const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 to +1
    const rotX   = -dy * 6;   // max ±6° vertical
    const rotY   =  dx * 6;   // max ±6° horizontal

    card.style.transform =
      `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  // Reset transform when mouse leaves
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(.25,.46,.45,.94)';
  });
});


/* ── 7. SMOOTH ACTIVE NAV LINK HIGHLIGHT (scroll spy) ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let currentSection = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--accent-1)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);


/* ── 8. CONTACT FORM SUBMISSION (simulated) ── */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const btnText      = document.getElementById('btnText');
const btnIcon      = document.getElementById('btnIcon');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent page reload

  // Get input values
  const name    = contactForm.querySelector('#name').value.trim();
  const email   = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  // Simple validation — all fields required
  if (!name || !email || !message) return;

  // Simulate loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  btnText.textContent = 'Sending…';

  // Simulate server delay (replace with real fetch() for a backend)
  setTimeout(() => {
    // Reset button
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';

    // Clear form fields
    contactForm.reset();

    // Show success message
    formSuccess.classList.add('show');

    // Hide success message after 4 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1400);
});


/* ── 9. BACK TO TOP BUTTON ── */
const backTopBtn = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  // Show button after scrolling 400px
  if (window.scrollY > 400) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
});

backTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── 10. TYPED TEXT EFFECT in Hero subtitle ── */
// Cycles through different role titles for a dynamic feel
const subtitles   = ['Frontend Web Developer', 'UI / UX Enthusiast', 'Creative Coder'];
const subtitleEl  = document.querySelector('.hero-subtitle');
let   subIndex    = 0;
let   charIndex   = 0;
let   isDeleting  = false;
let   typingSpeed = 90;

function typeLoop() {
  const current = subtitles[subIndex];

  if (isDeleting) {
    // Remove one character
    subtitleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Add one character
    subtitleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  // When full text is typed, pause then start deleting
  if (!isDeleting && charIndex === current.length) {
    typingSpeed = 2200;   // Pause before deleting
    isDeleting  = true;
  }

  // When all chars deleted, move to next subtitle
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    subIndex   = (subIndex + 1) % subtitles.length;
    typingSpeed = 400;    // Short pause before typing next
  }

  setTimeout(typeLoop, typingSpeed);
}

// Start typing loop after a short initial delay
setTimeout(typeLoop, 1200);


/* ── 11. HERO ENTRANCE ANIMATION TRIGGER ── */
// Elements already have 'reveal' class; trigger them on load
window.addEventListener('load', () => {
  // Immediately reveal hero elements (no scroll needed)
  document.querySelectorAll('.hero .reveal').forEach(el => {
    // Stagger handled by delay-N classes in CSS
    setTimeout(() => {
      el.classList.add('visible');
    }, 100);
  });
});
