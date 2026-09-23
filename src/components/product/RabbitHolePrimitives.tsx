import Link from "next/link";
import type { ReactNode } from "react";

export type RabbitHoleAccent = "aqua" | "flora" | "amber" | "neutral";
export type ThreadState = "READY" | "SUMMARY" | "RESEARCHING" | "UNAVAILABLE";

const ACCENT = {
  aqua: {
    text: "text-[#7fe3ec]",
    border: "border-[#7fe3ec]/28",
    softBorder: "border-[#7fe3ec]/16",
    bg: "bg-[#7fe3ec]/[0.055]",
    line: "bg-[#7fe3ec]/55",
  },
  flora: {
    text: "text-[#66d495]",
    border: "border-[#66d495]/28",
    softBorder: "border-[#66d495]/16",
    bg: "bg-[#66d495]/[0.055]",
    line: "bg-[#66d495]/55",
  },
  amber: {
    text: "text-[#e8b96a]",
    border: "border-[#e8b96a]/28",
    softBorder: "border-[#e8b96a]/16",
    bg: "bg-[#e8b96a]/[0.055]",
    line: "bg-[#e8b96a]/55",
  },
  neutral: {
    text: "text-white/75",
    border: "border-white/18",
    softBorder: "border-white/10",
    bg: "bg-white/[0.035]",
    line: "bg-white/35",
  },
} as const;

function stateLabel(state: ThreadState) {
  switch (state) {
    case "READY":
      return null;
    case "SUMMARY":
      return "Read here";
    case "RESEARCHING":
      return "Researching";
    case "UNAVAILABLE":
      return "Not established";
  }
}

export function ExplorationTrail({
  items,
  accent = "neutral",
}: {
  items: Array<{
    label: string;
    href?: string;
    context?: string;
  }>;
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];

  return (
    <nav aria-label="Exploration trail" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 py-1">
        {items.map((item, index) => {
          const content = (
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3.5 text-sm text-white/58 transition-colors hover:border-white/18 hover:text-white">
              <span>{item.label}</span>
              {item.context && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/28">
                  {item.context}
                </span>
              )}
            </span>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span className={`h-px w-5 ${a.line}`} aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
                  {content}
                </Link>
              ) : (
                <span aria-current={index === items.length - 1 ? "page" : undefined}>{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function SubjectIdentity({
  eyebrow,
  title,
  scientificName,
  lead,
  accent = "neutral",
  image,
  imageAlt = "",
  imageCredit,
  imageLicense,
  imageSourceHref,
  imagePosition = "50% 50%",
}: {
  eyebrow?: string;
  title: string;
  scientificName?: string;
  lead: string;
  accent?: RabbitHoleAccent;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageLicense?: string;
  imageSourceHref?: string;
  imagePosition?: string;
}) {
  const a = ACCENT[accent];

  return (
    <header className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] md:items-end md:gap-12">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-8 ${a.line}`} aria-hidden="true" />
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${a.text}`}>
              {eyebrow}
            </p>
          </div>
        )}

        <h1 className="font-display max-w-[15ch] text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        {scientificName && (
          <p className="mt-4 font-serif text-lg italic tracking-[0.01em] text-white/55 sm:text-xl">
            {scientificName}
          </p>
        )}

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
          {lead}
        </p>
      </div>

      {image ? (
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/20">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover opacity-90"
              style={{ objectPosition: imagePosition }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040908]/38 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          {(imageCredit || imageLicense) && (
            <figcaption className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-[10px] leading-4 text-white/34">
              {imageSourceHref ? (
                <a
                  href={imageSourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/15 underline-offset-2 transition-colors hover:text-white/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  {imageCredit || "Image source"}
                </a>
              ) : (
                imageCredit && <span>{imageCredit}</span>
              )}
              {imageCredit && imageLicense && <span aria-hidden="true">·</span>}
              {imageLicense && <span>{imageLicense}</span>}
            </figcaption>
          )}
        </figure>
      ) : (
        <div
          className={`hidden aspect-[4/3] rounded-[1.25rem] border bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.07),transparent_40%)] md:block ${a.softBorder} ${a.bg}`}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export function RelationshipFact({
  subject,
  predicate,
  object,
  year,
  note,
  accent = "neutral",
}: {
  subject: string;
  predicate: string;
  object: string;
  year?: string | number;
  note?: string;
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];

  return (
    <div className={`rounded-[1.1rem] border px-5 py-5 sm:px-6 ${a.softBorder} ${a.bg}`}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-5">
        <p className="font-display text-lg font-medium leading-snug text-white">{subject}</p>

        <div className="flex items-center gap-3 sm:flex-col sm:gap-1.5">
          <span className={`h-px w-8 sm:w-12 ${a.line}`} aria-hidden="true" />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${a.text}`}>
            {predicate}{year ? ` · ${year}` : ""}
          </span>
          <span className={`hidden h-px w-12 sm:block ${a.line}`} aria-hidden="true" />
        </div>

        <p className="font-display text-lg font-medium leading-snug text-white">{object}</p>
      </div>

      {note && <p className="mt-4 border-t border-white/[0.07] pt-4 text-sm leading-6 text-white/52">{note}</p>}
    </div>
  );
}

export function ThreadLink({
  question,
  target,
  state,
  href,
  relationshipHint,
  accent = "neutral",
}: {
  question: string;
  target?: string;
  state: ThreadState;
  href?: string;
  relationshipHint?: string;
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];
  const disabled = state === "UNAVAILABLE" || state === "RESEARCHING" || !href;
  const label = stateLabel(state);

  const inner = (
    <>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">
          Follow the thread
        </p>
        <p className="mt-2 font-display text-xl font-medium leading-snug text-white">
          {question}
        </p>
        {(target || relationshipHint) && (
          <p className="mt-2 text-sm leading-6 text-white/48">
            {[target, relationshipHint].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {label && (
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${a.border} ${a.text}`}>
            {label}
          </span>
        )}
        {!disabled && (
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 ${a.border} ${a.text}`}
            aria-hidden="true"
          >
            →
          </span>
        )}
      </div>
    </>
  );

  const className = `group flex w-full items-center justify-between gap-6 rounded-[1.15rem] border px-5 py-5 text-left transition-[border-color,background-color] duration-150 sm:px-6 ${a.softBorder} ${disabled ? "cursor-default bg-white/[0.018] opacity-70" : `${a.bg} hover:border-white/22 focus-visible:border-white/30 focus-visible:outline-none`}`;

  if (disabled) {
    return (
      <div className={className} aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <Link href={href!} className={className}>
      {inner}
    </Link>
  );
}

export function EvidenceReceipt({
  sourceLabel,
  relationship,
  locator,
  releaseId,
  note,
  children,
  accent = "neutral",
}: {
  sourceLabel: string;
  relationship?: string;
  locator?: string;
  releaseId?: string;
  note?: string;
  children?: ReactNode;
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];

  return (
    <details className={`group rounded-[1rem] border bg-black/15 open:bg-black/22 ${a.softBorder}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
        <span className="flex min-w-0 items-center gap-3">
          <span className={`h-2 w-2 rounded-full ${a.line}`} aria-hidden="true" />
          <span className="truncate text-sm font-medium text-white/72">View receipt</span>
        </span>
        <span className="text-sm text-white/35 transition-transform duration-150 group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>

      <div className="border-t border-white/[0.07] px-5 py-5">
        <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
          <dt className="text-white/36">Source</dt>
          <dd className="break-words text-white/72">{sourceLabel}</dd>

          {relationship && (
            <>
              <dt className="text-white/36">Supports</dt>
              <dd className="break-words text-white/72">{relationship}</dd>
            </>
          )}

          {locator && (
            <>
              <dt className="text-white/36">Locator</dt>
              <dd className="break-all font-mono text-xs leading-5 text-white/58">{locator}</dd>
            </>
          )}

          {releaseId && (
            <>
              <dt className="text-white/36">Release</dt>
              <dd className="break-all font-mono text-xs leading-5 text-white/58">{releaseId}</dd>
            </>
          )}
        </dl>

        {note && <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm leading-6 text-white/52">{note}</p>}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </details>
  );
}

export function DocumentCard({
  title,
  institution,
  year,
  detail,
  identifier,
  href,
  rightsNote,
  accent = "neutral",
}: {
  title: string;
  institution?: string;
  year?: string | number;
  detail?: string;
  identifier?: string;
  href?: string;
  rightsNote?: string;
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];

  const card = (
    <article className={`group rounded-[1.15rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-6 transition-[border-color,background-color] duration-150 sm:px-7 ${a.softBorder} ${href ? "hover:border-white/22" : ""}`}>
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${a.text}`}>
            Document
          </p>
          <h3 className="font-display mt-3 text-xl font-medium leading-snug text-white sm:text-2xl">
            {title}
          </h3>
        </div>
        {href && (
          <span className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-150 group-hover:translate-x-1 ${a.border} ${a.text}`} aria-hidden="true">
            ↗
          </span>
        )}
      </div>

      {(institution || year) && (
        <p className="mt-3 text-sm leading-6 text-white/48">
          {[institution, year].filter(Boolean).join(" · ")}
        </p>
      )}

      {detail && <p className="mt-5 max-w-2xl text-sm leading-6 text-white/62">{detail}</p>}

      {identifier && (
        <p className="mt-5 break-all border-t border-white/[0.07] pt-4 font-mono text-[11px] leading-5 text-white/42">
          {identifier}
        </p>
      )}

      {rightsNote && (
        <p className="mt-3 text-[11px] leading-5 text-white/34">
          {rightsNote}
        </p>
      )}
    </article>
  );

  if (!href) return card;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[1.15rem]">
      {card}
    </a>
  );
}

export function ResearchingState({
  title = "This rabbit hole is still being verified.",
  body,
  nextEvidence = [],
  accent = "neutral",
}: {
  title?: string;
  body: string;
  nextEvidence?: string[];
  accent?: RabbitHoleAccent;
}) {
  const a = ACCENT[accent];

  return (
    <section className={`rounded-[1.2rem] border px-5 py-7 sm:px-7 sm:py-8 ${a.softBorder} ${a.bg}`}>
      <div className="flex items-center gap-3">
        <span className={`h-px w-8 ${a.line}`} aria-hidden="true" />
        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${a.text}`}>
          Researching
        </p>
      </div>

      <h2 className="font-display mt-5 max-w-[26ch] text-3xl font-medium leading-tight text-white">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">{body}</p>

      {nextEvidence.length > 0 && (
        <div className="mt-7 border-t border-white/[0.07] pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">
            What we are waiting for
          </p>
          <ul className="mt-3 space-y-2">
            {nextEvidence.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/52">
                <span className={`mt-[0.68rem] h-px w-4 shrink-0 ${a.line}`} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function UnknownCard({
  question,
  currentAnswer,
  whyUnresolved,
  whatWouldResolve = [],
  status = "UNRESOLVED",
}: {
  question: string;
  currentAnswer: string;
  whyUnresolved?: string;
  whatWouldResolve?: string[];
  status?: "UNRESOLVED" | "CORPUS_GAP" | "LEAD_ONLY";
}) {
  return (
    <section className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">
          Still unsolved
        </p>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/38">
          {status.replace("_", " ")}
        </span>
      </div>

      <h3 className="font-display mt-5 max-w-[28ch] text-2xl font-medium leading-tight text-white sm:text-3xl">
        {question}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">{currentAnswer}</p>

      {whyUnresolved && (
        <p className="mt-5 max-w-2xl border-l border-white/14 pl-4 text-sm leading-6 text-white/48">
          {whyUnresolved}
        </p>
      )}

      {whatWouldResolve.length > 0 && (
        <div className="mt-7 border-t border-dashed border-white/12 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">
            What would settle it
          </p>
          <ul className="mt-3 space-y-2">
            {whatWouldResolve.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/58">
                <span className="mt-[0.68rem] h-px w-4 shrink-0 bg-white/24" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function CorrectionCard({
  oldClaim,
  correctedClaim,
  scopeNote,
  children,
}: {
  oldClaim: string;
  correctedClaim: string;
  scopeNote?: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-[1.2rem] border border-[#e8b96a]/20 bg-[#e8b96a]/[0.045] px-5 py-6 sm:px-7 sm:py-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8b96a]">
        Correction
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:gap-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/32">Previous claim</p>
          <p className="mt-2 text-base leading-7 text-white/38 line-through decoration-white/28">{oldClaim}</p>
        </div>

        <div className="border-t border-white/[0.07] pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">What the evidence supports</p>
          <p className="font-display mt-2 text-xl font-medium leading-snug text-white">{correctedClaim}</p>
        </div>
      </div>

      {scopeNote && <p className="mt-6 border-t border-white/[0.07] pt-4 text-sm leading-6 text-white/48">{scopeNote}</p>}
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
