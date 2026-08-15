import { Reveal } from "@/components/Reveal";
import AtmosphereCanvas from "@/components/AtmosphereCanvas";
import { CrossKingdom } from "@/components/CrossKingdom";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";

export const revalidate = 3600;

const IMG = {
  biotope: "/biotope.png",
};

export default function AquaTrackPage() {
  return (
    <main className="relative min-h-screen bg-[#030b14] selection:bg-[#7fe3ec]/30">
      <AtmosphereCanvas />
      
      {/* HERO — Asymmetrical, Editorial */}
      <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
            
            <div className="lg:col-span-7">
              <Reveal>
                <Link href="/" className="inline-flex items-center gap-3 border-l-2 border-[#7fe3ec] pl-4 transition-opacity hover:opacity-70">
                  <span className="font-medium text-[#7fe3ec]">Endemic</span>
                  <span className="text-white/40">—</span>
                  <span className="text-white/60">AquaTrack</span>
                </Link>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="mt-8 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-[5.5rem]">
                  Know the <span className="italic text-[#7fe3ec]">river.</span>
                </h1>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pb-4">
              <Reveal delay={200}>
                <p className="text-lg leading-relaxed text-white/70">
                  Every fish in your tank evolved to survive a highly specific river or floodplain. We mapped the water chemistry of the Amazon, the Congo, and Lake Tanganyika so you can recreate their home perfectly.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <div className="w-56 h-16">
                    <TiltCard href="#download" className="flex items-center justify-center rounded-full bg-[#7fe3ec] text-sm font-semibold text-[#030b14]">
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
          <div className="relative overflow-hidden rounded-[2rem] bg-[#030b14] ring-1 ring-white/10 lg:aspect-[16/9]">
            
            {/* The Full Uncropped Dashboard Image */}
            <div className="absolute inset-0">
              <img src={IMG.biotope} alt="Amazon biotope visualization" className="h-full w-full object-cover lg:object-contain object-right" />
            </div>
            
            {/* The Overlay Panel covering the baked-in text */}
            <div className="relative z-10 w-full lg:w-[45%] h-full bg-[#05111f] lg:bg-[#05111f]/95 backdrop-blur-xl border-r border-white/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[#7fe3ec]">
                <span className="h-px w-8 bg-[#7fe3ec]" />
                <span className="text-sm font-medium">Biotope Visualization</span>
              </div>
              <h3 className="mt-4 font-display text-4xl font-medium text-white">Rio Negro Basin</h3>
              <p className="mt-2 text-lg text-white/60">Amazonas, Brazil</p>
              
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
                <div>
                  <dt className="text-sm text-white/40">Temperature</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">26°C - 30°C</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">pH Level</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">3.5 - 6.0 (Acidic)</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">Water Flow</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">Sluggish</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/40">Tannins</dt>
                  <dd className="mt-1 text-base font-medium text-white/90">Extremely High</dd>
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
              <span className="text-white/40">Start measuring.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/60">
              Unexplained losses? Algae blooms? Most aquarium problems come from forcing blackwater fish into hard tap water. AquaTrack helps you recreate the exact parameters they evolved to expect.
            </p>
          </Reveal>
        </div>
      </section>
      
      <CrossKingdom />

      {/* SPECIES DISCOVERY */}
      <section className="relative z-10 bg-[#05111f] py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-4xl font-medium text-white md:text-5xl">
                  Who discovered your fish?
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/60">
                  Every species has a history. The hobby is full of misidentified tetras, disputed origins, and forgotten expeditions. We map the paper trail from the first sketching to your living room.
                </p>
                <div className="mt-10 space-y-6 border-l-2 border-white/10 pl-6">
                  <p className="text-lg text-white/80 transition-colors hover:text-[#7fe3ec]">Are your Neon Tetras actually from the Amazon?</p>
                  <p className="text-lg text-white/80 transition-colors hover:text-[#7fe3ec]">Why are there 15 different species sold as &quot;Corydoras julii&quot;?</p>
                  <p className="text-lg text-white/80 transition-colors hover:text-[#7fe3ec]">Who originally documented the Amano Shrimp?</p>
                </div>
              </div>
              
              <div className="w-full lg:w-[400px] h-[350px] justify-self-end">
                <TiltCard className="relative rounded-[2rem] bg-[#030b14] p-10 ring-1 ring-white/10 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                   <div className="flex items-start justify-between border-b border-white/10 pb-6">
                     <div>
                       <p className="font-display text-2xl font-medium text-white">Caridina multidentata</p>
                       <p className="mt-1 font-medium text-[#7fe3ec]">Amano Shrimp</p>
                     </div>
                   </div>
                   <div className="mt-8 space-y-6">
                     <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                       <span className="text-white/40">Described</span>
                       <span className="text-lg font-medium text-white">Stimpson, 1860</span>
                     </div>
                     <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                       <span className="text-white/40">Popularized</span>
                       <span className="text-lg font-medium text-white">Takashi Amano (1980s)</span>
                     </div>
                     <div className="flex justify-between items-baseline">
                       <span className="text-white/40">Reproduction</span>
                       <span className="text-lg font-medium text-[#e8a12c]">Needs Brackish Water</span>
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
          <h2 className="font-display text-5xl font-medium text-white">Master the water.</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-white/60">
            Download AquaTrack for iOS and map your first 5 tanks for free.
          </p>
          <div className="mt-12 flex justify-center">
             <div className="w-48 h-16">
                <TiltCard href="#" className="flex items-center justify-center rounded-full bg-white text-sm font-semibold text-[#030b14]">
                  Get AquaTrack
                </TiltCard>
             </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
