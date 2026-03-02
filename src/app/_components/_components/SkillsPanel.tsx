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

const SKILL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; width?: number; height?: number }>
> = {
  React: ReactDark,
  "Next.js": Nextjs,
  TypeScript: TypeScript,
  "Tailwind CSS": TailwindCSS,
  Hono: Hono,
  PostgreSQL: PostgreSQL,
  AWS: AmazonWebServicesDark,
  Proxmox: Docker,
  Vercel: VercelDark,
  Docker: Docker,
  "GitHub Actions": GitHubDark,
  Git: Git,
  Figma: Figma,
};

export function SkillsPanel() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {SKILLS.map((skill) => {
        const Icon = SKILL_ICONS[skill.name];
        return (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 border border-white/70 shadow-sm backdrop-blur-sm hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
          >
            {Icon && (
              <Icon className="w-4 h-4 shrink-0" width={16} height={16} />
            )}
            <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
