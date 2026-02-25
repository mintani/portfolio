import type { BlogArticle } from "@/lib/github-blog";
import type { Heading } from "mdast";
import type { Metadata } from "next";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type TocItem = {
  url: string;
  depth: number;
  value: string;
};

type MarkdownProcessingResult = {
  html: string;
  toc: TocItem[];
};

/**
 * Generate Next.js metadata for an article page
 */
export const getPageMeta = (article: BlogArticle): Metadata => ({
  title: `${article.title} | MinTani Blog`,
  description: article.description || `${article.title}について`,
  openGraph: {
    title: article.title,
    description: article.description || `${article.title}について`,
    type: "article",
    publishedTime: article.date,
    tags: article.tags,
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description || `${article.title}について`,
  },
});

/**
 * Create a URL-safe slug from heading text (supports Japanese)
 */
const createSlug = (text: string): string => {
  if (!text || typeof text !== "string") return "heading";

  const slugValue = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u0400-\u04FF-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slugValue || "heading";
};

/**
 * Convert relative image paths to GitHub raw URLs
 */
const processImagePaths = (
  content: string,
  owner: string,
  repo: string
): string => {
  return content
    .replace(
      /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
      `![$1](https://raw.githubusercontent.com/${owner}/${repo}/main/images/$2)`
    )
    .replace(
      /!\[([^\]]*)\]\(\/(?!\/|https?:)([^)]+)\)/g,
      `![$1](https://raw.githubusercontent.com/${owner}/${repo}/main/images/$2)`
    );
};

/**
 * Convert ``` language:title to ``` language title="title"
 */
const processCodeBlockTitle = (content: string): string => {
  return content.replace(/^```(\w+):([^ ]+)$/gm, '```$1 title="$2"');
};

/**
 * Process markdown content into HTML with TOC extraction
 */
export const markdownToHtml = async (
  markdown: string,
  options?: { owner?: string; repo?: string }
): Promise<MarkdownProcessingResult> => {
  let processedMarkdown = processCodeBlockTitle(markdown);
  const toc: TocItem[] = [];

  if (options?.owner && options?.repo) {
    processedMarkdown = processImagePaths(
      processedMarkdown,
      options.owner,
      options.repo
    );
  }

  const result = await unified()
    .use(remarkParse, { fragment: true })
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, "heading", (node: Heading) => {
        if (node.children[0]?.type === "text") {
          const value = node.children[0].value;
          toc.push({
            value,
            depth: node.depth,
            url: `#${createSlug(value)}`,
          });
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutoLinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
        ariaLabel: "Link to heading",
      },
    })
    .use(rehypePrettyCode, {
      theme: "github-dark-default",
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);

  return { html: String(result), toc };
};
