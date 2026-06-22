/* ==========================================
   DARK MODE TOGGLE
========================================== */
const themeToggle = document.getElementById('themeToggle');

// Load saved preference (default: light)
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

/* ==========================================
   TYPED TEXT — Hero title animation
========================================== */
const typedEl = document.querySelector('.typed-text');
const phrases = [
  'Computer Science Student',
  'Data Science & AI Enthusiast',
  'Backend Developer',
  'Problem Solver',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    // Pause at end
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

// Start after a short delay
setTimeout(type, 600);

/* ==========================================
   NAVBAR — Scroll effect & active link
========================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==========================================
   HAMBURGER MENU — Mobile
========================================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

/* ==========================================
   SCROLL REVEAL — IntersectionObserver
========================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==========================================
   SMOOTH ACTIVE NAV HIGHLIGHT
========================================== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach((a) => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--primary)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ==========================================
   PARALLAX ORBS — Subtle mouse movement
========================================== */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  if (orb1) orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
});

/* ==========================================
   PROJECT CARDS — Tilt effect on hover
========================================== */
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ==========================================
   HERO PARTICLES
========================================== */
const heroCanvas = document.getElementById('hero-particles');
if (heroCanvas) {
  const hCtx = heroCanvas.getContext('2d');
  let hW, hH, dots;

  function resizeHero() {
    hW = heroCanvas.width  = heroCanvas.offsetWidth;
    hH = heroCanvas.height = heroCanvas.offsetHeight;
  }

  function makeDots() {
    dots = Array.from({ length: 40 }, () => ({
      x:  Math.random() * hW,
      y:  Math.random() * hH,
      r:  Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      o:  Math.random() * 0.4 + 0.1,
    }));
  }

  function drawParticles() {
    hCtx.clearRect(0, 0, hW, hH);
    const dark  = document.body.classList.contains('dark');
    const rgb   = dark ? '160,160,255' : '99,102,241';

    dots.forEach(a => {
      dots.forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          hCtx.beginPath();
          hCtx.strokeStyle = `rgba(${rgb},${0.09 * (1 - d / 130)})`;
          hCtx.lineWidth = 0.6;
          hCtx.moveTo(a.x, a.y);
          hCtx.lineTo(b.x, b.y);
          hCtx.stroke();
        }
      });
      hCtx.beginPath();
      hCtx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      hCtx.fillStyle = `rgba(${rgb},${a.o})`;
      hCtx.fill();
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > hW) a.vx *= -1;
      if (a.y < 0 || a.y > hH) a.vy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }

  resizeHero();
  makeDots();
  drawParticles();
  window.addEventListener('resize', () => { resizeHero(); makeDots(); });
}

/* ==========================================
   TIMELINE DRAW
========================================== */
const expLine = document.querySelector('.exp-line');
if (expLine) {
  const lineObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      expLine.classList.add('drawn');
      lineObserver.disconnect();
    }
  }, { threshold: 0.1 });
  lineObserver.observe(expLine);
}

/* ==========================================
   CUSTOM CURSOR
========================================== */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .project-card, .cert-card, .skill-category, .contact-card, .exp-gallery-item, .winner-photo, .exp-skill-badge, .tag, .tech-tag';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  });
}

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total    = document.body.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

/* ==========================================
   COUNTER ANIMATION — About Stats
========================================== */
function animateCount(el, target, suffix) {
  const duration = 1400;
  const start    = performance.now();
  function tick(now) {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  let counted = false;
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.stat-num').forEach(el => {
        const raw = el.textContent.trim();
        if (raw === '5+')  animateCount(el, 5, '+');
        if (raw === '3rd') {
          let n = 0;
          const iv = setInterval(() => {
            n++;
            const sfx = n === 1 ? 'st' : n === 2 ? 'nd' : 'rd';
            el.textContent = n + sfx;
            if (n >= 3) clearInterval(iv);
          }, 250);
        }
      });
    }
  }, { threshold: 0.6 });
  counterObserver.observe(aboutStats);
}

/* ==========================================
   MAGNETIC BUTTONS
========================================== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
});

/* ==========================================
   SPOTLIGHT
========================================== */
const spotlight = document.createElement('div');
spotlight.id = 'spotlight';
document.body.appendChild(spotlight);
document.addEventListener('mousemove', (e) => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top  = e.clientY + 'px';
}, { passive: true });

/* ==========================================
   TEXT SCRAMBLE — section titles
========================================== */
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function scrambleTitle(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [], originals = [];
  let n;
  while ((n = walker.nextNode())) {
    if (n.textContent.trim()) { nodes.push(n); originals.push(n.textContent); }
  }
  let frame = 0;
  const total = 20;
  const iv = setInterval(() => {
    nodes.forEach((node, ni) => {
      const orig = originals[ni];
      node.textContent = orig.split('').map((ch, ci) => {
        if (ch === ' ') return ' ';
        if (frame / total > ci / orig.length) return ch;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');
    });
    frame++;
    if (frame > total) {
      nodes.forEach((node, ni) => { node.textContent = originals[ni]; });
      clearInterval(iv);
    }
  }, 32);
}

const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrambleTitle(entry.target);
      scrambleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(el => scrambleObserver.observe(el));

/* ==========================================
   STAGGERED PROJECT CARDS
========================================== */
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.07) + 's';
});

/* ==========================================
   PROFILE IMAGE 3D TILT
========================================== */
const profileWrapper = document.querySelector('.profile-img-wrapper');
if (profileWrapper) {
  profileWrapper.addEventListener('mousemove', (e) => {
    const r  = profileWrapper.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    profileWrapper.style.transform = `perspective(700px) rotateX(${-dy * 10}deg) rotateY(${dx * 10}deg)`;
  });
  profileWrapper.addEventListener('mouseleave', () => {
    profileWrapper.style.transition = 'transform 0.5s ease';
    profileWrapper.style.transform  = '';
    setTimeout(() => { profileWrapper.style.transition = ''; }, 500);
  });
}

/* ==========================================
   CONFETTI — Winner banner
========================================== */
function launchConfetti(x, y) {
  const colors = ['#ffd700','#ff6b6b','#6366f1','#06b6d4','#10b981','#f59e0b','#a78bfa'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 7 + 4;
    p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size * (Math.random() > 0.5 ? 1 : 0.45)}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;z-index:99999;`;
    document.body.appendChild(p);
    const angle = (Math.random() * Math.PI * 2);
    const speed = Math.random() * 9 + 4;
    let px = x, py = y, vx = Math.cos(angle) * speed, vy = Math.sin(angle) * speed - 12, op = 1;
    (function fall() {
      vy += 0.45; px += vx; py += vy; op -= 0.013;
      p.style.left    = px + 'px';
      p.style.top     = py + 'px';
      p.style.opacity = op;
      p.style.transform = `rotate(${px * 3}deg)`;
      if (op > 0) requestAnimationFrame(fall); else p.remove();
    })();
  }
}
const winnerBanner = document.querySelector('.winner-award-banner');
if (winnerBanner) {
  winnerBanner.addEventListener('click', (e) => launchConfetti(e.clientX, e.clientY));
}

/* ==========================================
   ACTIVE NAV — class based
========================================== */
const sectionObserver2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('nav-active');
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) a.classList.add('nav-active');
      });
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver2.observe(s));

/* ==========================================
   LIGHTBOX
========================================== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('img:not(.lightbox-img)').forEach((img) => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
