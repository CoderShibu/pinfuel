import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScanningScreen, DigitalAnalyzerResults } from "@/components/site/DigitalAnalyzer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/analyzer")({
  head: () => ({
    meta: [
      { title: "AI Digital Presence Analyzer — PINFUEL" },
      {
        name: "description",
        content:
          "Run a full AI-powered scan of your digital presence. Get brand identity scores, attention retention analysis, and critical growth insights.",
      },
    ],
  }),
  component: AnalyzerPage,
});

const SCAN_MESSAGES = [
  "Scanning audience behavior...",
  "Mapping digital identity architecture...",
  "Analyzing attention retention signals...",
  "Evaluating culture relevance index...",
  "Cross-referencing engagement patterns...",
  "Finalizing intelligence report...",
];

function InputField({
  label,
  type = "text",
  placeholder,
  required,
  autoFocus,
  id,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  id: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[9px] font-mono uppercase tracking-widest block mb-2 transition-colors"
        style={{ color: focused ? "oklch(0.78 0.14 300)" : "oklch(0.78 0.14 300)" }}
      >
        {label}
      </label>
      <input
        id={id}
        required={required}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border rounded-md px-4 py-3 font-mono text-sm focus:outline-none transition-all placeholder-subtle"
        style={{
          borderColor: focused ? "oklch(0.78 0.14 300 / 0.15)" : "oklch(0.78 0.14 300 / 0.15)",
          background: focused ? "oklch(0.78 0.14 300 / 0.15)" : "oklch(0.78 0.14 300 / 0.15)",
          color: "#fff",
          boxShadow: focused ? "0 0 16px oklch(0.78 0.14 300 / 0.15)" : "none",
        }}
      />
    </div>
  );
}

function AnalyzerPage() {
  const [step, setStep] = useState<"input" | "scanning" | "results">("input");
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState(SCAN_MESSAGES[0]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("scanning");
    setProgress(0);
  };

  useEffect(() => {
    if (step !== "scanning") return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      const msgIdx = Math.min(
        Math.floor(current / (100 / SCAN_MESSAGES.length)),
        SCAN_MESSAGES.length - 1,
      );
      setScanText(SCAN_MESSAGES[msgIdx]);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep("results"), 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [step]);

  const handleReset = () => {
    setStep("input");
    setProgress(0);
    setScanText(SCAN_MESSAGES[0]);
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden flex flex-col justify-center items-center pt-24 pb-16 px-4"
      style={{ background: "oklch(0 0 0)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.14 300 / 0.15), transparent 70%)",
        }}
        animate={{ opacity: step === "scanning" ? [0.6, 1, 0.6] : 0.8 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Scanline overlay during scanning */}
      {step === "scanning" && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          style={{ opacity: 0.04 }}
        >
          <motion.div
            className="w-full h-[2px]"
            style={{ background: "oklch(0.78 0.14 300)" }}
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {/* INPUT STEP */}
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-6"
                  style={{
                    border: "1px solid oklch(0.78 0.14 300 / 0.15)",
                    background: "oklch(0.78 0.14 300 / 0.15)",
                  }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "oklch(0.78 0.14 300)" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span
                    className="text-[9px] font-mono uppercase tracking-widest"
                    style={{ color: "oklch(0.78 0.14 300)" }}
                  >
                    Core Feature — Intelligence Analyzer
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                  Digital Presence{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, oklch(0.78 0.14 300), #fff 60%, oklch(0.78 0.14 300 / 0.15))",
                    }}
                  >
                    Analyzer
                  </span>
                </h1>
                <p className="font-mono text-sm text-subtle max-w-lg mx-auto">
                  Submit your brand parameters. Our AI intelligence system will scan your digital
                  presence and generate a comprehensive architecture report.
                </p>
              </div>

              {/* Form card */}
              <div
                className="p-8 md:p-10 rounded-2xl border"
                style={{
                  borderColor: "oklch(0.78 0.14 300 / 0.15)",
                  background: "oklch(0.78 0.14 300 / 0.15)",
                  boxShadow:
                    "0 0 60px oklch(0 0 0 / 0.8), inset 0 0 40px oklch(0.78 0.14 300 / 0.15)",
                }}
              >
                <form onSubmit={handleAnalyze} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField id="brand-name" label="Brand Name" required autoFocus />
                    <InputField id="industry" label="Industry / Niche" required />
                  </div>
                  <InputField
                    id="instagram"
                    label="Instagram Handle"
                    placeholder="@yourbrand"
                    required
                  />
                  <InputField
                    id="website"
                    label="Website URL"
                    type="url"
                    placeholder="https://"
                    required
                  />

                  <div className="pt-4">
                    <button
                      id="run-analysis-btn"
                      type="submit"
                      className="w-full py-4 rounded-xl font-mono uppercase tracking-widest text-sm font-bold text-black transition-all"
                      style={{
                        background: "oklch(0.78 0.14 300)",
                        boxShadow: "0 0 30px oklch(0.78 0.14 300 / 0.15)",
                      }}
                    >
                      Run Analysis System ⎋
                    </button>
                  </div>

                  <p className="text-center font-mono text-[10px] text-subtle">
                    Simulated AI analysis — no data is stored or transmitted.
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {/* SCANNING STEP */}
          {step === "scanning" && (
            <ScanningScreen key="scanning" progress={progress} scanText={scanText} />
          )}

          {/* RESULTS STEP */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DigitalAnalyzerResults onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
