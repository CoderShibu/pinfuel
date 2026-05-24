import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — PINFUEL" },
      {
        name: "description",
        content:
          "A five-step system: Research, Identity, Strategy, Execution, Scale. Built for results.",
      },
      { property: "og:title", content: "Process — PINFUEL" },
      {
        property: "og:description",
        content: "How we engineer presence — a five-step system built for results.",
      },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  ["01", "Research", "Deep dive into your market, audience and cultural context."],
  ["02", "Identity", "Sharpen your positioning, voice and visual system."],
  ["03", "Strategy", "Design a platform-native growth blueprint."],
  ["04", "Execution", "Produce, ship and iterate at high cadence."],
  ["05", "Scale", "Layer AI systems to compound results over time."],
];

function ProcessPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dotX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);



  return (
    <>
      <PageHeader
        eyebrow="How We Work"
        title="A system built for results."
        subtitle="No improvisation. Every project moves through the same disciplined five-stage process — refined across a hundred launches."
      />
      <section ref={ref} className="pb-32">
        <div className="container-x">
          {/* Desktop timeline */}
          <div className="relative hidden md:block">
            <div className="absolute top-[34px] left-[5%] right-[5%] h-px bg-border" />
            <motion.span
              className="absolute top-[30px] w-2 h-2 rounded-full bg-accent shadow-[0_0_16px_oklch(0.78_0.14_230)]"
              style={{ left: dotX, marginLeft: "calc(5% - 4px)" }}
            />
            <RevealGroup className="grid grid-cols-5 gap-6">
              {steps.map(([n, t, d]) => (
                <RevealItem key={n}>
                  <div className="text-[13px] text-subtle mb-[18px]">{n}</div>
                  <div className="w-3.5 h-3.5 rounded-full bg-surface-2 border border-border-strong mb-5" />
                  <h3 className="text-lg font-semibold mb-2">{t}</h3>
                  <p className="text-[13.5px] text-muted-foreground leading-[1.55]">{d}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          {/* Mobile timeline */}
          <div className="md:hidden relative pl-6">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
            <RevealGroup className="flex flex-col gap-10">
              {steps.map(([n, t, d]) => (
                <RevealItem key={n}>
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-3.5 h-3.5 rounded-full bg-surface-2 border border-border-strong" />
                    <div className="text-[13px] text-subtle mb-2">{n}</div>
                    <h3 className="text-lg font-semibold mb-1.5">{t}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.55]">{d}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Philosophy callouts */}
      <section className="bg-surface py-28">
        <div className="container-x grid md:grid-cols-3 gap-5">
          {[
            ["Discipline", "Results compound when the process doesn't move."],
            ["Speed", "Strategy without shipping is theatre."],
            ["Compounding", "Every cycle makes the next one easier."],
          ].map(([h, p]) => (
            <Reveal key={h}>
              <div className="rounded-2xl p-8 border border-border bg-[oklch(1_0_0/0.02)] h-full">
                <div className="text-[11px] uppercase tracking-[0.08em] text-accent font-medium mb-3">
                  {h}
                </div>
                <p className="text-lg leading-[1.5] text-balance">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
