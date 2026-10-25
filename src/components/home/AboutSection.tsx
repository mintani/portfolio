import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CalendarCheck,
  CodeXml,
  Github,
  Globe,
  GraduationCap,
  Mail,
  Server,
  UserRound,
} from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { CareerPanel } from "@/components/about/CareerPanel";
import { CodingRatioPanel } from "@/components/about/CodingRatioPanel";
import { GithubPanel } from "@/components/about/GithubPanel";
import { SkillsPanel } from "@/components/about/SkillsPanel";
import { shapeMask } from "@/components/shared/ExpressiveShape";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CERTIFICATIONS, PROFILE, SOCIAL_LINKS } from "@/data/about";
import type { GithubStats } from "@/lib/github-stats";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const CERTIFICATION = CERTIFICATIONS[0];

type LinkIcon = ComponentType<{ size?: number; className?: string }>;

const LINK_ICONS: Record<string, LinkIcon> = {
  GitHub: Github,
  X: XIcon,
  "Runa.dev": Globe,
  Email: Mail,
};

const BIO = [
  "日本工業大学データサイエンス学科の学生（28卒）です。中学のころ独学でプログラミングを始めて、今もコードを書き続けています。最近はチームで開発する機会も増えてきてフロントエンドだけでなくインフラやバックエンドなど、日々新しいことに挑戦しています。",
  "自宅サーバーを運用していて、サーバーに友人と遊ぶためのゲームサーバーを立てたり、ウェブサイトをデプロイしたり、このサイトも自宅サーバーから配信しています。",
];

/** One row of the profile list: tonal icon, small label, then the value. */
function FactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 px-4 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-on-surface-variant">{label}</p>
        <div className="mt-0.5 text-[15px] leading-snug text-on-surface">
          {children}
        </div>
      </div>
    </li>
  );
}

/** About: bio with link chips, profile card, skills, code stats and career. */
export function AboutSection({ github }: { github: GithubStats | null }) {
  return (
    <section id="about-section" className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Bio and profile card ── */}
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading title="About" icon={UserRound} />
            <div className="mt-6 max-w-[60ch] space-y-4 text-[15px] leading-[1.9] text-on-surface-variant sm:text-base">
              {BIO.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = LINK_ICONS[link.label];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.external ? EXTERNAL_LINK_PROPS : {})}
                      className="state-layer inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border border-outline-variant pr-4 pl-3 text-sm font-medium text-on-surface"
                    >
                      {Icon ? (
                        <Icon size={18} className="text-primary" />
                      ) : null}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <div className="rounded-[28px] bg-surface-container-low p-2">
              <div className="flex items-center gap-4 px-4 pt-4 pb-2">
                <Image
                  src={PROFILE.avatar}
                  alt=""
                  width={64}
                  height={64}
                  style={shapeMask("cookie")}
                  className="size-16 shrink-0 bg-surface-container-lowest object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[22px] leading-7 font-medium text-on-surface">
                    {PROFILE.name}
                  </p>
                  <p className="font-mono text-sm text-on-surface-variant">
                    {PROFILE.handle}
                  </p>
                </div>
              </div>

              <ul>
                <FactItem icon={GraduationCap} label="School">
                  {PROFILE.school}
                </FactItem>
                <FactItem icon={CalendarCheck} label="Graduation">
                  <span className="tabular-nums">{PROFILE.graduation}</span>
                  <span className="text-on-surface-variant">
                    {PROFILE.graduationNote}
                  </span>
                </FactItem>
                <FactItem icon={CodeXml} label="Coding since">
                  <span className="tabular-nums">{PROFILE.codingSince}</span>
                  <span className="text-on-surface-variant">
                    {" · "}
                    {PROFILE.codingSinceNote}
                  </span>
                </FactItem>
                <FactItem icon={Server} label="Home lab">
                  {PROFILE.homeLab}
                </FactItem>
              </ul>

              <a
                href={CERTIFICATION.url}
                {...EXTERNAL_LINK_PROPS}
                className="state-layer flex items-center gap-4 rounded-[20px] px-4 py-3 text-on-surface"
              >
                <Image
                  src={CERTIFICATION.image}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-on-surface-variant">
                    Certification · {CERTIFICATION.issued}
                  </span>
                  <span className="mt-0.5 block text-[15px] leading-snug">
                    {CERTIFICATION.name}
                  </span>
                </span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-on-surface-variant"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mt-16 lg:mt-20">
          <SkillsPanel />
        </div>

        {/* ── Code ratio, languages and contributions ── */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <CodingRatioPanel />
          {github ? <GithubPanel stats={github} /> : null}
        </div>

        {/* ── Career ── */}
        <div className="mt-16 lg:mt-20">
          <CareerPanel />
        </div>
      </div>
    </section>
  );
}
