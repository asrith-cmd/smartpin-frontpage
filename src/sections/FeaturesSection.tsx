import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { SectionCopyItem } from "@/types/content";
import { useCanvasImageSequence } from "@/hooks/useCanvasImageSequence";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
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
    title: "RFID Module",
    desc: "Secure RFID technology enables fast, contactless check-ins in less than a second.",
  },
  {
    title: "GPS Module",
    desc: "Real-time location updates help schools and parents stay connected with confidence.",
  },
  {
    title: "PCB",
    desc: "A custom-engineered circuit board seamlessly powers every sensor, connection, and interaction.",
  },
  {
    title: "Cellular Communication Module",
    desc: "Independent cellular connectivity keeps Smart Pin communicating, even when Wi-Fi isn't available.",
  },
];

// Frame where the parts are fully dispersed — the sequence pauses here.
const FREEZE_FRAME = 120;

// Scroll-progress phases within the pin:
// 0 -> DISPERSE_END        : scrub frames 0 -> FREEZE_FRAME (parts fly apart)
// DISPERSE_END -> CAPTION_END : frame held at FREEZE_FRAME, captions cycle one per equal segment
// CAPTION_END -> 1            : scrub frames FREEZE_FRAME -> last (parts close back up), then release
const DISPERSE_END = 0.3;
const CAPTION_END = 0.75;

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

function progressToPart(progress: number) {
  if (progress <= DISPERSE_END || progress > CAPTION_END) return -1;
  const t = (progress - DISPERSE_END) / (CAPTION_END - DISPERSE_END);
  return Math.min(parts.length - 1, Math.floor(t * parts.length));
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [activePart, setActivePart] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);

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
    onUpdate: (self) => {
      const frame = progressToFrame(self.progress);
      frameRef.current = frame;
      drawFrame(frame);

      const partIndex = progressToPart(self.progress);
      setCaptionVisible((prev) => (prev !== (partIndex !== -1) ? partIndex !== -1 : prev));
      if (partIndex !== -1) {
        setActivePart((prev) => (prev !== partIndex ? partIndex : prev));
      }
    },
  });

  // Fade the caption in/out, and re-pop it whenever the active part changes
  useEffect(() => {
    if (!captionRef.current) return;
    if (captionVisible) {
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(captionRef.current, { opacity: 0, y: 12, duration: 0.3, ease: "power2.in" });
    }
  }, [activePart, captionVisible]);

  const current = parts[activePart];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-black pt-5 md:pt-3 pb-6 md:pb-10 overflow-hidden h-screen flex items-center"
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

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 w-full">
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

        {/* Center: scroll-scrubbed exploded-parts sequence — height-bound so it always fits the viewport */}
        <div className="flex justify-center">
          <div className="relative w-auto max-w-[90vw]">
            <div className="aspect-video h-[40vh] sm:h-[46vh] md:h-[52vh]">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Rotating part caption, anchored under the leftmost part with a dot + line */}
            <div className="mt-1 pl-[4%] md:pl-[6%]">
              <div
                ref={captionRef}
                className="flex flex-col items-start text-left max-w-[300px]"
                style={{ opacity: 0, transform: "translateY(12px)" }}
              >
                <span className="w-[6px] h-[6px] rounded-full bg-[#E8E8EF] shrink-0" />
                <span
                  className="w-px h-5 md:h-7"
                  style={{ background: "linear-gradient(to bottom, #E8E8EF, transparent)" }}
                />
                <h3
                  className="text-[#E8E8EF] text-lg md:text-xl font-normal mb-1"
                  style={{ fontFamily: sfPro }}
                >
                  {current.title}
                </h3>
                <p
                  className="text-[#858589] text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: dmSans }}
                >
                  {current.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
