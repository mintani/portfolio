"use client";

import { useEffect } from "react";

/**
 * Material ripple for every `.state-layer` element. One delegated pointerdown listener
 * draws a wave from the press point, so server components need no client code to get it.
 */
export function RippleEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !(e.target instanceof Element)) return;
      const host = e.target.closest<HTMLElement>(".state-layer");
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Reach the farthest corner so the wave always covers the whole host.
      const radius = Math.hypot(
        Math.max(x, rect.width - x),
        Math.max(y, rect.height - y)
      );

      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.left = `${x - radius}px`;
      wave.style.top = `${y - radius}px`;
      wave.style.width = wave.style.height = `${radius * 2}px`;
      wave.addEventListener("animationend", () => wave.remove(), {
        once: true,
      });
      host.append(wave);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
