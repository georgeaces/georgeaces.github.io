function loadNav(language) {
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  if (language === "en") {
    navContainer.innerHTML = navEN.innerHTML;
  } else {
    navContainer.innerHTML = navES.innerHTML;
  }
}

function toggleLanguage() {
  const en = document.getElementById("english");
  const es = document.getElementById("spanish");
  const toggle = document.getElementById("langToggle");

  if (toggle.checked) {
    loadNav("es");
    en.style.opacity = 0;
    setTimeout(() => {
      en.style.display = "none";
      es.style.display = "block";
      setTimeout(() => { es.style.opacity = 1; }, 50);
    }, 300);
  } else {
    loadNav("en");
    es.style.opacity = 0;
    setTimeout(() => {
      es.style.display = "none";
      en.style.display = "block";
      setTimeout(() => { en.style.opacity = 1; }, 50);
    }, 300);
  }
}

// Load English nav on page load
loadNav("en");

// Mobile nav toggle
document.getElementById("mobileNavToggle").addEventListener("click", () => {
  let mobileMenu = document.getElementById("mobileNavMenu");
  const toggle = document.getElementById("langToggle");
  const currentLang = toggle.checked ? "es" : "en";
  const sourceNav = currentLang === "en" ? document.getElementById("navEN") : document.getElementById("navES");

  if (!mobileMenu) {
    mobileMenu = document.createElement("nav");
    mobileMenu.id = "mobileNavMenu";
    mobileMenu.className = "nav-menu mobile-open";
    document.querySelector(".aces-header").appendChild(mobileMenu);
  }

  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.innerHTML = sourceNav.innerHTML;
    mobileMenu.style.display = "flex";
  }
});

/* ================================
   CLICK‑TO‑OPEN DROPDOWNS
   (Option A — click outside to close)
================================ */

document.addEventListener("click", function (event) {
  const isDropdownToggle = event.target.classList.contains("dropdown-toggle");
  const allMenus = document.querySelectorAll(".dropdown-menu");

  // If clicking a dropdown toggle
  if (isDropdownToggle) {
    const parent = event.target.closest(".dropdown");
    const menu = parent.querySelector(".dropdown-menu");

    // Close all other dropdowns
    allMenus.forEach(m => {
      if (m !== menu) m.style.display = "none";
    });

    // Toggle this dropdown
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    return;
  }

  // If clicking inside a dropdown menu, do nothing
  if (event.target.closest(".dropdown-menu")) return;

  // Otherwise, click outside → close all dropdowns
  allMenus.forEach(m => m.style.display = "none");
});

/* ================================
   RE‑APPLY DROPDOWN LOGIC AFTER NAV LOAD
================================ */

function enableDropdowns() {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent document click from firing immediately
      const parent = this.closest(".dropdown");
      const menu = parent.querySelector(".dropdown-menu");

      // Close all other menus
      document.querySelectorAll(".dropdown-menu").forEach(m => {
        if (m !== menu) m.style.display = "none";
      });

      // Toggle this one
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });
  });
}

/* ================================
   RUN DROPDOWN SETUP AFTER NAV LOAD
================================ */

const originalLoadNav = loadNav;

loadNav = function (language) {
  originalLoadNav(language);
  setTimeout(enableDropdowns, 50); // Wait for nav injection
};

