import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfPro, dmSans } from "@/constants/fonts";
import type { IconCopyItem, SectionCopyItem } from "@/types/content";
import { useCanvasImageSequence } from "@/hooks/useCanvasImageSequence";
import { usePinnedScrollScrub } from "@/hooks/usePinnedScrollScrub";
import { ScrollRevealText } from "@/components/common/ScrollRevealText";
import { Button } from "@/components/common/Button";
import { ArrowIcon } from "@/components/common/ArrowIcon";
import { useContactForm } from "@/providers/ContactFormProvider";
import { scrollToSection } from "@/lib/scrollToSection";
import deviceBgRings from "@/assets/images/device/device-bg-rings.png";
import {
  SECTION_ID,
  FRAME_COUNT,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  frameUrl,
  HERO_END,
  DEVICE_END,
  DEVICE_END_FRAME,
  getEndDistance,
  setSectionStart,
} from "./introScrubber.constants";

// Old DeviceSection's callout thresholds, remapped into the device phase's
// slice of the merged progress range (HERO_END -> DEVICE_END).
const POINT_THRESHOLDS = [0.12, 0.45, 0.78].map((t) => HERO_END + t * (DEVICE_END - HERO_END));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);

// Continuous, scroll-tied content opacity windows — text fades as a direct
// function of scroll progress rather than snapping on a phase-change tick.
// Hero fades out fast, right as scrolling starts, well before the photo->
// black dissolve even begins; Device/Features fade in over a short entry
// window at the start of their own phase.
const HERO_FADE_END = HERO_END * 0.28;
const DEVICE_ENTRY_END = HERO_END + (DEVICE_END - HERO_END) * 0.12;
const DEVICE_EXIT_START = DEVICE_END - (DEVICE_END - HERO_END) * 0.12;
const FEATURES_ENTRY_END = DEVICE_END + (1 - DEVICE_END) * 0.12;

// Canvas scale transitions: hero stays at 1, then scales down to fit the
// device spacer, then transitions to the features spacer fit.
const HERO_SCALE_EXIT_START = HERO_END * 0.85;
const DEVICE_SCALE_EXIT_START = DEVICE_END - (DEVICE_END - HERO_END) * 0.03;

// Features: scrub frames DEVICE_END_FRAME -> last frame only across the
// first slice of the features phase, then freeze on the final (fully
// exploded) frame — the rest of the phase's scroll is dedicated entirely to
// walking through each part's caption.
const FEATURES_FREEZE_POINT = DEVICE_END + (1 - DEVICE_END) * 0.35;
// Each caption fades in over the first slice of its own dedicated scroll
// window and fades out over the last slice (the final caption just stays).
const CAPTION_FADE_FRACTION = 0.35;

// On narrow viewports the raw canvas draw switches from "cover" (device
// phase — cropping is fine since the device is centered) to "contain"
// (features phase — needed so the wide exploded-parts artwork isn't cropped
// on the sides). Blending the draw scale continuously across this window
// straddling DEVICE_END turns that switch into a smooth zoom instead of a
// single-frame pop/flicker. The wrapper's own scale/position tween (below)
// is driven by this exact same window on narrow viewports so the two
// transitions finish together — running them on different schedules (as a
// first pass here did) let the wrapper reach full size before the raw draw
// caught up to "contain", producing a brief zoomed-in overshoot.
const NARROW_FIT_BLEND_START = DEVICE_END - (DEVICE_END - HERO_END) * 0.15;
const NARROW_FIT_BLEND_END = DEVICE_END + (FEATURES_FREEZE_POINT - DEVICE_END) * 0.3;

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
const PART_X = [24, 36, 46, 56, 65, 76];
const CAPTION_STEP = (1 - FEATURES_FREEZE_POINT) / parts.length;

export function IntroScrubberSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const deviceSpacerRef = useRef<HTMLDivElement>(null);
  const featuresSpacerRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCaptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Cached device/features spacer fit (scale + vertical %), remeasured on
  // resize — read every scroll tick without touching the DOM each time.
  const canvasFitRef = useRef({ deviceScale: 1, deviceY: 0, featuresScale: 0.66, featuresY: 10 });

  const [activePoint, setActivePoint] = useState(-1);

  const { openForm } = useContactForm();

  const { canvasRef, frameRef, drawFrame } = useCanvasImageSequence({
    frameCount: FRAME_COUNT,
    frameWidth: FRAME_WIDTH,
    frameHeight: FRAME_HEIGHT,
    frameUrl,
    fit: "cover",
  });

  usePinnedScrollScrub({
    triggerRef: sectionRef,
    endDistance: getEndDistance,
    scrub: 0.6,
    onInit: () => {
      if (!sectionRef.current) return;
      setSectionStart(sectionRef.current.getBoundingClientRect().top + window.scrollY);
    },
    onUpdate: (self) => {
      const progress = self.progress;

      // Scrub normally through hero+device; in features, scrub to the last
      // frame over just the first slice of the phase, then freeze there —
      // the remaining scroll is dedicated to the part captions.
      let frame: number;
      const isNarrowViewport = window.innerWidth < 768;
      if (progress <= DEVICE_END) {
        frame = Math.round(progress * (FRAME_COUNT - 1));
      } else {
        const t = clamp01((progress - DEVICE_END) / (FEATURES_FREEZE_POINT - DEVICE_END));
        frame = Math.round(lerp(DEVICE_END_FRAME, FRAME_COUNT - 1, t));
      }
      frame = Math.min(FRAME_COUNT - 1, frame);
      frameRef.current = frame;

      // Device->features scale/position tween and (on narrow viewports) the
      // raw draw's cover->contain blend must run on the exact same window —
      // see the NARROW_FIT_BLEND_* comment above for why a mismatch here
      // reads as a zoom flicker/overshoot.
      const transitionStart = isNarrowViewport ? NARROW_FIT_BLEND_START : DEVICE_SCALE_EXIT_START;
      const transitionEnd = isNarrowViewport ? NARROW_FIT_BLEND_END : DEVICE_END;

      let drawFitOverride: number | "contain" | undefined;
      if (isNarrowViewport) {
        const canvas = canvasRef.current;
        const w = canvas?.clientWidth ?? 0;
        const h = canvas?.clientHeight ?? 0;
        if (progress <= transitionStart || !w || !h) {
          drawFitOverride = undefined;
        } else if (progress >= transitionEnd) {
          drawFitOverride = "contain";
        } else {
          const t = (progress - transitionStart) / (transitionEnd - transitionStart);
          const coverScale = Math.max(w / FRAME_WIDTH, h / FRAME_HEIGHT);
          const containScale = Math.min(w / FRAME_WIDTH, h / FRAME_HEIGHT);
          drawFitOverride = lerp(coverScale, containScale, t);
        }
      }
      drawFrame(frame, drawFitOverride);

      const fit = canvasFitRef.current;
      // On narrow viewports the "contain" draw above already sizes the
      // artwork to fit the full canvas without cropping, so the wrapper
      // shouldn't shrink it again — that double-shrink was leaving the
      // exploded-parts artwork as a tiny sliver on phones. Skip the extra
      // scale-down there and only translate into the reserved layout gap.
      const featuresScale = isNarrowViewport ? 1 : fit.featuresScale;
      let yPct: number;
      let scale: number;
      if (progress <= HERO_END) {
        const t = clamp01((progress - HERO_SCALE_EXIT_START) / (HERO_END - HERO_SCALE_EXIT_START));
        yPct = lerp(0, fit.deviceY, t);
        scale = lerp(1, fit.deviceScale, t);
      } else if (progress <= transitionStart) {
        yPct = fit.deviceY;
        scale = fit.deviceScale;
      } else if (progress <= transitionEnd) {
        const t = (progress - transitionStart) / (transitionEnd - transitionStart);
        yPct = lerp(fit.deviceY, fit.featuresY, t);
        scale = lerp(fit.deviceScale, featuresScale, t);
      } else {
        yPct = fit.featuresY;
        scale = featuresScale;
      }
      if (canvasWrapRef.current) {
        canvasWrapRef.current.style.transform = `translateY(${yPct}%) scale(${scale})`;
      }

      // Continuous, scroll-tied fades — no waiting for a phase-change tick.
      const heroOpacity = 1 - clamp01(progress / HERO_FADE_END);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroOpacity);
        heroRef.current.style.transform = `translateY(${(1 - heroOpacity) * -16}px)`;
        heroRef.current.style.pointerEvents = heroOpacity > 0.05 ? "auto" : "none";
      }

      let deviceOpacity = 0;
      if (progress >= HERO_END && progress < DEVICE_END) {
        if (progress < DEVICE_ENTRY_END) deviceOpacity = clamp01((progress - HERO_END) / (DEVICE_ENTRY_END - HERO_END));
        else if (progress < DEVICE_EXIT_START) deviceOpacity = 1;
        else deviceOpacity = 1 - clamp01((progress - DEVICE_EXIT_START) / (DEVICE_END - DEVICE_EXIT_START));
      }
      if (deviceRef.current) {
        deviceRef.current.style.opacity = String(deviceOpacity);
        deviceRef.current.style.pointerEvents = deviceOpacity > 0.5 ? "auto" : "none";
      }

      let featuresOpacity = 0;
      if (progress >= DEVICE_END) {
        featuresOpacity =
          progress < FEATURES_ENTRY_END ? clamp01((progress - DEVICE_END) / (FEATURES_ENTRY_END - DEVICE_END)) : 1;
      }
      if (featuresRef.current) {
        featuresRef.current.style.opacity = String(featuresOpacity);
        featuresRef.current.style.pointerEvents = featuresOpacity > 0.5 ? "auto" : "none";
      }

      let nextPoint = -1;
      if (progress > POINT_THRESHOLDS[2]) nextPoint = 2;
      else if (progress > POINT_THRESHOLDS[1]) nextPoint = 1;
      else if (progress > POINT_THRESHOLDS[0]) nextPoint = 0;
      setActivePoint((prev) => (prev !== nextPoint ? nextPoint : prev));

      // Each part caption gets its own dedicated scroll slice within the
      // frozen window — fades in, holds, fades out (last one just holds),
      // driven continuously by scroll rather than snapping per index.
      for (let i = 0; i < parts.length; i++) {
        const start = FEATURES_FREEZE_POINT + i * CAPTION_STEP;
        const end = start + CAPTION_STEP;
        const fadeSpan = CAPTION_STEP * CAPTION_FADE_FRACTION;
        let op = 0;
        if (progress >= start && progress < end) {
          const tIn = clamp01((progress - start) / fadeSpan);
          const tOut = i === parts.length - 1 ? 1 : clamp01((end - progress) / fadeSpan);
          op = Math.min(tIn, tOut);
        } else if (progress >= end && i === parts.length - 1) {
          op = 1;
        }
        const y = (1 - op) * 8;
        [captionRefs.current[i], mobileCaptionRefs.current[i]].forEach((el) => {
          if (!el) return;
          el.style.opacity = String(op);
          el.style.transform = `translateY(${y}px)`;
          el.style.pointerEvents = op > 0.5 ? "auto" : "none";
        });
      }
    },
  });

  // The device/parts render across nearly the full canvas, which collides
  // with overlaid text laid out for a much smaller confined box. Rather than
  // guessing a scale/offset per breakpoint, measure the actual spacer div
  // each phase reserves for the artwork and cache its fit (scale + %offset)
  // for the continuous interpolation in onUpdate above.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const fit = canvasFitRef.current;
      if (deviceSpacerRef.current) {
        const r = deviceSpacerRef.current.getBoundingClientRect();
        fit.deviceScale = Math.min(1, Math.min(r.width / sectionRect.width, r.height / sectionRect.height));
        fit.deviceY = ((r.top + r.height / 2 - (sectionRect.top + sectionRect.height / 2)) / sectionRect.height) * 100;
      }
      if (featuresSpacerRef.current) {
        const r = featuresSpacerRef.current.getBoundingClientRect();
        fit.featuresScale = Math.min(1, Math.min(r.width / sectionRect.width, r.height / sectionRect.height));
        fit.featuresY = ((r.top + r.height / 2 - (sectionRect.top + sectionRect.height / 2)) / sectionRect.height) * 100;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Animate each device point in/out as activePoint advances
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
      id={SECTION_ID}
      ref={sectionRef}
      className="relative bg-[#161617] min-h-screen overflow-hidden"
    >
      {/* Shared full-bleed canvas — scrubs hero desk scene -> device -> exploded parts */}
      <div ref={canvasWrapRef} className="absolute inset-0" style={{ transformOrigin: "center center" }}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Hero phase */}
      <div ref={heroRef} className="absolute inset-0 z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(22, 22, 23, 0) 0%, #161617 1000%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#161617] to-transparent" />
        <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-[#161617] to-transparent" />
        <div className="absolute inset-0 bg-black/40 md:hidden" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 pt-[220px] md:pt-[190px] lg:pt-[226px] pb-20 md:pb-24 text-center md:text-left">
          <p
            className="text-[#E8E8EF] text-xs md:text-sm tracking-[2.8px] uppercase mb-6 font-medium"
            style={{ fontFamily: sfPro }}
          >
            Introducing Smart Pin
          </p>

          <h1
            className="text-[#E8E8EF] text-5xl md:text-[54px] lg:text-[70px] leading-[1.1] mb-6 max-w-[560px] mx-auto md:mx-0 font-medium"
            style={{ fontFamily: sfPro }}
          >
            School Safety. <br />
            Reinvented.
          </h1>

          <p
            className="text-[#858589] text-lg md:text-xl lg:text-2xl leading-[1.33] mb-10 max-w-[405px] mx-auto md:mx-0 font-medium"
            style={{
              fontFamily: sfPro,
              textShadow: "0 1px 2px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.8)",
            }}
          >
            One Smart Pin for tracking, protection, and peace of mind.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <Button variant="filled-white" className="px-6 h-12" onClick={() => openForm("demo")}>
              Book a Demo
            </Button>
            <Button variant="ghost" className="px-6 h-12" onClick={() => scrollToSection("how-it-works")}>
              See How it Works
              <ArrowIcon />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-5 md:left-10 lg:left-20 hidden md:flex items-center gap-2">
          <div className="border border-[#E8E8EF] rounded-xl flex items-center justify-center size-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M3 7L6 10L9 7" stroke="#E8E8EF" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#E8E8EF] text-xs tracking-[2.8px] uppercase font-medium" style={{ fontFamily: sfPro }}>
            Scroll to explore
          </p>
        </div>
      </div>

      {/* Device phase */}
      <div id="product" ref={deviceRef} className="absolute inset-0 z-10" style={{ opacity: 0, pointerEvents: "none" }}>
        {/* Background rings image */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-30"
          style={{
            backgroundImage: `url(${deviceBgRings})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center'
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 w-full h-full flex items-center">
          <div className="flex flex-col md:gap-10 xl:flex-row items-center gap-8 lg:gap-10 w-full h-full lg:h-auto pt-16 md:pt-20 xl:pt-0 pb-4 lg:pb-0">
            <div className="flex-none lg:flex-1 max-w-[320px] md:max-w-[360px] xl:max-w-[350px] w-full mx-auto lg:mx-0">
              <h2
                className="text-[#E8E8EF] text-4xl md:text-[40px] lg:text-[48px] leading-tight font-normal"
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

            {/* Spacer preserving the layout gap where the device renders (shared canvas sits behind) */}
            <div
              ref={deviceSpacerRef}
              className="w-full max-w-[530px] md:max-w-[590px] flex-1 min-h-[280px] md:min-h-[340px] lg:min-h-0 lg:flex-none lg:shrink-0 lg:w-[550px] xl:w-[610px] lg:aspect-video"
              aria-hidden
            />

            <div className="flex-none lg:flex-1 max-w-[300px] md:max-w-[340px] w-full mx-auto lg:mx-0 flex flex-col gap-8">
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
                    <h3 className="text-[#E8E8EF] text-xl md:text-2xl font-normal mb-1" style={{ fontFamily: sfPro }}>
                      {p.title}
                    </h3>
                    <p className="text-[#858589] text-base md:text-lg leading-relaxed" style={{ fontFamily: dmSans }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features phase */}
      <div id="features" ref={featuresRef} className="absolute inset-0 z-10 mt-[50px] md:mt-0" style={{ opacity: 0, pointerEvents: "none" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0, 35, 98, 0) 0%, rgba(0, 35, 98, 0.2) 70%, rgba(0, 35, 98, 0.2) 100%)" }}
        />

        <div
          className="absolute pointer-events-none"
          style={{ width: "76.67vw", height: "18.51vw", top: "-5%", left: "-40%", transform: "rotate(10deg)", opacity: 1 }}
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

        <div
          className="absolute pointer-events-none"
          style={{ width: "76.67vw", height: "14.69vw", bottom: "-5%", right: "-40%", transform: "rotate(20deg)", opacity: 1 }}
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
                <stop offset="0%" stopColor="rgba(0, 35, 98,0)" />
                <stop offset="50%" stopColor="#054FD5" />
                <stop offset="100%" stopColor="#14171F" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto pb-14 px-5 md:px-10 lg:px-20 w-full h-full flex flex-col pt-[44px] md:pt-[56px] lg:pt-[60px]">
          <div className="text-center mb-4 md:mb-6">
            <ScrollRevealText
              text="Engineered with purpose"
              className="block text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-3 md:mb-6"
              revealBy="words"
              startPercent={88}
              endPercent={58}
              dimOpacity={0.18}
            />
            <h2 className="text-[#E8E8EF] text-5xl md:text-5xl leading-[1.1] font-medium" style={{ fontFamily: sfPro }}>
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

          <div ref={featuresSpacerRef} className="relative w-full flex-1">
            {parts.map((part, i) => (
              <div
                key={part.title}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute hidden md:flex md:flex-col items-start text-left"
                style={{ left: `${PART_X[i]}%`, top: "83%", transform: "translateX(-50%)", width: "20%", opacity: 0 }}
              >
                <img src="/image.png" alt="" className="h-15 w-1.5 mb-1.5" />
                <h3 className="text-white text-xs md:text-sm font-bold mb-1 leading-tight tracking-wide" style={{ fontFamily: sfPro }}>
                  {part.title}
                </h3>
                <p className="text-[#9a9aa3] text-[9px] md:text-xs leading-snug" style={{ fontFamily: dmSans }}>
                  {part.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: one legible caption at a time below the artwork, instead of
              the tiny per-part boxes (which don't fit on narrow viewports) */}
          <div className="md:hidden relative w-full shrink-0 min-h-[112px] px-2 pt-3 pb-4 text-center">
            {parts.map((part, i) => (
              <div
                key={part.title}
                ref={(el) => {
                  mobileCaptionRefs.current[i] = el;
                }}
                className="absolute inset-x-2 top-3"
                style={{ opacity: 0 }}
              >
                <h3 className="text-white text-base font-bold mb-1.5" style={{ fontFamily: sfPro }}>
                  {part.title}
                </h3>
                <p className="text-[#9a9aa3] text-sm leading-relaxed" style={{ fontFamily: dmSans }}>
                  {part.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
