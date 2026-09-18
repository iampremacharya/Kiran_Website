document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const reveals = document.querySelectorAll(".reveal");
  const blueprint = document.querySelector(".blueprint");
  const year = document.getElementById("year");


  /* =========================
     CURRENT YEAR
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     STICKY HEADER
  ========================= */

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =========================
     MOBILE MENU
  ========================= */

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
      }
    });
  }


  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

      });

    },
    {
      threshold: 0.25,
      rootMargin: "-20% 0px -60% 0px"
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================
     REVEAL ANIMATIONS
  ========================= */

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
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


  /* =========================
     SMOOTH ANCHOR SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================
     BLUEPRINT PARALLAX
  ========================= */

  if (
    blueprint &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {

    window.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      blueprint.style.transform =
        `translate(${x * 10}px, calc(-50% + ${y * 10}px))`;

    });

  }


  /* =========================
     PROJECT CARD TILT
  ========================= */

  const projects = document.querySelectorAll(".project");

  if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {

    projects.forEach(project => {

      project.addEventListener("mousemove", event => {

        const rect = project.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        project.style.transform =
          `perspective(1000px) rotateX(${y * -1.2}deg) rotateY(${x * 1.2}deg)`;

      });

      project.addEventListener("mouseleave", () => {
        project.style.transform = "";
      });

    });

  }


  /* =========================
     IMAGELESS ENGINEERING
     DECORATION
  ========================= */

  const engineeringCards =
    document.querySelectorAll(".engineering-card");

  engineeringCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 80}ms`;

  });


  /* =========================
     PAGE LOADED
  ========================= */

  document.body.classList.add("loaded");

});