function handleMouseMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    element.style.setProperty('--mouse-x', `${x}px`);
    element.style.setProperty('--mouse-y', `${y}px`);
}

function initCardEffects() {
    const elements = document.querySelectorAll('.service-card, .stat-item');
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => handleMouseMove(e, element));
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--mouse-x', 'center');
            element.style.setProperty('--mouse-y', 'center');
        });
    });
}

// Parallax efekti için
function initParallax() {
    initCardEffects();
    
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => observer.observe(element));
}

// Sayfa yüklendiğinde paralaks efektini başlat
document.addEventListener('DOMContentLoaded', initParallax); 