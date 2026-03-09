import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import { BLOG_CONFIG } from "@/lib/blog-config";
import {
  getArticleFromGitHub,
  getArticlesListFromGitHub,
} from "@/lib/github-blog";

const app = new Hono().basePath("/api");

app.get("/articles", async (c) => {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    throw new HTTPException(500, {
      message: "GITHUB_TOKEN is not configured",
    });
  }

  // Hono の最小構成:
  // 1. ルートでリクエストを受ける
  // 2. 必要な値を読む
  // 3. サービス層を呼ぶ
  // 4. JSON を返す
  const articles = await getArticlesListFromGitHub({
    owner: BLOG_CONFIG.OWNER,
    repo: BLOG_CONFIG.REPO,
    articlesDir: BLOG_CONFIG.ARTICLES_DIR,
    githubToken,
  });

  c.header("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  return c.json(articles);
});

app.get("/articles/:slug", async (c) => {
  const githubToken = process.env.GITHUB_TOKEN;
  const slug = c.req.param("slug");

  if (!githubToken) {
    throw new HTTPException(500, {
      message: "GITHUB_TOKEN is not configured",
    });
  }

  if (!slug || slug.startsWith("_")) {
    throw new HTTPException(404, {
      message: "Article not found",
    });
  }

  try {
    const article = await getArticleFromGitHub({
      owner: BLOG_CONFIG.OWNER,
      repo: BLOG_CONFIG.REPO,
      slug,
      articlesDir: BLOG_CONFIG.ARTICLES_DIR,
      githubToken,
    });

    c.header("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return c.json(article);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Article not found")) {
      throw new HTTPException(404, {
        message: error.message,
      });
    }

    throw error;
  }
});

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status);
  }

  console.error("Unhandled Hono error:", error);
  return c.json({ message: "Internal Server Error" }, 500);
});

export const GET = handle(app);
