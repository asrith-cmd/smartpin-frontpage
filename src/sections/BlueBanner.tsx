import { SmartPinLogoBig } from "@/components/common/SmartPinLogo";
import { sfPro } from "@/constants/fonts";

const bannerLinks = [
  "Schedule a Product Demonstration",
  "Request a Pilot Program",
  "Speak With Our Team",
];

export function BlueBanner() {
  return (
    <section className="bg-[#054FD5] py-12 md:py-16 px-5 md:pl-20 md:pr-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Top row: logo + tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 md:mb-20">
          <SmartPinLogoBig fill="#E8E8EF" />
          <p
            className="text-[#E8E8EF] text-xl md:text-2xl font-medium leading-[1.33] max-w-[443px] md:text-right"
            style={{ fontFamily: sfPro }}
          >
            Smart Pin ID – Making Every school Safer, Smarter, and Connected.
          </p>
        </div>

        {/* Bottom row: quick action links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-0">
          {bannerLinks.map((label, i) => (
            <button
              key={i}
              className="text-[#E8E8EF] text-base md:text-lg hover:text-white transition-colors text-left md:text-center"
              style={{ fontFamily: sfPro }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
