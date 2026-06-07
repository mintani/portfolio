"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { Panel, PanelLabel } from "@/components/about/Panel";
import { SkillsPanel } from "@/components/about/SkillsPanel";
import { CareerPanel } from "@/components/about/CareerPanel";
import { ProjectsPanel } from "@/components/about/ProjectsPanel";
import { SocialPanel } from "@/components/about/SocialPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="about-section"
      className="w-full relative z-30 overflow-hidden flex flex-col items-center justify-center bg-[#EBFFFC]"
    >
      <div
        ref={ref}
        className="container mx-auto w-full py-20 px-4 sm:px-6 lg:px-10 flex flex-col gap-8"
      >
        {/* ── Section header ── */}
        <SectionHeading
          eyebrow="自己紹介"
          title="About me"
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        />

        {/* ── Row 1: Profile (wide) + Socials ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Panel
            className="lg:col-span-2 p-7 sm:p-8"
            delay={60}
            inView={inView}
          >
            <div className="flex flex-col sm:flex-row gap-6 h-full">
              <div className="shrink-0">
                <div className="relative size-20 rounded-2xl overflow-hidden ring-2 ring-cyan-300 shadow-md">
                  <Image
                    src="/mint.png"
                    alt="mintanaka"
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="font-poppins font-bold text-xl text-neutral-900 leading-tight">
                    MinTani
                  </span>
                  <span className="font-mono text-xs text-neutral-400 tracking-wide">
                    @mintanaka
                  </span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  日本工業大学データサイエンス学科の学生（28卒）です。
                  中学のころ独学でプログラミングを始めて、今もコードを書き続けています。
                  最近はチームで開発する機会も増えてきてフロントエンドだけでなく
                  インフラやバックエンドなど、日々新しいことに挑戦しています。
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  自宅サーバーを運用していて、サーバーに友人と遊ぶためのゲームサーバーを立てたり、ウェブサイトをデプロイしたり
                  このサイトも自宅サーバーから配信しています。
                </p>
              </div>
            </div>
          </Panel>

          <Panel className="p-6 flex flex-col" delay={120} inView={inView}>
            <PanelLabel>Connect</PanelLabel>
            <SocialPanel compact />
          </Panel>
        </div>

        {/* ── Row 2: Full-width skill grid ── */}
        <Panel delay={180} inView={inView} className="p-7">
          <PanelLabel>Skills</PanelLabel>
          <SkillsPanel />
        </Panel>

        {/* ── Row 3: Career (narrow) + Projects ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Panel className="lg:col-span-2 p-7" delay={240} inView={inView}>
            <PanelLabel>Career</PanelLabel>
            <CareerPanel />
          </Panel>

          <Panel className="lg:col-span-3 p-7" delay={300} inView={inView}>
            <PanelLabel>Projects</PanelLabel>
            <ProjectsPanel />
          </Panel>
        </div>
      </div>
    </section>
  );
}
