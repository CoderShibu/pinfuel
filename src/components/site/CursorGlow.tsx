import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const handleMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = tx + "px";
        dotRef.current.style.top = ty + "px";
      }
    };

    const animate = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.left = cx + "px";
        glowRef.current.style.top = cy + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Soft ambient glow — follows cursor with lag */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2 z-[3] hidden md:block"
        style={{
          background: "radial-gradient(circle, oklch(from var(--color-accent) l c h / 0.15) 0%, transparent 65%)",
        }}
      />
      {/* Sharp dot — snaps to cursor directly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 z-[4] hidden md:block"
        style={{
          background: "oklch(from var(--color-accent) l c h / 0.5)",
          boxShadow: "0 0 10px oklch(from var(--color-accent) l c h / 0.5)",
        }}
      />
    </>
  );
}
