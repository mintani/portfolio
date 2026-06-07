import type { BlogArticle } from "@/lib/github-blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { ArticleTags } from "@/components/blog/ArticleTags";

type ArticleDetailHeaderProps = {
  article: BlogArticle;
};

export const ArticleDetailHeader = ({ article }: ArticleDetailHeaderProps) => {
  return (
    <header className="relative border-b border-[#183f24]/12 bg-[#f4f6ef]">
      <div className="container relative mx-auto max-w-4xl px-4 py-20 md:px-6 md:py-20">
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

          <ArticleMeta
            date={article.date}
            readingTime={article.readingTime}
            iconSize={14}
            className="gap-x-5 gap-y-2 text-sm text-[#4b5b51]"
            iconClassName="text-[#356847]"
          />

          <ArticleTags tags={article.tags} badgeClassName="bg-white" />
        </div>
      </div>
    </header>
  );
};
