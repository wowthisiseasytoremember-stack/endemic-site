"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Node = {
  id: string;
  type: "species" | "discoverer" | "expedition" | "biotope" | "controversy";
  label: string;
  detail: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  {
    id: "mbu",
    type: "species",
    label: "Tetraodon mbu",
    detail: "Giant Puffer — 670mm, Congo Basin. pH 7.0–8.0, 24–26°C.",
    x: 50,
    y: 50,
  },
  {
    id: "boulenger",
    type: "discoverer",
    label: "G. A. Boulenger",
    detail:
      "Described 1,096 fish — more than any person — from the British Museum, never traveling. Named the Mbu in 1899.",
    x: 22,
    y: 22,
  },
  {
    id: "roberts",
    type: "expedition",
    label: "Tyson R. Roberts",
    detail: "272 species / 809 occurrences across 13 countries incl. Congo & Cameroon.",
    x: 20,
    y: 74,
  },
  {
    id: "congo",
    type: "biotope",
    label: "Congo Basin",
    detail:
      "Large slow rivers & Lake Tanganyika margins. Also home to Tetraodon miurus (Congo Puffer).",
    x: 78,
    y: 24,
  },
  {
    id: "orinoco",
    type: "biotope",
    label: "Orinoco / Rio Negro",
    detail:
      "Marbled Headstander + Banded Puffer + Lyre Tail Pleco share this blackwater system. 83% biotope match.",
    x: 80,
    y: 72,
  },
  {
    id: "thai",
    type: "controversy",
    label: "'Thai Constellation'",
    detail:
      "Three competing origin theories + a Costa Farms patent, expiry unverified. We present all sides.",
    x: 50,
    y: 88,
  },
];

const EDGES: [string, string][] = [
  ["mbu", "boulenger"],
  ["mbu", "congo"],
  ["mbu", "roberts"],
  ["congo", "orinoco"],
  ["boulenger", "congo"],
  ["roberts", "congo"],
  ["orinoco", "thai"],
  ["mbu", "orinoco"],
];

const TYPE_COLOR: Record<Node["type"], string> = {
  species: "var(--aqua)",
  discoverer: "#e8a12c",
  expedition: "#8b7cf6",
  biotope: "var(--emerald)",
  controversy: "#f2626d",
};

export default function ConnectionWeb() {
  const [active, setActive] = useState<string>("mbu");

  const neighbors = new Set<string>([active]);
  EDGES.forEach(([a, b]) => {
    if (a === active) neighbors.add(b);
    if (b === active) neighbors.add(a);
  });

  const activeNode = NODES.find((n) => n.id === active)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="glass relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-[4/3]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {EDGES.map(([a, b], i) => {
            const na = NODES.find((n) => n.id === a)!;
            const nb = NODES.find((n) => n.id === b)!;
            const on = neighbors.has(a) && neighbors.has(b);
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={on ? TYPE_COLOR[activeNode.type] : "rgba(255,255,255,0.12)"}
                strokeWidth={on ? 0.6 : 0.3}
                className="transition-all duration-500"
              />
            );
          })}
          {NODES.map((n) => {
            const on = neighbors.has(n.id);
            const isActive = n.id === active;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                onClick={() => setActive(n.id)}
                className="cursor-pointer"
              >
                <circle
                  r={isActive ? 4.5 : 3}
                  fill={TYPE_COLOR[n.type]}
                  opacity={on ? 1 : 0.3}
                  className="transition-all duration-500"
                />
                {isActive && (
                  <motion.circle
                    fill="none"
                    stroke={TYPE_COLOR[n.type]}
                    strokeWidth={0.5}
                    opacity={0.6}
                    animate={{ r: [5, 9, 5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <text
                  y={n.y > 80 ? 9 : -6}
                  textAnchor="middle"
                  fontSize="2.6"
                  fill={on ? "#e9f1ee" : "rgba(233,241,238,0.4)"}
                  className="pointer-events-none select-none transition-all duration-500"
                  style={{ fontStyle: n.type === "species" ? "italic" : "normal" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_COLOR) as Node["type"][]).map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] capitalize text-white/60"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: TYPE_COLOR[t] }}
              />
              {t}
            </span>
          ))}
        </div>
        <div
          className="glass rounded-2xl p-6"
          style={{ borderColor: TYPE_COLOR[activeNode.type] }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: TYPE_COLOR[activeNode.type] }}
          >
            {activeNode.type}
          </span>
          <h4 className="font-display mt-1 text-xl text-white">
            {activeNode.label}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {activeNode.detail}
          </p>
          <p className="mt-4 text-xs text-white/60">
            Tap any node to expand its connections. This is a slice of the
            533,422-edge cross-kingdom graph.
          </p>
        </div>
      </div>
    </div>
  );
}
