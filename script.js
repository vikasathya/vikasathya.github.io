/* =========================================================
   VIKAS ATHYA PORTFOLIO
   PREMIUM CURSOR + ANIMATIONS
========================================================= */

/* =========================================================
   PRELOADER
========================================================= */

const preloader = document.getElementById("preloader");
const preloaderBar = document.getElementById("preloader-bar");
const preloaderCounter = document.getElementById("preloader-counter");
const preloaderText = document.getElementById("preloader-text");
const preloaderSubtext = document.getElementById("preloader-subtext");

if (preloader) {

    document.body.classList.add("preloading");

    let progress = 0;
    let isWindowLoaded = false;

    const codeSteps = [
        { threshold: 0,  cmd: "import { Portfolio } from '@vikas/core';", sub: "bootstrapping" },
        { threshold: 18, cmd: "const dev = new FullStackDeveloper();",     sub: "initializing" },
        { threshold: 38, cmd: "await dev.loadSkills(['React', 'Node']);", sub: "loading modules" },
        { threshold: 58, cmd: "dev.compileProjects({ mode: 'live' });",   sub: "compiling assets" },
        { threshold: 78, cmd: "connectSoundEngine({ state: 'ready' });",  sub: "linking audio" },
        { threshold: 94, cmd: "return { status: 200, render: true };",   sub: "system ready" }
    ];

    const updateStatusText = (val) => {
        for (let i = codeSteps.length - 1; i >= 0; i--) {
            if (val >= codeSteps[i].threshold) {
                if (preloaderText && preloaderText.textContent !== codeSteps[i].cmd) {
                    preloaderText.textContent = codeSteps[i].cmd;
                }
                if (preloaderSubtext && preloaderSubtext.textContent !== codeSteps[i].sub) {
                    preloaderSubtext.textContent = codeSteps[i].sub;
                }
                break;
            }
        }
    };

    // Smooth, paced progression so user can comfortably read each code phase
    const interval = setInterval(() => {

        if (!isWindowLoaded) {
            if (progress < 85) {
                progress += Math.floor(Math.random() * 2) + 1;
                if (progress > 85) progress = 85;
            }
        } else {
            // Once window has loaded, smoothly count up without flashing through
            if (progress < 88) {
                progress += Math.floor(Math.random() * 2) + 1;
            } else {
                progress += Math.floor(Math.random() * 3) + 1;
            }

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                if (preloaderBar) preloaderBar.style.width = "100%";
                if (preloaderCounter) preloaderCounter.textContent = "100%";
                updateStatusText(100);
                finishPreloader();
                return;
            }
        }

        if (preloaderBar) preloaderBar.style.width = progress + "%";
        if (preloaderCounter) preloaderCounter.textContent = progress + "%";
        updateStatusText(progress);

    }, 45);

    const finishPreloader = () => {
        // Brief pause at 100% so the completion state can be appreciated
        setTimeout(() => {
            preloader.classList.add("loaded");
            document.body.classList.remove("preloading");

            // Play subtle chime on complete if sound is active
            if (typeof soundEngine !== "undefined" && soundEngine.enabled) {
                soundEngine.playSuccess();
            }

            setTimeout(() => {
                preloader.style.display = "none";
            }, 750);
        }, 360);
    };

    window.addEventListener("load", () => {
        isWindowLoaded = true;
    });

    // Safety fallback timeout (max 3.5s) to guarantee the screen never hangs
    setTimeout(() => {
        isWindowLoaded = true;
    }, 3500);

}


/* =========================================================
   ELEMENTS
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorOutline =
    document.querySelector(".cursor-outline");

const cursorGlow =
    document.querySelector(".cursor-glow");

const trailOne =
    document.querySelector(".trail-1");

const trailTwo =
    document.querySelector(".trail-2");

const trailThree =
    document.querySelector(".trail-3");


const finePointer =
    window.matchMedia("(pointer: fine)").matches;


/* =========================================================
   PREMIUM CURSOR
========================================================= */

if (
    finePointer &&
    cursorDot &&
    cursorOutline &&
    cursorGlow
) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;


    let outlineX = mouseX;
    let outlineY = mouseY;

    let glowX = mouseX;
    let glowY = mouseY;

    let trail1X = mouseX;
    let trail1Y = mouseY;

    let trail2X = mouseX;
    let trail2Y = mouseY;

    let trail3X = mouseX;
    let trail3Y = mouseY;


    /* Mouse position */

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );


    /* Smooth animation */

    function animateCursor() {

        /* Main outline */

        outlineX +=
            (mouseX - outlineX) * 0.17;

        outlineY +=
            (mouseY - outlineY) * 0.17;


        /* Spotlight */

        glowX +=
            (mouseX - glowX) * 0.055;

        glowY +=
            (mouseY - glowY) * 0.055;


        /* Trail */

        trail1X +=
            (mouseX - trail1X) * 0.25;

        trail1Y +=
            (mouseY - trail1Y) * 0.25;


        trail2X +=
            (trail1X - trail2X) * 0.25;

        trail2Y +=
            (trail1Y - trail2Y) * 0.25;


        trail3X +=
            (trail2X - trail3X) * 0.25;

        trail3Y +=
            (trail2Y - trail3Y) * 0.25;


        /* Position outline */

        cursorOutline.style.left =
            `${outlineX}px`;

        cursorOutline.style.top =
            `${outlineY}px`;


        /* Position glow */

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;


        /* Position trails */

        if (trailOne) {

            trailOne.style.left =
                `${trail1X}px`;

            trailOne.style.top =
                `${trail1Y}px`;

            trailOne.style.opacity = "0.45";

        }


        if (trailTwo) {

            trailTwo.style.left =
                `${trail2X}px`;

            trailTwo.style.top =
                `${trail2Y}px`;

            trailTwo.style.opacity = "0.25";

        }


        if (trailThree) {

            trailThree.style.left =
                `${trail3X}px`;

            trailThree.style.top =
                `${trail3Y}px`;

            trailThree.style.opacity = "0.12";

        }


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =====================================================
       CURSOR HOVER EFFECT
    ===================================================== */

    const hoverElements =
        document.querySelectorAll(
            "a, button, input, textarea, .tilt-card"
        );


    hoverElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   NAVBAR
========================================================= */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 20) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-menu a");


function updateActiveNavigation() {

    let current =
        "home";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(
        (section) => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition <
                top + height
            ) {

                current =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        }
    );


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {

            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"

        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   SKILL BARS
========================================================= */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


skillCards.forEach(
    (card) => {

        const progress =
            card.querySelector(
                ".skill-progress"
            );


        if (!progress) return;


        const width =
            progress.dataset.width;


        progress.style.setProperty(
            "--skill-width",
            width
        );

    }
);


/* =========================================================
   SKILL FILTERS
========================================================= */

const skillFilterBtns =
    document.querySelectorAll(
        ".skill-filter-btn"
    );

if (skillFilterBtns.length > 0) {

    skillFilterBtns.forEach(
        (btn) => {

            btn.addEventListener(
                "click",
                () => {

                    const filter =
                        btn.dataset.filter;

                    skillFilterBtns.forEach(
                        (b) => b.classList.remove("active")
                    );

                    btn.classList.add("active");

                    // Play click sound if engine is enabled
                    if (
                        typeof soundEngine !== "undefined" &&
                        soundEngine.enabled
                    ) {
                        soundEngine.playClick();
                    }

                    skillCards.forEach(
                        (card) => {

                            const category =
                                card.dataset.category;

                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                card.classList.remove("filter-hidden");

                                const progress =
                                    card.querySelector(".skill-progress");

                                if (
                                    progress &&
                                    card.classList.contains("visible")
                                ) {
                                    progress.style.setProperty(
                                        "--skill-width",
                                        progress.dataset.width
                                    );
                                }

                            } else {

                                card.classList.add("filter-hidden");

                            }

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   3D CARD TILT
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".tilt-card"
    );


if (
    finePointer &&
    window.innerWidth > 800
) {

    tiltCards.forEach(
        (card) => {

            const strength =
                Number(
                    card.dataset.tiltStrength || 5
                );


            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        strength;


                    const rotateX =
                        ((centerY - y) /
                            centerY) *
                        strength;


                    const shineX =
                        (x / rect.width) *
                        100;


                    const shineY =
                        (y / rect.height) *
                        100;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;


                    card.style.setProperty(
                        "--shine-x",
                        `${shineX}%`
                    );


                    card.style.setProperty(
                        "--shine-y",
                        `${shineY}%`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS / LINKS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".magnetic"
    );


if (
    finePointer &&
    window.innerWidth > 900
) {

    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroGrid =
    document.querySelector(
        ".hero-grid"
    );

const heroOrbs =
    document.querySelectorAll(
        ".hero-orb"
    );


if (
    finePointer &&
    heroGrid &&
    window.innerWidth > 900
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 2;


            heroGrid.style.transform =
                `translate(
                    ${x * -8}px,
                    ${y * -8}px
                )`;


            heroOrbs.forEach(
                (orb, index) => {

                    const depth =
                        index === 0
                            ? 12
                            : 6;


                    orb.style.marginLeft =
                        `${x * depth}px`;

                    orb.style.marginTop =
                        `${y * depth}px`;

                }
            );

        },
        { passive: true }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const formStatus =
    document.getElementById(
        "form-status"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            // Trigger quick send sound effect
            if (typeof soundEngine !== "undefined") {
                soundEngine.playSend();
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : null;

            // Loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            }

            if (formStatus) {
                formStatus.className = "form-status";
                formStatus.textContent = "Sending your message...";
            }

            try {
                const formData = new FormData(contactForm);

                const response = await fetch(
                    "https://formsubmit.co/ajax/vikasathya.info@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        body: formData
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (response.ok && (data.success === "true" || data.success === true || !data.error)) {
                    if (typeof soundEngine !== "undefined") {
                        soundEngine.playSuccess();
                    }
                    if (formStatus) {
                        formStatus.className = "form-status success";
                        formStatus.textContent = "✓ Message sent successfully! I will get back to you soon.";
                    }
                    contactForm.reset();
                } else {
                    throw new Error(data.message || "Failed to send message.");
                }

            } catch (error) {
                console.error("Contact Form Error:", error);
                if (formStatus) {
                    formStatus.className = "form-status error";
                    formStatus.textContent = "✗ Failed to send message. Please try again or email directly.";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }

                setTimeout(
                    () => {
                        if (formStatus && formStatus.classList.contains("success")) {
                            formStatus.textContent = "";
                            formStatus.className = "form-status";
                        }
                    },
                    6000
                );
            }

        }
    );

}



/* =========================================================
   PROJECT PREVIEW PARALLAX
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    finePointer &&
    window.innerWidth > 900
) {

    projectCards.forEach(
        (card) => {

            const preview =
                card.querySelector(
                    ".project-preview"
                );


            if (!preview) return;


            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;


                    preview.style.translate =
                        `${x * 5}px ${y * 5}px`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    preview.style.translate =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateNavbar();

        updateActiveNavigation();

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateActiveNavigation();

    },
    { passive: true }
);

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuBtn =
    document.getElementById("mobile-menu-btn");

const navMenu =
    document.getElementById("nav-menu");


if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            mobileMenuBtn.classList.toggle("active");

            navMenu.classList.toggle("open");

        }
    );


    /* Close menu after clicking a link */

    navMenu
        .querySelectorAll("a")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenuBtn.classList.remove(
                            "active"
                        );

                        navMenu.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


    /* Close when clicking outside */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navMenu.contains(event.target) &&
                !mobileMenuBtn.contains(event.target)
            ) {

                mobileMenuBtn.classList.remove(
                    "active"
                );

                navMenu.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   AUDIO & SOUND EFFECTS ENGINE (Web Audio API)
   - Procedural Mechanical Keyboard Typing Sound (Cherry/Thock)
   - Tactile Micro-Click Sound for Buttons & Interactive Items
   - Sound Mute / Unmute State Management
========================================================= */

class SoundEffectsEngine {

    constructor() {

        this.ctx = null;
        this.masterGain = null;
        this.noiseBuffer = null;
        this.enabled = localStorage.getItem("vikas_sound_enabled") !== "false";
        this.toggleBtn = document.getElementById("sound-toggle-btn");

        this.initUI();
        this.bindEvents();

    }

    initAudioContext() {

        if (this.ctx) {

            if (this.ctx.state === "suspended") {
                this.ctx.resume();
            }

            return;

        }

        try {

            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            this.ctx = new AudioContext();

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.32;
            this.masterGain.connect(this.ctx.destination);

            // Pre-calculate 1-second white noise buffer for mechanical click transients
            const bufferSize = this.ctx.sampleRate;
            this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = this.noiseBuffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

        } catch (e) {
            console.warn("Web Audio API not supported:", e);
        }

    }

    initUI() {

        if (!this.toggleBtn) return;

        this.updateToggleButton();

        this.toggleBtn.addEventListener(
            "click",
            (e) => {
                e.stopPropagation();
                this.toggleSound();
            }
        );

    }

    toggleSound() {

        this.enabled = !this.enabled;
        localStorage.setItem("vikas_sound_enabled", this.enabled ? "true" : "false");
        this.updateToggleButton();

        if (this.enabled) {
            this.initAudioContext();
            this.playClick();
        }

    }

    updateToggleButton() {

        if (!this.toggleBtn) return;

        const icon = this.toggleBtn.querySelector("i");

        if (this.enabled) {

            this.toggleBtn.classList.remove("muted");
            this.toggleBtn.setAttribute("title", "Sound effects: ON (Click to mute)");
            this.toggleBtn.setAttribute("aria-label", "Mute sound effects");

            if (icon) {
                icon.className = "fa-solid fa-volume-high";
            }

        } else {

            this.toggleBtn.classList.add("muted");
            this.toggleBtn.setAttribute("title", "Sound effects: MUTED (Click to unmute)");
            this.toggleBtn.setAttribute("aria-label", "Unmute sound effects");

            if (icon) {
                icon.className = "fa-solid fa-volume-xmark";
            }

        }

    }

    // Tactile Click Sound for Buttons & Links
    playClick() {

        if (!this.enabled) return;

        this.initAudioContext();
        if (!this.ctx || this.ctx.state !== "running") return;

        const now = this.ctx.currentTime;

        try {

            // 1. High-frequency crisp snap
            if (this.noiseBuffer) {

                const noise = this.ctx.createBufferSource();
                noise.buffer = this.noiseBuffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.value = 2900;
                filter.Q.value = 2.8;

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                noise.start(now);
                noise.stop(now + 0.014);

            }

            // 2. Low-mid tactile body
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(95, now + 0.02);

            oscGain.gain.setValueAtTime(0.25, now);
            oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

            osc.connect(oscGain);
            oscGain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.022);

        } catch (e) {}

    }

    // Quick Send Message Sound Effect (Transmission Swoosh + Launch Tone)
    playSend() {

        if (!this.enabled) return;

        this.initAudioContext();
        if (!this.ctx || this.ctx.state !== "running") return;

        const now = this.ctx.currentTime;

        try {

            // 1. Airy swoosh transient (swept bandpass filtered noise)
            if (this.noiseBuffer) {

                const noise = this.ctx.createBufferSource();
                noise.buffer = this.noiseBuffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(500, now);
                filter.frequency.exponentialRampToValueAtTime(3400, now + 0.1);
                filter.Q.value = 1.8;

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.42, now + 0.025);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                noise.start(now);
                noise.stop(now + 0.14);

            }

            // 2. Rising paper-plane launch tone
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(360, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.11);

            oscGain.gain.setValueAtTime(0.001, now);
            oscGain.gain.linearRampToValueAtTime(0.32, now + 0.025);
            oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

            osc.connect(oscGain);
            oscGain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.15);

        } catch (e) {}

    }

    // Message Delivered Confirmation Chime
    playSuccess() {

        if (!this.enabled) return;

        this.initAudioContext();
        if (!this.ctx || this.ctx.state !== "running") return;

        const now = this.ctx.currentTime;

        try {

            // Note 1: 587.33 Hz (D5)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();

            osc1.type = "sine";
            osc1.frequency.setValueAtTime(587.33, now);

            gain1.gain.setValueAtTime(0.26, now);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

            osc1.connect(gain1);
            gain1.connect(this.masterGain);

            osc1.start(now);
            osc1.stop(now + 0.14);

            // Note 2: 880 Hz (A5)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();

            osc2.type = "sine";
            osc2.frequency.setValueAtTime(880, now + 0.075);

            gain2.gain.setValueAtTime(0.0001, now);
            gain2.gain.setValueAtTime(0.32, now + 0.075);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

            osc2.connect(gain2);
            gain2.connect(this.masterGain);

            osc2.start(now + 0.075);
            osc2.stop(now + 0.28);

        } catch (e) {}

    }

    // Mechanical Keyboard Typing Sound (Cherry MX / Thock Switch)
    playMechanicalKey(key) {

        if (!this.enabled) return;

        this.initAudioContext();
        if (!this.ctx || this.ctx.state !== "running") return;

        const now = this.ctx.currentTime;

        let baseFreq = 160;
        let decay = 0.038;
        let noiseGainVal = 0.45;
        let filterFreq = 3400;

        if (key === " " || key === "Spacebar") {
            // Spacebar: deep, hollow bottom-out thock
            baseFreq = 100;
            decay = 0.058;
            noiseGainVal = 0.32;
            filterFreq = 2100;
        } else if (key === "Enter") {
            // Enter: punchy, crisp snap
            baseFreq = 180;
            decay = 0.046;
            noiseGainVal = 0.5;
            filterFreq = 3800;
        } else if (key === "Backspace" || key === "Delete") {
            // Backspace: higher pitch crisp switch return
            baseFreq = 220;
            decay = 0.032;
            noiseGainVal = 0.42;
            filterFreq = 4200;
        } else {
            // Standard alphanumeric / symbol keys: random pitch jitter for realistic typing
            baseFreq = 152 + (Math.random() * 28 - 14);
            decay = 0.034 + Math.random() * 0.008;
            filterFreq = 3300 + (Math.random() * 600 - 300);
        }

        try {

            // Layer 1: Actuation click (filtered noise transient)
            if (this.noiseBuffer) {

                const noise = this.ctx.createBufferSource();
                noise.buffer = this.noiseBuffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.value = filterFreq;
                filter.Q.value = 2.4;

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(noiseGainVal, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                noise.start(now);
                noise.stop(now + 0.014);

            }

            // Layer 2: Key bottom-out body resonance (thock)
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(baseFreq * 1.5, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.009);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, now + decay);

            oscGain.gain.setValueAtTime(0.42, now);
            oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

            osc.connect(oscGain);
            oscGain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + decay + 0.002);

        } catch (e) {}

    }

    bindEvents() {

        // Unlock AudioContext on first user interaction anywhere
        const unlock = () => {
            this.initAudioContext();
            document.removeEventListener("pointerdown", unlock);
            document.removeEventListener("keydown", unlock);
        };

        document.addEventListener("pointerdown", unlock, { once: true, passive: true });
        document.addEventListener("keydown", unlock, { once: true, passive: true });

        // Tactile Click sound for buttons, links, cards, and magnetic items
        document.addEventListener(
            "pointerdown",
            (e) => {

                // Don't double click sound on the sound toggle itself
                if (e.target.closest("#sound-toggle-btn")) return;

                // Dedicated quick send sound effect when clicking Send Message
                if (e.target.closest(".contact-submit, #contact-form button[type='submit']")) {
                    this.playSend();
                    return;
                }

                const clickable = e.target.closest(
                    "a, button, .btn, .project-link, .more-projects-btn, .contact-item, .nav-menu a, .mobile-menu-btn, .filter-btn, .social-links a, .footer-social-links a, .about-card, .featured-project"
                );

                if (clickable) {
                    this.playClick();
                }

            },
            { passive: true }
        );

        // Mechanical Keyboard Typing Sound
        // Triggered when typing into input fields / textareas or any keystroke
        document.addEventListener(
            "keydown",
            (e) => {

                // Ignore if modifier keys like Ctrl / Meta / Alt are pressed
                if (e.ctrlKey || e.metaKey || e.altKey) return;

                // Ignore functional keys like F1-F12, Escape, Tab
                if (/^F\d+$/.test(e.key) || e.key === "Tab" || e.key === "Escape") return;

                const isInput = e.target.matches("input, textarea, [contenteditable]");

                if (
                    isInput ||
                    e.key.length === 1 ||
                    e.key === "Backspace" ||
                    e.key === "Delete" ||
                    e.key === "Enter" ||
                    e.key === " "
                ) {
                    this.playMechanicalKey(e.key);
                }

            },
            { passive: true }
        );

    }

}

// Initialize Sound Engine
const soundEngine = new SoundEffectsEngine();