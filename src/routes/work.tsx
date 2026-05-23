import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — PINFUEL" },
      {
        name: "description",
        content: "Selected projects from brands we've helped engineer presence for.",
      },
      { property: "og:title", content: "Selected Work — PINFUEL" },
      {
        property: "og:description",
        content: "Projects, transformations and growth systems we've built.",
      },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    name: "WORK1",
    type: "Brand Transformation",
    metric: "+340% audience growth",
    note: "Repositioned a fashion-tech label from niche cult brand to category leader in eight months.",
    art: "bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.14_300),oklch(0.15_0.04_310)_50%,#050505_100%)]",
  },
  {
    name: "WORK2",
    type: "Identity Redesign",
    metric: "2M impressions in 30 days",
    note: "Rebuilt a music production studio's identity into a content engine that travels on its own.",
    art: "bg-[linear-gradient(135deg,#101010,#1b1b1b_40%,oklch(0.78_0.14_300)_130%)]",
  },
  {
    name: "WORK3",
    type: "AI Growth System",
    metric: "18× content output",
    note: "Designed an AI-augmented content stack that 18×'d output without losing voice.",
    art: "bg-[conic-gradient(from_120deg_at_60%_50%,#050505,#1a1a1a,oklch(0.78_0.14_300),#050505)]",
  },
  {
    name: "WORK4",
    type: "Campaign Concept",
    metric: "Viral in 72 hours",
    note: "Concepted and launched a campaign that hit cultural escape velocity in three days.",
    art: "bg-[radial-gradient(circle_at_70%_70%,#fff_0%,oklch(0.78_0.14_300)_12%,oklch(0.15_0.04_310)_40%,#050505_80%)]",
  },
];

function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title="Results that speak."
        subtitle="A small but proud roster. Each one a different problem — the same disciplined system."
      />
      <section className="pb-32">
        <div className="container-x">
          <RevealGroup className="grid md:grid-cols-2 gap-6">
            {projects.map((w) => (
              <RevealItem key={w.name}>
                <article className="group relative rounded-[18px] overflow-hidden border border-border">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] ${w.art}`}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 p-7 flex justify-between items-end gap-5"
                      style={{
                        background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.78))",
                      }}
                    >
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.06em] text-accent mb-2 font-medium">
                          {w.type}
                        </div>
                        <h3 className="text-[22px] font-semibold">{w.name}</h3>
                      </div>
                      <span className="text-[13px] px-3 py-1.5 rounded-full border border-border-strong bg-black/40 backdrop-blur-md whitespace-nowrap">
                        {w.metric}
                      </span>
                    </div>
                  </div>
                  <div className="p-7 bg-surface-2 border-t border-border">
                    <p className="text-[15px] text-muted-foreground leading-[1.6]">{w.note}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
