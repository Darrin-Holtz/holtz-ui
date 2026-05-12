import { DesignTokens } from "./tokens";

// Header comment added to every copied section so buyers know what they need.
const CSS_VAR_COMMENT = `{/* ⚠ Requires CSS variables — paste the "CSS Variables" snippet into your globals.css :root block first */}`;

export function generateCssSnippet(tokens: DesignTokens): string {
  const { colors: c, radius: r, typography: t, spacing: s, semantic: sem } = tokens;
  const fontName = t.fontSans.split(",")[0].trim().replace(/['"]/g, "");
  const systemFonts = ["system-ui", "-apple-system", "BlinkMacSystemFont", "ui-sans-serif", "ui-monospace", "Helvetica", "Arial", "Georgia", "sans-serif", "serif", "monospace"];
  const isCssVar = fontName.startsWith("var(") || fontName.startsWith("--");
  const isSystemFont = systemFonts.some((f) => fontName.toLowerCase() === f.toLowerCase());
  const fontImport = isCssVar || isSystemFont
    ? ""
    : `@import url("https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700&display=swap");\n\n`;
  return `${fontImport}/* ─── HoltzDigitalUI CSS Variables ───────────────────────────────────────
   Paste this block inside the :root { } rule in your globals.css.
   ─────────────────────────────────────────────────────────────── */

  /* Base tokens */
  --background:               ${c.background};
  --foreground:               ${c.foreground};
  --card:                     ${c.card.DEFAULT};
  --card-foreground:          ${c.card.foreground};
  --primary:                  ${c.primary.DEFAULT};
  --primary-foreground:       ${c.primary.foreground};
  --secondary:                ${c.secondary.DEFAULT};
  --secondary-foreground:     ${c.secondary.foreground};
  --muted:                    ${c.muted.DEFAULT};
  --muted-foreground:         ${c.muted.foreground};
  --accent:                   ${c.accent.DEFAULT};
  --accent-foreground:        ${c.accent.foreground};
  --destructive:              ${c.destructive.DEFAULT};
  --border:                   ${c.border};
  --input:                    ${c.input};
  --ring:                     ${c.ring};
  --radius:                   ${r.base};
  --font-sans:                ${t.fontSans};
  --spacing-base:             ${s.base};

  /* Semantic tokens */
  --hero-background:          ${sem.hero.background};
  --hero-text:                ${sem.hero.text};
  --hero-button:              ${sem.hero.button};
  --navbar-background:        ${sem.navbar.background};
  --navbar-text:              ${sem.navbar.text};
  --navbar-border:            ${sem.navbar.border};
  --pricing-background:       ${sem.pricing.background};
  --pricing-text:             ${sem.pricing.text};
  --pricing-highlight:        ${sem.pricing.highlight};
  --features-background:      ${sem.features.background};
  --features-text:            ${sem.features.text};
  --testimonials-background:  ${sem.testimonials.background};
  --testimonials-text:        ${sem.testimonials.text};
  --cta-background:           ${sem.cta.background};
  --cta-text:                 ${sem.cta.text};
  --cta-button-background:    ${sem.cta.buttonBackground};
  --cta-button-text:          ${sem.cta.buttonText};`;
}

export function generateNavbarCode(tokens: DesignTokens, brandName = "Brand", variant: "default" | "centered" | "minimal" = "default") {
  void tokens;
  const brandPrefix = brandName.slice(0, -2);
  const brandSuffix = brandName.slice(-2);
  const brandJsx = `${brandPrefix}<span style={{ color: "var(--primary)" }}>${brandSuffix}</span>`;
  const body =
    variant === "centered"
      ? `<nav
  style={{
    backgroundColor: "var(--navbar-background)",
    color: "var(--navbar-text)",
    borderBottom: "1px solid var(--navbar-border)",
  }}
>
  <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center gap-4">
    <div className="text-2xl font-semibold">${brandJsx}</div>
    <div className="flex gap-6">
      <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Home</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Templates</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Ui Kits</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Icons</a>
    </div>
  </div>
</nav>`
      : variant === "minimal"
        ? `<nav
  style={{
    backgroundColor: "var(--navbar-background)",
    color: "var(--navbar-text)",
    borderBottom: "1px solid var(--navbar-border)",
  }}
>
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <div className="text-xl font-bold tracking-tight">${brandJsx}</div>
    <button
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
        borderRadius: "var(--radius)",
      }}
      className="px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
    >
      Get Started
    </button>
  </div>
</nav>`
        : `<nav
  style={{
    backgroundColor: "var(--navbar-background)",
    color: "var(--navbar-text)",
    borderBottom: "1px solid var(--navbar-border)",
  }}
>
  <div className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
    <div className="md:col-span-3">
      <div className="text-2xl font-semibold">${brandJsx}</div>
    </div>
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      <a href="/" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Home</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Templates</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Ui Kits</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Icons</a>
    </div>
    <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
      <button
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius)",
        }}
        className="hidden md:block px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Login
      </button>
      <button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
          borderRadius: "var(--radius)",
        }}
        className="hidden md:block px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Register
      </button>
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
      </button>
    </div>
  </div>
  {open && (
    <div
      className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
      style={{ borderColor: "var(--navbar-border)" }}
    >
      <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">Home</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Templates</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Ui Kits</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Icons</a>
      <div className="flex gap-2">
        <button
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
          }}
          className="px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Login
        </button>
        <button
          style={{
            backgroundColor: "var(--secondary)",
            color: "var(--secondary-foreground)",
            borderRadius: "var(--radius)",
          }}
          className="px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Register
        </button>
      </div>
    </div>
  )}
</nav>`;
  const stateHint = variant === "default" ? `\n{/* 💡 Requires: const [open, setOpen] = useState(false); in your component */}` : "";
  return `${CSS_VAR_COMMENT}${stateHint}\n{/* Navbar — ${variant} */}\n${body}`;
}

export function generateHeroCode(
  _tokens: DesignTokens,
  brandName = "Brand",
  headline?: string,
  subheadline?: string,
  ctaLabel?: string,
  variant: "centered" | "split" = "centered",
) {
  const resolvedHeadline = headline || `Build faster with ${brandName}`;
  const resolvedSubheadline = subheadline || "A complete UI system generated from your design tokens.";
  const resolvedCtaLabel = ctaLabel || "Get Started";
  const body =
    variant === "split"
      ? `<section
  style={{ backgroundColor: "var(--hero-background)", color: "var(--hero-text)" }}
  className="py-24 px-6"
>
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">${resolvedHeadline}</h1>
      <p className="text-xl mb-8" style={{ opacity: 0.7 }}>${resolvedSubheadline}</p>
      <button
        style={{ backgroundColor: "var(--hero-button)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}
        className="px-6 py-3 text-base font-medium hover:opacity-90 transition-opacity"
      >
        ${resolvedCtaLabel}
      </button>
    </div>
    <div className="w-full h-80 rounded-[var(--radius)]" style={{ backgroundColor: "var(--muted)" }} />
  </div>
</section>`
      : `<section
  style={{ backgroundColor: "var(--hero-background)", color: "var(--hero-text)" }}
  className="py-24 px-6"
>
  <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
    <h1 className="text-5xl font-bold leading-tight tracking-tight">${resolvedHeadline}</h1>
    <p className="text-xl max-w-2xl" style={{ opacity: 0.7 }}>${resolvedSubheadline}</p>
    <button
      style={{ backgroundColor: "var(--hero-button)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}
      className="px-6 py-3 text-base font-medium hover:opacity-90 transition-opacity"
    >
      ${resolvedCtaLabel}
    </button>
  </div>
</section>`;
  return `${CSS_VAR_COMMENT}
{/* Hero — ${variant} */}
${body}`;
}

export function generatePricingCode(_tokens: DesignTokens, variant: "cards" | "compact" | "featured" = "cards") {
  const body =
    variant === "compact"
      ? `<section style={{ backgroundColor: "var(--pricing-background)", color: "var(--pricing-text)" }} className="py-24 px-6">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
      <p className="mt-4" style={{ opacity: 0.7 }}>Choose the plan that fits your needs</p>
    </div>
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="flex flex-col divide-y overflow-hidden">
      {[{name:"Starter",price:"$9",period:"/mo",desc:"Perfect for side projects",cta:"Choose Plan",primary:false},{name:"Pro",price:"$29",period:"/mo",desc:"For growing teams",cta:"Get Started",primary:true},{name:"Enterprise",price:"Custom",period:"",desc:"Unlimited scale",cta:"Contact Us",primary:false}].map((plan) => (
        <div key={plan.name} className="flex items-center justify-between px-6 py-5" style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}>
          <div><p className="font-semibold">{plan.name}</p><p className="text-sm" style={{ opacity: 0.6 }}>{plan.desc}</p></div>
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold">{plan.price}<span className="text-sm font-normal" style={{ opacity: 0.6 }}>{plan.period}</span></span>
            <button className="px-4 py-2 text-sm font-medium whitespace-nowrap hover:opacity-90" style={plan.primary ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" } : { backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderRadius: "var(--radius)" }}>{plan.cta}</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>`
    : variant === "featured"
      ? `<section style={{ backgroundColor: "var(--pricing-background)", color: "var(--pricing-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
      <p className="mt-4" style={{ opacity: 0.7 }}>Choose the plan that fits your needs</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      <div className="flex flex-col justify-between p-6 rounded-[var(--radius)] border" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", color: "var(--card-foreground)" }}>
        <div><p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.5 }}>Starter</p><p className="text-3xl font-bold mt-2">$9<span className="text-base font-normal" style={{ opacity: 0.6 }}>/mo</span></p><p className="text-sm mt-3" style={{ opacity: 0.6 }}>Perfect for side projects.</p></div>
        <button className="mt-8 w-full py-2.5 text-sm font-medium hover:opacity-90 rounded-[var(--radius)]" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>Choose Plan</button>
      </div>
      <div className="flex flex-col justify-between p-8 rounded-[var(--radius)] shadow-lg -mt-4 -mb-4" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
        <div><p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.7 }}>Pro</p><p className="text-4xl font-bold mt-2">$29<span className="text-base font-normal" style={{ opacity: 0.7 }}>/mo</span></p><p className="text-sm mt-3" style={{ opacity: 0.8 }}>Everything to ship fast and scale.</p><ul className="mt-6 space-y-2 text-sm" style={{ opacity: 0.85 }}><li>✓ Unlimited projects</li><li>✓ Priority support</li><li>✓ Advanced analytics</li></ul></div>
        <button className="mt-8 w-full py-2.5 text-sm font-medium hover:opacity-90 rounded-[var(--radius)]" style={{ backgroundColor: "var(--primary-foreground)", color: "var(--primary)" }}>Get Started</button>
      </div>
      <div className="flex flex-col justify-between p-6 rounded-[var(--radius)] border" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", color: "var(--card-foreground)" }}>
        <div><p className="text-sm font-semibold uppercase tracking-widest" style={{ opacity: 0.5 }}>Enterprise</p><p className="text-3xl font-bold mt-2">Custom</p><p className="text-sm mt-3" style={{ opacity: 0.6 }}>Dedicated support and unlimited scale.</p></div>
        <button className="mt-8 w-full py-2.5 text-sm font-medium hover:opacity-90 rounded-[var(--radius)]" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>Contact Us</button>
      </div>
    </div>
  </div>
</section>`
      : `<section style={{ backgroundColor: "var(--pricing-background)", color: "var(--pricing-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
    <p className="mt-4" style={{ opacity: 0.7 }}>Choose the plan that fits your needs</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    <div style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6"><h3 className="text-xl font-semibold mb-2">Starter</h3><p className="mb-4" style={{ opacity: 0.7 }}>$9/mo</p><button style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderRadius: "var(--radius)" }} className="w-full py-2 text-sm font-medium hover:opacity-90">Choose Plan</button></div>
    <div style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "2px solid var(--pricing-highlight)", borderRadius: "var(--radius)" }} className="p-6"><h3 className="text-xl font-semibold mb-2">Pro</h3><p className="mb-4" style={{ opacity: 0.7 }}>$29/mo</p><button style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }} className="w-full py-2 text-sm font-medium hover:opacity-90">Get Started</button></div>
    <div style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6"><h3 className="text-xl font-semibold mb-2">Enterprise</h3><p className="mb-4" style={{ opacity: 0.7 }}>Custom</p><button style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderRadius: "var(--radius)" }} className="w-full py-2 text-sm font-medium hover:opacity-90">Contact Us</button></div>
  </div>
</section>`;
  return `${CSS_VAR_COMMENT}
{/* Pricing — ${variant} */}
${body}`;
}

export function generateFeaturesCode(_tokens: DesignTokens, variant = "grid") {
  const body =
    variant === "icons"
      ? `<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Built for speed. Designed for scale.</h2>
    <p className="mt-4 max-w-xl mx-auto" style={{ opacity: 0.6 }}>Everything your team needs to ship polished UIs.</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    {[{title:"Fast Setup",description:"Get started in minutes with prebuilt UI blocks tailored to your brand.",icon:"⚡"},{title:"Custom Branding",description:"Apply your brand colors, fonts, and radius across every component instantly.",icon:"🎨"},{title:"Export Ready",description:"Copy clean Tailwind code and drop it straight into your project.",icon:"📦"},{title:"Token System",description:"A semantic design token layer keeps every section consistent automatically.",icon:"🔗"},{title:"Live Preview",description:"See changes rendered in real time as you adjust your brand settings.",icon:"👁"},{title:"Multiple Layouts",description:"Mix and match section variants to find the layout that fits your brand.",icon:"🧩"}].map((f) => (
      <div key={f.title} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-8 flex flex-col gap-4">
        <div className="w-12 h-12 flex items-center justify-center text-xl font-bold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}>{f.icon}</div>
        <h3 className="font-semibold text-lg">{f.title}</h3>
        <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{f.description}</p>
      </div>
    ))}
  </div>
</section>`
    : variant === "alternating"
      ? `<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-5xl mx-auto text-center mb-20">
    <h2 className="text-3xl font-bold">How it works</h2>
    <p className="mt-4 max-w-xl mx-auto" style={{ opacity: 0.6 }}>A simple three-step process from idea to production-ready UI.</p>
  </div>
  <div className="max-w-5xl mx-auto flex flex-col gap-20">
    {[{badge:"01",title:"Set up your brand in minutes",description:"Configure your color palette, typography, and spacing using a visual token system — no config files, no guessing."},{badge:"02",title:"Preview every component live",description:"See exactly how your brand looks across navbars, heroes, pricing, and feature sections as you tweak each token."},{badge:"03",title:"Copy Tailwind code instantly",description:"Every section exports clean, production-ready Tailwind v4 JSX. Paste it, ship it, done."}].map((item, i) => (
      <div key={item.badge} className={i % 2 === 1 ? "flex flex-col md:flex-row-reverse items-center gap-12" : "flex flex-col md:flex-row items-center gap-12"}>
        <div className="flex-1 min-h-[220px] rounded-[var(--radius)] flex items-center justify-center" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
          <span className="text-7xl font-black" style={{ opacity: 0.3 }}>{item.badge}</span>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--primary)" }}>Step {item.badge}</div>
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p style={{ opacity: 0.6 }} className="leading-relaxed">{item.description}</p>
          <button className="self-start mt-2 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}>Learn more</button>
        </div>
      </div>
    ))}
  </div>
</section>`
      : `<section style={{ backgroundColor: "var(--features-background)", color: "var(--features-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Everything you need to build faster</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>Powerful features to help you ship quickly</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {[{ title: "Fast Setup", description: "Get started in minutes with prebuilt UI blocks and a token system that keeps every section consistent." }, { title: "Custom Branding", description: "Apply your colors, fonts, and border radius across every section instantly — no CSS expertise needed." }, { title: "Export Ready", description: "Copy clean, production-ready Tailwind code straight into your project and ship the same day." }].map((f) => (
      <div key={f.title} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6">
        <h3 className="font-semibold mb-2">{f.title}</h3>
        <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{f.description}</p>
      </div>
    ))}
  </div>
</section>`;
  return `${CSS_VAR_COMMENT}\n{/* Features — ${variant} */}\n${body}`;
}

export function generateTestimonialsCode(_tokens: DesignTokens, variant = "grid") {
  const body =
    variant === "featured"
      ? `<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
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
</section>`
    : variant === "wall"
      ? `<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Trusted by builders everywhere</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>Real feedback from real users</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
    {[[{q:"This saved me hours of UI work.",a:"Alex R.",r:"Indie Developer",i:"AR"},{q:"The token system makes branding so fast.",a:"Jamie L.",r:"Product Designer",i:"JL"}],[{q:"I use this for all my client mockups now.",a:"Sam T.",r:"Freelancer",i:"ST"},{q:"From blank canvas to polished page in an hour.",a:"Morgan K.",r:"Startup Founder",i:"MK"}],[{q:"My team ships twice as fast.",a:"Dana W.",r:"Engineering Lead",i:"DW"},{q:"Clean exports, real Tailwind code.",a:"Riley P.",r:"Full-Stack Dev",i:"RP"}]].map((col, ci) => (
        <div key={ci} className={ci === 1 ? "flex flex-col gap-6 md:mt-8" : "flex flex-col gap-6"}>
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
</section>`
      : `<section style={{ backgroundColor: "var(--testimonials-background)", color: "var(--testimonials-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-bold">Loved by developers &amp; creators</h2>
    <p className="mt-4" style={{ opacity: 0.6 }}>People use this to build faster and ship more</p>
  </div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {[{quote:"This saved me hours of UI work. I can ship landing pages instantly.",author:"Alex R.",role:"Indie Developer",initials:"AR"},{quote:"The token system makes branding so fast and consistent.",author:"Jamie L.",role:"Product Designer",initials:"JL"},{quote:"I use this for all my client mockups now. Nothing else comes close.",author:"Sam T.",role:"Freelancer",initials:"ST"}].map((t) => (
      <div key={t.author} style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }} className="p-6 flex flex-col gap-4">
        <p className="text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>{t.initials}</div>
          <div><p className="text-sm font-medium leading-none">{t.author}</p><p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>{t.role}</p></div>
        </div>
      </div>
    ))}
  </div>
</section>`;
  return `${CSS_VAR_COMMENT}\n{/* Testimonials — ${variant} */}\n${body}`;
}

export function generateCTACode(
  _tokens: DesignTokens,
  heading?: string,
  subheading?: string,
  ctaLabel?: string,
  variant: "centered" | "split" | "banner" = "centered",
) {
  const resolvedHeading = heading || "Ready to build your own UI system?";
  const resolvedSubheading = subheading || "Generate, customize, and export production-ready UI in seconds.";
  const resolvedCtaLabel = ctaLabel || "Get Started";
  const body =
    variant === "split"
      ? `<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-24 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">${resolvedHeading}</h2>
      <p className="opacity-80 max-w-md leading-relaxed">${resolvedSubheading}</p>
    </div>
    <div className="flex flex-col gap-3 items-start md:items-end flex-shrink-0">
      <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="px-8 py-3 font-medium hover:opacity-90 transition">${resolvedCtaLabel}</button>
      <span className="text-sm" style={{ opacity: 0.6 }}>No credit card required</span>
    </div>
  </div>
</section>`
    : variant === "banner"
      ? `<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-6 px-6">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p className="font-medium text-lg" style={{ opacity: 0.9 }}>${resolvedHeading} &mdash;&nbsp;<span className="font-normal text-base" style={{ opacity: 0.6 }}>free forever for solo builders.</span></p>
    <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="flex-shrink-0 px-6 py-2.5 font-medium text-sm hover:opacity-90 transition">${resolvedCtaLabel}</button>
  </div>
</section>`
      : `<section style={{ backgroundColor: "var(--cta-background)", color: "var(--cta-text)" }} className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">${resolvedHeading}</h2>
    <p className="mb-8" style={{ opacity: 0.8 }}>${resolvedSubheading}</p>
    <button style={{ backgroundColor: "var(--cta-button-background)", color: "var(--cta-button-text)", borderRadius: "var(--radius)" }} className="px-6 py-3 font-medium hover:opacity-90 transition">${resolvedCtaLabel}</button>
  </div>
</section>`;
  return `${CSS_VAR_COMMENT}\n{/* CTA \u2014 ${variant} */}\n${body}`;
}


export function generatePageCode(
  tokens: DesignTokens,
  sections: { navbar?: boolean; hero?: boolean; features?: boolean; testimonials?: boolean; pricing?: boolean; cta?: boolean } = { navbar: true, hero: true, pricing: true },
  brandName = "Brand",
  heroContent?: { headline?: string; subheadline?: string; ctaLabel?: string },
  ctaContent?: { heading?: string; subheading?: string; ctaLabel?: string },
) {
  const { colors: c, radius: r, typography: t } = tokens;

  const tokensComment = `/*
  Brand Tokens — generated by HoltzDigitalUI
  ─────────────────────────────────────
  Primary:     ${c.primary.DEFAULT}
  Background:  ${c.background}
  Foreground:  ${c.foreground}
  Radius:      ${r.base}
  Font:        ${t.fontSans}
*/`;

  const blocks = [
    sections.navbar       ? `      ${generateNavbarCode(tokens, brandName).split("\n").join("\n      ")}` : "",
    sections.hero         ? `      ${generateHeroCode(tokens, brandName, heroContent?.headline, heroContent?.subheadline, heroContent?.ctaLabel).split("\n").join("\n      ")}` : "",
    sections.features     ? `      ${generateFeaturesCode(tokens).split("\n").join("\n      ")}` : "",
    sections.testimonials ? `      ${generateTestimonialsCode(tokens).split("\n").join("\n      ")}` : "",
    sections.pricing      ? `      ${generatePricingCode(tokens).split("\n").join("\n      ")}` : "",
    sections.cta          ? `      ${generateCTACode(tokens, ctaContent?.heading, ctaContent?.subheading, ctaContent?.ctaLabel).split("\n").join("\n      ")}` : "",
  ].filter(Boolean).join("\n\n");

  return `"use client";

import { useState } from "react";

${tokensComment}

export default function GeneratedPage() {${sections.navbar ? `
  const [open, setOpen] = useState(false);` : ""}
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)" }}
    >
${blocks}
    </main>
  );
}
`;
}

