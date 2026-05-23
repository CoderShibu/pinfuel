import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project — PINFUEL" },
      { name: "description", content: "Initialize your project with PINFUEL. A cinematic onboarding workflow to engineer your digital presence." },
    ],
  }),
  component: ContactPage,
});

const INDUSTRIES = ["Gaming", "Fashion", "Startup", "Tech", "Creator", "Luxury", "Esports", "Health", "Finance"];
const GOALS = [
  "Build Brand Authority",
  "Improve Digital Identity",
  "Increase Engagement",
  "Dominate Niche",
  "Scale Community",
  "Launch AI Content System",
];

const PROCESSING_LOGS = [
  "[SYS] Receiving project transmission...",
  "[NET] Establishing secure intelligence channel...",
  "[AI] Analyzing project parameters...",
  "[MATCH] Identifying optimal system architecture...",
  "[BUILD] Generating strategic intelligence brief...",
  "[ASSIGN] Routing to senior system architect...",
  "[DONE] Transmission confirmed. Stand by.",
];

const STEP_LABELS = [
  "Identification",
  "Sector",
  "Current State",
  "Objectives",
  "Parameters",
  "Review",
];

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-subtle mb-4">
        <span>Project Initialization</span>
        <span className="text-accent">
          {step}/{total}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden bg-accent/15">
            {i < step && (
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
            {i === step - 1 && (
              <motion.div
                className="h-full rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                layoutId="active-step"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 font-mono text-[9px] text-subtle uppercase tracking-widest">
        {STEP_LABELS[step - 1]}
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  required,
  autoFocus,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={`text-[9px] font-mono uppercase tracking-widest block mb-2 transition-colors ${focused ? "text-accent" : "text-accent/70"}`}>
        {label}
      </label>
      <input
        required={required}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b px-0 py-3 font-mono text-lg focus:outline-none transition-colors placeholder-subtle"
        style={{ borderColor: focused ? "var(--color-accent)" : "oklch(from var(--color-accent) l c h / 0.15)", color: "var(--color-foreground)" }}
      />
    </div>
  );
}

function ProcessingScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    if (logIdx < PROCESSING_LOGS.length) {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, PROCESSING_LOGS[logIdx]]);
        setLogIdx((i) => i + 1);
      }, 550);
      return () => clearTimeout(t);
    }
  }, [logIdx]);

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center py-8"
    >
      {/* Rotating scan ring */}
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 rounded-full border border-accent/15" />
        <div className="absolute inset-4 rounded-full border border-accent/15" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 270deg, oklch(from var(--color-accent) l c h / 0.15) 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Pulse center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-accent"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>

      <h2 className="text-xl font-mono mb-6 text-accent">
        Transmitting Project Intelligence...
      </h2>

      {/* Terminal log */}
      <div
        className="w-full max-w-md text-left p-4 rounded-xl border font-mono text-[10px] space-y-2"
        style={{
          background: "oklch(from var(--color-accent) l c h / 0.15)",
          borderColor: "oklch(from var(--color-accent) l c h / 0.15)",
        }}
      >
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-subtle"
            >
              <span style={{ color: "oklch(from var(--color-accent) l c h / 0.15)" }}>&gt; </span>
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.span
          className="inline-block w-2 h-3 align-middle ml-1 bg-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="text-center p-12 rounded-2xl border"
      style={{
        borderColor: "oklch(from var(--color-accent) l c h / 0.15)",
        background: "radial-gradient(ellipse at top, oklch(from var(--color-accent) l c h / 0.15), transparent 70%)",
      }}
    >
      {/* Icon */}
      <div className="relative inline-flex mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center bg-accent shadow-[0_0_50px_oklch(from_var(--color-accent)_l_c_h_/_0.15)]"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Outer pulse rings */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-accent/15"
            style={{
              inset: `-${i * 12}px`,
            }}
            animate={{ opacity: [0.5, 0], scale: [1, 1.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      <div
        className="text-[10px] font-mono uppercase tracking-widest mb-3 text-accent"
      >
        Transmission Complete
      </div>
      <h2 className="text-3xl font-bold mb-4 tracking-tight">System Initialized</h2>
      <p className="font-mono text-sm text-subtle mb-10 max-w-sm mx-auto leading-relaxed">
        Your project request has entered the PINFUEL intelligence system. A senior system architect
        will contact you within 24 hours to begin strategic transmission.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <MagneticButton
          to="/"
          variant="outline"
          className="font-mono text-xs uppercase tracking-widest border-accent/15 text-accent"
        >
          ← Return to OS
        </MagneticButton>
        <MagneticButton
          to="/analyzer"
          className="font-mono text-xs uppercase tracking-widest text-accent-foreground font-bold bg-accent shadow-[0_0_20px_var(--color-accent)]"
        >
          Analyze Presence ⎋
        </MagneticButton>
      </div>
    </motion.div>
  );
}

function ContactPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const TOTAL_STEPS = 6;

  const next = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };
  const back = () => { if (step > 1) setStep((s) => s - 1); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, PROCESSING_LOGS.length * 550 + 500);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const stepVariants = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };
  const transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row pt-24 pb-16 px-4 md:px-12 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-15" style={{ background: "radial-gradient(ellipse at bottom, var(--color-accent), transparent 55%)" }} />

      {/* LEFT COLUMN: Founders & Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 mb-16 lg:mb-0 lg:pr-12">
        <div className="max-w-md mx-auto lg:mx-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-balance"
          >
            Initialize Connection.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-12 text-lg leading-relaxed"
          >
            Bypass the gatekeepers. Directly interface with the core architects of the PINFUEL system to engineer your digital dominance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-subtle mb-6 border-b border-border pb-2">The Architects</h3>
            <div className="space-y-4">
              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">SB</div>
                <div>
                  <div className="font-bold text-lg">Shibasish Banerjee</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CEO & Lead Strategist</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder1@pinfuel.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">VA</div>
                <div>
                  <div className="font-bold text-lg">Varsha A</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CTO & Growth Engineer</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder2@pinfuel.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center z-10 relative">
        <div className="w-full max-w-lg relative glass-panel p-8 md:p-12 rounded-3xl">
          {/* Step indicator */}
        {!isProcessing && !isComplete && (
          <StepIndicator step={step} total={TOTAL_STEPS} />
        )}

        <AnimatePresence mode="wait">

          {/* STEP 1 — IDENTIFICATION */}
          {step === 1 && !isProcessing && !isComplete && (
            <motion.div key="s1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 01
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">System Identification</h2>
              <form onSubmit={next} className="space-y-7">
                <InputField label="Company / Brand Name" required autoFocus />
                <InputField label="Founder / Lead Name" required />
                <InputField label="Website URL" type="url" placeholder="https://" />
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground transition-all bg-accent shadow-[0_0_20px_var(--color-accent)]"
                  >
                    Proceed →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2 — INDUSTRY */}
          {step === 2 && !isProcessing && !isComplete && (
            <motion.div key="s2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 02
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Industry Sector</h2>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setSelectedIndustry(ind)}
                    className="p-3 rounded-lg border font-mono text-sm transition-all duration-200 text-center"
                    style={{
                      borderColor: selectedIndustry === ind ? "var(--color-accent)" : "oklch(from var(--color-accent) l c h / 0.15)",
                      background: selectedIndustry === ind ? "oklch(from var(--color-accent) l c h / 0.15)" : "transparent",
                      color: selectedIndustry === ind ? "var(--color-accent)" : "var(--color-accent)",
                      boxShadow: selectedIndustry === ind ? "0 0 16px oklch(from var(--color-accent) l c h / 0.15)" : "none",
                    }}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={back} className="px-5 py-3 rounded-md font-mono text-xs uppercase tracking-widest border text-muted-foreground hover:text-foreground transition-colors border-accent/15">
                  ← Back
                </button>
                <button type="button" onClick={() => selectedIndustry && next()} className="px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground transition-all disabled:opacity-40" style={{ background: selectedIndustry ? "var(--color-accent)" : "oklch(from var(--color-accent) l c h / 0.15)" }}>
                  Proceed →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — CURRENT STATE */}
          {step === 3 && !isProcessing && !isComplete && (
            <motion.div key="s3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 03
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Current Digital State</h2>
              <form onSubmit={next} className="space-y-7">
                <InputField label="Primary Social Link (Instagram, X, etc.)" required type="url" placeholder="https://" />
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block mb-2 text-accent">
                    Current Audience Size
                  </label>
                  <select
                    required
                    className="w-full bg-transparent border-b py-3 font-mono text-lg focus:outline-none appearance-none transition-colors"
                    style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", color: "var(--color-foreground)" }}
                  >
                    <option value="" disabled>Select size...</option>
                    <option value="0-10k" style={{ background: "var(--color-background)" }}>0 – 10,000</option>
                    <option value="10k-100k" style={{ background: "var(--color-background)" }}>10,000 – 100,000</option>
                    <option value="100k-500k" style={{ background: "var(--color-background)" }}>100,000 – 500,000</option>
                    <option value="500k+" style={{ background: "var(--color-background)" }}>500,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block mb-2 text-accent">
                    Primary Growth Blocker
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="What is holding your growth back?"
                    className="w-full bg-transparent border-b py-3 font-mono text-sm focus:outline-none resize-none transition-colors placeholder-subtle"
                    style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", color: "var(--color-foreground)" }}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={back} className="px-5 py-3 rounded-md font-mono text-xs uppercase tracking-widest border text-muted-foreground hover:text-foreground transition-colors border-accent/15">
                    ← Back
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground bg-accent shadow-[0_0_20px_var(--color-accent)]">
                    Proceed →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4 — OBJECTIVES */}
          {step === 4 && !isProcessing && !isComplete && (
            <motion.div key="s4" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 04
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Primary Objectives</h2>
              <div className="space-y-2.5 mb-10">
                {GOALS.map((goal) => {
                  const selected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className="w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all duration-200 font-mono text-sm"
                      style={{
                        borderColor: selected ? "oklch(from var(--color-accent) l c h / 0.15)" : "oklch(from var(--color-accent) l c h / 0.15)",
                        background: selected ? "oklch(from var(--color-accent) l c h / 0.15)" : "transparent",
                        color: selected ? "#fff" : "var(--color-accent)",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: selected ? "var(--color-accent)" : "oklch(from var(--color-accent) l c h / 0.15)",
                          background: selected ? "var(--color-accent)" : "transparent",
                        }}
                      >
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="black" strokeWidth="2">
                            <path d="M2 6l3 3 5-5" />
                          </svg>
                        )}
                      </div>
                      {goal}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={back} className="px-5 py-3 rounded-md font-mono text-xs uppercase tracking-widest border text-muted-foreground hover:text-foreground transition-colors border-accent/15">
                  ← Back
                </button>
                <button type="button" onClick={() => next()} className="px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground bg-accent">
                  Proceed →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5 — PARAMETERS */}
          {step === 5 && !isProcessing && !isComplete && (
            <motion.div key="s5" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 05
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Parameters</h2>
              <form onSubmit={next} className="space-y-8">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block mb-2 text-accent">
                    Monthly Investment Range
                  </label>
                  <Select required>
                    <SelectTrigger 
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none py-3 h-auto font-mono text-lg focus:outline-none focus:ring-0 shadow-none px-0"
                      style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", color: "var(--color-foreground)" }}
                    >
                      <SelectValue placeholder="Select range..." />
                    </SelectTrigger>
                    <SelectContent className="font-mono text-sm border" style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", background: "var(--color-background)" }}>
                      <SelectItem value="5k-10k">$5k – $10k / month</SelectItem>
                      <SelectItem value="10k-25k">$10k – $25k / month</SelectItem>
                      <SelectItem value="25k-50k">$25k – $50k / month</SelectItem>
                      <SelectItem value="50k+">$50k+ / month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block mb-2 text-accent">
                    Urgency Level
                  </label>
                  <Select required>
                    <SelectTrigger 
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none py-3 h-auto font-mono text-lg focus:outline-none focus:ring-0 shadow-none px-0"
                      style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", color: "var(--color-foreground)" }}
                    >
                      <SelectValue placeholder="Select urgency..." />
                    </SelectTrigger>
                    <SelectContent className="font-mono text-sm border" style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", background: "var(--color-background)" }}>
                      <SelectItem value="low">Low — Exploring options</SelectItem>
                      <SelectItem value="medium">Medium — Ready in 1–2 months</SelectItem>
                      <SelectItem value="high">High — Need immediate execution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={back} className="px-5 py-3 rounded-md font-mono text-xs uppercase tracking-widest border text-muted-foreground hover:text-foreground transition-colors border-accent/15">
                    ← Back
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground bg-accent">
                    Review →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 6 — REVIEW & SUBMIT */}
          {step === 6 && !isProcessing && !isComplete && (
            <motion.div key="s6" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <div className="text-[9px] font-mono uppercase tracking-widest mb-2 text-accent">
                Module 06
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">Final Review</h2>
              <p className="font-mono text-subtle text-sm mb-8">Verify system input before initializing transmission.</p>

              <div
                className="rounded-xl border p-6 mb-8 space-y-3 font-mono text-sm"
                style={{ borderColor: "oklch(from var(--color-accent) l c h / 0.15)", background: "oklch(from var(--color-accent) l c h / 0.15)" }}
              >
                {[
                  { key: "Target", val: "Digital Transformation" },
                  { key: "Sector", val: selectedIndustry || "—" },
                  { key: "Goals", val: selectedGoals.length ? `${selectedGoals.length} objective(s) selected` : "—" },
                  { key: "Status", val: "Awaiting Transmission", highlight: true },
                ].map(({ key, val, highlight }) => (
                  <div key={key} className="flex justify-between border-b pb-3 last:border-0 last:pb-0 border-accent/15">
                    <span className="text-[9px] uppercase tracking-widest text-subtle">{key}</span>
                    <span style={{ color: highlight ? "#eab308" : "#fff" }}>{val}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={submit} className="flex gap-3">
                <button type="button" onClick={back} className="px-5 py-3 rounded-md font-mono text-xs uppercase tracking-widest border text-subtle hover:text-white transition-colors border-accent/15">
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold text-accent-foreground transition-all"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 30px oklch(from var(--color-accent) l c h / 0.15)",
                  }}
                >
                  Initialize System ⟶
                </button>
              </form>
            </motion.div>
          )}

          {/* PROCESSING */}
          {isProcessing && <ProcessingScreen key="processing" />}

          {/* SUCCESS */}
          {isComplete && <SuccessScreen key="success" />}

        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
