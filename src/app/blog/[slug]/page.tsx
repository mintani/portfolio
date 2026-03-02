import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getArticle } from "@/lib/github-blog";
import { getPageMeta, markdownToHtml } from "@/lib/markdown";
import { ArticleDetailHeader } from "@/app/blog/_components/ArticleDetailHeader";
import { ArticleContent } from "@/app/blog/_components/ArticleContent";
import "./prose.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) return { title: "Blog | MinTani Portfolio" };

  try {
    const article = await getArticle({
      owner: BLOG_CONFIG.OWNER,
      repo: BLOG_CONFIG.REPO,
      slug,
      articlesDir: BLOG_CONFIG.ARTICLES_DIR,
      githubToken,
    });
    return getPageMeta(article);
  } catch {
    return { title: "記事が見つかりません | MinTani Blog" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const githubToken = process.env.GITHUB_TOKEN;

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
      <div className="min-h-screen background-gradient relative">
        <div className="hero-dots absolute inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 pt-16">
          <ArticleDetailHeader article={article} />

          <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <ArticleContent htmlContent={htmlContent} toc={toc} />
          </article>
        </div>
      </div>
    </>
  );
}
