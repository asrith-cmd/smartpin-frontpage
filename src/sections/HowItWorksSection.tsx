import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { HowItWorksFrame, HowItWorksTile } from "@/types/content";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
import { DecorativeWave } from "@/components/common/DecorativeWave";
import { ScrollRevealText } from "@/components/common/ScrollRevealText";

import rfidImg from "@/assets/media/how-it-works/rfid.png";
import smartparentImg from "@/assets/media/how-it-works/smartparent.png";
import liveGpsImg from "@/assets/media/how-it-works/live-gps.png";
import liveGps2Img from "@/assets/media/how-it-works/live-gps2.png";
import sosImg from "@/assets/media/how-it-works/sos.png";
import voiceImg from "@/assets/media/how-it-works/voice-rec.png";

// 7 frames total — tile index tells which left-panel tile is active
const FRAMES: HowItWorksFrame[] = [
  { tile: 0, type: "image", src: rfidImg },
  { tile: 1, type: "image", src: smartparentImg },
  { tile: 2, type: "image", src: liveGpsImg },
  { tile: 2, type: "image", src: liveGps2Img },
  { tile: 3, type: "image", src: sosImg },
  { tile: 4, type: "image", src: voiceImg },
];

const TILES: HowItWorksTile[] = [
  {
    title: "Real-Time School Entry and Exit Tracking",
    label: "Automatic RFID attendance and digital footprint throughout the campus",
    desc: "the hassle of manual attendance is replaced by our smart attendance system which scans attendance through all the classes for entire day instead of one single time attendance.",
  },
  {
    title: "Smart parent teacher notification system",
    label: "Instant Notifications for School Events",
    desc: "Parents gain greater visibility into their child's daily school journey, with customizable notifications based on their preferences",
  },
  {
    title: "Live GPS tracking",
    label: "Always Know Where Your Child Is",
    desc: "track the students location in real time more accurate than regular bus tracker system more optimized, specifically to individual tracking and higher visibility through out the journey",
  },
  {
    title: "SOS Emergency",
    label: "Help Is Always One Press Away",
    desc: "In emergencies, students can press the SOS button to instantly notify parents and school authorities with their location information.",
  },
  {
    title: "Voice Recording Capability",
    label: "Critical Moments Captured Securely",
    desc: "When an SOS event occurs, Smart Pin can record short voice clips to provide additional context and assist in faster emergency response.",
  },
];

const TOTAL = FRAMES.length; // 6
const ACTIVE_W = 488;
const ACTIVE_H = 550;
const PEEK_W = 200;
const PEEK_H = 260;
const GAP = 20;

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const prevTileRef = useRef(-1);
  // store the gsap x value directly so scrub drives it without double-smoothing
  const xRef = useRef(0);

  const activeTile = FRAMES[activeFrame].tile;
  const section = TILES[activeTile];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.min(1, entry.contentRect.width / ACTIVE_W);
      scaleRef.current = next;
      setScale(next);
      // re-snap track to current frame when container resizes
      gsap.set(trackRef.current, { x: offsetForIndex(activeFrame, next) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeW = Math.round(ACTIVE_W * scale);
  const activeH = Math.round(ACTIVE_H * scale);
  const peekW = Math.round(PEEK_W * scale);
  const peekH = Math.round(PEEK_H * scale);
  const gapPx = Math.round(GAP * scale);

  const offsetForIndex = (idx: number, s = scaleRef.current) =>
    -(idx * (PEEK_W * s + GAP * s) + (ACTIVE_W * s) / 2);

  usePinnedScrollScrub({
    triggerRef: sectionRef,
    // give each frame ~1 viewport height of scroll distance
    endDistance: () => window.innerHeight * (TOTAL - 1) * 1.6,
    // scrub:true = 1:1 with scroll, no lag — smoothness comes from CSS transition
    scrub: true,
    onUpdate: (self) => {
      const rawIdx = self.progress * (TOTAL - 1);
      // use floor+threshold so the snap feels intentional, not jumpy
      const idx = Math.min(TOTAL - 1, Math.floor(rawIdx + 0.35));

      // Drive the track directly via gsap.set (scrub already smooths it)
      const targetX = offsetForIndex(idx);
      if (targetX !== xRef.current) {
        xRef.current = targetX;
        gsap.to(trackRef.current, {
          x: targetX,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        });
      }

      setActiveFrame(idx);
    },
    onInit: () => {
      const x = offsetForIndex(0);
      xRef.current = x;
      gsap.set(trackRef.current, { x });
    },
  });

  // Animate left panel on tile change
  useEffect(() => {
    if (!leftRef.current) return;
    if (prevTileRef.current === activeTile) return;
    prevTileRef.current = activeTile;
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeTile]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-black overflow-hidden h-screen flex flex-col scroll-mt-[68px] md:scroll-mt-[85px]"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-[39px] right-[39px] h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #000, rgba(5,79,213,0.5), #000)",
          boxShadow: "0 0 60px 15px rgba(5,79,213,0.15)",
        }}
      />

      <div className="relative z-10 mt-[50px] w-full flex flex-col h-full px-5 md:px-20 md:pt-[70px] pb-10 md:pb-14 max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8 relative shrink-0">
          <DecorativeWave />
          <ScrollRevealText
            text="How it works?"
            className="relative z-10 block text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-4"
            revealBy="words"
            startPercent={88}
            endPercent={58}
            dimOpacity={0.18}
          />
          <h2
            className="relative z-10 text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium"
            style={{ fontFamily: sfPro }}
          >
            <ScrollRevealText
              text="Smart pin work flow"
              className="block"
              revealBy="words"
              startPercent={82}
              endPercent={50}
              dimOpacity={0.18}
            />
          </h2>
        </div>

        {/* Main row: left panel + carousel — stacked on mobile, side-by-side from md up */}
        <div className="flex flex-col md:flex-row flex-1 items-center gap-6 md:gap-10 lg:gap-16 min-h-0">

          {/* Left: active tile only - isolated from transforms */}
          <div ref={leftRef} className="shrink-0 w-full md:w-[280px] lg:w-[320px] relative z-20">
            <h3
              className="text-[#E8E8EF] text-xl md:text-2xl font-medium leading-[1.33] mb-3"
              style={{ fontFamily: sfPro }}
            >
              {section.title}
            </h3>
            <p
              className="text-[#858589] text-s tracking-[2.4px] font-medium mb-4"
              style={{ fontFamily: sfPro }}
            >
              {section.label}
            </p>
            <p
              className="text-[#858589] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: dmSans }}
            >
              {section.desc}
            </p>
          </div>

          {/* Carousel: overflow hidden, active frame always centered */}
          <div
            ref={carouselRef}
            className="w-full md:flex-1 relative overflow-hidden flex items-center justify-center my-auto"
            style={{ height: activeH }}
          >
            {/* Track — positioned so active frame center = container center */}
            <div
              ref={trackRef}
              className="absolute flex items-center"
              style={{
                gap: gapPx,
                willChange: "transform",
                left: "50%"
              }}
            >
              {FRAMES.map((frame, i) => {
                const isActive = i === activeFrame;

                return (
                  <div
                    key={i}
                    className="shrink-0 rounded-[20px] overflow-hidden"
                    style={{
                      width: isActive ? activeW : peekW,
                      height: isActive ? activeH : peekH,
                      background: "#111",
                      opacity: isActive ? 1 : 0.4,
                      transition: "width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                      flexShrink: 0,
                    }}
                  >
                    {frame.type === "video" ? (
                      <video
                        src={frame.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={frame.src}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-[39px] right-[39px] h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #000, rgba(5,79,213,0.5), #000)",
          boxShadow: "0 0 60px 15px rgba(5,79,213,0.15)",
        }}
      />
    </section>
  );
}
