import type { LucideIcon } from "lucide-react";
import {
  Film,
  Image as ImageIcon,
  Wand2,
  Mic2,
  Music2,
  Sparkles,
  Layers,
  Zap,
  ScanFace,
  Scissors,
  Camera,
  ImagePlay,
} from "lucide-react";

/* =============================================================
   PromptEdit catalog. Built around the workflow of video content
   creators (YouTube, TikTok, short-form, ads, music vids, indie
   film). Tools are the actual current top-tier models in each
   modality so creators recognise the lineup at a glance.
   ============================================================= */

export type Tool = {
  id: string;
  name: string;
  category: string;
  model: string;
  description: string;
  icon: LucideIcon;
  accent: "cyan" | "violet" | "blue" | "pink";
  uses: number;
  rating: number;
  credits: number;
  trending?: boolean;
};

export const TOOLS: Tool[] = [
  // ──────────────────────────── Video gen ───────────────────────────
  {
    id: "veo",
    name: "Veo 3",
    category: "Video",
    model: "Google Veo 3",
    description: "Cinematic text-to-video with native audio. 8s clips at 1080p.",
    icon: Film,
    accent: "violet",
    uses: 412_300,
    rating: 4.9,
    credits: 18,
    trending: true,
  },
  {
    id: "kling",
    name: "Kling 2.1",
    category: "Video",
    model: "Kuaishou Kling",
    description: "Best-in-class image-to-video with motion control and lip-sync.",
    icon: ImagePlay,
    accent: "cyan",
    uses: 287_900,
    rating: 4.8,
    credits: 14,
    trending: true,
  },
  {
    id: "runway",
    name: "Runway Gen-3",
    category: "Video",
    model: "Runway Gen-3 Alpha",
    description: "Director-grade T2V with camera moves and reference video.",
    icon: Camera,
    accent: "pink",
    uses: 642_100,
    rating: 4.8,
    credits: 16,
  },
  {
    id: "pika",
    name: "Pika 2.0",
    category: "Video",
    model: "Pika Labs 2.0",
    description: "Effects, transitions, and viral motion presets for short-form.",
    icon: Sparkles,
    accent: "violet",
    uses: 198_500,
    rating: 4.7,
    credits: 10,
  },
  {
    id: "luma",
    name: "Luma Dream",
    category: "Video",
    model: "Luma Dream Machine",
    description: "Smooth I2V with realistic physics. 5-10s clips at 24fps.",
    icon: Film,
    accent: "blue",
    uses: 145_200,
    rating: 4.7,
    credits: 12,
  },

  // ───────────────────────── Image gen / edit ────────────────────────
  {
    id: "nano-banana",
    name: "Nano Banana",
    category: "Image",
    model: "Gemini 2.5 Flash Image",
    description:
      "Character-consistent image edits at conversational speed. Best for thumbnails + B-roll.",
    icon: ImageIcon,
    accent: "pink",
    uses: 891_200,
    rating: 4.9,
    credits: 4,
    trending: true,
  },
  {
    id: "flux",
    name: "FLUX.1 Pro",
    category: "Image",
    model: "Black Forest FLUX.1",
    description: "Photoreal image generation with accurate hands and faces.",
    icon: ImageIcon,
    accent: "violet",
    uses: 312_800,
    rating: 4.9,
    credits: 5,
  },
  {
    id: "ideogram",
    name: "Ideogram 3",
    category: "Image",
    model: "Ideogram 3.0",
    description: "Image generation with legible typography. Perfect for thumbnails.",
    icon: Wand2,
    accent: "cyan",
    uses: 167_400,
    rating: 4.8,
    credits: 4,
  },
  {
    id: "recraft",
    name: "Recraft V3",
    category: "Image",
    model: "Recraft V3",
    description: "Brand-locked design imagery: logos, vectors, on-style assets.",
    icon: Layers,
    accent: "blue",
    uses: 92_100,
    rating: 4.7,
    credits: 5,
  },

  // ───────────────────────────── Voice ───────────────────────────────
  {
    id: "eleven",
    name: "ElevenLabs v3",
    category: "Voice",
    model: "ElevenLabs v3",
    description: "Studio-grade voice clones + dubbing in 32 languages.",
    icon: Mic2,
    accent: "cyan",
    uses: 1_200_000,
    rating: 4.9,
    credits: 3,
  },
  {
    id: "sync",
    name: "Sync.so",
    category: "Voice",
    model: "Sync Labs 1.7",
    description: "Pixel-accurate lip sync + multi-language dubbing for any video.",
    icon: Scissors,
    accent: "violet",
    uses: 73_400,
    rating: 4.7,
    credits: 6,
  },

  // ───────────────────────────── Music ───────────────────────────────
  {
    id: "suno",
    name: "Suno v4",
    category: "Music",
    model: "Suno v4",
    description: "Full tracks with stems, lyrics, and license-clean output.",
    icon: Music2,
    accent: "pink",
    uses: 421_500,
    rating: 4.8,
    credits: 8,
    trending: true,
  },

  // ──────────────────────────── Avatars ──────────────────────────────
  {
    id: "heygen",
    name: "HeyGen",
    category: "Avatars",
    model: "HeyGen Avatar IV",
    description: "AI avatars + automated translation for talking-head video.",
    icon: ScanFace,
    accent: "blue",
    uses: 128_700,
    rating: 4.7,
    credits: 10,
  },

  // ──────────────────────────── Upscale ──────────────────────────────
  {
    id: "topaz",
    name: "Topaz Video AI",
    category: "Upscale",
    model: "Topaz Video AI 6",
    description: "4K upscaling, frame interpolation, and stabilization in one pass.",
    icon: Zap,
    accent: "cyan",
    uses: 64_300,
    rating: 4.8,
    credits: 4,
  },
];

export const TOOL_CATEGORIES = [
  "All",
  "Video",
  "Image",
  "Voice",
  "Music",
  "Avatars",
  "Upscale",
];

/* ============================ Reviews ============================ */

export type Review = {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  quote: string;
  accent: "cyan" | "violet" | "blue" | "pink";
  rating: number;
  date: string;
  verified?: boolean;
  helpful?: number;
  toolsUsed?: string[];
  featured?: boolean;
  metric?: { label: string; value: string };
};

export const TESTIMONIALS: Review[] = [
  {
    id: "r-mira",
    name: "Mira Okonkwo",
    role: "YouTube Creator",
    company: "1.4M subs",
    avatar: "MO",
    quote:
      "I cut my B-roll bill in half. Nano Banana for thumbnails, Veo for inserts, ElevenLabs for the cold-open VO. All on one credit pool, all in one tab.",
    accent: "cyan",
    rating: 5,
    date: "2 days ago",
    verified: true,
    helpful: 412,
    toolsUsed: ["Veo 3", "Nano Banana", "ElevenLabs v3"],
    featured: true,
    metric: { label: "B-roll spend", value: "−54%" },
  },
  {
    id: "r-daichi",
    name: "Daichi Sato",
    role: "Director of Photography",
    company: "Halcyon Studio",
    avatar: "DS",
    quote:
      "We previz an entire commercial in an afternoon. Kling for I2V, Runway for the polished cuts, Suno for the rough score. The client signs off before we touch a real camera.",
    accent: "violet",
    rating: 5,
    date: "1 week ago",
    verified: true,
    helpful: 528,
    toolsUsed: ["Kling 2.1", "Runway Gen-3", "Suno v4"],
    featured: true,
    metric: { label: "previz time", value: "1 day" },
  },
  {
    id: "r-ana",
    name: "Ana Beltrán",
    role: "TikTok Creator",
    company: "880K followers",
    avatar: "AB",
    quote:
      "Pika for the effect-heavy hooks, Veo for the talking-head fakes, Sync for the multi-language dubs. My output tripled. My credit bill is $14 a week.",
    accent: "blue",
    rating: 5,
    date: "3 days ago",
    verified: true,
    helpful: 287,
    toolsUsed: ["Pika 2.0", "Veo 3", "Sync.so"],
    featured: true,
    metric: { label: "weekly cost", value: "$14" },
  },
  {
    id: "r-theo",
    name: "Theo Lambert",
    role: "Ad Creative",
    company: "Northwind",
    avatar: "TL",
    quote:
      "Pay-per-render means I test 40 variants of a 6-second cut. The winners pay for the experiments three times over.",
    accent: "pink",
    rating: 5,
    date: "5 days ago",
    verified: true,
    helpful: 196,
    toolsUsed: ["Runway Gen-3", "Veo 3"],
  },
  {
    id: "r-priya",
    name: "Priya Raman",
    role: "Music Video Director",
    avatar: "PR",
    quote:
      "Suno for the demo track, Kling to animate the storyboard frames, Topaz to upres the final render. PromptEdit is the entire pre-production team I never had budget for.",
    accent: "cyan",
    rating: 5,
    date: "1 week ago",
    verified: true,
    helpful: 142,
    toolsUsed: ["Suno v4", "Kling 2.1", "Topaz Video AI"],
  },
  {
    id: "r-noah",
    name: "Noah Whitley",
    role: "YouTube Creator",
    company: "Cars + Coffee",
    avatar: "NW",
    quote:
      "Thumbnails in Nano Banana, voiceovers in ElevenLabs, B-roll in Veo. My retention is up 18% and I spend less per video than I did on a single subscription before.",
    accent: "violet",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    helpful: 612,
    toolsUsed: ["Nano Banana", "ElevenLabs v3", "Veo 3"],
  },
  {
    id: "r-yui",
    name: "Yui Tanaka",
    role: "Content Lead",
    company: "Mercato",
    avatar: "YT",
    quote:
      "Our team ships 12 product videos a week. One editor, two creators, PromptEdit. The credit pool ended the procurement debate forever.",
    accent: "blue",
    rating: 5,
    date: "4 days ago",
    verified: true,
    helpful: 211,
    toolsUsed: ["Veo 3", "Nano Banana"],
  },
  {
    id: "r-elias",
    name: "Elias Marek",
    role: "Composer",
    avatar: "EM",
    quote:
      "Suno gets me 80% there in three prompts. I render twenty options at the cost of one Spotify subscription a month.",
    accent: "pink",
    rating: 4,
    date: "6 days ago",
    verified: true,
    helpful: 88,
    toolsUsed: ["Suno v4", "ElevenLabs v3"],
  },
  {
    id: "r-lina",
    name: "Lina Aboubakar",
    role: "Short-form Editor",
    company: "Aperture",
    avatar: "LA",
    quote:
      "Nano Banana handles every thumbnail variation. I A/B test five before posting and click-through is up across the board.",
    accent: "cyan",
    rating: 5,
    date: "3 days ago",
    verified: true,
    helpful: 174,
    toolsUsed: ["Nano Banana", "Ideogram 3"],
  },
  {
    id: "r-sam",
    name: "Samira Greene",
    role: "Head of Content",
    company: "Orbital",
    avatar: "SG",
    quote:
      "We retired three vendor contracts after a month on PromptEdit. The credit model is the single biggest budget unlock our team had this year.",
    accent: "violet",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    helpful: 263,
    toolsUsed: ["Runway Gen-3", "Veo 3", "HeyGen"],
  },
  {
    id: "r-jonah",
    name: "Jonah Reyes",
    role: "Indie Filmmaker",
    avatar: "JR",
    quote:
      "Storyboards in Nano Banana, animatics in Kling, dubs in Sync. My short film cost $400 to previz end-to-end. That used to be a week of agency time.",
    accent: "blue",
    rating: 5,
    date: "1 week ago",
    verified: true,
    helpful: 154,
    toolsUsed: ["Nano Banana", "Kling 2.1", "Sync.so"],
  },
  {
    id: "r-cora",
    name: "Cora Iversen",
    role: "Creative Director",
    company: "Vantablack",
    avatar: "CI",
    quote:
      "Onboarding a four-person crew to PromptEdit took a Slack message. Onboarding them to six separate AI tools last year took six weeks.",
    accent: "pink",
    rating: 5,
    date: "9 days ago",
    verified: true,
    helpful: 198,
    toolsUsed: ["Veo 3", "Suno v4"],
  },
  {
    id: "r-jett",
    name: "Jett Whitmore",
    role: "Reels Producer",
    avatar: "JW",
    quote:
      "I cut a faceless channel that pulls 2M views a week. The whole stack is PromptEdit: Veo, ElevenLabs, Suno. End-to-end on one tab.",
    accent: "cyan",
    rating: 5,
    date: "4 days ago",
    verified: true,
    helpful: 332,
    toolsUsed: ["Veo 3", "ElevenLabs v3", "Suno v4"],
  },
  {
    id: "r-haru",
    name: "Haru Lindqvist",
    role: "Documentary Editor",
    company: "Daylight Pictures",
    avatar: "HL",
    quote:
      "Topaz to clean the archival footage, Sync to localise interviews into four languages, HeyGen for the connective host segments. The cut moves twice as fast.",
    accent: "violet",
    rating: 5,
    date: "1 week ago",
    verified: true,
    helpful: 119,
    toolsUsed: ["Topaz Video AI", "Sync.so", "HeyGen"],
  },
];

/* ============================ Stats ============================ */

export const STATS = [
  { value: 84_000, label: "Video minutes rendered / day", suffix: "+" },
  { value: 14, label: "Top-tier video + image models", suffix: "" },
  { value: 89, label: "Avg. saved vs subscriptions", suffix: "%" },
  { value: 4.91, label: "Creator rating", suffix: "" },
];

/* ============================ Logos ============================ */

export const LOGOS = [
  "Reelhaus",
  "Cutroom",
  "Loomstack",
  "Cinéverse",
  "Daylight Pictures",
  "Halcyon Studio",
  "Aperture",
  "Northwind",
];

/* ============================ Subscriptions ============================ */
/* The real per-month costs we collapse into one credit pool. These
   appear in the Problem section's "old way" pile + the Credits section
   replacement strip. */

export type Subscription = {
  name: string;
  cost: number;
  accent: string;
};

export const SUBSCRIPTIONS: Subscription[] = [
  { name: "Runway Standard", cost: 35, accent: "from-pink-400/60 to-rose-400/40" },
  { name: "Pika Pro", cost: 35, accent: "from-fuchsia-400/60 to-violet-400/40" },
  { name: "Midjourney", cost: 30, accent: "from-violet-400/60 to-cyan-400/40" },
  { name: "ElevenLabs Creator", cost: 22, accent: "from-cyan-400/60 to-blue-400/40" },
  { name: "Suno Pro", cost: 24, accent: "from-pink-400/60 to-amber-400/40" },
  { name: "Topaz Video AI", cost: 25, accent: "from-sky-400/60 to-indigo-400/40" },
];
