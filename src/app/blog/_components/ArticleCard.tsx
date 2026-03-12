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
      className="group block rounded-[1.5rem] border border-[#183f24]/12 bg-white p-5 shadow-[0_18px_40px_rgba(17,23,19,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#356847]/35 hover:shadow-[0_24px_52px_rgba(17,23,19,0.08)] md:p-6"
    >
      <div className="flex h-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#607065]">
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

          <h2 className="mt-3 font-poppins text-xl font-semibold tracking-tight text-[#111713] transition-colors duration-200 group-hover:text-[#275437] md:text-2xl">
            {article.title}
          </h2>

          {article.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#4b5b51] md:text-[15px]">
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
                className="rounded-full border border-[#183f24]/14 bg-[#f1f5ef] px-3 py-1 text-xs font-medium text-[#356847]"
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
