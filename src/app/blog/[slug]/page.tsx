import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getArticle } from "@/lib/github-blog";
import { getPageMeta, markdownToHtml } from "@/lib/markdown";
import { ArticleDetailHeader } from "@/components/blog/ArticleDetailHeader";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { getRequestOrigin } from "@/lib/request-origin";
import "./prose.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) return { title: "Blog | MinTani Portfolio" };
  const apiBaseUrl = await getRequestOrigin();

  try {
    const article = await getArticle({
      owner: BLOG_CONFIG.OWNER,
      repo: BLOG_CONFIG.REPO,
      slug,
      articlesDir: BLOG_CONFIG.ARTICLES_DIR,
      githubToken,
      baseUrl: apiBaseUrl,
    });
    return getPageMeta(article);
  } catch {
    return { title: "記事が見つかりません | MinTani Blog" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const githubToken = process.env.GITHUB_TOKEN;
  const apiBaseUrl = await getRequestOrigin();

  if (!githubToken || slug.startsWith("_")) {
    notFound();
  }

  let article;
  try {
    article = await getArticle({
      owner: BLOG_CONFIG.OWNER,
      repo: BLOG_CONFIG.REPO,
      slug,
      articlesDir: BLOG_CONFIG.ARTICLES_DIR,
      githubToken,
      baseUrl: apiBaseUrl,
    });
  } catch {
    notFound();
  }

  const { html: htmlContent, toc } = await markdownToHtml(article.content, {
    owner: BLOG_CONFIG.OWNER,
    repo: BLOG_CONFIG.REPO,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "MinTani",
    },
    keywords: article.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative min-h-screen bg-[#f4f6ef] text-[#142018]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(24,63,36,0.05)_1px,transparent_1px)] bg-size-32px opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(28,78,44,0.08),transparent)]" />

        <div className="relative z-10 ">
          <ArticleDetailHeader article={article} />

          <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <ArticleContent htmlContent={htmlContent} toc={toc} />
          </article>
        </div>
      </div>
    </>
  );
}
