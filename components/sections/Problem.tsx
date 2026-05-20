"use client";
import { motion } from "framer-motion";
import {
  X,
  Check,
  CreditCard,
  Layers,
  AlertTriangle,
  Network,
  Boxes,
  Sparkles,
  Wallet,
  Workflow,
  Lock,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground } from "@/components/shared/GridBackground";
import { cn } from "@/lib/utils";

const OLD_WAY = [
  { icon: CreditCard, text: "6+ monthly subscriptions" },
  { icon: Layers, text: "Scattered tools & logins" },
  { icon: AlertTriangle, text: "Pay even when idle" },
  { icon: Network, text: "Disconnected workflows" },
  { icon: Lock, text: "Vendor lock-in everywhere" },
];

const NEW_WAY = [
  { icon: Boxes, text: "One dashboard. Every model." },
  { icon: Sparkles, text: "Unified AI access" },
  { icon: Wallet, text: "Pay-as-you-go credits" },
  { icon: Workflow, text: "Streamlined creator flow" },
  { icon: Check, text: "Total creative freedom" },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="dots" fade="radial" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,63,94,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 70%)",
        }}
      />

      <div className="container relative">
        <SectionHeader
          eyebrow="The Shift"
          title={
            <>
              <span className="line-through decoration-rose-400/60 decoration-[3px]">Six subscriptions</span>{" "}
              <br className="hidden md:block" />
              collapse into{" "}
              <span className="text-gradient-cyber">one render studio</span>.
            </>
          }
          description="You shouldn't pay $170/mo for tools you use sporadically. PromptEdit replaces the video-creator subscription stack with a single credit-based studio."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* OLD WAY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-rose-400/15 bg-rose-500/[0.025] p-6 md:p-8 overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(244,63,94,0.18), transparent 70%)",
              }}
            />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-rose-300/80">
                  The Old Way
                </div>
                <div className="mt-1 font-display text-2xl md:text-3xl text-white/85">
                  Subscription Sprawl
                </div>
              </div>
              <div className="font-mono text-[11px] text-rose-200/80 bg-rose-400/10 border border-rose-400/15 rounded-full px-3 py-1">
                $171 / mo
              </div>
            </div>

            {/* messy subscription cards. Scattered on desktop, neat grid on mobile */}
            <SubscriptionPile />

            <ul className="mt-8 space-y-3">
              {OLD_WAY.map((it, i) => (
                <motion.li
                  key={it.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-3 text-[14px] text-white/65"
                >
                  <span className="relative inline-flex w-7 h-7 rounded-full items-center justify-center border border-rose-400/20 bg-rose-500/10">
                    <X className="w-3.5 h-3.5 text-rose-300" />
                  </span>
                  <span className="line-through decoration-rose-400/40 decoration-from-font">
                    {it.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* MIDDLE morph arrow */}
          <div className="hidden lg:flex flex-col items-center justify-center px-2">
            <MorphArrow />
          </div>

          {/* mobile arrow */}
          <div className="lg:hidden flex flex-col items-center my-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-full glass-strong px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70"
            >
              becomes
            </motion.div>
          </div>

          {/* NEW WAY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.04] via-transparent to-violet-400/[0.04] p-6 md:p-8 overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(34,211,238,0.25), transparent 70%)",
              }}
            />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
                  The PromptEdit Way
                </div>
                <div className="mt-1 font-display text-2xl md:text-3xl text-white">
                  One streamlined studio
                </div>
              </div>
              <div className="font-mono text-[11px] text-cyan-200 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1">
                ~$12 / mo avg
              </div>
            </div>

            {/* One unified surface visualization */}
            <div className="relative mt-6 h-44 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden">
              <div className="absolute inset-0 bg-grid-sm mask-radial opacity-50" />
              {/* central node */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_60px_-10px_rgba(34,211,238,0.7)] flex items-center justify-center"
              >
                <Sparkles className="w-7 h-7 text-white" />
                <span className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
              </motion.div>
              {/* orbital chips */}
              {[
                { l: "Veo", t: 18, x: "12%" },
                { l: "Kling", t: 22, x: "82%" },
                { l: "Eleven", t: 110, x: "8%" },
                { l: "Suno", t: 110, x: "82%" },
                { l: "Nano Banana", t: 5, x: "48%" },
              ].map((c, i) => (
                <motion.div
                  key={c.l}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="absolute glass rounded-full px-2.5 py-1 text-[10px] text-white/80 font-mono"
                  style={{ top: c.t, left: c.x }}
                >
                  {c.l}
                </motion.div>
              ))}
              {/* connector lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                <defs>
                  <linearGradient id="line-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                    <stop offset="50%" stopColor="rgba(34,211,238,0.6)" />
                    <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                  </linearGradient>
                </defs>
                {[
                  ["20%", "20%"],
                  ["80%", "25%"],
                  ["15%", "75%"],
                  ["85%", "75%"],
                  ["50%", "12%"],
                ].map((pos, i) => (
                  <motion.line
                    key={i}
                    x1={pos[0]}
                    y1={pos[1]}
                    x2="50%"
                    y2="50%"
                    stroke="url(#line-grad)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                  />
                ))}
              </svg>
            </div>

            <ul className="mt-8 space-y-3">
              {NEW_WAY.map((it, i) => (
                <motion.li
                  key={it.text}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-3 text-[14px] text-white/80"
                >
                  <span className="relative inline-flex w-7 h-7 rounded-full items-center justify-center border border-cyan-400/30 bg-cyan-400/10">
                    <Check className="w-3.5 h-3.5 text-cyan-300" strokeWidth={3} />
                    <span className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md" />
                  </span>
                  <span>{it.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SUBS = [
  { name: "Runway", cost: "$35", rotate: -12, leftPct: 0, top: 0 },
  { name: "Pika Pro", cost: "$35", rotate: 8, leftPct: 14, top: 10 },
  { name: "Midjourney", cost: "$30", rotate: -4, leftPct: 30, top: -8 },
  { name: "ElevenLabs", cost: "$22", rotate: 14, leftPct: 46, top: 14 },
  { name: "Suno", cost: "$24", rotate: -10, leftPct: 60, top: 4 },
  { name: "Topaz Video", cost: "$25", rotate: 6, leftPct: 78, top: -6 },
];

function SubscriptionPile() {
  return (
    <>
      {/* Mobile: neat tilted grid */}
      <div className="sm:hidden mt-6 grid grid-cols-2 gap-2.5">
        {SUBS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 * i }}
            className="glass rounded-xl px-3 py-2.5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-rose-400/70 to-orange-400/60" />
              <div className="text-[12px] text-white/85">{s.name}</div>
            </div>
            <div className="mt-1 font-mono text-[11px] text-rose-200/80">
              {s.cost} / mo
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tablet+ : scattered overlapping cards */}
      <div className="relative hidden sm:block mt-6 h-44">
        {SUBS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
            className="absolute glass rounded-xl px-3 py-2.5 w-[120px] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]"
            style={{ left: `${s.leftPct}%`, top: `${s.top}px` }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-rose-400/70 to-orange-400/60" />
              <div className="text-[12px] text-white/85">{s.name}</div>
            </div>
            <div className="mt-1 font-mono text-[11px] text-rose-200/80">
              {s.cost} / mo
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function MorphArrow() {
  return (
    <div className="relative w-24 h-72 flex items-center justify-center">
      <motion.div
        className="absolute w-px h-full bg-gradient-to-b from-rose-400/30 via-white/60 to-cyan-400/40"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        animate={{ y: [-30, 30, -30] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-12 h-12 rounded-full glass-strong flex items-center justify-center shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)]">
          <Sparkles className="w-5 h-5 text-cyan-300" />
        </div>
        <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl -z-10 animate-pulse-glow" />
      </motion.div>
    </div>
  );
}
