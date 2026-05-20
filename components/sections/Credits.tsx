"use client";
import * as React from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, Sparkles, Wallet } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SUBSCRIPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

/* Sliders below let the user model a typical week of output.
   Per-unit credit costs roughly mirror real list pricing of
   the underlying models (Veo, Kling, Nano Banana, ElevenLabs). */
const TOOL_USE = [
  { id: "vid", label: "Video clips (Veo / Kling)", costPer: 0.42, default: 12, max: 60 },
  { id: "img", label: "Thumbnails / B-roll (Nano Banana)", costPer: 0.04, default: 80, max: 500 },
  { id: "voi", label: "Voice minutes (ElevenLabs)", costPer: 0.18, default: 30, max: 200 },
  { id: "mus", label: "Music tracks (Suno)", costPer: 0.32, default: 4, max: 40 },
];

export function Credits() {
  const [usage, setUsage] = useState<Record<string, number>>(
    Object.fromEntries(TOOL_USE.map((t) => [t.id, t.default])),
  );

  const monthlyCost = useMemo(() => {
    return TOOL_USE.reduce(
      (sum, t) => sum + (usage[t.id] ?? 0) * t.costPer,
      0,
    );
  }, [usage]);

  const subTotal = SUBSCRIPTIONS.reduce((s, x) => s + x.cost, 0);
  const savings = Math.max(subTotal - monthlyCost, 0);
  const savingsPct = subTotal > 0 ? Math.round((savings / subTotal) * 100) : 0;

  return (
    <section id="credits" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="dots" fade="radial" />
      <AmbientGlow
        color="mix"
        className="left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px]"
      />

      <div className="container relative">
        <SectionHeader
          eyebrow="Credits, not contracts"
          title={
            <>
              Pay only for the <span className="text-gradient-cyber">frames</span>{" "}
              you actually render.
            </>
          }
          description="Credits are render fuel. Top up once, spend across Veo, Kling, Runway, ElevenLabs. No bills, no auto-renewals, no waste."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Energy flow visualization */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-7 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 md:p-8 overflow-hidden min-h-[440px]"
          >
            <div className="absolute inset-0 bg-grid-sm opacity-30 mask-radial" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-500/[0.03]" />

            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                  Credit Flow
                </div>
                <div className="mt-1 font-display text-2xl text-white">
                  Energy for every tool
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[11px] font-mono text-cyan-200">
                <Zap className="w-3.5 h-3.5" />
                <AnimatedCounter to={2480} format="plain" /> credits available
              </div>
            </div>

            <EnergyFlow />

            <div className="relative mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "3 credits", desc: "≈ 1 min voiceover" },
                { label: "4 credits", desc: "≈ 1 Nano Banana edit" },
                { label: "18 credits", desc: "≈ 1 Veo 8s clip" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="rounded-xl glass px-3 py-3 text-center"
                >
                  <div className="font-mono text-[12px] text-cyan-300">{p.label}</div>
                  <div className="text-[11px] text-white/55 mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative lg:col-span-5 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                  Usage Calculator
                </div>
                <div className="mt-1 font-display text-2xl text-white">
                  See your savings
                </div>
              </div>
              <Wallet className="w-5 h-5 text-white/35" />
            </div>

            <div className="mt-6 space-y-5">
              {TOOL_USE.map((t) => (
                <div key={t.id}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/80">{t.label}</span>
                    <span className="font-mono text-white/55">
                      {usage[t.id]} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={t.max}
                    value={usage[t.id]}
                    onChange={(e) =>
                      setUsage((u) => ({ ...u, [t.id]: +e.target.value }))
                    }
                    className="mt-2 w-full accent-cyan-400"
                    aria-label={`${t.label} usage per month`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.06] to-violet-400/[0.04] p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/55">
                    PromptEdit
                  </div>
                  <div className="mt-1 font-display text-3xl text-white">
                    ${monthlyCost.toFixed(2)}
                    <span className="text-base text-white/45"> / mo</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-white/55">
                    Old way
                  </div>
                  <div className="mt-1 font-display text-2xl text-rose-300/80 line-through decoration-rose-400/40">
                    ${subTotal}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
                <TrendingDown className="w-4 h-4" />
                You save{" "}
                <span className="font-semibold text-white">
                  ${savings.toFixed(0)}/mo
                </span>
                <span className="text-emerald-300/70">({savingsPct}%)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Old subscriptions strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-6 relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                What you replace
              </div>
              <div className="mt-1 font-display text-xl text-white">
                One credit pool. All the major models.
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] text-white/45 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Replaces ~${subTotal}/mo in subscriptions
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {SUBSCRIPTIONS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 flex items-center gap-2"
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full bg-gradient-to-br",
                    s.accent,
                  )}
                />
                <span className="text-[13px] text-white/85">{s.name}</span>
                <span className="font-mono text-[11px] text-white/40">
                  ${s.cost}/mo
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Energy Flow ------------------------------- */

function EnergyFlow() {
  return (
    <div className="relative mt-8 h-56">
      <svg
        viewBox="0 0 600 220"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="flow-1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 75, 120, 165, 210].map((y, i) => (
          <g key={y}>
            <path
              d={`M0,${y} C150,${y - 30} 300,${y + 40} 600,${y - 10}`}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <motion.path
              d={`M0,${y} C150,${y - 30} 300,${y + 40} 600,${y - 10}`}
              fill="none"
              stroke="url(#flow-1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.1 * i, ease: "easeInOut" }}
            />
            {/* moving energy dot. CSS-driven for cleaner SVG props */}
            <circle
              r={2.5}
              fill="#22d3ee"
              filter="drop-shadow(0 0 6px #22d3ee)"
              className="drift-along"
              style={
                {
                  offsetPath: `path("M0,${y} C150,${y - 30} 300,${y + 40} 600,${y - 10}")`,
                  offsetRotate: "0deg",
                  ["--drift-dur" as any]: `${4 + i * 0.4}s`,
                  ["--drift-delay" as any]: `${i * 0.5}s`,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </svg>
      {/* labels */}
      <div className="absolute left-0 inset-y-0 flex flex-col justify-center gap-3 text-[10px] font-mono text-white/45">
        <span>credits</span>
        <span>top-up</span>
        <span>pool</span>
        <span>route</span>
        <span>render</span>
      </div>
      <div className="absolute right-0 inset-y-0 flex flex-col justify-center gap-3 text-[10px] font-mono text-white/70 text-right">
        <span className="text-violet-300">Veo</span>
        <span className="text-cyan-300">Kling</span>
        <span className="text-pink-300">Nano Banana</span>
        <span className="text-cyan-300">ElevenLabs</span>
        <span className="text-pink-300">Suno</span>
      </div>
    </div>
  );
}
