import type { SelectHTMLAttributes } from "react";
import { sfPro, dmSans } from "@/constants/fonts";
import { slugify } from "@/lib/slugify";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

/** Shared dark-theme select used across all contact forms. */
export function Select({
  label,
  error,
  options,
  placeholder = "Select an option",
  id,
  className = "",
  required,
  ...rest
}: SelectProps) {
  const inputId = id ?? `field-${slugify(label)}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[#E8E8EF] text-sm font-medium" style={{ fontFamily: sfPro }}>
        {label}
        {required && <span className="text-[#054FD5]"> *</span>}
      </label>
      <select
        id={inputId}
        required={required}
        className={`bg-white/[0.04] border rounded-[12px] px-4 py-3 text-[#E8E8EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#054FD5] transition-colors ${
          error ? "border-red-500" : "border-white/[0.08]"
        } ${className}`}
        style={{ fontFamily: dmSans }}
        {...rest}
      >
        <option value="" disabled className="bg-[#161617] text-[#858589]">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#161617] text-[#E8E8EF]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-xs" style={{ fontFamily: dmSans }}>
          {error}
        </p>
      )}
    </div>
  );
}
