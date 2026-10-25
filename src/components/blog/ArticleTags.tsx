import { Chip } from "@/components/shared/Chip";
import { cn } from "@/lib/utils";

type ArticleTagsProps = {
  tags: readonly string[];
  className?: string;
  chipClassName?: string;
};

export function ArticleTags({
  tags,
  className,
  chipClassName,
}: ArticleTagsProps) {
  if (tags.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <Chip key={tag} className={chipClassName}>
          {tag}
        </Chip>
      ))}
    </div>
  );
}
