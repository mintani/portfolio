import { Mail } from "lucide-react";
import Link from "next/link";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

/**
 * Nav link: label plus an underline that scales in from the left on hover.
 * Sized so the hit target stays at least 44px tall.
 */
const NAV_LINK_CLASS = `relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2 py-2 font-display text-[13px] font-medium text-ink-2 transition-colors duration-200 after:absolute after:bottom-2 after:left-2 after:right-2 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 sm:px-2.5 sm:text-sm ${FOCUS_RING}`;

const NAV_LINKS = [
  { href: "/#about-section", label: "About" },
  { href: "/#works-section", label: "Works" },
  { href: "/blog", label: "Blog" },
] as const;

/** Floating pill navigation, fixed above the page content. */
export function Header() {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-4 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-rule bg-paper/80 px-2 shadow-[0_8px_24px_-12px] shadow-ink/25 backdrop-blur-md sm:gap-2 sm:px-3"
    >
      <Link
        href="/"
        className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-1 font-display text-[15px] font-bold italic text-ink sm:px-1.5 ${FOCUS_RING}`}
      >
        MinTani
      </Link>

      {NAV_LINKS.map(({ href, label }) => (
        <Link key={href} href={href} className={NAV_LINK_CLASS}>
          {label}
        </Link>
      ))}

      <span
        aria-hidden="true"
        className="h-4 border-l border-rule max-[359px]:hidden"
      />

      <a
        href="mailto:mi.2005.sub@gmail.com"
        aria-label="Contact"
        className={`inline-flex size-11 items-center justify-center rounded-full text-ink-2 transition-colors duration-200 hover:text-ink ${FOCUS_RING}`}
      >
        <Mail size={17} />
      </a>
    </nav>
  );
}
