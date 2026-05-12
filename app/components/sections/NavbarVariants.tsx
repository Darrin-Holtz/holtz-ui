"use client";
import { useState } from "react";
import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";
import { navbarLinks } from "../NavbarLinks";

interface NavbarProps {
  tokens: DesignTokens;
  brandName?: string;
}

/** Centered — logo + links centered on desktop, hamburger on mobile */
export function NavbarCentered({ tokens, brandName = "HoltzDigitalUI" }: NavbarProps) {
  const classes = tokensToClasses(tokens);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Desktop: stacked center */}
        <div className="hidden md:flex flex-col items-center py-5 gap-4">
          <h1 className="text-2xl font-semibold">
            {brandName.slice(0, -2)}
            <span className="text-primary">{brandName.slice(-2)}</span>
          </h1>
          <div className="flex gap-6">
            {navbarLinks.map((item) => (
              <span key={item.id} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile: brand + hamburger */}
        <div className="flex md:hidden items-center py-4">
          <h1 className="text-xl font-semibold flex-1">
            {brandName.slice(0, -2)}
            <span className="text-primary">{brandName.slice(-2)}</span>
          </h1>
          <button
            className="p-2 rounded-md hover:bg-muted transition-colors"
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
              <span key={item.id} className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted text-sm font-medium block">
                {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/** Minimal — brand left, single CTA right, no nav links */
export function NavbarMinimal({ tokens, brandName = "HoltzDigitalUI" }: NavbarProps) {
  const classes = tokensToClasses(tokens);
  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          {brandName.slice(0, -2)}
          <span className="text-primary">{brandName.slice(-2)}</span>
        </h1>
        <button
          className={`${classes.buttonPrimary} px-4 md:px-5 py-2 rounded-[var(--radius)] text-sm font-medium`}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
