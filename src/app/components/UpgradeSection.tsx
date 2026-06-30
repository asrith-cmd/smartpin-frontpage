import schoolImg from "figma:asset/d23cc46f032a134e33a8098b0c7704de44785f28.png";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

export function UpgradeSection() {
  return (
    <section className="relative bg-[#161617] py-20 md:py-32 overflow-hidden">
      {/* Radial blue glow — top-left origin matching Figma */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 15% 0%, rgba(5,79,213,0.55) 0%, rgba(4,53,149,0.3) 30%, rgba(2,27,84,0.12) 55%, transparent 80%)",
        }}
      />

      {/* Decorative concentric ellipses */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[1030px] h-[375px] pointer-events-none opacity-50">
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 1030 375">
          <ellipse cx="515" cy="187.5" rx="514.75" ry="187.25" stroke="#262626" strokeWidth="0.5" />
          <ellipse cx="515" cy="187.5" rx="397" ry="144.14" stroke="#353535" strokeWidth="0.5" />
          <ellipse cx="515" cy="187.5" rx="278.65" ry="101.03" stroke="#3A3A3A" strokeWidth="0.5" />
          <ellipse cx="515" cy="187.5" rx="197.35" ry="72" stroke="#626262" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Text content — centered */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 text-center">
        <p
          className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-6"
          style={{ fontFamily: sfPro }}
        >
          SMARTER SCHOOLS START HERE
        </p>
        <h2
          className="text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium mb-6"
          style={{ fontFamily: sfPro }}
        >
          Upgrade Your School Into a Smart School
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
      <div className="relative z-10 mt-12 md:mt-20 flex justify-center px-5">
        <img
          src={schoolImg}
          alt="Students at school with Smart Pin"
          className="h-[220px] md:h-[360px] object-contain rounded-[16px]"
          style={{ filter: "drop-shadow(0 24px 64px rgba(0,0,0,0.6))" }}
        />
      </div>
    </section>
  );
}
