import type { Metadata } from "next";
import Link from "next/link";

import { getReadyProofMedia } from "@/data/product-proof/media";

export const metadata: Metadata = {
  title: "Research Rabbit Holes — Endemic",
  description:
    "Source-backed field notes that follow the paper trail behind aquarium fish and cultivated plants.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const cardinalMedia = getReadyProofMedia("cardinal-tetra-hero-pd-paolo-neo");
const pinkMedia = getReadyProofMedia("pink-princess-hero-ccby2-cliff-landscape");
const dragonMedia = getReadyProofMedia("dragon-puffer-hero-ccby-sa4-abu-hamas");

const rabbitHoles = [
  {
    href: "/prototype/cardinal-tetra",
    eyebrow: "BioTrack RI · accepted release",
    title: "Cardinal Tetra",
    scientificName: "Paracheirodon axelrodi",
    description:
      "A naming story with two different human roles: the scientist who described it and the person the name honors.",
    accent: "text-[#7fe3ec]",
    line: "bg-[#7fe3ec]",
    wash:
      "linear-gradient(180deg, rgba(4,9,8,0.02), rgba(4,9,8,0.22) 45%, rgba(4,9,8,0.92))",
    media: cardinalMedia,
  },
  {
    href: "/prototype/pink-princess",
    eyebrow: "BioTrack RI · accepted release",
    title: "Pink Princess",
    scientificName: "Philodendron erubescens 'Pink Princess'",
    description:
      "A provenance trail that shows what the accepted record can prove — and refuses to invent the missing origin story.",
    accent: "text-[#6fd79d]",
    line: "bg-[#6fd79d]",
    wash:
      "linear-gradient(180deg, rgba(4,9,8,0.02), rgba(4,9,8,0.2) 42%, rgba(4,9,8,0.94))",
    media: pinkMedia,
  },
  {
    href: "/prototype/dragon-puffer",
    eyebrow: "Source-reconciled exemplar",
    title: "Dragon Puffer",
    scientificName: "Pao palembangensis",
    description:
      "Taxonomy, type locality, freshwater ecology and a peer-reviewed captive-breeding paper in one explorable field note.",
    accent: "text-[#e8b85f]",
    line: "bg-[#e8b85f]",
    wash:
      "linear-gradient(180deg, rgba(4,9,8,0.02), rgba(4,9,8,0.18) 40%, rgba(4,9,8,0.95))",
    media: dragonMedia,
  },
] as const;

export default function ResearchRabbitHolesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040908] px-5 py-14 text-white sm:px-8 sm:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] opacity-80"
        style={{
          background:
            "radial-gradient(circle at 18% 8%, rgba(31,184,196,0.12), transparent 23rem), radial-gradient(circle at 84% 16%, rgba(47,174,107,0.09), transparent 25rem)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/48 transition hover:text-white/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <span aria-hidden="true">←</span>
          <span>Endemic</span>
        </Link>

        <header className="mt-9 grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1fr)_15rem] md:items-end md:pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">
                Field Notes
              </p>
            </div>
            <h1 className="mt-5 max-w-[13ch] font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Follow the evidence until it gets interesting.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Not care sheets. Each rabbit hole starts with a real organism, then
              follows the names, people, documents, corrections and unanswered
              questions that make the story worth keeping.
            </p>
          </div>

          <div className="md:pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/32">
              Open trails
            </p>
            <p className="mt-2 font-display text-5xl font-medium tracking-[-0.04em] text-white/88">
              {rabbitHoles.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/42">
              Two accepted RI projections and one source-reconciled exemplar.
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
          {rabbitHoles.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative min-h-[430px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#07100e] shadow-[0_26px_80px_rgba(0,0,0,0.22)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
                <img
                  src={item.media.original_url}
                  alt={item.media.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: item.wash }}
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 flex min-h-[430px] flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className={`max-w-[17rem] text-[10px] font-semibold uppercase tracking-[0.18em] ${item.accent}`}>
                    {item.eyebrow}
                  </p>
                  <span className="font-mono text-[10px] text-white/35">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-auto">
                  <span className={`mb-4 block h-px w-10 ${item.line}`} aria-hidden="true" />
                  <h2 className="font-display text-3xl font-medium tracking-[-0.03em] sm:text-[2rem]">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 font-serif text-sm italic text-white/48">
                    {item.scientificName}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/62">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <p className="text-sm font-medium text-white/78 transition group-hover:text-white">
                      Open rabbit hole <span aria-hidden="true">→</span>
                    </p>
                    <p className="max-w-[9rem] text-right text-[9px] leading-4 text-white/32">
                      {item.media.creator} · {item.media.license}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <p className="mt-8 max-w-3xl text-xs leading-5 text-white/36">
          Cardinal Tetra and Pink Princess are projected from accepted BioTrack
          Research Intelligence packets. Dragon Puffer remains explicitly
          source-reconciled rather than being mislabeled as an accepted RI packet.
        </p>
      </div>
    </main>
  );
}
