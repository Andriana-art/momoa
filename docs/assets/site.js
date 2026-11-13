"use strict";

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const closeButton = mobileMenu.querySelector(".menu-close");
const desktopLayout = window.matchMedia("(min-width: 56rem)");
let scrollBeforeMenu = 0;
let menuHasFocus = false;

document.addEventListener("focusin", (event) => {
  menuHasFocus = event.target === menuButton || mobileMenu.contains(event.target);
});

function setMenu(open, returnFocus = true) {
  if (open) scrollBeforeMenu = window.scrollY;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel);
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);

  if (!open) {
    if (returnFocus) menuButton.focus({ preventScroll: true });
    window.scrollTo(0, scrollBeforeMenu);
  }
}

menuButton.addEventListener("click", () => setMenu(mobileMenu.hidden));
closeButton.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || mobileMenu.hidden) return;
  event.preventDefault();
  setMenu(false);
});
desktopLayout.addEventListener("change", (event) => {
  if (!event.matches || mobileMenu.hidden) return;
  // The desktop CSS can blur the mobile controls before this callback runs.
  const restoreFocus = menuHasFocus;
  setMenu(false, false);
  if (restoreFocus) {
    document.querySelector(".desktop-nav a").focus({ preventScroll: true });
  }
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted && !mobileMenu.hidden) setMenu(false, false);
});
menuButton.hidden = false;
menuButton.closest(".header-inner").classList.add("menu-ready");

const form = document.querySelector(".signup-form");
if (form) {
  const fields = [...form.querySelectorAll("input")];
  const confirmation = document.querySelector(".signup-confirmation");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(field, invalid) {
    const message = document.getElementById(field.id + "-error");
    message.hidden = !invalid;
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", message.id);
    } else {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }
  }

  function isValid(field) {
    const value = field.value.trim();
    return field.type === "email" ? field.validity.valid && emailPattern.test(value) : value !== "";
  }

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (fields.includes(field) && field.hasAttribute("aria-invalid") && isValid(field)) {
      showFieldError(field, false);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => {
      const valid = isValid(field);
      showFieldError(field, !valid);
      return !valid;
    });
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    form.reset();
    form.hidden = true;
    confirmation.hidden = false;
    document.body.classList.add("signup-complete");
    confirmation.querySelector("h2").focus();
  });

  confirmation.querySelector(".signup-return").addEventListener("click", () => {
    confirmation.hidden = true;
    form.hidden = false;
    document.body.classList.remove("signup-complete");
    fields[0].focus();
  });
  document.querySelector(".signup-unavailable").hidden = true;
  form.hidden = false;
}
