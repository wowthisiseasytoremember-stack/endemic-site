"use client";

import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#040908]/70 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white/80">
            Endemic
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-white/50 md:flex">
          <Link href="/aquatrack" className="transition-colors hover:text-[#7fe3ec]">AquaTrack</Link>
          <Link href="/floratrack" className="transition-colors hover:text-[#2fae6b]">FloraTrack</Link>
          <div className="h-4 w-px bg-white/10" />
          <Link href="/read" className="transition-colors hover:text-white">Field Notes</Link>
          <Link href="/watch" className="transition-colors hover:text-white">Watch</Link>
          <Link href="/gear" className="transition-colors hover:text-white">Gear</Link>
        </div>
        <Link
          href="/#download"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#040908] transition-all hover:scale-105 hover:bg-white/90"
        >
          Get the apps
        </Link>
      </div>
    </nav>
  );
}
