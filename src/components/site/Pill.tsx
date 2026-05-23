import type { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs text-muted-foreground glass">
      <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_12px_oklch(0.78_0.14_230)] animate-pulse-dot" />
      {children}
    </span>
  );
}
