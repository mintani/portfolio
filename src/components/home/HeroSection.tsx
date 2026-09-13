"use client";

import Image from "next/image";
import { Github, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const SECTIONS = ["hero-section", "about-section", "works-section"];

// Shared responsive sizing for the foreground heading lines.
const HEADING_TEXT =
  "font-poppins font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#555e7e]";

// Large stroked background lettering.
const OUTLINE_TEXT =
  "flex-1 hero-outline-text text-[130px] sm:text-[170px] md:text-[200px] lg:text-[300px] xl:text-[350px] select-none";

const OUTLINE_LINES = [
  { text: "Catch up", align: "text-right", stroke: "stroke-periwinkle" },
  { text: "to the", align: "text-left", stroke: "stroke-bluegray" },
  { text: "future", align: "text-right", stroke: "stroke-blush" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      {/* Page indicator */}
      <nav
        aria-label="Page indicator"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8 "
      >
        {SECTIONS.map((id, index) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Section ${index + 1}`}
            className={`size-6 rounded-full border-2 transition-all duration-300 cursor-pointer hidden lg:block ${
              activeIndex === index
                ? "bg-white border-white scale-110"
                : "bg-transparent border-white hover:scale-110"
            }`}
          />
        ))}
      </nav>

      {/* ── Hero ── */}
      <section
        id="hero-section"
        className="container relative mx-0 md:mx-auto flex-1 flex flex-col md:flex-row items-start pt-16 pb-0 md:pb-16 overflow-visible md:min-h-[800px]"
      >
        {/* White trapezoid */}
        <div
          className="absolute top-0 bottom-0 left-0 z-[5] pointer-events-none hidden lg:block "
          style={{
            right: "calc(-1 * (100vw - 100%) / 2)",
            clipPath:
              "polygon(calc(100% - 550px) 0%, 100% 0%, 100% 100%, calc(100% - 400px) 100%)",
            background: "#e9eefb",
          }}
          aria-hidden="true"
        />

        {/* Background outline text */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-start pt-8 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          {OUTLINE_LINES.map(({ text, align, stroke }) => (
            <span key={text} className={`${OUTLINE_TEXT} ${align} ${stroke}`}>
              {text}
            </span>
          ))}
        </div>

        {/* Main text */}
        <div className="relative z-20 flex flex-col pt-8 md:pt-16 lg:pt-20 pl-8 md:pl-20 gap-5 sm:gap-10 md:gap-10 xl:gap-20 overflow-visible">
          <div className="flex items-baseline leading-tight">
            <span className={`${HEADING_TEXT} tracking-tight`}>Here is</span>
          </div>
          <div className="flex items-baseline leading-tight">
            <span className={`${HEADING_TEXT} select-none`}>the</span>
            <span className={`${HEADING_TEXT} select-none`}>&ldquo;</span>
            <span className="font-playwrite text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#4d5ec8] px-1 select-none">
              stylish
            </span>
            <span className={`${HEADING_TEXT} select-none`}>&rdquo;</span>
          </div>
          <div className="flex items-baseline leading-none -mt-2">
            <span className="font-poppins font-bold italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[156px] text-[#2a3149] tracking-tight">
              MinTani
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
            <a
              href="https://github.com/mintani"
              {...EXTERNAL_LINK_PROPS}
              className="group flex items-center gap-2 whitespace-nowrap px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2a3149] text-white font-poppins font-medium text-sm sm:text-base hover:bg-[#555e7e] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Github size={16} className="sm:size-4" />
              Visit my GitHub
            </a>
            <button
              onClick={() => scrollToSection("about-section")}
              className="group flex items-center gap-2 whitespace-nowrap px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border-2 border-[#2a3149]/30 text-[#555e7e] font-poppins font-medium text-sm sm:text-base hover:border-[#2a3149] hover:text-[#2a3149] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              Move to &ldquo;About me&rdquo;
            </button>
          </div>
        </div>

        {/* Character image: stacked under the copy on phones, floated to the right from md up */}
        <div className="relative z-10 self-end -mt-5 -mr-4 sm:-mr-10 w-[70%] max-w-[360px] sm:max-w-[440px] max-h-[62svh] overflow-hidden pointer-events-none md:absolute md:self-auto md:mt-0 md:mr-0 md:-right-40 lg:-right-60 md:top-20 md:z-30 md:w-125 lg:w-140 xl:w-[800px] md:max-w-none md:max-h-dvh md:overflow-visible">
          <Image
            src="/scaled2x.png"
            alt="MinTani のキャラクターイラスト"
            width={768}
            height={1024}
            priority
            sizes="(min-width: 1280px) 800px, (min-width: 1024px) 560px, (min-width: 768px) 500px, 70vw"
            className="w-full h-auto object-cover object-top"
          />
        </div>

        {/* Chevron Down */}
        <button
          onClick={() => scrollToSection("about-section")}
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-neutral-400 hover:text-neutral-600 transition-colors duration-300 animate-bounce hidden md:block cursor-pointer"
        >
          <ChevronDown size={48} strokeWidth={1.5} />
        </button>
      </section>
    </>
  );
}
