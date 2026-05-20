"use client";
import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground } from "@/components/shared/GridBackground";
import { PreviewBand } from "@/components/shared/AIPreview";
import { TOOLS, TOOL_CATEGORIES, type Tool } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";

function previewTypeFor(
  category: string,
): "image" | "video" | "voice" | "music" | "avatar" | "upscale" | null {
  switch (category) {
    case "Image":
      return "image";
    case "Video":
      return "video";
    case "Voice":
      return "voice";
    case "Music":
      return "music";
    case "Avatars":
      return "avatar";
    case "Upscale":
      return "upscale";
    default:
      return null;
  }
}

const ACCENT_MAP: Record<Tool["accent"], { bg: string; ring: string; text: string }> = {
  cyan: {
    bg: "from-cyan-400/80 to-blue-500/80",
    ring: "ring-cyan-400/30",
    text: "text-cyan-300",
  },
  violet: {
    bg: "from-violet-400/80 to-fuchsia-500/80",
    ring: "ring-violet-400/30",
    text: "text-violet-300",
  },
  blue: {
    bg: "from-blue-400/80 to-indigo-500/80",
    ring: "ring-blue-400/30",
    text: "text-blue-300",
  },
  pink: {
    bg: "from-pink-400/80 to-rose-500/80",
    ring: "ring-pink-400/30",
    text: "text-pink-300",
  },
};

export function Marketplace() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const matchQuery =
        !query ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [category, query]);

  return (
    <section id="marketplace" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="small" fade="radial" />
      <div
        aria-hidden
        className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,85,247,0.18), transparent 70%)",
        }}
      />

      <div className="container relative">
        <SectionHeader
          eyebrow="The Marketplace"
          title={
            <>
              Every model a <span className="text-gradient-cyber">video creator</span> uses.
            </>
          }
          description="Video gen, image edit, voice, music, lip-sync, upscaling. The actual top-tier models, curated, rated, on tap."
        />

        {/* controls */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between"
        >
          {/* search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Veo, Kling, Nano Banana, ElevenLabs…"
              aria-label="Search tools"
              className="w-full h-11 rounded-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 pl-10 pr-4 text-sm text-white placeholder:text-white/35 transition-all"
            />
          </div>

          {/* categories */}
          <div className="relative flex items-center gap-1 overflow-x-auto md:overflow-visible no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div
              className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 whitespace-nowrap"
              onMouseLeave={() => {}}
            >
              {TOOL_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-[12px] rounded-full whitespace-nowrap transition-colors",
                    category === c ? "text-white" : "text-white/55 hover:text-white/85",
                  )}
                >
                  {category === c && (
                    <motion.span
                      layoutId="cat-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/15 to-violet-400/20 border border-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-white/50">
            <Sparkles className="w-6 h-6 mx-auto text-white/30" />
            <p className="mt-3 text-sm">No tools match that filter. Try a broader search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

const ToolCard = memo(function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const accent = ACCENT_MAP[tool.accent];
  const [saved, setSaved] = useState(false);
  const previewType = previewTypeFor(tool.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
    >
      <GlowCard glow={tool.accent} className="lift h-full contain-paint">
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "relative w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]",
                accent.bg,
              )}
            >
              <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/30 mix-blend-overlay" />
            </div>
            <div className="flex items-center gap-1">
              {tool.trending && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300/90 bg-amber-300/10 border border-amber-300/20 rounded-full px-2 py-0.5">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
              <button
                aria-label={saved ? "Unsave tool" : "Save tool"}
                onClick={() => setSaved((v) => !v)}
                className="w-8 h-8 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <Heart
                  className={cn(
                    "w-3.5 h-3.5",
                    saved && "fill-pink-400 text-pink-400",
                  )}
                />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg text-white">{tool.name}</h3>
              <span className={cn("text-[10px] font-mono uppercase tracking-wider", accent.text)}>
                {tool.category}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-white/55 leading-relaxed">
              {tool.description}
            </p>
          </div>

          {previewType && (
            <div className="mt-4">
              <PreviewBand type={previewType} />
            </div>
          )}

          {/* live activity bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[10px] text-white/45 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                live · {tool.model}
              </span>
              <span>{formatNumber(tool.uses)} runs</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(tool.rating * 18, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + index * 0.04 }}
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  accent.bg,
                )}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span className="text-[12px] text-white/80 font-medium">{tool.rating}</span>
              <span className="text-[11px] text-white/40">/ 5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-white/45">
                {tool.credits === 0 ? "Free" : `${tool.credits} cr`}
              </span>
              <button
                aria-label={`Open ${tool.name}`}
                className="group inline-flex items-center gap-1 text-[12px] text-white/80 hover:text-white transition-colors"
              >
                Run
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
});
