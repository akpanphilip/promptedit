"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { formatNumber } from "@/lib/utils";

type Props = {
  to: number;
  duration?: number;
  format?: "plain" | "compact" | "decimal";
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function AnimatedCounter({
  to,
  duration = 1.6,
  format = "compact",
  suffix = "",
  prefix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return controls.stop;
  }, [inView, to, duration]);

  const display =
    format === "compact"
      ? formatNumber(Math.round(value))
      : format === "decimal"
        ? value.toFixed(2)
        : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
