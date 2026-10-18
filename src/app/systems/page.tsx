import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ecosystemFacts, corpusDisclosure } from "@/data/ecosystem-facts";

export const metadata: Metadata = {
  title: "Behind the Research | Endemic",
  description:
    "How the Endemic ecosystem connects botanical source research, species databases, software interfaces, and reusable editorial production.",
};

const stages = [
  {
    number: "01",
    title: "Capture and structure",
    discipline: "AquaScrape · FloraTrack · AquaTrack",
    description:
      "Python research and ingestion tooling turns scattered source material into queryable botanical, cultivar, aquatic and habitat records. Original records remain distinguishable from inference and unresolved leads.",
    tags: ["Source discovery", "Normalization", "Python & SQLite", "Taxonomic identity"],
  },
  {
    number: "02",
    title: "Connect and explore",
    discipline: "BioTrack · Endemic · SwiftUI",
    description:
      "Typed relationships and biological context become useful interfaces: species dossiers, research trails, maps, app prototypes, and navigable source context.",
    tags: ["Evidence-linked data", "Interactive front end", "Product prototyping", "Reusable records"],
  },
  {
    number: "03",
    title: "Produce and distribute",
    discipline: "Content Factory · Tangle Trove",
    description:
      "Research packets and visual assets can support longer stories, short-form cutdowns, captions, thumbnails, and publishing metadata without starting the research over each time.",
    tags: ["Video workflows", "Content atomization", "Editorial packaging", "Automation"],
  },
] as const;

const demonstrations = [
  {
    href: "/prototype/pink-princess",
    eyebrow: "Botanical provenance",
    title: "The Pink Princess paper trail",
    description:
      "A source-aware exploration of cultivar names, parent relationships, and unresolved claims.",
  },
  {
    href: "/prototype/dragon-puffer",
    eyebrow: "Specialized aquatic research",
    title: "The dragon puffer research trail",
    description:
      "An uncommon species case study that makes distinctions among habitat, sources and uncertainty visible.",
  },
  {
    href: "/prototype/cardinal-tetra",
    eyebrow: "Species history",
    title: "Cardinal tetra: names and evidence",
    description:
      "The human and ecological story behind a familiar species, projected into a navigable research view.",
  },
] as const;

export default function SystemsPage() {
  return (
    <main className="min-h-screen bg-[#040908] text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-28 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(68,171,116,0.15),transparent_50%),radial-gradient(ellipse_at_5%_75%,rgba(31,184,196,0.12),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Link href="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8fd4b6] hover:text-[#c4f7df]">← Endemic</Link>
            <p className="mt-14 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Behind the work</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">
              From a name in a source to <span className="italic text-[#8fd4b6]">something worth exploring.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
              Endemic is the visible layer of a wider, independently developed biological research
              and storytelling ecosystem. Its work connects data acquisition, structured botanical
              knowledge, app interfaces, and multi-format content production.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#demonstrations" className="rounded-full bg-[#b7f0d0] px-6 py-3 text-sm font-semibold text-[#06160e] transition-colors hover:bg-white">
                Explore three working case studies
              </Link>
              <Link href="/read" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10">
                Browse Field Notes
              </Link>
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1c16] shadow-2xl lg:min-h-[480px]">
            <Image src="/images/nepenthes.jpg" fill priority alt="Nepenthes pitcher plant photographed against a green background" className="object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06140d] via-[#06140d]/15 to-transparent" />
            <div className="absolute bottom-0 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b7f0d0]">Botany × software × storytelling</p>
              <p className="mt-3 max-w-sm font-display text-2xl text-white">Research that does more than sit in a spreadsheet.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Dataset scale" className="border-y border-white/10 bg-[#0a1511] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystemFacts.map((fact) => (
              <div key={fact.label} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                <p className="font-display text-4xl font-medium tracking-tight text-white">{fact.value}</p>
                <p className="mt-3 text-sm font-semibold text-[#c5f1dc]">{fact.label}</p>
                <p className="mt-2 text-xs leading-5 text-white/50">{fact.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-4xl text-xs leading-6 text-white/45">{corpusDisclosure}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fd4b6]">The workflow</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">One research trail. Multiple useful outputs.</h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            The research and production tools already exist as separate projects. The system is being
            connected incrementally; individual outputs and examples are available without claiming
            every stage runs as one fully autonomous product.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {stages.map((stage) => (
            <article key={stage.number} className="rounded-[2rem] border border-white/10 bg-[#0c1814] p-7 lg:p-8">
              <p className="font-display text-4xl text-[#8fd4b6]/45">{stage.number}</p>
              <h3 className="mt-8 font-display text-2xl font-medium">{stage.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8fd4b6]">{stage.discipline}</p>
              <p className="mt-6 text-sm leading-7 text-white/65">{stage.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {stage.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="demonstrations" className="border-y border-white/10 bg-[#07120f] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fd4b6]">Actual research subjects</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">Explore the work, not just the claims.</h2>
          <p className="mt-5 max-w-3xl leading-7 text-white/60">These prototype research pages are implemented in Endemic. Their evidence statuses differ; a visual demonstration is not a claim that every underlying biological question has been settled.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {demonstrations.map((item) => (
              <Link key={item.href} href={item.href} className="group flex min-h-72 flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-[#8fd4b6]/55 hover:bg-white/[0.075]">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fd4b6]">{item.eyebrow}</span>
                <h3 className="mt-6 font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{item.description}</p>
                <span className="mt-auto pt-8 text-sm font-semibold text-[#b7f0d0]">Open research trail ↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-10 rounded-[2.5rem] border border-[#8fd4b6]/20 bg-gradient-to-br from-[#142d23] to-[#07130f] p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a7e3c4]">A practical example</p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight sm:text-4xl">What this approach could do for a specialty plant grower.</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-white/75">
              Imagine one documented propagation or acclimation session producing a clear customer guide,
              a short educational video, a product description, still-image cutdowns, and a reusable
              species reference. The grower contributes authentic footage and expertise; structured
              research and content automation reduce the repetitive editing and publishing work.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/45">Illustrative application, not a claim of a deployed nursery integration or laboratory qualification.</p>
            <Link href="/watch" className="mt-7 inline-flex rounded-full border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/10">See the video collection ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
