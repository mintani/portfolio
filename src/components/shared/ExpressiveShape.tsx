import type { CSSProperties } from "react";

type ShapeKind = "cookie" | "clover";

/**
 * Radial outlines after the Material 3 Expressive shape set. `lobes` bumps go round the
 * edge and cut `depth` (share of the radius) into it; `pinched` sharpens the joins
 * between lobes so they read as petals instead of soft waves.
 */
const SHAPES: Record<
  ShapeKind,
  { lobes: number; depth: number; pinched: boolean }
> = {
  cookie: { lobes: 12, depth: 0.07, pinched: false },
  clover: { lobes: 4, depth: 0.3, pinched: true },
};

const STEPS = 180;

/** SVG path for a shape, fitted to a 100 × 100 box. */
function shapePath({ lobes, depth, pinched }: (typeof SHAPES)[ShapeKind]) {
  const points: string[] = [];
  for (let i = 0; i < STEPS; i++) {
    const angle = (i / STEPS) * Math.PI * 2;
    const wave = pinched
      ? Math.abs(Math.cos((lobes * angle) / 2))
      : (1 + Math.cos(lobes * angle)) / 2;
    const r = 50 * (1 - depth * (1 - wave));
    const x = 50 + r * Math.sin(angle);
    const y = 50 - r * Math.cos(angle);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

const PATHS = Object.fromEntries(
  Object.entries(SHAPES).map(([kind, shape]) => [kind, shapePath(shape)])
) as Record<ShapeKind, string>;

/** Decorative M3 shape filled with the current text colour. */
export function ExpressiveShape({
  kind,
  className,
}: {
  kind: ShapeKind;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path d={PATHS[kind]} fill="currentColor" />
    </svg>
  );
}

/** Inline style that crops an element (an avatar, say) to the given shape. */
export function shapeMask(kind: ShapeKind): CSSProperties {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${PATHS[kind]}"/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return { maskImage: url, maskSize: "100% 100%" };
}
