"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

const MIN_WIDTH = 1024;

export function DesktopGate({ children }: { children: React.ReactNode }) {
  const [isWide, setIsWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    setIsWide(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Avoid flash — render nothing until we know the screen size
  if (isWide === null) return null;

  if (!isWide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Monitor className="w-8 h-8 text-primary" />
        </div>
        <div className="max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Desktop required
          </h1>
          <p className="text-muted-foreground">
            The UI Generator is a design tool that needs a larger screen to work
            properly. Please open it on a laptop or desktop.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
