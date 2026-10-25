import Link from "next/link";
import type { BlogArticleMeta } from "@/lib/github-blog";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { ArticleTags } from "@/components/blog/ArticleTags";

type ArticleCardProps = {
  article: BlogArticleMeta;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="state-layer block rounded-3xl bg-surface-container-low p-5 text-on-surface transition-shadow duration-200 hover:shadow-level-1 md:p-6"
    >
      <div className="flex h-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <ArticleMeta
            date={article.date}
            readingTime={article.readingTime}
            className="gap-3 text-xs text-on-surface-variant"
          />

          <h2 className="mt-3 text-xl font-medium tracking-tight md:text-2xl">
            {article.title}
          </h2>

          {article.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-7 text-on-surface-variant md:text-[15px]">
              {article.description}
            </p>
          ) : null}
        </div>

        <ArticleTags
          tags={article.tags}
          className="md:max-w-52 md:justify-end"
        />
      </div>
    </Link>
  );
};
