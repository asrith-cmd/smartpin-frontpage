import { useState } from "react";
import { useNavbarScrollBackground } from "@/hooks/useNavbarScrollBackground";
import { SmartPinLogoSmall } from "@/components/common/SmartPinLogo";
import { Button } from "@/components/common/Button";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Product", href: "#product" },
  { label: "Technology", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { navRef, background } = useNavbarScrollBackground();

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background }}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 h-[68px] md:h-[85px] flex items-center justify-between gap-8">
        {/* Logo */}
        <SmartPinLogoSmall />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-11">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#E8E8EF] text-sm leading-normal hover:text-white transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button variant="outline" className="w-[112px] py-[10px]">
            Book a Demo
          </Button>
          <Button variant="filled-blue" className="w-[112px] py-[10px]">
            Contact Us
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#E8E8EF] p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path d="M5 5L17 17M5 17L17 5" stroke="#E8E8EF" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="#E8E8EF" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="#E8E8EF" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="#E8E8EF" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#161617] border-t border-white/[0.06] px-5 py-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#E8E8EF] text-base py-1 border-b border-white/[0.06]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 py-3">
                Book a Demo
              </Button>
              <Button variant="filled-blue" className="flex-1 py-3">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
