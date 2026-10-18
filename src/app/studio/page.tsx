import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ecosystemFacts, corpusDisclosure } from "@/data/ecosystem-facts";

export const metadata: Metadata = {
  title: "Behind Endemic | Botanical research, software & content systems",
  description:
    "A working portfolio across botanical research, data engineering, website and iOS experiences, and content production. Includes real dataset coverage and working Endemic demonstrations.",
};

const PROJECTS = [
  {
    index: "01",
    heading: "FloraTrack & AquaTrack",
    category: "Product design · Front end · Research",
    copy: "Two connected product explorations: plant and aquatic-species research translated into navigable interfaces, environmental context, and natural-history stories. The iOS releases are still in development; the web previews are available here.",
    href: "/floratrack",
    cta: "Explore FloraTrack",
    secondaryHref: "/aquatrack",
    secondaryLabel: "AquaTrack",
  },
  {
    index: "02",
    heading: "AquaScrape & BioTrack",
    category: "Back end · Data pipelines · Source analysis",
    copy: "Research capture and structured extraction, species-name normalization, multilingual source discovery, data ingestion, and evidence-backed relationships. Sources, uncertainty, and conflicting claims are modeled separately from polished presentation.",
    href: "/prototype",
    cta: "Explore live research prototypes",
    secondaryHref: "/prototype/dragon-puffer",
    secondaryLabel: "Dragon puffer case study",
  },
  {
    index: "03",
    heading: "Content Factory & Tangle Trove",
    category: "Editorial · Video · Automation",
    copy: "Editorial research and video-production workflows designed to turn source material into scripts, longer narratives, short-form edits, supporting graphics, and channel-ready packages. Automation, production, and actual publishing are distinct stages.",
    href: "/watch",
    cta: "Explore video stories",
    secondaryHref: "https://www.youtube.com/channel/UC6tvdKJ4iCZxRpkO72IYwgQ",
    secondaryLabel: "View published YouTube channel",
  },
] as const;

const WORKFLOW = [
  { number: "01", title: "Capture once", description: "Photograph a real plant, culture vessel, acclimation step, or lab process with permission and accurate context." },
  { number: "02", title: "Structure the facts", description: "Catalog the species or hybrid name, plant batch, process stage, rights, key claims, and approved care information." },
  { number: "03", title: "Create the story", description: "Edit a useful short demonstration, educational caption, product imagery, and a supporting care explainer." },
  { number: "04", title: "Reuse and publish", description: "Prepare platform-specific exports and scheduling drafts so the owner can approve a week's content from one session." },
] as const;

export default function StudioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040908] text-[#f5f5ed] selection:bg-[#83dfb0]/30">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/images/nepenthes.jpg" alt="Carnivorous Nepenthes plant" fill priority className="object-cover object-center opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#040908_0%,rgba(4,9,8,.94)_43%,rgba(4,9,8,.33)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-transparent to-[#040908]/30" />
        </div>
        <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-6 pb-24 pt-36 md:grid-cols-12 md:py-36">
          <div className="md:col-span-8">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#83dfb0]/35 bg-[#83dfb0]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a1efc3]">
              Behind Endemic <span className="h-1 w-1 rounded-full bg-[#a1efc3]" /> Independent portfolio
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.96] tracking-[-0.06em]">
              Living things.<br /><span className="text-[#a1efc3]">Useful systems.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#e8f1eb]/75 md:text-xl">
              More than 5,500 botanical, fish, and aquatic plant entries underpin a growing set of research tools, product interfaces, and video workflows — designed to turn specialized knowledge into something people can use.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/prototype" className="inline-flex items-center justify-center rounded-full bg-[#d7f7df] px-6 py-3 text-sm font-semibold text-[#092019] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Open the working research demos <span className="ml-2" aria-hidden="true">↗</span>
              </Link>
              <a href="#selected-work" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                See the work <span className="ml-2" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <div className="ml-auto max-w-xs border-l border-[#a1efc3]/35 pl-6 text-sm leading-relaxed text-white/65">
              <span className="block pb-3 text-xs uppercase tracking-[0.22em] text-[#a1efc3]">The approach</span>
              One field observation can become a source-backed species record, a product feature, an explainer, and multiple channel-ready edits.
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24" aria-labelledby="dataset-heading">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a1efc3]">Actual dataset snapshots</p>
            <h2 id="dataset-heading" className="mt-3 font-display text-3xl font-medium md:text-5xl">The research has substance.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">These rounded figures describe specific dataset inventories, not production-ready app coverage, accepted biological evidence, or a live species directory.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemFacts.map((stat) => (
            <div key={stat.label} className="bg-[#0a1311] px-6 py-8 md:px-8 md:py-10">
              <div className="font-display text-4xl font-medium tracking-tight text-[#dcfce6] md:text-5xl">{stat.value}</div>
              <div className="mt-3 text-sm font-semibold text-white/90">{stat.label}</div>
              <div className="mt-2 text-xs leading-relaxed text-white/45">{stat.detail}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-white/45">{corpusDisclosure}</p>
        <a href="/research-snapshot.json" className="mt-4 inline-flex text-xs text-[#a1efc3]/80 underline-offset-4 hover:underline">
          Inspect count definitions &amp; evidence snapshots ↗
        </a>
      </section>

      <section id="selected-work" className="border-y border-white/10 bg-[#091310] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a1efc3]">Selected work</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight md:text-6xl">From obscure source to something people can use.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article key={project.index} className="flex min-h-[390px] flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition-colors hover:border-[#a1efc3]/35 hover:bg-white/[0.055] md:p-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#a1efc3]/80">
                  <span>{project.category}</span><span className="font-mono text-white/30">{project.index}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-medium leading-tight">{project.heading}</h3>
                <p className="mt-5 flex-1 text-sm leading-7 text-white/60">{project.copy}</p>
                <div className="mt-7 border-t border-white/10 pt-6">
                  <Link href={project.href} className="block text-sm font-semibold text-[#c6f6d7] hover:underline">{project.cta} ↗</Link>
                  <Link href={project.secondaryHref} className="mt-3 block text-xs text-white/55 hover:text-white">{project.secondaryLabel} ↗</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a1efc3]">Applied to a plant studio</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">One culture session. A week&apos;s worth of useful content.</h2>
          <p className="mt-6 text-base leading-8 text-white/60">
            Example workflow for a small botanical business. This is a proposed demonstration, not a claim that the work has already been delivered to a client or that I operate a tissue-culture lab.
          </p>
          <div className="mt-8 rounded-2xl border border-[#a1efc3]/20 bg-[#a1efc3]/[0.06] p-5 text-sm leading-7 text-white/70">
            <strong className="text-[#d7f7df]">Possible outputs:</strong> a process reel, educational Shorts, species cards, photographed product variants, platform-specific captions, shop listing assets, and drafts ready for the owner&apos;s approval.
          </div>
        </div>
        <ol className="space-y-3 md:col-span-7">
          {WORKFLOW.map((step) => (
            <li key={step.number} className="grid grid-cols-[3.5rem_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[5rem_1fr] sm:p-7">
              <span className="font-display text-3xl text-[#a1efc3]/65">{step.number}</span>
              <div><h3 className="font-display text-xl font-medium">{step.title}</h3><p className="mt-2 text-sm leading-7 text-white/55">{step.description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-white/10 bg-[#0c1913] px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a1efc3]">Research · Build · Explain</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-6xl">Curious about the plant? <br /><span className="text-[#a1efc3]">Follow the evidence.</span></h2>
          </div>
          <Link href="/prototype" className="inline-flex h-fit items-center justify-center rounded-full border border-[#a1efc3]/50 px-6 py-3 text-sm font-semibold text-[#d7f7df] hover:bg-[#a1efc3]/10">
            Explore live exemplars →
          </Link>
        </div>
      </section>
    </main>
  );
}
