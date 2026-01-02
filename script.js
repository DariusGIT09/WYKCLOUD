const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#00f0ff' : '#7000ff';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    let previousWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        // Only resize if width changes (ignores mobile address bar vertical resize)
        if (window.innerWidth !== previousWidth) {
            previousWidth = window.innerWidth;
            resize();
        }
    });
    resize();
    initParticles();
    animateParticles();
}



// --- 3. CHART.JS VISUALIZATIONS ---

// Common Chart Options
// Common Chart Options
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Rajdhani', sans-serif";
}

const techRadarEl = document.getElementById('techRadarChart');
if (techRadarEl) {
    const techRadarCtx = techRadarEl.getContext('2d');
    // 1. TECH CAPABILITY RADAR (Spider Chart)
    // Comparing WykCloud vs Industry Average
    let techRadarChart = new Chart(techRadarCtx, {
        type: 'radar',
        data: {
            labels: ['Security', 'Scalability', 'Speed', 'AI Integration', 'UX Design', 'Reliability'],
            datasets: [{
                label: 'WykCloud Standards',
                data: [95, 90, 98, 85, 92, 99],
                fill: true,
                backgroundColor: 'rgba(0, 240, 255, 0.2)',
                borderColor: '#00f0ff',
                pointBackgroundColor: '#00f0ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00f0ff',
                borderWidth: 2
            }, {
                label: 'Industry Average',
                data: [65, 50, 60, 40, 55, 70],
                fill: true,
                backgroundColor: 'rgba(112, 0, 255, 0.1)',
                borderColor: '#7000ff',
                pointBackgroundColor: '#7000ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#7000ff',
                borderWidth: 2,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            element: {
                line: { tension: 0.4 }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(0, 240, 255, 0.1)' }, // Neon grid
                    pointLabels: {
                        color: '#fff',
                        font: { size: 12, weight: 'bold' }
                    },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, color: '#fff' } }
            }
        }
    });
}

const techStackEl = document.getElementById('techStackChart');
if (techStackEl) {
    const techStackCtx = techStackEl.getContext('2d');
    // 2. TECH STACK ECOSYSTEM (Polar Area Chart)
    // Visualizing key technologies driving solutions
    let techStackChart = new Chart(techStackCtx, {
        type: 'polarArea',
        data: {
            labels: ['React / Next.js', 'Python / AI', 'Cloud (AWS/Azure)', 'Node.js', 'CyberSec / Blockchain'],
            datasets: [{
                label: 'Technology Dominance',
                data: [90, 85, 95, 80, 75],
                backgroundColor: [
                    'rgba(0, 240, 255, 0.6)', // Cyan
                    'rgba(112, 0, 255, 0.6)', // Purple
                    'rgba(217, 70, 239, 0.6)', // Pink
                    'rgba(34, 197, 94, 0.6)',  // Green
                    'rgba(234, 179, 8, 0.6)'   // Yellow
                ],
                borderColor: '#1e293b', // Dark border matching bg
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: {
                legend: { position: 'right', labels: { usePointStyle: true, color: '#fff' } }
            }
        }
    });
}



// --- 4. SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter')) {
                animateValue(entry.target, 0, parseFloat(entry.target.getAttribute('data-target')), 2000);
                observer.unobserve(entry.target);
            }
            if (entry.target.classList.contains('reveal-on-scroll')) {
                entry.target.classList.add('reveal-visible');

                // Cleanup after animation to fix hover lag
                // Cleanup after animation (fallback to timeout to ensure execution)
                setTimeout(() => {
                    entry.target.classList.remove('reveal-on-scroll', 'reveal-visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 1000); // 1s to safely cover 0.8s animation
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.counter').forEach(el => observer.observe(el));
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end + (obj.innerHTML.includes('.') ? '' : '+');
        }
    };
    window.requestAnimationFrame(step);
}


// --- 5. MOBILE MENU TOGGLE ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Execution Protocol Animation
document.addEventListener('DOMContentLoaded', () => {
    const protocolSection = document.getElementById('execution-protocol');
    const protocolLine = document.getElementById('protocol-line');
    const steps = document.querySelectorAll('.protocol-step');

    if (protocolSection && protocolLine) {
        const runAnimation = () => {
            const sectionTop = protocolSection.offsetTop;
            const sectionHeight = protocolSection.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition > sectionTop - 100 && scrollPosition < sectionTop + sectionHeight + 500) {
                const relativeScroll = scrollPosition - sectionTop;
                let progressPercentage = (relativeScroll / sectionHeight) * 100;

                progressPercentage = Math.max(0, Math.min(100, progressPercentage));
                protocolLine.style.height = `${progressPercentage}%`;

                steps.forEach((step, index) => {
                    const threshold = (index + 0.2) * (100 / steps.length);
                    if (progressPercentage > threshold) {
                        step.classList.remove('opacity-0');
                        step.classList.add('opacity-100', 'translate-y-0');
                    }
                });
            }
        };

        window.addEventListener('scroll', runAnimation);
        // Run once on load to catch initial state
        runAnimation();
    }
});

// Dynamic Infinite Marquee
document.addEventListener('DOMContentLoaded', () => {
    const marqueeTrack = document.querySelector('.marquee-track');
    const marqueeContent = document.querySelector('.marquee-content');

    if (marqueeTrack && marqueeContent) {
        // Clone the content to create the seamless loop effect
        const clone = marqueeContent.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true'); // Hide from screen readers to avoid duplication
        marqueeTrack.appendChild(clone);
    }
});

// --- 7. TERMINAL FAQ ACCORDION ---
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const cmdLine = item.querySelector('.cmd-line');
        const content = item.querySelector('.faq-content');

        if (cmdLine && content) {
            cmdLine.addEventListener('click', () => {
                // Toggle current item
                const isOpen = content.classList.contains('open');

                // Close all others (optional - can keep multiple open if preferred)
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherContent && otherContent !== content) {
                        otherContent.style.maxHeight = null;
                        otherContent.classList.remove('open');
                    }
                });

                if (!isOpen) {
                    content.classList.add('open');
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.classList.remove('open');
                    content.style.maxHeight = null;
                }
            });
        }
    });
});