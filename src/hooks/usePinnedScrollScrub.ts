import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UsePinnedScrollScrubOptions {
  /** Element to pin at the top of the viewport while scrolling through it. */
  triggerRef: RefObject<Element | null>;
  /** Extra scroll distance (px) the section stays pinned for. */
  endDistance: () => number;
  scrub: number | boolean;
  anticipatePin?: number;
  onUpdate: (self: ScrollTrigger) => void;
  /** Runs once, immediately after the ScrollTrigger is created (e.g. to set an initial position). */
  onInit?: () => void;
}

/**
 * Pins `triggerRef`'s element and scrubs `onUpdate` against scroll progress
 * for `endDistance()` px of additional scroll. Wraps the
 * `gsap.context` / `ScrollTrigger.create` / cleanup boilerplate shared by
 * every pinned-scroll section (Device, Features, HowItWorks).
 */
export function usePinnedScrollScrub({
  triggerRef,
  endDistance,
  scrub,
  anticipatePin = 1,
  onUpdate,
  onInit,
}: UsePinnedScrollScrubOptions) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${Math.round(endDistance())}`,
        pin: true,
        scrub,
        anticipatePin,
        onUpdate,
      });
    }, triggerRef as RefObject<HTMLElement>);

    onInit?.();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
