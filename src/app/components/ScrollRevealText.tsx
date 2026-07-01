import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Viewport % (from top) where the reveal begins, e.g. 85 -> "top 85%" */
  startPercent?: number;
  /** Viewport % (from top) where the reveal completes, e.g. 30 -> "top 30%" */
  endPercent?: number;
  /** Opacity of not-yet-revealed text: 0 = fully hidden, closer to 1 = subtle ghost */
  dimOpacity?: number;
  /** Reveal granularity */
  revealBy?: "chars" | "words";
}

export function ScrollRevealText({
  text,
  className = "",
  startPercent = 85,
  endPercent = 35,
  dimOpacity = 0.18,
  revealBy = "words",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal-unit]");

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: dimOpacity });
      gsap.to(targets, {
        opacity: 1,
        ease: "none",
        stagger: revealBy === "chars" ? 0.02 : 0.07,
        scrollTrigger: {
          trigger: root,
          start: `top ${startPercent}%`,
          end: `top ${endPercent}%`,
          scrub: 0.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [text, revealBy, startPercent, endPercent, dimOpacity]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {revealBy === "chars"
            ? word.split("").map((ch, ci) => (
                <span key={ci} data-reveal-unit className="inline-block">
                  {ch}
                </span>
              ))
            : (
                <span data-reveal-unit className="inline-block">
                  {word}
                </span>
              )}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
