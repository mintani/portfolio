import { Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#1c1c1c] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-col gap-1.5">
            <span className="font-poppins font-bold italic text-2xl tracking-tight">
              MinTani
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Deployed on Runa.dev
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <nav className="flex items-center gap-4">
              <a
                href="https://github.com/mintani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/_mint76"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                <XIcon size={16} />
              </a>
              <a
                href="mailto:mi.2005.sub@gmail.com"
                aria-label="Email"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                <Mail size={18} />
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-neutral-600">
            © 2026 MinTani. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-neutral-600">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
