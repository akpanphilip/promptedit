"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowUpRight,
  Activity,
  Cpu,
  Image as ImageIcon,
  Film,
  Mic2,
  Wand2,
  Zap,
  CircleDot,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { GradientButton } from "@/components/shared/GradientButton";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { ParticleField } from "@/components/shared/ParticleField";
import { CursorSpotlight } from "@/components/shared/CursorSpotlight";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

const FLOATING_CARDS = [
  {
    label: "Veo 3",
    sub: "8s · 1080p",
    icon: Film,
    accent: "from-violet-400/80 to-fuchsia-500/80",
    pos: "top-[8%] left-[2%]",
    delay: 0.2,
    drift: -10,
  },
  {
    label: "Kling 2.1",
    sub: "I2V · motion",
    icon: ImageIcon,
    accent: "from-cyan-400/80 to-blue-500/80",
    pos: "top-[18%] right-[2%]",
    delay: 0.35,
    drift: 12,
  },
  {
    label: "Nano Banana",
    sub: "thumb · edit",
    icon: Wand2,
    accent: "from-pink-400/80 to-rose-500/80",
    pos: "bottom-[14%] left-[4%]",
    delay: 0.5,
    drift: -8,
  },
  {
    label: "ElevenLabs v3",
    sub: "voice · dub",
    icon: Mic2,
    accent: "from-cyan-400/80 to-violet-500/80",
    pos: "bottom-[8%] right-[3%]",
    delay: 0.65,
    drift: 10,
  },
];

export function Hero() {
  return (
    <section className="relative isolate pt-28 md:pt-40 lg:pt-44 pb-14 md:pb-24 overflow-x-clip overflow-y-visible">
      {/* Backgrounds */}
      <GridBackground variant="lines" fade="radial" />
      <ParticleField count={40} />
      <AmbientGlow
        color="cyan"
        className="left-1/2 -translate-x-1/2 top-[-180px] w-[900px] h-[600px]"
      />
      <AmbientGlow
        color="violet"
        className="left-1/3 top-[280px] w-[600px] h-[500px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />

      <div className="container relative">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-fit"
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:text-white hover:border-white/20 transition-all overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-400 animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-60 blur-sm" />
            </span>
            <span className="relative">PromptEdit · v2 launch</span>
            <span className="relative h-3 w-px bg-white/15" />
            <span className="relative inline-flex items-center gap-1 text-white/60 group-hover:text-white/90 transition-colors">
              Read the changelog
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>
        </motion.div>

        {/* Headline */}
        <div className="mt-7 md:mt-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[1] tracking-[-0.03em]"
          >
            <span className="text-gradient-cyber">Veo. Kling. Nano Banana.</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-mono">One studio for video creators.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-[17px] text-white/60 text-balance leading-relaxed"
          >
            Every AI a video creator actually uses: Veo, Kling, Nano Banana, Runway,
            ElevenLabs, Suno, on a single credit pool. Render, edit, voice, publish.
            No subscriptions, no tab-switching, no friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <GradientButton size="lg">Start with 500 free credits</GradientButton>
            <GradientButton size="lg" variant="ghost" iconRight={<Activity className="w-4 h-4" />}>
              Watch a render
            </GradientButton>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/45"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              4.92 creator rating
            </span>
            <span className="hidden sm:inline w-px h-3 bg-white/15" />
            <span>
              <span className="text-white/75 font-medium">14</span> top-tier models
            </span>
            <span className="hidden sm:inline w-px h-3 bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
              <AnimatedCounter to={84_000} suffix="+" className="text-white/75 font-medium" />
              <span>video minutes today</span>
            </span>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <DashboardMock />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard mock                                                            */
/* -------------------------------------------------------------------------- */

function DashboardMock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 80,
    damping: 18,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="relative mt-12 md:mt-24 mx-auto max-w-6xl perspective-1000"
    >
      {/* Glow behind */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[36px] blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(168,85,247,0.32), transparent 55%)",
        }}
      />

      {/* Floating tool cards */}
      {FLOATING_CARDS.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute z-20 hidden md:block",
            c.pos,
          )}
        >
          <motion.div
            animate={{ y: [0, c.drift, 0] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="glass-strong rounded-2xl px-3.5 py-3 min-w-[180px] flex items-center gap-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
          >
            <div
              className={cn(
                "relative w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br",
                c.accent,
              )}
            >
              <c.icon className="w-4 h-4 text-white" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/30 mix-blend-overlay" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-white leading-none">
                {c.label}
              </div>
              <div className="text-[11px] text-white/50 mt-1">{c.sub}</div>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-cyan-300/90 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-cyan-300 animate-pulse" />
              </span>
              live
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-[20px] md:rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <CursorSpotlight size={600} color="rgba(34,211,238,0.12)" />

        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/55 font-mono">
            <Cpu className="w-3 h-3" />
            app.promptedit.ai / studio
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/60">
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-mono">
              <AnimatedCounter to={2480} format="plain" />
            </span>
            <span className="text-white/40">credits</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-5 min-h-[400px] md:min-h-[480px]">
          {/* Sidebar */}
          <aside className="col-span-2 lg:col-span-2 flex flex-col gap-1.5">
            {[
              { l: "Studio", a: true, i: Sparkles },
              { l: "Tools", a: false, i: ImageIcon },
              { l: "Flows", a: false, i: Activity },
              { l: "Library", a: false, i: Wand2 },
            ].map((it) => (
              <div
                key={it.l}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px]",
                  it.a
                    ? "bg-white/[0.06] text-white border border-white/[0.08]"
                    : "text-white/55 hover:text-white/80",
                )}
              >
                <it.i className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{it.l}</span>
              </div>
            ))}
            <div className="mt-auto rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] p-2.5">
              <div className="text-[10px] text-cyan-200/80 uppercase tracking-wider">
                Pay-as-you-go
              </div>
              <div className="mt-1 font-mono text-[12px] text-white/80">
                $0.004 / gen
              </div>
            </div>
          </aside>

          {/* Main panel: live generation */}
          <div className="col-span-10 lg:col-span-7 rounded-xl border border-white/[0.06] bg-gradient-to-b from-ink-900/60 to-ink-950/40 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2 px-2.5 sm:px-3 py-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] text-white/45 font-mono shrink-0">prompt</span>
                <span className="text-[11px] text-white/75 truncate">
                  &ldquo;Aerial drone shot of a neon Tokyo alley, rain, 8s, cinematic&rdquo;
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="hidden sm:inline">streaming</span>
              </div>
            </div>

            <div className="relative flex-1 grid grid-cols-2 gap-2 p-2">
              {[0, 1, 2, 3].map((i) => (
                <GenTile key={i} index={i} />
              ))}
              {/* Scanline */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
                animate={{ y: [0, 380, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Right: stats */}
          <aside className="hidden lg:flex col-span-3 flex-col gap-3">
            <StatTile label="Spend this month" value="$12.40" trend="-78%" />
            <StatTile label="Avg / generation" value="$0.004" trend="" />
            <CreditBar />
            <ModelMini />
          </aside>
        </div>
      </motion.div>

      {/* Bottom gradient floor */}
      <div
        aria-hidden
        className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none"
      />
    </div>
  );
}

function GenTile({ index }: { index: number }) {
  const gradients = [
    "from-violet-500/40 via-fuchsia-500/30 to-cyan-500/30",
    "from-cyan-400/40 via-blue-500/30 to-indigo-500/30",
    "from-rose-400/40 via-orange-500/30 to-amber-400/30",
    "from-emerald-400/40 via-cyan-500/30 to-blue-500/30",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
      className="relative rounded-lg overflow-hidden border border-white/[0.05]"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradients[index])} />
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
      {/* shimmer */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(120px circle at 30% 30%, rgba(255,255,255,0.18), transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-wider text-white/65 font-mono">
          variant_0{index + 1}
        </div>
        <div className="text-[9px] text-white/55 font-mono">2.1s</div>
      </div>
    </motion.div>
  );
}

function StatTile({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-wider text-white/45">{label}</div>
      <div className="mt-1.5 flex items-end justify-between">
        <div className="font-display text-xl text-white">{value}</div>
        {trend && (
          <div className="text-[10px] text-emerald-300 font-mono">{trend}</div>
        )}
      </div>
    </div>
  );
}

function CreditBar() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="flex items-center justify-between text-[10px] text-white/50">
        <span className="uppercase tracking-wider">Credit balance</span>
        <span className="font-mono text-cyan-300">2,480</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "62%" }}
          transition={{ duration: 1.6, delay: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        />
      </div>
      <div className="mt-1.5 text-[10px] text-white/45 font-mono">
        ≈ 620 generations left
      </div>
    </div>
  );
}

function ModelMini() {
  const models = [
    { n: "Veo 3", v: 87 },
    { n: "Kling 2.1", v: 64 },
    { n: "Nano Banana", v: 48 },
  ];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 flex-1">
      <div className="text-[10px] uppercase tracking-wider text-white/45 mb-2">
        Top models
      </div>
      <div className="space-y-2">
        {models.map((m, i) => (
          <div key={m.n}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white/75">{m.n}</span>
              <span className="font-mono text-white/45">{m.v}%</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.v}%` }}
                transition={{ duration: 1.2, delay: 1 + i * 0.15 }}
                className="h-full bg-gradient-to-r from-cyan-300 to-violet-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
