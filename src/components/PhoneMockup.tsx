import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[260px] shrink-0 rounded-[2.4rem] border border-white/15 bg-[#0a1615] p-2 shadow-2xl ${className}`}
      style={{ boxShadow: `0 30px 80px -20px ${accent}55` }}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60" />
      <div className="h-[520px] overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-[#0c1e1c] to-[#06100f]">
        {children}
      </div>
    </div>
  );
}

export function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
      <p className="text-[9px] uppercase tracking-wider text-white/60">{label}</p>
      <p className="mt-0.5 text-sm font-semibold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}
