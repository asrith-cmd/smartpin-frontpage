import device2Img from "figma:asset/e06d63abbaf41faa9770fc2f7c5a69b67e850581.png";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

const featureCards = [
  {
    title: "Front Enclosure",
    desc: "Designed to be lightweight, durable, and comfortable enough to wear every day without compromise.",
    sub: "Aerospace-grade polymer shell rated IP67 for water and dust resistance.",
  },
  {
    title: "BLE Connectivity",
    desc: "Ultra-low-power Bluetooth communicates with school readers up to 30 meters away.",
    sub: "No charging required for up to 2 years of daily operation.",
  },
  {
    title: "Secure Chip",
    desc: "Military-grade encryption ensures each Smart Pin ID is tamper-proof and unique.",
    sub: "Zero personal data stored on device — all processing is server-side.",
  },
  {
    title: "Geo-Precision",
    desc: "Pinpoint arrival and departure with lane-level accuracy inside school boundaries.",
    sub: "Custom safe-zone radius configurable per campus.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#161617] py-20 md:py-32 overflow-hidden">
      {/* Decorative glowing line (right side) */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-30%",
          top: "0%",
          width: "80%",
          height: "100%",
          background:
            "linear-gradient(to right, #161617, rgba(5,79,213,0.35), #161617)",
          transform: "rotate(15deg)",
          filter: "blur(50px)",
          opacity: 0.5,
        }}
      />

      {/* Subtle blue top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,35,98,0.12), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-6"
            style={{ fontFamily: sfPro }}
          >
            Engineered with purpose
          </p>
          <h2
            className="text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium"
            style={{ fontFamily: sfPro }}
          >
            Precision.
            <br />
            Inside and out.
          </h2>
        </div>

        {/* Two-column layout: device image + feature details */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Device image */}
          <div className="shrink-0 flex justify-center">
            <img
              src={device2Img}
              alt="Smart Pin devices arranged"
              className="h-[280px] md:h-[440px] object-contain"
              style={{ filter: "drop-shadow(0 16px 48px rgba(5,79,213,0.2))" }}
            />
          </div>

          {/* Right: detail + cards */}
          <div className="flex-1 w-full">
            {/* Detail point with line */}
            <div className="flex gap-6 mb-10 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-[6px] h-[6px] rounded-full bg-[#E8E8EF] mt-1" />
                <div
                  className="w-px flex-1 mt-2 min-h-[60px]"
                  style={{ background: "linear-gradient(to bottom, #E8E8EF, transparent)" }}
                />
              </div>
              <div>
                <h3
                  className="text-[#E8E8EF] text-xl font-normal mb-2"
                  style={{ fontFamily: sfPro }}
                >
                  Front Enclosure
                </h3>
                <p
                  className="text-[#858589] text-lg leading-relaxed max-w-[340px]"
                  style={{ fontFamily: dmSans }}
                >
                  Designed to be lightweight, durable, and comfortable enough to wear every day without compromise.
                </p>
              </div>
            </div>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featureCards.map((f, i) => (
                <div
                  key={i}
                  className="p-5 md:p-6 rounded-[16px] border border-white/[0.08] flex flex-col gap-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <h4
                    className="text-[#E8E8EF] text-base font-medium"
                    style={{ fontFamily: sfPro }}
                  >
                    {f.title}
                  </h4>
                  <p
                    className="text-[#858589] text-sm leading-relaxed"
                    style={{ fontFamily: dmSans }}
                  >
                    {f.desc}
                  </p>
                  <p
                    className="text-[#858589]/60 text-xs leading-relaxed"
                    style={{ fontFamily: dmSans }}
                  >
                    {f.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
