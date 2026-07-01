import type { ButtonHTMLAttributes } from "react";
import { dmSans } from "@/constants/fonts";

type ButtonVariant = "filled-blue" | "filled-white" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  "filled-blue": "bg-[#054FD5] text-white hover:bg-[#0547BE]",
  "filled-white": "bg-[#E8E8EF] text-[#161617] hover:bg-white",
  outline: "border border-[#E8E8EF] text-white hover:bg-white/10",
  ghost: "text-white hover:bg-white/10",
};

/**
 * Shared pill CTA button. Consolidates 8 near-identical button
 * implementations previously duplicated across Navbar, HeroSection, and
 * UpgradeSection into the 4 visual variants they actually use.
 *
 * Only owns shape/color — sizing (`px-6 h-12`, `w-[112px] py-[10px]`,
 * `flex-1 py-3`, etc.) varies per call site and is supplied via `className`.
 */
export function Button({
  variant = "filled-blue",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`rounded-full text-sm transition-colors flex items-center justify-center gap-2 ${VARIANT_CLASSES[variant]} ${className}`}
      style={{ fontFamily: dmSans }}
      {...rest}
    >
      {children}
    </button>
  );
}
