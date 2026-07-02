import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most visible in the
 * viewport (via IntersectionObserver), returning `null` when scrolled near
 * the top of the page and nothing is intersecting yet.
 *
 * `sectionIds` should be a stable reference (module-level constant) — it's
 * only read when the effect re-runs.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      { threshold: [0.5] }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveId(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
