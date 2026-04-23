import type { ComponentType, SVGProps } from "react";
import { ExternalLink, Github, Mail, Globe } from "lucide-react";

const XIcon = ({
  size = 16,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.858L1.254 2.25H8.08l4.264 5.632 5.9-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  color: ColorScheme;
};

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://github.com/mintani",
    label: "GitHub",
    icon: Github,
    color: {
      border: "hover:border-neutral-400/60",
      text: "hover:text-neutral-800",
      bg: "hover:bg-neutral-100/60",
      iconBg: "bg-neutral-100/80",
      iconText: "text-neutral-700",
    },
  },
  {
    href: "https://twitter.com/_mint76",
    label: "X / Twitter",
    icon: XIcon as ComponentType<SVGProps<SVGSVGElement> & { size?: number }>,
    color: {
      border: "hover:border-sky-300/60",
      text: "hover:text-sky-700",
      bg: "hover:bg-sky-50/60",
      iconBg: "bg-sky-100/80",
      iconText: "text-sky-600",
    },
  },
  {
    href: "https://runa.dev",
    label: "Runa.dev",
    icon: Globe,
    color: {
      border: "hover:border-violet-300/60",
      text: "hover:text-violet-700",
      bg: "hover:bg-violet-50/60",
      iconBg: "bg-violet-100/80",
      iconText: "text-violet-600",
    },
  },
  {
    href: "mailto:mi.2005.sub@gmail.com",
    label: "Email",
    icon: Mail,
    color: {
      border: "hover:border-amber-300/60",
      text: "hover:text-amber-700",
      bg: "hover:bg-amber-50/60",
      iconBg: "bg-amber-100/80",
      iconText: "text-amber-600",
    },
  },
] as const;

const EXTERNAL_LINK_ATTRS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

// 2×2 square grid card (compact / Connect panel)
function GridCard({ link }: { link: SocialLink }) {
  const { href, label, icon: Icon, color } = link;
  const isExternal = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isExternal ? EXTERNAL_LINK_ATTRS : {})}
      className={`group relative flex flex-col p-2 items-center justify-center gap-2.5 rounded-2xl bg-white/50 border border-white/70 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${color.bg} ${color.border} overflow-hidden`}
    >
      <div
        className={`size-11 rounded-xl ${color.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon size={20} className={color.iconText} />
      </div>
      <div className="flex flex-col items-center gap-1 px-2">
        <span
          className={`font-poppins font-bold text-xs text-neutral-700 ${color.text} transition-colors duration-200 leading-none`}
        >
          {label}
        </span>
      </div>
    </a>
  );
}

// Full-width row card (non-compact)
function RowCard({ link }: { link: SocialLink }) {
  const { href, label, icon: Icon, color } = link;
  const isExternal = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isExternal ? EXTERNAL_LINK_ATTRS : {})}
      className={`group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/40 border border-white/60 backdrop-blur-md shadow-sm hover:shadow-md ${color.border} ${color.text} ${color.bg}`}
    >
      <div
        className={`relative shrink-0 size-10 rounded-xl ${color.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={18} className={color.iconText} />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-poppins font-bold text-sm text-neutral-800">
          {label}
        </span>
      </div>
      <ExternalLink
        size={14}
        className="shrink-0 text-neutral-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
      />
    </a>
  );
}

export function SocialPanel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="grid grid-cols-2 gap-2 flex-1 min-h-0"
        style={{ gridTemplateRows: "1fr 1fr" }}
      >
        {SOCIAL_LINKS.map((link) => (
          <GridCard key={link.href} link={link} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {SOCIAL_LINKS.map((link) => (
        <RowCard key={link.href} link={link} />
      ))}
    </div>
  );
}
