// ===== Typing Effect =====
const titles = [
    'Automation Test Engineer',
    'Python Developer',
    'Quality Engineering Enthusiast',
    'AI / GenAI Explorer'
];
let titleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const current = titles[titleIdx];
    typingEl.textContent = current.substring(0, charIdx);
    if (!deleting) {
        charIdx++;
        if (charIdx > current.length) { setTimeout(() => deleting = true, 2000); return setTimeout(type, 2000); }
    } else {
        charIdx--;
        if (charIdx === 0) { deleting = false; titleIdx = (titleIdx + 1) % titles.length; }
    }
    setTimeout(type, deleting ? 40 : 80);
}
type();

// ===== Scroll Reveal =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Nav Scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(s => {
        const top = s.offsetTop, h = s.offsetHeight, id = s.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
    });
});

// ===== Counter Animation =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            const duration = 1500;
            const start = performance.now();
            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ===== Cursor Glow =====
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}
