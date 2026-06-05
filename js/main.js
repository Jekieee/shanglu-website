(function () {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxName = document.getElementById('lightboxName');
  const lightboxClose = document.getElementById('lightboxClose');
  const prologueModal = document.getElementById('prologueModal');
  const prologueModalTitle = document.getElementById('prologueModalTitle');
  const prologueInput = document.getElementById('prologueInput');
  const prologueSubmit = document.getElementById('prologueSubmit');
  const prologueError = document.getElementById('prologueError');
  const prologueModalClose = document.getElementById('prologueModalClose');
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let currentChar = '';

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const revealEls = document.querySelectorAll(
    '.story-grid, .section-header, .char-card, .info-card, .atmo-content'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));

  function showPrologue(char) {
    lightboxImg.src = PROLOGUE_FILES[char];
    lightboxImg.alt = `${char} 序幕`;
    lightboxName.textContent = `${char} · 序幕`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openPrologueModal(char) {
    currentChar = char;
    prologueModalTitle.textContent = `${char} · 序幕`;
    prologueInput.value = '';
    prologueError.textContent = '';
    prologueModal.classList.add('active');
    prologueInput.focus();
  }

  function closePrologueModal() {
    prologueModal.classList.remove('active');
    currentChar = '';
  }

  function tryUnlockPrologue() {
    const result = verifyProloguePassword(currentChar, prologueInput.value);
    if (!result) {
      prologueError.textContent = '密钥错误，请重试';
      return;
    }
    closePrologueModal();
    showPrologue(result.char);
  }

  document.querySelectorAll('.char-card').forEach((card) => {
    card.addEventListener('click', () => {
      openPrologueModal(card.dataset.char);
    });
  });

  prologueSubmit.addEventListener('click', tryUnlockPrologue);
  prologueInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlockPrologue();
  });
  prologueModalClose.addEventListener('click', closePrologueModal);
  prologueModal.addEventListener('click', (e) => {
    if (e.target === prologueModal) closePrologueModal();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closePrologueModal();
    }
  });

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.5 ? 220 : 270,
    };
  }

  function initParticles() {
    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    particles = Array.from({ length: count }, createParticle);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, `hsla(${p.hue}, 60%, 70%, ${p.opacity})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 60%, 70%, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  const heroImg = document.querySelector('.hero-img');
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight && heroImg) {
      heroImg.style.transform = `scale(${1 + scroll * 0.0003}) translateY(${scroll * 0.3}px)`;
    }
  });
})();
