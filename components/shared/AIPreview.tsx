"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================
   AI Preview tiles. CSS-only "generated" artwork. Each variant
   layers radial/conic gradients with noise to feel painterly.
   ============================================================ */

export const AI_TILE_VARIANTS = ["ai-tile-1", "ai-tile-2", "ai-tile-3", "ai-tile-4"] as const;
export type AITileVariant = (typeof AI_TILE_VARIANTS)[number];

type AIImageTileProps = {
  variant?: AITileVariant;
  className?: string;
  label?: string;
  /** When true, shows a generating shimmer + progress overlay. */
  loading?: boolean;
  progress?: number; // 0..1
  rounded?: string;
  ratio?: "square" | "landscape" | "portrait";
};

export function AIImageTile({
  variant = "ai-tile-1",
  className,
  label,
  loading = false,
  progress = 1,
  rounded = "rounded-lg",
  ratio = "square",
}: AIImageTileProps) {
  const r =
    ratio === "landscape" ? "aspect-[16/10]" : ratio === "portrait" ? "aspect-[3/4]" : "aspect-square";
  return (
    <div className={cn("relative overflow-hidden", r, rounded, variant, className)}>
      {/* texture */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
      {/* shine */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.25), transparent 55%)",
        }}
      />

      {/* mask-as-generating */}
      {loading && (
        <>
          <motion.div
            aria-hidden
            className="absolute inset-0 backdrop-blur-md bg-ink-950/30"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 - progress }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* scanline */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.85), transparent)",
              filter: "drop-shadow(0 0 6px rgba(34,211,238,0.7))",
            }}
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* progress chip */}
          <div className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/15 px-1.5 py-0.5 text-[9px] font-mono text-white/85">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-300 animate-pulse" />
            </span>
            {Math.round(progress * 100)}%
          </div>
        </>
      )}

      {label && !loading && (
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] font-mono text-white/65 uppercase tracking-wider">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marketplace card "preview band". 3 tiles for visual tool cards   */
/* ------------------------------------------------------------------ */

type PreviewBandProps = {
  type: "image" | "video" | "voice" | "music" | "avatar" | "upscale";
  className?: string;
};

export function PreviewBand({ type, className }: PreviewBandProps) {
  if (type === "voice") {
    return <WaveformPreview className={className} />;
  }
  if (type === "music") {
    return <WaveformPreview className={className} dense />;
  }
  if (type === "video") {
    return <VideoStripPreview className={className} />;
  }
  if (type === "upscale") {
    return <UpscalePreview className={className} />;
  }
  if (type === "avatar") {
    return (
      <div className={cn("grid grid-cols-3 gap-1.5", className)}>
        <AIImageTile variant="ai-tile-3" ratio="portrait" rounded="rounded-md" />
        <AIImageTile variant="ai-tile-1" ratio="portrait" rounded="rounded-md" />
        <AIImageTile variant="ai-tile-4" ratio="portrait" rounded="rounded-md" />
      </div>
    );
  }
  // default: image triplet
  return (
    <div className={cn("grid grid-cols-3 gap-1.5", className)}>
      <AIImageTile variant="ai-tile-1" rounded="rounded-md" />
      <AIImageTile variant="ai-tile-2" rounded="rounded-md" />
      <AIImageTile variant="ai-tile-3" rounded="rounded-md" />
    </div>
  );
}

function WaveformPreview({
  className,
  dense = false,
}: {
  className?: string;
  dense?: boolean;
}) {
  const barCount = dense ? 64 : 44;
  const bars = React.useMemo(
    () =>
      Array.from({ length: barCount }).map((_, i) => {
        const t = i / barCount;
        const v =
          0.15 +
          0.85 *
            Math.abs(
              Math.sin(t * 9) * 0.55 +
                Math.sin(t * 4.2 + 1.3) * 0.35 +
                Math.sin(t * 17) * 0.15,
            );
        return v;
      }),
    [barCount],
  );
  return (
    <div
      className={cn(
        "h-16 rounded-md border border-white/[0.06] bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.05] to-violet-500/[0.08] px-2 flex items-center gap-[2px]",
        className,
      )}
    >
      {bars.map((v, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-full bg-gradient-to-t from-cyan-400/80 to-violet-400/80"
          style={{ minHeight: 2 }}
          initial={{ scaleY: 0.4 }}
          whileInView={{ scaleY: v }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: i * 0.012,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

/** A landscape "video clip" preview: single 16:9 tile with timecode + frame indicator. */
function VideoStripPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <AIImageTile variant="ai-tile-2" ratio="landscape" rounded="rounded-md" />
      {/* timecode chip */}
      <div className="absolute bottom-1.5 left-1.5 font-mono text-[9px] text-white/85 rounded bg-ink-950/70 backdrop-blur-md px-1.5 py-0.5 border border-white/10">
        00:08
      </div>
      {/* play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-white/85 flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
          <span
            className="block w-0 h-0"
            style={{
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "7px solid #0a0a1e",
              marginLeft: 2,
            }}
          />
        </div>
      </div>
      {/* frame strip below */}
      <div className="mt-1 flex gap-[2px] h-1.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-[1px] bg-gradient-to-t from-cyan-400/40 to-violet-400/30"
          />
        ))}
      </div>
    </div>
  );
}

/** Before/After upscale comparison */
function UpscalePreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-16 rounded-md border border-white/[0.06] overflow-hidden grid grid-cols-2",
        className,
      )}
    >
      <div className="relative ai-tile-3">
        <div className="absolute inset-0 backdrop-blur-[2px] bg-ink-950/15" />
        <div className="absolute bottom-1 left-1 font-mono text-[8px] text-white/75 uppercase tracking-wider">
          SD
        </div>
      </div>
      <div className="relative ai-tile-1">
        <div className="absolute bottom-1 right-1 font-mono text-[8px] text-cyan-200 uppercase tracking-wider">
          4K
        </div>
      </div>
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      />
    </div>
  );
}
