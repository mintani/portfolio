import { Github, Twitter, Mail, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    name: "Rust",
    pct: 35,
    color: "bg-orange-400",
    glowColor: "rgba(251,146,60,0.5)",
    phase: "基礎習得中",
  },
  {
    name: "Three.js / WebGL",
    pct: 50,
    color: "bg-purple-400",
    glowColor: "rgba(192,132,252,0.5)",
    phase: "実践投入済み",
  },
  {
    name: "Go",
    pct: 25,
    color: "bg-cyan-400",
    glowColor: "rgba(34,211,238,0.5)",
    phase: "入門フェーズ",
  },
  {
    name: "AI / LLM API 連携",
    pct: 70,
    color: "bg-emerald-400",
    glowColor: "rgba(52,211,153,0.5)",
    phase: "本番運用中",
  },
  {
    name: "WebAssembly",
    pct: 20,
    color: "bg-pink-400",
    glowColor: "rgba(244,114,182,0.5)",
    phase: "調査中",
  },
];

// ─── Socials ──────────────────────────────────────────────────────────────────

export type SocialItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  hoverBorder: string;
  hoverText: string;
  hoverBg: string;
  iconBg: string;
  iconColor: string;
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
    href: "https://twitter.com",
    icon: Twitter,
    hoverBorder: "hover:border-sky-400/60",
    hoverText: "hover:text-sky-700",
    hoverBg: "hover:bg-sky-50/70",
    iconBg: "bg-sky-100/80",
    iconColor: "text-sky-600",
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
    href: "mailto:example@example.com",
    icon: Mail,
    hoverBorder: "hover:border-amber-400/60",
    hoverText: "hover:text-amber-700",
    hoverBg: "hover:bg-amber-50/70",
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    desc: "お仕事・コラボのご相談",
  },
];
