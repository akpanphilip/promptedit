"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium two-layer cursor:
 *   • inner dot:   follows mouse precisely
 *   • outer ring:  lags via spring, scales up over interactive elements
 *
 * Disabled entirely on touch / pointer:coarse devices.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // only run on devices with a fine pointer
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("with-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      ) as HTMLElement | null;
      if (!interactive) {
        setVariant("default");
        setLabel(null);
        return;
      }
      const tag = interactive.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") {
        setVariant("text");
        setLabel(null);
        return;
      }
      const dataLabel = interactive.getAttribute("data-cursor-text");
      setLabel(dataLabel);
      setVariant("hover");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("with-custom-cursor");
    };
  }, [x, y, hidden]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot: precise follow */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-200",
          hidden && "opacity-0",
        )}
        style={{ x, y }}
      >
        <motion.div
          animate={{
            scale:
              variant === "hover" ? 1.6 : variant === "text" ? 0.5 : pressed ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-300"
          style={{
            boxShadow:
              "0 0 10px rgba(34,211,238,0.85), 0 0 20px rgba(34,211,238,0.5)",
          }}
        />
      </motion.div>

      {/* Outer ring: spring trail */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-200",
          hidden && "opacity-0",
        )}
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            width:
              variant === "hover"
                ? 54
                : variant === "text"
                  ? 4
                  : pressed
                    ? 22
                    : 30,
            height:
              variant === "hover"
                ? 54
                : variant === "text"
                  ? 22
                  : pressed
                    ? 22
                    : 30,
            borderRadius: variant === "text" ? 4 : 999,
            backgroundColor:
              variant === "hover" ? "rgba(34, 211, 238, 0.08)" : "transparent",
            borderColor:
              variant === "hover"
                ? "rgba(168, 85, 247, 0.85)"
                : "rgba(34, 211, 238, 0.55)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="border-[1.5px] backdrop-blur-[1px]"
          style={{
            boxShadow:
              variant === "hover"
                ? "0 0 22px -4px rgba(168,85,247,0.6), inset 0 0 12px rgba(34,211,238,0.25)"
                : "0 0 14px -6px rgba(34,211,238,0.45)",
          }}
        />
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.18 }}
              className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-950/85 border border-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/85"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
