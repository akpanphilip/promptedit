"use client";
import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CreditCard,
  Boxes,
  Workflow,
  Users,
  ShieldCheck,
  MessageCircle,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridBackground, AmbientGlow } from "@/components/shared/GridBackground";
import { GradientButton } from "@/components/shared/GradientButton";
import { cn } from "@/lib/utils";

/* ============================================================
   FAQ data. Video-creator focused.
   ============================================================ */

type FaqCategory = "pricing" | "models" | "workflow" | "team" | "licensing";

type Faq = {
  id: string;
  cat: FaqCategory;
  q: string;
  a: React.ReactNode;
};

const CATEGORY_META: Record<
  FaqCategory | "all",
  { label: string; icon: typeof Plus }
> = {
  all: { label: "All", icon: HelpCircle },
  pricing: { label: "Pricing", icon: CreditCard },
  models: { label: "Models", icon: Boxes },
  workflow: { label: "Workflow", icon: Workflow },
  team: { label: "Team", icon: Users },
  licensing: { label: "Licensing", icon: ShieldCheck },
};

const FAQS: Faq[] = [
  {
    id: "credits-expire",
    cat: "pricing",
    q: "Do credits ever expire?",
    a: (
      <>
        No. Credits roll over indefinitely while your workspace is active. Take
        a month off between projects; when you come back, your balance is
        exactly where you left it.
      </>
    ),
  },
  {
    id: "vs-subscriptions",
    cat: "pricing",
    q: "How does this compare to paying for Runway, Pika, ElevenLabs, and Suno separately?",
    a: (
      <>
        On average, our creators spend{" "}
        <span className="text-white font-medium">~89% less</span> than the
        equivalent subscription stack, because most subscriptions charge you
        for tools you only touch a few times a month. With PromptEdit you only
        pay for actual renders.
      </>
    ),
  },
  {
    id: "free-tier",
    cat: "pricing",
    q: "Is there a free tier?",
    a: (
      <>
        Yes. Every new workspace gets{" "}
        <span className="text-white font-medium">500 free credits</span>. That's
        enough for ~28 Veo 3 clips,{" "}
        ~125 Nano Banana thumbnails, or about 165 minutes of ElevenLabs voiceover.
        No card required.
      </>
    ),
  },
  {
    id: "auto-topup",
    cat: "pricing",
    q: "Can I top up automatically?",
    a: (
      <>
        Yes. Set a balance threshold and a refill amount; we top you up only
        when you actually need it. You can cap monthly auto-spend so a
        runaway render never produces a surprise charge.
      </>
    ),
  },
  {
    id: "which-models",
    cat: "models",
    q: "Which models are included today?",
    a: (
      <>
        Veo 3, Kling 2.1, Runway Gen-3, Pika 2.0, Luma Dream Machine, Nano
        Banana (Gemini 2.5 Flash Image), FLUX.1 Pro, Ideogram 3, Recraft V3,
        ElevenLabs v3, Suno v4, Sync.so, HeyGen, and Topaz Video AI, with
        more added every release cycle.
      </>
    ),
  },
  {
    id: "new-models",
    cat: "models",
    q: "How fast do new models land here after a public release?",
    a: (
      <>
        Within{" "}
        <span className="text-white font-medium">7–10 days</span> of public
        release for major drops, often the same week for incremental
        revisions. We integrate as soon as the model has a stable production
        API.
      </>
    ),
  },
  {
    id: "byok",
    cat: "models",
    q: "Can I bring my own API keys?",
    a: (
      <>
        Studio plans can BYOK for any model that supports it. We'll meter
        usage and skip the credit billing on those calls. You keep direct
        rate-limit privileges with the model provider.
      </>
    ),
  },
  {
    id: "chain-tools",
    cat: "workflow",
    q: "Can I chain models together, say, a Nano Banana thumbnail into a Veo clip?",
    a: (
      <>
        Yes. The <span className="text-cyan-300">Flows</span> editor lets you
        pipe any model's output as the input of the next: image-to-video,
        video-to-voiceover, voice-to-lip-sync. Save the whole graph as a
        reusable shot recipe.
      </>
    ),
  },
  {
    id: "import-prompts",
    cat: "workflow",
    q: "Can I import my existing prompts from Runway or Midjourney?",
    a: (
      <>
        Yes. Paste them in or upload a JSON export. We auto-translate the
        prompt formatting where the target model uses a different convention,
        and surface a side-by-side preview before you save.
      </>
    ),
  },
  {
    id: "api",
    cat: "workflow",
    q: "Is there an API?",
    a: (
      <>
        Yes. A REST endpoint per model plus a streaming SDK in TypeScript +
        Python. Every render in the studio is round-trippable to a call you
        can paste into your codebase.
      </>
    ),
  },
  {
    id: "team-credits",
    cat: "team",
    q: "How do team credit pools work?",
    a: (
      <>
        A single shared pool with optional per-seat and per-project caps.
        Editors can see live spend, branch credits between cuts, and roll
        unused budget into the next pool. SSO available on Studio plans.
      </>
    ),
  },
  {
    id: "ownership",
    cat: "licensing",
    q: "Who owns what I render?",
    a: (
      <>
        You do. PromptEdit never claims rights to your outputs. Commercial
        licensing follows each underlying model's terms. We surface the
        exact license clause beside every render so you always know what's
        safe for client work.
      </>
    ),
  },
];

const ORDER: (FaqCategory | "all")[] = [
  "all",
  "pricing",
  "models",
  "workflow",
  "team",
  "licensing",
];

/* ============================== Section =============================== */

export function FAQ() {
  const [category, setCategory] = useState<FaqCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      category === "all" ? FAQS : FAQS.filter((f) => f.cat === category),
    [category],
  );

  // When category changes, collapse open item
  const handleCategory = (id: FaqCategory | "all") => {
    setCategory(id);
    setOpen(null);
  };

  return (
    <section id="faq" className="relative py-20 md:py-36 overflow-hidden cv-auto-lg">
      <GridBackground variant="dots" fade="radial" />
      <AmbientGlow color="cyan" className="left-[5%] top-[12%] w-[460px] h-[460px]" />
      <AmbientGlow color="violet" className="right-[5%] bottom-[15%] w-[460px] h-[460px]" />

      {/* Decorative ? marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 select-none overflow-hidden opacity-[0.04]"
      >
        <span className="absolute top-[18%] left-[6%] font-display text-[22vw] leading-none text-white">
          ?
        </span>
        <span className="absolute bottom-[8%] right-[4%] font-display text-[18vw] leading-none text-white">
          ?
        </span>
      </div>

      <div className="container relative">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Frequently <span className="text-gradient-cyber">asked</span>.
            </>
          }
          description="Everything video creators usually want to know before they spin up a workspace. Don't see your question? Ping us, we'll add it."
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1 max-w-full overflow-x-auto no-scrollbar">
            {ORDER.map((c) => {
              const meta = CATEGORY_META[c];
              const Icon = meta.icon;
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => handleCategory(c)}
                  aria-pressed={active}
                  data-cursor-text="Filter"
                  className={cn(
                    "relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap",
                    active ? "text-white" : "text-white/55 hover:text-white/85",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="faq-cat"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/15 to-violet-400/20 border border-white/15 shadow-[0_0_18px_-4px_rgba(34,211,238,0.45)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <Icon className="relative w-3.5 h-3.5" />
                  <span className="relative">{meta.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Accordion */}
        <motion.ul
          layout
          className="mt-10 max-w-3xl mx-auto flex flex-col gap-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((f, i) => (
              <FaqItem
                key={f.id}
                faq={f}
                index={i}
                open={open === f.id}
                onToggle={() => setOpen((cur) => (cur === f.id ? null : f.id))}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(34,211,238,0.32), transparent)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(168,85,247,0.32), transparent)",
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/85">
                Still curious?
              </div>
              <div className="mt-2 font-display text-2xl md:text-3xl text-white leading-tight">
                Talk to a video creator on the team.
              </div>
              <p className="mt-2 text-[13.5px] text-white/55 max-w-md">
                Real humans who actually ship cuts on PromptEdit. They'll
                walk you through the stack with your own footage.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <GradientButton iconRight={false}>
                <MessageCircle className="w-4 h-4 mr-1" />
                Book a call
              </GradientButton>
              <GradientButton variant="outline">
                <BookOpen className="w-4 h-4 mr-1" />
                Read docs
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== FAQ Item ============================== */

const FaqItem = memo(function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const num = (index + 1).toString().padStart(2, "0");

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      className="relative"
    >
      {/* Animated glow border on active row */}
      {open && (
        <motion.span
          aria-hidden
          layoutId="faq-glow"
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background:
              "conic-gradient(from var(--a, 0deg), rgba(34,211,238,0.55), rgba(168,85,247,0.55), rgba(59,130,246,0.45), rgba(34,211,238,0.55))",
            filter: "blur(2px)",
            opacity: 0.7,
            animation: "spin-slow 14s linear infinite",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      )}

      <div
        className={cn(
          "relative rounded-2xl border transition-colors duration-300 overflow-hidden contain-paint",
          open
            ? "faq-open border-white/15 bg-gradient-to-br from-ink-900/85 to-ink-950/70"
            : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]",
        )}
      >
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${faq.id}`}
          data-cursor-text={open ? "Close" : "Open"}
          className="group relative w-full flex items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 rounded-2xl"
        >
          <span
            className={cn(
              "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg font-mono text-[12px] transition-all duration-300",
              open
                ? "bg-gradient-to-br from-cyan-400 to-violet-500 text-ink-950 shadow-[0_0_16px_-4px_rgba(34,211,238,0.6)]"
                : "bg-white/[0.04] text-white/55 border border-white/[0.06] group-hover:text-white/85",
            )}
          >
            {num}
          </span>
          <span
            className={cn(
              "flex-1 font-display text-[16px] sm:text-[18px] tracking-tight leading-snug transition-colors",
              open ? "text-white" : "text-white/85 group-hover:text-white",
            )}
          >
            {faq.q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className={cn(
              "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300",
              open
                ? "border-cyan-400/60 text-cyan-300 bg-cyan-400/10"
                : "border-white/15 text-white/55 group-hover:text-white group-hover:border-white/35",
            )}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.4} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`faq-panel-${faq.id}`}
              role="region"
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.35, delay: 0.08 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.18 },
                },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pl-[68px] sm:pl-[72px] text-[14px] sm:text-[14.5px] leading-relaxed text-white/65">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
});
