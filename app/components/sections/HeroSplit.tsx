import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

interface HeroSplitProps {
  tokens: DesignTokens;
  brandName?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
}

export function HeroSplit({
  tokens,
  brandName = "your brand",
  headline,
  subheadline = "Generate full UI systems instantly.",
  ctaLabel = "Get Started",
}: HeroSplitProps) {
  const classes = tokensToClasses(tokens);
  const resolvedHeadline = headline ?? `Build faster with ${brandName}`;

  return (
    <section
      className={`${classes.heroSection} py-24 px-6`}
      style={{ backgroundColor: tokens.semantic.hero.background, color: tokens.semantic.hero.text }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">
            {resolvedHeadline}
          </h1>
          <p className="text-xl mb-8" style={{ opacity: 0.7 }}>
            {subheadline}
          </p>
          <button
            className={`${classes.buttonPrimary} px-6 py-3 rounded-[var(--radius)] text-base font-medium`}
          >
            {ctaLabel}
          </button>
        </div>

        {/* Right — placeholder image block */}
        <div className="w-full h-80 bg-muted rounded-[var(--radius)]" />
      </div>
    </section>
  );
}
