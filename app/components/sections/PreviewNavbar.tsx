"use client";
import { useState } from "react";
import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";
import { navbarLinks } from "../NavbarLinks";

interface PreviewNavbarProps {
  tokens: DesignTokens;
  brandName?: string;
}

export function PreviewNavbar({ tokens, brandName = "HoltzDigitalUI" }: PreviewNavbarProps) {
  const classes = tokensToClasses(tokens);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Main row */}
        <div className="flex items-center py-4 md:py-7">

          {/* Brand */}
          <h1 className="text-xl md:text-2xl font-semibold flex-1">
            {brandName.slice(0, -2)}
            <span className="text-primary">{brandName.slice(-2)}</span>
          </h1>

          {/* Desktop nav links */}
          <div className="hidden md:flex justify-center items-center gap-x-2 flex-1">
            {navbarLinks.map((item) => (
              <span
                key={item.id}
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium"
              >
                {item.name}
              </span>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-x-2">
            <button className={`${classes.buttonPrimary} px-4 py-2 rounded-[var(--radius)] text-sm font-medium`}>
              Login
            </button>
            <button className={`${classes.buttonSecondary} px-4 py-2 rounded-[var(--radius)] text-sm font-medium`}>
              Register
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden ml-2 p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t pt-3" style={{ borderColor: tokens.semantic.navbar.border }}>
            {navbarLinks.map((item) => (
              <span
                key={item.id}
                className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted text-sm font-medium block"
              >
                {item.name}
              </span>
            ))}
            <div className="flex gap-2 pt-3">
              <button className={`${classes.buttonPrimary} flex-1 py-2 rounded-[var(--radius)] text-sm font-medium`}>
                Login
              </button>
              <button className={`${classes.buttonSecondary} flex-1 py-2 rounded-[var(--radius)] text-sm font-medium`}>
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
