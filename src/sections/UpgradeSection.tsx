import schoolImg from "figma:asset/images/upgrade/school-cta.png";
import { sfPro } from "@/constants/fonts";
import { Button } from "@/components/common/Button";
import { ArrowIcon } from "@/components/common/ArrowIcon";
import { DecorativeWave } from "@/components/common/DecorativeWave";
import { useContactForm } from "@/providers/ContactFormProvider";

export function UpgradeSection() {
  const { openForm } = useContactForm();

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
        <h2
          className="relative text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium mb-6"
          style={{ fontFamily: sfPro }}
        >
          <DecorativeWave flip />
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
          <Button variant="filled-blue" className="px-6 h-12" onClick={() => openForm("demo")}>
            Book a Demo
          </Button>
          <Button variant="ghost" className="px-6 h-12" onClick={() => openForm("team")}>
            Contact Us
            <ArrowIcon />
          </Button>
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
