const themeBtn = document.getElementById('themeBtn');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const contactMessage = document.getElementById('contactMessage');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀' : '☾';
});

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.textContent = nav.classList.contains('open') ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.textContent = '☰';
}));

// Barra de progreso al desplazarse por la página.
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress').style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + '%';
});

// Animaciones de entrada al aparecer cada sección.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contadores animados.
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 28);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.7 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

document.getElementById('contactBtn').addEventListener('click', () => {
  contactMessage.textContent = '¡Gracias por tu interés! Agrega tu correo o redes sociales aquí para que puedan contactarte.';
});
document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('Iván Castellanos');
    contactMessage.textContent = '¡Nombre copiado al portapapeles!';
  } catch {
    contactMessage.textContent = 'Iván Castellanos';
  }
});
