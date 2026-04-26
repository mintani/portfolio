import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView: boolean;
};

export function Panel({
  children,
  className = "",
  delay = 0,
  inView,
}: PanelProps) {
  return (
    <div
      className={`rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 shadow-sm overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1 h-3.5 rounded-full bg-cyan-400/70" />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400">
        {children}
      </span>
    </div>
  );
}
