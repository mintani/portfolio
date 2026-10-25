import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Static Material chip for tags and labels. */
export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1 rounded-lg border border-outline-variant px-2.5 py-0.5 text-xs font-medium text-on-surface-variant",
        className
      )}
    >
      {children}
    </span>
  );
}
