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
      className="group block rounded-3xl border border-[#183f24]/12 bg-white p-5 shadow-[0_18px_40px_rgba(17,23,19,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#356847]/35 hover:shadow-[0_24px_52px_rgba(17,23,19,0.08)] md:p-6"
    >
      <div className="flex h-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <ArticleMeta
            date={article.date}
            readingTime={article.readingTime}
            className="gap-3 text-xs text-[#607065]"
          />

          <h2 className="mt-3 font-poppins text-xl font-semibold tracking-tight text-[#111713] transition-colors duration-200 group-hover:text-[#275437] md:text-2xl">
            {article.title}
          </h2>

          {article.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#4b5b51] md:text-[15px]">
              {article.description}
            </p>
          ) : null}
        </div>

        <ArticleTags
          tags={article.tags}
          className="md:max-w-52 md:justify-end"
          badgeClassName="bg-[#f1f5ef]"
        />
      </div>
    </Link>
  );
};
