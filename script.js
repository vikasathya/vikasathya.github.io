/* =========================================================
   VIKAS ATHYA PORTFOLIO
   PREMIUM CURSOR + ANIMATIONS
========================================================= */


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
        (event) => {

            event.preventDefault();


            if (formStatus) {

                formStatus.textContent =
                    "✓ Message received successfully.";

            }


            contactForm.reset();


            setTimeout(
                () => {

                    if (formStatus) {

                        formStatus.textContent =
                            "";

                    }

                },
                4000
            );

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