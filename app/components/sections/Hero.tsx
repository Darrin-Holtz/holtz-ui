import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

interface HeroProps {
  tokens: DesignTokens;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  brandName?: string;
}

export function Hero({
  tokens,
  headline,
  subheadline = "A complete UI system generated from your design tokens.",
  ctaLabel = "Get Started",
  brandName = "your brand",
}: HeroProps) {
  const classes = tokensToClasses(tokens);
  const resolvedHeadline = headline ?? `Build faster with ${brandName}`;

  return (
    <section
      className={`${classes.heroSection} w-full py-24 px-6`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-y-6">
        <h1
          className="text-5xl font-bold leading-tight tracking-tight"
        >
          {resolvedHeadline}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {subheadline}
        </p>
        <button
          className={`${classes.buttonPrimary} px-6 py-3 rounded-[var(--radius)] text-base font-medium`}
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
}
