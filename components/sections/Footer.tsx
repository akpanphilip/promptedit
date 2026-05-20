import { Sparkles, Twitter, Github, Linkedin, Youtube } from "lucide-react";

const NAV = [
  {
    title: "Product",
    items: ["Marketplace", "Credits", "Playground", "Workflows", "Library"],
  },
  {
    title: "Creators",
    items: ["Templates", "Showcase", "Affiliates", "Pricing"],
  },
  {
    title: "Company",
    items: ["About", "Changelog", "Manifesto", "Press"],
  },
  {
    title: "Resources",
    items: ["Docs", "Status", "Support", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-ink-950 overflow-hidden cv-auto">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(168,85,247,0.4), transparent)",
        }}
      />
      <div className="container relative pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-2" aria-label="PromptEdit home">
              <span className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_20px_-4px_rgba(34,211,238,0.7)]">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display font-semibold tracking-tight text-base">
                PromptEdit
              </span>
            </a>
            <p className="mt-4 text-[13px] text-white/45 max-w-xs leading-relaxed">
              The operating system for AI creators. Every model, one studio,
              credits instead of contracts.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-8 h-8 rounded-md border border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] flex items-center justify-center text-white/55 hover:text-white transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {NAV.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-white/65 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand wordmark */}
        <div
          aria-hidden
          className="relative mt-14 select-none pointer-events-none overflow-hidden"
        >
          <div
            className="font-display text-[18vw] md:text-[15vw] leading-none tracking-[-0.04em] text-center text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              background:
                "linear-gradient(180deg, rgba(34,211,238,0.16), rgba(168,85,247,0.04) 60%, transparent)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            PromptEdit
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <div className="text-[12px] text-white/40 font-mono">
            © {new Date().getFullYear()} PromptEdit, Inc. · Built for creators who ship.
          </div>
          <div className="flex items-center gap-4 text-[12px] text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookies</a>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
