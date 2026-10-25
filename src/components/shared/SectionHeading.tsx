import type { LucideIcon } from "lucide-react";
import { ExpressiveShape } from "@/components/shared/ExpressiveShape";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /** Shown inside a cookie shape before the title. */
  icon: LucideIcon;
  /** One short line under the title. */
  lede?: string;
  className?: string;
};

/** Section head shared by the home page: shape-framed icon, display title and an optional lede. */
export function SectionHeading({
  title,
  icon: Icon,
  lede,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span className="relative grid size-14 place-items-center text-primary-container sm:size-16">
        <ExpressiveShape kind="cookie" className="absolute inset-0 size-full" />
        <Icon className="relative size-6 text-on-primary-container sm:size-7" />
      </span>
      <h2 className="min-w-0 text-[clamp(2.75rem,4vw+1.5rem,4.5rem)] leading-[1.05] font-medium tracking-[-0.02em] text-on-surface [overflow-wrap:anywhere]">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-[48ch] text-base leading-relaxed text-on-surface-variant sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
