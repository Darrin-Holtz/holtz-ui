import { Hero } from "./components/sections/Hero";
import { defaultTokens } from "@/lib/tokens";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero tokens={defaultTokens} />
    </main>
  );
}
