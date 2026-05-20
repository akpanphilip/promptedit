"use client";
import { motion } from "framer-motion";
import {
  Infinity as InfinityIcon,
  Layers,
  Workflow,
  Zap,
  TrendingUp,
  ScrollText,
  History,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { cn } from "@/lib/utils";

export function Bento() {
  return (
    <section id="bento" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="dots" fade="radial" />
      <AmbientGlow
        color="cyan"
        className="left-[5%] top-[10%] w-[500px] h-[500px]"
      />

      <div className="container relative">
        <SectionHeader
          eyebrow="Why video creators love it"
          title={
            <>
              Built for <span className="text-gradient-cyber">render velocity</span>.
            </>
          }
          description="Every detail of PromptEdit exists to remove a video creator's friction, from billing to dubbing to publishing."
        />

        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-6 md:auto-rows-[180px] gap-3 md:gap-4">
          {/* No subscriptions: large hero card */}
          <BentoCard className="md:col-span-3 md:row-span-2" glow="cyan">
            <NoSubsCard />
          </BentoCard>

          {/* All-in-one */}
          <BentoCard className="md:col-span-3" glow="violet">
            <AllInOneCard />
          </BentoCard>

          {/* Creator workflows */}
          <BentoCard className="md:col-span-2" glow="blue">
            <WorkflowCard />
          </BentoCard>

          {/* Faster experimentation */}
          <BentoCard className="md:col-span-1" glow="pink">
            <FastExpCard />
          </BentoCard>

          {/* Affordable scaling */}
          <BentoCard className="md:col-span-3" glow="cyan">
            <ScaleCard />
          </BentoCard>

          {/* Prompt management */}
          <BentoCard className="md:col-span-2" glow="violet">
            <PromptMgmtCard />
          </BentoCard>

          {/* History */}
          <BentoCard className="md:col-span-1" glow="blue">
            <HistoryCard />
          </BentoCard>

          {/* Collaboration */}
          <BentoCard className="md:col-span-3" glow="pink">
            <CollabCard />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className,
  glow = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "violet" | "blue" | "pink";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className={cn("min-h-[180px]", className)}
    >
      <GlowCard glow={glow} className="h-full">
        {children}
      </GlowCard>
    </motion.div>
  );
}

/* ---------------- individual bento card contents ---------------- */

function NoSubsCard() {
  return (
    <div className="relative h-full p-6 md:p-7 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-300/90">
        <InfinityIcon className="w-3.5 h-3.5" />
        Zero subscriptions
      </div>
      <h3 className="mt-3 font-display text-2xl md:text-3xl text-white text-balance leading-tight">
        Top up once.
        <br />
        Render across <span className="text-gradient-cyber">every model</span>.
      </h3>
      <p className="mt-3 text-[13.5px] text-white/55 max-w-md">
        One pool of credits powers every shot, every cut, every dub. No renewals.
        No surprise charges. No vendor lock-in.
      </p>

      {/* Visual: credits funnel */}
      <div className="relative mt-auto pt-6 flex-1 flex items-end">
        <div className="relative w-full h-44">
          <div className="absolute top-0 left-0 right-0 flex justify-around text-[10px] font-mono text-white/40">
            {["Runway", "Pika", "MJ", "Eleven", "Suno", "Topaz"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 160"
            aria-hidden
          >
            <defs>
              <linearGradient id="funnel" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.0" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
              </linearGradient>
            </defs>
            {[40, 100, 160, 220, 280, 340].map((x) => (
              <motion.line
                key={x}
                x1={x}
                y1={20}
                x2={200}
                y2={140}
                stroke="url(#funnel)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            ))}
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_40px_-6px_rgba(34,211,238,0.7)] flex items-center justify-center text-white text-[13px] font-medium">
            <Zap className="w-4 h-4 mr-1.5" />
            1 credit pool
          </div>
        </div>
      </div>
    </div>
  );
}

function AllInOneCard() {
  return (
    <div className="relative h-full p-6 flex items-start gap-5">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-violet-300/90">
          <Layers className="w-3.5 h-3.5" />
          All-in-one
        </div>
        <h3 className="mt-2 font-display text-xl text-white">
          14 top-tier models. One window.
        </h3>
        <p className="mt-2 text-[13px] text-white/55">
          Veo, Kling, Runway, Pika, Luma, Nano Banana, FLUX, ElevenLabs, Suno.
          Every model a video creator actually uses, one auth, one billing line.
        </p>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className={cn(
              "w-9 h-9 rounded-lg border border-white/[0.07]",
              i % 3 === 0 && "bg-gradient-to-br from-cyan-400/40 to-blue-500/40",
              i % 3 === 1 && "bg-gradient-to-br from-violet-400/40 to-fuchsia-500/40",
              i % 3 === 2 && "bg-gradient-to-br from-pink-400/40 to-rose-500/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function WorkflowCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-300/90">
        <Workflow className="w-3.5 h-3.5" />
        Storyboard → publish
      </div>
      <h3 className="mt-2 font-display text-xl text-white">
        Chain shots into flows.
      </h3>
      <p className="mt-2 text-[13px] text-white/55">
        Pipe a thumbnail into Veo, drop the take into Sync for a dub, route to your
        editor. Visually.
      </p>
      <div className="mt-auto pt-4 flex items-center gap-1">
        {["Thumb", "→", "Veo", "→", "Sync"].map((s, i) => (
          <div
            key={i}
            className={cn(
              "px-2 py-1 text-[10px] font-mono rounded-md",
              s === "→"
                ? "text-white/30 px-1"
                : "bg-white/[0.05] border border-white/[0.06] text-white/75",
            )}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function FastExpCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-pink-300/90">
        <Zap className="w-3.5 h-3.5" />
        Faster
      </div>
      <div className="mt-auto">
        <div className="font-display text-4xl text-white">10x</div>
        <div className="text-[12px] text-white/55 mt-1">
          render iterations per session
        </div>
      </div>
    </div>
  );
}

function ScaleCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-300/90">
        <TrendingUp className="w-3.5 h-3.5" />
        Affordable scaling
      </div>
      <h3 className="mt-2 font-display text-xl text-white">
        Pay $0 on the weeks you don't render.
      </h3>
      <p className="mt-2 text-[13px] text-white/55 max-w-md">
        Credits roll over. Studios go dark when you do. Spend follows your
        production calendar, not a fixed monthly tax.
      </p>
      <div className="mt-auto pt-4 flex items-end gap-1.5 h-12">
        {[18, 32, 60, 24, 80, 12, 0, 0, 45, 78, 92, 36].map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${v}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.04 * i }}
            className="flex-1 rounded-sm bg-gradient-to-t from-cyan-400/30 to-cyan-300/80"
            style={{ minHeight: 2 }}
          />
        ))}
      </div>
    </div>
  );
}

function PromptMgmtCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-violet-300/90">
        <ScrollText className="w-3.5 h-3.5" />
        Shot prompt vault
      </div>
      <h3 className="mt-2 font-display text-xl text-white">
        Your shot prompts, versioned.
      </h3>
      <div className="mt-3 space-y-1.5">
        {[
          "yt-thumbnail-style v7 · Nano Banana",
          "drone-establishing-shot v12 · Veo 3",
          "host-vo-warm-tone v3 · Eleven v3",
        ].map((p, i) => (
          <div
            key={p}
            className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5"
          >
            <span className="text-[11px] font-mono text-white/75">{p}</span>
            <span className="text-[9px] font-mono text-white/30">
              v{12 - i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-300/90">
        <History className="w-3.5 h-3.5" />
        Time machine
      </div>
      <h3 className="mt-2 font-display text-xl text-white">Every take, kept.</h3>
      <div className="mt-auto pt-3 flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-1 h-8 rounded-md bg-gradient-to-br from-blue-400/30 to-cyan-400/20 border border-white/[0.05]"
          />
        ))}
      </div>
    </div>
  );
}

function CollabCard() {
  return (
    <div className="relative h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-pink-300/90">
        <Users className="w-3.5 h-3.5" />
        Studios for video teams
      </div>
      <h3 className="mt-2 font-display text-xl text-white">
        Edit together, in real-time.
      </h3>
      <p className="mt-2 text-[13px] text-white/55">
        Share shot libraries, divide credit pools across editors, branch takes,
        all without leaving the studio.
      </p>
      <div className="mt-auto pt-4 flex items-center -space-x-2">
        {["MO", "DS", "AB", "TL", "RH"].map((n, i) => (
          <div
            key={n}
            className={cn(
              "w-8 h-8 rounded-full ring-2 ring-ink-950 flex items-center justify-center text-[10px] font-medium text-white",
              i % 4 === 0 && "bg-gradient-to-br from-cyan-400 to-blue-500",
              i % 4 === 1 && "bg-gradient-to-br from-violet-400 to-fuchsia-500",
              i % 4 === 2 && "bg-gradient-to-br from-pink-400 to-rose-500",
              i % 4 === 3 && "bg-gradient-to-br from-amber-300 to-orange-500",
            )}
          >
            {n}
          </div>
        ))}
        <div className="w-8 h-8 rounded-full ring-2 ring-ink-950 bg-white/[0.06] flex items-center justify-center text-[10px] text-white/60">
          +12
        </div>
      </div>
    </div>
  );
}
