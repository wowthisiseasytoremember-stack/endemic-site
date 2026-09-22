"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIMARY_LINKS = [
  { href: "/aquatrack", label: "AquaTrack", accent: "aqua" },
  { href: "/floratrack", label: "FloraTrack", accent: "flora" },
  { href: "/read", label: "Field Notes", accent: "neutral" },
  { href: "/watch", label: "Watch", accent: "neutral" },
  { href: "/gear", label: "Gear", accent: "neutral" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const linkClass = (href: string, accent: string) => {
    const active = isActive(href);
    const hover =
      accent === "aqua"
        ? "hover:text-[#7fe3ec]"
        : accent === "flora"
          ? "hover:text-[#66d495]"
          : "hover:text-white";

    return `relative py-2 text-sm font-medium transition-colors ${hover} ${
      active ? "text-white" : "text-white/55"
    }`;
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#040908]/82 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span
            className="relative grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
            aria-hidden="true"
          >
            <span className="absolute h-2.5 w-2.5 -translate-x-1 rounded-full bg-[#7fe3ec] opacity-90 blur-[0.2px]" />
            <span className="absolute h-2.5 w-2.5 translate-x-1 rounded-full bg-[#66d495] opacity-90 blur-[0.2px]" />
          </span>
          <span className="font-display text-xl font-semibold tracking-[-0.03em] text-white transition-opacity group-hover:opacity-80">
            Endemic
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {PRIMARY_LINKS.map((link, index) => (
            <div key={link.href} className="flex items-center">
              {index === 2 && <span className="mx-3 h-4 w-px bg-white/10" aria-hidden="true" />}
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${linkClass(link.href, link.accent)} rounded-full px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute inset-x-3 -bottom-[13px] h-px bg-gradient-to-r from-transparent via-white/65 to-transparent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#apps"
            onClick={() => setOpen(false)}
            className="hidden rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-[#040908] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040908] sm:inline-flex"
          >
            Explore apps
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M5 8h14M5 12h14M5 16h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/[0.07] bg-[#040908]/96 transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-1">
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  isActive(link.href)
                    ? "bg-white/[0.08] text-white"
                    : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-white/25" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Link
            href="/#apps"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-12 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#040908] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Explore AquaTrack & FloraTrack
          </Link>
        </div>
      </div>
    </nav>
  );
}
