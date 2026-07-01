import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import rfidVideo from "@/assets/howitworks/rfid.mp4";
import rfidImg from "@/assets/howitworks/rfid.png";
import busVideo from "@/assets/howitworks/bus-scanning.mp4";
import busImg from "@/assets/howitworks/bus-scanning.png";
import schoolZoneVideo from "@/assets/howitworks/school-zone.mp4";
import schoolZoneImg from "@/assets/howitworks/school-zone.png";
import gpsImg from "@/assets/howitworks/gpstracking.png";
import geofenceVideo from "@/assets/howitworks/gpsfencing.mp4";
import sosVideo from "@/assets/howitworks/SOS.mp4";
import sosImg from "@/assets/howitworks/SOS.png";
import voiceVideo from "@/assets/howitworks/voice-recording.mp4";

gsap.registerPlugin(ScrollTrigger);

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

// 11 frames total — tile index tells which left-panel tile is active
const FRAMES: { tile: number; type: "video" | "image"; src: string }[] = [
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

const TILES = [
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
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const prevTileRef = useRef(-1);

  const activeTile = FRAMES[activeFrame].tile;
  const section = TILES[activeTile];

  useEffect(() => {
    // Calculate the correct offset to center the active frame
    // Since the track is positioned at left: 50%, we need to calculate
    // how far left to move so the active frame center aligns with container center
    const offsetForIndex = (idx: number) => {
      let totalWidthToActiveCenter = 0;
      
      // Add width of all frames before the active frame (they are all PEEK_W)
      totalWidthToActiveCenter += idx * (PEEK_W + GAP);
      
      // Add half the active frame width to get to its center point
      totalWidthToActiveCenter += ACTIVE_W / 2;
      
      // Return negative offset to move left from the 50% position
      return -totalWidthToActiveCenter;
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (TOTAL - 1) * 1.2}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
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
      });
    }, sectionRef);

    // Set initial position
    gsap.set(trackRef.current, { x: offsetForIndex(0) });

    return () => ctx.revert();
  }, []);

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
          <div
            className="absolute left-1/2 pointer-events-none z-0"
            style={{
              width: "94.58vw",
              height: "8.82vw",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 1397.01 162.004" fill="none" preserveAspectRatio="none">
              <path
                d="M17.5021 82.9372C52.6685 87.7461 112.942 108.361 201.697 121.151C290.452 133.941 351.366 142.913 420.238 143.94C489.109 144.967 562.451 137.872 629.935 117.813C697.418 97.7535 794.62 62.4173 862.003 42.5805C929.386 22.7437 963.459 19.4991 995.519 18.2022C1027.58 16.9052 1075.13 16.9052 1119.49 22.6164C1163.86 28.3275 1203.59 39.7499 1240.62 56.3064C1277.65 72.8629 1310.76 94.2075 1335.05 111.54C1359.35 128.873 1373.81 141.547 1379.5 144.5"
                stroke="url(#v2grad)"
                strokeLinecap="round"
                strokeOpacity="0.5"
                strokeWidth="35"
              />
              <defs>
                <linearGradient id="v2grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#161617" />
                  <stop offset="50%" stopColor="#054FD5" />
                  <stop offset="100%" stopColor="#161617" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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
