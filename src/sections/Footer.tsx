import { SmartPinLogoSmall } from "@/components/common/SmartPinLogo";
import { sfPro, dmSans } from "@/constants/fonts";

const footerLinks = {
  Product: ["Features", "Technology", "Security", "Pricing", "Integrations"],
  Company: ["About", "Careers", "Blog", "Press", "Partners"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Status"],
};

export function Footer() {
  return (
    <footer className="bg-[#161617] border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 md:mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <SmartPinLogoSmall />
            <p
              className="text-[#858589] text-sm leading-relaxed mt-5 max-w-[280px]"
              style={{ fontFamily: dmSans }}
            >
              Making schools safer, smarter, and more connected for every student, parent, and educator.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social icons */}
              {["twitter", "linkedin", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#858589] hover:border-white/40 hover:text-[#E8E8EF] transition-colors"
                  aria-label={social}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-[#E8E8EF] text-sm font-medium mb-5"
                style={{ fontFamily: sfPro }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#858589] text-sm hover:text-[#E8E8EF] transition-colors"
                      style={{ fontFamily: dmSans }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#858589] text-sm" style={{ fontFamily: dmSans }}>
            © 2026 Smart Pin. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#858589] text-sm hover:text-[#E8E8EF] transition-colors" style={{ fontFamily: dmSans }}>
              Privacy
            </a>
            <a href="#" className="text-[#858589] text-sm hover:text-[#E8E8EF] transition-colors" style={{ fontFamily: dmSans }}>
              Terms
            </a>
            <a href="#" className="text-[#858589] text-sm hover:text-[#E8E8EF] transition-colors" style={{ fontFamily: dmSans }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
