"use client";

import Image from "next/image";
import { Github, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
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

/**
 * Hero motion. Writes the pointer's offset from the viewport centre (-1..1) into
 * --mx / --my on the hero so each .hero-layer can translate from it (mouse only, wide
 * viewports only), and slides every [data-scroll] layer by that many px over the hero's
 * height as the page scrolls (far layers lag behind with +, the art leads with -). The
 * art's own up-and-down bob is pure CSS and pauses while the hero is scrolled out of view.
 */
function useHeroMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      el.classList.toggle("is-offscreen", !visible);
    });
    io.observe(el);

    const scrollers = Array.from(
      el.querySelectorAll<HTMLElement>("[data-scroll]")
    ).map((node) => [node, Number(node.dataset.scroll)] as const);
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const p = Math.min(Math.max(window.scrollY / el.offsetHeight, 0), 1.5);
        for (const [node, depth] of scrollers) {
          node.style.transform = `translate3d(0, ${(p * depth).toFixed(1)}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mouse tracking only on wide viewports: below lg the art already sits close to the copy.
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWideChange = () => {
      if (wide.matches) return;
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    wide.addEventListener("change", onWideChange);
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible || !wide.matches) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };
    if (!window.matchMedia("(hover: none)").matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(frame);
      wide.removeEventListener("change", onWideChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ref]);
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useHeroMotion(sectionRef);

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
        ref={sectionRef}
        className="hero-parallax container relative mx-0 md:mx-auto lg:mx-auto flex-1 flex items-start pt-16 pb-16 overflow-visible md:min-h-[800px]"
      >
        {/* White trapezoid */}
        <div
          className="absolute top-0 bottom-0 left-0 z-[5] pointer-events-none hidden lg:block"
          style={{
            right: "calc(-1 * (100vw - 100%) / 2)",
            clipPath:
              "polygon(calc(100% - 550px) 0%, 100% 0%, 100% 100%, calc(100% - 400px) 100%)",
            background: "#e9eefb",
          }}
          aria-hidden="true"
        />

        {/* Background shapes: halftone dots behind the ghost lettering */}
        <div
          className="hero-layer absolute inset-0 z-[6] pointer-events-none [--px:-10px] [--py:-8px]"
          data-scroll="120"
          aria-hidden="true"
        >
          <div className="hero-dots absolute -top-10 -left-12 size-56 md:-top-20 md:-left-20 md:size-[440px] rounded-full [--dot:rgba(216,168,205,0.75)]" />
          <div className="hero-dots absolute hidden md:block md:-top-10 md:-right-40 size-80 rounded-full [--dot:rgba(103,116,206,0.55)]" />
        </div>

        {/* Background outline text */}
        <div
          className="hero-layer absolute inset-0 z-10 flex flex-col justify-start pt-8 pointer-events-none overflow-visible [--px:-6px] [--py:-4px]"
          data-scroll="180"
          aria-hidden="true"
        >
          {OUTLINE_LINES.map(({ text, align, stroke }) => (
            <span key={text} className={`${OUTLINE_TEXT} ${align} ${stroke}`}>
              {text}
            </span>
          ))}
        </div>

        {/* Main text. Rows carry z-20 themselves so the hatch band below can sit under the ghost lettering. */}
        <div className="relative flex flex-col pt-8 md:pt-16 lg:pt-20 pl-8 md:pl-20 gap-5 sm:gap-10 md:gap-10 xl:gap-20 overflow-visible">
          <div className="relative z-20 flex items-baseline leading-tight">
            <span className={`${HEADING_TEXT} tracking-tight`}>Here is</span>
          </div>
          <div className="relative z-20 flex items-baseline leading-tight">
            <span className={`${HEADING_TEXT} select-none`}>the</span>
            <span className={`${HEADING_TEXT} select-none`}>&ldquo;</span>
            <span className="font-playwrite text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#4d5ec8] px-1 select-none">
              stylish
            </span>
            <span className={`${HEADING_TEXT} select-none`}>&rdquo;</span>
          </div>
          <div className="relative z-20 flex items-baseline leading-none -mt-2">
            <span className="font-poppins font-bold italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[156px] text-[#2a3149] tracking-tight">
              MinTani
            </span>
          </div>

          {/* CTA Buttons, with a hatch-line band running in from the left edge behind the GitHub button */}
          <div className="relative flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
            <div
              aria-hidden="true"
              className="hero-lines absolute z-[7] -left-[50vw] -top-9 w-[calc(50vw+260px)] h-36 origin-right -rotate-12 [--fade:180px] md:-top-20 md:w-[calc(50vw+460px)] md:h-60 md:[--fade:320px] [--line:rgba(136,158,208,0.35)]"
            />
            <a
              href="https://github.com/mintani"
              {...EXTERNAL_LINK_PROPS}
              className="group relative z-20 flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2a3149] text-white font-poppins font-medium text-sm sm:text-base hover:bg-[#555e7e] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Github size={16} className="sm:size-4" />
              Visit my GitHub
            </a>
            <button
              onClick={() => scrollToSection("about-section")}
              className="group relative z-20 flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border-2 border-[#2a3149]/30 text-[#555e7e] font-poppins font-medium text-sm sm:text-base hover:border-[#2a3149] hover:text-[#2a3149] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              Move to &ldquo;About me&rdquo;
            </button>
          </div>
        </div>

        {/* Character image */}
        <div
          className="hero-layer absolute -right-20 sm:-right-40 md:-right-40 lg:-right-60 xl:-right-60 top-20 z-10 md:z-30 pointer-events-none w-76 sm:w-120 md:w-120 lg:w-132 xl:w-[760px] max-h-dvh overflow-visible [--px:30px] [--py:22px]"
          data-scroll="-80"
        >
          {/* The art bobs up and down on its own; the shadow rides along inside. */}
          <div className="hero-bob relative">
            {/* Offset silhouette in white stripes: a second copy of the art, flattened to white and masked by a stripe pattern. */}
            <div
              aria-hidden="true"
              className="hero-layer absolute top-0 left-0 w-full [--bx:3%] [--by:2%] [--px:-6px] [--py:-4px] mask-[repeating-linear-gradient(135deg,#000_0_6px,transparent_6px_12px)]"
            >
              <Image
                src="/clip.png"
                alt=""
                width={966}
                height={1479}
                priority
                className="object-cover object-top brightness-0 invert"
              />
            </div>
            <Image
              src="/clip.png"
              alt="mint"
              width={966}
              height={1479}
              priority
              className="relative object-cover object-top hero-art-edge"
            />
          </div>
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
