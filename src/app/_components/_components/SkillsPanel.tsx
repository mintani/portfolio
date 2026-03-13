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

// ─── Icon mapping ────────────────────────────────────────────────────────────

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

// ─── Component ───────────────────────────────────────────────────────────────

export function SkillsPanel() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {SKILLS.map((skill) => {
        const Icon = SKILL_ICONS[skill.name];
        return (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/50 border border-white/70 shadow-sm backdrop-blur-sm hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
          >
            {Icon ? (
              <Icon className="size-4 shrink-0" width={16} height={16} />
            ) : null}
            <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
