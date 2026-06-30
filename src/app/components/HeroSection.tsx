import heroBg from "figma:asset/ec6dc07ecdf83e63c880dcc764d6eadd357e0498.png";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#161617]">
      {/* Background hero image — right side */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
          aria-hidden
        />
        {/* Left gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#161617] from-30% via-[#161617]/80 via-50% to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#161617] to-transparent" />
        {/* Top-left darkening */}
        <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-[#161617] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 pt-[120px] md:pt-[226px] pb-24">
        {/* Eyebrow */}
        <p
          className="text-[#E8E8EF] text-xs md:text-sm tracking-[2.8px] uppercase mb-6 font-medium"
          style={{ fontFamily: sfPro }}
        >
          Introducing Smart Pin
        </p>

        {/* Headline */}
        <h1
          className="text-[#E8E8EF] text-5xl md:text-[70px] leading-[1.1] mb-6 max-w-[560px] font-medium"
          style={{ fontFamily: sfPro }}
        >
          School Safety.{" "}
          <br />
          Reinvented.
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#858589] text-lg md:text-2xl leading-[1.33] mb-10 max-w-[405px] font-medium"
          style={{ fontFamily: sfPro }}
        >
          One Smart Pin for tracking, protection, and peace of mind.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            className="bg-[#E8E8EF] text-[#161617] px-6 h-12 rounded-full text-sm hover:bg-white transition-colors"
            style={{ fontFamily: dmSans }}
          >
            Book a Demo
          </button>
          <button
            className="text-white px-6 h-12 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
            style={{ fontFamily: dmSans }}
          >
            See How it Works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(90deg)" }}>
              <path d="M8 13.5V3M12 6.5L8 2.5L4 6.5" stroke="#E8E8EF" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-5 md:left-20 hidden md:flex items-center gap-2">
        <div className="border border-[#E8E8EF] rounded-xl flex items-center justify-center size-6">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2V10M3 7L6 10L9 7" stroke="#E8E8EF" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p
          className="text-[#E8E8EF] text-xs tracking-[2.8px] uppercase font-medium"
          style={{ fontFamily: sfPro }}
        >
          Scroll to explore
        </p>
      </div>

      {/* Decorative concentric ellipses (bottom-right) */}
      <div className="absolute bottom-0 right-[-100px] w-[600px] h-[400px] pointer-events-none opacity-30">
        <div className="absolute inset-0 rounded-full border border-[#262626]" style={{ transform: "scaleX(2.5)" }} />
        <div className="absolute inset-[15%] rounded-full border border-[#353535]" style={{ transform: "scaleX(2.5)" }} />
        <div className="absolute inset-[28%] rounded-full border border-[#3A3A3A]" style={{ transform: "scaleX(2.5)" }} />
        <div className="absolute inset-[40%] rounded-full border border-[#626262]" style={{ transform: "scaleX(2.5)" }} />
      </div>
    </section>
  );
}
