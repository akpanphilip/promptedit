"use client";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "lines" | "dots" | "small";
  fade?: "radial" | "bottom" | "none";
};

export function GridBackground({
  className,
  variant = "lines",
  fade = "radial",
}: Props) {
  const grid =
    variant === "dots"
      ? "bg-dot"
      : variant === "small"
        ? "bg-grid-sm"
        : "bg-grid";
  const mask =
    fade === "radial"
      ? "mask-radial"
      : fade === "bottom"
        ? "mask-fade-b"
        : "";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        grid,
        mask,
        className,
      )}
    />
  );
}

export function AmbientGlow({
  className,
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "violet" | "blue" | "mix";
}) {
  const palette =
    color === "violet"
      ? "from-violet-500/30 via-fuchsia-500/10"
      : color === "blue"
        ? "from-blue-500/30 via-cyan-500/10"
        : color === "mix"
          ? "from-cyan-400/25 via-violet-500/20"
          : "from-cyan-400/30 via-blue-500/10";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 blur-3xl rounded-full",
        "bg-gradient-radial",
        className,
      )}
      style={{
        background: `radial-gradient(closest-side, ${
          color === "violet"
            ? "rgba(168,85,247,0.35)"
            : color === "blue"
              ? "rgba(59,130,246,0.30)"
              : color === "mix"
                ? "rgba(34,211,238,0.28)"
                : "rgba(34,211,238,0.35)"
        }, transparent 70%)`,
      }}
    />
  );
}
