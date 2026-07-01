import schoolImg from "figma:asset/d23cc46f032a134e33a8098b0c7704de44785f28.png";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

export function UpgradeSection() {
  return (
    <section className="relative bg-[#161617] md:pt-25 overflow-hidden">
      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "linear-gradient(180deg, rgba(0, 35, 98, 0) 0%, rgba(0, 35, 98, 0.1) 66.09%)" }}
      />

      {/* Radial blue glow — top-left origin matching Figma */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 15% 0%, rgba(5,79,213,0.55) 0%, rgba(4,53,149,0.50) 30%, rgba(2,27,84,0.55) 55%, transparent 80%)",
        }}
      />

      {/* Text content — centered */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 text-center">
        <p
          className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-6"
          style={{ fontFamily: sfPro }}
        >
          SMARTER SCHOOLS START HERE
        </p>
        <div className="relative inline-block">
        </div>
        <h2
          className="relative text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium mb-6"
          style={{ fontFamily: sfPro }}
        >
          {/* SVG wave background */}
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
                d="M1379.5 82.9372C1344.33 87.7461 1284.06 108.361 1195.3 121.151C1106.55 133.941 1045.63 142.913 976.762 143.94C907.891 144.967 834.549 137.872 767.065 117.813C699.582 97.7535 602.38 62.4173 534.997 42.5805C467.614 22.7437 433.541 19.4991 401.481 18.2022C369.42 16.9052 321.87 16.9052 277.51 22.6164C233.14 28.3275 193.41 39.7499 156.38 56.3064C119.35 72.8629 86.24 94.2075 61.95 111.54C37.65 128.873 23.19 141.547 17.5 144.5"
                stroke="url(#v2grad-reversed)"
                strokeLinecap="round"
                strokeOpacity="0.5"
                strokeWidth="35"
              />
              <defs>
                <linearGradient id="v2grad-reversed" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#161617" />
                  <stop offset="50%" stopColor="#054FD5" />
                  <stop offset="100%" stopColor="#161617" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="relative z-10">Upgrade Your School Into a Smart School</span>
        </h2>
        <p
          className="text-[#858589] text-lg md:text-2xl font-medium leading-[1.33] mb-10 max-w-[700px] mx-auto"
          style={{ fontFamily: sfPro }}
        >
          Empower parents, protect students, and automate attendance with Smart Pin ID.
        </p>


        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            className="bg-[#054FD5] text-white px-6 h-12 rounded-full text-sm hover:bg-[#0547BE] transition-colors"
            style={{ fontFamily: dmSans }}
          >
            Book a Demo
          </button>
          <button
            className="text-white px-6 h-12 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
            style={{ fontFamily: dmSans }}
          >
            Contact Us
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ transform: "rotate(90deg)" }}
            >
              <path
                d="M8 13.5V3M12 6.5L8 2.5L4 6.5"
                stroke="#E8E8EF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* School image */}
      <div className="relative z-10 mt-12 md:mt-20 flex justify-center">
        {/* Ellipse rings */}
       <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[1030px] h-[375px] pointer-events-none opacity-70 animate-pulse">
          <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 1030 375">
            <ellipse cx="515" cy="187.5" rx="514.75" ry="187.25" stroke="#262626" strokeWidth="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 515 187.5"
                to="360 515 187.5"
                dur="18s"
                repeatCount="indefinite"
              />
            </ellipse>
            <ellipse cx="515" cy="187.5" rx="397" ry="144.14" stroke="#353535" strokeWidth="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 515 187.5"
                to="0 515 187.5"
                dur="14s"
                repeatCount="indefinite"
              />
            </ellipse>
            <ellipse cx="515" cy="187.5" rx="278.65" ry="101.03" stroke="#3A3A3A" strokeWidth="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 515 187.5"
                to="360 515 187.5"
                dur="10s"
                repeatCount="indefinite"
              />
            </ellipse>
            <ellipse cx="515" cy="187.5" rx="197.35" ry="72" stroke="#626262" strokeWidth="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 515 187.5"
                to="0 515 187.5"
                dur="7s"
                repeatCount="indefinite"
              />
            </ellipse>
          </svg>
        </div>
        <img
          src={schoolImg}
          alt="Students at school with Smart Pin"
          className="h-[220px] md:h-[360px] object-contain rounded-[16px]"
          style={{ backgroundImage: `url(${schoolImg})`, backgroundSize: "cover", position: "relative", zIndex: 10 }}
        />
      </div>
    </section>
  );
}

