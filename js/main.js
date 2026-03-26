// ===== Header Scroll Effect =====
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
}

window.addEventListener('scroll', updateHeader);
updateHeader();

// ===== Mobile Menu =====
function setNavOpen(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    nav.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
}

hamburger.addEventListener('click', () => {
    setNavOpen(!nav.classList.contains('active'));
});

// Close menu on link click
nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
        setNavOpen(false);
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        setNavOpen(false);
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        setNavOpen(false);
    }
});

// ===== Scroll Animations =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => observer.observe(el));

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
