import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeneratorClient from "./GeneratorClient";
import { DesktopGate } from "./DesktopGate";

export const metadata: Metadata = {
  title: "Free Tailwind CSS Landing Page Generator",
  description:
    "Build beautiful Tailwind CSS landing pages in minutes. Customize colors, fonts, and sections — then copy the code or export a full Next.js project. 100% free.",
  keywords: [
    "free Tailwind CSS generator",
    "Tailwind landing page builder",
    "Tailwind CSS section generator",
    "Next.js landing page generator",
    "Tailwind CSS code generator",
    "tailwind ui builder",
    "free landing page generator",
  ],
  openGraph: {
    title: "Free Tailwind CSS Landing Page Generator — HoltzDigitalUI",
    description:
      "Customize colors, fonts, and sections — then copy the code or export a full Next.js project. 100% free, no credit card required.",
    url: "https://holtzdigitalui.com/generator",
  },
  twitter: {
    title: "Free Tailwind CSS Landing Page Generator",
    description:
      "Customize colors, fonts, and sections — then copy the code or export a full Next.js project. 100% free.",
  },
  alternates: {
    canonical: "https://holtzdigitalui.com/generator",
  },
};

export default async function GeneratorPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DesktopGate>
      <GeneratorClient isAuthenticated={Boolean(user)} />
    </DesktopGate>
  );
}
