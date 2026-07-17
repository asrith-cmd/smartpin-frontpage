import { SmartPinLogoBig } from "@/components/common/SmartPinLogo";
import { sfPro } from "@/constants/fonts";
import { useContactForm } from "@/providers/ContactFormProvider";
import type { ContactFormType } from "@/types/forms";

const bannerLinks: { label: string; type: ContactFormType }[] = [
  { label: "Schedule a Product Demonstration", type: "demo" },
  { label: "Request a Pilot Program", type: "pilot" },
  { label: "Speak With Our Team", type: "team" },
];

export function BlueBanner() {
  const { openForm } = useContactForm();

  return (
    <section className="bg-[#054FD5] py-12 md:py-14 lg:py-16 px-5 md:px-10 lg:pl-20 lg:pr-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Top row: logo + tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-end lg:items-center justify-between gap-8 mb-14 md:mb-16 lg:mb-20">
          <SmartPinLogoBig fill="#E8E8EF" />
          <p
            className="text-[#E8E8EF] text-xl md:text-2xl font-medium leading-[1.33] max-w-[443px] md:text-right"
            style={{ fontFamily: sfPro }}
          >
            Smart Pin ID – Making Every school Safer, Smarter, and Connected.
          </p>
        </div>

        {/* Bottom row: quick action links */}
        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row items-start md:items-center justify-between gap-5 md:gap-6 xl:gap-0">
          {bannerLinks.map((link) => (
            <button
              key={link.type}
              onClick={() => openForm(link.type)}
              className="text-[#E8E8EF] text-base md:text-lg hover:text-white transition-colors text-left md:text-center"
              style={{ fontFamily: sfPro }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
