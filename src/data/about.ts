import type { SvglComponentName } from "@ridemountainpig/svgl-react";
import { XLight } from "@ridemountainpig/svgl-react";
import { Github, Mail, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillGroup = {
  category: string;
  color: string;
  borderColor: string;
  bgColor: string;
  dotColor: string;
  badgeHover: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    color: "text-sky-600",
    borderColor: "border-sky-400/30",
    bgColor: "bg-sky-400/8",
    dotColor: "bg-sky-500",
    badgeHover: "hover:bg-sky-50/80 hover:border-sky-400/60 hover:text-sky-700",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    color: "text-emerald-600",
    borderColor: "border-emerald-400/30",
    bgColor: "bg-emerald-400/8",
    dotColor: "bg-emerald-500",
    badgeHover:
      "hover:bg-emerald-50/80 hover:border-emerald-400/60 hover:text-emerald-700",
    items: ["Hono", "PostgreSQL"],
  },
  {
    category: "Infrastructure",
    color: "text-violet-600",
    borderColor: "border-violet-400/30",
    bgColor: "bg-violet-400/8",
    dotColor: "bg-violet-500",
    badgeHover:
      "hover:bg-violet-50/80 hover:border-violet-400/60 hover:text-violet-700",
    items: ["AWS", "Proxmox", "Vercel", "Docker", "GitHub Actions"],
  },
  {
    category: "Tools & Design",
    color: "text-amber-600",
    borderColor: "border-amber-400/30",
    bgColor: "bg-amber-400/8",
    dotColor: "bg-amber-500",
    badgeHover:
      "hover:bg-amber-50/80 hover:border-amber-400/60 hover:text-amber-700",
    items: ["Git", "Figma"],
  },
];

// ─── Career ───────────────────────────────────────────────────────────────────

export type CareerItem = {
  year: string;
  title: string;
  place: string;
  desc: string;
  tags: string[];
};

export const CAREER: CareerItem[] = [
  {
    year: "2026",
    title: "仕事探し中-個人開発",
    place: "大学生/個人開発者",
    desc: "",
    tags: ["個人開発", "フリーランス"],
  },
  {
    year: "2024",
    title: "サポーターズ/ハッカソン出場",
    place: "独学集中期",
    desc: "技育CAMPハッカソンや技育博に出場して、チームで開発。",
    tags: ["企業賞", "優秀賞"],
  },
  {
    year: "2017",
    title: "非エンジニア期間",
    place: "中学生時代",
    desc: "マイニングブームがあり中学生ながらその波に乗る。仮想通貨とプログラミングに興味を持ち出した。",
    tags: ["Crypto", "Python"],
  },
];

// ─── Learning ─────────────────────────────────────────────────────────────────

export type LearningItem = {
  name: string;
  pct: number;
  color: string;
  glowColor: string;
  phase: string;
};

export const LEARNING: LearningItem[] = [
  {
    name: "TypeScript",
    pct: 75,
    color: "bg-blue-400",
    glowColor: "rgba(59,130,246,0.5)",
    phase: "まあまあ",
  },
  {
    name: " Python",
    pct: 60,
    color: "bg-yellow-400",
    glowColor: "rgba(192,132,252,0.5)",
    phase: "ちょっとしたものなら",
  },
  {
    name: "Go",
    pct: 25,
    color: "bg-cyan-400",
    glowColor: "rgba(34,211,238,0.5)",
    phase: "入門フェーズ",
  },
  {
    name: "React",
    pct: 70,
    color: "bg-blue-400",
    glowColor: "rgba(59,130,246,0.5)",
    phase: "使える",
  },
  {
    name: "Tailwind CSS",
    pct: 85,
    color: "bg-cyan-400",
    glowColor: "rgba(34,211,238,0.5)",
    phase: "得意",
  },
];

// ─── Socials ──────────────────────────────────────────────────────────────────

export type SocialItem = {
  label: string;
  href: string;
  icon:
    | LucideIcon
    | ComponentType<{ size?: number; className?: string }>
    | SvglComponentName;
  hoverBorder: string;
  hoverText: string;
  hoverBg: string;
  iconBg: string;
  iconColor: string;
  iconSize?: number;
  desc: string;
};

export const SOCIALS: SocialItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/mintani",
    icon: Github,
    hoverBorder: "hover:border-neutral-400/60",
    hoverText: "hover:text-neutral-800",
    hoverBg: "hover:bg-neutral-50/70",
    iconBg: "bg-neutral-100/80",
    iconColor: "text-neutral-700",
    desc: "コードとプロジェクト",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/_mint76",
    icon: XLight,
    hoverBorder: "hover:border-sky-400/60",
    hoverText: "hover:text-sky-700",
    hoverBg: "hover:bg-sky-50/70",
    iconBg: "bg-sky-100/80",
    iconColor: "text-sky-600",
    iconSize: 24,
    desc: "近況・技術メモ",
  },
  {
    label: "Portfolio",
    href: "#",
    icon: Globe,
    hoverBorder: "hover:border-violet-400/60",
    hoverText: "hover:text-violet-700",
    hoverBg: "hover:bg-violet-50/70",
    iconBg: "bg-violet-100/80",
    iconColor: "text-violet-600",
    desc: "作品・プロジェクト一覧",
  },
  {
    label: "Email",
    href: "mailto:mi.2005.sub@gmail.com",
    icon: Mail,
    hoverBorder: "hover:border-amber-400/60",
    hoverText: "hover:text-amber-700",
    hoverBg: "hover:bg-amber-50/70",
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    desc: "お仕事・コラボのご相談",
  },
];
