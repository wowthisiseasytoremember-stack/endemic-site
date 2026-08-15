import { Reveal } from "@/components/Reveal";
import AtmosphereCanvas from "@/components/AtmosphereCanvas";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

const IMG = {
  pufferHero: "/images/pufferHero.jpg",
  nepenthes: "/images/nepenthes.jpg",
};

export default function EndemicPortal() {
  return (
    <main className="relative min-h-screen bg-[#040908] text-white selection:bg-white/20">
      
      {/* ABOVE FOLD: 100vh layout */}
      <section className="relative flex h-screen min-h-[800px] flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <AtmosphereCanvas />
        
        <div className="relative z-10 w-full max-w-7xl">
          <Reveal>
            <div className="text-center">
              <h1 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
                Endemic
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                Don&apos;t guess. Replicate the wild.
              </p>
            </div>
          </Reveal>

          {/* Primary Apps - Pulled up into the viewport */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-10">
            {/* AquaTrack */}
            <div className="h-[400px] md:h-[450px]">
              <TiltCard href="/aquatrack" className="group relative overflow-hidden rounded-[2rem] bg-[#030b14] ring-1 ring-white/10">
                <div className="absolute inset-0 z-0">
                  <Image src={IMG.pufferHero} fill priority alt="AquaTrack" className="object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030b14] via-[#030b14]/50 to-transparent" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col p-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7fe3ec]/20 bg-[#7fe3ec]/10 text-[#7fe3ec]">
                    🌊
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-display text-4xl font-medium text-white">AquaTrack</h2>
                    <p className="mt-2 text-lg text-white/70">Build authentic river biotopes.</p>
                    <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#7fe3ec]">
                      <span className="h-px w-6 bg-[#7fe3ec]" />
                      Explore the app
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* FloraTrack */}
            <div className="h-[400px] md:h-[450px]">
              <TiltCard href="/floratrack" className="group relative overflow-hidden rounded-[2rem] bg-[#020b06] ring-1 ring-white/10">
                <div className="absolute inset-0 z-0">
                  <Image src={IMG.nepenthes} fill priority alt="FloraTrack" className="object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b06] via-[#020b06]/50 to-transparent" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col p-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2fae6b]/20 bg-[#2fae6b]/10 text-[#2fae6b]">
                    🌿
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-display text-4xl font-medium text-white">FloraTrack</h2>
                    <p className="mt-2 text-lg text-white/70">Cultivate vibrant indoor canopies.</p>
                    <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#2fae6b]">
                      <span className="h-px w-6 bg-[#2fae6b]" />
                      Explore the app
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center opacity-50 animate-bounce">
            <span className="text-sm tracking-widest uppercase">Scroll for more</span>
          </div>
        </div>
      </section>

      {/* BELOW FOLD: Ecosystem Content */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-medium text-white mb-10">The Endemic Ecosystem</h2>
        </Reveal>
        
        <div className="grid gap-8 md:grid-cols-3">
          <TiltCard href="/read" className="group relative overflow-hidden rounded-[2rem] bg-[#080d0b] ring-1 ring-white/10">
            <div className="absolute inset-0 z-0">
              <img src="/blog.jpg" alt="Field Notes" className="h-full w-full object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] to-[#080d0b]/20" />
            </div>
            <div className="relative z-10 flex min-h-[350px] flex-col justify-end p-8 transform-gpu" style={{ transform: "translateZ(20px)" }}>
              <h3 className="font-display text-2xl text-white">Field Notes</h3>
              <p className="mt-3 text-sm text-white/60">Read the blog & cultivar histories.</p>
            </div>
          </TiltCard>

          <TiltCard href="/watch" className="group relative overflow-hidden rounded-[2rem] bg-[#080d0b] ring-1 ring-white/10">
            <div className="absolute inset-0 z-0">
              <img src="/youtube.jpg" alt="Expedition TV" className="h-full w-full object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] to-[#080d0b]/20" />
            </div>
            <div className="relative z-10 flex min-h-[350px] flex-col justify-end p-8 transform-gpu" style={{ transform: "translateZ(20px)" }}>
              <h3 className="font-display text-2xl text-white">Expedition TV</h3>
              <p className="mt-3 text-sm text-white/60">Watch biotope documentaries.</p>
            </div>
          </TiltCard>

          <TiltCard href="/gear" className="group relative overflow-hidden rounded-[2rem] bg-[#080d0b] ring-1 ring-white/10">
            <div className="absolute inset-0 z-0">
              <img src="/gear.jpg" alt="Curated Gear" className="h-full w-full object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] to-[#080d0b]/20" />
            </div>
            <div className="relative z-10 flex min-h-[350px] flex-col justify-end p-8 transform-gpu" style={{ transform: "translateZ(20px)" }}>
              <h3 className="font-display text-2xl text-white">Curated Gear</h3>
              <p className="mt-3 text-sm text-white/60">Biotope-matched equipment.</p>
            </div>
          </TiltCard>
        </div>
      </section>
      
    </main>
  );
}
