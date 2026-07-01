import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { HowItWorksFrame, HowItWorksTile } from "@/types/content";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
import { DecorativeWave } from "@/components/common/DecorativeWave";

import rfidVideo from "@/assets/media/how-it-works/rfid.mp4";
import rfidImg from "@/assets/media/how-it-works/rfid.png";
import busVideo from "@/assets/media/how-it-works/bus-scanning.mp4";
import busImg from "@/assets/media/how-it-works/bus-scanning.png";
import schoolZoneVideo from "@/assets/media/how-it-works/school-zone.mp4";
import schoolZoneImg from "@/assets/media/how-it-works/school-zone.png";
import gpsImg from "@/assets/media/how-it-works/gpstracking.png";
import geofenceVideo from "@/assets/media/how-it-works/gpsfencing.mp4";
import sosVideo from "@/assets/media/how-it-works/SOS.mp4";
import sosImg from "@/assets/media/how-it-works/SOS.png";
import voiceVideo from "@/assets/media/how-it-works/voice-recording.mp4";

// 11 frames total — tile index tells which left-panel tile is active
const FRAMES: HowItWorksFrame[] = [
  { tile: 0, type: "video", src: rfidVideo },
  { tile: 0, type: "image", src: rfidImg },
  { tile: 1, type: "video", src: busVideo },
  { tile: 1, type: "image", src: busImg },
  { tile: 2, type: "video", src: schoolZoneVideo },
  { tile: 2, type: "image", src: schoolZoneImg },
  { tile: 3, type: "image", src: gpsImg },
  { tile: 4, type: "video", src: geofenceVideo },
  { tile: 5, type: "video", src: sosVideo },
  { tile: 5, type: "image", src: sosImg },
  { tile: 6, type: "video", src: voiceVideo },
];

const TILES: HowItWorksTile[] = [
  {
    title: "Real-Time School Entry and Exit Tracking",
    label: "Automatic Attendance, No Manual Registers",
    desc: "Students are automatically marked present as they enter school premises. Attendance data is instantly available to teachers and parents.",
  },
  {
    title: "Bus Boarding & Scanning",
    label: "Know When Your Child Gets On and Off the Bus",
    desc: "The Smart Pin is scanned while boarding and exiting the school bus, providing real-time notifications and visibility for parents and school administrators.",
  },
  {
    title: "School Zone Scanning",
    label: "Real-Time School Entry and Exit Tracking",
    desc: "Track student movement within designated school zones and maintain accurate records of arrivals and departures.",
  },
  {
    title: "GPS Tracking",
    label: "Always Know Where Your Child Is",
    desc: "Built-in GPS technology enables secure, real-time location visibility of students during transportation and authorized activities.",
  },
  {
    title: "Geo-Fencing",
    label: "Intelligent Safe Zone Monitoring",
    desc: "Create virtual safety boundaries around schools and predefined locations. Receive instant alerts whenever a student enters or exits these zones.",
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

const TOTAL = FRAMES.length; // 11
const ACTIVE_W = 488;
const ACTIVE_H = 550;
const PEEK_W = 244;
const PEEK_H = 260;
const GAP = 24;

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const prevTileRef = useRef(-1);

  const activeTile = FRAMES[activeFrame].tile;
  const section = TILES[activeTile];

  // Calculate the offset so the active frame is always centered. Since the
  // track is positioned at left: 50%, we move it left by the cumulative
  // width of every frame before the active one (they're all PEEK_W) plus
  // half the active frame's width (ACTIVE_W).
  const offsetForIndex = (idx: number) => -(idx * (PEEK_W + GAP) + ACTIVE_W / 2);

  usePinnedScrollScrub({
    triggerRef: sectionRef,
    endDistance: () => window.innerHeight * (TOTAL - 1) * 1.2,
    scrub: 1.5,
    onUpdate: (self) => {
      const rawIdx = self.progress * (TOTAL - 1);
      const idx = Math.min(TOTAL - 1, Math.round(rawIdx));

      // Smooth tween to the offset of the active frame
      gsap.to(trackRef.current, {
        x: offsetForIndex(idx),
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });

      setActiveFrame(idx);
    },
    onInit: () => {
      gsap.set(trackRef.current, { x: offsetForIndex(0) });
    },
  });

  // Animate left panel on tile change
  useEffect(() => {
    if (!leftRef.current) return;
    if (prevTileRef.current === activeTile) return;
    prevTileRef.current = activeTile;
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTile]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-black overflow-hidden h-screen flex flex-col"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-[39px] right-[39px] h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #000, rgba(5,79,213,0.5), #000)",
          boxShadow: "0 0 60px 15px rgba(5,79,213,0.15)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col h-full px-5 md:px-20 py-10 md:py-14 max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8 relative shrink-0">
          <DecorativeWave />
          <p className="relative z-10 text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-4" style={{ fontFamily: sfPro }}>
            How it works?
          </p>
          <h2 className="relative z-10 text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium" style={{ fontFamily: sfPro }}>
            Smart pin work flow
          </h2>
        </div>

        {/* Main row: left panel + carousel */}
        <div className="flex flex-1 items-center gap-10 lg:gap-16 min-h-0">

          {/* Left: active tile only - isolated from transforms */}
          <div ref={leftRef} className="shrink-0 w-[280px] lg:w-[320px] relative z-20">
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
            className="flex-1 relative overflow-hidden flex items-center justify-center my-auto"
            style={{ height: ACTIVE_H }}
          >
            {/* Track — positioned so active frame center = container center */}
            <div
              ref={trackRef}
              className="absolute flex items-center"
              style={{
                gap: GAP,
                willChange: "transform",
                left: "50%"
              }}
            >
              {FRAMES.map((frame, i) => {
                const isActive = i === activeFrame;
                const isPast = i < activeFrame;

                return (
                  <div
                    key={i}
                    className="shrink-0 rounded-[20px] overflow-hidden"
                    style={{
                      width: isActive ? ACTIVE_W : PEEK_W,
                      height: isActive ? ACTIVE_H : PEEK_H,
                      background: "#111",
                      opacity: isPast ? 0 : 1,
                      transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                      flexShrink: 0,
                    }}
                  >
                    {!isPast && (
                      frame.type === "video" ? (
                        <video
                          src={frame.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={frame.src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )
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
