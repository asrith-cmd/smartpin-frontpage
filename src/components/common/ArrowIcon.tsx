/** The rotated arrow icon used on "See How it Works" / "Contact Us" CTA buttons. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ transform: "rotate(90deg)" }}
      className={className}
    >
      <path
        d="M8 13.5V3M12 6.5L8 2.5L4 6.5"
        stroke="#E8E8EF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
