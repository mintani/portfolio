import type { BlogArticle } from "@/lib/github-blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type ArticleDetailHeaderProps = {
  article: BlogArticle;
};

export const ArticleDetailHeader = ({ article }: ArticleDetailHeaderProps) => {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <header className="relative border-b border-[#183f24]/12 bg-[#f4f6ef]">
      <div className="container relative mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#4b5b51] transition-colors hover:text-[#111713]"
        >
          <ArrowLeft size={14} />
          記事一覧に戻る
        </Link>

        <div className="space-y-5">
          <h1 className="font-poppins text-3xl font-semibold tracking-tight text-[#111713] md:text-5xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#4b5b51]">
            {formattedDate ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-[#356847]" />
                {formattedDate}
              </span>
            ) : null}
            {article.readingTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-[#356847]" />
                {article.readingTime}
              </span>
            ) : null}
          </div>

          {article.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full border border-[#183f24]/14 bg-white px-3 py-1 text-xs font-medium text-[#356847]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
