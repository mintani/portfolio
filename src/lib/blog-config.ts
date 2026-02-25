export const BLOG_CONFIG = {
  OWNER: "mintani",
  REPO: "blog-content",
  ARTICLES_DIR: "posts",
  SITE_URL: "https://mintani.runa.dev",
  SITE_TITLE: "MinTani Blog",
  SITE_DESCRIPTION: "Tech blog by MinTani",
  API_BASE_URL: process.env.BLOG_API_BASE_URL ?? "http://localhost:8000",
} as const;
