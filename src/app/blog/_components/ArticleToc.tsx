"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/markdown";

type ArticleTocProps = {
  items: TocItem[];
};

export const ArticleToc = ({ items }: ArticleTocProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.url.slice(1)))
      .filter(Boolean) as Element[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const el of headingElements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleClick = (url: string) => {
    const el = document.getElementById(url.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
        目次
      </h3>
      <ul className="flex flex-col gap-1 border-l border-white/70">
        {items.map((item) => {
          const isActive = activeId === item.url;
          const depthClass =
            item.depth === 2 ? "pl-3" : item.depth === 3 ? "pl-6" : "pl-9";

          return (
            <li key={item.url}>
              <button
                type="button"
                onClick={() => handleClick(item.url)}
                className={`block w-full cursor-pointer text-left text-sm leading-relaxed transition-all duration-200 ${depthClass} ${
                  isActive
                    ? "border-l-2 border-[#01c7ca] font-medium text-[#2f2f2f] -ml-px"
                    : "text-[#585858] hover:text-[#2f2f2f]"
                }`}
              >
                {item.value}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
