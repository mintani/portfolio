"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/#about-section", label: "About" },
  { href: "/#works-section", label: "Works" },
  { href: "/blog", label: "Blog" },
] as const;

/** Floating Material toolbar, fixed above the page content. The current page's item is filled. */
export function Header() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed top-3 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-surface-container-high/90 p-1 text-on-surface-variant shadow-level-3 backdrop-blur-md sm:top-4 sm:gap-1 sm:p-1.5"
    >
      <Link
        href="/"
        className="state-layer inline-flex h-11 items-center whitespace-nowrap rounded-full px-3 text-[15px] font-bold italic text-on-surface sm:px-4"
      >
        MinTani
      </Link>

      {NAV_LINKS.map(({ href, label }) => {
        const selected = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={selected ? "page" : undefined}
            className={`state-layer inline-flex h-11 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors duration-200 sm:px-4 ${
              selected
                ? "bg-secondary-container text-on-secondary-container"
                : "hover:text-on-surface"
            }`}
          >
            {label}
          </Link>
        );
      })}

      <a
        href="mailto:mi.2005.sub@gmail.com"
        aria-label="Contact"
        className="state-layer ml-0.5 inline-flex size-11 items-center justify-center rounded-full bg-primary text-on-primary sm:ml-1"
      >
        <Mail size={18} />
      </a>
    </nav>
  );
}
