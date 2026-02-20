"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SkillsPanel = dynamic(() =>
  import("./panels/SkillsPanel").then((mod) => mod.SkillsPanel)
);
const CareerPanel = dynamic(() =>
  import("./panels/CareerPanel").then((mod) => mod.CareerPanel)
);
const LearningPanel = dynamic(() =>
  import("./panels/LearningPanel").then((mod) => mod.LearningPanel)
);
const SocialPanel = dynamic(() =>
  import("./panels/SocialPanel").then((mod) => mod.SocialPanel)
);

// Reduced to 3 lines so the console card stays short (1 row height)
const CONSOLE_LINES = [
  {
    cmd: "cat bio.txt",
    out: "日本工業大学先進工学部データサイエンス学科(28卒)",
  },
  {
    cmd: "cat description.txt",
    out: "「いろいろやる」をモットーに活動しています!Web関連の開発をメインでやっています。現在仕事探し中です。お仕事・インターンのご連絡はXのDMかメール、各種就職サイトからお願いします。連絡お待ちしております!",
  },
];

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

function BentoCard({
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
      className={`rounded-2xl bg-white/30 backdrop-blur-xl border border-white/50 ring-1 ring-white/60 shadow-xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400/70">
        {children}
      </span>
      <div className="flex-1 h-px bg-neutral-200/60" />
    </div>
  );
}

export function AboutSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="about-section"
      className="background-gradient w-full min-h-screen relative z-30 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="container mx-auto">
        <div className="hero-dots absolute -z-10 inset-0 pointer-events-none" />

        <div
          ref={ref}
          className="z-10 w-full py-10 px-2 sm:px-4 lg:ml-10 flex flex-col gap-6"
        >
          {/* ── Section title ── */}
          <div
            className={`flex flex-col gap-1 mt-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-400">
              {"// 自己紹介"}
            </span>
            <div className="flex items-end gap-4">
              <span className="text-4xl sm:text-5xl font-bold font-poppins italic text-neutral-800">
                About&nbsp;me
              </span>
            </div>
          </div>

          {/* ──  Grid — 2 rows on lg ── */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-3 auto-rows-auto  transition-all duration-700">
            {/* ① Terminal — lg: col 1-4, row 1 (single row, compact) */}
            <BentoCard className="lg:col-span-4" delay={0} inView={inView}>
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/35 border-b border-white/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] text-neutral-500/60 tracking-wide">
                  mintani@portfolio ~ zsh
                </span>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-yellow-400/60 ring-offset-2 ring-offset-white/10 shadow-md shrink-0">
                  <Image
                    src="/3.png"
                    alt="MinTani"
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-poppins font-bold text-base text-neutral-800 leading-tight">
                    MinTani(mintanaka)
                  </span>
                </div>
              </div>

              {/* Console lines */}
              <div className="px-5 pb-4 font-mono text-xs flex flex-col gap-2 border-t border-white/30 pt-3">
                {CONSOLE_LINES.map((line, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-yellow-500 font-bold select-none text-sm">
                        ❯
                      </span>
                      <span className="text-md text-neutral-700 font-semibold">
                        {line.cmd}
                      </span>
                    </div>
                    <div className="pl-4 text-md text-neutral-500 leading-relaxed">
                      {line.out}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-yellow-500 font-bold select-none text-sm">
                    ❯
                  </span>
                  <span className="inline-block w-1.5 h-3.5 bg-yellow-400/80 animate-pulse" />
                </div>
              </div>
            </BentoCard>

            {/* ② Skills — lg: col 5-12, row 1 */}
            <BentoCard className="lg:col-span-8" delay={80} inView={inView}>
              <div className="p-5 sm:p-6">
                <CardLabel>// Skills</CardLabel>
                <SkillsPanel />
              </div>
            </BentoCard>

            {/* ③ Social — lg: col 1-4, row 2  (compact: vertical list) */}
            <BentoCard className="lg:col-span-4" delay={120} inView={inView}>
              <div className="p-5 sm:p-6">
                <CardLabel>// Social</CardLabel>
                <SocialPanel compact />
              </div>
            </BentoCard>

            {/* ④ Career — lg: col 5-8, row 2 */}
            <BentoCard
              className="lg:col-span-4 hidden lg:block"
              delay={160}
              inView={inView}
            >
              <div className="p-5 sm:p-6">
                <CardLabel>// Career</CardLabel>
                <CareerPanel compact />
              </div>
            </BentoCard>

            {/* ⑤ Learning (compact, 3 bars) + About bio — lg: col 9-12, row 2 */}
            <BentoCard
              className="lg:col-span-4 hidden lg:block"
              delay={200}
              inView={inView}
            >
              <div className="p-5 sm:p-6 flex flex-col gap-5 h-full">
                <div>
                  <CardLabel>// Learning</CardLabel>
                  <LearningPanel compact />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
