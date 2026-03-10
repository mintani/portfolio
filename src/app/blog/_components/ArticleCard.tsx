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
      className="group block rounded-[1.5rem] border border-white/55 bg-white/32 p-5 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-white/75 hover:bg-white/45 hover:shadow-md md:p-6"
    >
      <div className="flex h-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            {formattedDate ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} />
                {formattedDate}
              </span>
            ) : null}
            {article.readingTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {article.readingTime}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 font-poppins text-xl font-semibold tracking-tight text-[#2f2f2f] transition-colors duration-200 group-hover:text-[#01aeb1] md:text-2xl">
            {article.title}
          </h2>

          {article.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#585858] md:text-[15px]">
              {article.description}
            </p>
          ) : null}
        </div>

        {article.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 md:max-w-[13rem] md:justify-end">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border border-white/65 bg-white/70 px-3 py-1 text-xs font-medium text-[#585858]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
};
