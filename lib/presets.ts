import { defaultTokens, DesignTokens } from "./tokens";

export const presets: Record<string, DesignTokens> = {
  "Modern SaaS": {
    ...structuredClone(defaultTokens),
    colors: {
      ...defaultTokens.colors,
      primary: { DEFAULT: "oklch(0.55 0.25 260)", foreground: "oklch(1 0 0)" },
    },
    radius: { base: "0.5rem" },
    semantic: {
      ...defaultTokens.semantic,
      hero:    { background: "oklch(0.97 0.01 260)", text: "oklch(0.145 0 0)", button: "oklch(0.55 0.25 260)" },
      navbar:  { background: "oklch(1 0 0)", text: "oklch(0.145 0 0)", border: "oklch(0.922 0 0)" },
      pricing: { background: "oklch(1 0 0)", text: "oklch(0.145 0 0)", highlight: "oklch(0.55 0.25 260)" },
      features: { background: "oklch(0.97 0 0)", text: "oklch(0.145 0 0)" },
      testimonials: { background: "oklch(1 0 0)", text: "oklch(0.145 0 0)" },
      cta: { background: "oklch(0.55 0.25 260)", text: "oklch(1 0 0)", buttonBackground: "oklch(1 0 0)", buttonText: "oklch(0.145 0 0)" },
    },
  },

  "Dark Minimal": {
    ...structuredClone(defaultTokens),
    colors: {
      ...defaultTokens.colors,
      primary:    { DEFAULT: "oklch(0.75 0.15 260)", foreground: "oklch(0.1 0 0)" },
      background: "oklch(0.1 0 0)",
      foreground: "oklch(0.95 0 0)",
      muted:      { DEFAULT: "oklch(0.18 0 0)", foreground: "oklch(0.65 0 0)" },
      card:       { DEFAULT: "oklch(0.15 0 0)", foreground: "oklch(0.95 0 0)" },
      border:     "oklch(0.25 0 0)",
      input:      "oklch(0.25 0 0)",
    },
    radius: { base: "0.25rem" },
    semantic: {
      ...defaultTokens.semantic,
      hero:    { background: "oklch(0.1 0 0)",  text: "oklch(0.95 0 0)", button: "oklch(0.75 0.15 260)" },
      navbar:  { background: "oklch(0.13 0 0)", text: "oklch(0.95 0 0)", border: "oklch(0.2 0 0)" },
      pricing: { background: "oklch(0.13 0 0)", text: "oklch(0.95 0 0)", highlight: "oklch(0.75 0.15 260)" },
      features: { background: "oklch(0.13 0 0)", text: "oklch(0.95 0 0)" },
      testimonials: { background: "oklch(0.1 0 0)", text: "oklch(0.95 0 0)" },
      cta: { background: "oklch(0.75 0.15 260)", text: "oklch(0.1 0 0)", buttonBackground: "oklch(0.1 0 0)", buttonText: "oklch(0.95 0 0)" },
    },
  },

  "Bold Startup": {
    ...structuredClone(defaultTokens),
    colors: {
      ...defaultTokens.colors,
      primary:   { DEFAULT: "oklch(0.7 0.3 20)", foreground: "oklch(0 0 0)" },
      secondary: { DEFAULT: "oklch(0.95 0.02 20)", foreground: "oklch(0.2 0 0)" },
    },
    radius: { base: "1rem" },
    semantic: {
      ...defaultTokens.semantic,
      hero:    { background: "oklch(0.98 0.01 20)", text: "oklch(0.1 0 0)", button: "oklch(0.7 0.3 20)" },
      navbar:  { background: "oklch(1 0 0)", text: "oklch(0.1 0 0)", border: "oklch(0.9 0.01 20)" },
      pricing: { background: "oklch(0.98 0.01 20)", text: "oklch(0.1 0 0)", highlight: "oklch(0.7 0.3 20)" },
      features: { background: "oklch(0.95 0.01 20)", text: "oklch(0.1 0 0)" },
      testimonials: { background: "oklch(1 0 0)", text: "oklch(0.1 0 0)" },
      cta: { background: "oklch(0.7 0.3 20)", text: "oklch(0 0 0)", buttonBackground: "oklch(0 0 0)", buttonText: "oklch(1 0 0)" },
    },
  },

  "Earthy Warm": {
    ...structuredClone(defaultTokens),
    colors: {
      ...defaultTokens.colors,
      primary:    { DEFAULT: "oklch(0.55 0.12 55)", foreground: "oklch(1 0 0)" },
      background: "oklch(0.98 0.01 80)",
      foreground: "oklch(0.2 0.02 55)",
      muted:      { DEFAULT: "oklch(0.92 0.02 80)", foreground: "oklch(0.45 0.05 55)" },
      border:     "oklch(0.85 0.03 70)",
      input:      "oklch(0.85 0.03 70)",
    },
    radius: { base: "0.75rem" },
    semantic: {
      ...defaultTokens.semantic,
      hero:    { background: "oklch(0.95 0.03 70)", text: "oklch(0.2 0.02 55)", button: "oklch(0.55 0.12 55)" },
      navbar:  { background: "oklch(0.98 0.01 80)", text: "oklch(0.2 0.02 55)", border: "oklch(0.85 0.03 70)" },
      pricing: { background: "oklch(0.98 0.01 80)", text: "oklch(0.2 0.02 55)", highlight: "oklch(0.55 0.12 55)" },
      features: { background: "oklch(0.95 0.02 70)", text: "oklch(0.2 0.02 55)" },
      testimonials: { background: "oklch(0.98 0.01 80)", text: "oklch(0.2 0.02 55)" },
      cta: { background: "oklch(0.55 0.12 55)", text: "oklch(1 0 0)", buttonBackground: "oklch(1 0 0)", buttonText: "oklch(0.2 0.02 55)" },
    },
  },
};
