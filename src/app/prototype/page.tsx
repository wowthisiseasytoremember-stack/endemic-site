import type { Metadata } from "next";
import Link from "next/link";

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

const rabbitHoles = [
  {
    href: "/prototype/cardinal-tetra",
    eyebrow: "BioTrack RI · accepted release",
    title: "Cardinal Tetra",
    scientificName: "Paracheirodon axelrodi",
    description:
      "A naming story with two different human roles: the scientist who described it and the person the name honors.",
    accent: "text-[#7fe3ec]",
  },
  {
    href: "/prototype/pink-princess",
    eyebrow: "BioTrack RI · accepted release",
    title: "Pink Princess",
    scientificName: "Philodendron erubescens 'Pink Princess'",
    description:
      "A provenance trail that shows what the accepted record can prove — and refuses to invent the missing origin story.",
    accent: "text-[#6fd79d]",
  },
  {
    href: "/prototype/dragon-puffer",
    eyebrow: "Source-reconciled exemplar",
    title: "Dragon Puffer",
    scientificName: "Pao palembangensis",
    description:
      "Taxonomy, type locality, freshwater ecology and a peer-reviewed captive-breeding paper in one explorable field note.",
    accent: "text-[#e8b85f]",
  },
] as const;

export default function ResearchRabbitHolesPage() {
  return (
    <main className="min-h-screen bg-[#040908] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-white/45 transition hover:text-white/80"
        >
          ← Endemic
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
            Field Notes
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-6xl">
            Follow the evidence until it gets interesting.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            These are research rabbit holes, not care-sheet summaries. Each one
            starts with a real organism and follows names, sources, relationships,
            corrections and unanswered questions as far as the evidence allows.
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {rabbitHoles.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[320px] flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.accent}`}>
                {item.eyebrow}
              </p>
              <div className="mt-auto">
                <h2 className="font-display text-3xl font-medium tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-white/35">
                  {item.scientificName}
                </p>
                <p className="mt-5 text-sm leading-6 text-white/58">
                  {item.description}
                </p>
                <p className="mt-7 text-sm font-medium text-white/75 transition group-hover:text-white">
                  Open rabbit hole →
                </p>
              </div>
            </Link>
          ))}
        </section>

        <p className="mt-8 max-w-3xl text-xs leading-5 text-white/35">
          Cardinal Tetra and Pink Princess are projected from accepted BioTrack
          Research Intelligence packets. Dragon Puffer is a source-reconciled
          exemplar and is labeled separately rather than being presented as an
          accepted RI packet.
        </p>
      </div>
    </main>
  );
}
