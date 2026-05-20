"use client";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { STATS, LOGOS } from "@/lib/data";

/**
 * Trust strip. Stats + a marquee of company logos.
 * Testimonials live in the dedicated Reviews section now.
 */
export function SocialProof() {
  return (
    <section id="stories" className="relative py-20 md:py-28 overflow-hidden cv-auto">
      <GridBackground variant="lines" fade="radial" />
      <AmbientGlow
        color="cyan"
        className="left-[20%] top-[10%] w-[400px] h-[400px]"
      />

      <div className="container relative">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    i % 2 === 0
                      ? "radial-gradient(closest-side, rgba(34,211,238,0.5), transparent)"
                      : "radial-gradient(closest-side, rgba(168,85,247,0.5), transparent)",
                }}
              />
              <div className="font-display text-3xl md:text-4xl text-gradient-mono">
                <AnimatedCounter
                  to={s.value}
                  format={s.value < 10 ? "decimal" : "compact"}
                  suffix={s.suffix}
                />
              </div>
              <div className="mt-1 text-[12px] text-white/50">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 md:mt-14 relative"
        >
          <div className="text-center text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6 inline-flex items-center gap-2 justify-center w-full">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Powering teams at
          </div>
          <div className="relative overflow-hidden mask-fade-h">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
                <span
                  key={`${l}-${i}`}
                  className="font-display text-xl md:text-2xl text-white/45 hover:text-white/85 transition-colors flex items-center gap-3"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
