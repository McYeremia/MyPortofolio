"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; alpha: number }[];
  size: number;
}

export default function ParticleLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let particles: Particle[] = [];
    const MAX_PARTICLES = 35;
    const TRAIL_LENGTH = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.02 + Math.random() * 0.04;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 600 + Math.random() * 400,
        trail: [],
        size: 1.5 + Math.random() * 1.5,
      };
    };

    // Seed initial particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Gentle direction drift
        p.vx += (Math.random() - 0.5) * 0.0015;
        p.vy += (Math.random() - 0.5) * 0.0015;

        // Limit speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.08) {
          p.vx *= 0.08 / spd;
          p.vy *= 0.08 / spd;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Fade curve: fade in → full → fade out
        const progress = p.life / p.maxLife;
        let alpha: number;
        if (progress < 0.15) {
          alpha = progress / 0.15;
        } else if (progress > 0.7) {
          alpha = (1 - progress) / 0.3;
        } else {
          alpha = 1;
        }
        alpha = Math.max(0, Math.min(1, alpha)) * 0.35;

        // Add to trail
        p.trail.push({ x: p.x, y: p.y, alpha });
        if (p.trail.length > TRAIL_LENGTH) p.trail.shift();

        // Draw trail line
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const prev = p.trail[t - 1];
            const curr = p.trail[t];
            const trailAlpha = (t / p.trail.length) * curr.alpha;

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.strokeStyle = `rgba(30, 64, 255, ${trailAlpha})`;
            ctx.lineWidth = p.size * (t / p.trail.length);
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Draw dot head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 64, 255, ${alpha * 1.2})`;
        ctx.fill();

        // Respawn if dead
        if (p.life >= p.maxLife) {
          particles[i] = spawn();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
