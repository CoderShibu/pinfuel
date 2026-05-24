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
    title: "Brand Positioning",
    desc: "We define your unique angle in the market, ensuring you aren't just another voice, but the definitive signal.",
    tags: ["Branding", "Positioning", "Strategy"],
    metrics: [
      { label: "Market Share", value: "+44%", color: "oklch(0.78 0.14 300)" },
      { label: "Brand Signal", value: "98%", color: "#22c55e" },
      { label: "Clarity Index", value: "A+", color: "#3b82f6" },
    ],
  },
  {
    id: "02",
    title: "Social Strategy",
    desc: "Omnichannel social blueprints designed to capture attention, build authority, and drive cult-like loyalty.",
    tags: ["Omnichannel", "Growth", "Distribution"],
    metrics: [
      { label: "Followers", value: "+320%", color: "#a855f7" },
      { label: "Loyalty Rate", value: "92%", color: "#22c55e" },
      { label: "Reach", value: "4.8M", color: "oklch(0.78 0.14 300)" },
    ],
  },
  {
    id: "03",
    title: "Attention Engineering",
    desc: "Applying psychology and data to craft hooks, formats, and narratives that guarantee engagement.",
    tags: ["Audience Psych", "Hook Design", "Metrics"],
    metrics: [
      { label: "Hook Rate", value: "96.4%", color: "#eab308" },
      { label: "Retention Avg", value: "88%", color: "oklch(0.78 0.14 300)" },
      { label: "Reactions", value: "1.4M", color: "#22c55e" },
    ],
  },
  {
    id: "04",
    title: "AI Growth Systems",
    desc: "Deploying automated content pipelines and AI agents that multiply your output without losing the human touch.",
    tags: ["ML Engine", "Automation", "Output Scaling"],
    metrics: [
      { label: "Scaling Boost", value: "18×", color: "#ef4444" },
      { label: "Automation Eff.", value: "99%", color: "#22c55e" },
      { label: "Cost Reduced", value: "-62%", color: "oklch(0.78 0.14 300)" },
    ],
  },
  {
    id: "05",
    title: "Community Building",
    desc: "Transforming passive followers into active evangelists through orchestrated community infrastructure.",
    tags: ["Orchestration", "Evangelism", "Infrastructure"],
    metrics: [
      { label: "Active Members", value: "12K", color: "#3b82f6" },
      { label: "Conversion", value: "+84%", color: "#22c55e" },
      { label: "NPS Score", value: "94/100", color: "#a855f7" },
    ],
  },
  {
    id: "06",
    title: "Digital Identity",
    desc: "Complete aesthetic and verbal overhaul to make your brand instantly recognizable and premium.",
    tags: ["Verbal Identity", "Aesthetics", "Visual OS"],
    metrics: [
      { label: "Recall Rate", value: "+91%", color: "oklch(0.78 0.14 300)" },
      { label: "Contrast Ratio", value: "21:1", color: "#22c55e" },
      { label: "Aesthetic Score", value: "99/100", color: "#eab308" },
    ],
  },
];

const STATS = [
  { l: "Audience Growth", v: "+240%", c: "#22c55e" },
  { l: "CTR Optimization", v: "+48%", c: "#3b82f6" },
  { l: "Conversion Efficiency", v: "+71%", c: "oklch(0.78 0.14 300)" },
  { l: "Retention Lift", v: "+63%", c: "#a855f7" },
];

const TESTIMONIALS = [
  {
    text: "PINFUEL fundamentally shifted how we are perceived online. The attention engineering framework actually works.",
    author: "Nova Collective",
    metric: "+340% Audience Lift",
  },
  {
    text: "18x content output with AI growth systems. It felt like cheating.",
    author: "Archetype Media",
    metric: "18x Output Scaling",
  },
  {
    text: "Our impressions skyrocketed to 2M in 30 days. The strategy was flawless.",
    author: "Pulse Studio",
    metric: "2.1M Impressions",
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
          className="font-mono inline-block"
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
  const [hasReturned, setHasReturned] = useState(false);

  useEffect(() => {
    // Dynamic Testimonials Activation: Check if returned from another page
    const visited = sessionStorage.getItem("pinfuel_visited_page");
    if (visited === "true") {
      setHasReturned(true);
    }
  }, []);

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
                <h1 className="text-[clamp(48px,7.5vw,108px)] font-bold leading-[0.93] tracking-[-0.05em] text-foreground">
                  Engineering
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, oklch(0.78 0.14 300), var(--foreground) 60%, oklch(0.78 0.14 300 / 0.15))",
                    }}
                  >
                    Influence.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex items-center gap-3 text-2xl md:text-3xl font-light text-muted-foreground">
                  <span>Engineering</span>
                  <div className="relative h-[1.2em] overflow-visible min-w-[240px] flex items-center">
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
                    className="font-mono text-background font-bold uppercase tracking-wider bg-foreground"
                    style={{
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
                      color: "var(--foreground)",
                    }}
                  >
                    Start a Project →
                  </MagneticButton>
                  <MagneticButton
                    to="/contact?type=discovery"
                    variant="ghost"
                    size="lg"
                    className="text-subtle hover:text-foreground uppercase tracking-wider text-xs font-mono"
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
                        className="text-lg font-bold font-mono text-accent"
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

      {/* ── WHAT WE DO INTERACTION SECTION ──────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle grid background to isolate section */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container-x relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <Reveal>
              <div
                className="text-[10px] font-mono uppercase tracking-widest mb-4 inline-flex items-center gap-2 px-2.5 py-1.5 rounded bg-accent/10 border border-accent/15"
                style={{ color: "oklch(0.78 0.14 300)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                ✦ What We Do
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">System Modules</h2>
              <p className="mt-4 font-mono text-sm text-muted-foreground max-w-xl">
                Six disciplines, one system. We build the brand, the strategy, the systems and the audience — then we scale them.
              </p>
            </Reveal>

            {/* Visually Obvious Interaction CTA */}
            <Reveal delay={0.2}>
              <motion.div 
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-accent/20 bg-accent/5 backdrop-blur-md cursor-default select-none shadow-[0_0_20px_oklch(0.78_0.14_300/0.05)]"
                animate={{ boxShadow: ["0 0 15px oklch(0.78 0.14 300/0.05)", "0 0 25px oklch(0.78 0.14 300/0.18)", "0 0 15px oklch(0.78 0.14 300/0.05)"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                  🖱️ Click Modules to Explore Live System Telemetry
                </span>
              </motion.div>
            </Reveal>
          </div>

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

      {/* ── TESTIMONIAL EXPERIENCE (Dynamic Return Section) ────── */}
      <AnimatePresence>
        {hasReturned && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.1 }}
            className="py-32 relative overflow-hidden border-t border-border bg-surface/30 backdrop-blur-sm"
          >
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 80% 20%, oklch(0.78 0.14 300 / 0.08), transparent 50%)",
              }}
            />
            
            <div className="container-x relative z-10">
              <div className="mb-16">
                <div 
                  className="text-[10px] font-mono uppercase tracking-widest mb-4 inline-flex items-center gap-2"
                  style={{ color: "oklch(0.78 0.14 300)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  ✦ Dynamic Telemetry Feed
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Creator Intelligence</h2>
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  Secure social proof logged from active network nodes and system integrations.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                  <motion.div
                    key={idx}
                    className="p-8 rounded-2xl border border-border bg-surface-2/60 relative overflow-hidden group hover:border-accent/30 transition-all duration-300 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent opacity-0 group-hover:opacity-[0.05] blur-[30px] transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex gap-1 mb-6 text-accent">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-base leading-relaxed text-foreground mb-8 italic">
                      "{t.text}"
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-[9px] text-accent font-mono font-bold">
                          {t.author.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          {t.author}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-surface text-accent">
                        {t.metric}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-40 text-center relative overflow-hidden border-t border-border">
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
                background: "oklch(0.78 0.14 300 / 0.15)",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "oklch(0.78 0.14 300)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-semibold">
                System Ready
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(40px,6vw,80px)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground">
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
                className="font-mono uppercase tracking-wider text-sm font-bold text-background bg-foreground w-full md:w-auto"
                style={{
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
                  color: "var(--foreground)",
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
