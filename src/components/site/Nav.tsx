import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
] as const;

export function Brand() {
  return (
    <div className="flex items-center gap-2.5 select-none cursor-default">
      <span
        className="relative w-[22px] h-[22px] rounded-md overflow-hidden"
        style={{
          background:
            "conic-gradient(from 200deg, var(--color-accent), var(--color-background), var(--color-accent))",
        }}
      >
        <span className="absolute inset-[3px] rounded-[4px] bg-background" />
      </span>
      <span className="font-bold text-[18px] tracking-[-0.02em]">PINFUEL</span>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Safe default for SSR/SSG
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-[10px] border border-border hover:bg-surface-2 transition-colors text-foreground flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-border backdrop-blur-xl bg-background/80"
    >
      <div className="container-x flex items-center justify-between gap-8 py-3.5">
        <Brand />
        <div className="hidden md:flex gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-[10px] text-[13px] border border-border-strong hover:bg-surface-2 transition-all"
          >
            Book a Call
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2.5 rounded-[10px] text-[13px] font-medium bg-foreground text-background hover:shadow-[0_0_40px_var(--color-accent)] transition-all"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
