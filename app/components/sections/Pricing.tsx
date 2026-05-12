import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

export function Pricing({ tokens }: { tokens: DesignTokens }) {
  const classes = tokensToClasses(tokens);

  return (
    <section
      className={`${classes.pricingSection} py-16 md:py-24 px-4 md:px-6`}
      style={{ backgroundColor: tokens.semantic.pricing.background, color: tokens.semantic.pricing.text }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">Simple, transparent pricing</h2>
        <p className="text-muted-foreground mt-4">
          Choose the plan that fits your needs
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className={`${classes.card} p-6 rounded-[var(--radius)]`}>
          <h3 className="text-xl font-semibold mb-2">Starter</h3>
          <p className="text-muted-foreground mb-4">$9/mo</p>
          <button className={`${classes.buttonSecondary} w-full py-2 rounded-[var(--radius)]`}>
            Choose Plan
          </button>
        </div>

        {/* Card 2 (highlighted) */}
        <div className={`${classes.card} p-6 rounded-[var(--radius)] border-2`}>
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="text-muted-foreground mb-4">$29/mo</p>
          <button className={`${classes.buttonPrimary} w-full py-2 rounded-[var(--radius)]`}>
            Get Started
          </button>
        </div>

        {/* Card 3 */}
        <div className={`${classes.card} p-6 rounded-[var(--radius)]`}>
          <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
          <p className="text-muted-foreground mb-4">Custom</p>
          <button className={`${classes.buttonSecondary} w-full py-2 rounded-[var(--radius)]`}>
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
}