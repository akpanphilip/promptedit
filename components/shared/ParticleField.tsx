"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  count?: number;
  className?: string;
  seed?: number;
};

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Renders an array of floating particles.
 *  - skipped entirely on `prefers-reduced-motion`
 *  - count auto-scales down on small viewports
 *  - paused via IntersectionObserver when off-screen (no JS or paint
 *    work runs while the parent isn't visible. Works in tandem with
 *    the section's `content-visibility: auto`)
 */
export function ParticleField({ count = 30, className, seed = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // Resolve the effective count once on mount based on viewport
  const effectiveCount = useMemo(() => {
    if (typeof window === "undefined") return count;
    const w = window.innerWidth;
    if (w < 640) return Math.min(count, 14);
    if (w < 1024) return Math.min(count, 22);
    return count;
  }, [count]);

  const particles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: effectiveCount }).map((_, i) => {
      const size = 1 + rand() * 2.4;
      return {
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size,
        duration: 6 + rand() * 8,
        delay: rand() * 6,
        hue: rand() > 0.5 ? "cyan" : "violet",
      };
    });
  }, [effectiveCount, seed]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(e.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0", className)} />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden contain-paint",
        className,
      )}
    >
      {visible &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background:
                p.hue === "cyan"
                  ? "rgba(34,211,238,0.9)"
                  : "rgba(168,85,247,0.9)",
              boxShadow:
                p.hue === "cyan"
                  ? "0 0 12px rgba(34,211,238,0.7)"
                  : "0 0 12px rgba(168,85,247,0.7)",
              willChange: "transform, opacity",
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
