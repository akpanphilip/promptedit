"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientButton } from "@/components/shared/GradientButton";
import { ParticleField } from "@/components/shared/ParticleField";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-44 overflow-hidden cv-auto">
      {/* Sunset/horizon glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[460px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.4), transparent 60%)",
        }}
      />
      {/* horizon line */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[130px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), rgba(168,85,247,0.8), transparent)",
          filter: "blur(0.5px)",
        }}
      />
      <div className="absolute inset-0 bg-grid mask-radial opacity-40" />
      <ParticleField count={45} seed={7} />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70 mx-auto">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            Stop juggling six video subscriptions
          </div>

          <h2 className="mt-6 font-display text-[56px] sm:text-7xl md:text-[100px] leading-[0.95] tracking-[-0.03em]">
            <span className="text-gradient-mono">Render without</span>
            <br />
            <span className="text-gradient-cyber">limits.</span>
          </h2>

          <p className="mt-7 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed text-balance">
            Stop paying six subscriptions for tools you barely use. Veo, Kling,
            Nano Banana, ElevenLabs, Suno: one studio, one credit pool, every
            render at your fingertips.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <GradientButton size="lg">
              Get 500 free credits
            </GradientButton>
            <GradientButton size="lg" variant="outline" iconRight={<ArrowRight className="w-4 h-4" />}>
              Talk to a video creator
            </GradientButton>
          </div>

          <div className="mt-8 text-[12px] text-white/40 font-mono">
            No card. No subscription. Cancel by closing the tab.
          </div>
        </motion.div>

        {/* Floating orb */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[60px] w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.5), rgba(168,85,247,0.2), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    </section>
  );
}
