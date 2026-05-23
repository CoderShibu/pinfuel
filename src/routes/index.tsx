import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { HeroVisualization } from "@/components/site/HeroVisualization";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SystemModule } from "@/components/site/SystemModule";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PINFUEL — Engineering Digital Presence" },
      {
        name: "description",
        content:
          "An operating system for digital influence. AI-powered audience psychology, identity systems, and performance intelligence.",
      },
      { property: "og:title", content: "PINFUEL — Engineering Digital Presence" },
      { property: "og:description", content: "An operating system for digital influence." },
    ],
  }),
  component: Home,
});

const TYPING_WORDS = ["Attention", "Identity", "Influence", "Culture", "Authority", "Growth"];

const SYSTEMS = [
  {
    id: "01",
    title: "Attention Engine™",
    desc: "Retention graphs, audience psychology maps, hook architecture, and engagement pulse systems.",
    tags: ["Behavioral", "AI Analytics", "Hook Design"],
    metrics: [
      { label: "Avg Retention", value: "+84%", color: "oklch(0.78 0.14 300)" },
      { label: "Hook Rate", value: "97%", color: "#22c55e" },
      { label: "Signals", value: "1.2M", color: "#3b82f6" },
    ],
  },
  {
    id: "02",
    title: "Identity OS™",
    desc: "Branding architecture, visual consistency maps, digital personality systems, and internet positioning frameworks.",
    tags: ["Branding", "Positioning", "Visual Systems"],
    metrics: [
      { label: "Brand Score", value: "94/100", color: "#a855f7" },
      { label: "Consistency", value: "99%", color: "#22c55e" },
      { label: "Recall", value: "+71%", color: "oklch(0.78 0.14 300)" },
    ],
  },
  {
    id: "03",
    title: "Culture Grid™",
    desc: "Trend intelligence, culture mapping, audience immersion analytics, and internet behavior patterns.",
    tags: ["Trend Intel", "Culture Mapping", "Behavior"],
    metrics: [
      { label: "Trend Accuracy", value: "91%", color: "#eab308" },
      { label: "Cultures", value: "340+", color: "oklch(0.78 0.14 300)" },
      { label: "Cycle Time", value: "48h", color: "#22c55e" },
    ],
  },
  {
    id: "04",
    title: "Social AI™",
    desc: "Predictive growth systems, AI analytics, performance optimization, and audience intelligence.",
    tags: ["Machine Learning", "Predictive", "Growth AI"],
    metrics: [
      { label: "Prediction", value: "88%", color: "#ef4444" },
      { label: "Output 10×", value: "18×", color: "#22c55e" },
      { label: "Cost Eff.", value: "-62%", color: "oklch(0.78 0.14 300)" },
    ],
  },
];

const STATS = [
  { l: "Audience Growth", v: "+240%", c: "#22c55e" },
  { l: "CTR Optimization", v: "+48%", c: "#3b82f6" },
  { l: "Conversion Efficiency", v: "+71%", c: "oklch(0.78 0.14 300)" },
  { l: "Retention Lift", v: "+63%", c: "#a855f7" },
];

const CASE_STUDIES = [
  {
    n: "Nova Collective",
    t: "Identity Protocol & Growth AI",
    m: "340% Audience Lift",
    detail:
      "Repositioned a fashion-tech label from niche cult brand to category leader in eight months using AI audience modeling.",
    art: "radial-gradient(circle at 30% 30%, oklch(0.78 0.14 300 / 0.15), oklch(0.15 0.04 240) 50%, #050505 100%)",
  },
  {
    n: "Archetype Media",
    t: "Attention Architecture",
    m: "18× Content Output",
    detail:
      "Designed an AI-augmented content stack that 18×'d output without losing authentic brand voice.",
    art: "conic-gradient(from 120deg at 60% 50%, #050505, #0a0a0a, oklch(0.78 0.14 300 / 0.15), #050505)",
  },
];

function TypingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TYPING_WORDS.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.span
          key={TYPING_WORDS[idx]}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="font-mono"
          style={{ color: "oklch(0.78 0.14 300)" }}
        >
          {TYPING_WORDS[idx]}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function Home() {
  const [selectedService, setSelectedService] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
        {/* Background grid + glow */}
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none z-0" />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.78 0.14 300 / 0.15), transparent 70%)",
          }}
        />

        <div className="container-x relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-16 items-center">
            {/* Left — cinematic typography */}
            <div className="relative z-20">
              <Reveal>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-8"
                  style={{
                    border: "1px solid oklch(0.78 0.14 300 / 0.15)",
                    background: "oklch(0.78 0.14 300 / 0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse-dot"
                    style={{ background: "oklch(0.78 0.14 300)" }}
                  />
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: "oklch(0.78 0.14 300)" }}
                  >
                    System Online — v3.1.0
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-[clamp(48px,7.5vw,108px)] font-bold leading-[0.93] tracking-[-0.05em] text-white">
                  Engineering
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, oklch(0.78 0.14 300), #ffffff 60%, oklch(0.78 0.14 300 / 0.15))",
                    }}
                  >
                    Influence.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex items-center gap-3 text-2xl md:text-3xl font-light text-muted-foreground">
                  <span>Engineering</span>
                  <div className="relative h-[1.2em] overflow-visible min-w-[200px]">
                    <TypingWord />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="mt-8 text-[14px] text-subtle max-w-[460px] leading-[1.75] font-mono">
                  PINFUEL builds digital influence systems through AI, audience psychology,
                  performance marketing, and internet culture intelligence. An OS for digital
                  dominance.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-12 flex flex-wrap gap-4 items-center">
                  <MagneticButton
                    to="/analyzer"
                    size="lg"
                    className="font-mono text-black font-bold uppercase tracking-wider"
                    style={{
                      background: "oklch(0.78 0.14 300)",
                      boxShadow: "0 0 30px oklch(0.78 0.14 300 / 0.15)",
                    }}
                  >
                    Analyze Presence ⎋
                  </MagneticButton>
                  <MagneticButton
                    to="/contact"
                    size="lg"
                    variant="outline"
                    className="font-mono uppercase tracking-wider"
                    style={{
                      borderColor: "oklch(0.78 0.14 300 / 0.15)",
                      color: "oklch(0.78 0.14 300)",
                    }}
                  >
                    Start a Project →
                  </MagneticButton>
                  <MagneticButton
                    to="/contact?type=discovery"
                    variant="ghost"
                    size="lg"
                    className="text-subtle hover:text-white uppercase tracking-wider text-xs font-mono"
                  >
                    Book Discovery Call
                  </MagneticButton>
                </div>
              </Reveal>

              {/* Live micro-stats row */}
              <Reveal delay={0.55}>
                <div className="mt-10 flex flex-wrap gap-5">
                  {[
                    { label: "Active Clients", value: "47+" },
                    { label: "Avg Growth Lift", value: "+240%" },
                    { label: "AI Models Running", value: "12" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold font-mono"
                        style={{ color: "oklch(0.78 0.14 300)" }}
                      >
                        {s.value}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-subtle">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — interactive network */}
            <div className="relative hidden lg:block z-10">
              <Reveal delay={0.5}>
                <HeroVisualization />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SYSTEMS ─────────────────────────────────────── */}
      <section className="py-32">
        <div className="container-x">
          <Reveal className="mb-16">
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.78 0.14 300)" }}
            >
              Core Infrastructure
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">System Modules</h2>
            <p className="mt-4 font-mono text-sm text-muted-foreground max-w-xl">
              Click any module to expand telemetry data and inspect live operating metrics.
            </p>
          </Reveal>

          <RevealGroup className="space-y-3">
            {SYSTEMS.map((sys, idx) => (
              <RevealItem key={sys.id}>
                <SystemModule
                  id={sys.id}
                  title={sys.title}
                  desc={sys.desc}
                  index={idx}
                  metrics={sys.metrics}
                  tags={sys.tags}
                  onBook={handleOpenModal}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          background: "oklch(0 0 0)",
          borderTop: "1px solid oklch(0.78 0.14 300 / 0.15)",
          borderBottom: "1px solid oklch(0.78 0.14 300 / 0.15)",
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container-x relative z-10">
          <Reveal className="mb-16">
            <div className="flex justify-between items-end">
              <div>
                <div
                  className="text-[10px] font-mono uppercase tracking-widest mb-4"
                  style={{ color: "oklch(0.78 0.14 300)" }}
                >
                  Intelligence Archive
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Case Studies</h2>
              </div>
              <MagneticButton
                to="/work"
                variant="ghost"
                className="font-mono text-xs hidden md:flex text-subtle hover:text-white"
              >
                View Archive →
              </MagneticButton>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((w, i) => (
              <RevealItem key={i}>
                <div
                  className="aspect-[4/3] rounded-xl border p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-500"
                  style={{
                    borderColor: "oklch(0.78 0.14 300 / 0.15)",
                    background: "oklch(0.78 0.14 300)",
                  }}
                >
                  {/* Art background */}
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: w.art }}
                  />
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, oklch(0.78 0.14 300 / 0.15), transparent 70%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-subtle mb-2">
                      Project: {w.n}
                    </div>
                    <h3 className="text-2xl font-semibold">{w.t}</h3>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <p className="text-sm font-mono text-muted-foreground">{w.detail}</p>
                    <div className="flex justify-between items-center">
                      <div
                        className="px-4 py-2 rounded-md font-mono text-xs backdrop-blur-md"
                        style={{
                          background: "oklch(0 0 0 / 0.6)",
                          border: "1px solid oklch(0.78 0.14 300 / 0.15)",
                          color: "oklch(0.78 0.14 300)",
                        }}
                      >
                        Result: {w.m}
                      </div>
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:text-black transition-all duration-300"
                        style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-40 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.78 0.14 300 / 0.15), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="container-x relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-8"
              style={{
                border: "1px solid oklch(0.78 0.14 300 / 0.15)",
                background: "oklch(0 0 0 / 0.8)",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "oklch(0.78 0.14 300)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                System Ready
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(40px,6vw,80px)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              Initialize Your Project.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base font-mono text-subtle max-w-[520px] mx-auto">
              Enter the PINFUEL operating system. Engineering your digital presence begins with a
              comprehensive strategy transmission.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <MagneticButton
                to="/contact"
                size="lg"
                className="font-mono uppercase tracking-wider text-sm font-bold text-black w-full md:w-auto"
                style={{
                  background: "oklch(0.78 0.14 300)",
                  boxShadow: "0 0 40px oklch(0.78 0.14 300 / 0.15)",
                }}
              >
                Start a Project
              </MagneticButton>
              <MagneticButton
                to="/analyzer"
                size="lg"
                variant="outline"
                className="font-mono uppercase tracking-wider text-sm w-full md:w-auto"
                style={{
                  borderColor: "oklch(0.78 0.14 300 / 0.15)",
                  color: "oklch(0.78 0.14 300)",
                }}
              >
                Analyze My Presence ⎋
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
