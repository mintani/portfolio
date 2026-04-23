// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillCategory = "frontend" | "backend" | "infra" | "tools";

export type SkillItem = {
  readonly name: string;
  readonly category: SkillCategory;
  readonly level: 1 | 2 | 3;
};

export const SKILLS = [
  { name: "React", category: "frontend", level: 3 },
  { name: "Next.js", category: "frontend", level: 3 },
  { name: "TypeScript", category: "frontend", level: 3 },
  { name: "Tailwind CSS", category: "frontend", level: 3 },
  { name: "Hono", category: "backend", level: 2 },
  { name: "PostgreSQL", category: "backend", level: 2 },
  { name: "AWS", category: "infra", level: 1 },
  { name: "Proxmox", category: "infra", level: 1 },
  { name: "Vercel", category: "infra", level: 2 },
  { name: "Docker", category: "infra", level: 2 },
  { name: "GitHub Actions", category: "infra", level: 2 },
  { name: "Git", category: "tools", level: 3 },
  { name: "Figma", category: "tools", level: 1 },
] as const satisfies readonly SkillItem[];

// ─── Career ───────────────────────────────────────────────────────────────────

export type CareerItem = {
  readonly year: string;
  readonly title: string;
  readonly place: string;
  readonly desc: string;
  readonly tags: readonly string[];
};

export const CAREER = [
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
    title: "プログラミングを始める",
    place: "中学生時代",
    desc: "Pythonに興味を持ち独学でコードを書き始める。それ以来ずっとコードを書いている。",
    tags: ["Python"],
  },
] as const satisfies readonly CareerItem[];

// ─── Works ────────────────────────────────────────────────────────────────────

export type WorkItem = {
  readonly type: "hackathon" | "project";
  readonly title: string;
  readonly desc: string;
  readonly tags: readonly string[];
  readonly url?: string;
  readonly award?: string;
  readonly colorFrom: string;
  readonly colorTo: string;
};

export const WORKS: readonly WorkItem[] = [
  {
    type: "hackathon",
    title: "技育CAMP ハッカソン",
    desc: "チームでWebサービスを開発。HonoとPostgreSQLのAPIバックエンドを担当し企業賞を受賞。",
    tags: ["Hono", "PostgreSQL", "Docker", "React"],
    url: "https://github.com/mintani",
    award: "企業賞",
    colorFrom: "#06b6d4",
    colorTo: "#0891b2",
  },
  {
    type: "hackathon",
    title: "技育博 出展",
    desc: "個人プロジェクトを技育博に出展。Next.jsで作ったフルスタックWebアプリ。",
    tags: ["Next.js", "TypeScript", "AWS"],
    url: "https://github.com/mintani",
    award: "優秀賞",
    colorFrom: "#8b5cf6",
    colorTo: "#6d28d9",
  },
  {
    type: "project",
    title: "このポートフォリオ",
    desc: "Next.js + Tailwind CSSで作ったポートフォリオ。GitHub Actionsで自動デプロイ。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://github.com/mintani",
    colorFrom: "#10b981",
    colorTo: "#059669",
  },
] as const satisfies readonly WorkItem[];

// ─── Projects (About section compact view) ────────────────────────────────────

export type ProjectItem = {
  readonly name: string;
  readonly desc: string;
  readonly tags: readonly string[];
  readonly url?: string;
};

export const PROJECTS = [
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
] as const satisfies readonly ProjectItem[];
