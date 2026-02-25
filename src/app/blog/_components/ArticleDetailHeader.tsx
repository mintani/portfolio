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
    <header className="relative overflow-hidden border-b border-white/20 bg-white/30 backdrop-blur-lg">
      {/* Decorative gradient accent */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-linear-to-br from-purple-200 to-pink-200 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-linear-to-tr from-blue-200 to-sky-200 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-4xl px-4 py-10 md:py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800"
        >
          <ArrowLeft size={14} />
          ブログ一覧に戻る
        </Link>

        {/* Title */}
        <h1 className="font-poppins text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl lg:text-4xl">
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          {formattedDate ? (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
          ) : null}
          {article.readingTime ? (
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {article.readingTime}
            </span>
          ) : null}
        </div>

        {/* Tags */}
        {article.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full bg-neutral-100/80 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
};
