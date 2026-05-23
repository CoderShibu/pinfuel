import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface Score {
  label: string;
  value: number;
  color: string;
  insight: string;
}

const SCORES: Score[] = [
  { label: "Brand Identity Score", value: 42, color: "#ef4444", insight: "Your brand lacks visual memorability and consistent identity signals." },
  { label: "Attention Retention", value: 68, color: "#eab308", insight: "High posting frequency but weak emotional positioning reduces retention." },
  { label: "Culture Relevance", value: 89, color: "#22c55e", insight: "Strong cultural resonance detected — excellent native content alignment." },
  { label: "Audience Intelligence", value: 57, color: "#3b82f6", insight: "Audience segmentation is broad. Deeper niche targeting recommended." },
];

const RADAR_AXES = [
  "Identity", "Retention", "Culture", "Reach", "Engagement", "Conversion"
];

function RadarChart({ scores }: { scores: number[] }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const n = RADAR_AXES.length;

  const getPoint = (i: number, radius: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = scores.map((s, i) => getPoint(i, (s / 100) * r));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => getPoint(i, r * level));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
        return (
          <path
            key={level}
            d={path}
            fill="none"
            stroke="oklch(0.78 0.14 300 / 0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* Spokes */}
      {Array.from({ length: n }, (_, i) => {
        const outer = getPoint(i, r);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={outer.x} y2={outer.y}
            stroke="oklch(0.78 0.14 300 / 0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data shape */}
      <motion.path
        d={dataPath}
        fill="oklch(0.78 0.14 300 / 0.15)"
        stroke="oklch(0.78 0.14 300)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r={3}
          fill="oklch(0.78 0.14 300)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 + i * 0.08 }}
        />
      ))}

      {/* Labels */}
      {Array.from({ length: n }, (_, i) => {
        const lp = getPoint(i, r + 18);
        return (
          <text
            key={i}
            x={lp.x} y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="oklch(0.78 0.14 300)"
            fontSize="7"
            fontFamily="monospace"
          >
            {RADAR_AXES[i]}
          </text>
        );
      })}
    </svg>
  );
}

function ScoreBar({ score, index }: { score: Score; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-subtle">{score.label}</span>
        <span className="font-mono text-sm font-bold" style={{ color: score.color }}>{score.value}/100</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden mb-1" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: score.color }}
          initial={{ width: 0 }}
          animate={{ width: `${score.value}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.12, ease: "easeOut" }}
        />
      </div>
      <p className="text-[10px] font-mono text-subtle leading-snug">{score.insight}</p>
    </motion.div>
  );
}

interface DigitalAnalyzerResultsProps {
  onReset: () => void;
}

export function DigitalAnalyzerResults({ onReset }: DigitalAnalyzerResultsProps) {
  const radarScores = [42, 68, 89, 57, 73, 61];
  const overall = Math.round(radarScores.reduce((a, b) => a + b, 0) / radarScores.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-green-500"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Analysis Complete</span>
        </div>
        <button
          onClick={onReset}
          className="text-[10px] font-mono uppercase tracking-widest text-subtle hover:text-accent transition-colors border border-border px-3 py-1.5 rounded"
        >
          Run New Scan
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_200px] gap-6 mb-6">
        {/* Score bars */}
        <div
          className="p-6 rounded-xl border space-y-5"
          style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
        >
          <h2 className="text-2xl font-bold tracking-tight mb-6">System Report</h2>
          {SCORES.map((s, i) => <ScoreBar key={s.label} score={s} index={i} />)}
        </div>

        {/* Radar chart + overall score */}
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl border flex flex-col items-center"
            style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-accent mb-3">Presence Map</div>
            <RadarChart scores={radarScores} />
          </div>

          <div
            className="p-4 rounded-xl border text-center"
            style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-subtle mb-1">Overall Score</div>
            <motion.div
              className="text-5xl font-bold font-mono"
              style={{ color: "oklch(0.78 0.14 300)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              {overall}
            </motion.div>
            <div className="text-[9px] font-mono text-subtle">/100</div>
          </div>
        </div>
      </div>

      {/* Critical insights */}
      <div
        className="p-6 rounded-xl border mb-6"
        style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">Critical Insights</div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "→", text: "Your brand lacks visual memorability. Immediate identity architecture required.", urgency: "HIGH" },
            { icon: "→", text: "Strong cultural alignment detected. Capitalize with creator economy partnerships.", urgency: "MED" },
            { icon: "→", text: "Growth potential within creator ecosystem confirmed. Scale with AI content systems.", urgency: "OPP" },
          ].map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="p-3 rounded-lg border space-y-2"
              style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-accent font-mono">{insight.icon}</span>
                <span
                  className="text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded"
                  style={{
                    color: insight.urgency === "HIGH" ? "#ef4444" : insight.urgency === "MED" ? "#eab308" : "#22c55e",
                    background: insight.urgency === "HIGH" ? "#ef444420" : insight.urgency === "MED" ? "#eab30820" : "#22c55e20",
                  }}
                >
                  {insight.urgency}
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground leading-snug">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="p-6 rounded-xl border text-center"
        style={{
          borderColor: "oklch(0.78 0.14 300 / 0.15)",
          background: "radial-gradient(ellipse at top, oklch(0.78 0.14 300 / 0.15), transparent 70%)",
        }}
      >
        <p className="font-mono text-sm text-white mb-4">Want PINFUEL to engineer this system?</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest text-black font-bold transition-all"
          style={{
            background: "oklch(0.78 0.14 300)",
            boxShadow: "0 0 30px oklch(0.78 0.14 300 / 0.15)",
          }}
        >
          Initialize Project System →
        </a>
      </div>
    </motion.div>
  );
}

interface ScanningScreenProps {
  progress: number;
  scanText: string;
}

export function ScanningScreen({ progress, scanText }: ScanningScreenProps) {
  const [logLines, setLogLines] = useState<string[]>(["[SYS] Initializing digital intelligence scanner..."]);

  useEffect(() => {
    const LOG_FEED = [
      "[NET] Resolving brand entity endpoints...",
      "[AI] Loading audience behavior models...",
      "[SCAN] Mapping social graph topology...",
      "[ML] Computing attention retention index...",
      "[CULT] Cross-referencing culture signal database...",
      "[ID] Reconstructing identity architecture vectors...",
      "[PERF] Running engagement pattern analysis...",
      "[SYS] Calculating final intelligence report...",
      "[DONE] Compilation complete. Rendering output...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOG_FEED.length) {
        setLogLines((prev) => [...prev.slice(-6), LOG_FEED[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="scanning"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center py-12 w-full max-w-2xl mx-auto"
    >
      {/* Radar */}
      <div className="relative w-56 h-56 mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              inset: `${i * 14}%`,
              borderColor: `oklch(0.78 0.14 300)/ ${0.4 - i * 0.08})`,
            }}
          />
        ))}
        {/* Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }} />
        </div>
        {/* Sweep */}
        <motion.div
          className="absolute inset-0 rounded-full origin-center"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, oklch(0.78 0.14 300 / 0.15) 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Blip dots */}
        {[
          { top: "25%", left: "60%" },
          { top: "65%", left: "30%" },
          { top: "45%", left: "75%" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ ...pos, background: "oklch(0.78 0.14 300)", boxShadow: "0 0 6px oklch(0.78 0.14 300)" }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ background: "oklch(0.78 0.14 300)", boxShadow: "0 0 16px oklch(0.78 0.14 300)" }}
        />
      </div>

      {/* Scan text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scanText}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-lg font-mono mb-6"
          style={{ color: "oklch(0.78 0.14 300)" }}
        >
          {scanText}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-2">
        <div className="h-px rounded-full overflow-hidden" style={{ background: "oklch(0.78 0.14 300 / 0.15)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "oklch(0.78 0.14 300)", boxShadow: "0 0 10px oklch(0.78 0.14 300)" }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-subtle mt-1">
          <span>SCANNING</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Terminal log */}
      <div
        className="w-full max-w-sm mt-6 p-4 rounded-lg border text-left font-mono text-[10px] space-y-1"
        style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.78 0.14 300 / 0.15)" }}
      >
        {logLines.map((line, i) => (
          <motion.div
            key={i + line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-subtle"
          >
            <span style={{ color: "oklch(0.78 0.14 300 / 0.15)" }}>&gt; </span>
            {line}
          </motion.div>
        ))}
        <motion.span
          className="inline-block w-1.5 h-3 ml-1 align-middle"
          style={{ background: "oklch(0.78 0.14 300)" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
