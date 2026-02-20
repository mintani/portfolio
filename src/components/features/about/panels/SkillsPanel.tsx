"use client";

import { SKILLS } from "@/data/about";
import { Monitor, Server, Cloud, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  Infrastructure: Cloud,
  "Tools & Design": Wrench,
};

export function SkillsPanel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {SKILLS.map((group) => {
        const Icon = CATEGORY_ICONS[group.category] ?? Wrench;
        return (
          <div
            key={group.category}
            className={`flex flex-col gap-3 p-4 rounded-xl border ${group.borderColor} ${group.bgColor} backdrop-blur-sm`}
          >
            {/* Category header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center bg-white/60 shadow-sm`}
                >
                  <Icon size={12} className={group.color} />
                </div>
                <span
                  className={`font-mono text-xs font-bold tracking-widest uppercase ${group.color}`}
                >
                  {group.category}
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-400 bg-white/50 px-2 py-0.5 rounded-full">
                {group.items.length}
              </span>
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`font-mono text-xs px-2.5 py-1 rounded-md bg-white/60 border border-white/70 text-neutral-600 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-default ${group.badgeHover}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
