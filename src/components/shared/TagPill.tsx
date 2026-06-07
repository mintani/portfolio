import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  neutral: "bg-neutral-100 border-neutral-200/60 text-neutral-500",
  amber: "bg-amber-50 border-amber-200/60 text-amber-600",
} as const;

type TagPillProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
};

export function TagPill({
  children,
  variant = "neutral",
  className,
}: TagPillProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] px-2 py-0.5 rounded-full border",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
