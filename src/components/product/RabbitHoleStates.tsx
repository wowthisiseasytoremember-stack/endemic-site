import type { ReactNode } from "react";

export function RabbitHoleLoading({
  rows = 3,
  label = "Loading story evidence",
}: {
  rows?: number;
  label?: string;
}) {
  return (
    <div
      className="rounded-[1.15rem] border border-white/10 bg-white/[0.02] p-5"
      aria-busy="true"
      aria-label={label}
    >
      <div className="h-2 w-28 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
      <div className="mt-5 h-7 w-3/4 animate-pulse rounded-lg bg-white/[0.075] motion-reduce:animate-none" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={`h-3 animate-pulse rounded-full bg-white/[0.05] motion-reduce:animate-none ${
              index === rows - 1 ? "w-2/3" : "w-full"
            }`}
          />
        ))}
      </div>
    </div>
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
    <section className="rounded-[1.15rem] border border-dashed border-white/12 bg-white/[0.015] p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28">
        Unavailable
      </p>
      <h3 className="font-display mt-3 text-xl font-medium text-white/64">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/38">{detail}</p>
    </section>
  );
}

export function SourceShelf({
  title = "The receipts behind this story",
  hint = "Open only when you want the receipts.",
  children,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5 md:p-7">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/32">
            Source shelf
          </p>
          <h3 className="font-display mt-2 text-xl font-medium text-white md:text-2xl">{title}</h3>
        </div>
        <span className="hidden text-xs text-white/25 sm:block">{hint}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
