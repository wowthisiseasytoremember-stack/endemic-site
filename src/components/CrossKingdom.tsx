import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function CrossKingdom() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-[#000000] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 text-white/40 mb-4 uppercase tracking-widest text-xs font-bold">
                <span className="w-8 h-px bg-white/20" />
                The Endemic Ecosystem
              </div>
              <h3 className="font-display text-3xl font-medium text-white">One philosophy. Two kingdoms.</h3>
              <p className="mt-6 text-lg leading-relaxed text-white/50">
                Whether you&apos;re tracking the pH of a blackwater river or the humidity needs of an equatorial epiphyte, the core philosophy remains the same: <span className="text-white">replicate the wild</span>. 
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="w-48 h-48">
                <TiltCard href="/aquatrack" className="group flex flex-col justify-between rounded-[1.5rem] bg-[#030b14] p-6 ring-1 ring-white/10 transition-colors hover:bg-[#05111f] hover:ring-[#7fe3ec]/50 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                  <span className="text-2xl">🌊</span>
                  <div className="mt-12">
                    <p className="font-medium text-white">AquaTrack</p>
                    <p className="mt-1 text-sm text-white/40 group-hover:text-[#7fe3ec] transition-colors">Explore the waters</p>
                  </div>
                </TiltCard>
              </div>
              
              <div className="w-48 h-48">
                <TiltCard href="/floratrack" className="group flex flex-col justify-between rounded-[1.5rem] bg-[#020b06] p-6 ring-1 ring-white/10 transition-colors hover:bg-[#05140b] hover:ring-[var(--emerald)]/50 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                  <span className="text-2xl">🌿</span>
                  <div className="mt-12">
                    <p className="font-medium text-white">FloraTrack</p>
                    <p className="mt-1 text-sm text-white/40 group-hover:text-[var(--emerald)] transition-colors">Explore the canopy</p>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
