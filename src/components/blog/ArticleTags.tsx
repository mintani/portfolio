import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ArticleTagsProps = {
  tags: readonly string[];
  className?: string;
  badgeClassName?: string;
};

export function ArticleTags({
  tags,
  className,
  badgeClassName,
}: ArticleTagsProps) {
  if (tags.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className={cn(
            "rounded-full border border-[#35429a]/14 px-3 py-1 text-xs font-medium text-[#4a5cc0]",
            badgeClassName
          )}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
