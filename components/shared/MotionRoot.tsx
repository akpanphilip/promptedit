"use client";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the app with a single MotionConfig so every framer-motion
 * component automatically honors the user's `prefers-reduced-motion`
 * setting without each one having to opt in.
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
