"use client";

import { useState, useEffect, useRef } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Hero } from "../components/sections/Hero";
import { HeroSplit } from "../components/sections/HeroSplit";
import { PreviewNavbar } from "../components/sections/PreviewNavbar";
import { NavbarCentered, NavbarMinimal } from "../components/sections/NavbarVariants";
import { defaultTokens, DesignTokens, parseOklch, tokensToVars } from "@/lib/tokens";
import { presets } from "@/lib/presets";
import { templates } from "@/lib/templates";
import { generatePageCode, generateNavbarCode, generateHeroCode, generatePricingCode, generateFeaturesCode, generateTestimonialsCode, generateCTACode, generateCssSnippet } from "@/lib/generateCode";
import { Pricing } from "../components/sections/Pricing";
import { PricingCompact, PricingFeatured } from "../components/sections/PricingVariants";
import { Features } from "../components/sections/Features";
import { FeaturesIcons, FeaturesAlternating } from "../components/sections/FeaturesVariants";
import { Testimonials } from "../components/sections/Testimonials";
import { TestimonialsFeatured, TestimonialsWall } from "../components/sections/TestimonialsVariants";
import { CTA } from "../components/sections/CTA";
import { CTASplit, CTABanner } from "../components/sections/CTAVariants";
import { generateProjectFiles } from "@/lib/export/generateProject";
import { exportProject } from "@/lib/export/exportProject";

type OklchField = { value: string; error: string | null };

function loadGoogleFont(family: string) {
  const name = family.split(",")[0].trim().replace(/['"/]/g, "");
  if (!name) return;
  if (name.startsWith("var(") || name.startsWith("--")) return;
  const systemFonts = ["system-ui", "-apple-system", "blinkmacsystemfont", "ui-sans-serif", "ui-serif", "ui-monospace", "helvetica", "arial", "georgia", "sans-serif", "serif", "monospace"];
  if (systemFonts.includes(name.toLowerCase())) return;
  const id = `gfont-${name.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;600;700&display=swap`;
  document.head.appendChild(link);
}

function useOklchField(initial: string) {
  const [field, setField] = useState<OklchField>({ value: initial, error: null });
  const update = (raw: string, onValid: (normalized: string) => void) => {
    const normalized = parseOklch(raw);
    setField({ value: raw, error: normalized ? null : "Invalid oklch — e.g. oklch(0.49 0.27 292)" });
    if (normalized) onValid(normalized);
  };
  return [field, update] as const;
}

// Returns true if the color's lightness suggests it may fail WCAG AA 4.5:1 against white text.
// Approximate: OKLCH L > 0.56 is too light for white text to pass at 4.5:1.
function oklchContrastWarn(oklchStr: string): boolean {
  const m = oklchStr.match(/oklch\(\s*([\d.]+)/);
  if (!m) return false;
  const L = parseFloat(m[1]);
  return L > 0.56;
}

// Load a namespaced value from the URL hash (base64 JSON).
function loadFromHash<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return fallback;
    const saved = JSON.parse(atob(hash)) as Record<string, unknown>;
    return (key in saved ? saved[key] : fallback) as T;
  } catch {
    return fallback;
  }
}

export default function GeneratorPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { isAuthenticated: browserIsAuthenticated, isLoading: isAuthLoading } = useKindeBrowserClient();
  const isUserAuthenticated = isAuthLoading ? isAuthenticated : Boolean(browserIsAuthenticated);

  const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);

  const [sections, setSections] = useState({ navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true });
  const [heroVariant, setHeroVariant] = useState("centered");
  const [navbarVariant, setNavbarVariant] = useState("default");
  const [pricingVariant, setPricingVariant] = useState("cards");
  const [featuresVariant, setFeaturesVariant] = useState("grid");
  const [testimonialsVariant, setTestimonialsVariant] = useState("grid");
  const [ctaVariant, setCtaVariant] = useState("centered");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [brandName, setBrandName] = useState("HoltzDigitalUI");
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const [darkPreview, setDarkPreview] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [pendingActionLabel, setPendingActionLabel] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState({ headline: "", subheadline: "", ctaLabel: "" });
  const [ctaContent,  setCtaContent]  = useState({ heading: "",  subheading: "",  ctaLabel: "" });
  const urlSyncedRef  = useRef(false);
  const urlSaveTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(key);
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  const getAuthRedirectPath = () => {
    if (typeof window === "undefined") return "/generator";

    // Some auth providers reject redirect targets containing URL fragments.
    // Keep this as a clean app path to avoid 403 responses from the login route.
    const pathname = window.location.pathname || "/generator";
    return pathname;
  };

  const buildAuthUrl = (basePath: string) => {
    return `${basePath}?post_login_redirect_url=${encodeURIComponent(getAuthRedirectPath())}`;
  };

  const withAuth = (actionLabel: string, action: () => void | Promise<void>) => {
    if (isUserAuthenticated) {
      void action();
      return;
    }

    setPendingActionLabel(actionLabel);
    setShowAuthPrompt(true);
  };

  const exportSections = [
    { key: "css",          label: "CSS Variables",  fn: () => generateCssSnippet(tokens) },
    { key: "navbar",       label: "Navbar",         fn: () => generateNavbarCode(tokens, brandName, navbarVariant as "default" | "centered" | "minimal") },
    { key: "hero",         label: "Hero",           fn: () => generateHeroCode(tokens, brandName, heroContent.headline || undefined, heroContent.subheadline || undefined, heroContent.ctaLabel || undefined, heroVariant as "centered" | "split") },
    { key: "features",     label: "Features",       fn: () => generateFeaturesCode(tokens, featuresVariant as "grid" | "icons" | "alternating") },
    { key: "testimonials", label: "Testimonials",   fn: () => generateTestimonialsCode(tokens, testimonialsVariant as "grid" | "featured" | "wall") },
    { key: "pricing",      label: "Pricing",        fn: () => generatePricingCode(tokens, pricingVariant as "cards" | "compact" | "featured") },
    { key: "cta",          label: "CTA",            fn: () => generateCTACode(tokens, ctaContent.heading || undefined, ctaContent.subheading || undefined, ctaContent.ctaLabel || undefined, ctaVariant as "centered" | "split" | "banner") },
  ] as const;

  const [primaryField, updatePrimary] = useOklchField(defaultTokens.colors.primary.DEFAULT);
  const [secondaryField, updateSecondary] = useOklchField(defaultTokens.colors.secondary.DEFAULT);
  const [heroBgField, updateHeroBg] = useOklchField(defaultTokens.semantic.hero.background);
  const [navbarBgField, updateNavbarBg] = useOklchField(defaultTokens.semantic.navbar.background);
  const [pricingBgField, updatePricingBg] = useOklchField(defaultTokens.semantic.pricing.background);
  const [featuresBgField, updateFeaturesBg] = useOklchField(defaultTokens.semantic.features.background);
  const [testimonialsBgField, updateTestimonialsBg] = useOklchField(defaultTokens.semantic.testimonials.background);
  const [ctaBgField, updateCtaBg] = useOklchField(defaultTokens.semantic.cta.background);
  const [pageBgField, updatePageBg] = useOklchField(defaultTokens.colors.background);

  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const fontDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Close export dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load state from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const s = JSON.parse(atob(hash)) as Record<string, unknown>;
        if (s.tokens)             { setTokens(s.tokens as DesignTokens); syncFields(s.tokens as DesignTokens); }
        if (s.sections)           setSections(s.sections as typeof sections);
        if (s.heroVariant)        setHeroVariant(s.heroVariant as string);
        if (s.navbarVariant)      setNavbarVariant(s.navbarVariant as string);
        if (s.pricingVariant)     setPricingVariant(s.pricingVariant as string);
        if (s.featuresVariant)    setFeaturesVariant(s.featuresVariant as string);
        if (s.testimonialsVariant) setTestimonialsVariant(s.testimonialsVariant as string);
        if (s.ctaVariant)         setCtaVariant(s.ctaVariant as string);
        if (s.brandName)          setBrandName(s.brandName as string);
        if (s.heroContent)        setHeroContent(s.heroContent as typeof heroContent);
        if (s.ctaContent)         setCtaContent(s.ctaContent as typeof ctaContent);
      } catch { /* ignore malformed hash */ }
    }
    urlSyncedRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state to URL hash (debounced), skip before mount effect completes
  useEffect(() => {
    if (!urlSyncedRef.current) return;
    clearTimeout(urlSaveTimer.current);
    urlSaveTimer.current = setTimeout(() => {
      const state = { tokens, sections, heroVariant, navbarVariant, pricingVariant, featuresVariant, testimonialsVariant, ctaVariant, brandName, heroContent, ctaContent };
      window.history.replaceState(null, "", `#${btoa(JSON.stringify(state))}`);
    }, 400);
  }, [tokens, sections, heroVariant, navbarVariant, pricingVariant, featuresVariant, testimonialsVariant, ctaVariant, brandName, heroContent, ctaContent]);

  // Load the default font on mount
  useEffect(() => { loadGoogleFont(tokens.typography.fontSans); }, []);

  const syncFields = (t: DesignTokens) => {
    updatePrimary(t.colors.primary.DEFAULT, () => {});
    updateSecondary(t.colors.secondary.DEFAULT, () => {});
    updatePageBg(t.colors.background, () => {});
    updateNavbarBg(t.semantic.navbar.background, () => {});
    updateHeroBg(t.semantic.hero.background, () => {});
    updatePricingBg(t.semantic.pricing.background, () => {});
    updateFeaturesBg(t.semantic.features.background, () => {});
    updateTestimonialsBg(t.semantic.testimonials.background, () => {});
    updateCtaBg(t.semantic.cta.background, () => {});
    loadGoogleFont(t.typography.fontSans);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {showAuthPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Sign in to continue</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pendingActionLabel
                ? `Please sign in or create a free account to ${pendingActionLabel}.`
                : "Please sign in or create a free account to continue."}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">No credit card required.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={buildAuthUrl("/api/auth/login")}
                className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Sign In
              </a>
              <a
                href={buildAuthUrl("/api/auth/register")}
                className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
              >
                Create Account
              </a>
              <button
                type="button"
                onClick={() => setShowAuthPrompt(false)}
                className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top toolbar */}
      <header className="flex-shrink-0 border-b bg-white px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-sm">Holtz UI Generator</h1>
          <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5">Beta</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setTokens(structuredClone(defaultTokens));
              setBrandName("HoltzDigitalUI");
              setSections({ navbar: true, hero: true, features: true, testimonials: true, pricing: true, cta: true });
              setHeroVariant("centered");
              setNavbarVariant("default");
              setPricingVariant("cards");
              setFeaturesVariant("grid");
              setTestimonialsVariant("grid");
              setCtaVariant("centered");
              setHeroContent({ headline: "", subheadline: "", ctaLabel: "" });
              setCtaContent({ heading: "", subheading: "", ctaLabel: "" });
              setActiveTemplate(null);
              syncFields(defaultTokens);
              window.history.replaceState(null, "", window.location.pathname);
            }}
            className="text-sm border px-3.5 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            title="Copy shareable link"
            className="text-sm border px-3.5 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Share
          </button>
          <button
            onClick={() => setDarkPreview((d) => !d)}
            title="Toggle dark preview background"
            className={`text-sm border px-3.5 py-1.5 rounded-lg transition-colors ${darkPreview ? "bg-neutral-900 text-white border-neutral-700" : "hover:bg-neutral-50"}`}
          >
            {darkPreview ? "☀ Light" : "☾ Dark"}
          </button>
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setExportOpen((o) => !o)}
              className="text-sm bg-foreground text-background px-3.5 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              Export Component
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {exportOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border rounded-xl shadow-lg py-1 z-50">
                {exportSections.map(({ key, label, fn }) => {
                  const isCss = key === "css";
                  const copy = isCss
                    ? fn()
                    : `/* ─── Step 1: Add to your globals.css :root { } block ─────────────────────── */\n${generateCssSnippet(tokens)}\n\n\n/* ─── Step 2: Paste this into your component ──────────────────────────────── */\n${fn()}`;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                          copyText(copy, key);
                          setExportOpen(false);
                        }}
                      className={`w-full text-left text-sm px-4 py-2 hover:bg-neutral-50 transition-colors flex justify-between items-center ${isCss ? "border-b font-medium" : ""}`}
                    >
                      {label}
                      {copiedSection === key && <span className="text-xs text-green-600">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={() =>
              withAuth("export a full project", async () => {
                const files = generateProjectFiles(tokens, sections, brandName, {
                  navbar:       navbarVariant as "default" | "centered" | "minimal",
                  hero:         heroVariant as "centered" | "split",
                  pricing:      pricingVariant as "cards" | "compact" | "featured",
                  features:     featuresVariant as "grid" | "icons" | "alternating",
                  testimonials: testimonialsVariant as "grid" | "featured" | "wall",
                  cta:          ctaVariant as "centered" | "split" | "banner",
                }, {
                  headline:    heroContent.headline    || undefined,
                  subheadline: heroContent.subheadline || undefined,
                  ctaLabel:    heroContent.ctaLabel    || undefined,
                }, {
                  heading:    ctaContent.heading    || undefined,
                  subheading: ctaContent.subheading || undefined,
                  ctaLabel:   ctaContent.ctaLabel   || undefined,
                });
                await exportProject(files);
              })
            }
            className="text-sm border px-3.5 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Export Project
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-[340px] border-r bg-neutral-50 overflow-y-auto flex-shrink-0 flex flex-col">

        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-neutral-50 border-b px-5 py-4">
          <span className="font-semibold text-sm tracking-tight">Brand Controls</span>
        </div>

        {/* Scrollable body */}
        <div className="p-4 space-y-4 flex-1">

          {/* — Brand — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Brand</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                placeholder="HoltzDigitalUI"
              />
            </div>
          </div>

          {/* — Colors — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Colors</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                Primary
                <span className="inline-block w-3.5 h-3.5 rounded-full border" style={{ background: tokens.colors.primary.DEFAULT }} />
                {oklchContrastWarn(tokens.colors.primary.DEFAULT) && (
                  <span title="This color may not meet WCAG AA 4.5:1 contrast against white text" className="text-amber-600">&#9888; contrast</span>
                )}
              </label>
              <input
                type="text"
                value={primaryField.value}
                onChange={(e) =>
                  updatePrimary(e.target.value, (v) =>
                    setTokens((prev) => ({
                      ...prev,
                      colors: { ...prev.colors, primary: { ...prev.colors.primary, DEFAULT: v } },
                      semantic: { ...prev.semantic, hero: { ...prev.semantic.hero, button: v }, pricing: { ...prev.semantic.pricing, highlight: v } },
                    }))
                  )
                }
                className={`border bg-neutral-50 px-3 py-2 rounded-lg text-sm ${primaryField.error ? "border-red-500" : ""}`}
                placeholder="oklch(0.49 0.27 292)"
              />
              {primaryField.error && <p className="text-xs text-red-500">{primaryField.error}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                Secondary
                <span className="inline-block w-3.5 h-3.5 rounded-full border" style={{ background: tokens.colors.secondary.DEFAULT }} />
              </label>
              <input
                type="text"
                value={secondaryField.value}
                onChange={(e) =>
                  updateSecondary(e.target.value, (v) =>
                    setTokens((prev) => ({
                      ...prev,
                      colors: { ...prev.colors, secondary: { ...prev.colors.secondary, DEFAULT: v } },
                    }))
                  )
                }
                className={`border bg-neutral-50 px-3 py-2 rounded-lg text-sm ${secondaryField.error ? "border-red-500" : ""}`}
                placeholder="oklch(0.967 0.001 286)"
              />
              {secondaryField.error && <p className="text-xs text-red-500">{secondaryField.error}</p>}
            </div>
          </div>

          {/* — Backgrounds — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Backgrounds</h3>
            {[
              {
                label: "Page",
                field: pageBgField,
                update: updatePageBg,
                swatch: tokens.colors.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, colors: { ...prev.colors, background: v } })),
              },
              {
                label: "Navbar",
                field: navbarBgField,
                update: updateNavbarBg,
                swatch: tokens.semantic.navbar.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, navbar: { ...prev.semantic.navbar, background: v } } })),
              },
              {
                label: "Hero",
                field: heroBgField,
                update: updateHeroBg,
                swatch: tokens.semantic.hero.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, hero: { ...prev.semantic.hero, background: v } } })),
              },
              {
                label: "Features",
                field: featuresBgField,
                update: updateFeaturesBg,
                swatch: tokens.semantic.features.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, features: { ...prev.semantic.features, background: v } } })),
              },
              {
                label: "Testimonials",
                field: testimonialsBgField,
                update: updateTestimonialsBg,
                swatch: tokens.semantic.testimonials.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, testimonials: { ...prev.semantic.testimonials, background: v } } })),
              },
              {
                label: "Pricing",
                field: pricingBgField,
                update: updatePricingBg,
                swatch: tokens.semantic.pricing.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, pricing: { ...prev.semantic.pricing, background: v } } })),
              },
              {
                label: "CTA",
                field: ctaBgField,
                update: updateCtaBg,
                swatch: tokens.semantic.cta.background,
                apply: (v: string) => setTokens((prev) => ({ ...prev, semantic: { ...prev.semantic, cta: { ...prev.semantic.cta, background: v } } })),
              },
            ].map(({ label, field, update, swatch, apply }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  {label}
                  <span className="inline-block w-3.5 h-3.5 rounded-full border" style={{ background: swatch }} />
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => update(e.target.value, apply)}
                  className={`border bg-neutral-50 px-3 py-2 rounded-lg text-sm ${field.error ? "border-red-500" : ""}`}
                  placeholder="oklch(1 0 0)"
                />
                {field.error && <p className="text-xs text-red-500">{field.error}</p>}
              </div>
            ))}
          </div>

          {/* — Typography & Shape — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Typography & Shape</h3>

            {/* Radius */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Border Radius</label>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { label: "None",   value: "0px" },
                  { label: "SM",     value: "0.25rem" },
                  { label: "MD",     value: "0.5rem" },
                  { label: "LG",     value: "0.75rem" },
                  { label: "XL",     value: "1rem" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setTokens((prev) => ({ ...prev, radius: { base: value } }))}
                    className={`px-2.5 py-1 text-xs border rounded-md transition-colors ${
                      tokens.radius.base === value
                        ? "bg-foreground text-background border-foreground"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={tokens.radius.base}
                onChange={(e) => setTokens((prev) => ({ ...prev, radius: { base: e.target.value } }))}
                className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                placeholder="0.625rem"
              />
            </div>

            {/* Font */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Font Family</label>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  "Inter",
                  "Geist",
                  "DM Sans",
                  "Outfit",
                  "Sora",
                  "Playfair Display",
                  "Lora",
                  "Space Grotesk",
                  "Nunito",
                  "Raleway",
                ].map((font) => {
                  const active = tokens.typography.fontSans.split(",")[0].trim().replace(/['"]/g, "") === font;
                  return (
                    <button
                      key={font}
                      onClick={() => {
                        setTokens((prev) => ({ ...prev, typography: { ...prev.typography, fontSans: font } }));
                        loadGoogleFont(font);
                      }}
                      className={`px-2.5 py-1 text-xs border rounded-md transition-colors ${
                        active ? "bg-foreground text-background border-foreground" : "hover:bg-neutral-50"
                      }`}
                    >
                      {font}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={tokens.typography.fontSans}
                onChange={(e) => {
                  const val = e.target.value;
                  setTokens((prev) => ({ ...prev, typography: { ...prev.typography, fontSans: val } }));
                  clearTimeout(fontDebounceRef.current);
                  fontDebounceRef.current = setTimeout(() => loadGoogleFont(val), 500);
                }}
                className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                placeholder="Lobster, Inter, Playfair Display…"
              />
              <p className="text-[10px] text-muted-foreground">Any Google Font name — loads automatically</p>
            </div>
          </div>

          {/* — Templates & Presets — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(templates).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSections(t.sections);
                    setHeroVariant(t.heroVariant);
                    setNavbarVariant(t.navbarVariant);
                    setPricingVariant(t.pricingVariant);
                    const preset = structuredClone(presets[t.preset]);
                    setTokens(preset);
                    syncFields(preset);
                    setActiveTemplate(key);
                  }}
                  className={`border px-3 py-2 rounded-lg text-sm text-left transition-colors hover:bg-neutral-50 ${
                    activeTemplate === key ? "border-foreground bg-neutral-50 font-semibold" : ""
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t space-y-3">
              <h3 className="font-semibold text-sm">Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(presets).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      const preset = structuredClone(presets[key]);
                      setTokens(preset);
                      syncFields(preset);
                      setActiveTemplate(null);
                    }}
                    className="border px-3 py-2 rounded-lg text-sm text-left hover:bg-neutral-50 transition-colors"
                  >
                    {key}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const hue = Math.floor(Math.random() * 360);
                  const secondaryHue = (hue + 180) % 360;
                  const primary = `oklch(0.6 0.25 ${hue})`;
                  const secondary = `oklch(0.92 0.04 ${secondaryHue})`;
                  setTokens((prev) => ({
                    ...prev,
                    colors: {
                      ...prev.colors,
                      primary:   { DEFAULT: primary,   foreground: "oklch(1 0 0)" },
                      secondary: { DEFAULT: secondary, foreground: `oklch(0.2 0.05 ${secondaryHue})` },
                    },
                    semantic: {
                      ...prev.semantic,
                      hero:    { ...prev.semantic.hero,    button: primary },
                      pricing: { ...prev.semantic.pricing, highlight: primary },
                    },
                  }));
                  updatePrimary(primary, () => {});
                  updateSecondary(secondary, () => {});
                }}
                className="w-full bg-foreground text-background py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                ✨ Randomize
              </button>
            </div>
          </div>

          {/* — Content — */}
          <div className="rounded-xl border bg-white p-4 space-y-4">
            <h3 className="font-semibold text-sm">Content</h3>

            {/* Hero content */}
            {sections.hero && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hero</p>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Headline</label>
                  <input
                    type="text"
                    value={heroContent.headline}
                    onChange={(e) => setHeroContent((p) => ({ ...p, headline: e.target.value }))}
                    placeholder={`Build faster with ${brandName}`}
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Subheadline</label>
                  <input
                    type="text"
                    value={heroContent.subheadline}
                    onChange={(e) => setHeroContent((p) => ({ ...p, subheadline: e.target.value }))}
                    placeholder="A complete UI system generated from your design tokens."
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">CTA Label</label>
                  <input
                    type="text"
                    value={heroContent.ctaLabel}
                    onChange={(e) => setHeroContent((p) => ({ ...p, ctaLabel: e.target.value }))}
                    placeholder="Get Started"
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}

            {/* CTA content */}
            {sections.cta && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CTA</p>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Heading</label>
                  <input
                    type="text"
                    value={ctaContent.heading}
                    onChange={(e) => setCtaContent((p) => ({ ...p, heading: e.target.value }))}
                    placeholder="Ready to build your own UI system?"
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Subheading</label>
                  <input
                    type="text"
                    value={ctaContent.subheading}
                    onChange={(e) => setCtaContent((p) => ({ ...p, subheading: e.target.value }))}
                    placeholder="Generate, customize, and export production-ready UI in seconds."
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">CTA Label</label>
                  <input
                    type="text"
                    value={ctaContent.ctaLabel}
                    onChange={(e) => setCtaContent((p) => ({ ...p, ctaLabel: e.target.value }))}
                    placeholder="Get Started"
                    className="border bg-neutral-50 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}

            {!sections.hero && !sections.cta && (
              <p className="text-xs text-muted-foreground">Enable Hero or CTA sections to edit their content.</p>
            )}
          </div>

          {/* — Sections — */}
          <div className="rounded-xl border bg-white p-4 space-y-3">
            <h3 className="font-semibold text-sm">Sections</h3>
            {([
              { key: "navbar",       label: "Navbar",       fn: () => generateNavbarCode(tokens, brandName, navbarVariant as "default" | "centered" | "minimal") },
              { key: "hero",         label: "Hero",         fn: () => generateHeroCode(tokens, brandName, heroContent.headline || undefined, heroContent.subheadline || undefined, heroContent.ctaLabel || undefined, heroVariant as "centered" | "split") },
              { key: "features",     label: "Features",     fn: () => generateFeaturesCode(tokens, featuresVariant as "grid" | "icons" | "alternating") },
              { key: "testimonials", label: "Testimonials", fn: () => generateTestimonialsCode(tokens, testimonialsVariant as "grid" | "featured" | "wall") },
              { key: "pricing",      label: "Pricing",      fn: () => generatePricingCode(tokens, pricingVariant as "cards" | "compact" | "featured") },
              { key: "cta",          label: "CTA",          fn: () => generateCTACode(tokens, ctaContent.heading || undefined, ctaContent.subheading || undefined, ctaContent.ctaLabel || undefined, ctaVariant as "centered" | "split" | "banner") },
            ] as const).map(({ key, label, fn }) => {
              const copyWithCss = () => `/* ─── Step 1: Add to your globals.css :root { } block ─────────────────────── */\n${generateCssSnippet(tokens)}\n\n\n/* ─── Step 2: Paste this into your component ──────────────────────────────── */\n${fn()}`;
              return (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sections[key]}
                    onChange={() => setSections((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="rounded"
                  />
                  <span>{label}</span>
                </label>
                <button
                  onClick={() => withAuth("copy generated code", () => copyText(copyWithCss(), key))}
                  className="text-xs border px-2 py-1 rounded-md hover:bg-neutral-50 transition-colors text-muted-foreground"
                >
                  {copiedSection === key ? "✓" : "Copy"}
                </button>
              </div>
              );
            })}
          </div>

          {/* — Styles — */}
          <div className="rounded-xl border bg-white p-4 space-y-5">
            <h3 className="font-semibold text-sm">Styles</h3>

            {/* Navbar visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Navbar</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "default", label: "Default", thumb: (
                    <svg viewBox="0 0 80 28" className="w-full">
                      <rect width="80" height="28" fill={tokens.semantic.navbar.background} />
                      <rect x="6" y="10" width="14" height="4" rx="1" fill={tokens.semantic.navbar.text} opacity="0.8" />
                      <rect x="30" y="12" width="8" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="42" y="12" width="8" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="54" y="12" width="8" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="65" y="9" width="10" height="6" rx="1.5" fill={tokens.colors.primary.DEFAULT} />
                    </svg>
                  )},
                  { value: "centered", label: "Centered", thumb: (
                    <svg viewBox="0 0 80 28" className="w-full">
                      <rect width="80" height="28" fill={tokens.semantic.navbar.background} />
                      <rect x="25" y="12" width="8" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="36" y="10" width="8" height="4" rx="1" fill={tokens.semantic.navbar.text} opacity="0.8" />
                      <rect x="47" y="12" width="8" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="6" y="9" width="10" height="6" rx="1.5" fill={tokens.colors.primary.DEFAULT} />
                      <rect x="64" y="9" width="10" height="6" rx="1.5" fill={tokens.colors.primary.DEFAULT} />
                    </svg>
                  )},
                  { value: "minimal", label: "Minimal", thumb: (
                    <svg viewBox="0 0 80 28" className="w-full">
                      <rect width="80" height="28" fill={tokens.semantic.navbar.background} />
                      <rect x="6" y="10" width="14" height="4" rx="1" fill={tokens.semantic.navbar.text} opacity="0.8" />
                      <rect x="60" y="12" width="6" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                      <rect x="69" y="12" width="6" height="2" rx="0.5" fill={tokens.semantic.navbar.text} opacity="0.4" />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setNavbarVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${navbarVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${navbarVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hero visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Hero</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: "centered", label: "Centered", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.hero.background} />
                      <rect x="18" y="10" width="44" height="6" rx="1" fill={tokens.semantic.hero.text} opacity="0.85" />
                      <rect x="22" y="20" width="36" height="3" rx="0.5" fill={tokens.semantic.hero.text} opacity="0.35" />
                      <rect x="24" y="27" width="32" height="3" rx="0.5" fill={tokens.semantic.hero.text} opacity="0.35" />
                      <rect x="28" y="35" width="24" height="8" rx="2" fill={tokens.colors.primary.DEFAULT} />
                    </svg>
                  )},
                  { value: "split", label: "Split", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.hero.background} />
                      <rect x="4" y="10" width="32" height="5" rx="1" fill={tokens.semantic.hero.text} opacity="0.85" />
                      <rect x="4" y="19" width="28" height="2.5" rx="0.5" fill={tokens.semantic.hero.text} opacity="0.35" />
                      <rect x="4" y="24" width="24" height="2.5" rx="0.5" fill={tokens.semantic.hero.text} opacity="0.35" />
                      <rect x="4" y="33" width="18" height="7" rx="2" fill={tokens.colors.primary.DEFAULT} />
                      <rect x="44" y="6" width="32" height="38" rx="3" fill={tokens.colors.secondary.DEFAULT} opacity="0.6" />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setHeroVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${heroVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${heroVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Features</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "grid", label: "Grid", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.features.background} />
                      <rect x="4"  y="18" width="22" height="20" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="18" width="22" height="20" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="18" width="22" height="20" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="22" y="8" width="36" height="4" rx="1" fill={tokens.semantic.features.text} opacity="0.7" />
                    </svg>
                  )},
                  { value: "icons", label: "Icons", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.features.background} />
                      <rect x="4"  y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <circle cx="15" cy="22" r="4" fill={tokens.colors.primary.DEFAULT} opacity="0.8" />
                      <circle cx="40" cy="22" r="4" fill={tokens.colors.primary.DEFAULT} opacity="0.8" />
                      <circle cx="65" cy="22" r="4" fill={tokens.colors.primary.DEFAULT} opacity="0.8" />
                      <rect x="22" y="8" width="36" height="4" rx="1" fill={tokens.semantic.features.text} opacity="0.7" />
                    </svg>
                  )},
                  { value: "alternating", label: "Alt", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.features.background} />
                      <rect x="4"  y="7"  width="30" height="14" rx="1.5" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="46" y="7"  width="30" height="14" rx="1.5" fill={tokens.colors.secondary.DEFAULT} opacity="0.5" />
                      <rect x="4"  y="29" width="30" height="14" rx="1.5" fill={tokens.colors.secondary.DEFAULT} opacity="0.5" />
                      <rect x="46" y="29" width="30" height="14" rx="1.5" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setFeaturesVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${featuresVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${featuresVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonials visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Testimonials</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "grid", label: "Grid", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.testimonials.background} />
                      <rect x="4"  y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="16" width="22" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="22" y="8" width="36" height="4" rx="1" fill={tokens.semantic.testimonials.text} opacity="0.7" />
                      <rect x="7"  y="20" width="16" height="2" rx="0.5" fill={tokens.semantic.testimonials.text} opacity="0.3" />
                      <rect x="7"  y="24" width="12" height="2" rx="0.5" fill={tokens.semantic.testimonials.text} opacity="0.3" />
                      <rect x="7"  y="31" width="8"  height="2" rx="0.5" fill={tokens.colors.primary.DEFAULT} opacity="0.7" />
                    </svg>
                  )},
                  { value: "featured", label: "Featured", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.testimonials.background} />
                      <rect x="4" y="7" width="72" height="20" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="4"  y="31" width="22" height="13" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="31" width="22" height="13" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="31" width="22" height="13" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                    </svg>
                  )},
                  { value: "wall", label: "Wall", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.testimonials.background} />
                      <rect x="4"  y="6"  width="22" height="16" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="6"  width="22" height="10" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="6"  width="22" height="20" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="4"  y="26" width="22" height="10" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="20" width="22" height="16" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="54" y="30" width="22" height="10" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setTestimonialsVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${testimonialsVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${testimonialsVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Pricing</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "cards", label: "Cards", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.pricing.background} />
                      <rect x="4"  y="12" width="22" height="28" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="8"  width="22" height="34" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.primary.DEFAULT} strokeWidth="1.5" />
                      <rect x="54" y="12" width="22" height="28" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="31" y="11" width="18" height="4" rx="1" fill={tokens.colors.primary.DEFAULT} opacity="0.7" />
                    </svg>
                  )},
                  { value: "compact", label: "Compact", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.pricing.background} />
                      <rect x="4" y="10" width="72" height="9" rx="1.5" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="4" y="22" width="72" height="9" rx="1.5" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.primary.DEFAULT} strokeWidth="1" />
                      <rect x="4" y="34" width="72" height="9" rx="1.5" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="60" y="23.5" width="12" height="6" rx="1" fill={tokens.colors.primary.DEFAULT} opacity="0.8" />
                    </svg>
                  )},
                  { value: "featured", label: "Featured", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.pricing.background} />
                      <rect x="4"  y="16" width="20" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="26" y="8"  width="28" height="36" rx="2" fill={tokens.colors.primary.DEFAULT} opacity="0.15" stroke={tokens.colors.primary.DEFAULT} strokeWidth="1.5" />
                      <rect x="56" y="16" width="20" height="22" rx="2" fill={tokens.colors.card.DEFAULT} stroke={tokens.colors.border} strokeWidth="0.5" />
                      <rect x="29" y="12" width="22" height="4" rx="1" fill={tokens.colors.primary.DEFAULT} opacity="0.8" />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setPricingVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${pricingVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${pricingVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA visual picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">CTA</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "centered", label: "Centered", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.cta.background} />
                      <rect x="16" y="12" width="48" height="6" rx="1" fill={tokens.semantic.cta.text} opacity="0.8" />
                      <rect x="22" y="22" width="36" height="3" rx="0.5" fill={tokens.semantic.cta.text} opacity="0.35" />
                      <rect x="26" y="32" width="28" height="8" rx="2" fill={tokens.semantic.cta.buttonBackground} />
                    </svg>
                  )},
                  { value: "split", label: "Split", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.cta.background} />
                      <rect x="4"  y="14" width="34" height="6" rx="1" fill={tokens.semantic.cta.text} opacity="0.8" />
                      <rect x="4"  y="24" width="28" height="3" rx="0.5" fill={tokens.semantic.cta.text} opacity="0.35" />
                      <rect x="52" y="18" width="24" height="10" rx="2" fill={tokens.semantic.cta.buttonBackground} />
                    </svg>
                  )},
                  { value: "banner", label: "Banner", thumb: (
                    <svg viewBox="0 0 80 50" className="w-full">
                      <rect width="80" height="50" fill={tokens.semantic.cta.background} />
                      <rect x="0" y="16" width="80" height="18" fill={tokens.semantic.cta.buttonBackground} opacity="0.15" />
                      <rect x="4" y="21" width="36" height="4" rx="1" fill={tokens.semantic.cta.text} opacity="0.7" />
                      <rect x="56" y="20" width="20" height="7" rx="1.5" fill={tokens.semantic.cta.buttonBackground} />
                    </svg>
                  )},
                ] as const).map(({ value, label, thumb }) => (
                  <button
                    key={value}
                    onClick={() => setCtaVariant(value)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${ctaVariant === value ? "border-foreground shadow-sm" : "border-transparent hover:border-neutral-300"}`}
                    title={label}
                  >
                    {thumb}
                    <div className={`text-center py-1 text-[10px] font-medium ${ctaVariant === value ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* Preview */}
      <main className={`flex-1 overflow-y-auto transition-colors ${darkPreview ? "bg-zinc-900" : "bg-neutral-100"}`}>
        <div className="min-h-screen p-10">
        <div
          className={`max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden ${darkPreview ? "ring-1 ring-white/10" : "bg-white"}`}
          style={{ ...tokensToVars(tokens) as React.CSSProperties, fontFamily: tokens.typography.fontSans }}
        >
          {sections.navbar && navbarVariant === "default"   && <PreviewNavbar tokens={tokens} brandName={brandName} />}
          {sections.navbar && navbarVariant === "centered"  && <NavbarCentered tokens={tokens} brandName={brandName} />}
          {sections.navbar && navbarVariant === "minimal"   && <NavbarMinimal  tokens={tokens} brandName={brandName} />}
          <div
            className="flex-1 bg-gray-50"
            style={tokensToVars(tokens) as React.CSSProperties}
          >
            {sections.hero && heroVariant === "centered" && <Hero      tokens={tokens} brandName={brandName} headline={heroContent.headline || undefined} subheadline={heroContent.subheadline || undefined} ctaLabel={heroContent.ctaLabel || undefined} />}
            {sections.hero && heroVariant === "split"    && <HeroSplit tokens={tokens} brandName={brandName} headline={heroContent.headline || undefined} subheadline={heroContent.subheadline || undefined} ctaLabel={heroContent.ctaLabel || undefined} />}
          </div>
          {sections.features && featuresVariant === "grid"        && <Features           tokens={tokens} />}
          {sections.features && featuresVariant === "icons"       && <FeaturesIcons      tokens={tokens} />}
          {sections.features && featuresVariant === "alternating" && <FeaturesAlternating tokens={tokens} />}
          {sections.testimonials && testimonialsVariant === "grid"     && <Testimonials         tokens={tokens} />}
          {sections.testimonials && testimonialsVariant === "featured"  && <TestimonialsFeatured  tokens={tokens} />}
          {sections.testimonials && testimonialsVariant === "wall"      && <TestimonialsWall      tokens={tokens} />}
          {sections.pricing && pricingVariant === "cards"    && <Pricing         tokens={tokens} />}
          {sections.pricing && pricingVariant === "compact"  && <PricingCompact  tokens={tokens} />}
          {sections.pricing && pricingVariant === "featured" && <PricingFeatured tokens={tokens} />}
          {sections.cta && ctaVariant === "centered" && <CTA       tokens={tokens} heading={ctaContent.heading || undefined} subheading={ctaContent.subheading || undefined} ctaLabel={ctaContent.ctaLabel || undefined} />}
          {sections.cta && ctaVariant === "split"    && <CTASplit   tokens={tokens} heading={ctaContent.heading || undefined} subheading={ctaContent.subheading || undefined} ctaLabel={ctaContent.ctaLabel || undefined} />}
          {sections.cta && ctaVariant === "banner"   && <CTABanner  tokens={tokens} heading={ctaContent.heading || undefined} ctaLabel={ctaContent.ctaLabel || undefined} />}
        </div>
        </div>
      </main>

      </div>
    </div>
  );
}