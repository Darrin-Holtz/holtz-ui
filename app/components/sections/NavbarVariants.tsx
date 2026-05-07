import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";
import { navbarLinks } from "../NavbarLinks";

interface NavbarProps {
  tokens: DesignTokens;
  brandName?: string;
}

/** Centered — logo top-left, links centered, no auth buttons */
export function NavbarCentered({ tokens, brandName = "HoltzUI" }: NavbarProps) {
  const classes = tokensToClasses(tokens);
  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {brandName.slice(0, -2)}
          <span className="text-primary">{brandName.slice(-2)}</span>
        </h1>
        <div className="flex gap-6">
          {navbarLinks.map((item) => (
            <span
              key={item.id}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}

/** Minimal — brand left, single CTA right, no nav links */
export function NavbarMinimal({ tokens, brandName = "HoltzUI" }: NavbarProps) {
  const classes = tokensToClasses(tokens);
  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          {brandName.slice(0, -2)}
          <span className="text-primary">{brandName.slice(-2)}</span>
        </h1>
        <button
          className={`${classes.buttonPrimary} px-5 py-2 rounded-[var(--radius)] text-sm font-medium`}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
