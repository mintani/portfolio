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

/** Slanted bars: accent up to the level, hairline grey beyond it. */
function LevelMeter({ level }: { level: Level }) {
  return (
    <span className="flex items-center gap-1 shrink-0">
      {LEVELS.map((i) => (
        <span
          key={i}
          className={`h-4 w-1.5 -skew-x-12 rounded-[2px] ${i <= level ? "bg-accent" : "bg-rule"}`}
        />
      ))}
    </span>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {LEVELS.map((level) => (
        <span key={level} className="flex items-center gap-1.5">
          <LevelMeter level={level} />
          <span className="font-mono text-xs text-ink-3">
            {LEVEL_LABEL[level]}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Skills split into one hairline-ruled column per category. */
export function SkillsPanel() {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] text-ink">
          Skills
        </h3>
        <Legend />
      </div>
      <div className="border-t border-rule mt-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 mt-5">
        {CATEGORIES.map(({ key, label }) => {
          const items = SKILLS.filter((skill) => skill.category === key);
          if (items.length === 0) return null;
          return (
            <div key={key} className="min-w-0">
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pb-2 border-b border-rule">
                {label}
              </h4>
              <ul>
                {items.map((skill) => {
                  const Icon = SKILL_ICONS[skill.name];
                  return (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        {Icon ? (
                          <Icon
                            className="size-4 shrink-0"
                            width={16}
                            height={16}
                          />
                        ) : null}
                        <span className="font-display text-sm font-medium text-ink truncate">
                          {skill.name}
                        </span>
                      </span>
                      <LevelMeter level={skill.level} />
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
