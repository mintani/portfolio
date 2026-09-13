import { cache } from "react";

export type ContributionDay = {
  date: string;
  count: number;
  /** 0 (none) to 4 (most), as GitHub buckets it. */
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type LanguageShare = {
  name: string;
  /** GitHub's colour for the language, e.g. "#3178c6". */
  color: string;
  /** Share of bytes across public repositories, 0–100. */
  percent: number;
};

export type GithubStats = {
  totalContributions: number;
  weeks: ContributionWeek[];
  languages: LanguageShare[];
};

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type StatsResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: ContributionLevel;
            }[];
          }[];
        };
      };
      repositories: {
        nodes: {
          languages: {
            edges: { size: number; node: { name: string; color: string } }[];
          };
        }[];
      };
    };
  };
  errors?: { message: string }[];
};

const LEVELS: Record<ContributionLevel, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Languages listed individually; the rest are folded into "Other". */
const MAX_LANGUAGES = 5;

const QUERY = `
  query Stats($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(
        first: 100
        ownerAffiliations: [OWNER]
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

const summarizeLanguages = (
  repos: NonNullable<StatsResponse["data"]>["user"]["repositories"]["nodes"]
): LanguageShare[] => {
  const bytes = new Map<string, { size: number; color: string }>();
  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      const entry = bytes.get(node.name) ?? { size: 0, color: node.color };
      entry.size += size;
      bytes.set(node.name, entry);
    }
  }

  const total = [...bytes.values()].reduce((sum, v) => sum + v.size, 0);
  if (total === 0) return [];

  const sorted = [...bytes.entries()].sort((a, b) => b[1].size - a[1].size);
  const top = sorted.slice(0, MAX_LANGUAGES).map(([name, { size, color }]) => ({
    name,
    color,
    percent: (size / total) * 100,
  }));
  const rest = sorted.slice(MAX_LANGUAGES).reduce((s, [, v]) => s + v.size, 0);
  if (rest > 0) {
    top.push({
      name: "Other",
      color: "#c3cbe6",
      percent: (rest / total) * 100,
    });
  }
  return top;
};

/**
 * Contribution calendar for the past year plus the language mix of public
 * repositories, via the GitHub GraphQL API. Returns null without a token or
 * when the request fails, so the UI can simply leave the block out.
 */
export const getGithubStats = cache(
  async (login: string): Promise<GithubStats | null> => {
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) return null;

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
          "User-Agent": "mintani-portfolio",
        },
        body: JSON.stringify({ query: QUERY, variables: { login } }),
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        console.error(`GitHub GraphQL request failed: ${res.status}`);
        return null;
      }

      const json = (await res.json()) as StatsResponse;
      if (!json.data || json.errors?.length) {
        console.error("GitHub GraphQL errors:", json.errors);
        return null;
      }

      const { contributionsCollection, repositories } = json.data.user;
      const calendar = contributionsCollection.contributionCalendar;
      return {
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks.map((week) => ({
          days: week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
            level: LEVELS[day.contributionLevel],
          })),
        })),
        languages: summarizeLanguages(repositories.nodes),
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return null;
    }
  }
);
