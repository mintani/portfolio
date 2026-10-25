import type { Metadata } from "next";
import { getArticlesList } from "@/lib/github-blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { ExpressiveShape } from "@/components/shared/ExpressiveShape";
import { getRequestOrigin } from "@/lib/request-origin";

export const metadata: Metadata = {
  title: "Blog | MinTani Portfolio",
  description: "気まぐれに書くブログです。Tech以外のことも書いていきます。",
};

export default async function BlogPage() {
  const githubToken = process.env.GITHUB_TOKEN;
  const apiBaseUrl = await getRequestOrigin();

  const articles = githubToken
    ? await getArticlesList({ baseUrl: apiBaseUrl })
    : [];

  return (
    <div className="min-h-screen bg-surface pb-20 text-on-surface">
      <BlogBanner>
        <Link
          href="/"
          className="state-layer -ml-4 mb-6 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-on-primary-container"
        >
          <ArrowLeft size={18} />
          ホームに戻る
        </Link>
        <p className="text-sm font-medium text-on-primary-container">Journal</p>
        <h1 className="mt-2 text-4xl font-medium tracking-tight text-on-surface md:text-6xl">
          記事一覧
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-on-primary-container md:text-lg">
          技術メモや自分用のメモ
        </p>
      </BlogBanner>

      <div className="container mx-auto max-w-4xl px-4 pt-8 md:px-6 md:pt-10">
        {articles.length > 0 ? (
          <section className="flex flex-col gap-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-[28px] bg-surface-container-low px-6 py-16 text-center">
            <span className="relative grid size-20 place-items-center text-primary-container">
              <ExpressiveShape
                kind="cookie"
                className="absolute inset-0 size-full"
              />
              <BookOpen
                size={32}
                className="relative text-on-primary-container"
              />
            </span>
            <h2 className="mt-5 text-2xl font-medium text-on-surface">
              記事がまだありません
            </h2>
            <p className="mt-2 text-sm leading-7 text-on-surface-variant">
              最初の記事をお楽しみに！
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
