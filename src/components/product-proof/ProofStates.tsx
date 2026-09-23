import type { ReactNode } from "react";

export function ProofLoadingSkeleton({
  rows = 3,
  label = "Loading story evidence",
}: {
  rows?: number;
  label?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
      aria-busy="true"
      aria-label={label}
    >
      <div className="h-2 w-28 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
      <div className="mt-5 h-7 w-3/4 animate-pulse rounded-lg bg-white/[0.08] motion-reduce:animate-none" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={`h-3 animate-pulse rounded-full bg-white/[0.055] motion-reduce:animate-none ${
              index === rows - 1 ? "w-2/3" : "w-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ResearchingState({
  title = "This thread is still being researched",
  detail,
  children,
}: {
  title?: string;
  detail: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-amber/20 bg-amber/[0.035] p-6">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber shadow-[0_0_16px_rgba(232,161,44,0.7)]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber">Researching</p>
      </div>
      <h3 className="mt-4 font-display text-xl font-medium text-white md:text-2xl">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/52">{detail}</p>
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}

export function UnavailableState({
  title = "Not enough evidence yet",
  detail,
}: {
  title?: string;
  detail: string;
}) {
  return (
    <section className="rounded-2xl border border-dashed border-white/12 bg-white/[0.018] p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Unavailable</p>
      <h3 className="mt-3 font-display text-xl font-medium text-white/64">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/38">{detail}</p>
    </section>
  );
}

export function SourceDocument({
  label,
  title,
  citation,
  excerpt,
  href,
  footer,
}: {
  label?: string;
  title: string;
  citation: string;
  excerpt?: string;
  href?: string;
  footer?: ReactNode;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
          {label ?? "Source document"}
        </span>
        <span aria-hidden="true" className="font-mono text-xs text-black/25">⌁</span>
      </div>
      <div className="px-5 py-5">
        <h4 className="font-display text-xl font-semibold leading-snug text-[#18201f]">{title}</h4>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-black/42">{citation}</p>
        {excerpt && (
          <blockquote className="mt-5 border-l-2 border-black/15 pl-4 font-display text-base italic leading-relaxed text-black/62">
            {excerpt}
          </blockquote>
        )}
        {footer && <div className="mt-5 border-t border-black/8 pt-4 text-xs text-black/42">{footer}</div>}
      </div>
    </>
  );

  const classes =
    "block overflow-hidden rounded-xl border border-[#d7d0c2] bg-[#eee8dc] shadow-[0_18px_55px_rgba(0,0,0,0.18)] transition-transform duration-300 motion-reduce:transition-none";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/70`}
      >
        {content}
      </a>
    );
  }

  return <div className={classes}>{content}</div>;
}

export function SourceShelf({
  title = "The receipts behind this story",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 md:p-7">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Source shelf</p>
          <h3 className="mt-2 font-display text-xl font-medium text-white md:text-2xl">{title}</h3>
        </div>
        <span className="hidden text-xs text-white/25 sm:block">Open only when you want the receipts.</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
