import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogArticleMeta } from "@/lib/github-blog";
import { Badge } from "@/components/ui/badge";

type ArticleCardProps = {
  article: BlogArticleMeta;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block rounded-2xl border border-white/20 bg-white/40 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/20 hover:bg-white/60"
    >
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h2 className="font-poppins text-lg font-semibold text-neutral-800 line-clamp-2 transition-colors duration-200 group-hover:text-neutral-950 md:text-xl">
          {article.title}
        </h2>

        {/* Description */}
        {article.description ? (
          <p className="text-sm leading-relaxed text-neutral-500 line-clamp-2">
            {article.description}
          </p>
        ) : null}

        {/* Tags */}
        {article.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full bg-neutral-100/80 px-2.5 py-0.5 text-xs font-medium text-neutral-600 transition-colors group-hover:bg-neutral-200/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {/* Meta */}
        <div className="flex items-center gap-4 pt-1 text-xs text-neutral-400">
          {formattedDate ? (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
          ) : null}
          {article.readingTime ? (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readingTime}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
