import { ExternalLink, Github, Mail, Globe } from "lucide-react";
import { XLight } from "@ridemountainpig/svgl-react";

export function SocialPanel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        {/* GitHub */}
        <a
          href="https://github.com/mintani"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 hover:border-neutral-400/60 hover:text-neutral-800 hover:bg-neutral-50/70"
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Github size={15} className="text-neutral-700" />
          </div>
          <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
            GitHub
          </span>
          <ExternalLink
            size={13}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
          />
        </a>

        {/* Twitter / X */}
        <a
          href="https://twitter.com/_mint76"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-sky-700 hover:bg-sky-50/70"
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-sky-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <XLight width={15} height={15} className="text-sky-600" />
          </div>
          <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
            Twitter / X
          </span>
          <ExternalLink
            size={13}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
          />
        </a>

        {/* Runa.dev */}
        <a
          href="https://runa.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 hover:border-violet-400/60 hover:text-violet-700 hover:bg-violet-50/70"
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-violet-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Globe size={15} className="text-violet-600" />
          </div>
          <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
            Runa.dev
          </span>
          <ExternalLink
            size={13}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
          />
        </a>

        {/* Email */}
        <a
          href="mailto:mi.2005.sub@gmail.com"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 hover:border-amber-400/60 hover:text-amber-700 hover:bg-amber-50/70"
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Mail size={15} className="text-amber-600" />
          </div>
          <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
            Email
          </span>
          <ExternalLink
            size={13}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
          />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* GitHub */}
        <a
          href="https://github.com/mintani"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-neutral-400/60 hover:text-neutral-800 hover:bg-neutral-50/70"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-neutral-100/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Github size={18} className="text-neutral-700" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="font-poppins font-bold text-sm text-neutral-800">
              GitHub
            </span>
            <span className="font-mono text-xs text-neutral-400 truncate">
              コードとプロジェクト
            </span>
          </div>
          <ExternalLink
            size={14}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
          />
        </a>

        {/* Twitter / X */}
        <a
          href="https://twitter.com/_mint76"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-sky-400/60 hover:text-sky-700 hover:bg-sky-50/70"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-sky-100/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <XLight width={18} height={18} className="text-sky-600" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="font-poppins font-bold text-sm text-neutral-800">
              Twitter / X
            </span>
            <span className="font-mono text-xs text-neutral-400 truncate">
              近況・技術メモ
            </span>
          </div>
          <ExternalLink
            size={14}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
          />
        </a>

        {/* Runa.dev */}
        <a
          href="https://runa.dev"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-violet-400/60 hover:text-violet-700 hover:bg-violet-50/70"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-violet-100/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Globe size={18} className="text-violet-600" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="font-poppins font-bold text-sm text-neutral-800">
              Runa.dev
            </span>
            <span className="font-mono text-xs text-neutral-400 truncate">
              作品・プロジェクト一覧
            </span>
          </div>
          <ExternalLink
            size={14}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
          />
        </a>

        {/* Email */}
        <a
          href="mailto:mi.2005.sub@gmail.com"
          className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-amber-400/60 hover:text-amber-700 hover:bg-amber-50/70"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Mail size={18} className="text-amber-600" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="font-poppins font-bold text-sm text-neutral-800">
              Email
            </span>
            <span className="font-mono text-xs text-neutral-400 truncate">
              お仕事・コラボのご相談
            </span>
          </div>
          <ExternalLink
            size={14}
            className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
          />
        </a>
      </div>
    </div>
  );
}
