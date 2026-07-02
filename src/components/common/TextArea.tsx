import type { TextareaHTMLAttributes } from "react";
import { sfPro, dmSans } from "@/constants/fonts";
import { slugify } from "@/lib/slugify";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

/** Shared dark-theme textarea used across all contact forms. */
export function TextArea({ label, error, id, className = "", required, rows = 4, ...rest }: TextAreaProps) {
  const inputId = id ?? `field-${slugify(label)}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[#E8E8EF] text-sm font-medium" style={{ fontFamily: sfPro }}>
        {label}
        {required && <span className="text-[#054FD5]"> *</span>}
      </label>
      <textarea
        id={inputId}
        required={required}
        rows={rows}
        className={`bg-white/[0.04] border rounded-[12px] px-4 py-3 text-[#E8E8EF] text-sm placeholder:text-[#858589]/70 focus:outline-none focus:ring-2 focus:ring-[#054FD5] transition-colors resize-none ${
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
