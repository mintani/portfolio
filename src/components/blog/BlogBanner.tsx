import type { ReactNode } from "react";
import { ExpressiveShape } from "@/components/shared/ExpressiveShape";

/** Primary-container panel that opens each blog page, matching the home hero. */
export function BlogBanner({ children }: { children: ReactNode }) {
  return (
    <div className="px-2 pt-2 sm:px-3 sm:pt-3">
      <header className="relative overflow-hidden rounded-[28px] bg-primary-container sm:rounded-[48px]">
        <ExpressiveShape
          kind="cookie"
          className="shape-spin pointer-events-none absolute -top-24 -right-24 size-72 text-primary-fixed-dim md:-top-32 md:-right-16 md:size-[420px]"
        />
        <ExpressiveShape
          kind="clover"
          className="shape-spin pointer-events-none absolute -bottom-20 -left-16 hidden size-48 text-tertiary-container [--spin:90s] [animation-direction:reverse] md:block"
        />
        <div className="container relative mx-auto max-w-4xl px-5 pt-12 pb-12 md:px-6 md:pt-16 md:pb-16">
          {children}
        </div>
      </header>
    </div>
  );
}
