import { Metadata } from "next";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getArticlesList } from "@/lib/github-blog";
import { ArticleCard } from "@/app/blog/_components/ArticleCard";
import { BookOpen } from "lucide-react";
import { getRequestOrigin } from "@/lib/request-origin";

export const metadata: Metadata = {
  title: "Blog | MinTani Portfolio",
  description: "技術的な学びや日々の気づきを記録しています。",
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
    <div className="min-h-screen background-gradient relative">
      {/* Dot pattern */}
      <div className="hero-dots absolute inset-0 z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-28 md:pt-32">
        {/* Page header */}
        <header className="mb-12 text-center md:mb-16">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-neutral-800 md:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-neutral-500">
            技術的な学びや日々の気づきを記録しています。
          </p>
        </header>

        {/* Article grid */}
        {articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="rounded-full bg-white/50 p-4 backdrop-blur-sm">
              <BookOpen size={32} className="text-neutral-400" />
            </div>
            <div className="text-center">
              <h2 className="font-poppins text-lg font-semibold text-neutral-600">
                記事がまだありません
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                最初の記事をお楽しみに！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
