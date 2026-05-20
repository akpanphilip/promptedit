"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Three-layer scroll indicator pinned to the top of the page:
 *   - soft glow trail (8 px tall, blurred)
 *   - sharp 2 px gradient bar
 *   - leading-edge sparkle that rides the bar's right edge
 *
 * Everything is driven directly by scroll motion-values via the
 * browser's scroll RAF. Zero React re-renders per pixel. The
 * back-to-top button shows the percentage as a ring around itself,
 * so we don't render a redundant percent chip here.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const glowScaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.02, 1], [0, 1, 1]);
  const sparkleX = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: glowScaleX, opacity }}
        className="fixed top-0 left-0 right-0 origin-left z-[60] h-[8px] pointer-events-none"
      >
        <div className="h-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-violet-500/40 blur-md" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ scaleX, opacity }}
        className="fixed top-0 left-0 right-0 origin-left z-[60] h-[2px] bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 pointer-events-none"
      />

      <motion.div
        aria-hidden
        style={{ x: sparkleX, opacity }}
        className="fixed top-0 left-0 z-[60] pointer-events-none -translate-x-1/2"
      >
        <div className="w-3 h-3 -mt-[5px] rounded-full bg-white shadow-[0_0_18px_4px_rgba(34,211,238,0.65)]" />
      </motion.div>
    </>
  );
}
