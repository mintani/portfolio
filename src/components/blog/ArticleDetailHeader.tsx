import type { BlogArticle } from "@/lib/github-blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { ArticleTags } from "@/components/blog/ArticleTags";
import { BlogBanner } from "@/components/blog/BlogBanner";

type ArticleDetailHeaderProps = {
  article: BlogArticle;
};

export const ArticleDetailHeader = ({ article }: ArticleDetailHeaderProps) => {
  return (
    <BlogBanner>
      <Link
        href="/blog"
        className="state-layer -ml-4 mb-6 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-on-primary-container"
      >
        <ArrowLeft size={18} />
        記事一覧に戻る
      </Link>

      <div className="space-y-5">
        <h1 className="text-3xl font-medium tracking-tight text-on-surface md:text-5xl md:leading-tight">
          {article.title}
        </h1>

        <ArticleMeta
          date={article.date}
          readingTime={article.readingTime}
          iconSize={16}
          className="gap-x-5 gap-y-2 text-sm text-on-primary-container"
        />

        <ArticleTags
          tags={article.tags}
          chipClassName="border-transparent bg-surface-container-lowest/80 text-on-surface"
        />
      </div>
    </BlogBanner>
  );
};
