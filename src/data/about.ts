// ─── Profile ─────────────────────────────────────────────────────────────────

export type ProfileFacts = {
  readonly name: string;
  readonly handle: string;
  readonly school: string;
  readonly graduation: string;
  readonly graduationNote: string;
  readonly codingSince: string;
  readonly codingSinceNote: string;
  readonly homeLab: string;
  readonly avatar: string;
};

/** Facts listed in the About spec sheet. */
export const PROFILE = {
  name: "MinTani",
  handle: "@mintanaka",
  school: "日本工業大学 データサイエンス学科",
  graduation: "2028",
  graduationNote: "（28卒）",
  codingSince: "2017",
  codingSinceNote: "Python から独学で",
  homeLab: "自宅サーバー（Proxmox）— このサイトもここから配信",
  avatar: "/mint.png",
} as const satisfies ProfileFacts;

// ─── Social links ────────────────────────────────────────────────────────────

export type SocialLinkItem = {
  readonly href: string;
  readonly label: string;
  /** Opens in a new tab. mailto links stay in the same tab. */
  readonly external: boolean;
};

export const SOCIAL_LINKS = [
  { href: "https://github.com/mintani", label: "GitHub", external: true },
  { href: "https://twitter.com/_mint76", label: "X", external: true },
  { href: "https://runa.dev", label: "Runa.dev", external: true },
  { href: "mailto:mi.2005.sub@gmail.com", label: "Email", external: false },
] as const satisfies readonly SocialLinkItem[];

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
    year: "2026～現在",
    title: "個人開発",
    place: "大学生・個人開発者",
    desc: "趣味の個人開発も継続しつつ業務を行っています。",
    tags: ["個人開発", "フリーランス"],
  },
  {
    year: "2024",
    title: "ハッカソン出場",
    place: "サポーターズ / 技育CAMP",
    desc: "技育CAMPハッカソン・技育博に複数回出場し、チーム開発を経験。企業賞・優秀賞を受賞しました",
    tags: ["企業賞", "優秀賞"],
  },
  {
    year: "2017",
    title: "プログラミングを始める",
    place: "中学生時代",
    desc: "Pythonに興味を持ち独学でコードを書き始める。",
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
  },
  {
    type: "hackathon",
    title: "Yoncomic Studio",
    desc: "AIを活用した4コマ漫画作成ツール。ストーリー生成・画像生成・吹き出し追加・手書き編集をブラウザ上で完結でき、SNSへのシェアにも対応。技育CAMP 2024 Vol.18 努力賞受賞。",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "AWS S3", "Docker"],
    url: "https://github.com/runa-devs/yoncomic-studio",
    award: "努力賞",
    image: "/yoncomic-studio.webp",
  },
  {
    type: "project",
    title: "iroiro",
    desc: "画像からカラーを抽出して3D空間で可視化・パレット編集・テーマファイルとしてエクスポートできるカラーツール。K-meansクラスタリングとThree.jsを活用した個人開発プロダクト。",
    tags: ["Next.js", "Three.js", "Hono", "PostgreSQL"],
    url: "https://github.com/mintani/iroiro",
    image: "/scaled2x.png",
  },
  {
    type: "project",
    title: "このポートフォリオ",
    desc: "Next.js + Tailwind CSSで設計・実装したポートフォリオサイト。GitHub APIでブログ記事を動的取得し、Vercelで自動デプロイ。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://github.com/mintani/portfolio",
    image: "/portfolio.webp",
  },
] as const satisfies readonly WorkItem[];

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

// ─── Coding ratio ───────────────────────────────────────────────────────────

export type CodingRatioItem = {
  readonly label: string;
  readonly weight: number;
};

/** Rough share of the code I write day to day. Percentages derive from weight. */
export const CODING_RATIO = [
  { label: "Frontend", weight: 4 },
  { label: "Backend", weight: 3 },
  { label: "Infra", weight: 2 },
  { label: "Design", weight: 1 },
] as const satisfies readonly CodingRatioItem[];
