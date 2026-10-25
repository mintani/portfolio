import Link from "next/link";
import { ExpressiveShape } from "@/components/shared/ExpressiveShape";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-6 text-center">
      <div className="relative grid size-56 place-items-center text-primary-container">
        <ExpressiveShape
          kind="cookie"
          className="shape-spin absolute inset-0 size-full"
        />
        <span className="relative text-6xl font-medium text-on-primary-container">
          404
        </span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-medium text-on-surface">Page Not Found</h1>
        <p className="max-w-md text-on-surface-variant">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>
      <Link
        href="/"
        className="state-layer inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-on-primary"
      >
        Return to Home
      </Link>
    </div>
  );
}
