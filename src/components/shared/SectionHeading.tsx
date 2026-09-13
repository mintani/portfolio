import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /** One short line under the title. */
  lede?: string;
  className?: string;
};

/** Section head shared by the home page: roman display title plus an optional lede. */
export function SectionHeading({
  title,
  lede,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
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
