import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CodeXml,
  Github,
  Globe,
  Mail,
  Server,
} from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { CareerPanel } from "@/components/about/CareerPanel";
import { CodingRatioPanel } from "@/components/about/CodingRatioPanel";
import { SkillsPanel } from "@/components/about/SkillsPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CERTIFICATIONS, PROFILE, SOCIAL_LINKS } from "@/data/about";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const CERTIFICATION = CERTIFICATIONS[0];

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

const UNDERLINE =
  "underline underline-offset-4 decoration-rule group-hover:decoration-accent";

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

/** One labelled row of the profile spec sheet. */
function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3">
      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 self-center">
        {label}
      </dt>
      <dd className="text-sm text-ink min-w-0">{children}</dd>
    </div>
  );
}

/** About: profile diptych, skills, code ratio and career. */
export function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full relative z-30 overflow-hidden bg-paper-2 py-16 lg:py-24"
    >
      {/* Background decoration: one icon top-right, one bottom-left, alternating down the page */}
      <CodeXml
        aria-hidden
        strokeWidth={0.5}
        className="pointer-events-none absolute z-0 -top-[8vw] -right-[10vw] size-[56vw] lg:size-[40rem] lg:-top-44 lg:-right-32 rotate-12 text-accent opacity-[0.1]"
      />
      <Server
        aria-hidden
        strokeWidth={0.5}
        className="pointer-events-none absolute z-0 -bottom-[10vw] -left-[12vw] size-[50vw] lg:size-[34rem] lg:-bottom-40 lg:-left-32 -rotate-12 text-ink-2 opacity-[0.1]"
      />

      <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Profile diptych ── */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className="lg:col-span-7 min-w-0">
            <SectionHeading title="About" />
            <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-[1.9] text-ink-2 max-w-[60ch]">
              {BIO.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = LINK_ICONS[link.label];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.external ? EXTERNAL_LINK_PROPS : {})}
                      className={`group inline-flex min-h-11 items-center gap-2 font-display text-sm font-medium text-ink whitespace-nowrap ${FOCUS_RING}`}
                    >
                      {Icon ? (
                        <Icon
                          size={18}
                          className="text-ink-2 transition-colors duration-200 group-hover:text-accent"
                        />
                      ) : null}
                      <span className={UNDERLINE}>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-5 min-w-0">
            <dl className="divide-y divide-rule border-y border-rule">
              <SpecRow label="Name">
                <span className="flex items-center gap-3">
                  <Image
                    src={PROFILE.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-lg border border-rule object-cover object-top"
                  />
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-display font-semibold">
                      {PROFILE.name}
                    </span>
                    <span className="font-mono text-xs text-ink-3">
                      {PROFILE.handle}
                    </span>
                  </span>
                </span>
              </SpecRow>

              <SpecRow label="School">{PROFILE.school}</SpecRow>

              <SpecRow label="Graduation">
                <span className="tabular-nums">{PROFILE.graduation}</span>
                <span className="text-ink-3">{PROFILE.graduationNote}</span>
              </SpecRow>

              <SpecRow label="Coding since">
                <span className="tabular-nums">{PROFILE.codingSince}</span>
                <span className="text-ink-3">
                  {" · "}
                  {PROFILE.codingSinceNote}
                </span>
              </SpecRow>

              <SpecRow label="Home lab">{PROFILE.homeLab}</SpecRow>

              <SpecRow label="Certification">
                <a
                  href={CERTIFICATION.url}
                  {...EXTERNAL_LINK_PROPS}
                  className={`group flex items-center gap-2 ${FOCUS_RING}`}
                >
                  <Image
                    src={CERTIFICATION.image}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className={UNDERLINE}>{CERTIFICATION.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="inline align-middle ml-1 text-ink-3"
                    />
                    <span className="block font-mono text-xs text-ink-3 tabular-nums">
                      {CERTIFICATION.issued}
                    </span>
                  </span>
                </a>
              </SpecRow>
            </dl>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mt-16 lg:mt-20">
          <SkillsPanel />
        </div>

        {/* ── Code ratio ── */}
        <div className="mt-10">
          <CodingRatioPanel />
        </div>

        {/* ── Career ── */}
        <div className="mt-16 lg:mt-20">
          <CareerPanel />
        </div>
      </div>
    </section>
  );
}
