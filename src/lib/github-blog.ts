import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

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

type ArticleFrontmatter = {
  title?: string;
  date?: string;
  tags?: string[] | string;
  description?: string;
  image?: string;
};

type GitHubContentEntry = {
  name: string;
  path: string;
  type: "file" | "dir";
};

type GitHubFileResponse = {
  content: string;
  encoding: "base64" | string;
};

const MARKDOWN_EXTENSION_RE = /\.mdx?$/i;

const normalizeTags = (tags: ArticleFrontmatter["tags"]): string[] => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const createSlugFromPath = (path: string) =>
  path.replace(MARKDOWN_EXTENSION_RE, "");

const parseArticleFile = ({
  fileName,
  markdown,
}: {
  fileName: string;
  markdown: string;
}): BlogArticle => {
  const { data, content } = matter(markdown);
  const frontmatter = data as ArticleFrontmatter;
  const slug = createSlugFromPath(fileName);

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "",
    tags: normalizeTags(frontmatter.tags),
    description: frontmatter.description ?? "",
    image: frontmatter.image ?? undefined,
    readingTime: readingTime(content).text,
    content,
  };
};

const sortByDateDesc = (articles: BlogArticleMeta[]) =>
  articles.toSorted((a, b) => {
    const left = a.date ? Date.parse(a.date) : 0;
    const right = b.date ? Date.parse(b.date) : 0;
    return right - left;
  });

const getGitHubHeaders = (githubToken: string) => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${githubToken}`,
  "User-Agent": "mintani-portfolio-blog",
  "X-GitHub-Api-Version": "2022-11-28",
});

const fetchGitHubJson = async <T>({
  owner,
  repo,
  path,
  githubToken,
}: {
  owner: string;
  repo: string;
  path: string;
  githubToken: string;
}): Promise<T> => {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/${path}`,
    {
      headers: getGitHubHeaders(githubToken),
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${path} (${res.status})`);
  }

  return res.json() as Promise<T>;
};

const fetchArticleMarkdown = async ({
  owner,
  repo,
  path,
  githubToken,
}: {
  owner: string;
  repo: string;
  path: string;
  githubToken: string;
}) => {
  const file = await fetchGitHubJson<GitHubFileResponse>({
    owner,
    repo,
    path: `contents/${path}`,
    githubToken,
  });

  if (file.encoding !== "base64") {
    throw new Error(`Unsupported GitHub file encoding: ${file.encoding}`);
  }

  return Buffer.from(file.content, "base64").toString("utf-8");
};

const listArticleEntries = async ({
  owner,
  repo,
  articlesDir = "posts",
  githubToken,
}: {
  owner: string;
  repo: string;
  articlesDir?: string;
  githubToken: string;
}) => {
  const entries = await fetchGitHubJson<GitHubContentEntry[]>({
    owner,
    repo,
    path: `contents/${articlesDir}`,
    githubToken,
  });

  return entries.filter(
    (entry) => entry.type === "file" && MARKDOWN_EXTENSION_RE.test(entry.name)
  );
};

const findArticleEntryBySlug = async ({
  owner,
  repo,
  slug,
  articlesDir = "posts",
  githubToken,
}: {
  owner: string;
  repo: string;
  slug: string;
  articlesDir?: string;
  githubToken: string;
}) => {
  const entries = await listArticleEntries({
    owner,
    repo,
    articlesDir,
    githubToken,
  });

  return entries.find((entry) => createSlugFromPath(entry.name) === slug);
};

export const getArticlesListFromGitHub = cache(
  async ({
    owner,
    repo,
    articlesDir = "posts",
    githubToken,
  }: {
    owner: string;
    repo: string;
    articlesDir?: string;
    githubToken: string;
  }): Promise<BlogArticleMeta[]> => {
    const entries = await listArticleEntries({
      owner,
      repo,
      articlesDir,
      githubToken,
    });

    // Hono からはこのサービスを呼ぶだけにして、並列取得の流れを見やすくする。
    const articles = await Promise.all(
      entries.map(async (entry) => {
        const markdown = await fetchArticleMarkdown({
          owner,
          repo,
          path: entry.path,
          githubToken,
        });

        return parseArticleFile({
          fileName: entry.name,
          markdown,
        });
      })
    );

    return sortByDateDesc(
      articles.map(({ content: _content, ...meta }) => meta)
    );
  }
);

export const getArticleFromGitHub = cache(
  async ({
    owner,
    repo,
    slug,
    articlesDir = "posts",
    githubToken,
  }: {
    owner: string;
    repo: string;
    slug: string;
    articlesDir?: string;
    githubToken: string;
  }): Promise<BlogArticle> => {
    const entry = await findArticleEntryBySlug({
      owner,
      repo,
      slug,
      articlesDir,
      githubToken,
    });

    if (!entry) {
      throw new Error(`Article not found: ${slug}`);
    }

    const markdown = await fetchArticleMarkdown({
      owner,
      repo,
      path: entry.path,
      githubToken,
    });

    return parseArticleFile({
      fileName: entry.name,
      markdown,
    });
  }
);

/**
 * Pages からはアプリ内 API を叩く。
 * 「UI は Hono に問い合わせる」「GitHub I/O はサービス層が持つ」を分けるのが今回の狙い。
 */
export const getArticlesList = cache(
  async ({
    owner: _owner,
    repo: _repo,
    articlesDir: _articlesDir,
    githubToken: _githubToken,
    baseUrl,
  }: {
    owner: string;
    repo: string;
    articlesDir?: string;
    githubToken: string;
    baseUrl: string;
  }): Promise<BlogArticleMeta[]> => {
    try {
      const res = await fetch(`${baseUrl}/api/articles`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        console.error(`Failed to fetch articles list: ${res.status}`);
        return [];
      }

      const data: BlogArticleMeta[] = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles list from Hono API:", error);
      return [];
    }
  }
);

/**
 * 詳細も同じく Hono に寄せる。
 */
export const getArticle = cache(
  async ({
    owner: _owner,
    repo: _repo,
    slug,
    articlesDir: _articlesDir,
    githubToken: _githubToken,
    baseUrl,
  }: {
    owner: string;
    repo: string;
    slug: string;
    articlesDir?: string;
    githubToken: string;
    baseUrl: string;
  }): Promise<BlogArticle> => {
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      throw new Error(`Article not found: ${slug}`);
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch article "${slug}": ${res.status}`);
    }

    const data: BlogArticle = await res.json();
    return data;
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
