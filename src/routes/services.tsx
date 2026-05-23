import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { motion } from "motion/react";
import { useState } from "react";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — PINFUEL" },
      { name: "description", content: "Brand positioning, social strategy, attention engineering, AI growth systems, community building and digital identity." },
      { property: "og:title", content: "Services — PINFUEL" },
      { property: "og:description", content: "Six disciplines that engineer unforgettable digital presence." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { id: "01", title: "Brand Positioning", desc: "We define your unique angle in the market, ensuring you aren't just another voice, but the definitive signal." },
  { id: "02", title: "Social Strategy", desc: "Omnichannel social blueprints designed to capture attention, build authority, and drive cult-like loyalty." },
  { id: "03", title: "Attention Engineering", desc: "Applying psychology and data to craft hooks, formats, and narratives that guarantee engagement." },
  { id: "04", title: "AI Growth Systems", desc: "Deploying automated content pipelines and AI agents that multiply your output without losing the human touch." },
  { id: "05", title: "Community Building", desc: "Transforming passive followers into active evangelists through orchestrated community infrastructure." },
  { id: "06", title: "Digital Identity", desc: "Complete aesthetic and verbal overhaul to make your brand instantly recognizable and premium." }
];

const feedbacks = [
  { text: "PINFUEL fundamentally shifted how we are perceived online. The attention engineering framework actually works.", author: "Nova Collective" },
  { text: "18x content output with AI growth systems. It felt like cheating.", author: "Archetype Media" },
  { text: "Our impressions skyrocketed to 2M in 30 days. The strategy was flawless.", author: "Pulse Studio" },
  { text: "The digital identity they built for us became our biggest asset.", author: "Zenith Labs" },
  { text: "They don't just run ads. They build ecosystems. Our community engagement went through the roof.", author: "Aura Tech" }
];

function ServicesPage() {
  const [selectedService, setSelectedService] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedService={selectedService} />
      <div className="relative">
        <PageHeader
          eyebrow="What We Do"
          title="Everything your brand needs to dominate online."
          subtitle="Six disciplines, one system. We build the brand, the strategy, the systems and the audience — then we scale them."
        />
        {/* Abstract System Art for empty right space */}
        <div className="hidden lg:block absolute right-[10%] top-40 w-[400px] h-[400px] pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Core glow */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-accent opacity-20 blur-2xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Orbit rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-accent/0.2 border-dashed"
                style={{ width: i * 140, height: i * 140 }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 * i, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_oklch(0.78_0.14_300)]" />
              </motion.div>
            ))}
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
              <motion.path 
                d="M 200 200 L 270 100 M 200 200 L 320 250 M 200 200 L 100 280" 
                stroke="oklch(0.78 0.14 300)" 
                strokeWidth="1" 
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </div>
      <section className="pb-24">
        <div className="container-x">
          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <RevealItem key={s.id}>
                <div 
                  onClick={() => handleOpenModal(s.title)}
                  className="group relative p-8 rounded-2xl border border-border bg-surface-2 overflow-hidden hover:border-accent/0.4 transition-colors duration-500 h-full flex flex-col cursor-pointer text-left"
                >
                  {/* Subtle purple glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-6">Module {s.id}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-auto">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-24 border-t border-border overflow-hidden relative bg-background">
        <div className="container-x mb-12">
          <div className="text-[11px] font-mono uppercase tracking-widest text-subtle">Client Feedback</div>
          <h2 className="text-3xl font-bold mt-2">The Signal</h2>
        </div>
        
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex w-full">
          <motion.div
            className="flex gap-6 px-3 whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...feedbacks, ...feedbacks].map((fb, i) => (
              <div 
                key={i} 
                className="w-[400px] sm:w-[500px] shrink-0 p-8 rounded-2xl border border-border bg-surface-2"
              >
                <div className="flex gap-1 mb-6 text-accent">
                  {/* 5 Stars */}
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-foreground text-wrap mb-8">"{fb.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/0.1 border border-accent/0.3 flex items-center justify-center text-[10px] text-accent font-mono">
                    {fb.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-subtle">{fb.author}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
