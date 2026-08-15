"use client";

import { useEffect, useRef, useState } from "react";

// Animated count-up that triggers when scrolled into view.
export function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  // parse numeric part + suffix (e.g. "533,422", "40+", "26\"")
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const hasPlus = value.includes("+");
  const decimals = value.includes(".") ? 1 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".") + (hasPlus ? "+" : "");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const dur = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(format(numeric * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, decimals, hasPlus]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
