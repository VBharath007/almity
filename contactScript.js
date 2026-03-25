document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Entrance
    const heroTl = gsap.timeline();
    heroTl.from("h1", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".glass-nav", { y: -50, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-gradient", { opacity: 0, duration: 1.5 }, "-=1");

    // 2. Social Cards Reveal (Staggered)
    gsap.from(".social-card", {
        scrollTrigger: {
            trigger: ".social-card",
            start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // 3. Info Blocks (Office, Support, Hours)
    gsap.from(".md\\:grid-cols-3 > div", {
        scrollTrigger: {
            trigger: ".md\\:grid-cols-3",
            start: "top 85%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });

    // 4. Contact Form Box Animation
    gsap.from(".lg\\:col-span-5 > div", {
        scrollTrigger: {
            trigger: ".lg\\:col-span-5",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    });

    // 5. FAQ List Staggered Reveal
    gsap.from(".space-y-4 > div", {
        scrollTrigger: {
            trigger: ".space-y-4",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    });

    // 6. Floating Image Animation (Architecture Image)
    gsap.to(".grayscale", {
        scrollTrigger: {
            trigger: ".grayscale",
            scrub: true
        },
        y: -50,
        scale: 1.05
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const hologramBtns = document.querySelectorAll('.btn-hologram');

    hologramBtns.forEach(btn => {
        // 1. Mouse Enter Flicker
        btn.addEventListener('mouseenter', () => {
            gsap.fromTo(btn,
                { opacity: 0.7, x: -1 },
                { opacity: 1, x: 0, duration: 0.1, repeat: 3, yoyo: true }
            );
        });

        // 2. Magnetic Pull (Subtle)
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.2;

            gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Entrance Animation for the entire section
    gsap.from("#info-animate-container", {
        scrollTrigger: {
            trigger: "#info-animate-container",
            start: "top 90%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });

    // 2. Staggered reveal for each info item
    gsap.from(".info-item", {
        scrollTrigger: {
            trigger: "#info-animate-container",
            start: "top 80%",
        },
        x: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "back.out(1.7)"
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply reveal to the form and FAQ items
    document.querySelectorAll('.lg:col-span-5, .lg:col-span-7, .space-y-4 > div').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 2. Magnetic Button Effect
    const btn = document.querySelector('button[type="submit"]');
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});


const faqData = {
    general: [
        { id: '01', q: "What services do you offer?", a: "We provide high-end web development, UI/UX design, and brand identity solutions tailored for modern businesses." },
        { id: '02', q: "How long does a website project take?", a: "Typically 4-8 weeks depending on complexity." },
        { id: '03', q: "Do you work with international clients?", a: "Yes, we work with clients globally across all time zones." }
    ],
    career: [
        { id: '01', q: "What positions are currently open?", a: "We are looking for UI/UX Designers and Frontend React Developers." },
        { id: '02', q: "Do you offer remote work?", a: "Yes, all our creative positions are 100% remote-friendly." },
        { id: '03', q: "What is the internship process?", a: "It's a 3-month paid program focusing on real client projects." }
    ],
    pricing: [
        { id: '01', q: "How do you calculate costs?", a: "Costs are based on project scope, value delivery, and technical requirements." },
        { id: '02', q: "Do you have maintenance plans?", a: "Yes, we offer monthly support packages to keep your site updated." },
        { id: '03', q: "What is your payment policy?", a: "Usually a 50% deposit to start and 50% upon project completion." }
    ]
};

function switchTab(tabName) {
    const container = document.getElementById('faq-content');

    // Update Tab Styles
    document.querySelectorAll('.faq-tab').forEach(t => {
        t.classList.remove('text-primary', 'border-b-2', 'border-primary');
        t.classList.add('text-gray-500');
    });
    document.getElementById('tab-' + tabName).classList.add('text-primary', 'border-b-2', 'border-primary');

    // Animate out, then in
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        container.innerHTML = faqData[tabName].map(item => `
            <div class="bg-card-dark rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer animate-fade-in">
                <div class="flex items-center justify-between">
                    <h4 class="text-lg font-bold text-white flex gap-4">
                        <span class="text-gray-600">${item.id}</span> ${item.q}
                    </h4>
                    <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-all">add</span>
                </div>
            </div>
        `).join('');
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 200);
}

// Initialize first tab
window.onload = () => switchTab('general');



document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (!menuBtn || !mobileMenu || !closeMenu) return;

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });
});