// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10,10,10,0.98)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.85)';
  }
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('active');
}

// ===== COUNT UP =====
window.addEventListener('load', () => {
  document.querySelectorAll('.stat-big[data-target]').forEach(el => {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    let count = 0;
    const step = Math.ceil(target / 50);

    const update = () => {
      count += step;
      if (count >= target) {
        el.textContent = target + suffix;
      } else {
        el.textContent = count + suffix;
        setTimeout(update, 30);
      }
    };
    update();
  });
});

// ===== GALLERY FILTER =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.getAttribute('data-type') !== filter);
    });
  });
});

// ===== PLAYLIST TABS =====
document.querySelectorAll('.pl-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pl-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.playlist-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.getAttribute('data-player'));
    if (target) target.classList.add('active');
  });
});

// ===== MEMBER SLIDER =====
const cards = document.querySelectorAll('.member-track .member-card');
const dotsContainer = document.getElementById('sliderDots');
let current = 0;

if (cards.length && dotsContainer) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  cards[0].classList.add('active');

  function goTo(index) {
    cards[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');

    const counter = document.getElementById('sliderCounter');
    if (counter) counter.textContent = `${current + 1} / ${cards.length}`;
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  let startX = 0;
  const track = document.getElementById('memberTrack');
  if (track) {
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animasi sekali aja
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== STAGGER REVEAL (animasi berurutan) =====
document.querySelectorAll('.stagger-wrap').forEach(wrap => {
  const children = wrap.querySelectorAll('.stagger-item');
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 120);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  staggerObserver.observe(wrap);
});
