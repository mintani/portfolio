import { CODING_RATIO } from "@/data/about";

const TOTAL = CODING_RATIO.reduce((sum, item) => sum + item.weight, 0);

// Largest share first, so the bar reads left to right by size.
const ITEMS = [...CODING_RATIO].sort((a, b) => b.weight - a.weight);

const SEGMENT_COLORS = ["bg-accent", "bg-ink-2", "bg-blush", "bg-rule"];

/** Share of the code I write, as a single stacked bar. */
export function CodingRatioPanel() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
        Code ratio · 個人開発の比率
      </p>
      <div className="flex h-3 gap-0.5 rounded-full overflow-hidden mt-3">
        {ITEMS.map((item, index) => (
          <span
            key={item.label}
            className={SEGMENT_COLORS[index]}
            style={{ flexGrow: item.weight }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
        {ITEMS.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`size-2 rounded-full ${SEGMENT_COLORS[index]}`}
            />
            <span className="text-sm text-ink">{item.label}</span>
            <span className="font-mono text-xs text-ink-3 tabular-nums">
              {Math.round((item.weight / TOTAL) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
