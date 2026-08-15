"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  wobble: number;
  alpha: number;
};

// A lightweight canvas "atmosphere" scene: rising bubbles + drifting light,
// tinted by the current scroll zone. Pauses rendering while the user scrolls
// (perf + the requested "pauses on scroll" behavior) and when off-screen.
export default function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let raf = 0;
    let paused = false;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    // zone tint blends aqua -> emerald -> amber based on scroll progress
    const zones: [number, number, number][] = [
      [31, 184, 196], // aqua
      [47, 174, 107], // emerald
      [232, 161, 44], // amber
    ];

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function currentTint(): [number, number, number] {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const seg = p * (zones.length - 1);
      const i = Math.min(zones.length - 2, Math.floor(seg));
      const t = seg - i;
      return [
        lerp(zones[i][0], zones[i + 1][0], t),
        lerp(zones[i][1], zones[i + 1][1], t),
        lerp(zones[i][2], zones[i + 1][2], t),
      ];
    }

    function makeParticles() {
      const count = Math.min(70, Math.floor((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 4,
        speed: 0.2 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.4,
        wobble: Math.random() * Math.PI * 2,
        alpha: 0.1 + Math.random() * 0.4,
      }));
    }

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      makeParticles();
    }

    function draw() {
      const [r, g, b] = currentTint();
      ctx!.clearRect(0, 0, width, height);

      // soft light shafts
      const grad = ctx!.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.05)`);
      grad.addColorStop(1, "rgba(3,12,11,0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed;
        p.wobble += 0.02;
        p.x += Math.sin(p.wobble) * 0.3 + p.drift;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r + 60},${g + 60},${b + 60},${p.alpha * 0.5})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.35, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${p.alpha * 0.6})`;
        ctx!.fill();
      }
    }

    function loop() {
      if (!paused) draw();
      raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      paused = true;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        paused = false;
      }, 180);
    }

    resize();
    if (prefersReduced) {
      draw();
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", resize);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
