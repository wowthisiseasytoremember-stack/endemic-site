"use client";

import { useState } from "react";

export function EmailForm({
  leadMagnet,
  cta = "Send it to me",
  placeholder = "you@email.com",
  compact = false,
}: {
  leadMagnet: string;
  cta?: string;
  placeholder?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, leadMagnet, address }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        setMessage(
          data.alreadySubscribed
            ? "You're already on the list — check your inbox."
            : "Done. Check your inbox for the guide.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="glass flex items-center gap-3 rounded-2xl px-5 py-4 text-sm text-emerald-200">
        <span className="text-xl">✓</span>
        {message}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`flex w-full gap-2 ${compact ? "flex-row" : "flex-col sm:flex-row"}`}
    >
      <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="hidden absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/60 focus:border-[var(--zone,var(--aqua))]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-xl bg-[var(--zone,var(--aqua))] px-5 py-3 text-sm font-semibold text-[#06100f] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : cta}
      </button>
      {status === "error" && (
        <p className="w-full text-xs text-rose-300 sm:absolute sm:mt-14">
          {message}
        </p>
      )}
    </form>
  );
}
