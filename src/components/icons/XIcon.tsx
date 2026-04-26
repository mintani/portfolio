import type { SVGProps } from "react";

export function XIcon({
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
