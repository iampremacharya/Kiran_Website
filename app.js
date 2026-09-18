
/*
  KIRAN ACHARYA
  Mechanical Engineering Portfolio
*/


/* =========================
   SCROLL REVEALS
========================= */

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });


/* =========================
   HERO GEAR PARALLAX
========================= */

const gear = document.querySelector(".gear-large");

if (
  gear &&
  window.matchMedia("(pointer:fine)").matches
) {

  window.addEventListener(
    "pointermove",
    (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      gear.style.translate =
        `${x}px ${y}px`;

    },
    {
      passive: true
    }
  );

}


/* =========================
   ACTIVE NAV
========================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll("nav a");


const navObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {

          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {

            link.classList.add("active");

          }

        });

      });

    },
    {
      threshold: 0.45
    }
  );


sections.forEach((section) => {
  navObserver.observe(section);
});


/* =========================
   CURRENT YEAR
========================= */

const footerYear =
  document.querySelector("[data-year]");

if (footerYear) {
  footerYear.textContent =
    new Date().getFullYear();
}
