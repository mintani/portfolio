import { cache } from "react";

const BLOG_API_BASE_URL =
  process.env.BLOG_API_BASE_URL ?? "http://localhost:8000";

export type BlogArticleMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  image?: string;
  readingTime?: string;
};

export type BlogArticle = BlogArticleMeta & {
  content: string;
};

/** Shape returned by the FastAPI /v1/articles endpoints */
type ApiArticleMeta = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[] | null;
  description: string | null;
  image: string | null;
  readingTime: string | null;
};

type ApiArticle = ApiArticleMeta & {
  content: string;
};

const toArticleMeta = (a: ApiArticleMeta): BlogArticleMeta => ({
  slug: a.slug,
  title: a.title,
  date: a.date ?? "",
  tags: a.tags ?? [],
  description: a.description ?? "",
  image: a.image ?? undefined,
  readingTime: a.readingTime ?? undefined,
});

const toArticle = (a: ApiArticle): BlogArticle => ({
  ...toArticleMeta(a),
  content: a.content,
});

/**
 * Fetch all article metadata from the FastAPI blog service.
 * Cached per-request via React.cache() (server-cache-react best practice).
 */
export const getArticlesList = cache(
  async ({
    owner: _owner,
    repo: _repo,
    articlesDir: _articlesDir,
    githubToken: _githubToken,
  }: {
    owner: string;
    repo: string;
    articlesDir?: string;
    githubToken: string;
  }): Promise<BlogArticleMeta[]> => {
    try {
      const res = await fetch(`${BLOG_API_BASE_URL}/v1/articles/`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        console.error(`Failed to fetch articles list: ${res.status}`);
        return [];
      }

      const data: ApiArticleMeta[] = await res.json();
      return data.map(toArticleMeta);
    } catch (error) {
      console.error("Error fetching articles list from FastAPI:", error);
      return [];
    }
  }
);

/**
 * Fetch a single article by slug from the FastAPI blog service.
 * Cached per-request via React.cache() (server-cache-react best practice).
 */
export const getArticle = cache(
  async ({
    owner: _owner,
    repo: _repo,
    slug,
    articlesDir: _articlesDir,
    githubToken: _githubToken,
  }: {
    owner: string;
    repo: string;
    slug: string;
    articlesDir?: string;
    githubToken: string;
  }): Promise<BlogArticle> => {
    const res = await fetch(`${BLOG_API_BASE_URL}/v1/articles/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      throw new Error(`Article not found: ${slug}`);
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch article "${slug}": ${res.status}`);
    }

    const data: ApiArticle = await res.json();
    return toArticle(data);
  }
);

export const getArticleImageUrl = ({
  owner,
  repo,
  imagePath,
  branch = "main",
}: {
  owner: string;
  repo: string;
  imagePath: string;
  branch?: string;
}): string => {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/images/${imagePath}`;
};
