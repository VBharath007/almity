


document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all cards in this section and activate them
                entry.target.querySelectorAll('.game-card').forEach(card => {
                    card.classList.add('active');
                });
            }
        });
    }, observerOptions);

    // Observe the section
    observer.observe(document.querySelector('.lg\\:grid-cols-2').parentElement.parentElement);
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Special trigger for card deck
                entry.target.querySelectorAll('.game-card').forEach(c => c.classList.add('active'));
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .grid-pattern').forEach(el => observer.observe(el));
});



document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.querySelector('.card-3d-content').style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-3d-content').style.transform =
            `rotateX(0deg) rotateY(0deg)`;
    });
});


document.querySelectorAll('.eye-card').forEach(card => {
    const eye = card.querySelector('.eye');
    const pupil = card.querySelector('.pupil');

    // 1. Blinking Logic (Random)
    const startBlinking = () => {
        const delay = Math.random() * 3000 + 2000;
        setTimeout(() => {
            eye.classList.add('blink');
            setTimeout(() => {
                eye.classList.remove('blink');
                startBlinking();
            }, 150);
        }, delay);
    };
    startBlinking();

    // 2. Eye Tracking Logic
    card.addEventListener('mousemove', (e) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        // Calculate angle and distance
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(rect.width / 4, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 5);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

        // Subtle 3D tilt for the whole eye
        eye.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    // 3. Reset Eye on Leave
    card.addEventListener('mouseleave', () => {
        pupil.style.transform = `translate(-50%, -50%)`;
        eye.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
});


document.querySelectorAll('.eye-card').forEach(card => {
    const eyeOuter = card.querySelector('.eye-outer');
    const iris = card.querySelector('.iris');

    // 1. Natural Tech Blink
    const triggerBlink = () => {
        const delay = Math.random() * 5000 + 2000;
        setTimeout(() => {
            eyeOuter.classList.add('blink');
            setTimeout(() => {
                eyeOuter.classList.remove('blink');
                triggerBlink();
            }, 140);
        }, delay);
    };
    triggerBlink();

    // 2. Precision Eye Tracking
    card.addEventListener('mousemove', (e) => {
        const rect = eyeOuter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        // Controls how far the iris moves within the white part
        const maxDistance = 14;
        const distance = Math.min(maxDistance, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 12);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        iris.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    // 3. Smooth Reset
    card.addEventListener('mouseleave', () => {
        iris.style.transition = 'transform 0.5s ease-out';
        iris.style.transform = `translate(-50%, -50%)`;
        setTimeout(() => iris.style.transition = '', 500);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('parallax-container');
    const scene = document.getElementById('parallax-scene');

    // 3D Parallax Logic
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 45;
        const rotateX = ((y / rect.height) - 0.5) * -45;
        scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        scene.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        scene.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    // Stats Counter
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    if (count < target) {
                        count += (target / 40);
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else { entry.target.innerText = target; }
                };
                updateCount();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
});


document.addEventListener("DOMContentLoaded", function () {

    function updateClock() {
        const now = new Date();

        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secDeg = seconds * 6;
        const minDeg = minutes * 6 + seconds * 0.1;
        const hourDeg = (hours % 12) * 30 + minutes * 0.5;

        const secHand = document.getElementById("sec-hand");
        const minHand = document.getElementById("min-hand");
        const hourHand = document.getElementById("hour-hand");

        if (!secHand || !minHand || !hourHand) return;

        secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    }

    updateClock();
    setInterval(updateClock, 1000);

});



const aiCanvas = document.getElementById('ai-canvas');
const aiCtx = aiCanvas.getContext('2d');

let aiParticles = [];
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resizeAiCanvas() {
    aiCanvas.width = window.innerWidth;
    aiCanvas.height = window.innerHeight;
    initAiGalaxy();
}

window.addEventListener('resize', resizeAiCanvas);

class GalaxyParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * aiCanvas.width;
        this.y = Math.random() * aiCanvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.1 ? '#E11D48' : '#ffffff';
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > aiCanvas.width) this.x = 0;
        else if (this.x < 0) this.x = aiCanvas.width;
        if (this.y > aiCanvas.height) this.y = 0;
        else if (this.y < 0) this.y = aiCanvas.height;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                this.x += directionX * force * 2;
                this.y += directionY * force * 2;
            }
        }
    }

    draw() {
        aiCtx.beginPath();
        aiCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        aiCtx.fillStyle = this.color;
        aiCtx.globalAlpha = this.opacity;
        if (this.color === '#E11D48') {
            aiCtx.shadowBlur = 5;
            aiCtx.shadowColor = '#E11D48';
        } else {
            aiCtx.shadowBlur = 0;
        }
        aiCtx.fill();
        aiCtx.globalAlpha = 1;
        aiCtx.shadowBlur = 0;
    }
}

function initAiGalaxy() {
    aiParticles = [];
    const density = 15000;
    const numberOfParticles = (aiCanvas.width * aiCanvas.height) / density;
    for (let i = 0; i < numberOfParticles; i++) {
        aiParticles.push(new GalaxyParticle());
    }
}

function animateAiGalaxy() {
    // Dynamic background fade for motion trails
    aiCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    aiCtx.fillRect(0, 0, aiCanvas.width, aiCanvas.height);

    for (let i = 0; i < aiParticles.length; i++) {
        aiParticles[i].update();
        aiParticles[i].draw();
    }
    requestAnimationFrame(animateAiGalaxy);
}

resizeAiCanvas();
animateAiGalaxy();


document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    // safety check
    if (!menuBtn || !mobileMenu || !closeMenu) {
        console.error("Mobile menu elements missing");
        return;
    }

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });

});

