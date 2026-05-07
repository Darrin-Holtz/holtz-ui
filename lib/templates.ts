export type Template = {
  sections: { navbar: boolean; hero: boolean; features: boolean; testimonials: boolean; pricing: boolean; cta: boolean };
  heroVariant: string;
  navbarVariant: string;
  pricingVariant: string;
  preset: string;
};

export const templates: Record<string, Template> = {
  "SaaS": {
    sections:       { navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true },
    heroVariant:    "split",
    navbarVariant:  "default",
    pricingVariant: "featured",
    preset:         "Modern SaaS",
  },

  "Startup": {
    sections:       { navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true },
    heroVariant:    "centered",
    navbarVariant:  "minimal",
    pricingVariant: "cards",
    preset:         "Bold Startup",
  },

  "Minimal": {
    sections:       { navbar: true, hero: true, features: false, testimonials: false, pricing: false, cta: true },
    heroVariant:    "centered",
    navbarVariant:  "minimal",
    pricingVariant: "cards",
    preset:         "Modern SaaS",
  },

  "Dark": {
    sections:       { navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true },
    heroVariant:    "split",
    navbarVariant:  "default",
    pricingVariant: "compact",
    preset:         "Dark Minimal",
  },

  "Earthy": {
    sections:       { navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true },
    heroVariant:    "centered",
    navbarVariant:  "centered",
    pricingVariant: "compact",
    preset:         "Earthy Warm",
  },
};
