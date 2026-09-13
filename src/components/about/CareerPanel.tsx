import { CAREER } from "@/data/about";

// The data is newest first; the step sequence reads oldest first.
const STEPS = [...CAREER].reverse();

/** Career as a three-step sequence, horizontal from md up. */
export function CareerPanel() {
  return (
    <div>
      <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] text-ink">
        Career
      </h3>
      <div className="border-t border-rule mt-4" />
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-5">
        {STEPS.map((item) => (
          <li key={item.year} className="border-t border-rule pt-4 min-w-0">
            <span className="block font-display font-bold text-3xl tracking-[-0.02em] text-ink tabular-nums whitespace-nowrap">
              {item.year}
            </span>
            <h4 className="font-semibold text-ink mt-2">{item.title}</h4>
            <p className="text-xs text-ink-3">{item.place}</p>
            <p className="text-sm text-ink-2 leading-relaxed mt-2">
              {item.desc}
            </p>
            {item.tags.length > 0 ? (
              <p className="font-mono text-xs text-ink-3 mt-2">
                {item.tags.join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
