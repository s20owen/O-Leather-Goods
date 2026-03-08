import { loadCatalog } from "./store.js";
import { headerHTML } from "./ui.js";

export async function boot() {
  const catalog = await loadCatalog();

  const headerMount = document.getElementById("siteHeader");
  if (headerMount) {
    headerMount.innerHTML = headerHTML(
      catalog.brand?.name,
      catalog.brand?.announcement
    );

    const header = headerMount.querySelector(".header");
    const toggle = headerMount.querySelector(".menuToggle");
    const navLinks = headerMount.querySelector(".navlinks");

    if (header && toggle) {
      const closeMenu = () => {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      };

      toggle.addEventListener("click", () => {
        const open = header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      navLinks?.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", closeMenu);
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMenu();
      });
    }
  }

  // SEARCH FORM
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      window.location.href = `/collection.html?q=${encodeURIComponent(q)}`;
    });
  }

  return catalog;
}
