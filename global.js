/* ============================================================
   LOAD NAVIGATION (EN / ES)
============================================================ */
function loadNav(language) {
  const navContainer = document.getElementById("navContainer");
  const navEN = document.getElementById("navEN");
  const navES = document.getElementById("navES");

  if (language === "en") {
    navContainer.innerHTML = navEN.innerHTML;
  } else {
    navContainer.innerHTML = navES.innerHTML;
  }

  // Re-enable dropdowns after nav injection
  setTimeout(enableDropdowns, 50);
}

/* Load English nav on page load */
loadNav("en");



/* ============================================================
   LANGUAGE TOGGLE (EN <-> ES)
============================================================ */
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



/* ============================================================
   MOBILE NAV TOGGLE
============================================================ */
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
    enableDropdowns(); // enable dropdowns inside mobile nav
  }
});



/* ============================================================
   CLICK‑TO‑OPEN DROPDOWNS
   (Option A — click outside to close)
============================================================ */
function enableDropdowns() {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      const parent = this.closest(".dropdown");
      const menu = parent.querySelector(".dropdown-menu");

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach(m => {
        if (m !== menu) m.style.display = "none";
      });

      // Toggle this one
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });
  });
}

/* Close dropdowns when clicking outside */
document.addEventListener("click", function (event) {
  const isDropdownToggle = event.target.classList.contains("dropdown-toggle");

  if (!isDropdownToggle && !event.target.closest(".dropdown-menu")) {
    document.querySelectorAll(".dropdown-menu").forEach(m => m.style.display = "none");
  }
});
