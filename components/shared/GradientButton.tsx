"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "outline";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  iconRight?: React.ReactNode | false;
  size?: "md" | "lg";
};

export function GradientButton({
  className,
  children,
  variant = "primary",
  iconRight,
  size = "md",
  ...rest
}: Props) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 font-medium rounded-full",
        "transition-all duration-300 will-change-transform overflow-hidden",
        size === "lg" ? "h-12 px-7 text-[15px]" : "h-11 px-5 text-sm",
        isPrimary &&
          "text-ink-950 shadow-[0_8px_30px_-6px_rgba(34,211,238,0.45)]",
        variant === "ghost" &&
          "text-white/85 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/10",
        isOutline &&
          "text-white/90 border border-white/15 hover:border-white/30 bg-white/[0.02]",
        className,
      )}
      {...(rest as any)}
    >
      {isPrimary && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-white to-violet-300" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-200 via-white to-violet-200" />
          <span className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white to-white/85" />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {iconRight !== false && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {iconRight ?? <ArrowRight className="w-4 h-4" />}
          </span>
        )}
      </span>
    </motion.button>
  );
}
