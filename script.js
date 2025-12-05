document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const header = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a[href^='index.html#'], .nav-links a[href^='#']");

  /* Scroll reveal animation */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));

  /* Navbar shrink + shadow on scroll */
  const handleScrollNav = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  };

  window.addEventListener("scroll", handleScrollNav);
  handleScrollNav();

  /* Active nav link based on section in view (only on main page) */
  const sectionIds = ["hero", "company", "tasks-projects", "skills"];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const syncActiveNav = () => {
    if (!sections.length) return;

    let currentId = null;
    const scrollPosition = window.scrollY + 90; // offset for fixed navbar

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (!currentId) return;

      const href = link.getAttribute("href") || "";
      if (href.endsWith("#" + currentId)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", syncActiveNav);
  window.addEventListener("resize", syncActiveNav);
  syncActiveNav();
});
