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
  { name: "AWS", category: "infra", level: 2 },
  { name: "Cloudflare", category: "infra", level: 2 },
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
  readonly image?: string;
  readonly colorFrom: string;
  readonly colorTo: string;
};

export const WORKS: readonly WorkItem[] = [
  {
    type: "hackathon",
    title: "Clothify",
    desc: "自撮り写真1枚でAIバーチャル試着を実現するWebサービス。アイテムを選ぶだけでコーデをシミュレーションできる。技育CAMP 2025 Vol.1 優秀賞・技育博 2025 Vol.2 DeNA賞・CARTA賞受賞。",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    url: "https://github.com/runa-devs/clothify",
    award: "優秀賞 / DeNA賞 / CARTA賞",
    image: "/clothify.webp",
    colorFrom: "#ec4899",
    colorTo: "#8b5cf6",
  },
  {
    type: "hackathon",
    title: "Yoncomic Studio",
    desc: "AIを活用した4コマ漫画作成ツール。ストーリー生成・画像生成・吹き出し追加・手書き編集をブラウザ上で完結でき、SNSへのシェアにも対応。技育CAMP 2024 Vol.18 努力賞受賞。",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "AWS S3", "Docker"],
    url: "https://github.com/runa-devs/yoncomic-studio",
    award: "努力賞",
    image: "/yoncomic-studio.webp",
    colorFrom: "#f97316",
    colorTo: "#dc2626",
  },
  {
    type: "project",
    title: "iroiro",
    desc: "画像からカラーを抽出して3D空間で可視化・パレット編集・テーマファイルとしてエクスポートできるカラーツール。K-meansクラスタリングとThree.jsを活用した個人開発プロダクト。",
    tags: ["Next.js", "Three.js", "Hono", "PostgreSQL"],
    url: "https://github.com/mintani/iroiro",
    image: "/anime-2.png",
    colorFrom: "#a855f7",
    colorTo: "#6366f1",
  },
  {
    type: "project",
    title: "このポートフォリオ",
    desc: "Next.js + Tailwind CSSで設計・実装したポートフォリオサイト。GitHub APIでブログ記事を動的取得し、Vercelで自動デプロイ。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://github.com/mintani/portfolio",
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

// ─── Certifications ───────────────────────────────────────────────────────────

export type CertificationItem = {
  readonly name: string;
  readonly issuer: string;
  readonly issued: string;
  readonly image: string;
  readonly url?: string;
};

export const CERTIFICATIONS = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "2026",
    image: "/aws-certified-cloud-practitioner.png",
    url: "https://www.credly.com/badges/aea9efc7-dadc-4b6a-a3ff-033456039065/public_url",
  },
] as const satisfies readonly CertificationItem[];
