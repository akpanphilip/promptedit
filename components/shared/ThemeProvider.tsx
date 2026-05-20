"use client";
import * as React from "react";

export type Theme = "dark" | "light";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeCtx = React.createContext<Ctx | null>(null);

const STORAGE_KEY = "promptedit:theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark");

  // hydrate from html class set by no-flash script
  React.useEffect(() => {
    const root = document.documentElement;
    const initial: Theme = root.classList.contains("light") ? "light" : "dark";
    setThemeState(initial);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", t === "light");
    root.classList.toggle("dark", t === "dark");
    root.style.colorScheme = t;
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    setThemeState(t);
  }, []);

  const toggle = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) {
    // safe fallback for SSR or detached usage
    return {
      theme: "dark" as Theme,
      setTheme: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}

/** Inline script executed before paint to prevent FOUC. */
export const NO_FLASH_SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem("${STORAGE_KEY}");
    const sys = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const t = stored === "light" || stored === "dark" ? stored : "dark";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
    root.style.colorScheme = t;
  } catch (e) {}
})();`;
