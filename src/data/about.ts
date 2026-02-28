// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillItem = {
  name: string;
  category: "frontend" | "backend" | "infra" | "tools";
};

export const SKILLS: SkillItem[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Hono", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "AWS", category: "infra" },
  { name: "Proxmox", category: "infra" },
  { name: "Vercel", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "GitHub Actions", category: "infra" },
  { name: "Git", category: "tools" },
  { name: "Figma", category: "tools" },
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
    title: "仕事探し中 / 個人開発",
    place: "大学生・個人開発者",
    desc: "就活しながらもWebサービス開発を継続。お仕事・インターンのご連絡はXのDMかメールへ。",
    tags: ["個人開発", "フリーランス"],
  },
  {
    year: "2024",
    title: "ハッカソン出場",
    place: "サポーターズ / 技育CAMP",
    desc: "技育CAMPハッカソン・技育博に複数回出場し、チーム開発を経験。企業賞・優秀賞を受賞。",
    tags: ["企業賞", "優秀賞"],
  },
  {
    year: "2017",
    title: "プログラミングと出会う",
    place: "中学生時代",
    desc: "マイニングブームがきっかけで仮想通貨・Pythonに興味を持ち、独学でコードを書き始める。",
    tags: ["Crypto", "Python"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectItem = {
  name: string;
  desc: string;
  tags: string[];
  url?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    name: "このポートフォリオ",
    desc: "Next.js + Tailwind CSS で構築したポートフォリオサイト。GitHub Actionsで自動デプロイ。",
    tags: ["Next.js", "TypeScript", "Vercel"],
    url: "https://github.com/mintani",
  },
  {
    name: "ハッカソンプロジェクト",
    desc: "技育CAMPで企業賞を受賞したチームプロダクト。Hono + PostgreSQL によるAPIサーバー。",
    tags: ["Hono", "PostgreSQL", "Docker"],
    url: "https://github.com/mintani",
  },
  {
    name: "個人Webサービス",
    desc: "個人で企画・設計・実装まで一人で行ったフルスタックWebアプリ。",
    tags: ["React", "AWS", "TypeScript"],
    url: "https://github.com/mintani",
  },
];
