import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AnimatedGrid } from "./AnimatedGrid";

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <header className="relative pt-44 pb-24 overflow-hidden">
      <AnimatedGrid />
      <div aria-hidden className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full opacity-40 blur-[120px] animate-float-blob" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }} />
      <div className="container-x relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="label-eyebrow"
        ><span className="star">✦</span> {eyebrow}</motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mt-5 text-[clamp(44px,7vw,84px)] font-bold leading-[1.02] tracking-[-0.035em] text-gradient text-balance max-w-4xl"
        >{title}</motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-[560px] leading-[1.65]"
          >{subtitle}</motion.p>
        )}
      </div>
    </header>
  );
}
