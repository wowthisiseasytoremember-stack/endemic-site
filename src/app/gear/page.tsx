import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export default function CuratedGearPage() {
  return (
    <main className="min-h-screen bg-[#040908] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(232,161,44,0.10),transparent_38%)]" />
        <div className="mx-auto max-w-5xl px-6 py-28 text-center md:py-44">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-amber/20 bg-amber/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_12px_rgba(232,161,44,0.65)]" />
              In development
            </div>
            <h1 className="mt-7 font-display text-5xl font-medium tracking-[-0.04em] md:text-7xl">
              Curated Gear
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              Equipment recommendations built around habitat requirements, not generic bestseller lists.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-14 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
              {[
                ["01", "Habitat first", "Match flow, light, humidity, and substrate to the organism."],
                ["02", "Evidence linked", "Show why a piece of equipment belongs in a setup."],
                ["03", "No filler", "Keep the catalog small enough to remain useful."],
              ].map(([number, title, body]) => (
                <div key={number} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-[0.2em] text-amber/70">{number}</span>
                  <h2 className="mt-8 font-display text-xl text-white">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <Link href="/read" className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Read Field Notes while we build it
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
