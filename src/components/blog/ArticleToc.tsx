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
    <nav
      className="sticky top-24 rounded-[28px] bg-surface-container-low p-3"
      aria-label="Table of contents"
    >
      <h3 className="px-4 pt-2 pb-3 text-sm font-medium text-on-surface-variant">
        目次
      </h3>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = activeId === item.url;
          const depthClass =
            item.depth === 2 ? "pl-4" : item.depth === 3 ? "pl-8" : "pl-12";

          return (
            <li key={item.url}>
              <button
                type="button"
                onClick={() => handleClick(item.url)}
                className={`state-layer block w-full cursor-pointer rounded-[20px] py-2 pr-4 text-left text-sm leading-relaxed transition-colors duration-200 ${depthClass} ${
                  isActive
                    ? "bg-secondary-container font-medium text-on-secondary-container"
                    : "text-on-surface-variant"
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
