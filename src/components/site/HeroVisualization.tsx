import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  active: boolean;
}

const METRICS = [
  { label: "Attention Signal", value: "+84%", pos: "top-[-16px] right-[-16px]", delay: 0 },
  { label: "Audience Pulse", value: "Active", pos: "bottom-[40px] left-[-24px]", delay: 1 },
  { label: "Identity Score", value: "92/100", pos: "bottom-[-16px] right-[30px]", delay: 2 },
];

export function HeroVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const newNodes: Node[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 76 + 12,
      y: Math.random() * 76 + 12,
      delay: Math.random() * 3,
      size: Math.random() > 0.7 ? 4 : 2.5,
      active: Math.random() > 0.5,
    }));
    setNodes(newNodes);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      animFrameRef.current = requestAnimationFrame(() => setMouse({ x, y }));
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const getNodePos = (node: Node) => {
    const dx = mouse.x - node.x / 100;
    const dy = mouse.y - node.y / 100;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const strength = Math.max(0, 1 - dist / 0.35) * 6;
    return {
      x: node.x + dx * strength,
      y: node.y + dy * strength,
    };
  };

  // Compute pairs of nodes to draw lines between (closest neighbours)
  const linePairs: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 28) {
        linePairs.push([i, j]);
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] mx-auto select-none"
    >
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {linePairs.map(([i, j]) => {
          const a = getNodePos(nodes[i]);
          const b = getNodePos(nodes[j]);
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0, 0.4 - dist / 70);
          return (
            <motion.line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="oklch(0.78 0.14 300)"
              strokeWidth="0.4"
              strokeOpacity={opacity}
              animate={{ strokeOpacity: [opacity * 0.3, opacity, opacity * 0.3] }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </svg>

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-0 border rounded-full border-dashed"
        style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute border rounded-full"
        style={{ inset: "10%", borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* Radar sweep */}
      <motion.div
        className="absolute inset-0 rounded-full origin-center"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, oklch(0.78 0.14 300 / 0.15) 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Center pulse node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.78 0.14 300)",
            border: "1px solid oklch(0.78 0.14 300 / 0.15)",
            boxShadow:
              "0 0 30px oklch(0.78 0.14 300 / 0.15), inset 0 0 15px oklch(0.78 0.14 300 / 0.15)",
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ background: "oklch(0.78 0.14 300)" }}
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        {/* Outer pulse rings */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
            animate={{ width: ["56px", "120px"], height: ["56px", "120px"], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Floating network nodes */}
      {nodes.map((node) => {
        const pos = getNodePos(node);
        return (
          <motion.div
            key={node.id}
            className="absolute rounded-full z-[5]"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${node.size * 4}px`,
              height: `${node.size * 4}px`,
              transform: "translate(-50%, -50%)",
              background: node.active ? "oklch(0.78 0.14 300)" : "oklch(0.78 0.14 300 / 0.15)",
              boxShadow: node.active ? "0 0 10px oklch(0.78 0.14 300 / 0.15)" : "none",
            }}
            animate={{
              scale: [1, node.active ? 1.3 : 1.1, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + node.delay,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          >
            {/* Signal ring */}
            {node.active && (
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}
                animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Floating telemetry badges */}
      {METRICS.map((m) => (
        <motion.div
          key={m.label}
          className={`absolute ${m.pos} z-20`}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4 + m.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: m.delay,
          }}
        >
          <div
            className="px-3 py-1.5 rounded-md font-mono text-xs whitespace-nowrap backdrop-blur-md"
            style={{
              background: "oklch(0.78 0.14 300 / 0.15)",
              border: "1px solid oklch(0.78 0.14 300 / 0.15)",
              color: "oklch(0.78 0.14 300)",
              boxShadow: "0 4px 20px oklch(0 0 0 / 0.5)",
            }}
          >
            <span className="opacity-50 mr-1">◆</span>
            {m.label} <span className="font-bold">{m.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
