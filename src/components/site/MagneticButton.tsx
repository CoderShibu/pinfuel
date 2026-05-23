import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function MagneticButton({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  style,
  type,
  onClick,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "inline-flex items-center gap-2.5 rounded-[10px] font-medium tracking-[-0.01em] transition-[background,border-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform";
  const sz = size === "lg" ? "px-7 py-[18px] text-[15px]" : "px-[22px] py-3.5 text-sm";
  const variants: Record<string, string> = {
    primary: "bg-foreground text-background hover:shadow-[0_0_40px_oklch(1_0_0/0.15)]",
    ghost:
      "border border-border-strong text-foreground hover:bg-white/[0.03] hover:border-white/25",
    outline: "border text-foreground hover:bg-white/[0.03]",
  };

  const inner = (
    <span
      ref={ref}
      className={`${base} ${sz} ${variants[variant]}`}
      style={{
        transition:
          "transform 0.25s cubic-bezier(.4,0,.2,1), background 0.25s, border-color 0.25s, box-shadow 0.25s",
        ...style,
      }}
    >
      {children}
    </span>
  );

  const wrapperClass = `inline-block ${className}`;

  if (to) {
    return (
      <Link to={to} onMouseMove={onMove} onMouseLeave={onLeave} className={wrapperClass}>
        {inner}
      </Link>
    );
  }
  if (type || onClick) {
    return (
      <button
        type={type ?? "button"}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={wrapperClass}
      >
        {inner}
      </button>
    );
  }
  return (
    <a href={href ?? "#"} onMouseMove={onMove} onMouseLeave={onLeave} className={wrapperClass}>
      {inner}
    </a>
  );
}
