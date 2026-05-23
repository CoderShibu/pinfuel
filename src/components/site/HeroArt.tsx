import { motion } from "motion/react";

export function HeroArt() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-[460px] hidden lg:flex items-center justify-center"
      aria-hidden
    >
      <div
        className="absolute w-[420px] h-[420px] rounded-full border border-foreground/30 animate-spin-slow"
        style={{ animationDuration: "40s" }}
      >
        <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]" />
      </div>
      <div
        className="absolute w-[300px] h-[300px] rounded-full border border-foreground/50 animate-spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "28s" }}
      >
        <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]" />
      </div>
      <div
        className="absolute w-[180px] h-[180px] rounded-full border border-foreground/70 animate-spin-slow"
        style={{ animationDuration: "18s" }}
      >
        <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]" />
      </div>
      <div
        className="relative z-10 w-20 h-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-background), var(--color-accent) 80%)",
          boxShadow:
            "0 0 60px oklch(from var(--color-accent) l c h / 0.15), inset 0 0 30px rgba(0,0,0,0.5)",
        }}
      />
    </motion.div>
  );
}
