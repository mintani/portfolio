import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, CodeXml } from "lucide-react";
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

const BIO = [
  "日本工業大学データサイエンス学科の学生（28卒）です。中学のころ独学でプログラミングを始めて、今もコードを書き続けています。最近はチームで開発する機会も増えてきてフロントエンドだけでなくインフラやバックエンドなど、日々新しいことに挑戦しています。",
  "自宅サーバーを運用していて、サーバーに友人と遊ぶためのゲームサーバーを立てたり、ウェブサイトをデプロイしたり、このサイトも自宅サーバーから配信しています。",
];

/** One labelled row of the profile spec sheet. */
function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3.5">
      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pt-0.5">
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
      className="w-full relative z-30 overflow-hidden bg-paper-2 py-24 lg:py-32"
    >
      <CodeXml
        aria-hidden
        strokeWidth={0.5}
        className="pointer-events-none absolute z-0 -top-[8vw] -right-[10vw] size-[56vw] lg:size-[40rem] lg:-top-36 lg:-right-24 text-accent opacity-[0.12]"
      />

      <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Profile diptych ── */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-7 min-w-0">
            <SectionHeading title="About" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-base leading-[1.9] text-ink-2 max-w-[60ch]">
              {BIO.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16 min-w-0">
            <div className="size-14 rounded-xl border border-rule overflow-hidden">
              <Image
                src={PROFILE.avatar}
                alt="MinTani のアイコン"
                width={56}
                height={56}
                className="size-full object-cover object-top"
              />
            </div>

            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              <SpecRow label="Name">
                <span className="font-display font-semibold">
                  {PROFILE.name}
                </span>
                <span className="font-mono text-xs text-ink-3 ml-2">
                  {PROFILE.handle}
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

              <SpecRow label="Links">
                <span className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      {...(link.external ? EXTERNAL_LINK_PROPS : {})}
                      className={`group inline-flex items-center gap-1 text-sm text-ink whitespace-nowrap ${UNDERLINE} ${FOCUS_RING}`}
                    >
                      {link.label}
                      {link.external ? <ArrowUpRight size={12} /> : null}
                    </a>
                  ))}
                </span>
              </SpecRow>
            </dl>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mt-20 lg:mt-24">
          <SkillsPanel />
        </div>

        {/* ── Code ratio ── */}
        <div className="mt-12">
          <CodingRatioPanel />
        </div>

        {/* ── Career ── */}
        <div className="mt-20 lg:mt-24">
          <CareerPanel />
        </div>
      </div>
    </section>
  );
}
