import { Reveal } from "@/components/Reveal";
import MistCanvas from "@/components/MistCanvas";
import { CrossKingdom } from "@/components/CrossKingdom";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";

export const revalidate = 3600;

const IMG = {
  anthurium: "/canopy.jpg",
};

export default function FloraTrackPage() {
  return (
    <main className="relative min-h-screen bg-[#020b06] selection:bg-[#2fae6b]/30">
      <MistCanvas />
      
      {/* HERO — Asymmetrical, Editorial */}
      <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
            
            <div className="lg:col-span-7">
              <Reveal>
                <Link href="/" className="inline-flex items-center gap-3 border-l-2 border-[#2fae6b] pl-4 transition-opacity hover:opacity-70">
                  <span className="font-medium text-[#2fae6b]">Endemic</span>
                  <span className="text-white/40">—</span>
                  <span className="text-white/60">FloraTrack</span>
                </Link>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="mt-8 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-[5.5rem]">
                  Your plant has a <span className="italic text-[#2fae6b]">paper trail.</span>
                </h1>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pb-4">
              <Reveal delay={200}>
                <p className="text-lg leading-relaxed text-white/70">
                  See exactly which jungle your Anthurium comes from, who discovered it, and the precise light and humidity it needs to thrive. Prevent root rot by matching its native habitat.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <div className="w-56 h-16">
                    <TiltCard href="#download" className="flex items-center justify-center rounded-full bg-[#2fae6b] text-sm font-semibold text-[#020b06]">
                      Download the App
                    </TiltCard>
                  </div>
                  <Link href="/" className="text-sm font-medium text-white/60 transition-colors hover:text-white">
                    Return to Hub
                  </Link>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* PROVENANCE SHOWCASE — Dashboard Overlay */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#020b06] ring-1 ring-white/10 lg:aspect-[16/9]">
            
            {/* The Full Uncropped Dashboard Image */}
            <div className="absolute inset-0">
              <img src={IMG.anthurium} alt="Anthurium biotope visualization" className="h-full w-full object-cover lg:object-contain object-right" />
            </div>
            
            {/* The Overlay Panel covering the baked-in text */}
            <div className="relative z-10 w-full lg:w-[45%] h-full bg-[#05140b] lg:bg-[#05140b]/95 backdrop-blur-xl border-r border-white/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[#2fae6b]">
                <span className="h-px w-8 bg-[#2fae6b]" />
                <span className="text-sm font-medium">Verified Provenance Visualization</span>
              </div>
              <h3 className="mt-4 font-display text-4xl font-medium text-white">Anthurium crystallinum</h3>
              <p className="mt-2 text-lg text-white/60">Linden & André, 1873</p>
              
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
                <div>
                  <dt className="text-sm text-white/40">Native Habitat</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">Colombian Rainforest</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">Humidity</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">70-90% (High)</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">Light</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">Bright, indirect</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">Substrate</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">Airy aroid mix</dd>
                </div>
              </div>
            </div>
            
          </div>
        </Reveal>
      </section>

      {/* CORE BENEFIT — Stark, Editorial Typography */}
      <section className="relative z-10 py-32 md:py-48">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-medium leading-tight text-white md:text-6xl">
              Stop guessing.<br />
              <span className="text-white/40">Start matching.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/60">
              Yellowing leaves? Root rot? Most houseplant issues come from forcing a rainforest species into a desert environment. FloraTrack tells you exactly what they evolved to expect.
            </p>
          </Reveal>
        </div>
      </section>
      
      <CrossKingdom />

      {/* CULTIVAR CONTROVERSIES */}
      <section className="relative z-10 bg-[#05140b] py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-4xl font-medium text-white md:text-5xl">
                  The truth about your Pink Princess.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/60">
                  The houseplant market is full of patented cultivars, disputed origins, and renamed species. We map the entire paper trail—from the first mutation to the patent office.
                </p>
                <div className="mt-10 space-y-6 border-l-2 border-white/10 pl-6">
                  <p className="text-lg text-white/80 transition-colors hover:text-[#2fae6b]">Is it actually a Thai Constellation, or just a sport?</p>
                  <p className="text-lg text-white/80 transition-colors hover:text-[#2fae6b]">Who holds the patent for the Monstera Peru?</p>
                  <p className="text-lg text-white/80 transition-colors hover:text-[#2fae6b]">Why are there 12 different names for the same Epipremnum?</p>
                </div>
              </div>
              
              <div className="w-full lg:w-[400px] h-[350px] justify-self-end">
                <TiltCard className="relative rounded-[2rem] bg-[#020b06] p-10 ring-1 ring-white/10 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                   <div className="flex items-start justify-between border-b border-white/10 pb-6">
                     <div>
                       <p className="font-display text-2xl font-medium text-white">Philodendron erubescens</p>
                       <p className="mt-1 font-medium text-[#2fae6b]">var. &apos;Pink Princess&apos;</p>
                     </div>
                   </div>
                   <div className="mt-8 space-y-6">
                     <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                       <span className="text-white/40">Origin</span>
                       <span className="text-lg font-medium text-white">Mutation (Not Wild)</span>
                     </div>
                     <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                       <span className="text-white/40">Patent Status</span>
                       <span className="text-lg font-medium text-white">Expired / Disputed</span>
                     </div>
                     <div className="flex justify-between items-baseline">
                       <span className="text-white/40">Genetic Stability</span>
                       <span className="text-lg font-medium text-[#e8a12c]">Unstable (Reverts)</span>
                     </div>
                   </div>
                </TiltCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section id="download" className="relative z-10 py-32 text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-medium text-white">Cultivate your jungle.</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-white/60">
            Download FloraTrack for iOS and map your first 5 plants for free.
          </p>
          <div className="mt-12 flex justify-center">
             <div className="w-48 h-16">
                <TiltCard href="#" className="flex items-center justify-center rounded-full bg-white text-sm font-semibold text-[#020b06]">
                  Get FloraTrack
                </TiltCard>
             </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
