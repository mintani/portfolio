import { CODING_RATIO } from "@/data/about";

const TOTAL = CODING_RATIO.reduce((sum, item) => sum + item.weight, 0);

// Largest share first, so the bar reads left to right by size.
const ITEMS = [...CODING_RATIO].sort((a, b) => b.weight - a.weight);

const SEGMENT_COLORS = [
  "bg-primary",
  "bg-tertiary",
  "bg-primary-fixed-dim",
  "bg-outline-variant",
];

/** Share of the code I write, as a card with one segmented bar. Spans the row when alone. */
export function CodingRatioPanel() {
  return (
    <div className="rounded-3xl bg-surface-container-low p-6 md:only:col-span-2">
      <h4 className="text-base font-medium text-on-surface">Code ratio</h4>
      <p className="text-sm text-on-surface-variant">個人開発の比率</p>
      <div className="mt-5 flex h-3 gap-1">
        {ITEMS.map((item, index) => (
          <span
            key={item.label}
            className={`rounded-full ${SEGMENT_COLORS[index]}`}
            style={{ flexGrow: item.weight }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {ITEMS.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`size-2.5 rounded-full ${SEGMENT_COLORS[index]}`}
            />
            <span className="text-sm text-on-surface">{item.label}</span>
            <span className="font-mono text-xs text-on-surface-variant tabular-nums">
              {Math.round((item.weight / TOTAL) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
