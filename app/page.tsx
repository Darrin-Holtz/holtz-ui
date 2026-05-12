import type { Metadata } from "next";
import { ProductRow } from "./components/ProductRow";

export const metadata: Metadata = {
  title: "HoltzDigitalUI — Tailwind CSS Templates, UI Kits & Icons Marketplace",
  description:
    "Discover premium Tailwind CSS templates, UI kits, and icon sets. The best marketplace for developers and designers to buy and sell digital products.",
  alternates: { canonical: "https://holtzdigitalui.com" },
  openGraph: {
    url: "https://holtzdigitalui.com",
    title: "HoltzDigitalUI — Tailwind CSS Templates, UI Kits & Icons Marketplace",
    description:
      "Discover premium Tailwind CSS templates, UI kits, and icon sets. The best marketplace for developers and designers to buy and sell digital products.",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HoltzDigitalUI",
  url: "https://holtzdigitalui.com",
  description:
    "The premier marketplace for Tailwind CSS templates, UI kits, and icon sets.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://holtzdigitalui.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          HoltzDigitalUi stands out as the premier marketplace for all things related
          to tailwindcss, offering an unparalleled platform for both sellers and
          buyers alike.
        </p>
      </div>
      <ProductRow category="newest"/>
      <ProductRow category="templates"/>
      <ProductRow category="uikits"/>
      <ProductRow category="icons"/>
    </section>
  );
}
