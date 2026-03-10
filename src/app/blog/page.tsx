import { Metadata } from "next";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getArticlesList } from "@/lib/github-blog";
import { ArticleCard } from "@/app/blog/_components/ArticleCard";
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
    <div className="min-h-screen background-gradient relative overflow-hidden">
      <div className="hero-dots absolute inset-0 z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        {articles.length > 0 ? (
          <>
            <header className="border-b border-white/45 pb-8 md:pb-10">
              <div>
                <h1 className="font-poppins text-4xl font-semibold tracking-tight text-[#2f2f2f] md:text-5xl">
                  記事一覧
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#585858]">
                  技術メモや日々の記録を一覧で読めます。
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
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-[2rem] border border-white/55 bg-white/35 px-6 py-20 text-center shadow-lg backdrop-blur-xl">
            <div className="rounded-full border border-white/60 bg-white/60 p-4 backdrop-blur-sm">
              <BookOpen size={32} className="text-[#585858]" />
            </div>
            <div className="mt-5 text-center">
              <h1 className="font-poppins text-4xl font-bold tracking-tight text-[#2f2f2f] md:text-5xl">
                Blog
              </h1>
              <h2 className="mt-4 font-poppins text-lg font-semibold text-[#2f2f2f]">
                記事がまだありません
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#585858]">
                最初の記事をお楽しみに！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
