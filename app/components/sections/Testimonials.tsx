import type { DesignTokens } from "@/lib/tokens";
import { tokensToClasses } from "@/lib/tokens";

const testimonials = [
  {
    quote: "This saved me hours of UI work. I can ship landing pages instantly.",
    author: "Alex R.",
    role: "Indie Developer",
    initials: "AR",
  },
  {
    quote: "The token system makes branding so fast and consistent.",
    author: "Jamie L.",
    role: "Product Designer",
    initials: "JL",
  },
  {
    quote: "I use this for all my client mockups now. Nothing else comes close.",
    author: "Sam T.",
    role: "Freelancer",
    initials: "ST",
  },
];

export function Testimonials({ tokens }: { tokens: DesignTokens }) {
  const classes = tokensToClasses(tokens);

  return (
    <section
      className="py-24 px-6"
      style={{
        backgroundColor: tokens.semantic.testimonials.background,
        color: tokens.semantic.testimonials.text,
      }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold">Loved by developers &amp; creators</h2>
        <p className="mt-4 opacity-60">People use this to build faster and ship more</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.author} className={`${classes.card} p-6 rounded-[var(--radius)] flex flex-col gap-4`}>
            <p className="text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: tokens.colors.primary.DEFAULT, color: tokens.colors.primary.foreground }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{t.author}</p>
                <p className="text-xs opacity-50 mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
