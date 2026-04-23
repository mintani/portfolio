import type { ComponentType } from "react";
import {
  ReactDark,
  Nextjs,
  TypeScript,
  TailwindCSS,
  Hono,
  PostgreSQL,
  AmazonWebServicesDark,
  VercelDark,
  Docker,
  GitHubDark,
  Git,
  Figma,
} from "@ridemountainpig/svgl-react";
import { SKILLS } from "@/data/about";
import type { SkillCategory } from "@/data/about";

type SvglIcon = ComponentType<{
  className?: string;
  width?: number;
  height?: number;
}>;

const SKILL_ICONS: Record<string, SvglIcon> = {
  React: ReactDark,
  "Next.js": Nextjs,
  TypeScript,
  "Tailwind CSS": TailwindCSS,
  Hono,
  PostgreSQL,
  AWS: AmazonWebServicesDark,
  Proxmox: Docker,
  Vercel: VercelDark,
  Docker,
  "GitHub Actions": GitHubDark,
  Git,
  Figma,
};

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  infra: "Infra",
  tools: "Tools",
};

const LEVEL_LABEL: Record<1 | 2 | 3, string> = {
  1: "触ったことがある",
  2: "個人開発で使った",
  3: "普段から活用",
};

function LevelBars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-[3px] items-end shrink-0">
      {([1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className={`w-[5px] rounded-sm ${i <= level ? "bg-cyan-500" : "bg-neutral-200"}`}
          style={{ height: `${8 + i * 3}px` }}
        />
      ))}
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-5 mb-7 px-0.5">
      {([1, 2, 3] as const).map((level) => (
        <div key={level} className="flex items-center gap-2">
          <LevelBars level={level} />
          <span className="text-[11px] text-neutral-400 font-mono">
            {LEVEL_LABEL[level]}
          </span>
        </div>
      ))}
    </div>
  );
}

const CATEGORIES: SkillCategory[] = ["frontend", "backend", "infra", "tools"];

export function SkillsPanel() {
  return (
    <div className="flex flex-col gap-7">
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
        表示例
      </p>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/70 border border-white/80 shadow-sm hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 max-w-50">
        <div className="flex items-center gap-2 min-w-28">
          <span className="text-[13px] font-semibold text-neutral-400  truncate">
            技術名
          </span>
        </div>
        <LevelBars level={1} />
      </div>
      <Legend />
      {CATEGORIES.map((cat) => {
        const catSkills = SKILLS.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat}>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-2.5">
              {CATEGORY_LABEL[cat]}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {catSkills.map((skill) => {
                const Icon = SKILL_ICONS[skill.name];
                return (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-2 px-3 py-2.5 max-w-60 rounded-xl bg-white/70 border border-white/80 shadow-sm hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 min-w-28">
                      {Icon && (
                        <Icon
                          className="size-[15px] shrink-0"
                          width={15}
                          height={15}
                        />
                      )}
                      <span className="text-[13px] font-semibold text-neutral-800 truncate">
                        {skill.name}
                      </span>
                    </div>
                    <LevelBars level={skill.level} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
