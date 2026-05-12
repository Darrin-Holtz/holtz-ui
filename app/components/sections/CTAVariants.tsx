import type { DesignTokens } from "@/lib/tokens";

interface CTAVariantProps {
  tokens: DesignTokens;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
}

/** Split layout — text left, action card right */
export function CTASplit({
  tokens,
  heading = "Ready to build your own UI system?",
  subheading = "Generate, customize, and export production-ready UI in seconds. No design experience required.",
  ctaLabel = "Get Started Free",
}: CTAVariantProps) {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6"
      style={{
        backgroundColor: tokens.semantic.cta.background,
        color: tokens.semantic.cta.text,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {heading}
          </h2>
          <p className="opacity-80 max-w-md leading-relaxed">
            {subheading}
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start md:items-end flex-shrink-0 w-full md:w-auto">
          <button
            className="px-8 py-3 font-medium hover:opacity-90 transition rounded-[var(--radius)]"
            style={{
              backgroundColor: tokens.semantic.cta.buttonBackground,
              color: tokens.semantic.cta.buttonText,
            }}
          >
            {ctaLabel}
          </button>
          <span className="text-sm opacity-60">No credit card required</span>
        </div>
      </div>
    </section>
  );
}

/** Minimal — thin banner strip with inline CTA */
export function CTABanner({
  tokens,
  heading = "Start building your brand system today",
  ctaLabel = "Get Started",
}: CTAVariantProps) {
  return (
    <section
      className="py-6 px-4 md:px-6"
      style={{
        backgroundColor: tokens.semantic.cta.background,
        color: tokens.semantic.cta.text,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-medium text-lg opacity-90">
          {heading} —&nbsp;
          <span className="opacity-60 font-normal text-base">free forever for solo builders.</span>
        </p>
        <button
          className="flex-shrink-0 px-6 py-2.5 font-medium text-sm hover:opacity-90 transition rounded-[var(--radius)]"
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
