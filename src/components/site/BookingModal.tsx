import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "@tanstack/react-router";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
};

const SERVICES = [
  "Performance Intelligence™",
  "Attention Engine™",
  "Identity OS™",
  "Social AI™",
  "Community Systems™",
  "Brand Positioning",
];

const PROCESSING_STEPS = [
  "Analyzing project requirements...",
  "Preparing strategic onboarding...",
  "Generating intelligence pipeline...",
  "Initializing client system...",
];

export function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [procStep, setProcStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    industry: "",
    service: selectedService || SERVICES[0],
    struggles: "",
    goals: "",
    audienceSize: "",
    budget: "",
    platforms: "",
    timeline: "",
    assetsUrl: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form");
        setProcStep(0);
      }, 500); // reset after exit animation
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Start processing text loop
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % PROCESSING_STEPS.length;
      setProcStep(currentStep);
    }, 1200);

    try {
      const { submitServiceRequest } = await import("@/lib/backend");
      await submitServiceRequest(formData);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setStep("success");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden bg-black/80 backdrop-blur-xl"
        >
          {/* Ambient Background Glow inside modal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-full bg-[#050505]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-accent/40 bg-accent/10 flex items-center justify-center">
                  <span className="font-bold text-accent text-sm">P</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                    Project Intelligence Intake
                  </h2>
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest">
                    Secure Onboarding Protocol
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-12"
                  >
                    {/* SECTION 1: IDENTITY */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest">
                          01. Identity Matrix
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <InputGroup
                          label="Company / Brand Name"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                        <InputGroup
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <InputGroup
                          label="Contact Number"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <InputGroup
                          label="Website URL"
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                        />
                        <InputGroup
                          label="Instagram Handle"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                        />
                        <InputGroup
                          label="Industry Type"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          required
                        />
                        <div className="space-y-2">
                          <label className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                            Target System
                          </label>
                          <div className="relative group/input">
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all focus:border-accent/50 appearance-none peer relative z-10 cursor-pointer"
                            >
                              {SERVICES.map((s) => (
                                <option key={s} value={s} className="bg-[#0a0a0a]">
                                  {s}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-white/40">
                              ▼
                            </div>
                            <div className="absolute inset-0 border border-accent opacity-0 peer-focus:opacity-100 peer-focus:animate-pulse rounded-xl pointer-events-none transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: PROJECT TELEMETRY */}
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest">
                          02. Project Telemetry
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup
                          label="Monthly Marketing Budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="$5k - $10k"
                          required
                        />
                        <InputGroup
                          label="Expected Timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          placeholder="Q3 2026"
                          required
                        />
                        <InputGroup
                          label="Current Audience Size"
                          name="audienceSize"
                          value={formData.audienceSize}
                          onChange={handleChange}
                          placeholder="e.g. 50k IG, 10k Email"
                        />
                        <InputGroup
                          label="Preferred Platforms"
                          name="platforms"
                          value={formData.platforms}
                          onChange={handleChange}
                          placeholder="IG, X, LinkedIn"
                        />
                      </div>

                      <div className="space-y-6">
                        <TextAreaGroup
                          label="What does your brand currently struggle with?"
                          name="struggles"
                          value={formData.struggles}
                          onChange={handleChange}
                          required
                        />
                        <TextAreaGroup
                          label="What are your primary growth goals?"
                          name="goals"
                          value={formData.goals}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* SECTION 3: ASSET INJECTION */}
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest">
                          03. Asset Injection
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
                      </div>
                      <p className="text-xs text-white/50 font-mono text-center max-w-lg mx-auto mb-6 leading-relaxed">
                        To maintain secure protocols, please provide a link (Google Drive, Dropbox,
                        Notion) containing any brand guidelines, social media screenshots, or
                        analytics reports.
                      </p>
                      <InputGroup
                        label="Asset Folder URL (Optional)"
                        type="url"
                        name="assetsUrl"
                        value={formData.assetsUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>

                    {/* SUBMIT */}
                    <div className="pt-10 flex justify-center">
                      <button
                        type="submit"
                        className="relative overflow-hidden rounded-xl bg-accent text-accent-foreground font-bold py-5 px-12 text-sm transition-transform active:scale-[0.98] hover:shadow-[0_0_30px_var(--color-accent)] group"
                      >
                        <span className="relative z-10 font-mono uppercase tracking-widest flex items-center gap-3">
                          Enter The PP Influence System{" "}
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === "processing" && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                    className="flex flex-col items-center justify-center min-h-[50vh] py-20 text-center"
                  >
                    <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full border-t border-accent animate-spin"
                        style={{ animationDuration: "1s" }}
                      />
                      <div
                        className="absolute inset-4 rounded-full border-b border-accent/50 animate-spin"
                        style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
                      />
                      <div
                        className="absolute inset-8 rounded-full border-l border-accent/30 animate-spin"
                        style={{ animationDuration: "2s" }}
                      />

                      {/* Scanning Grid Center */}
                      <div className="w-16 h-16 relative overflow-hidden bg-accent/5 rounded-lg border border-accent/20">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBoMjBWMEgwem0xOSAxSDFWMWgxOHYxOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-50" />
                        <motion.div
                          className="w-full h-[2px] bg-accent shadow-[0_0_10px_var(--color-accent)]"
                          animate={{ y: [0, 64, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>

                    <div className="h-8 relative overflow-hidden w-full max-w-sm">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={procStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase tracking-widest text-accent"
                        >
                          {PROCESSING_STEPS[procStep]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-[50vh] py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      className="w-24 h-24 rounded-full border border-accent bg-accent/10 flex items-center justify-center mb-8 shadow-[0_0_50px_var(--color-accent)] relative"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {/* Pulse rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-accent"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    <h2 className="text-3xl font-bold tracking-tight mb-4">Access Granted</h2>
                    <p className="text-white/60 font-mono text-sm max-w-md mx-auto mb-12 leading-relaxed">
                      Your request has successfully entered the PP Influence infrastructure. Our
                      intelligence architects will initiate contact shortly.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-mono text-xs uppercase tracking-widest"
                      >
                        Return Home
                      </button>
                      <button
                        onClick={() => navigate({ to: "/contact" })}
                        className="px-6 py-3 rounded-xl bg-accent text-accent-foreground hover:shadow-[0_0_20px_var(--color-accent)] transition-all font-mono text-xs uppercase tracking-widest font-bold"
                      >
                        Book Discovery Call
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Internal reusable input components
function InputGroup({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-mono uppercase tracking-widest text-white/60">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative group/input">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-accent/50 focus:bg-accent/[0.02] focus:shadow-[0_0_15px_oklch(from_var(--color-accent)_l_c_h_/_0.2)] peer relative z-10"
        />
        <div className="absolute inset-0 border border-accent opacity-0 peer-focus:opacity-100 peer-focus:animate-pulse rounded-xl pointer-events-none transition-opacity z-20" />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TextAreaGroup({ label, name, value, onChange, required = false, placeholder = "" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-mono uppercase tracking-widest text-white/60">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative group/input">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-accent/50 focus:bg-accent/[0.02] focus:shadow-[0_0_15px_oklch(from_var(--color-accent)_l_c_h_/_0.2)] peer relative z-10 resize-none"
        />
        <div className="absolute inset-0 border border-accent opacity-0 peer-focus:opacity-100 peer-focus:animate-pulse rounded-xl pointer-events-none transition-opacity z-20" />
      </div>
    </div>
  );
}
