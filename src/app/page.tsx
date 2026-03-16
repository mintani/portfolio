"use client";

//import Image from "next/image";
import { Github, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { AboutSection } from "@/app/_components/AboutSection";

const SECTIONS = ["hero-section", "about-section"];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
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
    <div className="w-full background-gradient relative flex flex-col items-center overflow-x-hidden">
      {/* Dot pattern */}
      <div className="hero-dots absolute inset-0 z-0 pointer-events-none" />

      {/* Page indicator */}
      <nav
        aria-label="Page indicator"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8"
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
        className="container relative mx-0 md:mx-auto lg:mx-auto flex-1 flex items-start pt-16 pb-16 overflow-visible md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1120px]"
      >
        {/* Background outline text */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-start pt-8 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <span className="flex-1 hero-outline-text align-right text-right text-[100px] sm:text-[150px] md:text-[200px] lg:text-[300px] xl:text-[350px] stroke-green select-none">
            Catch up
          </span>
          <span className="flex-1 hero-outline-text align-left text-left text-[100px] sm:text-[150px] md:text-[200px] lg:text-[300px] xl:text-[350px] stroke-teal select-none">
            to the
          </span>
          <span className="flex-1 hero-outline-text align-right text-right text-[100px] sm:text-[150px] md:text-[200px] lg:text-[300px] xl:text-[350px] stroke-blue select-none">
            future
          </span>
        </div>

        {/* Main text */}
        <div className="relative z-20 flex flex-col pt-8 md:pt-16 lg:pt-20 pl-8 md:pl-20 gap-5 sm:gap-10 md:gap-10 xl:gap-20 overflow-visible">
          <div className="flex items-baseline leading-tight">
            <span className="font-poppins font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#585858] tracking-tight">
              Here is
            </span>
          </div>
          <div className="flex items-baseline leading-tight">
            <span className="font-poppins font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#585858] select-none">
              the
            </span>
            <span className="font-poppins font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#585858] select-none">
              &ldquo;
            </span>
            <span className="font-playwrite text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#01c7ca] px-1 select-none">
              stylish
            </span>
            <span className="font-poppins font-medium italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#585858] select-none">
              &rdquo;
            </span>
          </div>
          <div className="flex items-baseline leading-none -mt-2">
            <span className="font-poppins font-bold italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[156px] text-[#2f2f2f] tracking-tight">
              MinTani
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
            <a
              href="https://github.com/mintani"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2f2f2f] text-white font-poppins font-medium text-sm sm:text-base hover:bg-[#585858] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Github size={16} className="sm:size-4" />
              Visit my GitHub
            </a>
            <button
              onClick={() => scrollToSection("about-section")}
              className="group flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border-2 border-[#2f2f2f]/30 text-[#585858] font-poppins font-medium text-sm sm:text-base hover:border-[#2f2f2f] hover:text-[#2f2f2f] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              Move to &ldquo;About me&rdquo;
            </button>
          </div>
        </div>

        {/* Character image */}
        {/* <div className="absolute -right-30 sm:-right-50 md:-right-50 lg:-right-65 xl:-right-200 top-10 md:top-20 z-10 md:z-30 pointer-events-none w-80 sm:w-125 md:w-125 lg:w-170 xl:w-[1500px] max-h-dvh overflow-visible">
          <Image
            src="/mint-trans.png"
            alt="mint"
            width={1000}
            height={1000}
            className="object-cover object-top"
          />
        </div> */}

        {/* Chevron Down */}
        <button
          onClick={() => scrollToSection("about-section")}
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-neutral-400 hover:text-neutral-600 transition-colors duration-300 animate-bounce hidden md:block cursor-pointer"
        >
          <ChevronDown size={48} strokeWidth={1.5} />
        </button>
      </section>

      {/* ── About ── */}

      <AboutSection />
    </div>
  );
}
