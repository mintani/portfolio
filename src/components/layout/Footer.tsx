import { Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const ICON_LINK_CLASS =
  "state-layer inline-flex size-12 items-center justify-center rounded-full text-inverse-on-surface/75 transition-colors duration-200 hover:text-inverse-on-surface";

/** Site footer: an inverse-surface panel with one closing statement over a meta row. */
export function SiteFooter() {
  return (
    <footer className="w-full px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[28px] bg-inverse-surface text-inverse-on-surface sm:rounded-[48px]">
        <div className="container mx-auto px-6 pt-14 pb-6 sm:px-10 lg:px-12">
          <p className="max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.02em]">
            Catch up to the{" "}
            <span className="text-inverse-primary">future.</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-inverse-on-surface/15 pt-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-lg font-bold italic">MinTani</span>
              <span className="font-mono text-xs text-inverse-on-surface/60">
                Deployed on Runa.dev
              </span>
            </div>

            <nav aria-label="Social" className="-mr-2 flex items-center gap-1">
              <a
                href="https://github.com/mintani"
                {...EXTERNAL_LINK_PROPS}
                aria-label="GitHub"
                className={ICON_LINK_CLASS}
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/_mint76"
                {...EXTERNAL_LINK_PROPS}
                aria-label="X (Twitter)"
                className={ICON_LINK_CLASS}
              >
                <XIcon size={18} />
              </a>
              <a
                href="mailto:mi.2005.sub@gmail.com"
                aria-label="Email"
                className={ICON_LINK_CLASS}
              >
                <Mail size={20} />
              </a>
            </nav>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-inverse-on-surface/60">
            <span>© 2026 MinTani</span>
            <span>Built with Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
