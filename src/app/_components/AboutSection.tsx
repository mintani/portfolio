"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Mail, Globe } from "lucide-react";
import { XLight } from "@ridemountainpig/svgl-react";

import { SkillsPanel } from "./_components/SkillsPanel";
import { CareerPanel } from "./_components/CareerPanel";
import { LearningPanel } from "./_components/LearningPanel";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const SOCIALS = [
  {
    label: "GitHub",
    sub: "@mintani",
    href: "https://github.com/mintani",
    icon: Github,
    color: "hover:text-neutral-900",
  },
  {
    label: "Twitter / X",
    sub: "@_mint76",
    href: "https://twitter.com/_mint76",
    icon: XLight,
    color: "hover:text-sky-600",
  },
  {
    label: "Runa.dev",
    sub: "作品一覧",
    href: "https://runa.dev",
    icon: Globe,
    color: "hover:text-violet-600",
  },
  {
    label: "Email",
    sub: "mi.2005.sub@gmail.com",
    href: "mailto:mi.2005.sub@gmail.com",
    icon: Mail,
    color: "hover:text-amber-600",
  },
];

// Thin card wrapper — no uniform height enforcement
function Panel({
  children,
  className = "",
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/30 backdrop-blur-xl border border-white/50 ring-1 ring-white/60 shadow-lg overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function AboutSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="about-section"
      className="w-full relative z-30 overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        ref={ref}
        className="container mx-auto w-full py-16 px-4 sm:px-6 lg:px-10 flex flex-col gap-10"
      >
        {/* ── Section header ── */}
        <div
          className={`flex flex-col gap-1 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
            自己紹介
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold font-poppins italic text-neutral-800 leading-none">
            About me
          </h2>
        </div>

        {/* ── Row 1: Profile (wide) + Socials ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile — takes 2 cols */}
          <Panel
            className="lg:col-span-2 p-7 sm:p-8"
            delay={60}
            inView={inView}
          >
            <div className="flex flex-col sm:flex-row gap-6 h-full">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-cyan-400 shadow-md">
                  <Image
                    src="/mint.png"
                    alt="mintanaka"
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="font-poppins font-bold text-xl text-neutral-900 leading-tight">
                    MinTani
                  </span>
                  <span className="font-mono text-xs text-neutral-400 tracking-wide">
                    mintanaka
                  </span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  「いろいろやる」をモットーに活動する学生エンジニア。
                  日本工業大学先進工学部データサイエンス学科（28卒）。
                  WebサービスやAPIの設計・実装が得意で、ハッカソンにも積極的に参加しています。
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  現在インターン・お仕事を探しています。
                  お気軽にXのDMやメールでご連絡ください。
                </p>
                <div className="mt-auto pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Social links — 1 col */}
          <Panel className="p-6" delay={120} inView={inView}>
            <div className="flex flex-col gap-2 h-full justify-center">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/60 transition-all duration-200 ${s.color}`}
                  >
                    <Icon
                      size={16}
                      width={16}
                      height={16}
                      className="shrink-0 text-neutral-500 group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-neutral-800 leading-none">
                        {s.label}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                        {s.sub}
                      </p>
                    </div>
                    <ExternalLink
                      size={11}
                      className="shrink-0 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* ── Row 2: Full-width skill grid ── */}
        <Panel delay={180} inView={inView} className="p-7">
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-400 mb-5">
            Skills
          </h3>
          <SkillsPanel />
        </Panel>

        {/* ── Row 3: Career (narrow) + Projects ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Career — 2 cols */}
          <Panel className="lg:col-span-2 p-7" delay={240} inView={inView}>
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-400 mb-5">
              Career
            </h3>
            <CareerPanel />
          </Panel>

          {/* Projects — 3 cols */}
          <Panel className="lg:col-span-3 p-7" delay={300} inView={inView}>
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-400 mb-5">
              Projects
            </h3>
            <LearningPanel />
          </Panel>
        </div>
      </div>
    </section>
  );
}
