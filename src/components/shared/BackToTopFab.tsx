"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Floating action button that scrolls back to the top once the first screen is passed. */
export function BackToTopFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`state-layer fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-14 cursor-pointer items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-level-3 transition-[scale,opacity,box-shadow] duration-300 ease-emphasized hover:shadow-level-4 sm:right-6 sm:bottom-6 ${
        visible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-50 opacity-0"
      }`}
    >
      <ArrowUp size={24} />
    </button>
  );
}
