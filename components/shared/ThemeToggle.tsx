"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md";
};

export function ThemeToggle({ className, size = "md" }: Props) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative rounded-full border border-soft hover-bg-surface text-muted hover:text-fg",
        "transition-all duration-300 inline-flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
        size === "sm" ? "w-8 h-8" : "w-9 h-9",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 inline-flex items-center justify-center"
          >
            <Moon className="w-3.5 h-3.5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 inline-flex items-center justify-center"
          >
            <Sun className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full blur-md opacity-0 transition-opacity",
          "group-hover:opacity-100",
          isDark
            ? "bg-violet-400/30"
            : "bg-amber-300/30",
        )}
      />
    </button>
  );
}
