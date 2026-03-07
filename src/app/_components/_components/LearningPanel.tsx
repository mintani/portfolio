import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/about";

// ─── Shared link attributes ──────────────────────────────────────────────────

const EXTERNAL_LINK_ATTRS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function LearningPanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {PROJECTS.map((project) => (
        <a
          key={project.name}
          href={project.url ?? "#"}
          {...EXTERNAL_LINK_ATTRS}
          className="group flex flex-col gap-2 p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 hover:border-white/80 transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-poppins font-bold text-sm text-neutral-800 leading-snug">
              {project.name}
            </span>
            <ArrowUpRight
              size={14}
              className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
            />
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {project.desc}
          </p>
          {project.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100/80 border border-neutral-200/60 text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </a>
      ))}
    </div>
  );
}
