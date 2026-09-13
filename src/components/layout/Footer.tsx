import { Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

const ICON_LINK_CLASS = `inline-flex size-11 items-center justify-center rounded-full text-paper-2/60 transition-colors duration-200 hover:text-paper-2 ${FOCUS_RING}`;

/** Site footer: one closing statement over a hairline meta row. */
export function SiteFooter() {
  return (
    <footer className="w-full bg-night text-paper-2">
      <div className="container mx-auto px-5 pt-12 pb-6 sm:px-8 lg:px-12">
        <p className="max-w-[20ch] font-display text-[clamp(1.9rem,5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
          Catch up to the future.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-paper-2/15 pt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-lg font-bold italic">
              MinTani
            </span>
            <span className="font-mono text-xs text-paper-2/50">
              Deployed on Runa.dev
            </span>
          </div>

          <nav aria-label="Social" className="-mr-3 flex items-center">
            <a
              href="https://github.com/mintani"
              {...EXTERNAL_LINK_PROPS}
              aria-label="GitHub"
              className={ICON_LINK_CLASS}
            >
              <Github size={18} />
            </a>
            <a
              href="https://twitter.com/_mint76"
              {...EXTERNAL_LINK_PROPS}
              aria-label="X (Twitter)"
              className={ICON_LINK_CLASS}
            >
              <XIcon size={16} />
            </a>
            <a
              href="mailto:mi.2005.sub@gmail.com"
              aria-label="Email"
              className={ICON_LINK_CLASS}
            >
              <Mail size={18} />
            </a>
          </nav>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-paper-2/50">
          <span>© 2026 MinTani</span>
          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
