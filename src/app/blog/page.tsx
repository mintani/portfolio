import type { Metadata } from "next";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getArticlesList } from "@/lib/github-blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BookOpen } from "lucide-react";
import { getRequestOrigin } from "@/lib/request-origin";

export const metadata: Metadata = {
  title: "Blog | MinTani Portfolio",
  description: "気まぐれに書くブログです。Tech以外のことも書いていきます。",
};

export default async function BlogPage() {
  const githubToken = process.env.GITHUB_TOKEN;
  const apiBaseUrl = await getRequestOrigin();

  const articles = githubToken
    ? await getArticlesList({
        owner: BLOG_CONFIG.OWNER,
        repo: BLOG_CONFIG.REPO,
        articlesDir: BLOG_CONFIG.ARTICLES_DIR,
        githubToken,
        baseUrl: apiBaseUrl,
      })
    : [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f6ef] text-[#142018]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(24,63,36,0.05)_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(28,78,44,0.08),transparent)]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        {articles.length > 0 ? (
          <>
            <header className="border-b border-[#183f24]/16 pb-8 md:pb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#356847]">
                Journal
              </p>
              <div className="mt-4">
                <h1 className="font-poppins text-4xl font-semibold tracking-tight text-[#111713] md:text-5xl">
                  記事一覧
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#4b5b51]">
                  技術メモや自分用のメモ
                </p>
              </div>
            </header>

            <section className="mt-8 space-y-4 md:mt-10">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </section>
          </>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-4xl border border-[#183f24]/14 bg-white px-6 py-20 text-center shadow-[0_24px_60px_rgba(17,23,19,0.06)]">
            <div className="rounded-full border border-[#183f24]/12 bg-[#eef3ea] p-4">
              <BookOpen size={32} className="text-[#356847]" />
            </div>
            <div className="mt-5 text-center">
              <h1 className="font-poppins text-4xl font-bold tracking-tight text-[#111713] md:text-5xl">
                Blog
              </h1>
              <h2 className="mt-4 font-poppins text-lg font-semibold text-[#111713]">
                記事がまだありません
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#4b5b51]">
                最初の記事をお楽しみに！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
