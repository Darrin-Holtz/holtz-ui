import type { SVGProps } from "react";

/**
 * Standalone logomark — the rounded-square "H" badge.
 * Use anywhere you need just the icon (navbar, favicon fallback, etc.)
 */
export function LogoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      aria-label="HoltzDigitalUI"
      role="img"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="holtz-icon-grad"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7008e7" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="48" height="48" rx="10" fill="url(#holtz-icon-grad)" />

      {/* H — three white rounded bars */}
      <rect x="11" y="11" width="5" height="26" rx="2.5" fill="white" />
      <rect x="32" y="11" width="5" height="26" rx="2.5" fill="white" />
      <rect x="11" y="21.5" width="26" height="5" rx="2.5" fill="white" />
    </svg>
  );
}
