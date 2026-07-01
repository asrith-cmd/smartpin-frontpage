import { useEffect, useRef, useState } from "react";

const SCROLLED_BACKGROUND =
  "linear-gradient(to bottom, rgba(22,22,23,0.92) 0%, rgba(22,22,23,0.0) 100%)";
const SCROLL_THRESHOLD = 10;

/**
 * Returns a ref for a fixed navbar element and a `background` CSS value that
 * fades in once the page scrolls past `SCROLL_THRESHOLD`px, and back to
 * transparent at the top.
 *
 * Previously this was an inline scroll listener attached inside a JSX `ref`
 * callback with no cleanup, re-attaching a new listener on every re-render.
 * This hook attaches exactly one listener on mount and removes it on unmount.
 */
export function useNavbarScrollBackground() {
  const navRef = useRef<HTMLElement>(null);
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      setBackground(window.scrollY > SCROLL_THRESHOLD ? SCROLLED_BACKGROUND : "transparent");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { navRef, background };
}
