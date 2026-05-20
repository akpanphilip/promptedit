"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * Full-viewport brand splash that shows on initial page load.
 *  - Renders SSR-visible so there's no flash of empty page
 *  - Dismisses when both `window.load` has fired AND a minimum
 *    duration (1.4 s) has elapsed. Guarantees the splash never
 *    feels jittery on fast connections
 *  - Locks body scroll while visible
 */
export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const MIN_MS = 1400;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setDone(true), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  // Lock scroll & hide overflow while loader is visible
  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const WORDMARK = "PromptEdit";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(14px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-app flex items-center justify-center overflow-hidden"
        >
          {/* Background grid + ambient gradients */}
          <div className="absolute inset-0 bg-grid-sm mask-radial opacity-30" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(34,211,238,0.22), rgba(168,85,247,0.12), transparent 70%)",
            }}
          />

          {/* Top + bottom hairlines */}
          <span
            aria-hidden
            className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          />
          <span
            aria-hidden
            className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
          />

          {/* Center stack */}
          <div className="relative flex flex-col items-center gap-7 px-6">
            {/* Logo with ripple rings */}
            <div className="relative w-14 h-14">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute inset-0 rounded-2xl border border-cyan-400/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 3.6], opacity: [0.55, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.55,
                    ease: "easeOut",
                  }}
                />
              ))}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_42px_-6px_rgba(34,211,238,0.65)] flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl ring-1 ring-white/25 mix-blend-overlay"
                />
              </motion.div>
            </div>

            {/* Wordmark. Letter-stagger reveal */}
            <div className="flex items-center font-display text-[28px] tracking-[-0.02em] text-fg">
              {WORDMARK.split("").map((c, i) => (
                <motion.span
                  key={`${c}-${i}`}
                  initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-cyan-300 animate-pulse" />
                </span>
                Spooling up the studio
              </span>
            </motion.div>

            {/* Progress bar */}
            <div className="relative w-56 h-[2px] rounded-full overflow-hidden bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_10px_rgba(34,211,238,0.75)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
