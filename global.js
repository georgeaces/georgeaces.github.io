/* ============================
   ACES GLOBAL.JS (FINAL BUILD)
   ============================ */

document.addEventListener("DOMContentLoaded", () => {

  const navContainer = document.getElementById("navContainer");
  const mobileToggle = document.getElementById("mobileNavToggle");

  /* -------------------------
     Inject Navigation (EN/ES)
     ------------------------- */
  function loadNav(lang) {
    const navEN = document.getElementById("navEN").innerHTML;
    const navES = document.getElementById("navES").innerHTML;
    navContainer.innerHTML = (lang === "spanish") ? navES : navEN;
    rebindDropdowns();
  }

  /* -------------------------
     Dropdown Click Behavior
     ------------------------- */
  function rebindDropdowns() {
    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const menu = toggle.nextElementSibling;
        menu.classList.toggle("show");
      });
    });
  }

  /* -------------------------
     Mobile Menu Toggle
     ------------------------- */
  mobileToggle.addEventListener("click", () => {
    navContainer.classList.toggle("open");
  });

  /* -------------------------
     Language Switching
     ------------------------- */
  function setLanguage(lang) {
    localStorage.setItem("acesLang", lang);

    document.querySelectorAll(".lang-option").forEach(o => o.classList.remove("active"));
    document.querySelector(`.lang-option[data-lang="${lang}"]`).classList.add("active");

    document.getElementById("english").style.display = (lang === "english") ? "block" : "none";
    document.getElementById("spanish").style.display = (lang === "spanish") ? "block" : "none";

    loadNav(lang);
  }

  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", () => {
      setLanguage(option.dataset.lang);
    });
  });

  /* -------------------------
     Load Saved Language
     ------------------------- */
  const savedLang = localStorage.getItem("acesLang") || "english";
  setLanguage(savedLang);

  /* -------------------------
     Header Scroll Effect
     ------------------------- */
  document.addEventListener("scroll", () => {
    const header = document.querySelector(".aces-header");
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

});
