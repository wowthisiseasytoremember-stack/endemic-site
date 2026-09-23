import Link from "next/link";
import type { ReactNode } from "react";

export type EvidenceState = "supported" | "narrowed" | "disputed" | "unknown";
export type DestinationState = "READY" | "SUMMARY" | "RESEARCHING" | "UNAVAILABLE";

const evidenceStyles: Record<EvidenceState, string> = {
  supported: "border-emerald/35 bg-emerald/10 text-emerald",
  narrowed: "border-amber/35 bg-amber/10 text-amber",
  disputed: "border-red-400/35 bg-red-400/10 text-red-300",
  unknown: "border-white/15 bg-white/[0.04] text-white/55",
};

const destinationStyles: Record<DestinationState, string> = {
  READY: "border-aqua/25 bg-aqua/[0.06] text-aqua",
  SUMMARY: "border-white/15 bg-white/[0.04] text-white/70",
  RESEARCHING: "border-amber/25 bg-amber/[0.06] text-amber",
  UNAVAILABLE: "border-white/10 bg-white/[0.025] text-white/35",
};

function EvidencePill({ state }: { state: EvidenceState }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${evidenceStyles[state]}`}
    >
      {state}
    </span>
  );
}

export function SubjectIdentity({
  eyebrow,
  commonName,
  scientificName,
  lead,
  children,
}: {
  eyebrow?: string;
  commonName: string;
  scientificName: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] md:px-10 md:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aqua/10 blur-3xl"
      />
      <div className="relative max-w-3xl">
        {eyebrow && (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-aqua/80">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-medium tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
          {commonName}
        </h1>
        <p className="mt-3 text-sm italic text-white/45 sm:text-base">{scientificName}</p>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">{lead}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export function StoryLead({
  label = "Why this one is interesting",
  title,
  children,
  accent = "aqua",
}: {
  label?: string;
  title: string;
  children: ReactNode;
  accent?: "aqua" | "emerald" | "amber";
}) {
  const accentClass = {
    aqua: "bg-aqua text-aqua",
    emerald: "bg-emerald text-emerald",
    amber: "bg-amber text-amber",
  }[accent];

  const [dot, text] = accentClass.split(" ");

  return (
    <section className="rounded-2xl border border-white/10 bg-[#071113]/78 p-6 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot} shadow-[0_0_18px_currentColor]`} />
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${text}`}>{label}</span>
      </div>
      <h2 className="font-display text-2xl font-medium leading-tight text-white md:text-3xl">{title}</h2>
      <div className="mt-4 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">{children}</div>
    </section>
  );
}

export function ThreadCard({
  question,
  answer,
  href,
  state = "READY",
  meta,
}: {
  question: string;
  answer?: string;
  href?: string;
  state?: DestinationState;
  meta?: string;
}) {
  const interactive = Boolean(href) && (state === "READY" || state === "SUMMARY");

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Follow the thread</span>
        <span className={`rounded-full border px-2 py-1 text-[9px] font-bold tracking-[0.14em] ${destinationStyles[state]}`}>
          {state}
        </span>
      </div>
      <div className="mt-6 flex items-end justify-between gap-5">
        <div>
          <h3 className="font-display text-xl font-medium leading-snug text-white md:text-2xl">{question}</h3>
          {answer && <p className="mt-2 text-sm leading-relaxed text-white/52">{answer}</p>}
          {meta && <p className="mt-3 text-xs text-white/30">{meta}</p>}
        </div>
        <span
          aria-hidden="true"
          className={`shrink-0 text-2xl transition-transform duration-300 ${interactive ? "text-aqua group-hover:translate-x-1" : "text-white/18"}`}
        >
          →
        </span>
      </div>
    </>
  );

  const classes =
    "group block min-h-40 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-[transform,border-color,background-color] duration-300 motion-reduce:transition-none";

  if (interactive && href) {
    return (
      <Link
        href={href}
        className={`${classes} hover:-translate-y-0.5 hover:border-aqua/35 hover:bg-aqua/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/70`}
      >
        {body}
      </Link>
    );
  }

  return <div className={`${classes} ${state === "UNAVAILABLE" ? "opacity-70" : "opacity-100"}`}>{body}</div>;
}

export function CorrectionCard({
  framing,
  evidence,
  boundary,
}: {
  framing: string;
  evidence: string;
  boundary?: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-amber/25 bg-amber/[0.045]">
      <div className="border-b border-amber/15 px-5 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber">What people get wrong</span>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-white/8 p-5 md:border-b-0 md:border-r">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/32">Common framing</p>
          <p className="mt-3 leading-relaxed text-white/55">{framing}</p>
        </div>
        <div className="p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber/80">What the evidence supports</p>
          <p className="mt-3 leading-relaxed text-white/78">{evidence}</p>
        </div>
      </div>
      {boundary && <p className="border-t border-white/8 px-5 py-4 text-sm leading-relaxed text-white/40">{boundary}</p>}
    </section>
  );
}

export function MysteryCard({
  question,
  currentAnswer,
  whyUnresolved,
  resolvesWith,
}: {
  question: string;
  currentAnswer: string;
  whyUnresolved?: string;
  resolvesWith: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div aria-hidden="true" className="absolute -right-12 -top-16 text-[11rem] font-display text-white/[0.025]">?</div>
      <div className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">One piece of the story is still missing</p>
        <h3 className="mt-4 max-w-3xl font-display text-2xl font-medium leading-tight text-white md:text-3xl">{question}</h3>
        <p className="mt-5 max-w-3xl leading-relaxed text-white/62">{currentAnswer}</p>
        {whyUnresolved && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/38">{whyUnresolved}</p>
        )}
        <div className="mt-7 rounded-xl border border-dashed border-white/12 bg-black/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/32">What would resolve it</p>
          <p className="mt-2 text-sm leading-relaxed text-white/58">{resolvesWith}</p>
        </div>
      </div>
    </section>
  );
}

export function EvidenceReceipt({
  sourceLabel,
  locator,
  relationship,
  scopeNote,
  state = "supported",
  href,
}: {
  sourceLabel: string;
  locator?: string;
  relationship: string;
  scopeNote?: string;
  state?: EvidenceState;
  href?: string;
}) {
  return (
    <details className="group rounded-xl border border-white/10 bg-black/10 open:bg-white/[0.025]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aqua/60">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/50">↳</span>
          <span className="truncate text-sm font-medium text-white/66">Show receipt</span>
        </div>
        <EvidencePill state={state} />
      </summary>
      <div className="border-t border-white/8 px-4 py-4">
        <dl className="grid gap-3 text-sm sm:grid-cols-[9rem_1fr]">
          <dt className="text-white/32">Supports</dt>
          <dd className="text-white/72">{relationship}</dd>
          <dt className="text-white/32">Source</dt>
          <dd className="text-white/72">
            {href ? (
              <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href={href} target="_blank" rel="noopener noreferrer">
                {sourceLabel}
              </a>
            ) : (
              sourceLabel
            )}
          </dd>
          {locator && (
            <>
              <dt className="text-white/32">Locator</dt>
              <dd className="font-mono text-xs text-white/52">{locator}</dd>
            </>
          )}
          {scopeNote && (
            <>
              <dt className="text-white/32">Scope</dt>
              <dd className="text-white/52">{scopeNote}</dd>
            </>
          )}
        </dl>
      </div>
    </details>
  );
}

export function ProofGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function DestinationState({
  state,
  title,
  detail,
}: {
  state: DestinationState;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-white/72">{title}</h4>
        <span className={`rounded-full border px-2 py-1 text-[9px] font-bold tracking-[0.14em] ${destinationStyles[state]}`}>
          {state}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/42">{detail}</p>
    </div>
  );
}
