import type { ComponentType, SVGProps } from "react";
import { ExternalLink, Github, Mail, Globe } from "lucide-react";
import { XLight } from "@ridemountainpig/svgl-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ColorScheme = {
  border: string;
  text: string;
  bg: string;
  iconBg: string;
  iconText: string;
};

type SocialLink = {
  href: string;
  label: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  color: ColorScheme;
};

// ─── Data — hoisted outside the component (rendering-hoist-jsx) ─────────────

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://github.com/mintani",
    label: "GitHub",
    description: "コードとプロジェクト",
    icon: Github,
    color: {
      border: "hover:border-neutral-400/60",
      text: "hover:text-neutral-800",
      bg: "hover:bg-neutral-50/70",
      iconBg: "bg-neutral-100/80",
      iconText: "text-neutral-700",
    },
  },
  {
    href: "https://twitter.com/_mint76",
    label: "Twitter / X",
    description: "近況・技術メモ",
    icon: XLight as ComponentType<SVGProps<SVGSVGElement> & { size?: number }>,
    color: {
      border: "hover:border-sky-400/60",
      text: "hover:text-sky-700",
      bg: "hover:bg-sky-50/70",
      iconBg: "bg-sky-100/80",
      iconText: "text-sky-600",
    },
  },
  {
    href: "https://runa.dev",
    label: "Runa.dev",
    description: "作品・プロジェクト一覧",
    icon: Globe,
    color: {
      border: "hover:border-violet-400/60",
      text: "hover:text-violet-700",
      bg: "hover:bg-violet-50/70",
      iconBg: "bg-violet-100/80",
      iconText: "text-violet-600",
    },
  },
  {
    href: "mailto:mi.2005.sub@gmail.com",
    label: "Email",
    description: "お仕事・コラボのご相談",
    icon: Mail,
    color: {
      border: "hover:border-amber-400/60",
      text: "hover:text-amber-700",
      bg: "hover:bg-amber-50/70",
      iconBg: "bg-amber-100/80",
      iconText: "text-amber-600",
    },
  },
] as const;

// ─── Shared link attributes ──────────────────────────────────────────────────

const EXTERNAL_LINK_ATTRS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

// ─── Sub-component ───────────────────────────────────────────────────────────

function SocialLinkItem({
  link,
  compact,
}: {
  link: SocialLink;
  compact: boolean;
}) {
  const { href, label, description, icon: Icon, color } = link;
  const isExternal = !href.startsWith("mailto:");

  if (compact) {
    return (
      <a
        href={href}
        {...(isExternal ? EXTERNAL_LINK_ATTRS : {})}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-white/40 border border-white/60 hover:-translate-y-0.5 ${color.border} ${color.text} ${color.bg}`}
      >
        <div
          className={`shrink-0 size-8 rounded-lg ${color.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={15} className={color.iconText} />
        </div>
        <span className="font-poppins font-bold text-sm text-neutral-800 flex-1">
          {label}
        </span>
        <ExternalLink
          size={13}
          className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity"
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      {...(isExternal ? EXTERNAL_LINK_ATTRS : {})}
      className={`group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md ${color.border} ${color.text} ${color.bg}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
      <div
        className={`relative shrink-0 size-10 rounded-xl ${color.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={18} className={color.iconText} />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-poppins font-bold text-sm text-neutral-800">
          {label}
        </span>
        <span className="font-mono text-xs text-neutral-400 truncate">
          {description}
        </span>
      </div>
      <ExternalLink
        size={14}
        className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
      />
    </a>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function SocialPanel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        {SOCIAL_LINKS.map((link) => (
          <SocialLinkItem key={link.href} link={link} compact />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_LINKS.map((link) => (
          <SocialLinkItem key={link.href} link={link} compact={false} />
        ))}
      </div>
    </div>
  );
}
