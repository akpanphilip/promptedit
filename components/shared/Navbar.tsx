"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutGrid,
  Zap,
  Code2,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "./GradientButton";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { label: "Marketplace", href: "#marketplace", icon: LayoutGrid },
  { label: "Credits", href: "#credits", icon: Zap },
  { label: "Playground", href: "#playground", icon: Code2 },
  { label: "Reviews", href: "#reviews", icon: MessageSquare },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "w-full max-w-5xl flex items-center justify-between rounded-2xl border transition-all duration-500",
          scrolled
            ? "border-white/[0.08] bg-ink-950/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] py-2.5 px-3"
            : "border-white/[0.05] bg-white/[0.02] backdrop-blur-md py-3 px-4",
        )}
      >
        <a
          href="#"
          className="flex items-center gap-2 pl-2 pr-3 group"
          aria-label="PromptEdit home"
        >
          <span className="relative w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_18px_-4px_rgba(34,211,238,0.6)]">
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display font-semibold tracking-tight text-[15px]">
            PromptEdit
          </span>
        </a>

        {/* Desktop dock-style nav */}
        <div
          className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-1.5 py-1.5 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              className="relative px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white transition-colors rounded-full"
            >
              {hovered === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 pr-1">
          <ThemeToggle />
          <a
            href="#"
            className="text-[13px] text-white/70 hover:text-white px-3 py-1.5 transition-colors"
          >
            Sign in
          </a>
          <GradientButton size="md" iconRight={false} className="!h-9 !px-4 !text-[13px]">
            Get credits
          </GradientButton>
        </div>

        <div className="md:hidden flex items-center gap-1.5">
          <ThemeToggle size="sm" />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 rounded-md text-white/80 hover:text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 rounded-2xl glass p-4 flex flex-col gap-1"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <item.icon className="w-4 h-4 text-white/50" />
                {item.label}
              </a>
            ))}
            <div className="border-t border-white/10 mt-2 pt-3">
              <GradientButton className="w-full" iconRight={false}>
                Get credits
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
