"use client";

import { Monitor } from "lucide-react";

export function DesktopGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile/tablet: show "desktop required" message */}
      <div className="flex lg:hidden flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-6">
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

      {/* Desktop: show generator */}
      <div className="hidden lg:contents">
        {children}
      </div>
    </>
  );
}
