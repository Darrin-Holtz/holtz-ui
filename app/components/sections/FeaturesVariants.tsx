import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

interface FeaturesProps {
  tokens: DesignTokens;
}

const features = [
  {
    title: "Fast Setup",
    description: "Get started in minutes with prebuilt UI blocks tailored to your brand.",
    icon: "⚡",
  },
  {
    title: "Custom Branding",
    description: "Apply your brand colors, fonts, and radius across every component instantly.",
    icon: "🎨",
  },
  {
    title: "Export Ready",
    description: "Copy clean Tailwind code and drop it straight into your project.",
    icon: "📦",
  },
  {
    title: "Token System",
    description: "A semantic design token layer keeps every section consistent automatically.",
    icon: "🔗",
  },
  {
    title: "Live Preview",
    description: "See changes rendered in real time as you adjust your brand settings.",
    icon: "👁",
  },
  {
    title: "Multiple Layouts",
    description: "Mix and match section variants to find the layout that fits your brand.",
    icon: "🧩",
  },
];

/** Bento-style asymmetric grid — first card spans 2 columns */
export function FeaturesIcons({ tokens }: FeaturesProps) {
  const classes = tokensToClasses(tokens);

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6"
      style={{ backgroundColor: tokens.semantic.features.background, color: tokens.semantic.features.text }}
    >
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold">Built for speed. Designed for scale.</h2>
        <p className="mt-4 opacity-60 max-w-xl mx-auto">
          Everything your team needs to ship polished UIs without starting from scratch.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.slice(0, 3).map((f) => (
          <div
            key={f.title}
            className={`${classes.card} p-8 rounded-[var(--radius)] flex flex-col gap-4`}
          >
            <div
              className="w-12 h-12 rounded-[var(--radius)] flex items-center justify-center text-xl font-bold"
              style={{
                backgroundColor: tokens.colors.primary.DEFAULT,
                color: tokens.colors.primary.foreground,
              }}
            >
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm opacity-60 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-6">
        {features.slice(3).map((f) => (
          <div
            key={f.title}
            className={`${classes.card} p-8 rounded-[var(--radius)] flex flex-col gap-4`}
          >
            <div
              className="w-12 h-12 rounded-[var(--radius)] flex items-center justify-center text-xl font-bold"
              style={{
                backgroundColor: tokens.colors.primary.DEFAULT,
                color: tokens.colors.primary.foreground,
              }}
            >
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm opacity-60 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const alternatingSections = [
  {
    title: "Set up your brand in minutes",
    description:
      "Configure your color palette, typography, and spacing using a visual token system — no config files, no guessing.",
    badge: "01",
  },
  {
    title: "Preview every component live",
    description:
      "See exactly how your brand looks across navbars, heroes, pricing, and feature sections as you tweak each token.",
    badge: "02",
  },
  {
    title: "Copy Tailwind code instantly",
    description:
      "Every section exports clean, production-ready Tailwind v4 JSX. Paste it, ship it, done.",
    badge: "03",
  },
];

/** Alternating left/right rows with a visual block and descriptive text */
export function FeaturesAlternating({ tokens }: FeaturesProps) {
  const classes = tokensToClasses(tokens);

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6"
      style={{ backgroundColor: tokens.semantic.features.background, color: tokens.semantic.features.text }}
    >
      <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <p className="mt-4 opacity-60 max-w-xl mx-auto">
          A simple three-step process from idea to production-ready UI.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
        {alternatingSections.map((item, i) => (
          <div
            key={item.badge}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Visual block */}
            <div
              className="flex-1 min-h-[220px] rounded-[var(--radius)] flex items-center justify-center"
              style={{
                backgroundColor: tokens.colors.secondary.DEFAULT,
                color: tokens.colors.secondary.foreground,
              }}
            >
              <span className="text-7xl font-black opacity-30">{item.badge}</span>
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col gap-4">
              <div
                className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: tokens.colors.primary.DEFAULT }}
              >
                Step {item.badge}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="opacity-60 leading-relaxed">{item.description}</p>
              <button
                className="self-start mt-2 px-5 py-2.5 rounded-[var(--radius)] text-sm font-medium"
                style={{
                  backgroundColor: tokens.colors.primary.DEFAULT,
                  color: tokens.colors.primary.foreground,
                }}
              >
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
