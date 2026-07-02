const NAVBAR_OFFSET_MOBILE = 80;
const NAVBAR_OFFSET_DESKTOP = 100;

/** Smooth-scrolls to the element with the given id, offset below the fixed navbar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = window.innerWidth >= 768 ? NAVBAR_OFFSET_DESKTOP : NAVBAR_OFFSET_MOBILE;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
