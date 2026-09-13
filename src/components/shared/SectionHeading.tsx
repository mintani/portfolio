import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Handwritten kicker set in the hero's script face. Use sparingly. */
  kicker?: string;
  title: string;
  /** One short line under the title. */
  lede?: string;
  className?: string;
};

/**
 * Section head shared by the home page. Roman display type with an
 * optional script kicker, echoing the hero's "stylish" lettering.
 */
export function SectionHeading({
  kicker,
  title,
  lede,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {kicker ? (
        <span className="font-script text-lg sm:text-xl text-accent leading-none">
          {kicker}
        </span>
      ) : null}
      <h2 className="font-display font-bold text-ink leading-[1.05] tracking-[-0.03em] text-[clamp(2.75rem,5vw+1rem,5.25rem)] [overflow-wrap:anywhere] min-w-0">
        {title}
      </h2>
      {lede ? (
        <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-[48ch]">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
