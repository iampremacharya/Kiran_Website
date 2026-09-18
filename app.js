/* =========================================
   KIRAN ACHARYA PORTFOLIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const reveals = document.querySelectorAll(".reveal");
    const year = document.getElementById("year");


    /* =====================================
       CURRENT YEAR
    ====================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================
       STICKY HEADER
    ====================================== */

    function updateHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================
       MOBILE MENU
    ====================================== */

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

        });

    }


    /* =====================================
       CLOSE MOBILE MENU
    ====================================== */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================
       ACTIVE NAVIGATION
    ====================================== */

    const observerOptions = {
        root: null,

        rootMargin: "-35% 0px -55% 0px",

        threshold: 0
    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    navItems.forEach(item => {

                        item.classList.remove("active");

                        const href =
                            item.getAttribute("href");

                        if (href === `#${id}`) {
                            item.classList.add("active");
                        }

                    });

                });

            },
            observerOptions
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================
       SCROLL REVEAL
    ====================================== */

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    reveals.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================
       SMOOTH ANCHOR SCROLL
    ====================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");

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

                    const headerHeight =
                        header.offsetHeight;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        + window.scrollY
                        - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================
       BLUEPRINT PARALLAX
    ====================================== */

    const blueprint =
        document.querySelector(".blueprint");

    if (blueprint) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth
                    ) - 0.5;

                const y =
                    (event.clientY /
                        window.innerHeight
                    ) - 0.5;

                const circle =
                    blueprint.querySelector(
                        ".outer"
                    );

                const core =
                    blueprint.querySelector(
                        ".component-core"
                    );

                if (circle) {

                    circle.style.transform =
                        `translate(
                            calc(-50% + ${x * 12}px),
                            calc(-50% + ${y * 12}px)
                        )`;

                }

                if (core) {

                    core.style.transform =
                        `translate(
                            calc(-50% + ${x * 20}px),
                            calc(-50% + ${y * 20}px)
                        )`;

                }

            },
            { passive: true }
        );

    }


    /* =====================================
       PROJECT CARD TILT
    ====================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5)
                    * -4;

                const rotateY =
                    ((x / rect.width) - 0.5)
                    * 4;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================
       KEYBOARD ACCESSIBILITY
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks.classList.contains("open")
            ) {

                navLinks.classList.remove(
                    "open"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});