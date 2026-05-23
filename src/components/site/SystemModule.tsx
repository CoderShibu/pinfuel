import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SystemModuleProps {
  id: string;
  title: string;
  desc: string;
  index: number;
  metrics: { label: string; value: string; color: string }[];
  tags: string[];
  onBook?: (title: string) => void;
}

function MiniBarChart({ color }: { color: string }) {
  const bars = Array.from({ length: 16 }, (_, i) => ({
    height: Math.random() * 60 + 20,
    delay: i * 0.05,
  }));

  return (
    <div className="flex items-end gap-[3px] h-16 w-full">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm opacity-80"
          style={{ backgroundColor: color }}
          initial={{ height: "20%" }}
          animate={{ height: [`${bar.height}%`, `${Math.random() * 60 + 20}%`, `${bar.height}%`] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: bar.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function LivePulse() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
        animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
    </span>
  );
}

export function SystemModule({ id, title, desc, index, metrics, tags, onBook }: SystemModuleProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <motion.div
      layout
      onClick={handleToggle}
      className="relative border border-border rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 group"
      style={{
        background: expanded
          ? "oklch(0.78 0.14 300 / 0.15)"
          : "oklch(0.78 0.14 300 / 0.15)",
        borderColor: expanded
          ? "oklch(0.78 0.14 300 / 0.15)"
          : "oklch(0.78 0.14 300 / 0.15)",
        boxShadow: expanded ? "0 0 40px oklch(0.78 0.14 300 / 0.15)" : "none",
      }}
      whileHover={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
    >
      {/* Sweep shimmer on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.78 0.14 300 / 0.15) 50%, transparent 100%)",
          x: "-100%",
        }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Header row */}
      <div className="px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <span className="text-xl font-mono text-border-strong group-hover:text-accent/60 transition-colors duration-300">
            {id}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "oklch(0.78 0.14 300 / 0.15)",
                    color: "oklch(0.78 0.14 300 / 0.15)",
                    background: "oklch(0.78 0.14 300 / 0.15)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:w-1/3">
          <p className="text-sm font-mono text-muted-foreground leading-relaxed flex-1">{desc}</p>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-subtle group-hover:border-accent group-hover:text-accent transition-colors shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t px-8 pb-8 pt-6 grid md:grid-cols-3 gap-6" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}>

              {/* Live metrics */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <LivePulse />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent">Live Telemetry</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-lg border" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}>
                      <div className="text-[9px] uppercase tracking-widest text-subtle mb-1 font-mono">{m.label}</div>
                      <motion.div
                        className="text-xl font-bold font-mono"
                        style={{ color: m.color }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * metrics.indexOf(m) }}
                      >
                        {m.value}
                      </motion.div>
                    </div>
                  ))}
                </div>
                <MiniBarChart color="oklch(0.78 0.14 300)" />
              </div>

              {/* Status panel */}
              <div className="p-4 rounded-lg border space-y-3" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}>
                <div className="text-[9px] uppercase tracking-widest text-accent font-mono mb-3">System Status</div>
                {["Core Engine", "Data Feed", "Output Layer"].map((item, i) => (
                  <div key={item} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-subtle">{item}</span>
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                      <span className="text-green-400">ACTIVE</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}>
                  <div className="text-[9px] uppercase font-mono text-subtle mb-1">Efficiency Index</div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "oklch(0.78 0.14 300)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${75 + index * 5}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onBook) onBook(title);
                    }}
                    className="w-full py-2.5 rounded border border-accent bg-accent/10 text-accent font-mono text-[10px] uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors shadow-[0_0_15px_var(--color-accent)]"
                  >
                    Enter This System →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
