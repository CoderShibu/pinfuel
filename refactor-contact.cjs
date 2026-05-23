const fs = require("fs");

const file = "src/routes/contact.tsx";
let content = fs.readFileSync(file, "utf8");

// Global replacements for colors to support theming
content = content.replace(
  /style=\{\{ color: "oklch\(0\.78 0\.14 300\)" \}\}/g,
  'className="text-accent"',
);
content = content.replace(
  /style=\{\{ background: "oklch\(0\.78 0\.14 300\)" \}\}/g,
  'className="bg-accent"',
);
content = content.replace(
  /style=\{\{ background: "oklch\(0\.78 0\.14 300 \/ 0\.15\)" \}\}/g,
  'className="bg-accent/15"',
);
content = content.replace(
  /style=\{\{ borderColor: "oklch\(0\.78 0\.14 300 \/ 0\.15\)" \}\}/g,
  'className="border-accent/15"',
);
content = content.replace(
  /style=\{\{ borderColor: "oklch\(0\.78 0\.14 300\)" \}\}/g,
  'className="border-accent"',
);

content = content.replace(
  /style=\{\{ background: "oklch\(0 0 0\)" \}\}/g,
  'className="bg-background"',
);
content = content.replace(/color: "#fff"/g, 'color: "var(--color-foreground)"');
content = content.replace(/background: "#000"/g, 'background: "var(--color-background)"');
content = content.replace(/color: "#000"/g, 'color: "var(--color-background)"');

// Additional fixes for specific components
content = content.replace(
  /className="text-\[9px\] font-mono uppercase tracking-widest block mb-2 transition-colors" style=\{\{ color: focused \? "oklch\(0\.78 0\.14 300\)" : "oklch\(0\.78 0\.14 300\)" \}\}/g,
  'className={`text-[9px] font-mono uppercase tracking-widest block mb-2 transition-colors ${focused ? "text-accent" : "text-accent/70"}`}',
);
content = content.replace(
  /className="w-full bg-transparent border-b px-0 py-3 font-mono text-lg focus:outline-none transition-colors placeholder-subtle"\s*style=\{\{ borderColor: focused \? "oklch\(0\.78 0\.14 300\)" : "oklch\(0\.78 0\.14 300 \/ 0\.15\)", color: "var\\(--color-foreground\\)" \}\}/g,
  'className={`w-full bg-transparent border-b px-0 py-3 font-mono text-lg focus:outline-none transition-colors placeholder-subtle ${focused ? "border-accent" : "border-accent/15"} text-foreground`}',
);

// SuccessScreen MagneticButton
content = content.replace(
  /style=\{\{ borderColor: "oklch\(0\.78 0\.14 300 \/ 0\.15\)", color: "oklch\(0\.78 0\.14 300\)" \}\}/g,
  'className="border-accent/15 text-accent"',
);
content = content.replace(
  /style=\{\{ background: "oklch\(0\.78 0\.14 300\)", boxShadow: "0 0 20px oklch\(0\.78 0\.14 300 \/ 0\.15\)" \}\}/g,
  'className="bg-accent shadow-[0_0_20px_var(--color-accent)]"',
);

// Fix text-black in MagneticButton to text-accent-foreground so it's visible in both modes
content = content.replace(/text-black font-bold/g, "text-accent-foreground font-bold");
content = content.replace(/text-black transition-all/g, "text-accent-foreground transition-all");

const newContactPage = `
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
            Bypass the gatekeepers. Directly interface with the core architects of the Socioverse system to engineer your digital dominance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-subtle mb-6 border-b border-border pb-2">The Architects</h3>
            <div className="space-y-4">
              {/* Founder 1 */}
              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">F1</div>
                <div>
                  <div className="font-bold text-lg">Founder 1</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CEO & Lead Strategist</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder1@socioverse.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
                  </div>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">F2</div>
                <div>
                  <div className="font-bold text-lg">Founder 2</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CTO & Growth Engineer</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder2@socioverse.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
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
          {!isProcessing && !isComplete && (
            <StepIndicator step={step} total={TOTAL_STEPS} />
          )}

          <AnimatePresence mode="wait">
`;

// To avoid regex errors, let's just use split
const parts = content.split('<AnimatePresence mode="wait">');
if (parts.length > 1) {
  const endParts = parts[1].split("</AnimatePresence>");
  const stepsJsx = endParts[0];

  // Replace the ContactPage function entirely
  const beforeContactPage = content.split("function ContactPage() {")[0];
  content =
    beforeContactPage +
    newContactPage +
    stepsJsx +
    `
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
`;
}

fs.writeFileSync(file, content);
