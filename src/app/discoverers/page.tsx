import { Reveal } from "@/components/Reveal";
import { discovererSeeds, collectors } from "@/data/content";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function DiscoverersPage() {
  return (
    <main className="relative min-h-screen bg-[#08150e] pt-12">
      {/* DISCOVERERS */}
      <section className="zone-amber relative z-10 px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c877]">
              The People Behind the Latin
            </span>
            <h1 className="font-display mt-3 text-5xl font-semibold sm:text-6xl">
              Who discovered your fish?
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/70">
              Every scientific name in your tank connects back to a real person standing over a river or a jungle specimen. Here are the explorers, scientists, and naturalists who built the taxonomy.
            </p>
          </Reveal>

          {/* Reduce Glass Card Fatigue: Discoverers use a solid deep background instead of blurred glass */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discovererSeeds.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 3) * 60}>
                <article className="group flex h-full flex-col rounded-3xl bg-[#0a1811] p-8 transition-transform hover:-translate-y-2">
                  <div className="flex items-center gap-4">
                    <span className="font-display grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e8a12c] to-[#a5651a] text-xl font-bold text-[#06100f] shadow-[0_0_20px_rgba(232,161,44,0.3)]">
                      {initials(d.name)}
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-tight text-white group-hover:text-[#f2c877] transition-colors">{d.name}</h3>
                      <p className="text-xs text-white/60 mt-1">
                        {d.born}–{d.died} · {d.nationality}
                      </p>
                    </div>
                  </div>
                  {d.speciesCount && (
                    <p className="mt-5 text-sm font-medium text-[#f2c877]">
                      {d.speciesCount.toLocaleString()} species described
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{d.story}</p>
                  <p className="mt-6 border-t border-white/5 pt-4 text-xs text-white/60">
                    <span className="text-white/70 font-medium">Named:</span> {d.keySpecies}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Collectors / expeditions */}
          <Reveal>
            <h3 className="font-display mt-24 text-3xl font-semibold">Expedition routes — real GBIF collectors</h3>
          </Reveal>
          
          <div className="mt-8 space-y-6">
            {collectors.map((c, i) => (
              <Reveal key={c.name} delay={(i % 2) * 60}>
                {/* Instead of cards, use a clean list layout */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-t border-white/10 pt-6">
                  <div className="md:w-1/3">
                    <h4 className="font-display text-2xl text-white">{c.name}</h4>
                    <div className="mt-3 inline-block rounded-full bg-[#e8a12c]/10 px-3 py-1.5 text-xs font-medium text-[#f2c877]">
                      {c.countryCount} countries explored
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-base text-[#f2c877] font-medium">{c.species}</p>
                    <p className="mt-2 text-sm text-white/45">{c.countries}</p>
                    <p className="mt-4 text-base leading-relaxed text-white/70">{c.notes}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
