"use client";

import {
  ArrowDown,
  BriefcaseBusiness,
  Github,
  House,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { ExpressiveShape } from "@/components/shared/ExpressiveShape";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const SECTIONS = [
  { id: "hero-section", label: "Home", icon: House },
  { id: "about-section", label: "About", icon: UserRound },
  { id: "works-section", label: "Works", icon: BriefcaseBusiness },
] as const;

// Shared responsive sizing for the foreground heading lines.
const HEADING_TEXT =
  "font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-on-primary-container";

// Large tonal background lettering.
const GHOST_TEXT =
  "flex-1 hero-ghost-text text-[130px] sm:text-[170px] md:text-[200px] lg:text-[300px] xl:text-[350px] select-none";

const GHOST_LINES = [
  { text: "Catch up", align: "text-right", tone: "text-white/45" },
  { text: "to the", align: "text-left", tone: "text-primary-fixed-dim/45" },
  { text: "future", align: "text-right", tone: "text-tertiary-container/80" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Hero motion. Writes the pointer's offset from the viewport centre (-1..1) into
 * --mx / --my on the hero so each .hero-layer can translate from it (mouse only, wide
 * viewports only), and slides every [data-scroll] layer by that many px over the hero's
 * height as the page scrolls (far layers lag behind with +, near ones lead with -). The
 * shapes' spin is pure CSS and pauses while the hero is scrolled out of view.
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

    // Mouse tracking only on wide viewports; below lg the layers stay put.
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

    SECTIONS.forEach(({ id }, index) => {
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
      {/* Navigation rail: one destination per home section */}
      <nav
        aria-label="Page sections"
        className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-[28px] bg-surface-container/90 px-3 py-4 shadow-level-2 backdrop-blur-md xl:flex"
      >
        {SECTIONS.map(({ id, label, icon: Icon }, index) => {
          const active = activeIndex === index;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={active ? "true" : undefined}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl"
            >
              <span
                className={`state-layer flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-300 ease-emphasized ${
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant"
                }`}
              >
                <Icon size={20} />
              </span>
              <span
                className={`text-xs font-medium ${
                  active ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Hero: one primary-container panel inset from the viewport edge ── */}
      <section
        id="hero-section"
        ref={sectionRef}
        className="hero-parallax w-full px-2 pt-2 sm:px-3 sm:pt-3"
      >
        <div className="relative overflow-hidden rounded-[28px] bg-primary-container sm:rounded-[48px]">
          <div className="container relative mx-auto flex items-start pt-16 pb-16 md:min-h-[800px]">
            {/* M3 clover behind the lettering, top-left */}
            <div
              className="hero-layer absolute inset-0 z-[6] pointer-events-none [--px:-10px] [--py:-8px]"
              data-scroll="120"
              aria-hidden="true"
            >
              <ExpressiveShape
                kind="clover"
                className="shape-spin absolute -top-20 -left-24 size-64 text-tertiary-container [--spin:90s] md:-top-28 md:-left-28 md:size-[440px]"
              />
            </div>

            {/* Cookie on the right, leading the scroll */}
            <div
              className="hero-layer absolute inset-0 z-[6] pointer-events-none [--px:16px] [--py:12px]"
              data-scroll="-40"
              aria-hidden="true"
            >
              <ExpressiveShape
                kind="cookie"
                className="shape-spin absolute top-24 -right-24 size-80 text-primary-fixed-dim sm:size-[460px] lg:top-16 lg:-right-16 lg:size-[680px]"
              />
            </div>

            {/* Background lettering */}
            <div
              className="hero-layer absolute inset-0 z-10 flex flex-col justify-start pt-8 pointer-events-none overflow-visible [--px:-6px] [--py:-4px]"
              data-scroll="180"
              aria-hidden="true"
            >
              {GHOST_LINES.map(({ text, align, tone }) => (
                <span key={text} className={`${GHOST_TEXT} ${align} ${tone}`}>
                  {text}
                </span>
              ))}
            </div>

            {/* Main text */}
            <div className="relative z-20 flex flex-col pt-8 md:pt-16 lg:pt-20 pl-6 md:pl-20 gap-5 sm:gap-10 xl:gap-20">
              <div className="flex items-baseline leading-tight">
                <span className={`${HEADING_TEXT} tracking-tight`}>
                  Here is
                </span>
              </div>
              <div className="flex items-baseline leading-tight">
                <span className={`${HEADING_TEXT} select-none`}>the</span>
                <span className={`${HEADING_TEXT} select-none`}>&ldquo;</span>
                <span className="font-playwrite text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-tertiary px-1 select-none">
                  stylish
                </span>
                <span className={`${HEADING_TEXT} select-none`}>&rdquo;</span>
              </div>
              <div className="flex items-baseline leading-none -mt-2">
                <span className="font-bold italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[156px] text-on-surface tracking-tight">
                  MinTani
                </span>
              </div>

              {/* M3 buttons: filled for the main action, elevated for the in-page jump */}
              <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-4">
                <a
                  href="https://github.com/mintani"
                  {...EXTERNAL_LINK_PROPS}
                  className="state-layer flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 text-sm font-medium text-on-primary shadow-level-1 transition-shadow duration-200 hover:shadow-level-2 sm:h-14 sm:px-7 sm:text-base"
                >
                  <Github size={20} />
                  Visit my GitHub
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection("about-section")}
                  className="state-layer flex h-12 cursor-pointer items-center whitespace-nowrap rounded-full bg-surface-container-low px-6 text-sm font-medium text-primary shadow-level-1 transition-shadow duration-200 hover:shadow-level-2 sm:h-14 sm:px-7 sm:text-base"
                >
                  Move to &ldquo;About me&rdquo;
                </button>
              </div>
            </div>

            {/* Scroll cue as a surface FAB */}
            <button
              type="button"
              onClick={() => scrollToSection("about-section")}
              aria-label="Scroll to next section"
              className="state-layer absolute bottom-8 left-1/2 z-30 hidden size-14 -translate-x-1/2 cursor-pointer items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-level-3 transition-shadow duration-200 hover:shadow-level-4 md:flex"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
