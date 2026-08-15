"use client";

import { useState } from "react";

const CARDS = [
  {
    cultivar: "Monstera 'Thai Constellation'",
    real: true,
    reveal:
      "REAL patent — Costa Farms filed a plant patent. But it has three competing origin stories, and the expiry status is unverified.",
  },
  {
    cultivar: "Philodendron 'Pink Princess'",
    real: true,
    reveal:
      "REAL patent for the genetics — but the plant in big-box stores is often a different clone sold under the same name.",
  },
  {
    cultivar: "Hoya 'Compacta'",
    real: false,
    reveal:
      "MYTH-ish. No clean patent — sport mutation vs. species reclassification. Botanical literature disagrees.",
  },
  {
    cultivar: "Philodendron 'McColley's Finale'",
    real: false,
    reveal:
      "A named hybrid by Robert McColley — a provenance record, not an active enforceable patent in the DB.",
  },
];

export default function PatentQuiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState<null | boolean>(null);

  const card = CARDS[i];
  const correct = guess !== null && guess === card.real;

  function next() {
    setFlipped(false);
    setGuess(null);
    setI((prev) => (prev + 1) % CARDS.length);
  }

  function pick(g: boolean) {
    setGuess(g);
    setFlipped(true);
  }

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--zone,#2fae6b)]">
          Patent or Myth?
        </span>
        <span className="text-xs text-white/60">
          {i + 1} / {CARDS.length}
        </span>
      </div>

      <p className="mt-4 text-xs text-white/50">Does this cultivar have a real patent?</p>
      <h4 className="font-display mt-1 text-2xl italic text-white">
        {card.cultivar}
      </h4>

      {!flipped ? (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => pick(true)}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-400/10"
          >
            Real patent
          </button>
          <button
            onClick={() => pick(false)}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-rose-400 hover:bg-rose-400/10"
          >
            Myth
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <div
            className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
              correct
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                : "border-rose-400/40 bg-rose-400/10 text-rose-200"
            }`}
          >
            {correct ? "✓ You got it" : "✗ Not quite"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {card.reveal}
          </p>
          <button
            onClick={next}
            className="mt-4 rounded-xl bg-[var(--zone,#2fae6b)] px-4 py-2 text-sm font-semibold text-[#06100f] transition hover:brightness-110"
          >
            Next card →
          </button>
        </div>
      )}
    </div>
  );
}
