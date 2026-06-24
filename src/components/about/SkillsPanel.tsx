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

// Slanted parallelogram bars; cyan up to the level, gray for the rest.
function LevelMeter({ level }: { level: Level }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {LEVELS.map((i) => (
        <span
          key={i}
          className={`h-4 w-1.5 -skew-x-12 rounded-[2px] ${i <= level ? "bg-cyan-500" : "bg-neutral-300"}`}
        />
      ))}
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {LEVELS.map((level) => (
        <div key={level} className="flex items-center gap-1.5">
          <LevelMeter level={level} />
          <span className="font-mono text-[11px] text-neutral-400">
            {LEVEL_LABEL[level]}
          </span>
        </div>
      ))}
    </div>
  );
}

function CategoryHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 shrink-0">
        {label}
      </span>
      <span className="h-px flex-1 bg-neutral-200/70" />
    </div>
  );
}

function SkillCard({ skill }: { skill: SkillItem }) {
  const Icon = SKILL_ICONS[skill.name];
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/70 border border-white/80 shadow-sm hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-2 min-w-0">
        {Icon && <Icon className="size-4 shrink-0" width={16} height={16} />}
        <span className="font-poppins text-sm font-semibold text-neutral-800 truncate">
          {skill.name}
        </span>
      </div>
      <LevelMeter level={skill.level} />
    </div>
  );
}

export function SkillsPanel() {
  return (
    <div className="flex flex-col gap-5">
      <Legend />
      {CATEGORIES.map(({ key, label }) => {
        const catSkills = SKILLS.filter((s) => s.category === key);
        if (catSkills.length === 0) return null;
        return (
          <div key={key} className="flex flex-col gap-2.5">
            <CategoryHeader label={label} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {catSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
