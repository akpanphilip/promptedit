"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  glow?: "cyan" | "violet" | "blue" | "pink" | "mix";
  intensity?: "subtle" | "medium" | "strong";
  as?: "div" | "article" | "section";
};

const glowMap: Record<NonNullable<Props["glow"]>, string> = {
  cyan: "rgba(34,211,238,0.55)",
  violet: "rgba(168,85,247,0.55)",
  blue: "rgba(59,130,246,0.5)",
  pink: "rgba(236,72,153,0.5)",
  mix: "rgba(34,211,238,0.45)",
};

/** Card with a glowing border that follows the cursor. */
export function GlowCard({
  className,
  children,
  glow = "cyan",
  intensity = "medium",
  ...rest
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const size =
    intensity === "subtle" ? 220 : intensity === "strong" ? 420 : 320;
  const color = glowMap[glow];

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative rounded-2xl border border-white/[0.06] bg-white/[0.02]",
        "transition-colors duration-300 hover:border-white/[0.12]",
        "overflow-hidden",
        className,
      )}
      {...rest}
    >
      {/* hover spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 55%)`,
          mixBlendMode: "screen",
        }}
      />
      {/* inner gradient ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0) 30%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
