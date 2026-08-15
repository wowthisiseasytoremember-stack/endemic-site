"use client";

import { useState } from "react";

type Vid = { id: string; title: string; views: string; tag: string };

export default function VideoGrid({
  videos,
  accent,
}: {
  videos: Vid[];
  accent: string;
}) {
  const [open, setOpen] = useState<Vid | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => setOpen(v)}
            className="card-hover group glass relative overflow-hidden rounded-2xl text-left"
          >
            <div
              className="relative flex aspect-video items-center justify-center overflow-hidden"
              style={{
                background: `radial-gradient(circle at 40% 30%, ${accent}44, transparent 60%), linear-gradient(160deg, #0c1e1c, #06100f)`,
              }}
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-full text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: accent, color: "#06100f" }}
              >
                ▶
              </span>
              <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {v.tag}
              </span>
              <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
                {v.views} views
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-white group-hover:text-white">
                {v.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0a1615]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex aspect-video items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${accent}55, transparent 65%), #06100f`,
              }}
            >
              <div className="text-center">
                <div
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl"
                  style={{ background: accent, color: "#06100f" }}
                >
                  ▶
                </div>
                <p className="mt-4 max-w-sm px-6 text-sm text-white/60">
                  Video embed placeholder — connect your YouTube video ID here.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-sm font-medium text-white">{open.title}</p>
              <button
                onClick={() => setOpen(null)}
                className="rounded-lg border border-white/15 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
