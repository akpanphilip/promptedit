"use client";
import { memo, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ShieldCheck,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { GlowCard } from "@/components/shared/GlowCard";
import { TESTIMONIALS, type Review } from "@/lib/data";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<Review["accent"], string> = {
  cyan: "from-cyan-400 to-blue-500",
  violet: "from-violet-400 to-fuchsia-500",
  blue: "from-blue-400 to-indigo-500",
  pink: "from-pink-400 to-rose-500",
};

const ACCENT_RING: Record<Review["accent"], string> = {
  cyan: "ring-cyan-400/30",
  violet: "ring-violet-400/30",
  blue: "ring-blue-400/30",
  pink: "ring-pink-400/30",
};

const ACCENT_TEXT: Record<Review["accent"], string> = {
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  blue: "text-blue-300",
  pink: "text-pink-300",
};

export function Reviews() {
  const featured = useMemo(() => TESTIMONIALS.filter((r) => r.featured), []);
  const rest = useMemo(() => TESTIMONIALS.filter((r) => !r.featured), []);

  // split the rest into two roughly equal rows for the marquees
  const half = Math.ceil(rest.length / 2);
  const rowA = rest.slice(0, half);
  const rowB = rest.slice(half);

  return (
    <section id="reviews" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="small" fade="radial" />
      <AmbientGlow color="violet" className="left-[5%] top-[10%] w-[500px] h-[500px]" />
      <AmbientGlow color="cyan" className="right-[5%] bottom-[10%] w-[500px] h-[500px]" />

      <div className="container relative">
        <SectionHeader
          eyebrow="Verified creator reviews"
          title={
            <>
              From video creators who{" "}
              <span className="text-gradient-cyber">actually ship</span>.
            </>
          }
          description="YouTubers, TikTokers, indie filmmakers, ad teams, all using PromptEdit every day. Real workflows, real numbers, real receipts."
        />

        {/* aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-6 text-[12px] text-white/55"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-300 text-amber-300 drop-shadow-[0_0_4px_rgba(252,211,77,0.5)]"
                />
              ))}
            </div>
            <span className="font-display text-xl text-white">4.91</span>
            <span>· 2,841 verified creators</span>
          </div>
          <span className="hidden sm:inline w-px h-4 bg-white/10" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            All verified purchases
          </span>
        </motion.div>

        {/* Featured carousel */}
        <FeaturedReview reviews={featured} />

        {/* Dual marquees */}
        <div className="relative mt-10 md:mt-16 -mx-4 md:-mx-8 px-4 md:px-8 mask-fade-h">
          <ReviewMarquee reviews={rowA} direction="left" speed={62} />
          <div className="h-3" />
          <ReviewMarquee reviews={rowB} direction="right" speed={74} />
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-white/55"
        >
          <span>Want to leave a review?</span>
          <a
            href="#"
            data-cursor-text="Open"
            className="inline-flex items-center gap-1 text-white/85 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
          >
            Share your story
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== Featured ============================== */

function FeaturedReview({ reviews }: { reviews: Review[] }) {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const total = reviews.length;
  const cur = reviews[idx];

  useEffect(() => {
    if (!auto || total < 2) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, 6500);
    return () => window.clearInterval(id);
  }, [auto, total]);

  const go = (delta: number) => {
    setAuto(false);
    setIdx((i) => (i + delta + total) % total);
  };

  if (!cur) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
      className="relative mt-10 mx-auto max-w-4xl"
    >
      {/* outer animated gradient border */}
      <div
        aria-hidden
        className="absolute -inset-[1px] rounded-[28px] opacity-70 blur-[2px]"
        style={{
          background:
            "conic-gradient(from var(--a, 0deg), rgba(34,211,238,0.5), rgba(168,85,247,0.5), rgba(59,130,246,0.4), rgba(34,211,238,0.5))",
          animation: "spin-slow 18s linear infinite",
        }}
      />
      <div className="relative rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-ink-900/80 via-ink-950/60 to-ink-900/80 backdrop-blur-2xl overflow-hidden">
        {/* inner subtle grid */}
        <div className="absolute inset-0 bg-grid-sm mask-radial opacity-30" />
        <div
          aria-hidden
          className="absolute -top-32 -right-24 w-72 h-72 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.45), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.45), transparent)",
          }}
        />

        <div className="relative p-6 sm:p-10 md:p-12">
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] uppercase tracking-[0.18em] text-white/65">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              Featured story
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5",
                    i <= cur.rating
                      ? "fill-amber-300 text-amber-300"
                      : "text-white/15",
                  )}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-8"
            >
              <Quote
                className="w-6 h-6 text-white/20"
                strokeWidth={2}
              />
              <p className="mt-3 font-display text-[22px] sm:text-3xl md:text-[34px] leading-[1.25] tracking-[-0.01em] text-balance text-white/95">
                {cur.quote}
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full bg-gradient-to-br ring-2 flex items-center justify-center text-[14px] font-medium text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]",
                      ACCENT_BG[cur.accent],
                      ACCENT_RING[cur.accent],
                    )}
                  >
                    {cur.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] text-white font-medium">
                        {cur.name}
                      </span>
                      {cur.verified && (
                        <ShieldCheck
                          aria-label="Verified creator"
                          className="w-3.5 h-3.5 text-cyan-300"
                        />
                      )}
                    </div>
                    <div className="text-[12px] text-white/55">
                      {cur.role}
                      {cur.company ? ` · ${cur.company}` : ""}
                    </div>
                  </div>
                </div>

                {cur.metric && (
                  <div className="text-right">
                    <div className="font-display text-3xl md:text-4xl text-gradient-cyber leading-none">
                      {cur.metric.value}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                      {cur.metric.label}
                    </div>
                  </div>
                )}
              </div>

              {cur.toolsUsed && cur.toolsUsed.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2 pt-5 border-t border-white/[0.05]">
                  <span className="text-[10px] uppercase tracking-wider text-white/40">
                    Tools used
                  </span>
                  {cur.toolsUsed.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-white/75 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setAuto(false);
                    setIdx(i);
                  }}
                  aria-label={`Show review ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === idx
                      ? "w-8 bg-gradient-to-r from-cyan-300 to-violet-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      : "w-1.5 bg-white/15 hover:bg-white/30",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                data-cursor-text="Prev"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next review"
                data-cursor-text="Next"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================== Marquees ============================== */

function ReviewMarquee({
  reviews,
  direction = "left",
  speed = 60,
}: {
  reviews: Review[];
  direction?: "left" | "right";
  speed?: number;
}) {
  if (reviews.length === 0) return null;
  const doubled = [...reviews, ...reviews];

  return (
    <div className="group relative overflow-hidden py-2">
      <div
        className="flex gap-3 md:gap-4 marquee-track"
        style={{
          // Doubled track translates by -50% to seamlessly loop
          animationDuration: `${speed}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-x {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          width: max-content;
          animation-name: marquee-x;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

const ReviewCard = memo(function ReviewCard({ review }: { review: Review }) {
  return (
    <GlowCard
      glow={review.accent}
      className="w-[260px] sm:w-[300px] md:w-[340px] shrink-0 lift contain-paint"
      intensity="subtle"
    >
      <div className="p-4 sm:p-5 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "w-9 h-9 rounded-full bg-gradient-to-br ring-1 flex items-center justify-center text-[11px] font-medium text-white",
                ACCENT_BG[review.accent],
                ACCENT_RING[review.accent],
              )}
            >
              {review.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[12.5px] text-white font-medium truncate">
                  {review.name}
                </span>
                {review.verified && (
                  <ShieldCheck
                    className="w-3 h-3 text-cyan-300 shrink-0"
                    aria-label="Verified creator"
                  />
                )}
              </div>
              <div className="text-[10.5px] text-white/45 truncate">
                {review.role}
                {review.company ? ` · ${review.company}` : ""}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i <= review.rating
                    ? "fill-amber-300 text-amber-300"
                    : "text-white/15",
                )}
              />
            ))}
          </div>
        </div>

        <p className="text-[13px] leading-relaxed text-white/75 line-clamp-4">
          “{review.quote}”
        </p>

        <div className="mt-auto pt-2 flex items-center justify-between text-[10.5px] text-white/40 font-mono">
          <span>{review.date}</span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" />
            {review.helpful ?? 0}
          </span>
        </div>
      </div>
    </GlowCard>
  );
});
