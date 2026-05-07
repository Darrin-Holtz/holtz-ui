// NOTE:
// tokensToVars() is used for live preview via inline styles.
// Exported UI should convert tokens into static Tailwind classes instead.

export type ColorScale = {
  DEFAULT: string;
  foreground: string;
};

export type DesignTokens = {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
    destructive: ColorScale;
    background: string;
    foreground: string;
    muted: ColorScale;
    card: ColorScale;
    border: string;
    input: string;
    ring: string;
  };
  typography: {
    fontSans: string;
    fontMono: string;
    baseFontSize: string;
    lineHeight: string;
  };
  radius: {
    base: string;
  };
  spacing: {
    base: string;
  };
  semantic: {
    hero: {
      background: string;
      text: string;
      button: string;
    };
    pricing: {
      background: string;
      text: string;
      highlight: string;
    };
    navbar: {
      background: string;
      text: string;
      border: string;
    };
    features: {
      background: string;
      text: string;
    };
    testimonials: {
      background: string;
      text: string;
    };
    cta: {
      background: string;
      text: string;
      buttonBackground: string;
      buttonText: string;
    };
  };
};

export const defaultTokens: DesignTokens = {
  colors: {
    primary:     { DEFAULT: "oklch(0.491 0.27 292.581)",  foreground: "oklch(0.969 0.016 293.756)" },
    secondary:   { DEFAULT: "oklch(0.967 0.001 286.375)", foreground: "oklch(0.21 0.006 285.885)" },
    accent:      { DEFAULT: "oklch(0.97 0 0)",            foreground: "oklch(0.205 0 0)" },
    destructive: { DEFAULT: "oklch(0.577 0.245 27.325)",  foreground: "oklch(1 0 0)" },
    background:  "oklch(1 0 0)",
    foreground:  "oklch(0.145 0 0)",
    muted:       { DEFAULT: "oklch(0.97 0 0)",            foreground: "oklch(0.556 0 0)" },
    card:        { DEFAULT: "oklch(1 0 0)",               foreground: "oklch(0.145 0 0)" },
    border:      "oklch(0.922 0 0)",
    input:       "oklch(0.922 0 0)",
    ring:        "oklch(0.708 0 0)",
  },
  typography: {
    fontSans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontMono: "var(--font-geist-mono), ui-monospace, monospace",
    baseFontSize: "1rem",
    lineHeight: "1.5",
  },
  radius: {
    base: "0.625rem",
  },
  spacing: {
    base: "1rem",
  },
  semantic: {
    hero: {
      background: "oklch(1 0 0)",
      text:       "oklch(0.145 0 0)",
      button:     "oklch(0.491 0.27 292.581)",
    },
    pricing: {
      background: "oklch(0.97 0 0)",
      text:       "oklch(0.145 0 0)",
      highlight:  "oklch(0.491 0.27 292.581)",
    },
    navbar: {
      background: "oklch(1 0 0)",
      text:       "oklch(0.145 0 0)",
      border:     "oklch(0.922 0 0)",
    },
    features: {
      background: "oklch(0.97 0 0)",
      text:       "oklch(0.145 0 0)",
    },
    testimonials: {
      background: "oklch(1 0 0)",
      text:       "oklch(0.145 0 0)",
    },
    cta: {
      background:       "oklch(0.491 0.27 292.581)",
      text:             "oklch(0.969 0.016 293.756)",
      buttonBackground: "oklch(1 0 0)",
      buttonText:       "oklch(0.145 0 0)",
    },
  },
};

export function tokensToVars(tokens: DesignTokens): Record<string, string> {
  const { colors: c, typography: t, radius: r, spacing: s, semantic: sem } = tokens;
  return {
    "--primary":                  c.primary.DEFAULT,
    "--primary-foreground":       c.primary.foreground,
    "--secondary":                c.secondary.DEFAULT,
    "--secondary-foreground":     c.secondary.foreground,
    "--accent":                   c.accent.DEFAULT,
    "--accent-foreground":        c.accent.foreground,
    "--destructive":              c.destructive.DEFAULT,
    "--destructive-foreground":   c.destructive.foreground,
    "--background":               c.background,
    "--foreground":               c.foreground,
    "--muted":                    c.muted.DEFAULT,
    "--muted-foreground":         c.muted.foreground,
    "--card":                     c.card.DEFAULT,
    "--card-foreground":          c.card.foreground,
    "--border":                   c.border,
    "--input":                    c.input,
    "--ring":                     c.ring,
    "--font-sans":                t.fontSans,
    "--font-mono":                t.fontMono,
    "--font-size-base":           t.baseFontSize,
    "--line-height-base":         t.lineHeight,
    "--radius":                   r.base,
    "--spacing-base":             s.base,
    "--hero-background":          sem.hero.background,
    "--hero-text":                sem.hero.text,
    "--hero-button":              sem.hero.button,
    "--pricing-background":       sem.pricing.background,
    "--pricing-text":             sem.pricing.text,
    "--pricing-highlight":        sem.pricing.highlight,
    "--navbar-background":        sem.navbar.background,
    "--navbar-text":              sem.navbar.text,
    "--navbar-border":            sem.navbar.border,
    "--features-background":      sem.features.background,
    "--features-text":            sem.features.text,
    "--testimonials-background":  sem.testimonials.background,
    "--testimonials-text":        sem.testimonials.text,
    "--cta-background":           sem.cta.background,
    "--cta-text":                 sem.cta.text,
    "--cta-button-background":    sem.cta.buttonBackground,
    "--cta-button-text":          sem.cta.buttonText,
  };
}

/**
 * Normalizes an oklch string into the space-separated, unitless form browsers require.
 * Accepts both:
 *   oklch(37.67%, 0.15, 29.23)   → oklch(0.3767 0.15 29.23)
 *   oklch(0.3767 0.15 29.23)     → unchanged
 * Returns null if the string can't be parsed.
 */
export function parseOklch(raw: string): string | null {
  const trimmed = raw.trim();
  // Extract the inner content of oklch(...)
  const match = trimmed.match(/^oklch\(\s*([^)]+)\s*\)$/i);
  if (!match) return null;

  // Split on commas or whitespace
  const parts = match[1].split(/[\s,]+/).filter(Boolean);
  if (parts.length !== 3) return null;

  const [lRaw, c, h] = parts;

  // Normalize L: percentage → decimal
  let l: number;
  if (lRaw.endsWith("%")) {
    l = parseFloat(lRaw) / 100;
  } else {
    l = parseFloat(lRaw);
  }

  if (isNaN(l) || isNaN(parseFloat(c)) || isNaN(parseFloat(h))) return null;

  // Clamp L to [0, 1]
  l = Math.min(1, Math.max(0, l));

  return `oklch(${+l.toFixed(4)} ${+parseFloat(c).toFixed(4)} ${+parseFloat(h).toFixed(4)})`;
}

export function tokensToClasses(_tokens: DesignTokens) {
  // NOTE: These are static Tailwind class mappings for export.
  // They reference the CSS vars that tokensToVars() sets on the preview wrapper.
  return {
    buttonPrimary:   "bg-primary text-primary-foreground hover:opacity-90 transition-opacity",
    buttonSecondary: "bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity",
    card:            "bg-card text-card-foreground border border-border",
    input:           "bg-background border border-input text-foreground",
    mutedText:       "text-muted-foreground",
    heroSection:     "bg-[var(--hero-background)] text-[var(--hero-text)]",
    pricingSection:  "bg-[var(--pricing-background)] text-[var(--pricing-text)]",
    navbarSection:   "bg-[var(--navbar-background)] text-[var(--navbar-text)] border-b border-[var(--navbar-border)]",
  };
}
