"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating bottom-right action: scroll back to top.
 *
 * Around the button, an SVG ring fills with current scroll progress
 * (driven by the same `useScroll` motion-value as the top progress
 * bar, springed for smooth visual catch-up). Click smoothly scrolls
 * the page to the top.
 *
 * Visible after the user has scrolled past ~8% of the page, hidden
 * again near the very bottom so it doesn't sit on top of the final
 * CTA.
 */
export function BackToTop() {
  const { scrollYProgress } = useScroll();

  const ringFill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Stroke dash offset = circumference * (1 - progress). r=22 → C≈138.23.
  const CIRC = 2 * Math.PI * 22;
  const dashOffset = useTransform(ringFill, (v) => CIRC * (1 - v));

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.08 && v < 0.99);
    });
    return unsub;
  }, [scrollYProgress]);

  const onClick = () => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="bt-top"
          initial={{ opacity: 0, y: 24, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          onClick={onClick}
          aria-label="Scroll to top"
          data-cursor-text="Top"
          className="group fixed z-[55] right-5 md:right-6 bottom-5 md:bottom-6 w-12 h-12 rounded-full glass-strong shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] hover:shadow-[0_14px_40px_-12px_rgba(34,211,238,0.5)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          {/* Soft cyan/violet halo on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"
            style={{
              background:
                "radial-gradient(closest-side, rgba(34,211,238,0.55), rgba(168,85,247,0.35), transparent 70%)",
            }}
          />

          {/* Progress ring */}
          <svg
            aria-hidden
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 48 48"
          >
            <defs>
              <linearGradient id="bt-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="55%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.8"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="url(#bt-ring)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{
                strokeDashoffset: dashOffset,
                filter: "drop-shadow(0 0 4px rgba(34,211,238,0.45))",
              }}
            />
          </svg>

          {/* Arrow */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <ArrowUp
              className="w-4 h-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={2.4}
            />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
