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
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Don&apos;t guess. Replicate the wild.
              </p>
            </div>
          </Reveal>

          {/* Primary Apps - Pulled up into the viewport */}
          <div id="apps" className="mt-12 grid scroll-mt-28 gap-5 md:mt-16 md:grid-cols-2 lg:gap-8">
            {/* AquaTrack */}
            <div className="h-[330px] sm:h-[380px] md:h-[440px]">
              <TiltCard href="/aquatrack" className="group relative overflow-hidden rounded-[2rem] bg-[#030b14] ring-1 ring-white/10">
                <div className="absolute inset-0 z-0">
                  <Image src={IMG.pufferHero} fill priority alt="AquaTrack" className="object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030b14] via-[#030b14]/50 to-transparent" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col p-7 sm:p-9 lg:p-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7fe3ec]/20 bg-[#7fe3ec]/10 text-[#7fe3ec]">
                    🌊
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">AquaTrack</h2>
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
            <div className="h-[330px] sm:h-[380px] md:h-[440px]">
              <TiltCard href="/floratrack" className="group relative overflow-hidden rounded-[2rem] bg-[#020b06] ring-1 ring-white/10">
                <div className="absolute inset-0 z-0">
                  <Image src={IMG.nepenthes} fill priority alt="FloraTrack" className="object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b06] via-[#020b06]/50 to-transparent" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col p-7 sm:p-9 lg:p-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2fae6b]/20 bg-[#2fae6b]/10 text-[#2fae6b]">
                    🌿
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">FloraTrack</h2>
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
          
          <div className="mt-10 hidden justify-center opacity-40 motion-safe:animate-bounce md:flex">
            <span className="text-sm tracking-widest uppercase">Scroll for more</span>
          </div>
        </div>
      </section>

      {/* BELOW FOLD: Ecosystem Content */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Beyond the apps</p>
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">The Endemic Ecosystem</h2>
            </div>
            <span className="hidden max-w-sm text-right text-sm leading-relaxed text-white/40 md:block">
              Field Notes about the organisms, habitats, people, names, and paper trails behind the hobby.
            </span>
          </div>
        </Reveal>
        
        <div className="max-w-2xl">
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

        </div>
      </section>
      
    </main>
  );
}
