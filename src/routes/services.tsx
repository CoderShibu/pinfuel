import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { useState } from "react";
import { BookingModal } from "@/components/site/BookingModal";
import { SystemModule } from "@/components/site/SystemModule";
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
          <Reveal className="mb-16">
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.78 0.14 300)" }}
            >
              Core Infrastructure
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">System Modules</h2>
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
      </div>
    </>
  );
}

