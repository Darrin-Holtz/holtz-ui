import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

interface FeaturesProps {
  tokens: DesignTokens;
}

export function Features({ tokens }: FeaturesProps) {
  const classes = tokensToClasses(tokens);

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: tokens.semantic.features.background, color: tokens.semantic.features.text }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold">
          Everything you need to build faster
        </h2>
        <p className="text-muted-foreground mt-4">
          Powerful features to help you ship quickly
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className={`${classes.card} p-6 rounded-[var(--radius)]`}>
          <h3 className="font-semibold mb-2">Fast Setup</h3>
          <p className="text-muted-foreground text-sm">
            Get started in minutes with prebuilt UI blocks tailored to your brand.
          </p>
        </div>

        <div className={`${classes.card} p-6 rounded-[var(--radius)]`}>
          <h3 className="font-semibold mb-2">Custom Branding</h3>
          <p className="text-muted-foreground text-sm">
            Apply your brand colors, fonts, and radius across every component instantly.
          </p>
        </div>

        <div className={`${classes.card} p-6 rounded-[var(--radius)]`}>
          <h3 className="font-semibold mb-2">Export Ready</h3>
          <p className="text-muted-foreground text-sm">
            Copy clean Tailwind code and drop it straight into your project.
          </p>
        </div>

      </div>
    </section>
  );
}
