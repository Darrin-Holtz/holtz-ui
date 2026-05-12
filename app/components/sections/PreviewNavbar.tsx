import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";
import { navbarLinks } from "../NavbarLinks";

interface PreviewNavbarProps {
  tokens: DesignTokens;
  brandName?: string;
}

export function PreviewNavbar({ tokens, brandName = "HoltzDigitalUI" }: PreviewNavbarProps) {
  const classes = tokensToClasses(tokens);

  return (
    <nav
      className={`${classes.navbarSection} w-full`}
      style={{ backgroundColor: tokens.semantic.navbar.background, color: tokens.semantic.navbar.text, borderColor: tokens.semantic.navbar.border }}
    >
      <div className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">

        {/* Brand */}
        <div className="md:col-span-3">
          <h1 className="text-2xl font-semibold">
            {brandName.slice(0, -2)}
            <span className="text-primary">{brandName.slice(-2)}</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
          {navbarLinks.map((item) => (
            <span
              key={item.id}
              className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium"
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
          <button
            className={`${classes.buttonPrimary} px-4 py-2 rounded-[var(--radius)] text-sm font-medium`}
          >
            Login
          </button>
          <button
            className={`${classes.buttonSecondary} px-4 py-2 rounded-[var(--radius)] text-sm font-medium`}
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
