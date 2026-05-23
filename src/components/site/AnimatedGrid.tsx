import { useEffect, useRef } from "react";

export function AnimatedGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 grid-bg transition-transform duration-300 ease-out ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)",
      }}
    />
  );
}
