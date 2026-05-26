import { createFileRoute } from "@tanstack/react-router";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { useState } from "react";
import { BookingModal } from "@/components/site/BookingModal";
import React from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — PINFUEL" },
      {
        name: "description",
        content:
          "Brand positioning, social strategy, attention engineering, AI growth systems, community building and digital identity.",
      },
      { property: "og:title", content: "Services — PINFUEL" },
      {
        property: "og:description",
        content: "Six disciplines that engineer unforgettable digital presence.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    id: "01",
    title: "Brand Positioning",
    desc: "We define your unique angle in the market, ensuring you aren't just another voice, but the definitive signal.",
  },
  {
    id: "02",
    title: "Social Strategy",
    desc: "Omnichannel social blueprints designed to capture attention, build authority, and drive cult-like loyalty.",
  },
  {
    id: "03",
    title: "Attention Engineering",
    desc: "Applying psychology and data to craft hooks, formats, and narratives that guarantee engagement.",
  },
  {
    id: "04",
    title: "AI Growth Systems",
    desc: "Deploying automated content pipelines and AI agents that multiply your output without losing the human touch.",
  },
  {
    id: "05",
    title: "Community Building",
    desc: "Transforming passive followers into active evangelists through orchestrated community infrastructure.",
  },
  {
    id: "06",
    title: "Digital Identity",
    desc: "Complete aesthetic and verbal overhaul to make your brand instantly recognizable and premium.",
  },
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
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
      <div className="relative min-h-screen pt-32 pb-24">
        {/* Background grid + glow */}
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none z-0" />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.78 0.14 300 / 0.15), transparent 70%)",
          }}
        />

        <div className="container-x relative z-10">
          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <RevealItem key={s.id}>
                <div
                  onClick={() => handleOpenModal(s.title)}
                  className="group relative p-8 rounded-2xl border border-border bg-surface-2 overflow-hidden hover:border-accent/40 transition-colors duration-500 h-full flex flex-col cursor-pointer text-left shadow-sm"
                >
                  {/* Subtle purple glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity duration-700 pointer-events-none" />

                  <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-6">
                    Module {s.id}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-auto font-mono">
                    {s.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </>
  );
}

