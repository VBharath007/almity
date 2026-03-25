document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. MOBILE MENU LOGIC (Fix) ---
    const mBtn = document.getElementById("menu-btn");
    const mMenu = document.getElementById("mobile-menu");
    const mClose = document.getElementById("close-menu");
    const mLinks = document.querySelectorAll("#mobile-menu nav a");

    if (mBtn && mMenu && mClose) {
        // மெனுவைத் திறக்க
        mBtn.addEventListener("click", () => {
            mMenu.classList.remove("translate-x-full");
            document.body.style.overflow = "hidden"; // மெனு இருக்கும்போது பின்னணி ஸ்க்ரோல் ஆகாது
        });

        // மெனுவை மூட
        const closeMenu = () => {
            mMenu.classList.add("translate-x-full");
            document.body.style.overflow = "auto"; // ஸ்க்ரோலிங் மீண்டும் தொடங்கும்
        };

        mClose.addEventListener("click", closeMenu);

        // மெனுவில் உள்ள லிங்குகளைக் கிளிக் செய்தால் மெனு தானாக மூடும்
        mLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    // --- 2. OPTIMIZED CANVAS ---
    const canvas = document.getElementById("ai-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        const count = 70;

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1
            }));
        }
        initCanvas();
        window.addEventListener('resize', initCanvas);

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(225, 29, 72, 0.4)";
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(render);
        }
        render();
    }

    // --- 3. LAZY VIDEO OBSERVER ---
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                    video.load();
                }
                video.play().catch(() => { });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.video-lazy').forEach(v => videoObserver.observe(v));

    // --- 4. COUNTER LOGIC ---
    document.querySelectorAll('.counter').forEach(c => {
        const target = +c.dataset.target;
        gsap.to(c, {
            scrollTrigger: { trigger: c, start: "top 90%" },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 }
        });
    });

    // --- 5. SLIDER LOGIC ---
    const slides = document.querySelectorAll(".exp-slide");
    let index = 0;

    const updateSlide = (newIndex) => {
        slides[index].classList.remove("active");
        index = (newIndex + slides.length) % slides.length;
        slides[index].classList.add("active");
    };

    const nextBtn = document.getElementById("exp-next");
    const prevBtn = document.getElementById("exp-prev");

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => updateSlide(index + 1));
        prevBtn.addEventListener("click", () => updateSlide(index - 1));
    }

    // --- 6. REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-text, .animate-reveal, .reveal-award-head');
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("galaxy-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let stars = [];
    let shootingStars = [];
    let mouse = { x: -1000, y: -1000 };

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = [];
        // Generate static background stars
        for (let i = 0; i < 400; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5,
                opacity: Math.random(),
                blinkSpeed: Math.random() * 0.02 + 0.01,
                parallax: Math.random() * 0.5
            });
        }
    }

    // Function to create a shooting star
    function createShootingStar(startX, startY) {
        shootingStars.push({
            x: startX || Math.random() * width,
            y: startY || Math.random() * (height / 2),
            len: Math.random() * 100 + 150,
            speed: Math.random() * 10 + 15,
            opacity: 1,
            // Random color for the shooting star head/tail
            color: `hsl(${Math.random() * 60 + 200}, 100%, 80%)` // Blue-ish white
        });
    }

    // INTERACTION 1: Instant generate on every click
    window.addEventListener("mousedown", (e) => {
        createShootingStar(e.clientX, e.clientY);
    });

    // INTERACTION 2: Parallax on mouse move
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // INTERACTION 3: Automatic generate every 5 seconds
    setInterval(() => {
        createShootingStar();
    }, 5000);

    function drawGalaxy() {
        // --- STEP 1: NEBULA COLORFUL BACKGROUND ---
        // Creating the purple/pink nebula effect from your image
        let nebulaGradient = ctx.createRadialGradient(
            width * 0.7, height * 0.3, 0,
            width * 0.7, height * 0.3, width * 0.8
        );
        nebulaGradient.addColorStop(0, "#2a0033"); // Inner Purple
        nebulaGradient.addColorStop(0.4, "#0f001a"); // Deep Navy
        nebulaGradient.addColorStop(1, "#05000a"); // Black Space

        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, width, height);

        // Add a secondary glow for the pinkish highlights
        ctx.globalCompositeOperation = "screen";
        let pinkGlow = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, width * 0.6);
        pinkGlow.addColorStop(0, "rgba(225, 29, 72, 0.05)");
        pinkGlow.addColorStop(1, "transparent");
        ctx.fillStyle = pinkGlow;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";

        // --- STEP 2: STATIC STARS WITH PARALLAX ---
        stars.forEach(s => {
            s.opacity += s.blinkSpeed;
            if (s.opacity > 1 || s.opacity < 0) s.blinkSpeed *= -1;

            let offsetX = (mouse.x - width / 2) * s.parallax * 0.03;
            let offsetY = (mouse.y - height / 2) * s.parallax * 0.03;

            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.beginPath();
            ctx.arc(s.x + offsetX, s.y + offsetY, s.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // --- STEP 3: SHOOTING STARS ---
        shootingStars.forEach((ss, index) => {
            ss.x -= ss.speed;
            ss.y += ss.speed;
            ss.opacity -= 0.015;

            if (ss.opacity <= 0) {
                shootingStars.splice(index, 1);
            } else {
                let tailGrd = ctx.createLinearGradient(ss.x, ss.y, ss.x + ss.len, ss.y - ss.len);
                tailGrd.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                tailGrd.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.strokeStyle = tailGrd;
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x + ss.len, ss.y - ss.len);
                ctx.stroke();

                // Glow at the tip
                ctx.shadowBlur = 15;
                ctx.shadowColor = ss.color;
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Reset for performance
            }
        });

        requestAnimationFrame(drawGalaxy);
    }

    window.addEventListener("resize", initCanvas);
    initCanvas();
    drawGalaxy();
});



document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Only run sticky animation on desktop (LG screen and above)
    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
            ScrollTrigger.create({
                trigger: "#awards-animation-parent", // Start when this container enters
                start: "top 10%", // When top of the section is 10% from top of screen
                end: "bottom 90%", // End when the bottom of the section reaches the bottom of the image
                pin: "#award-image-pin-container", // The element to follow the scroll
                pinSpacing: false, // Prevents creating large white gaps
                scrub: true,
                // markers: true // Uncomment this to see the start/end lines for debugging
            });
        }
    });

    // Optional: Fade in the award list items as you scroll
    gsap.from(".award-list-item", {
        scrollTrigger: {
            trigger: "#awards-content-list",
            start: "top 80%"
        },
        opacity: 0,
        x: 50,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
    });
});


gsap.from(".reveal-text", {
    scrollTrigger: {
        trigger: "#services-area",
        start: "top 80%",
    },
    y: 30,
    opacity: 100,
    duration: 1,
    ease: "power2.out"
});