"use client";

import { useEffect, useState } from "react";
import { LEARNING } from "@/data/about";

export function LearningPanel({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState<number[]>(LEARNING.map(() => 0));

  useEffect(() => {
    setMounted(true);
    const duration = 900;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(LEARNING.map((item) => Math.round(item.pct * eased)));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = compact ? LEARNING.slice(0, 3) : LEARNING;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={item.name} className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
              <span className="font-mono text-xs font-bold text-neutral-700">
                {item.name}
              </span>
              {!compact ? (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/60 border border-white/70 text-neutral-400">
                  {item.phase}
                </span>
              ) : null}
            </div>
            <span className="font-mono text-xs font-bold text-neutral-500 tabular-nums">
              {counts[i]}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden bg-neutral-200/50">
            <div
              className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
              style={{
                width: mounted ? `${item.pct}%` : "0%",
                boxShadow: mounted ? `0 0 6px 1px ${item.glowColor}` : "none",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
