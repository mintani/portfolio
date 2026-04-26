import Link from "next/link";
import type { ComponentProps } from "react";

function NavLink({ href, children }: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className="font-poppins relative text-[0.95rem] font-medium tracking-wide text-[#2f2f2f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2f2f2f] after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <nav className="fixed z-50 flex items-center justify-center gap-8 px-8 py-6 bg-transparent top-0 left-0 right-0">
      <NavLink href="/">Home</NavLink>
      <NavLink href="#about-section">About</NavLink>
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </nav>
  );
}
