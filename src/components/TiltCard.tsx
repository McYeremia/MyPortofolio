"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TiltCardProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * Anchor that tilts toward the pointer for a subtle 3D hover.
 * Falls back to a plain link when reduced motion is requested.
 */
export default function TiltCard({ href, className, children }: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 7}deg) rotateY(${
      px * 7
    }deg) translateY(-6px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseMove={reduce ? undefined : handleMove}
      onMouseLeave={reduce ? undefined : handleLeave}
    >
      {children}
    </a>
  );
}
