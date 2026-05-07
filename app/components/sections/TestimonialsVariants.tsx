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
  {
    quote: "Went from blank canvas to polished landing page in under an hour.",
    author: "Morgan K.",
    role: "Startup Founder",
    initials: "MK",
  },
  {
    quote: "The presets alone are worth it. My team ships twice as fast.",
    author: "Dana W.",
    role: "Engineering Lead",
    initials: "DW",
  },
  {
    quote: "Clean exports, real Tailwind code. No cleanup needed.",
    author: "Riley P.",
    role: "Full-Stack Dev",
    initials: "RP",
  },
];

/** Large single highlighted quote with avatar initials, smaller quotes below */
export function TestimonialsFeatured({ tokens }: { tokens: DesignTokens }) {
  const classes = tokensToClasses(tokens);
  const [featured, ...rest] = testimonials;

  return (
    <section
      className="py-24 px-6"
      style={{
        backgroundColor: tokens.semantic.testimonials.background,
        color: tokens.semantic.testimonials.text,
      }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold">What people are saying</h2>
        <p className="mt-4 opacity-60">Join thousands of developers and designers who ship faster</p>
      </div>

      {/* Featured quote */}
      <div className="max-w-3xl mx-auto mb-12">
        <div
          className="p-10 rounded-[var(--radius)] text-center flex flex-col items-center gap-6"
          style={{
            backgroundColor: tokens.colors.primary.DEFAULT,
            color: tokens.colors.primary.foreground,
          }}
        >
          <p className="text-xl font-medium leading-relaxed">&ldquo;{featured.quote}&rdquo;</p>
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: tokens.colors.primary.foreground,
                color: tokens.colors.primary.DEFAULT,
              }}
            >
              {featured.initials}
            </div>
            <span className="text-sm font-semibold">{featured.author}</span>
            <span className="text-xs opacity-70">{featured.role}</span>
          </div>
        </div>
      </div>

      {/* Supporting quotes */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-4">
        {rest.map((t) => (
          <div key={t.author} className={`${classes.card} p-5 rounded-[var(--radius)] flex flex-col gap-3`}>
            <p className="text-xs leading-relaxed opacity-80 flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: tokens.colors.primary.DEFAULT,
                  color: tokens.colors.primary.foreground,
                }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-xs font-medium leading-none">{t.author}</p>
                <p className="text-xs opacity-50 mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Masonry-style staggered columns */
export function TestimonialsWall({ tokens }: { tokens: DesignTokens }) {
  const classes = tokensToClasses(tokens);
  const cols = [testimonials.slice(0, 2), testimonials.slice(2, 4), testimonials.slice(4, 6)];

  return (
    <section
      className="py-24 px-6"
      style={{
        backgroundColor: tokens.semantic.testimonials.background,
        color: tokens.semantic.testimonials.text,
      }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold">Trusted by builders everywhere</h2>
        <p className="mt-4 opacity-60">Real feedback from real users</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
        {cols.map((col, ci) => (
          <div key={ci} className={`flex flex-col gap-6 ${ci === 1 ? "md:mt-8" : ""}`}>
            {col.map((t) => (
              <div key={t.author} className={`${classes.card} p-6 rounded-[var(--radius)] flex flex-col gap-4`}>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: tokens.colors.primary.DEFAULT }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: tokens.colors.primary.DEFAULT,
                      color: tokens.colors.primary.foreground,
                    }}
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
        ))}
      </div>
    </section>
  );
}
