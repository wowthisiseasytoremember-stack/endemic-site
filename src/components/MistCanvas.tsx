"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speedX: number;
  speedY: number;
  alpha: number;
};

// A drifting mist/spore scene for FloraTrack
export default function MistCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let raf = 0;

    function makeParticles() {
      const count = Math.min(100, Math.floor((width * height) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 10 + Math.random() * 40, // large, soft mist particles
        speedX: (Math.random() - 0.2) * 0.3,
        speedY: (Math.random() - 0.8) * 0.2, // drifting slowly up and right
        alpha: 0.02 + Math.random() * 0.04, // very subtle
      }));
    }

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      makeParticles();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      
      // Emerald / Jungle tint
      const r = 47, g = 174, b = 107;

      // Ambient jungle light shafts
      const grad = ctx!.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.07)`);
      grad.addColorStop(1, "rgba(3,12,11,0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.y < -100) p.y = height + 100;
        if (p.x > width + 100) p.x = -100;
        if (p.x < -100) p.x = width + 100;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        // Soft radial gradient for mist
        const pGrad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        pGrad.addColorStop(0, `rgba(${r + 80},${g + 50},${b + 30},${p.alpha})`);
        pGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        
        ctx!.fillStyle = pGrad;
        ctx!.fill();
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReduced) {
      draw();
    } else {
      window.addEventListener("resize", resize);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80 mix-blend-screen"
    />
  );
}
