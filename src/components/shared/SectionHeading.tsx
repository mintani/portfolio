import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-cyan-500/70">
        {eyebrow}
      </span>
      <h2 className="text-5xl sm:text-6xl font-bold font-poppins italic text-neutral-800 leading-none">
        {title}
      </h2>
    </div>
  );
}
