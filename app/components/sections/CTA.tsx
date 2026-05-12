import type { DesignTokens } from "@/lib/tokens";

interface CTAProps {
  tokens: DesignTokens;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
}

export function CTA({
  tokens,
  heading = "Ready to build your own UI system?",
  subheading = "Generate, customize, and export production-ready UI in seconds.",
  ctaLabel = "Get Started",
}: CTAProps) {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6"
      style={{
        backgroundColor: tokens.semantic.cta.background,
        color: tokens.semantic.cta.text,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {heading}
        </h2>
        <p className="mb-8 opacity-80">
          {subheading}
        </p>
        <button
          className="px-6 py-3 font-medium hover:opacity-90 transition rounded-[var(--radius)]"
          style={{
            backgroundColor: tokens.semantic.cta.buttonBackground,
            color: tokens.semantic.cta.buttonText,
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
}
