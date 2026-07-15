// Shared between IntroScrubberSection (the pinned hero->device->features scrub)
// and Navbar, which needs to compute scroll offsets for the Product/Technology
// links without a plain <a href="#..."> anchor (the targets are overlay phases
// inside one pinned section, not separately laid-out elements).

export const SECTION_ID = "intro-scrubber";

export const FRAME_COUNT = 125;
export const FRAME_WIDTH = 1792;
export const FRAME_HEIGHT = 1080;
export const frameUrl = (i: number) =>
  i <= 55
    ? `/sequences/seq2/Comp1_${String(i).padStart(5, "0")}.png`
    : `/sequences/seq2/Comp 1_${String(i).padStart(5, "0")}.png`;

// Frame boundaries observed in the source sequence:
// 0-40 desk/hero scene, 40-65 photo->black dissolve, 65-95 device on black
// w/ rings, 95-124 exploded parts. HERO_END is set past the dissolve so a
// direct nav jump lands on the clean black frame, not mid-crossfade.
export const HERO_END_FRAME = 65;
export const DEVICE_END_FRAME = 95;

export const HERO_END = HERO_END_FRAME / (FRAME_COUNT - 1);
export const DEVICE_END = DEVICE_END_FRAME / (FRAME_COUNT - 1);

// Total extra scroll distance the section stays pinned for, as a multiple of
// viewport height.
export const SCROLL_DISTANCE_VH_MULTIPLIER = 6;

export function getEndDistance() {
  return window.innerHeight * SCROLL_DISTANCE_VH_MULTIPLIER;
}

// The pinned section's natural (un-pinned) document offset, captured once at
// mount — while a ScrollTrigger pin is active the element's own
// getBoundingClientRect() reflects its *pinned* (fixed) position, not its
// scroll-start offset, so re-measuring it live would double-count scroll
// once the user has already scrolled into the pin.
let sectionStart = 0;
export function setSectionStart(value: number) {
  sectionStart = value;
}

/** Smooth-scrolls so the pinned section sits at the given progress (0-1). */
export function scrollToPhase(targetProgress: number) {
  const top = sectionStart + targetProgress * getEndDistance();
  window.scrollTo({ top, behavior: "smooth" });
}
