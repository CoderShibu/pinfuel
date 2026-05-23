import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function Stat({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[clamp(40px,5vw,68px)] font-bold tracking-[-0.03em] leading-none text-gradient">
        {v}
        {suffix}
      </div>
      <div className="text-[13px] text-subtle mt-2 tracking-wide">{label}</div>
    </div>
  );
}
