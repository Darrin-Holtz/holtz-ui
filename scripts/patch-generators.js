// @ts-nocheck
const fs = require("fs");

let src = fs.readFileSync("lib/generateCode.ts", "utf8");

// ── generateFeaturesCode ──────────────────────────────────────────────────────
const featuresOld = /export function generateFeaturesCode\(_tokens: DesignTokens\) \{[\s\S]*?\n\}\n\nexport function generateTestimonialsCode/;
const featuresNew = `export function generateFeaturesCode(_tokens: DesignTokens, variant = "grid") {
  const body =
    variant === "icons"
      ? \`<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Built for speed. Designed for scale.</h2>
    <p className="mt-4 max-w-xl mx-auto" style={{ opacity: 0.6 }}>Everything your team needs to ship polished UIs.</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    {[{title:"Fast Setup",description:"Get started in minutes with prebuilt UI blocks.",icon:"⚡"},{title:"Custom Branding",description:"Apply your colors, fonts, and radius instantly.",icon:"🎨"},{title:"Export Ready",description:"Copy clean Tailwind code straight into your project.",icon:"📦"},{title:"Token System",description:"A semantic token layer keeps every section consistent.",icon:"🔗"},{title:"Live Preview",description:"See changes rendered in real time.",icon:"👁"},{title:"Multiple Layouts",description:"Mix and match section variants.",icon:"🧩"}].map((f) => (
      <div key={f.title} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-8 flex flex-col gap-4">
        <div className="w-12 h-12 flex items-center justify-center text-xl font-bold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}>{f.icon}</div>
        <h3 className="font-semibold text-lg">{f.title}</h3>
        <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{f.description}</p>
      </div>
    ))}
  </div>
</section>\`
    : variant === "alternating"
      ? \`<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-5xl mx-auto text-center mb-20">
    <h2 className="text-3xl font-bold">How it works</h2>
    <p className="mt-4 max-w-xl mx-auto" style={{ opacity: 0.6 }}>A simple three-step process from idea to production-ready UI.</p>
  </div>
  <div className="max-w-5xl mx-auto flex flex-col gap-20">
    {[{badge:"01",title:"Set up your brand in minutes",description:"Configure your color palette, typography, and spacing."},{badge:"02",title:"Preview every component live",description:"See exactly how your brand looks across every section."},{badge:"03",title:"Copy Tailwind code instantly",description:"Every section exports clean, production-ready Tailwind v4 JSX."}].map((item, i) => (
      <div key={item.badge} className={\`flex flex-col md:flex-row items-center gap-12 \${i % 2 === 1 ? "md:flex-row-reverse" : ""}\`}>
        <div className="flex-1 min-h-[220px] rounded-[var(--radius)] flex items-center justify-center" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
          <span className="text-7xl font-black" style={{ opacity: 0.3 }}>{item.badge}</span>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--primary)" }}>Step {item.badge}</div>
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p style={{ opacity: 0.6 }} className="leading-relaxed">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>\`
      : \`<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Everything you need to build faster</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>Powerful features to help you ship quickly</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {["Fast Setup", "Custom Branding", "Export Ready"].map((title) => (
      <div key={title} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm" style={{ opacity: 0.6 }}>Your feature description goes here.</p>
      </div>
    ))}
  </div>
</section>\`;
  return \`\${CSS_VAR_COMMENT}\\n{/* Features — \${variant} */}\\n\${body}\`;
}

export function generateTestimonialsCode`;

src = src.replace(featuresOld, featuresNew);
console.log("features:", src.includes('variant === "icons"'));

// ── generateTestimonialsCode ──────────────────────────────────────────────────
const testimonialsOld = /export function generateTestimonialsCode\(_tokens: DesignTokens\) \{[\s\S]*?\n\}\n\nexport function generateCTACode/;
const testimonialsNew = `export function generateTestimonialsCode(_tokens: DesignTokens, variant = "grid") {
  const body =
    variant === "featured"
      ? \`<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">What people are saying</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>Join thousands of developers and designers who ship faster</p>
  </div>
  <div className="max-w-3xl mx-auto mb-12">
    <div className="p-10 rounded-[var(--radius)] text-center flex flex-col items-center gap-6" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
      <p className="text-xl font-medium leading-relaxed">&ldquo;This saved me hours of UI work. I can ship landing pages instantly.&rdquo;</p>
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "var(--primary-foreground)", color: "var(--primary)" }}>AR</div>
        <span className="text-sm font-semibold">Alex R.</span>
        <span className="text-xs" style={{ opacity: 0.7 }}>Indie Developer</span>
      </div>
    </div>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-4">
    {[{q:"The token system makes branding so fast.",a:"Jamie L.",r:"Product Designer",i:"JL"},{q:"I use this for all my client mockups now.",a:"Sam T.",r:"Freelancer",i:"ST"},{q:"From blank canvas to polished page in an hour.",a:"Morgan K.",r:"Startup Founder",i:"MK"},{q:"My team ships twice as fast with presets.",a:"Dana W.",r:"Engineering Lead",i:"DW"},{q:"Clean exports, real Tailwind code.",a:"Riley P.",r:"Full-Stack Dev",i:"RP"}].map((t) => (
      <div key={t.a} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-5 flex flex-col gap-3">
        <p className="text-xs leading-relaxed flex-1" style={{ opacity: 0.8 }}>&ldquo;{t.q}&rdquo;</p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>{t.i}</div>
          <div><p className="text-xs font-medium leading-none">{t.a}</p><p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>{t.r}</p></div>
        </div>
      </div>
    ))}
  </div>
</section>\`
    : variant === "wall"
      ? \`<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Trusted by builders everywhere</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>Real feedback from real users</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
    {[[{q:"This saved me hours of UI work.",a:"Alex R.",r:"Indie Developer",i:"AR"},{q:"The token system makes branding so fast.",a:"Jamie L.",r:"Product Designer",i:"JL"}],[{q:"I use this for all my client mockups now.",a:"Sam T.",r:"Freelancer",i:"ST"},{q:"From blank canvas to polished page in an hour.",a:"Morgan K.",r:"Startup Founder",i:"MK"}],[{q:"My team ships twice as fast.",a:"Dana W.",r:"Engineering Lead",i:"DW"},{q:"Clean exports, real Tailwind code.",a:"Riley P.",r:"Full-Stack Dev",i:"RP"}]].map((col, ci) => (
      <div key={ci} className={\`flex flex-col gap-6 \${ci === 1 ? "md:mt-8" : ""}\`}>
        {col.map((t) => (
          <div key={t.a} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6 flex flex-col gap-4">
            <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <span key={i} style={{ color: "var(--primary)" }}>★</span>)}</div>
            <p className="text-sm leading-relaxed flex-1">&ldquo;{t.q}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>{t.i}</div>
              <div><p className="text-sm font-medium leading-none">{t.a}</p><p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>{t.r}</p></div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</section>\`
      : \`<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Loved by developers &amp; creators</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>People use this to build faster and ship more</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {[{quote:"This saved me hours of UI work.",author:"Alex R.",role:"Indie Developer",initials:"AR"},{quote:"The token system makes branding so fast.",author:"Jamie L.",role:"Product Designer",initials:"JL"},{quote:"I use this for all my client mockups now.",author:"Sam T.",role:"Freelancer",initials:"ST"}].map((t) => (
      <div key={t.author} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6 flex flex-col gap-4">
        <p className="text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
        <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>&mdash; {t.author}</span>
      </div>
    ))}
  </div>
</section>\`;
  return \`\${CSS_VAR_COMMENT}\\n{/* Testimonials — \${variant} */}\\n\${body}\`;
}

export function generateCTACode`;

src = src.replace(testimonialsOld, testimonialsNew);
console.log("testimonials:", src.includes('variant === "featured"'));

// ── generateCTACode ───────────────────────────────────────────────────────────
const ctaOld = /export function generateCTACode\(\s*tokens: DesignTokens,\s*heading\?: string,\s*subheading\?: string,\s*ctaLabel\?: string,\s*\) \{[\s\S]*?\n\}\n\nexport function generatePageCode/;
const ctaNew = `export function generateCTACode(
  _tokens: DesignTokens,
  heading?: string,
  subheading?: string,
  ctaLabel?: string,
  variant = "centered",
) {
  const resolvedHeading = heading || "Ready to build your own UI system?";
  const resolvedSubheading = subheading || "Generate, customize, and export production-ready UI in seconds.";
  const resolvedCtaLabel = ctaLabel || "Get Started";
  const body =
    variant === "split"
      ? \`<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">\${resolvedHeading}</h2>
      <p className="opacity-80 max-w-md leading-relaxed">\${resolvedSubheading}</p>
    </div>
    <div className="flex flex-col gap-3 items-start md:items-end flex-shrink-0">
      <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="px-8 py-3 font-medium hover:opacity-90 transition">\${resolvedCtaLabel}</button>
      <span className="text-sm" style={{ opacity: 0.6 }}>No credit card required</span>
    </div>
  </div>
</section>\`
    : variant === "banner"
      ? \`<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-6 px-6">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p className="font-medium text-lg" style={{ opacity: 0.9 }}>\${resolvedHeading} &mdash;&nbsp;<span className="font-normal text-base" style={{ opacity: 0.6 }}>free forever for solo builders.</span></p>
    <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="flex-shrink-0 px-6 py-2.5 font-medium text-sm hover:opacity-90 transition">\${resolvedCtaLabel}</button>
  </div>
</section>\`
      : \`<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">\${resolvedHeading}</h2>
    <p className="mb-8" style={{ opacity: 0.8 }}>\${resolvedSubheading}</p>
    <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="px-6 py-3 font-medium hover:opacity-90 transition">\${resolvedCtaLabel}</button>
  </div>
</section>\`;
  return \`\${CSS_VAR_COMMENT}\\n{/* CTA — \${variant} */}\\n\${body}\`;
}

export function generatePageCode`;

src = src.replace(ctaOld, ctaNew);
console.log("cta:", src.includes('variant === "split"'));

fs.writeFileSync("lib/generateCode.ts", src);
console.log("Done.");
