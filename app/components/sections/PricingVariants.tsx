import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

interface PricingProps {
  tokens: DesignTokens;
}

const plans = [
  { name: "Starter",    price: "$9",    period: "/mo", desc: "Perfect for side projects",  cta: "Choose Plan",  primary: false },
  { name: "Pro",        price: "$29",   period: "/mo", desc: "For growing teams",           cta: "Get Started",  primary: true  },
  { name: "Enterprise", price: "Custom", period: "",   desc: "Unlimited scale",             cta: "Contact Us",   primary: false },
];

/** Compact — horizontal stacked rows instead of cards */
export function PricingCompact({ tokens }: PricingProps) {
  const classes = tokensToClasses(tokens);
  return (
    <section
      className={`${classes.pricingSection} py-24 px-6`}
      style={{ backgroundColor: tokens.semantic.pricing.background, color: tokens.semantic.pricing.text }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4" style={{ opacity: 0.7 }}>Choose the plan that fits your needs</p>
        </div>
        <div className="flex flex-col divide-y divide-border rounded-[var(--radius)] overflow-hidden border border-border">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex items-center justify-between px-6 py-5"
              style={{ backgroundColor: tokens.colors.card.DEFAULT, color: tokens.colors.card.foreground }}
            >
              <div>
                <p className="font-semibold">{plan.name}</p>
                <p className="text-sm" style={{ opacity: 0.6 }}>{plan.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-bold">
                  {plan.price}<span className="text-sm font-normal" style={{ opacity: 0.6 }}>{plan.period}</span>
                </span>
                <button
                  className={`${plan.primary ? classes.buttonPrimary : classes.buttonSecondary} px-4 py-2 rounded-[var(--radius)] text-sm font-medium whitespace-nowrap`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Featured — large highlighted Pro card, two smaller cards beside it */
export function PricingFeatured({ tokens }: PricingProps) {
  const classes = tokensToClasses(tokens);
  return (
    <section
      className={`${classes.pricingSection} py-24 px-6`}
      style={{ backgroundColor: tokens.semantic.pricing.background, color: tokens.semantic.pricing.text }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4" style={{ opacity: 0.7 }}>Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">

          {/* Starter — small */}
          <div
            className="flex flex-col justify-between p-6 rounded-[var(--radius)] border border-border"
            style={{ backgroundColor: tokens.colors.card.DEFAULT, color: tokens.colors.card.foreground }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.5 }}>Starter</p>
              <p className="text-3xl font-bold mt-2">$9<span className="text-base font-normal" style={{ opacity: 0.6 }}>/mo</span></p>
              <p className="text-sm mt-3" style={{ opacity: 0.6 }}>Perfect for side projects and small teams.</p>
            </div>
            <button className={`${classes.buttonSecondary} mt-8 w-full py-2.5 rounded-[var(--radius)] text-sm font-medium`}>
              Choose Plan
            </button>
          </div>

          {/* Pro — featured, taller */}
          <div
            className="flex flex-col justify-between p-8 rounded-[var(--radius)] shadow-lg -mt-4 -mb-4"
            style={{ backgroundColor: tokens.colors.primary.DEFAULT, color: tokens.colors.primary.foreground }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.7 }}>Pro</p>
              <p className="text-4xl font-bold mt-2">$29<span className="text-base font-normal" style={{ opacity: 0.7 }}>/mo</span></p>
              <p className="text-sm mt-3" style={{ opacity: 0.8 }}>Everything you need to ship fast and scale.</p>
              <ul className="mt-6 space-y-2 text-sm" style={{ opacity: 0.85 }}>
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
            </div>
            <button
              className="mt-8 w-full py-2.5 rounded-[var(--radius)] text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: tokens.colors.primary.foreground, color: tokens.colors.primary.DEFAULT }}
            >
              Get Started
            </button>
          </div>

          {/* Enterprise — small */}
          <div
            className="flex flex-col justify-between p-6 rounded-[var(--radius)] border border-border"
            style={{ backgroundColor: tokens.colors.card.DEFAULT, color: tokens.colors.card.foreground }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.5 }}>Enterprise</p>
              <p className="text-3xl font-bold mt-2">Custom</p>
              <p className="text-sm mt-3" style={{ opacity: 0.6 }}>Dedicated support, SLAs, and unlimited scale.</p>
            </div>
            <button className={`${classes.buttonSecondary} mt-8 w-full py-2.5 rounded-[var(--radius)] text-sm font-medium`}>
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
