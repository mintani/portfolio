import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type ArticleMetaProps = {
  date?: string;
  readingTime?: string;
  iconSize?: number;
  className?: string;
  iconClassName?: string;
};

export function ArticleMeta({
  date,
  readingTime,
  iconSize = 12,
  className,
  iconClassName,
}: ArticleMetaProps) {
  const formattedDate = formatDate(date);
  return (
    <div className={cn("flex flex-wrap items-center", className)}>
      {formattedDate ? (
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={iconSize} className={iconClassName} />
          {formattedDate}
        </span>
      ) : null}
      {readingTime ? (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={iconSize} className={iconClassName} />
          {readingTime}
        </span>
      ) : null}
    </div>
  );
}
