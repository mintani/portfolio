import { ExternalLink } from "lucide-react";
import { SOCIALS } from "@/data/about";

export function SocialPanel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 ${s.hoverBorder} ${s.hoverText} ${s.hoverBg}`}
          >
            <div
              className={`shrink-0 w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <s.icon size={15} className={s.iconColor} />
            </div>
            <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
              {s.label}
            </span>
            <ExternalLink
              size={13}
              className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs tracking-widest uppercase mb-1 text-neutral-400/60">
        {"// 連絡先"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md ${s.hoverBorder} ${s.hoverText} ${s.hoverBg}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
            <div
              className={`relative shrink-0 w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
            >
              <s.icon size={18} className={s.iconColor} />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-poppins font-bold text-sm text-neutral-800">
                {s.label}
              </span>
              <span className="font-mono text-xs text-neutral-400 truncate">
                {s.desc}
              </span>
            </div>
            <ExternalLink
              size={14}
              className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
