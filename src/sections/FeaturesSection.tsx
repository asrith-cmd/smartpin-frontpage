import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { SectionCopyItem } from "@/types/content";
import { useCanvasImageSequence } from "@/hooks/useCanvasImageSequence";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealText } from "@/components/common/ScrollRevealText";

const FRAME_COUNT = 240;
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;
const frameUrl = (i: number) => `/sequences/features/Comp_${String(i).padStart(5, "0")}.png`;

const parts: SectionCopyItem[] = [
  {
    title: "Front Enclosure",
    desc: "Designed to be lightweight, durable, and comfortable enough to wear every day without compromise.",
  },
  {
    title: "PCB",
    desc: "A custom-engineered circuit board seamlessly powers every sensor, connection, and interaction.",
  },
  {
    title: "Side Frame",
    desc: "Durable impact resistant fixture which increases over all durability of the pin.",
  },
  {
    title: "Battery",
    desc: "2000 mAh durable safe and thermal resistant battery with 7 days of battery for a stress free tracking.",
  },
  {
    title: "Back Enclosure",
    desc: "Engineered to protect the smart pin internal components from impacts, dust, and everyday wear. IP67 grade dust and waterproof.",
  },
  {
    title: "Attachment Latch",
    desc: "Designed to securely fasten the smart pin to students uniform ensuring firm and reliable hold throughout the day.",
  },
];

// Horizontal center of each part as % of canvas width (measured from screenshot)
const PART_X = [40, 48, 53, 63, 70, 75];

// Frame where the parts are fully dispersed — the sequence pauses here.
const FREEZE_FRAME = 120;

// Scroll-progress phases:
// 0            -> DISPERSE_END  : scrub frames 0 -> FREEZE_FRAME
// DISPERSE_END -> CAPTION_END  : frozen — captions reveal one by one
// CAPTION_END  -> 1            : scrub FREEZE_FRAME -> last frame
const DISPERSE_END = 0.15;
const CAPTION_END = 0.88;
// Each caption gets an equal slice of the frozen window
const CAPTION_STEP = (CAPTION_END - DISPERSE_END) / parts.length;

function progressToFrame(progress: number) {
  if (progress <= DISPERSE_END) {
    const t = progress / DISPERSE_END;
    return Math.round(t * FREEZE_FRAME);
  }
  if (progress <= CAPTION_END) {
    return FREEZE_FRAME;
  }
  const t = (progress - CAPTION_END) / (1 - CAPTION_END);
  return Math.round(FREEZE_FRAME + t * (FRAME_COUNT - 1 - FREEZE_FRAME));
}

// Returns how many captions (0-6) should be visible at this progress
function visibleCount(progress: number): number {
  if (progress <= DISPERSE_END) return 0;
  if (progress > CAPTION_END) return 0;
  return Math.min(parts.length, Math.ceil((progress - DISPERSE_END) / CAPTION_STEP));
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const { canvasRef, frameRef, drawFrame } = useCanvasImageSequence({
    frameCount: FRAME_COUNT,
    frameWidth: FRAME_WIDTH,
    frameHeight: FRAME_HEIGHT,
    frameUrl,
  });

  // Pinned scroll-scrub + sequential part-caption reveal
  usePinnedScrollScrub({
    triggerRef: sectionRef,
    endDistance: () => window.innerHeight * 3.6,
    scrub: 0.6,
    onUpdate: (self: ScrollTrigger) => {
      const frame = progressToFrame(self.progress);
      frameRef.current = frame;
      drawFrame(frame);
      const next = visibleCount(self.progress);
      setRevealedCount((prev) => (prev !== next ? next : prev));
    },
  });

  // Only the active caption is visible; all others are fully hidden
  useEffect(() => {
    const activeIdx = revealedCount - 1;
    captionRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIdx) {
        gsap.fromTo(el,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.set(el, { opacity: 0, y: 8 });
      }
    });
  }, [revealedCount]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-black pb-6 md:pb-10 overflow-hidden h-screen flex items-center scroll-mt-[68px] md:scroll-mt-[85px] pt-[120px] md:pt-[140px]"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0, 35, 98, 0) 0%, rgba(0, 35, 98, 0.2) 70%, rgba(0, 35, 98, 0.2) 100%)" }}
      />

      {/* Vector 3 — upper-left diagonal glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "76.67vw",
          height: "18.51vw",
          top: "-5%",
          left: "-40%",
          transform: "rotate(10deg)",
          opacity: 1,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1139.01 301.652" fill="none" preserveAspectRatio="none">
          <path
            d="M17.5048 155.208C46.0097 165.28 94.8659 208.457 166.808 235.246C238.75 262.035 288.126 280.827 343.951 282.978C399.777 285.128 459.226 270.269 513.926 228.255C568.626 186.24 647.415 112.229 702.034 70.6812C756.653 29.1333 793.033 24.5468 818.407 19.9219C844.113 15.2368 874.788 16.9046 910.748 28.8666C946.708 40.8286 978.917 64.7525 1008.93 99.4299C1038.95 134.107 1065.79 178.813 1085.48 215.117C1105.17 251.42 1116.89 277.965 1121.5 284.151"
            stroke="url(#v3grad)"
            strokeLinecap="round"
            strokeWidth="35"
          />
          <defs>
            <linearGradient id="v3grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#161617" />
              <stop offset="50%" stopColor="#054FD5" />
              <stop offset="100%" stopColor="rgba(0, 35, 98, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Vector 4 — lower-right diagonal glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "76.67vw",
          height: "14.69vw",
          bottom: "-5%",
          right: "-35%",
          transform: "rotate(20deg)",
          opacity: 1,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1139 246.486" fill="none" preserveAspectRatio="none">
          <path
            d="M17.5038 126.719C45.0848 140.551 94.4975 165.768 166.807 190.199C237.434 214.062 288.125 226.35 343.95 228.056C399.776 229.762 459.225 217.977 513.925 184.654C568.625 151.332 647.415 92.6316 702.033 59.679C756.652 26.7264 793.032 23.0888 818.406 19.4207C844.112 15.7048 874.787 17.0276 910.747 26.5149C946.707 36.0022 978.917 54.9768 1008.93 82.4803C1038.94 109.984 1065.79 145.441 1085.48 174.234C1105.17 203.027 1116.89 224.08 1121.5 228.986"
            stroke="url(#v4grad)"
            strokeLinecap="round"
            strokeWidth="35"
          />
          <defs>
            <linearGradient id="v4grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="rgba(0, 35, 98, 0)" />
              <stop offset="50%" stopColor="#054FD5" />
              <stop offset="100%" stopColor="#14171F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto pb-14 px-5 md:px-20 w-full">
        {/* Section header (scroll-reveal, word by word) */}
        <div className="text-center mb-4 md:mb-6">
          <ScrollRevealText
            text="Engineered with purpose"
            className="block text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-6"
            revealBy="words"
            startPercent={88}
            endPercent={58}
            dimOpacity={0.18}
          />
          <h2
            className="text-[#E8E8EF] text-7xl md:text-5xl leading-[1.1] font-medium"
            style={{ fontFamily: sfPro }}
          >
            <ScrollRevealText
              text="Precision."
              className="block"
              revealBy="words"
              startPercent={82}
              endPercent={50}
              dimOpacity={0.18}
            />
            <ScrollRevealText
              text="Inside and out."
              className="block"
              revealBy="words"
              startPercent={78}
              endPercent={42}
              dimOpacity={0.18}
            />
          </h2>
        </div>

        {/* Canvas + overlaid callouts */}
        <div className="relative w-full">
          <div className="aspect-video h-[38vh] sm:h-[44vh] md:h-[50vh] w-full">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Per-part callout labels, absolutely positioned below each component */}
          {parts.map((part, i) => (
            <div
              key={part.title}
              ref={(el) => { captionRefs.current[i] = el; }}
              className="absolute flex flex-col items-start text-left"
              style={{
                left: `${PART_X[i]}%`,
                top: "77%",
                transform: "translateX(-50%)",
                width: "13%",
                opacity: 0,
              }}
            >
              <img src="/image.png" alt="" className="h-15 w-1.5 mb-1.5" />
              <h3 className="text-white text-xs md:text-sm font-bold mb-1 leading-tight tracking-wide" style={{ fontFamily: sfPro }}>
                {part.title}
              </h3>
              <p className="text-[#9a9aa3] text-[9px] md:text-xs leading-snug hidden md:block" style={{ fontFamily: dmSans }}>
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
