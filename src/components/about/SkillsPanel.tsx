import type { ComponentType } from "react";
import {
  ReactDark,
  Nextjs,
  TypeScript,
  TailwindCSS,
  Hono,
  PostgreSQL,
  AmazonWebServicesDark,
  Docker,
  Git,
  Figma,
  Cloudflare,
  GitHubLight,
  VercelLight,
} from "@ridemountainpig/svgl-react";
import { Server } from "lucide-react";
import { SKILLS } from "@/data/about";
import type { SkillCategory, SkillItem } from "@/data/about";

type SkillIcon = ComponentType<{
  className?: string;
  width?: number;
  height?: number;
}>;

type Level = SkillItem["level"];

// svgl has no Proxmox logo, so fall back to a neutral server icon.
const SKILL_ICONS: Record<string, SkillIcon> = {
  React: ReactDark,
  "Next.js": Nextjs,
  TypeScript,
  "Tailwind CSS": TailwindCSS,
  Hono,
  PostgreSQL,
  AWS: AmazonWebServicesDark,
  Cloudflare,
  Proxmox: Server,
  Vercel: VercelLight,
  Docker,
  "GitHub Actions": GitHubLight,
  Git,
  Figma,
};

const CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "infra", label: "Infra" },
  { key: "tools", label: "Tools" },
];

const LEVEL_LABEL: Record<Level, string> = {
  1: "触ったことがある",
  2: "個人開発で使った",
  3: "普段から活用",
};

const LEVELS: readonly Level[] = [1, 2, 3];

/** Segmented progress in three steps: primary up to the level, a quiet track beyond it. */
function LevelMeter({ level }: { level: Level }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center gap-1">
      {LEVELS.map((i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${i <= level ? "bg-primary" : "bg-outline-variant/70"}`}
        />
      ))}
    </span>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {LEVELS.map((level) => (
        <span key={level} className="flex items-center gap-2">
          <LevelMeter level={level} />
          <span className="text-xs text-on-surface-variant">
            {LEVEL_LABEL[level]}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Skills as one tonal card per category. */
export function SkillsPanel() {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <h3 className="text-2xl font-medium text-on-surface sm:text-[28px]">
          Skills
        </h3>
        <Legend />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map(({ key, label }) => {
          const items = SKILLS.filter((skill) => skill.category === key);
          if (items.length === 0) return null;
          return (
            <div
              key={key}
              className="min-w-0 rounded-3xl bg-surface-container-low p-2"
            >
              <h4 className="px-3 pt-3 pb-1 text-sm font-medium text-primary">
                {label}
              </h4>
              <ul>
                {items.map((skill) => {
                  const Icon = SKILL_ICONS[skill.name];
                  return (
                    <li
                      key={skill.name}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest">
                        {Icon ? (
                          <Icon
                            className="size-[18px]"
                            width={18}
                            height={18}
                          />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[15px] text-on-surface">
                        {skill.name}
                      </span>
                      <LevelMeter level={skill.level} />
                      <span className="sr-only">
                        {LEVEL_LABEL[skill.level]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
