"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type RabbitHoleMotionKind = "section" | "thread" | "receipt" | "correction";

const PRESETS = {
  section: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    duration: 0.5,
  },
  thread: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    duration: 0.34,
  },
  receipt: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    duration: 0.24,
  },
  correction: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    duration: 0.28,
  },
} as const;

export function RabbitHoleReveal({
  children,
  kind = "section",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  kind?: RabbitHoleMotionKind;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const preset = PRESETS[kind];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: preset.duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
