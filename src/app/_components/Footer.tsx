import { Github, Mail } from "lucide-react";
import type { SVGProps } from "react";

function XIcon({
  size = 16,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.858L1.254 2.25H8.08l4.264 5.632 5.9-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#1c1c1c] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <span className="font-poppins font-bold italic text-2xl tracking-tight">
              MinTani
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Deployed on Runa.dev
            </span>
          </div>

          {/* Links */}
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
