import Link from "next/link";

export const Header = async () => {
  return (
    <nav className="absolute z-10 flex items-center justify-center gap-8 px-8 py-6 bg-transparent top-0 left-0 right-0">
      <Link
        href="/"
        className="font-poppins relative text-[0.95rem] font-medium tracking-wide text-[#2f2f2f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2f2f2f] after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="font-poppins relative text-[0.95rem] font-medium tracking-wide text-[#2f2f2f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2f2f2f] after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        About
      </Link>
      <Link
        href="/blog"
        className="font-poppins relative text-[0.95rem] font-medium tracking-wide text-[#2f2f2f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2f2f2f] after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Blog
      </Link>
      <Link
        href="/contact"
        className="font-poppins relative text-[0.95rem] font-medium tracking-wide text-[#2f2f2f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2f2f2f] after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Contact
      </Link>
    </nav>
  );
};
