import { sfPro, dmSans } from "@/constants/fonts";

const stats = [
  { value: "500+", label: "Schools Enrolled" },
  { value: "50K+", label: "Students Protected" },
  { value: "10M+", label: "Safe Check-ins" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

const schoolNames = [
  "Westfield Academy",
  "Oakwood School",
  "Lincoln Elementary",
  "Maple Ridge High",
  "Sunrise Academy",
  "Cedar Grove School",
];

export function TrustSection() {
  return (
    <section className="bg-[#161617] py-16 md:py-24 border-t border-b border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <p
          className="text-center text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-12"
          style={{ fontFamily: sfPro }}
        >
          Trusted by Schools Across the Country
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <p
                className="text-[#E8E8EF] text-4xl md:text-5xl font-medium mb-2"
                style={{ fontFamily: sfPro }}
              >
                {s.value}
              </p>
              <p className="text-[#858589] text-sm" style={{ fontFamily: dmSans }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* School name marquee */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-40">
          {schoolNames.map((name) => (
            <span
              key={name}
              className="text-[#E8E8EF] text-sm md:text-base font-medium whitespace-nowrap"
              style={{ fontFamily: dmSans }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
