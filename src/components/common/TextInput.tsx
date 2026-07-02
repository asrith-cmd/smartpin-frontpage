import type { InputHTMLAttributes } from "react";
import { sfPro, dmSans } from "@/constants/fonts";
import { slugify } from "@/lib/slugify";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Shared dark-theme text input used across all contact forms. */
export function TextInput({ label, error, id, className = "", required, ...rest }: TextInputProps) {
  const inputId = id ?? `field-${slugify(label)}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[#E8E8EF] text-sm font-medium" style={{ fontFamily: sfPro }}>
        {label}
        {required && <span className="text-[#054FD5]"> *</span>}
      </label>
      <input
        id={inputId}
        required={required}
        className={`bg-white/[0.04] border rounded-[12px] px-4 py-3 text-[#E8E8EF] text-sm placeholder:text-[#858589]/70 focus:outline-none focus:ring-2 focus:ring-[#054FD5] transition-colors ${
          error ? "border-red-500" : "border-white/[0.08]"
        } ${className}`}
        style={{ fontFamily: dmSans }}
        {...rest}
      />
      {error && (
        <p className="text-red-400 text-xs" style={{ fontFamily: dmSans }}>
          {error}
        </p>
      )}
    </div>
  );
}
