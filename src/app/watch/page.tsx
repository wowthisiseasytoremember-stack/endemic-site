import { Reveal } from "@/components/Reveal";

export default function ExpeditionTVPage() {
  return (
    <main className="min-h-screen bg-[#040908] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(31,184,196,0.11),transparent_40%)]" />
        <div className="mx-auto max-w-5xl px-6 py-28 text-center md:py-44">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-aqua/20 bg-aqua/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-aqua">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_12px_rgba(31,184,196,0.7)]" />
              In development
            </div>
            <h1 className="mt-7 font-display text-5xl font-medium tracking-[-0.04em] md:text-7xl">
              Expedition TV
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              Field footage and visual explainers that connect an organism in captivity to the habitat it actually evolved in.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-14 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
              {[
                ["01", "Place", "Start with the river, forest, bog, or floodplain."],
                ["02", "Organism", "Show the adaptations that matter in husbandry."],
                ["03", "Practice", "Translate field ecology into decisions at home."],
              ].map(([number, title, body]) => (
                <div key={number} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-[0.2em] text-aqua/70">{number}</span>
                  <h2 className="mt-8 font-display text-xl text-white">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <a href="/read" className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Explore Field Notes
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
