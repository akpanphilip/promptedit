"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Play,
  Copy,
  RefreshCw,
  Send,
  Cpu,
  Film,
  Image as ImageIcon,
  Mic2,
  Wand2,
  Pause,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { AIImageTile, AI_TILE_VARIANTS } from "@/components/shared/AIPreview";
import { cn } from "@/lib/utils";

type Mode = "video" | "image" | "voice";

const MODELS_BY_MODE: Record<
  Mode,
  { id: string; label: string; credits: number; hue: "cyan" | "violet" | "blue" | "pink" }[]
> = {
  video: [
    { id: "veo", label: "Veo 3", credits: 18, hue: "violet" },
    { id: "kling", label: "Kling 2.1", credits: 14, hue: "cyan" },
    { id: "runway", label: "Runway Gen-3", credits: 16, hue: "pink" },
    { id: "luma", label: "Luma Dream", credits: 12, hue: "blue" },
  ],
  image: [
    { id: "nano-banana", label: "Nano Banana", credits: 4, hue: "pink" },
    { id: "flux", label: "FLUX.1 Pro", credits: 5, hue: "violet" },
    { id: "ideogram", label: "Ideogram 3", credits: 4, hue: "cyan" },
  ],
  voice: [
    { id: "eleven-v3", label: "ElevenLabs v3", credits: 3, hue: "cyan" },
    { id: "suno", label: "Suno v4", credits: 8, hue: "pink" },
    { id: "sync", label: "Sync.so", credits: 6, hue: "violet" },
  ],
};

const PROMPTS_BY_MODE: Record<Mode, string> = {
  video: `Aerial drone shot of a rain-soaked Tokyo alley
at dusk, neon reflections in the puddles, slow push-in,
hand-held jitter, anamorphic flares, 8-second clip,
1080p, cinematic color grade.`,
  image: `A retro VHS-style thumbnail for a YouTube
video titled "I lived in a vending machine for 24 hours".
Bold sans-serif type, contrasting red + cyan palette,
exaggerated face reaction, halftone overlay.`,
  voice: `Hey, welcome back to the channel. Today we're
going to do something I've genuinely never done before,
and to be honest, I'm a little nervous. So... let's get
straight into it.`,
};

const VOICE_LINES = [
  { t: "Hey, welcome back to the channel.", dur: 1900 },
  { t: "Today we're going to do something I've genuinely never done before,", dur: 2600 },
  { t: "and to be honest, I'm a little nervous.", dur: 2100 },
  { t: "So… let's get straight into it.", dur: 1700 },
];

const HUES = {
  cyan: "from-cyan-400 to-blue-500",
  violet: "from-violet-400 to-fuchsia-500",
  blue: "from-blue-400 to-indigo-500",
  pink: "from-pink-400 to-rose-500",
} as const;

const MODE_TABS: { id: Mode; label: string; icon: typeof Film }[] = [
  { id: "video", label: "Video", icon: Film },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "voice", label: "Voice", icon: Mic2 },
];

export function Playground() {
  const [mode, setMode] = useState<Mode>("video");
  const [model, setModel] = useState(MODELS_BY_MODE.video[0].id);
  const [prompt, setPrompt] = useState(PROMPTS_BY_MODE.video);
  const [streaming, setStreaming] = useState(false);
  const [tileProgress, setTileProgress] = useState<number[]>([0, 0, 0, 0]);
  const [voiceProgress, setVoiceProgress] = useState(0); // 0..1
  const [voiceLineIdx, setVoiceLineIdx] = useState(-1);
  const [autoTriggered, setAutoTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const models = MODELS_BY_MODE[mode];
  const activeModel = models.find((m) => m.id === model) ?? models[0];

  useEffect(() => {
    setPrompt(PROMPTS_BY_MODE[mode]);
    setModel(MODELS_BY_MODE[mode][0].id);
    setTileProgress([0, 0, 0, 0]);
    setVoiceProgress(0);
    setVoiceLineIdx(-1);
  }, [mode]);

  // auto-start on first scroll-into-view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !autoTriggered) {
            setAutoTriggered(true);
            run();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTriggered]);

  // image + video: tile-by-tile progress
  useEffect(() => {
    if (!streaming) return;
    if (mode === "voice") return;
    const tilesCount = mode === "video" ? 3 : 4;
    setTileProgress(Array(tilesCount).fill(0));
    const startTime = performance.now();
    // video clips take longer to "generate"; image is snappier
    const baseDur = mode === "video" ? 2400 : 1600;
    const durations = Array.from({ length: tilesCount }).map(
      (_, i) => baseDur + i * 500,
    );
    const offsets = Array.from({ length: tilesCount }).map((_, i) => i * 250);
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const next = durations.map((d, i) => {
        const t = Math.max(0, elapsed - offsets[i]) / d;
        return Math.min(1, t);
      });
      setTileProgress(next);
      if (next.every((p) => p >= 1)) {
        setStreaming(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [streaming, mode]);

  // voice: scrub through lines + progress
  useEffect(() => {
    if (!streaming) return;
    if (mode !== "voice") return;
    setVoiceProgress(0);
    setVoiceLineIdx(0);
    const total = VOICE_LINES.reduce((s, l) => s + l.dur, 0);
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / total);
      setVoiceProgress(p);
      // find current line
      let acc = 0;
      let idx = 0;
      for (let i = 0; i < VOICE_LINES.length; i++) {
        if (elapsed < acc + VOICE_LINES[i].dur) {
          idx = i;
          break;
        }
        acc += VOICE_LINES[i].dur;
        idx = i;
      }
      setVoiceLineIdx(idx);
      if (p >= 1) {
        setStreaming(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [streaming, mode]);

  const run = () => {
    setTileProgress([0, 0, 0, 0]);
    setVoiceProgress(0);
    setVoiceLineIdx(-1);
    setStreaming(true);
  };

  const handleModelChange = (id: string) => {
    setModel(id);
    run();
  };

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden cv-auto-lg"
    >
      <GridBackground variant="small" fade="radial" />
      <AmbientGlow color="violet" className="left-[10%] top-[20%] w-[500px] h-[500px]" />
      <AmbientGlow color="cyan" className="right-[5%] bottom-[10%] w-[500px] h-[500px]" />

      <div className="container relative">
        <SectionHeader
          eyebrow="Live Playground"
          title={
            <>
              The video studio.{" "}
              <span className="text-gradient-cyber">Live preview</span>.
            </>
          }
          description="Same surface as the real product. Switch between Veo, Kling, Nano Banana, ElevenLabs. Render, swap models mid-thought, copy what works."
        />

        {/* Mode tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            {MODE_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                aria-pressed={mode === t.id}
                className={cn(
                  "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-medium transition-colors",
                  mode === t.id ? "text-white" : "text-white/55 hover:text-white/80",
                )}
              >
                {mode === t.id && (
                  <motion.span
                    layoutId="pg-mode"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/15 to-violet-400/20 border border-white/15 shadow-[0_0_20px_-4px_rgba(34,211,238,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <t.icon className="relative w-3.5 h-3.5" />
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative mt-6 rounded-[20px] md:rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Chrome */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 md:px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              <span className="hidden sm:inline ml-3 text-[11px] text-white/45 font-mono">
                studio · /playground · {mode}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/[0.06] p-1 max-w-full overflow-x-auto no-scrollbar">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModelChange(m.id)}
                  className={cn(
                    "relative px-3 py-1 text-[11px] rounded-full transition-colors whitespace-nowrap",
                    model === m.id ? "text-white" : "text-white/55 hover:text-white/85",
                  )}
                >
                  {model === m.id && (
                    <motion.span
                      layoutId="pg-model"
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-r opacity-30",
                        HUES[m.hue],
                      )}
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    />
                  )}
                  <span className="relative font-mono">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split panes */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px] md:min-h-[540px]">
            <div className="relative border-b md:border-b-0 md:border-r border-white/[0.06]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="text-[12px] text-white/75 font-medium">
                    {mode === "video"
                      ? "Shot prompt"
                      : mode === "image"
                        ? "Image prompt"
                        : "Script"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/45">
                  <span>{prompt.length} chars</span>
                </div>
              </div>
              <PromptEditor value={prompt} onChange={setPrompt} mode={mode} />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(prompt)}
                  className="rounded-md border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/75 hover:text-white px-2.5 py-1.5 text-[11px] flex items-center gap-1.5 transition-colors"
                  aria-label="Copy prompt"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
                <button
                  onClick={run}
                  className="rounded-md bg-gradient-to-r from-cyan-300 to-violet-300 text-ink-950 px-3 py-1.5 text-[11px] font-medium flex items-center gap-1.5 hover:shadow-[0_0_22px_-4px_rgba(34,211,238,0.6)] transition-shadow"
                  aria-label="Run prompt"
                  data-cursor-text="Render"
                >
                  <Play className="w-3 h-3" />
                  Render
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="relative bg-ink-950/40">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-2">
                  {mode === "video" ? (
                    <Film className="w-3.5 h-3.5 text-violet-300" />
                  ) : mode === "image" ? (
                    <Wand2 className="w-3.5 h-3.5 text-pink-300" />
                  ) : (
                    <Mic2 className="w-3.5 h-3.5 text-cyan-300" />
                  )}
                  <span className="text-[12px] text-white/75 font-medium">
                    {mode === "video"
                      ? "Takes"
                      : mode === "image"
                        ? "Renders"
                        : "Audio"}
                  </span>
                  {streaming && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse" />
                      </span>
                      rendering
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/45">
                  <span className="hidden sm:inline-flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {activeModel?.label}
                  </span>
                  <button
                    onClick={run}
                    className="inline-flex items-center gap-1 text-white/55 hover:text-white transition-colors"
                    aria-label="Rerun"
                  >
                    <RefreshCw className="w-3 h-3" />
                    rerun
                  </button>
                </div>
              </div>

              {mode === "video" ? (
                <VideoOutputPane progress={tileProgress} streaming={streaming} />
              ) : mode === "image" ? (
                <ImageOutputPane progress={tileProgress} streaming={streaming} />
              ) : (
                <VoiceOutputPane
                  progress={voiceProgress}
                  lineIdx={voiceLineIdx}
                  streaming={streaming}
                />
              )}
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 md:px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.015]">
            <div className="flex items-center gap-3 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                {mode === "video"
                  ? "1080p · 24fps · 3 takes"
                  : mode === "image"
                    ? "1024×1024 · 4 variants"
                    : "48 kHz · 1 track"}
              </span>
              <span className="hidden md:inline w-px h-3 bg-white/10" />
              <span className="hidden md:inline-flex items-center gap-1.5">
                Latency · <span className="font-mono text-white/70">412ms</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/45 font-mono">
                {(activeModel?.credits ?? 0).toFixed(1)} credits / run
              </span>
              <button
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 text-ink-950 px-3.5 py-1.5 text-[12px] font-medium hover:shadow-[0_0_22px_-4px_rgba(34,211,238,0.6)] transition-shadow"
                data-cursor-text="Save"
              >
                <Send className="w-3 h-3" />
                <span className="hidden sm:inline">Save to Library</span>
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Prompt editor ----------------------------- */

function PromptEditor({
  value,
  onChange,
  mode,
}: {
  value: string;
  onChange: (v: string) => void;
  mode: Mode;
}) {
  const lines = value.split("\n");
  return (
    <div className="relative font-mono text-[12.5px] leading-[1.65] p-4 sm:p-5 h-[360px] md:h-[460px] overflow-auto">
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-10 border-r border-white/[0.04] bg-white/[0.01] text-right pr-2 pt-4 sm:pt-5 text-white/25 select-none"
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="pl-9 relative">
        <pre
          aria-hidden
          className="absolute inset-0 pl-9 pt-0 whitespace-pre-wrap pointer-events-none break-words"
        >
          {lines.map((ln, i) => (
            <div key={i}>{highlight(ln, mode)}</div>
          ))}
        </pre>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          aria-label="Prompt editor"
          className="absolute inset-0 pl-9 pt-0 w-full h-full bg-transparent text-transparent caret-cyan-300 resize-none focus:outline-none whitespace-pre-wrap"
        />
      </div>
    </div>
  );
}

function highlight(line: string, mode: Mode) {
  const KEY =
    mode === "video"
      ? /(cinematic|anamorphic|drone|aerial|push-in|tracking|wide|close-up|jitter|1080p|4k|fps|slow-mo)/gi
      : mode === "image"
        ? /(thumbnail|halftone|sans-serif|palette|contrast|reaction|VHS|cinematic|8k)/gi
        : /(welcome|today|channel|nervous|honestly|seriously|so)/gi;
  const STR = /"([^"]+)"/g;
  let parts: React.ReactNode[] = [line];

  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return [part];
    const arr: React.ReactNode[] = [];
    let last = 0;
    part.replace(STR, (m, _g, off: number) => {
      arr.push(part.slice(last, off));
      arr.push(
        <span key={`s-${off}`} className="text-emerald-300/85">
          {m}
        </span>,
      );
      last = off + m.length;
      return m;
    });
    arr.push(part.slice(last));
    return arr;
  });

  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return [part];
    const arr: React.ReactNode[] = [];
    let last = 0;
    part.replace(KEY, (m, _g, off: number) => {
      arr.push(part.slice(last, off));
      arr.push(
        <span key={`k-${off}`} className="text-cyan-300">
          {m}
        </span>,
      );
      last = off + m.length;
      return m;
    });
    arr.push(part.slice(last));
    return arr;
  });

  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i} className="text-white/85">
            {p}
          </span>
        ) : (
          p
        ),
      )}
      <br />
    </>
  );
}

/* =========================== Video output pane =========================== */

function VideoOutputPane({
  progress,
  streaming,
}: {
  progress: number[];
  streaming: boolean;
}) {
  const main = progress[0] ?? 0;
  const totalSeconds = 8;
  const currentSec = Math.min(totalSeconds, Math.round(main * totalSeconds));

  // Frame counter. 24fps × 8s = 192 frames
  const totalFrames = 192;
  const currentFrames = Math.round(main * totalFrames);

  return (
    <div className="relative h-[360px] md:h-[460px] p-3 sm:p-4 flex flex-col gap-3">
      {/* Main clip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-1 rounded-xl overflow-hidden ai-tile-2 contain-paint"
      >
        {/* slow camera-drift on the background to fake "motion" */}
        <motion.div
          aria-hidden
          className="absolute inset-0 ai-tile-2"
          animate={
            !streaming
              ? { scale: [1.02, 1.08, 1.02], x: [0, -8, 0], y: [0, -4, 0] }
              : undefined
          }
          transition={
            !streaming
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/55" />

        {streaming && main < 1 && (
          <>
            <motion.div
              aria-hidden
              className="absolute inset-0 backdrop-blur-md bg-ink-950/35"
              animate={{ opacity: 1 - main }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.9), transparent)",
                filter: "drop-shadow(0 0 8px rgba(34,211,238,0.7))",
              }}
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* HUD overlay */}
        <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md bg-ink-950/65 backdrop-blur-md border border-white/15 px-2 py-1 text-[10px] font-mono text-white/85">
          <span className="text-amber-300">●REC</span>
          <span>1080p · 24fps</span>
        </div>
        <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-md bg-ink-950/65 backdrop-blur-md border border-white/15 px-2 py-1 text-[10px] font-mono text-white/85">
          frame {currentFrames.toString().padStart(3, "0")}/{totalFrames}
        </div>

        {/* timecode */}
        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md bg-ink-950/65 backdrop-blur-md border border-white/15 px-2 py-1 text-[10px] font-mono text-white/85">
          00:0{currentSec} / 00:0{totalSeconds}
        </div>

        {/* Play overlay when done */}
        <AnimatePresence>
          {main >= 1 && !streaming && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
              data-cursor-text="Play"
              aria-label="Preview render"
            >
              <span className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <span
                  className="block w-0 h-0"
                  style={{
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    borderLeft: "12px solid #0a0a1e",
                    marginLeft: 3,
                  }}
                />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Timeline at bottom */}
        <div className="absolute inset-x-3 bottom-10">
          <div className="h-1 rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              animate={{ width: `${main * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Variant takes (thumbs) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[1, 2, 3].map((i) => {
          const p = progress[i] ?? 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="relative aspect-video rounded-md overflow-hidden border border-white/[0.05] contain-paint"
            >
              <div
                className={cn(
                  "absolute inset-0",
                  AI_TILE_VARIANTS[(i + 1) % AI_TILE_VARIANTS.length],
                )}
              />
              {p < 1 && streaming && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 backdrop-blur-md bg-ink-950/35"
                  animate={{ opacity: 1 - p }}
                />
              )}
              <div className="absolute inset-x-1 bottom-1 flex items-center justify-between text-[9px] font-mono">
                <span className="text-white/75">take_0{i + 1}</span>
                {p >= 1 ? (
                  <span className="text-emerald-300">✓</span>
                ) : (
                  <span className="text-cyan-300">{Math.round(p * 100)}%</span>
                )}
              </div>
              {/* mini progress */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-300 to-violet-300"
                  animate={{ width: `${p * 100}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <FloatingStatus streaming={streaming} label="rendering" />
    </div>
  );
}

/* =========================== Image output pane =========================== */

function ImageOutputPane({
  progress,
  streaming,
}: {
  progress: number[];
  streaming: boolean;
}) {
  return (
    <div className="relative h-[360px] md:h-[460px] p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 h-full">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative"
          >
            <AIImageTile
              variant={AI_TILE_VARIANTS[i % AI_TILE_VARIANTS.length]}
              rounded="rounded-xl"
              ratio="square"
              loading={progress[i] < 1}
              progress={progress[i]}
              label={`variant_0${i + 1}`}
              className="h-full"
            />
            {progress[i] >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-ink-950/60 border border-white/15 px-1.5 py-0.5 text-[9px] font-mono text-emerald-300 backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400" />
                </span>
                done
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <FloatingStatus streaming={streaming} label="generating" />
    </div>
  );
}

/* =========================== Voice output pane =========================== */

function VoiceOutputPane({
  progress,
  lineIdx,
  streaming,
}: {
  progress: number[] | number;
  lineIdx: number;
  streaming: boolean;
}) {
  // The voice mode passes a single number; tolerate the type either way.
  const p = typeof progress === "number" ? progress : progress[0] ?? 0;

  const totalSec = VOICE_LINES.reduce((s, l) => s + l.dur, 0) / 1000;
  const elapsedSec = (p * totalSec).toFixed(1);

  // Build a static waveform; we reveal bars left-to-right as p advances.
  const bars = useMemo(() => {
    return Array.from({ length: 84 }).map((_, i) => {
      const t = i / 84;
      const v =
        0.18 +
        0.82 *
          Math.abs(
            Math.sin(t * 9.5) * 0.55 +
              Math.sin(t * 4.2 + 1.3) * 0.35 +
              Math.sin(t * 21) * 0.18,
          );
      return v;
    });
  }, []);
  const revealed = Math.floor(p * bars.length);

  return (
    <div className="relative h-[360px] md:h-[460px] p-3 sm:p-4 flex flex-col gap-3">
      {/* Voice ID + transport */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-2 ring-cyan-400/30 flex items-center justify-center text-[12px] font-medium text-white shrink-0">
            M
          </div>
          <div className="min-w-0">
            <div className="text-[13px] text-white font-medium truncate">
              Maya · Warm, Confident
            </div>
            <div className="text-[10.5px] text-white/45 font-mono">
              en-US · v3 · 48 kHz
            </div>
          </div>
        </div>
        <button
          className="w-9 h-9 rounded-full bg-white/95 text-ink-950 flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
          aria-label={streaming ? "Pause" : "Play"}
          data-cursor-text={streaming ? "Pause" : "Play"}
        >
          {streaming ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <span
              className="block w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "9px solid #0a0a1e",
                marginLeft: 2,
              }}
            />
          )}
        </button>
      </div>

      {/* Waveform */}
      <div className="relative rounded-xl border border-white/[0.06] bg-gradient-to-br from-cyan-400/[0.05] via-blue-500/[0.03] to-violet-500/[0.05] p-3 h-24 flex items-center gap-[2px]">
        {bars.map((v, i) => {
          const isPast = i < revealed;
          const isActive = i === revealed - 1 || i === revealed;
          return (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-full transition-colors duration-150",
                isPast
                  ? "bg-gradient-to-t from-cyan-400 to-violet-400"
                  : "bg-white/[0.07]",
                isActive && "shadow-[0_0_8px_rgba(34,211,238,0.7)]",
              )}
              style={{
                height: `${v * 100}%`,
                minHeight: 2,
                transform: isActive ? "scaleY(1.15)" : undefined,
              }}
            />
          );
        })}
        {/* scrubber */}
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-px bg-white/85"
          style={{
            left: `${Math.max(0, Math.min(100, p * 100))}%`,
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
        />
        <div className="absolute bottom-1 left-2 font-mono text-[10px] text-white/65">
          {elapsedSec}s / {totalSec.toFixed(1)}s
        </div>
        <div className="absolute bottom-1 right-2 font-mono text-[10px] text-white/45">
          ▲ −12 dB
        </div>
      </div>

      {/* Transcript */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 flex-1 overflow-auto font-mono text-[12.5px] leading-[1.75]">
        {VOICE_LINES.map((l, i) => (
          <p
            key={i}
            className={cn(
              "transition-colors duration-300",
              i < lineIdx
                ? "text-white/55"
                : i === lineIdx
                  ? "text-white"
                  : "text-white/30",
            )}
          >
            {i === lineIdx && (
              <span className="inline-flex items-center gap-1 mr-1.5 text-cyan-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-cyan-300 animate-pulse" />
                </span>
              </span>
            )}
            {l.t}
          </p>
        ))}
      </div>

      <FloatingStatus streaming={streaming} label="speaking" />
    </div>
  );
}

function FloatingStatus({
  streaming,
  label = "drawing credits…",
}: {
  streaming: boolean;
  label?: string;
}) {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 rounded-full glass px-3 py-1.5 text-[11px] font-mono text-white/65 inline-flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            streaming ? "bg-cyan-300 animate-pulse" : "bg-white/30",
          )}
        />
      </span>
      {streaming ? label : "ready"}
    </div>
  );
}
