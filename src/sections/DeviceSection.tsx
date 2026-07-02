import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { IconCopyItem } from "@/types/content";
import { useCanvasImageSequence } from "@/hooks/useCanvasImageSequence";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
import { ScrollRevealText } from "@/components/common/ScrollRevealText";
import deviceBgRings from "@/assets/images/device/device-bg-rings.png";

const FRAME_COUNT = 90;
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;
const frameUrl = (i: number) => `/sequences/device/Pin_${String(i).padStart(5, "0")}.png`;

const points: IconCopyItem[] = [
  {
    title: "Smart Attendance",
    desc: "Instant check-ins with secure and unique QR",
    icon: (
      <svg width="40" height="40" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.83594 22.125H11.0625C11.316 22.125 11.5234 21.9176 11.5234 21.6641V11.5234H21.6641C21.9176 11.5234 22.125 11.316 22.125 11.0625V7.83594C22.125 7.58242 21.9176 7.375 21.6641 7.375H11.293C9.12656 7.375 7.375 9.12656 7.375 11.293V21.6641C7.375 21.9176 7.58242 22.125 7.83594 22.125ZM37.3359 11.5234H47.4766V21.6641C47.4766 21.9176 47.684 22.125 47.9375 22.125H51.1641C51.4176 22.125 51.625 21.9176 51.625 21.6641V11.293C51.625 9.12656 49.8734 7.375 47.707 7.375H37.3359C37.0824 7.375 36.875 7.58242 36.875 7.83594V11.0625C36.875 11.316 37.0824 11.5234 37.3359 11.5234ZM21.6641 47.4766H11.5234V37.3359C11.5234 37.0824 11.316 36.875 11.0625 36.875H7.83594C7.58242 36.875 7.375 37.0824 7.375 37.3359V47.707C7.375 49.8734 9.12656 51.625 11.293 51.625H21.6641C21.9176 51.625 22.125 51.4176 22.125 51.1641V47.9375C22.125 47.684 21.9176 47.4766 21.6641 47.4766ZM51.1641 36.875H47.9375C47.684 36.875 47.4766 37.0824 47.4766 37.3359V47.4766H37.3359C37.0824 47.4766 36.875 47.684 36.875 47.9375V51.1641C36.875 51.4176 37.0824 51.625 37.3359 51.625H47.707C49.8734 51.625 51.625 49.8734 51.625 47.707V37.3359C51.625 37.0824 51.4176 36.875 51.1641 36.875ZM52.0859 27.4258H6.91406C6.66055 27.4258 6.45312 27.6332 6.45312 27.8867V31.1133C6.45312 31.3668 6.66055 31.5742 6.91406 31.5742H52.0859C52.3395 31.5742 52.5469 31.3668 52.5469 31.1133V27.8867C52.5469 27.6332 52.3395 27.4258 52.0859 27.4258Z"
          fill="#E8E8EF"
        />
      </svg>
    ),
  },
  {
    title: "SOS Protection",
    desc: "One-tap emergency alert sent straight to parents and school",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 4L8 10v12c0 11 6.8 19.6 16 22 9.2-2.4 16-11 16-22V10L24 4z"
          stroke="#E8E8EF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M24 16v10" stroke="#E8E8EF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="31" r="1.6" fill="#E8E8EF" />
      </svg>
    ),
  },
  {
    title: "Live Tracking",
    desc: "Real-time location updates the moment a child enters or leaves school",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 44s14-12.6 14-23a14 14 0 1 0-28 0c0 10.4 14 23 14 23z"
          stroke="#E8E8EF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="21" r="5" stroke="#E8E8EF" strokeWidth="2.5" />
      </svg>
    ),
  },
];

export function DeviceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePoint, setActivePoint] = useState(-1);

  const { canvasRef, frameRef, drawFrame } = useCanvasImageSequence({
    frameCount: FRAME_COUNT,
    frameWidth: FRAME_WIDTH,
    frameHeight: FRAME_HEIGHT,
    frameUrl,
  });

  // Pinned scroll-scrub + sequential point reveal
  usePinnedScrollScrub({
    triggerRef: sectionRef,
    endDistance: () => window.innerHeight * 2.4,
    scrub: 0.6,
    onUpdate: (self) => {
      const frame = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)));
      frameRef.current = frame;
      drawFrame(frame);

      let next = -1;
      if (self.progress > 0.78) next = 2;
      else if (self.progress > 0.45) next = 1;
      else if (self.progress > 0.12) next = 0;
      setActivePoint((prev) => (prev !== next ? next : prev));
    },
  });

  // Animate each point in/out as activePoint advances
  useEffect(() => {
    pointRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i <= activePoint ? 1 : 0,
        x: i <= activePoint ? 0 : 24,
        duration: i <= activePoint ? 0.5 : 0.3,
        ease: i <= activePoint ? "power2.out" : "power2.in",
      });
    });
  }, [activePoint]);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative bg-black py-20 md:py-32 overflow-hidden min-h-screen flex items-center scroll-mt-[68px] md:scroll-mt-[85px]"
    >
      {/* Decorative concentric rings behind the device */}
      <img
        src={deviceBgRings}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1030px] max-w-none pointer-events-none opacity-70"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Left: headline (scroll-reveal, word by word) */}
          <div className="flex-1 max-w-[350px] w-full mx-auto lg:mx-0">
            <h2
              className="text-[#E8E8EF] text-4xl md:text-[44px] lg:text-[48px] leading-tight font-normal"
              style={{ fontFamily: sfPro }}
            >
              <ScrollRevealText
                text="One Device."
                className="block whitespace-nowrap"
                revealBy="words"
                startPercent={88}
                endPercent={58}
                dimOpacity={0.18}
              />
              <ScrollRevealText
                text="Every layer of safety"
                className="block whitespace-nowrap"
                revealBy="words"
                startPercent={78}
                endPercent={42}
                dimOpacity={0.18}
              />
            </h2>
          </div>

          {/* Center: scroll-scrubbed 3D device sequence */}
          <div className="shrink-0 w-full max-w-[530px] sm:max-w-[590px] lg:w-[550px] xl:w-[610px] aspect-video">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ filter: "drop-shadow(0 24px 64px rgba(0,0,0,0.6))" }}
            />
          </div>

          {/* Right: sequential points */}
          <div className="flex-1 max-w-[300px] w-full mx-auto lg:mx-0 flex flex-col gap-8">
            {points.map((p, i) => (
              <div
                key={p.title}
                ref={(el) => {
                  pointRefs.current[i] = el;
                }}
                className="flex items-start gap-5"
                style={{ opacity: 0, transform: "translateX(24px)" }}
              >
                <div className="shrink-0 opacity-90">{p.icon}</div>
                <div>
                  <h3
                    className="text-[#E8E8EF] text-xl md:text-2xl font-normal mb-1"
                    style={{ fontFamily: sfPro }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[#858589] text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: dmSans }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
