import { Reveal } from "@/components/Reveal";
import { Nav } from "@/components/Nav";

export default function CuratedGearPage() {
  return (
    <main className="min-h-screen bg-[#040908] text-white">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 py-32 md:py-48 text-center">
        <Reveal>
          <div className="mb-4 flex justify-center items-center gap-4 text-white/40 uppercase tracking-widest text-xs font-bold">
            <span className="w-8 h-px bg-white/20" />
            Endemic Equipment
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h1 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
            Curated Gear
          </h1>
          <p className="mt-6 text-xl text-white/60 mx-auto max-w-2xl">
            The exact equipment we use to replicate the wild, coming soon.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
